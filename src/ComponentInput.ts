import { EventEmitter, Cell } from 'cellx';
import { IComponentElement, default as Component } from './Component';
import componentInputTypeMap from './componentInputTypeMap';
import componentInputTypeSerializerMap from './componentInputTypeSerializerMap';
import hyphenize from './Utils/hyphenize';

export interface IComponentInput extends Object {
	$content: DocumentFragment | null;
	$context: Object | null;
	[name: string]: any;
}

function initInputProperty(input: IComponentInput, name: string, el: IComponentElement) {
	let component = el.$component;
	let inputPropertyConfig = ((component.constructor as typeof Component).input as { [name: string]: any })[name];

	if (inputPropertyConfig == null) {
		return;
	}

	let type = typeof inputPropertyConfig;
	let defaultValue: any;
	let required: boolean;
	let readonly: boolean;

	if (type == 'function') {
		type = inputPropertyConfig;
		required = readonly = false;
	} else if (
		type == 'object' && (inputPropertyConfig.type !== undefined || inputPropertyConfig.default !== undefined)
	) {
		type = inputPropertyConfig.type;
		defaultValue = inputPropertyConfig.default;

		if (type === undefined) {
			type = typeof defaultValue;
		} else if (
			defaultValue !== undefined && componentInputTypeMap.has(type) &&
				componentInputTypeMap.get(type) != typeof defaultValue
		) {
			throw new TypeError('Specified type does not match defaultValue type');
		}

		required = inputPropertyConfig.required;
		readonly = inputPropertyConfig.readonly;
	} else {
		defaultValue = inputPropertyConfig;
		required = readonly = false;
	}

	let typeSerializer = componentInputTypeSerializerMap.get(type);

	if (!typeSerializer) {
		throw new TypeError('Unsupported component input type');
	}

	let hyphenizedName = hyphenize(name);
	let rawValue = el.getAttribute(hyphenizedName);

	if (required && rawValue === null) {
		throw new TypeError(`Property "${ name }" is required`);
	}

	let descriptor: Object;

	if (readonly) {
		let value = typeSerializer.read(rawValue, defaultValue, component);

		descriptor = {
			configurable: true,
			enumerable: true,

			get() {
				return value;
			},

			set(v: any) {
				if (v !== value) {
					throw new TypeError(`Input property "${ name }" is readonly`);
				}
			}
		};
	} else {
		let value = typeSerializer.read(rawValue, defaultValue, component);
		let valueCell: Cell | undefined;

		if (rawValue === null && defaultValue != null && defaultValue !== false) {
			input['_initialize_' + name] = () => {
				el.setAttribute(hyphenizedName, typeSerializer.write(defaultValue) as string);
			};
		}

		let setRawValue = (rawValue: string | null) => {
			let v = typeSerializer.read(rawValue, defaultValue, component);

			if (valueCell) {
				valueCell.set(v);
			} else {
				value = v;
			}
		};

		input['_' + name] = setRawValue;

		if (name != hyphenizedName) {
			input['_' + hyphenizedName] = setRawValue;
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
							component.emit({
								type: `input-${ hyphenizedName }-change`,
								oldValue: evt.oldValue,
								value: evt.value
							});
						}
					});

					if (currentlyPulling) {
						return valueCell.get();
					}
				}

				return value;
			},

			set(v: any) {
				let rawValue = typeSerializer.write(v, defaultValue);

				if (rawValue === null) {
					el.removeAttribute(hyphenizedName);
				} else {
					el.setAttribute(hyphenizedName, rawValue);
				}

				if (valueCell) {
					valueCell.set(v);
				} else {
					value = v;
				}
			}
		};
	}

	Object.defineProperty(input, name, descriptor);
}

let ComponentInput = {
	init(component: Component): IComponentInput {
		let inputConfig = (component.constructor as typeof Component).input;
		let el = component.element;
		let input = { $content: null, $context: null };

		if (inputConfig) {
			for (let name in inputConfig) {
				initInputProperty(input, name, el);
			}
		}

		return input;
	}
};

export default ComponentInput;
