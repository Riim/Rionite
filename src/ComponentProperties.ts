import { Cell, JS } from 'cellx';
import { IComponentElement, default as Component } from './Component';
import attributeTypeHandlerMap from './attributeTypeHandlerMap';
import camelize from './Utils/camelize';
import hyphenize from './Utils/hyphenize';

let Map = JS.Map;

let typeMap = new Map<any, string>([
	[Boolean, 'boolean'],
	['boolean', 'boolean'],
	[Number, 'number'],
	['number', 'number'],
	[String, 'string'],
	['string', 'string']
]);

export interface IComponentProperties {
	content: any;
	context: any;
	[name: string]: any;
}

function initProperty(props: IComponentProperties, name: string, el: IComponentElement) {
	let component = el.$c;
	let propConfig = (component.constructor as any).props[name];
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
		} else if (defaultValue !== undefined && typeMap.get(type) !== typeof defaultValue) {
			throw new TypeError('Specified type does not match type of defaultValue');
		}

		required = propConfig.required;
		readonly = propConfig.readonly;
	} else {
		defaultValue = propConfig;
		required = readonly = false;
	}

	let handlers = attributeTypeHandlerMap.get(type);

	if (!handlers) {
		throw new TypeError('Unsupported attribute type');
	}

	let camelizedName = camelize(name);
	let hyphenizedName = hyphenize(name);

	if (required && !el.hasAttribute(hyphenizedName)) {
		throw new TypeError(`Property "${ name }" is required`);
	}

	let descriptor: Object;

	if (readonly) {
		let value = handlers[0](el.getAttribute(hyphenizedName), defaultValue);

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
		let oldValue: any;
		let value: any;
		let needHandling = false;

		let rawValue = props['_' + camelizedName] = new Cell(
			el.getAttribute(hyphenizedName),
			{
				merge(v, ov) {
					if (v !== ov) {
						let newValue = handlers[0](v, defaultValue);

						if (newValue === value) {
							return ov;
						}

						oldValue = value;
						value = newValue;
						needHandling = component.isReady;
					}

					return v;
				},

				onChange(evt) {
					evt['oldValue'] = oldValue;
					evt['value'] = value;

					if (needHandling) {
						needHandling = false;
						component.propertyChanged(camelizedName, value, oldValue);
					}
				}
			}
		);

		descriptor = {
			configurable: true,
			enumerable: true,

			get() {
				rawValue.get();
				return value;
			},

			set(v: any) {
				v = handlers[1](v, defaultValue);

				if (v === null) {
					el.removeAttribute(hyphenizedName);
				} else {
					el.setAttribute(hyphenizedName, v);
				}

				rawValue.set(v);
			}
		};
	}

	Object.defineProperty(props, camelizedName, descriptor);

	if (hyphenizedName != camelizedName) {
		Object.defineProperty(props, hyphenizedName, descriptor);
	}
}

let ComponentProperties = {
	create(el: IComponentElement): IComponentProperties {
		let propsConfig = (el.$c.constructor as typeof Component).props;
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
