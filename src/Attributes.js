let { EventEmitter, Cell, js: { is, Map } } = require('cellx');
let camelize = require('./utils/camelize');
let hyphenize = require('./utils/hyphenize');
let escapeHTML = require('./utils/escapeHTML');
let unescapeHTML = require('./utils/unescapeHTML');

let defineProperty = Object.defineProperty;

let typeHandlers = new Map([
	[Boolean, [function(value) {
		return value != null ? value != 'no' : false;
	}, function(value) {
		return value ? '' : void 0;
	}]],

	['boolean', [function(value, defaultValue) {
		return value != null ? value != 'no' : defaultValue;
	}, function(value, defaultValue) {
		return value ? '' : (defaultValue ? 'no' : void 0);
	}]],

	[Number, [function(value) {
		return value != null ? +value : void 0;
	}, function(value) {
		return value !== void 0 ? String(+value) : void 0;
	}]],

	['number', [function(value, defaultValue) {
		return value != null ? +value : defaultValue;
	}, function(value) {
		return value !== void 0 ? String(+value) : void 0;
	}]],

	[String, [function(value) {
		return value != null ? value : void 0;
	}, function(value) {
		return value !== void 0 ? String(value) : void 0;
	}]],

	['string', [function(value, defaultValue) {
		return value != null ? value : defaultValue;
	}, function(value) {
		return value !== void 0 ? String(value) : void 0;
	}]],

	[Object, [function(value) {
		return value != null ? Object(Function(`return ${ unescapeHTML(value) };`)()) : null;
	}, function(value) {
		return value != null ? escapeHTML(JSON.stringify(value)) : void 0;
	}]],

	['object', [function(value, defaultValue) {
		return value != null ? Object(Function(`return ${ unescapeHTML(value) };`)()) : defaultValue;
	}, function(value) {
		return value != null ? escapeHTML(JSON.stringify(value)) : void 0;
	}]]
]);

/**
 * @typesign new Attributes(component: Rista.Component) -> Rista.Attributes;
 */
let Attributes = EventEmitter.extend({
	Static: {
		typeHandlers
	},

	constructor: function Attributes(component) {
		let el = component.element;
		let schema = component.constructor.elementAttributes;

		for (let name in schema) {
			let defaultValue = schema[name];
			let type = typeof defaultValue;
			let handlers = typeHandlers.get(type == 'function' ? defaultValue : type);

			if (!handlers) {
				throw new TypeError('Unsupported attribute type');
			}

			let camelizedName = camelize(name);
			let hyphenizedName = hyphenize(name);

			let attrValue = this['_' + camelizedName] = this['_' + hyphenizedName] = new Cell(
				el.getAttribute(hyphenizedName),
				{
					merge(value) {
						return handlers[0].call(component, value, defaultValue);
					}
				}
			);

			let descriptor = {
				configurable: true,
				enumerable: true,

				get() {
					return attrValue.get();
				},

				set(value) {
					let oldValue = attrValue.get();

					if (is(value, oldValue)) {
						return;
					}

					value = handlers[1](value, defaultValue);

					attrValue.set(value);

					if (value === void 0) {
						el.removeAttribute(hyphenizedName);
					} else {
						el.setAttribute(hyphenizedName, value);
					}

					if (component.isReady) {
						value = attrValue.get();

						if (!is(value, oldValue)) {
							component.emit({
								type: `element-attribute-${ hyphenizedName }-change`,
								oldValue: oldValue,
								value: value
							});
							component.emit({
								type: 'element-attribute-change',
								name: hyphenizedName,
								oldValue: oldValue,
								value: value
							});

							if (component.elementAttributeChanged) {
								component.elementAttributeChanged(hyphenizedName, oldValue, value);
							}
						}
					}
				}
			};

			defineProperty(this, camelizedName, descriptor);

			if (hyphenizedName != camelizedName) {
				defineProperty(this, hyphenizedName, descriptor);
			}
		}
	}
});

module.exports = Attributes;
