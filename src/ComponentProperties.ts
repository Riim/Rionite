import { Cell, JS } from 'cellx';
import Component from './Component';
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

let ComponentProperties = {
	create(el: HTMLElement): IComponentProperties {
		let component = (el as any).$c as Component;
		let propsConfig = (component.constructor as typeof Component).props;
		let props = { content: null, context: null };

		if (!propsConfig) {
			return props;
		}

		for (let name in propsConfig) {
			let propConfig = propsConfig[name];
			let type = typeof propConfig;
			let defaultValue: any;
			let required: boolean;
			let readonly: boolean;

			if (type == 'function') {
				type = propConfig;
				required = readonly = false;
			} else if (
				type == 'object' && (propConfig.type !== undefined || propConfig.default !== undefined)
			) {
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
				let isReady: boolean;

				let rawValue = props['_' + camelizedName] = props['_' + hyphenizedName] = new Cell(
					el.getAttribute(hyphenizedName),
					{
						merge(v, ov) {
							if (v !== ov) {
								oldValue = value;
								value = handlers[0](v, defaultValue);
							}

							isReady = component.isReady;

							return v;
						},

						onChange(evt) {
							evt['oldValue'] = oldValue;
							evt['value'] = value;

							if (isReady) {
								component.elementAttributeChanged(hyphenizedName, oldValue, value);
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

		return props;
	}
};

export default ComponentProperties;
