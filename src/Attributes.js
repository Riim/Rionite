let { EventEmitter, Cell, js: { is, Map } } = require('cellx');
let camelize = require('./utils/camelize');
let hyphenize = require('./utils/hyphenize');
let escapeHTML = require('./utils/escapeHTML');
let unescapeHTML = require('./utils/unescapeHTML');

let defineProperty = Object.defineProperty;
let toString = Object.prototype.toString;

function isRegExp(value) {
	return toString.call(value) == '[object RegExp]';
}

let typeHandlers = new Map([
	[Boolean, [function(value) {
		return value !== null ? value != 'no' : false;
	}, function(value) {
		return value ? '' : null;
	}]],

	['boolean', [function(value, defaultValue) {
		return value !== null ? value != 'no' : defaultValue;
	}, function(value, defaultValue) {
		return value ? '' : (defaultValue ? 'no' : null);
	}]],

	[Number, [function(value) {
		return value !== null ? +value : void 0;
	}, function(value) {
		return value !== void 0 ? String(+value) : null;
	}]],

	['number', [function(value, defaultValue) {
		return value !== null ? +value : defaultValue;
	}, function(value) {
		return value !== void 0 ? String(+value) : null;
	}]],

	[String, [function(value) {
		return value !== null ? value : void 0;
	}, function(value) {
		return value !== void 0 ? String(value) : null;
	}]],

	['string', [function(value, defaultValue) {
		return value !== null ? value : defaultValue;
	}, function(value) {
		return value !== void 0 ? String(value) : null;
	}]],

	[Object, [function(value, defaultValue, component) {
		return value !== null ? Object(Function(`return ${ unescapeHTML(value) };`).call(component)) : null;
	}, function(value) {
		return value != null ? escapeHTML(isRegExp(value) ? value.toString() : JSON.stringify(value)) : null;
	}]],

	['object', [function(value, defaultValue, component) {
		return value !== null ? Object(Function(`return ${ unescapeHTML(value) };`).call(component)) : defaultValue;
	}, function(value) {
		return value != null ? escapeHTML(isRegExp(value) ? value.toString() : JSON.stringify(value)) : null;
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
					merge(value, oldValue) {
						if (value === void 0) {
							value = null;
						}

						return oldValue && value === oldValue[0] ?
							oldValue :
							[value, handlers[0](value, defaultValue, component)];
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

					let oldValue = attrValue.get()[1];

					attrValue.set(value);

					if (value === null) {
						el.removeAttribute(hyphenizedName);
					} else {
						el.setAttribute(hyphenizedName, value);
					}

					if (component.isReady) {
						value = attrValue.get()[1];

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
