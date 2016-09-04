import { EventEmitter, Cell, JS } from 'cellx';
import attributeTypeHandlerMap from './attributeTypeHandlerMap';
import camelize from './Utils/camelize';
import hyphenize from './Utils/hyphenize';

let Map = JS.Map;

let typeMap = new Map([
	['boolean', 'boolean'],
	[Boolean, 'boolean'],
	['number', 'number'],
	[Number, 'number'],
	['string', 'string'],
	[String, 'string']
]);

/**
 * @typesign new ElementAttributes(el: HTMLElement) -> Rionite.ElementAttributes;
 */
let ElementAttributes = EventEmitter.extend({
	constructor: function ElementAttributes(el) {
		let component = el.$c;
		let attributesConfig = component.constructor.elementAttributes;

		for (let name in attributesConfig) {
			let attrConfig = attributesConfig[name];
			let type = typeof attrConfig;
			let defaultValue;
			let required;
			let readonly;

			if (type == 'function') {
				type = attrConfig;
				required = readonly = false;
			} else if (type == 'object' && (attrConfig.type !== void 0 || attrConfig.defaultValue !== void 0)) {
				type = attrConfig.type;
				defaultValue = attrConfig.default;

				if (type === void 0) {
					type = typeof defaultValue;
				} else if (defaultValue !== void 0 && (typeMap.get(type) || '') != typeof defaultValue) {
					throw new TypeError('Specified type does not match type of defaultValue');
				}

				required = attrConfig.required;
				readonly = attrConfig.readonly;
			} else {
				defaultValue = attrConfig;
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

			let attrValue = this['_' + camelizedName] = this['_' + hyphenizedName] = new Cell(
				el.getAttribute(hyphenizedName),
				{
					validate: readonly ? (value, oldValue) => {
						if (oldValue) {
							throw new TypeError(`Property "${ name }" is readonly`);
						}
					} : null,

					merge(value, oldValue) {
						return oldValue && value === oldValue[0] ? oldValue : [value, handlers[0](value, defaultValue)];
					},

					onChange(evt) {
						if (component.isReady) {
							component.elementAttributeChanged(hyphenizedName, evt.oldValue[1], evt.value[1]);
						}
					}
				}
			);

			let descriptor = {
				configurable: true,
				enumerable: true,

				get() {
					return attrValue.get()[1];
				},

				set: readonly ? value => {
					if (value !== attrValue.get()[1]) {
						throw new TypeError(`Property "${ name }" is readonly`);
					}
				} : value => {
					value = handlers[1](value, defaultValue);

					if (value === null) {
						el.removeAttribute(hyphenizedName);
					} else {
						el.setAttribute(hyphenizedName, value);
					}

					attrValue.set(value);
				}
			};

			Object.defineProperty(this, camelizedName, descriptor);

			if (hyphenizedName != camelizedName) {
				Object.defineProperty(this, hyphenizedName, descriptor);
			}
		}
	}
});

export default ElementAttributes;
