import { EventEmitter, Cell } from 'cellx';
import attributeTypeHandlers from './attributeTypeHandlers';
import camelize from './Utils/camelize';
import hyphenize from './Utils/hyphenize';

/**
 * @typesign new ElementAttributes(el: HTMLElement) -> Rionite.ElementAttributes;
 */
let ElementAttributes = EventEmitter.extend({
	constructor: function ElementAttributes(el) {
		let component = el.$c;
		let attributesConfig = component.constructor.elementAttributes;

		for (let name in attributesConfig) {
			let defaultValue = attributesConfig[name];
			let type = typeof defaultValue;
			let handlers = attributeTypeHandlers.get(type == 'function' ? defaultValue : type);

			if (!handlers) {
				throw new TypeError('Unsupported attribute type');
			}

			let camelizedName = camelize(name);
			let hyphenizedName = hyphenize(name);

			let attrValue = this['_' + camelizedName] = this['_' + hyphenizedName] = new Cell(
				el.getAttribute(hyphenizedName),
				{
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

				set(value) {
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
