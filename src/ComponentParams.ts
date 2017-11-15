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
	let config = (component.constructor as typeof Component).params![name];

	if (config == null) {
		return;
	}

	let type = typeof config;
	let defaultValue: any;
	let pullDefault: Function | undefined;
	let required: boolean;
	let readonly: boolean;

	if (type == 'function') {
		type = config;
		required = readonly = false;
	} else if (type == 'object' && (config.type !== undefined || config.default !== undefined)) {
		type = config.type;
		defaultValue = config.default;

		if (type === undefined) {
			type = typeof defaultValue;
		} else if (defaultValue === undefined) {
			pullDefault = config.pullDefault;
		} else if (
			componentParamTypeMap.has(type) &&
			componentParamTypeMap.get(type) != typeof defaultValue
		) {
			throw new TypeError('Specified type does not match defaultValue type');
		}

		required = config.required;
		readonly = config.readonly;
	} else {
		defaultValue = config;
		required = readonly = false;
	}

	let typeSerializer = componentParamTypeSerializerMap.get(type);

	if (!typeSerializer) {
		throw new TypeError('Unsupported parameter type');
	}

	let hyphenizedName = hyphenize(name, true);
	let rawValue = el.getAttribute(hyphenizedName);

	if (rawValue === null) {
		if (required) {
			throw new TypeError(`Parameter "${name}" is required`);
		}

		if (defaultValue != null && defaultValue !== false) {
			el.setAttribute(hyphenizedName, typeSerializer.write(defaultValue)!);
		}
	}

	let value = typeSerializer.read(rawValue, defaultValue);
	let descriptor: PropertyDescriptor;

	if (readonly && !pullDefault) {
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

		if (pullDefault) {
			valueCell = new Cell(pullDefault, {
				onChange(evt) {
					component.emit(
						`param-${hyphenizedName}-change`,
						evt.target == valueCell
							? evt.data
							: {
									prevEvent: null,
									prevValue: evt.target,
									value: evt.target
								}
					);
				}
			});

			if (rawValue !== null) {
				valueCell.set(value);
			}
		}

		if (!readonly) {
			params['_' + hyphenizedName] = (rawValue: string | null) => {
				if (rawValue === null && pullDefault) {
					valueCell!.pull();
				} else {
					let val = typeSerializer!.read(rawValue, defaultValue);

					if (valueCell) {
						valueCell.set(val);
					} else {
						value = val;
					}
				}
			};
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
								`param-${hyphenizedName}-change`,
								evt.target == valueCell
									? evt.data
									: {
											prevEvent: null,
											prevValue: evt.target,
											value: evt.target
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

			set: readonly
				? (val: any) => {
						if (val !== value) {
							throw new TypeError(`Parameter "${name}" is readonly`);
						}
					}
				: (val: any) => {
						let rawValue = typeSerializer!.write(val, defaultValue);

						if (rawValue === null) {
							el.removeAttribute(hyphenizedName);
						} else {
							el.setAttribute(hyphenizedName, rawValue);
						}

						if (rawValue === null && pullDefault) {
							valueCell!.pull();
						} else if (valueCell) {
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
		let config = (component.constructor as typeof Component).params;
		let el = component.element;
		let params = {
			$content: null,
			$context: null as any,
			$specified: null as any
		};

		if (config) {
			for (let name in config) {
				initParam(params, name, el);
			}
		}

		return params;
	}
};
