let { EventEmitter, Cell, js: { Map } } = require('cellx');
let camelize = require('./utils/camelize');
let hyphenize = require('./utils/hyphenize');
let escapeHTML = require('./utils/escapeHTML');
let unescapeHTML = require('./utils/unescapeHTML');

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
			let hyphenizedName = hyphenize(camelizedName);
			let privateName = '_' + hyphenizedName;

			let attrValue = this[privateName] = new Cell(el.getAttribute(hyphenizedName), {
				merge(value) {
					return handlers[0](value, defaultValue);
				}
			});
			let descriptor = {
				configurable: true,
				enumerable: true,

				get() {
					return attrValue.get();
				},

				set(value) {
					value = handlers[1](value, defaultValue);

					if (value === void 0) {
						el.removeAttribute(hyphenizedName);
					} else {
						el.setAttribute(hyphenizedName, value);
					}
				}
			};

			Object.defineProperty(this, camelizedName, descriptor);

			if (hyphenizedName != camelizedName) {
				Object.defineProperty(this, hyphenizedName, descriptor);
			}
		}
	}
});

module.exports = Attributes;
