import { hyphenize } from '@riim/hyphenize';
import { Cell, EventEmitter } from 'cellx';
import { Component, IComponentElement } from './Component';
import { componentInputTypeMap } from './componentInputTypeMap';
import { componentInputTypeSerializerMap } from './componentInputTypeSerializerMap';

export interface IComponentInput extends Object {
	$content: DocumentFragment | null;
	$context: { [name: string]: any };
	$specified: Set<string>;
	[name: string]: any;
}

function initComponentInputProperty(componentInput: IComponentInput, name: string, el: IComponentElement) {
	let component = el.$component;
	let cipc = (component.constructor as typeof Component).input![name];

	if (cipc == null) {
		return;
	}

	let type = typeof cipc;
	let defaultValue: any;
	let required: boolean;
	let readonly: boolean;

	if (type == 'function') {
		type = cipc;
		required = readonly = false;
	} else if (type == 'object' && (cipc.type !== undefined || cipc.default !== undefined)) {
		type = cipc.type;
		defaultValue = cipc.default;

		if (type === undefined) {
			type = typeof defaultValue;
		} else if (
			defaultValue !== undefined && componentInputTypeMap.has(type) &&
				componentInputTypeMap.get(type) != typeof defaultValue
		) {
			throw new TypeError('Specified type does not match defaultValue type');
		}

		required = cipc.required;
		readonly = cipc.readonly;
	} else {
		defaultValue = cipc;
		required = readonly = false;
	}

	let typeSerializer = componentInputTypeSerializerMap.get(type);

	if (!typeSerializer) {
		throw new TypeError('Unsupported component input type');
	}

	let hyphenizedName = hyphenize(name, true);
	let rawValue = el.getAttribute(hyphenizedName);

	if (required && rawValue === null) {
		throw new TypeError(`Input property "${ name }" is required`);
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
					throw new TypeError(`Input property "${ name }" is readonly`);
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

		componentInput['_' + name] = setRawValue;

		if (name != hyphenizedName) {
			componentInput['_' + hyphenizedName] = setRawValue;
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
								evt.target == valueCell ?
									{
										type: `input-${ hyphenizedName }-change`,
										data: evt.data
									} :
									{
										type: `input-${ hyphenizedName }-change`,
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

	Object.defineProperty(componentInput, name, descriptor);
}

export let ComponentInput = {
	init(component: Component): IComponentInput {
		let componentInputConfig = (component.constructor as typeof Component).input;
		let el = component.element;
		let componentInput = { $content: null, $context: null as any, $specified: null as any };

		if (componentInputConfig) {
			for (let name in componentInputConfig) {
				initComponentInputProperty(componentInput, name, el);
			}
		}

		return componentInput;
	}
};
