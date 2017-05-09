import { EventEmitter, Cell } from 'cellx';
import { IComponentElement, default as Component } from './Component';
import componentPropertyTypeMap from './componentPropertyTypeMap';
import componentPropertyTypeHandlersMap from './componentPropertyTypeHandlersMap';
import hyphenize from './Utils/hyphenize';

export interface IComponentProperties extends Object {
	content: DocumentFragment | null;
	context: Object | null;
	[name: string]: any;
}

function initProperty(props: IComponentProperties, name: string, el: IComponentElement) {
	let component = el.$component;
	let propConfig = ((component.constructor as typeof Component).props as { [name: string]: any })[name];
	let type = typeof propConfig;
	let defaultValue: any;
	let required: boolean;
	let readonly: boolean;

	if (type == 'function') {
		type = propConfig;
		required = readonly = false;
	} else if (type == 'object' && (propConfig.type !== undefined || propConfig.default !== undefined)) {
		type = propConfig.type;
		defaultValue = propConfig.default;

		if (type === undefined) {
			type = typeof defaultValue;
		} else if (
			defaultValue !== undefined && componentPropertyTypeMap.has(type) &&
				componentPropertyTypeMap.get(type) != (defaultValue === null ? 'null' : typeof defaultValue)
		) {
			throw new TypeError('Specified type does not match type of defaultValue');
		}

		required = propConfig.required;
		readonly = propConfig.readonly;
	} else {
		defaultValue = propConfig;
		required = readonly = false;
	}

	let handlers = componentPropertyTypeHandlersMap.get(type);

	if (!handlers) {
		throw new TypeError('Unsupported attribute type');
	}

	let hyphenizedName = hyphenize(name);
	let rawValue = el.getAttribute(hyphenizedName);

	if (required && rawValue === null) {
		throw new TypeError(`Property "${ name }" is required`);
	}

	let descriptor: Object;

	if (readonly) {
		let value = handlers[0](rawValue, defaultValue, component);

		descriptor = {
			configurable: true,
			enumerable: true,

			get() {
				return value;
			},

			set(v: any) {
				if (v !== value) {
					throw new TypeError(`Property "${ name }" is readonly`);
				}
			}
		};
	} else {
		let value = handlers[0](rawValue, defaultValue, component);
		let valueCell: Cell<any> | undefined;

		if (rawValue === null && defaultValue != null && defaultValue !== false) {
			props['_initialize_' + name] = () => {
				el.setAttribute(hyphenizedName, handlers[1](defaultValue) as string);
			};
		}

		let setRawValue = (rawValue: string | null) => {
			let v = handlers[0](rawValue, defaultValue, component);

			if (valueCell) {
				valueCell.set(v);
			} else {
				value = v;
			}
		};

		props['_' + name] = setRawValue;

		if (name != hyphenizedName) {
			props['_' + hyphenizedName] = setRawValue;
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
					valueCell = new Cell<any>(value, {
						onChange(evt) {
							component.emit({
								type: `property-${ hyphenizedName }-change`,
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
				let rawValue = handlers[1](v, defaultValue);

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

	Object.defineProperty(props, name, descriptor);
}

let ComponentProperties = {
	init(component: Component): IComponentProperties {
		let propsConfig = (component.constructor as typeof Component).props;
		let el = component.element;
		let props = { content: null, context: null };

		if (propsConfig) {
			for (let name in propsConfig) {
				initProperty(props, name, el);
			}
		}

		return props;
	}
};

export default ComponentProperties;
