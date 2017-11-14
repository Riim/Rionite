import { hyphenize } from '@riim/hyphenize';
import { Cell, EventEmitter } from 'cellx';
import { Component, IComponentElement } from './Component';
import { componentParamTypeMap } from './componentParamTypeMap';
import { componentParamTypeSerializerMap } from './componentParamTypeSerializerMap';

export interface IComponentParams extends Object {
	$content: DocumentFragment | null;
	$context: { [name: string]: any };
	$specified: Set<string>;
	[name: string]: any;
}

function initParam(params: IComponentParams, name: string, el: IComponentElement) {
	let component = el.$component;
	let paramConfig = (component.constructor as typeof Component).params![name];

	if (paramConfig == null) {
		return;
	}

	let type = typeof paramConfig;
	let defaultValue: any;
	let required: boolean;
	let readonly: boolean;

	if (type == 'function') {
		type = paramConfig;
		required = readonly = false;
	} else if (
		type == 'object' &&
		(paramConfig.type !== undefined || paramConfig.default !== undefined)
	) {
		type = paramConfig.type;
		defaultValue = paramConfig.default;

		if (type === undefined) {
			type = typeof defaultValue;
		} else if (
			defaultValue !== undefined &&
			componentParamTypeMap.has(type) &&
			componentParamTypeMap.get(type) != typeof defaultValue
		) {
			throw new TypeError('Specified type does not match defaultValue type');
		}

		required = paramConfig.required;
		readonly = paramConfig.readonly;
	} else {
		defaultValue = paramConfig;
		required = readonly = false;
	}

	let typeSerializer = componentParamTypeSerializerMap.get(type);

	if (!typeSerializer) {
		throw new TypeError('Unsupported component parameter type');
	}

	let hyphenizedName = hyphenize(name, true);
	let rawValue = el.getAttribute(hyphenizedName);

	if (required && rawValue === null) {
		throw new TypeError(`Parameter "${name}" is required`);
	}

	if (rawValue === null && defaultValue != null && defaultValue !== false) {
		el.setAttribute(hyphenizedName, typeSerializer.write(defaultValue)!);
	}

	let value = typeSerializer.read(rawValue, defaultValue);
	let descriptor: PropertyDescriptor;

	if (readonly) {
		descriptor = {
			configurable: true,
			enumerable: true,

			get() {
				return value;
			},

			set(val: any) {
				if (val !== value) {
					throw new TypeError(`Parameter "${name}" is readonly`);
				}
			}
		};
	} else {
		let valueCell: Cell | undefined;

		let setRawValue = (rawValue: string | null) => {
			let val = typeSerializer!.read(rawValue, defaultValue);

			if (valueCell) {
				valueCell.set(val);
			} else {
				value = val;
			}
		};

		params['_' + name] = setRawValue;

		if (name != hyphenizedName) {
			params['_' + hyphenizedName] = setRawValue;
		}

		descriptor = {
			configurable: true,
			enumerable: true,

			get() {
				if (valueCell) {
					return valueCell.get();
				}

				let currentlyPulling = Cell.currentlyPulling;

				if (currentlyPulling || EventEmitter.currentlySubscribing) {
					valueCell = new Cell(value, {
						onChange(evt) {
							component.emit(
								evt.target == valueCell
									? {
											type: `param-${hyphenizedName}-change`,
											data: evt.data
										}
									: {
											type: `param-${hyphenizedName}-change`,
											data: {
												prevEvent: null,
												prevValue: evt.target,
												value: evt.target
											}
										}
							);
						}
					});

					if (currentlyPulling) {
						return valueCell.get();
					}
				}

				return value;
			},

			set(val: any) {
				let rawValue = typeSerializer!.write(val, defaultValue);

				if (rawValue === null) {
					el.removeAttribute(hyphenizedName);
				} else {
					el.setAttribute(hyphenizedName, rawValue);
				}

				if (valueCell) {
					valueCell.set(val);
				} else {
					value = val;
				}
			}
		};
	}

	Object.defineProperty(params, name, descriptor);
}

export let ComponentParams = {
	init(component: Component): IComponentParams {
		let paramsConfig = (component.constructor as typeof Component).params;
		let el = component.element;
		let params = {
			$content: null,
			$context: null as any,
			$specified: null as any
		};

		if (paramsConfig) {
			for (let name in paramsConfig) {
				initParam(params, name, el);
			}
		}

		return params;
	}
};
