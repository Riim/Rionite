(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory(require('cellx')) :
  typeof define === 'function' && define.amd ? define(['cellx'], factory) :
  (global.Rionite = global.rionite = factory(global.cellx));
}(this, (function (cellx) { 'use strict';

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) {
  return typeof obj;
} : function (obj) {
  return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj;
};

var defineProperty = function (obj, key, value) {
  if (key in obj) {
    Object.defineProperty(obj, key, {
      value: value,
      enumerable: true,
      configurable: true,
      writable: true
    });
  } else {
    obj[key] = value;
  }

  return obj;
};

var nextUID = cellx.Utils.nextUID;

var DisposableMixin = cellx.EventEmitter.extend({
	constructor: function DisposableMixin() {
		/**
   * @type {Object<{ dispose: () }>}
   */
		this._disposables = {};
	},

	listenTo: function listenTo(target, type, listener, context) {
		var _this = this;

		var listenings = void 0;

		if (Array.isArray(target) || target instanceof NodeList || target instanceof HTMLCollection || target.addClass && target.each) {
			if ((typeof type === 'undefined' ? 'undefined' : _typeof(type)) == 'object' && !Array.isArray(type)) {
				if (arguments.length < 3) {
					listener = this;
				}
			} else if (arguments.length < 4) {
				context = this;
			}

			listenings = [];

			for (var i = 0, l = target.length; i < l; i++) {
				listenings.push(this.listenTo(target[i], type, listener, context));
			}
		} else if ((typeof type === 'undefined' ? 'undefined' : _typeof(type)) == 'object') {
			listenings = [];

			if (Array.isArray(type)) {
				if (arguments.length < 4) {
					context = this;
				}

				var types = type;

				for (var _i = 0, _l = types.length; _i < _l; _i++) {
					listenings.push(this.listenTo(target, types[_i], listener, context));
				}
			} else {
				context = arguments.length < 3 ? this : listener;

				var listeners = type;

				for (var _type in listeners) {
					listenings.push(this.listenTo(target, _type, listeners[_type], context));
				}
			}
		} else {
			if (arguments.length < 4) {
				context = this;
			}

			if ((typeof listener === 'undefined' ? 'undefined' : _typeof(listener)) == 'object') {
				var _listeners = listener;

				listenings = [];

				if (Array.isArray(_listeners)) {
					for (var _i2 = 0, _l2 = _listeners.length; _i2 < _l2; _i2++) {
						listenings.push(this.listenTo(target, type, _listeners[_i2], context));
					}
				} else {
					for (var name in _listeners) {
						listenings.push(this.listenTo(target[name]('unwrap', 0), type, _listeners[name], context));
					}
				}
			} else {
				return this._listenTo(target, type, listener, context);
			}
		}

		var id = nextUID();

		var stopListening = function stopListening() {
			for (var _i3 = listenings.length; _i3;) {
				listenings[--_i3].stop();
			}

			delete _this._disposables[id];
		};

		var listening = this._disposables[id] = {
			stop: stopListening,
			dispose: stopListening
		};

		return listening;
	},


	/**
  * @typesign (
  *     target: cellx.EventEmitter|EventTarget,
  *     type: string,
  *     listener: (evt: cellx~Event|Event) -> ?boolean,
  *     context
  * ) -> { stop: (), dispose: () };
  */
	_listenTo: function _listenTo(target, type, listener, context) {
		var _this2 = this;

		if (target instanceof cellx.EventEmitter) {
			target.on(type, listener, context);
		} else if (target.addEventListener) {
			if (target !== context) {
				listener = listener.bind(context);
			}

			target.addEventListener(type, listener);
		} else {
			throw new TypeError('Unable to add a listener');
		}

		var id = nextUID();

		var stopListening = function stopListening() {
			if (_this2._disposables[id]) {
				if (target instanceof cellx.EventEmitter) {
					target.off(type, listener, context);
				} else {
					target.removeEventListener(type, listener);
				}

				delete _this2._disposables[id];
			}
		};

		var listening = this._disposables[id] = {
			stop: stopListening,
			dispose: stopListening
		};

		return listening;
	},


	/**
  * @typesign (cb: Function, delay: uint) -> { clear: (), dispose: () };
  */
	setTimeout: function (_setTimeout) {
		function setTimeout(_x, _x2) {
			return _setTimeout.apply(this, arguments);
		}

		setTimeout.toString = function () {
			return _setTimeout.toString();
		};

		return setTimeout;
	}(function (cb, delay) {
		var _this3 = this;

		var id = nextUID();

		var timeoutId = setTimeout(function () {
			delete _this3._disposables[id];
			cb.call(_this3);
		}, delay);

		var clearTimeout_ = function clearTimeout_() {
			if (_this3._disposables[id]) {
				clearTimeout(timeoutId);
				delete _this3._disposables[id];
			}
		};

		var timeout = this._disposables[id] = {
			clear: clearTimeout_,
			dispose: clearTimeout_
		};

		return timeout;
	}),


	/**
  * @typesign (cb: Function, delay: uint) -> { clear: (), dispose: () };
  */
	setInterval: function (_setInterval) {
		function setInterval(_x3, _x4) {
			return _setInterval.apply(this, arguments);
		}

		setInterval.toString = function () {
			return _setInterval.toString();
		};

		return setInterval;
	}(function (cb, delay) {
		var _this4 = this;

		var id = nextUID();

		var intervalId = setInterval(function () {
			cb.call(_this4);
		}, delay);

		var clearInterval_ = function clearInterval_() {
			if (_this4._disposables[id]) {
				clearInterval(intervalId);
				delete _this4._disposables[id];
			}
		};

		var interval = this._disposables[id] = {
			clear: clearInterval_,
			dispose: clearInterval_
		};

		return interval;
	}),


	/**
  * @typesign (cb: Function) -> { (), cancel: (), dispose: () };
  */
	registerCallback: function registerCallback(cb) {
		var _this5 = this;

		var id = nextUID();
		var component = this;

		var cancelCallback = function cancelCallback() {
			delete _this5._disposables[id];
		};

		function wrapper() {
			if (component._disposables[id]) {
				delete component._disposables[id];
				return cb.apply(component, arguments);
			}
		}
		wrapper.cancel = cancelCallback;
		wrapper.dispose = cancelCallback;

		this._disposables[id] = wrapper;

		return wrapper;
	},


	/**
  * @typesign () -> Rionite.DisposableMixin;
  */
	dispose: function dispose() {
		var disposables = this._disposables;

		for (var id in disposables) {
			disposables[id].dispose();
		}

		return this;
	}
});

var reEscapableChars = /[&<>"]/g;
var charToEntityMap = Object.create(null);

charToEntityMap['&'] = '&amp;';
charToEntityMap['<'] = '&lt;';
charToEntityMap['>'] = '&gt;';
charToEntityMap['"'] = '&quot;';

function escapeHTML(str) {
	return reEscapableChars.test(str) ? str.replace(reEscapableChars, function (chr) {
		return charToEntityMap[chr];
	}) : str;
}

var reEscapableEntities = /&(?:amp|lt|gt|quot);/g;
var entityToCharMap = Object.create(null);

entityToCharMap['&amp;'] = '&';
entityToCharMap['&lt;'] = '<';
entityToCharMap['&gt;'] = '>';
entityToCharMap['&quot;'] = '"';

function unescapeHTML(str) {
	return reEscapableEntities.test(str) ? str.replace(reEscapableEntities, function (entity) {
		return entityToCharMap[entity];
	}) : str;
}

var hasOwn = Object.prototype.hasOwnProperty;
var toString = Object.prototype.toString;

function isRegExp(value) {
	return toString.call(value) == '[object RegExp]';
}

var Map$1 = cellx.JS.Map;

var attributeTypeHandlerMap = new Map$1([[Boolean, [function (value) {
	return value !== null ? value != 'no' : false;
}, function (value) {
	return value ? '' : null;
}]], ['boolean', [function (value, defaultValue) {
	return value !== null ? value != 'no' : defaultValue;
}, function (value, defaultValue) {
	return value ? '' : defaultValue ? 'no' : null;
}]], [Number, [function (value) {
	return value !== null ? +value : void 0;
}, function (value) {
	return value !== void 0 ? String(+value) : null;
}]], ['number', [function (value, defaultValue) {
	return value !== null ? +value : defaultValue;
}, function (value) {
	return value !== void 0 ? String(+value) : null;
}]], [String, [function (value) {
	return value !== null ? value : void 0;
}, function (value) {
	return value !== void 0 ? String(value) : null;
}]], ['string', [function (value, defaultValue) {
	return value !== null ? value : defaultValue;
}, function (value) {
	return value !== void 0 ? String(value) : null;
}]], [Object, [function (value) {
	return value !== null ? Object(Function('return ' + unescapeHTML(value) + ';')()) : void 0;
}, function (value) {
	return value != null ? escapeHTML(isRegExp(value) ? value.toString() : JSON.stringify(value)) : null;
}]], ['object', [function (value, defaultValue) {
	return value !== null ? Object(Function('return ' + unescapeHTML(value) + ';')()) : defaultValue;
}, function (value) {
	return value != null ? escapeHTML(isRegExp(value) ? value.toString() : JSON.stringify(value)) : null;
}]]]);

var reHyphen = /[-_]+([a-z]|$)/g;

var cache = Object.create(null);

function camelize(str) {
	return cache[str] || (cache[str] = str.replace(reHyphen, function (match, chr) {
		return chr.toUpperCase();
	}));
}

var reHump = /-?([A-Z])([^A-Z])/g;
var reLongHump = /-?([A-Z]+)/g;
var reMinus = /^-/;

var cache$1 = Object.create(null);

function hyphenize(str) {
	return cache$1[str] || (cache$1[str] = str.replace(reHump, function (match, chr1, chr2) {
		return '-' + chr1.toLowerCase() + chr2;
	}).replace(reLongHump, function (match, chars) {
		return '-' + chars.toLowerCase();
	}).replace(reMinus, ''));
}

var Map = cellx.JS.Map;

var typeMap = new Map([['boolean', 'boolean'], [Boolean, 'boolean'], ['number', 'number'], [Number, 'number'], ['string', 'string'], [String, 'string']]);

/**
 * @typesign new ElementAttributes(el: HTMLElement) -> Rionite.ElementAttributes;
 */
var ElementAttributes = cellx.EventEmitter.extend({
	constructor: function ElementAttributes(el) {
		var _this = this;

		var component = el.$c;
		var attributesConfig = component.constructor.elementAttributes;

		var _loop = function _loop(name) {
			var attrConfig = attributesConfig[name];
			var type = typeof attrConfig === 'undefined' ? 'undefined' : _typeof(attrConfig);
			var defaultValue = void 0;
			var required = void 0;
			var readonly = void 0;

			if (type == 'function') {
				type = attrConfig;
				required = readonly = false;
			} else if (type == 'object' && (attrConfig.type !== void 0 || attrConfig.default !== void 0)) {
				type = attrConfig.type;
				defaultValue = attrConfig.default;

				if (type === void 0) {
					type = typeof defaultValue === 'undefined' ? 'undefined' : _typeof(defaultValue);
				} else if (defaultValue !== void 0 && (typeMap.get(type) || '') != (typeof defaultValue === 'undefined' ? 'undefined' : _typeof(defaultValue))) {
					throw new TypeError('Specified type does not match type of defaultValue');
				}

				required = attrConfig.required;
				readonly = attrConfig.readonly;
			} else {
				defaultValue = attrConfig;
				required = readonly = false;
			}

			var handlers = attributeTypeHandlerMap.get(type);

			if (!handlers) {
				throw new TypeError('Unsupported attribute type');
			}

			var camelizedName = camelize(name);
			var hyphenizedName = hyphenize(name);

			if (required && !el.hasAttribute(hyphenizedName)) {
				throw new TypeError('Property "' + name + '" is required');
			}

			var attrValue = _this['_' + camelizedName] = _this['_' + hyphenizedName] = new cellx.Cell(el.getAttribute(hyphenizedName), {
				validate: readonly ? function (value, oldValue) {
					if (oldValue && value !== oldValue[0]) {
						throw new TypeError('Property "' + name + '" is readonly');
					}
				} : null,

				merge: function merge(value, oldValue) {
					return oldValue && value === oldValue[0] ? oldValue : [value, handlers[0](value, defaultValue)];
				},
				onChange: function onChange(evt) {
					if (component.isReady) {
						component.elementAttributeChanged(hyphenizedName, evt.oldValue[1], evt.value[1]);
					}
				}
			});

			var descriptor = {
				configurable: true,
				enumerable: true,

				get: function get() {
					return attrValue.get()[1];
				},


				set: readonly ? function (value) {
					if (value !== attrValue.get()[1]) {
						throw new TypeError('Property "' + name + '" is readonly');
					}
				} : function (value) {
					value = handlers[1](value, defaultValue);

					if (value === null) {
						el.removeAttribute(hyphenizedName);
					} else {
						el.setAttribute(hyphenizedName, value);
					}

					attrValue.set(value);
				}
			};

			Object.defineProperty(_this, camelizedName, descriptor);

			if (hyphenizedName != camelizedName) {
				Object.defineProperty(_this, hyphenizedName, descriptor);
			}
		};

		for (var name in attributesConfig) {
			_loop(name);
		}
	}
});

var mixin$1 = cellx.Utils.mixin;

var elementConstructorMap = mixin$1(Object.create(null), {
	a: window.HTMLAnchorElement,
	blockquote: window.HTMLQuoteElement,
	br: window.HTMLBRElement,
	caption: window.HTMLTableCaptionElement,
	col: window.HTMLTableColElement,
	colgroup: window.HTMLTableColElement,
	datalist: window.HTMLDataListElement,
	del: window.HTMLModElement,
	dir: window.HTMLDirectoryElement,
	dl: window.HTMLDListElement,
	document: window.HTMLDocument,
	element: Element,
	fieldset: window.HTMLFieldSetElement,
	frameset: window.HTMLFrameSetElement,
	h1: window.HTMLHeadingElement,
	h2: window.HTMLHeadingElement,
	h3: window.HTMLHeadingElement,
	h4: window.HTMLHeadingElement,
	h5: window.HTMLHeadingElement,
	h6: window.HTMLHeadingElement,
	hr: window.HTMLHRElement,
	iframe: window.HTMLIFrameElement,
	img: window.HTMLImageElement,
	ins: window.HTMLModElement,
	li: window.HTMLLIElement,
	menuitem: window.HTMLMenuItemElement,
	ol: window.HTMLOListElement,
	optgroup: window.HTMLOptGroupElement,
	p: window.HTMLParagraphElement,
	q: window.HTMLQuoteElement,
	tbody: window.HTMLTableSectionElement,
	td: window.HTMLTableCellElement,
	template: window.HTMLTemplateElement || HTMLElement,
	textarea: window.HTMLTextAreaElement,
	tfoot: window.HTMLTableSectionElement,
	th: window.HTMLTableCellElement,
	thead: window.HTMLTableSectionElement,
	tr: window.HTMLTableRowElement,
	ul: window.HTMLUListElement,
	vhgroupv: window.HTMLUnknownElement,
	vkeygen: window.HTMLUnknownElement
});

var queue = void 0;

function run() {
	var track = queue;

	queue = null;

	for (var i = 0, l = track.length; i < l; i++) {
		var item = track[i];

		try {
			item.callback.call(item.context);
		} catch (err) {
			cellx.ErrorLogger.log(err);
		}
	}
}

function defer(cb, context) {
	if (queue) {
		queue.push({ callback: cb, context: context });
	} else {
		queue = [{ callback: cb, context: context }];
		setTimeout(run, 1);
	}
}

var _ElementProtoMixin;

var _Symbol$1 = cellx.JS.Symbol;

var attached = _Symbol$1('attached');

var ElementProtoMixin = (_ElementProtoMixin = {
	rioniteComponent: null,

	get $c() {
		return new this._rioniteComponentConstructor(this);
	}

}, defineProperty(_ElementProtoMixin, attached, false), defineProperty(_ElementProtoMixin, 'connectedCallback', function connectedCallback() {
	this[attached] = true;

	var component = this.rioniteComponent;

	if (component) {
		if (component.isElementAttached) {
			if (component._parentComponent === null) {
				component._parentComponent = void 0;
				component.elementMoved();
			}
		} else {
			component._parentComponent = void 0;
			component.isElementAttached = true;
			component._attachElement();
		}
	} else {
		defer(function () {
			if (this[attached]) {
				var _component = this.$c;

				_component._parentComponent = void 0;

				if (!_component.parentComponent) {
					_component.isElementAttached = true;
					_component._attachElement();
				}
			}
		}, this);
	}
}), defineProperty(_ElementProtoMixin, 'disconnectedCallback', function disconnectedCallback() {
	this[attached] = false;

	var component = this.rioniteComponent;

	if (component && component.isElementAttached) {
		component._parentComponent = null;

		defer(function () {
			if (component._parentComponent === null && component.isElementAttached) {
				component.isElementAttached = false;
				component._detachElement();
			}
		});
	}
}), defineProperty(_ElementProtoMixin, 'attributeChangedCallback', function attributeChangedCallback(name, oldValue, value) {
	var component = this.rioniteComponent;

	if (component && component.isReady) {
		var attrs = component.elementAttributes;
		var privateName = '_' + name;

		if (hasOwn.call(attrs, privateName)) {
			attrs[privateName].set(value);
		}
	}
}), _ElementProtoMixin);

var mixin = cellx.Utils.mixin;

var inheritedStaticProperties = ['elementExtends', 'elementAttributes', 'props', 'i18n', 'template', 'assets'];

function registerComponent(componentConstr) {
	var elIs = componentConstr.elementIs;

	if (!elIs) {
		throw new TypeError('Static property "elementIs" is required');
	}

	var parentComponentConstr = void 0;

	inheritedStaticProperties.forEach(function (name) {
		if (!hasOwn.call(componentConstr, name)) {
			Object.defineProperty(componentConstr, name, Object.getOwnPropertyDescriptor(parentComponentConstr || (parentComponentConstr = Object.getPrototypeOf(componentConstr.prototype).constructor), name));
		}
	});

	var elExtends = componentConstr.elementExtends;

	var parentElConstr = elExtends ? elementConstructorMap[elExtends] || window['HTML' + (elExtends.charAt(0).toUpperCase() + elExtends.slice(1)) + 'Element'] : HTMLElement;

	var elConstr = function elConstr(self) {
		parentElConstr.call(this, self);
		return self;
	};
	var elProto = elConstr.prototype = Object.create(parentElConstr.prototype);

	Object.defineProperty(elConstr, 'observedAttributes', {
		configurable: true,
		enumerable: true,

		get: function get() {
			var elementAttributes = componentConstr.elementAttributes;
			return elementAttributes ? Object.keys(elementAttributes).map(function (name) {
				return hyphenize(name);
			}) : [];
		}
	});

	mixin(elProto, ElementProtoMixin);

	Object.defineProperty(elProto, 'constructor', {
		configurable: true,
		writable: true,
		value: elConstr
	});

	elProto._rioniteComponentConstructor = componentConstr;

	elementConstructorMap[elIs] = customElements.define(elIs, elConstr, elExtends ? { extends: elExtends } : null);

	return componentConstr;
}

var ContentNodeType = {
	TEXT: 0,
	BINDING: 1,
	BINDING_KEYPATH: 2,
	BINDING_FORMATTER: 3,
	BINDING_FORMATTER_ARGUMENTS: 4
};

var namePattern = '[$_a-zA-Z][$\\w]*';

var keypathPattern = '(?:' + namePattern + '|\\[\\d+\\])(?:\\??(?:\\.' + namePattern + '|\\[\\d+\\]))*';

var reNameOrEmpty = RegExp(namePattern + '|', 'g');
var reKeypathOrEmpty = RegExp(keypathPattern + '|', 'g');
var reBooleanOrEmpty = /false|true|/g;
var reNumberOrEmpty = /(?:[+-]\s*)?(?:0b[01]+|0[0-7]+|0x[0-9a-fA-F]+|(?:(?:0|[1-9]\d*)(?:\.\d+)?|\.\d+)(?:[eE][+-]?\d+)?|Infinity|NaN)|/g;
var reVacuumOrEmpty = /null|undefined|void 0|/g;

var NOT_VALUE_AND_NOT_KEYPATH = {};

var ContentParser = cellx.Utils.createClass({
	constructor: function ContentParser(content) {
		this.content = content;
	},

	parse: function parse() {
		this.at = 0;

		var result = this.result = [];

		for (var index; (index = this.content.indexOf('{', this.at)) > -1;) {
			this.pushText(this.content.slice(this.at, index));

			this.at = index;
			this.chr = this.content.charAt(index);

			var binding = this.readBinding();

			if (binding) {
				result.push(binding);
			} else {
				this.pushText(this.chr);
				this.next('{');
			}
		}

		this.pushText(this.content.slice(this.at));

		return result;
	},
	pushText: function pushText(value) {
		if (value.length) {
			var result = this.result;
			var resultLength = result.length;

			if (resultLength && result[resultLength - 1].type == ContentNodeType.TEXT) {
				result[resultLength - 1].value = result[resultLength - 1].raw += value;
			} else {
				result.push({
					type: ContentNodeType.TEXT,
					at: this.at,
					raw: value,
					value: value
				});
			}
		}
	},
	readBinding: function readBinding() {
		var bindingAt = this.at;

		this.next('{');
		this.skipWhitespaces();

		var keypath = this.readBindingKeypath();

		if (keypath) {
			var formatters = [];

			for (var formatter; this.skipWhitespaces() == '|' && (formatter = this.readFormatter());) {
				formatters.push(formatter);
			}

			if (this.chr == '}') {
				this.next();

				return {
					type: ContentNodeType.BINDING,
					at: bindingAt,
					raw: this.content.slice(bindingAt, this.at),
					keypath: keypath,
					formatters: formatters
				};
			}
		}

		this.at = bindingAt;
		this.chr = this.content.charAt(bindingAt);

		return null;
	},
	readBindingKeypath: function readBindingKeypath() {
		reKeypathOrEmpty.lastIndex = this.at;
		var keypath = reKeypathOrEmpty.exec(this.content)[0];

		if (keypath) {
			var keypathAt = this.at;

			this.chr = this.content.charAt(this.at += keypath.length);

			return {
				type: ContentNodeType.BINDING_KEYPATH,
				at: keypathAt,
				raw: this.content.slice(keypathAt, this.at),
				value: keypath
			};
		}

		return null;
	},
	readFormatter: function readFormatter() {
		var formatterAt = this.at;

		this.next('|');
		this.skipWhitespaces();

		reNameOrEmpty.lastIndex = this.at;
		var name = reNameOrEmpty.exec(this.content)[0];

		if (name) {
			var args = (this.chr = this.content.charAt(this.at += name.length)) == '(' ? this.readFormatterArguments() : null;

			return {
				type: ContentNodeType.BINDING_FORMATTER,
				at: formatterAt,
				raw: this.content.slice(formatterAt, this.at),
				name: name,
				arguments: args
			};
		}

		this.at = formatterAt;
		this.chr = this.content.charAt(formatterAt);

		return null;
	},
	readFormatterArguments: function readFormatterArguments() {
		var formatterArgumentsAt = this.at;
		var args = [];

		this.next('(');

		if (this.skipWhitespaces() != ')') {
			for (;;) {
				var arg = this.readValueOrValueKeypath();

				if (arg !== NOT_VALUE_AND_NOT_KEYPATH) {
					if (this.skipWhitespaces() == ',' || this.chr == ')') {
						args.push(arg);

						if (this.chr == ',') {
							this.next();
							this.skipWhitespaces();
							continue;
						}

						break;
					}
				}

				this.at = formatterArgumentsAt;
				this.chr = this.content.charAt(formatterArgumentsAt);

				return null;
			}
		}

		this.next();

		return {
			type: ContentNodeType.BINDING_FORMATTER_ARGUMENTS,
			at: formatterArgumentsAt,
			raw: this.content.slice(formatterArgumentsAt, this.at),
			value: args
		};
	},
	readValueOrValueKeypath: function readValueOrValueKeypath() {
		var value = this.readValue();
		return value === NOT_VALUE_AND_NOT_KEYPATH ? this.readValueKeypath() : value;
	},
	readValue: function readValue() {
		switch (this.chr) {
			case '{':
				{
					return this.readObject();
				}
			case '[':
				{
					return this.readArray();
				}
			case "'":
			case '"':
				{
					return this.readString();
				}
		}

		var readers = ['readBoolean', 'readNumber', 'readVacuum'];

		for (var i = 0, l = readers.length; i < l; i++) {
			var value = this[readers[i]]();

			if (value !== NOT_VALUE_AND_NOT_KEYPATH) {
				return value;
			}
		}

		return NOT_VALUE_AND_NOT_KEYPATH;
	},
	readObject: function readObject() {
		var objectAt = this.at;

		this.next('{');

		while (this.skipWhitespaces() != '}') {
			if ((this.chr == "'" || this.chr == '"' ? this.readString() !== NOT_VALUE_AND_NOT_KEYPATH : this.readObjectKey() !== null) && this.skipWhitespaces() == ':') {
				this.next();
				this.skipWhitespaces();

				if (this.readValueOrValueKeypath() !== NOT_VALUE_AND_NOT_KEYPATH) {
					if (this.skipWhitespaces() == ',') {
						this.next();
						continue;
					} else if (this.chr == '}') {
						break;
					}
				}
			}

			this.at = objectAt;
			this.chr = this.content.charAt(objectAt);

			return NOT_VALUE_AND_NOT_KEYPATH;
		}

		this.next();

		return this.content.slice(objectAt, this.at);
	},
	readObjectKey: function readObjectKey() {
		reNameOrEmpty.lastIndex = this.at;
		var key = reNameOrEmpty.exec(this.content)[0];

		if (key) {
			this.chr = this.content.charAt(this.at += key.length);
			return key;
		}

		return null;
	},
	readArray: function readArray() {
		var arrayAt = this.at;

		this.next('[');

		while (this.skipWhitespaces() != ']') {
			if (this.chr == ',') {
				this.next();
			} else if (this.readValueOrValueKeypath() === NOT_VALUE_AND_NOT_KEYPATH) {
				this.at = arrayAt;
				this.chr = this.content.charAt(arrayAt);

				return NOT_VALUE_AND_NOT_KEYPATH;
			}
		}

		this.next();

		return this.content.slice(arrayAt, this.at);
	},
	readBoolean: function readBoolean() {
		reBooleanOrEmpty.lastIndex = this.at;
		var bool = reBooleanOrEmpty.exec(this.content)[0];

		if (bool) {
			this.chr = this.content.charAt(this.at += bool.length);
			return bool;
		}

		return NOT_VALUE_AND_NOT_KEYPATH;
	},
	readNumber: function readNumber() {
		reNumberOrEmpty.lastIndex = this.at;
		var num = reNumberOrEmpty.exec(this.content)[0];

		if (num) {
			this.chr = this.content.charAt(this.at += num.length);
			return num;
		}

		return NOT_VALUE_AND_NOT_KEYPATH;
	},
	readString: function readString() {
		if (this.chr != "'" && this.chr != '"') {
			throw {
				name: 'SyntaxError',
				message: 'Expected "\'" or \'"\' instead of "' + this.chr + '"',
				at: this.at,
				content: this.content
			};
		}

		var stringAt = this.at;

		var quote = this.chr;
		var str = '';

		while (this.next()) {
			if (this.chr == quote) {
				this.next();
				return quote + str + quote;
			}

			if (this.chr == '\\') {
				str += this.chr + this.next();
			} else {
				if (this.chr == '\r' || this.chr == '\n') {
					break;
				}

				str += this.chr;
			}
		}

		this.at = stringAt;
		this.chr = this.content.charAt(stringAt);

		return NOT_VALUE_AND_NOT_KEYPATH;
	},
	readVacuum: function readVacuum() {
		reVacuumOrEmpty.lastIndex = this.at;
		var vacuum = reVacuumOrEmpty.exec(this.content)[0];

		if (vacuum) {
			this.chr = this.content.charAt(this.at += vacuum.length);
			return vacuum;
		}

		return NOT_VALUE_AND_NOT_KEYPATH;
	},
	readValueKeypath: function readValueKeypath() {
		if (this.content.slice(this.at, this.at + 4) != 'this') {
			return NOT_VALUE_AND_NOT_KEYPATH;
		}

		var keypathAt = this.at;

		this.chr = this.content.charAt(this.at += 4);

		for (;;) {
			if (this.chr == '.') {
				this.next();

				reNameOrEmpty.lastIndex = this.at;
				var name = reNameOrEmpty.exec(this.content)[0];

				if (!name) {
					break;
				}

				this.chr = this.content.charAt(this.at += name.length);
			} else if (this.chr == '[') {
				this.next();

				if ((this.chr == "'" || this.chr == '"' ? this.readString() === NOT_VALUE_AND_NOT_KEYPATH : this.readNumber() === NOT_VALUE_AND_NOT_KEYPATH && this.readValueKeypath() === NOT_VALUE_AND_NOT_KEYPATH) || this.chr != ']') {
					break;
				}

				this.next();
			} else {
				return this.content.slice(keypathAt, this.at);
			}
		}

		this.at = keypathAt;
		this.chr = this.content.charAt(keypathAt);

		return NOT_VALUE_AND_NOT_KEYPATH;
	},
	next: function next(c) {
		if (c && c != this.chr) {
			throw {
				name: 'SyntaxError',
				message: 'Expected "' + c + '" instead of "' + this.chr + '"',
				at: this.at,
				content: this.content
			};
		}

		return this.chr = this.content.charAt(++this.at);
	},
	skipWhitespaces: function skipWhitespaces() {
		var chr = this.chr;

		while (chr && chr <= ' ') {
			chr = this.next();
		}

		return chr;
	}
});

var cache$3 = Object.create(null);

function formattersReducer(jsExpr, formatter) {
	var args = formatter.arguments;

	return '(this[\'' + formatter.name + '\'] || formatters[\'' + formatter.name + '\']).call(this, ' + jsExpr + (args && args.value.length ? ', ' + args.raw.slice(1, -1) : '') + ')';
}

function bindingToJSExpression(binding) {
	var bindingRaw = binding.raw;

	if (cache$3[bindingRaw]) {
		return cache$3[bindingRaw];
	}

	var keypath = binding.keypath.value.split('?');
	var formatters = binding.formatters;

	var keypathLength = keypath.length;

	if (keypathLength == 1) {
		if (formatters.length) {
			return cache$3[bindingRaw] = {
				value: formatters.reduce(formattersReducer, 'this.' + keypath[0]),
				usesFormatters: true,
				usesTempVariable: false
			};
		}

		return cache$3[bindingRaw] = {
			value: 'this.' + keypath[0],
			usesFormatters: false,
			usesTempVariable: false
		};
	}

	var index = keypathLength - 2;
	var jsExpr = Array(index);

	while (index) {
		jsExpr[--index] = ' && (temp = temp' + keypath[index + 1] + ')';
	}

	if (formatters.length) {
		return cache$3[bindingRaw] = {
			value: '(temp = this.' + keypath[0] + ')' + jsExpr.join('') + ' && ' + formatters.reduce(formattersReducer, 'temp' + keypath[keypathLength - 1]),
			usesFormatters: true,
			usesTempVariable: true
		};
	}

	return cache$3[bindingRaw] = {
		value: '(temp = this.' + keypath[0] + ')' + jsExpr.join('') + ' && temp' + keypath[keypathLength - 1],
		usesFormatters: false,
		usesTempVariable: true
	};
}

var slice = Array.prototype.slice;
var map = Array.prototype.map;

var reInsert = /\{([1-9]\d*|n)(?::((?:[^|]*\|)+?[^}]*))?\}/;

var texts = void 0;
var getPluralIndex = void 0;

function configure(config) {
	var localeSettings = getText.localeSettings = config.localeSettings;

	texts = config.texts;
	getPluralIndex = Function('n', 'return ' + localeSettings.plural + ';');
}

function getText(context, key, plural, args) {
	var rawText = void 0;

	if (hasOwn.call(texts, context) && hasOwn.call(texts[context], key)) {
		rawText = texts[context][key];

		if (plural) {
			rawText = rawText[getPluralIndex(args[0])];
		}
	} else {
		rawText = key;
	}

	var data = Object.create(null);

	args.forEach(function (arg, index) {
		data[index + 1] = arg;
	});

	if (plural) {
		data.n = args[0];
	}

	var text = [];

	rawText = rawText.split(reInsert);

	for (var i = 0, l = rawText.length; i < l;) {
		if (i % 3) {
			text.push(rawText[i + 1] ? rawText[i + 1].split('|')[getPluralIndex(data[rawText[i]])] : data[rawText[i]]);
			i += 2;
		} else {
			text.push(rawText[i]);
			i++;
		}
	}

	return text.join('');
}

function t(key) {
	return getText('', key, false, slice.call(arguments, 1));
}

function pt(key, context) {
	return getText(context, key, false, slice.call(arguments, 1));
}

function nt(key /*, count*/) {
	return getText('', key, true, slice.call(arguments, 1));
}

function npt(key, context /*, count*/) {
	return getText(context, key, true, slice.call(arguments, 1));
}

getText.configure = configure;
getText.t = t;
getText.pt = pt;
getText.nt = nt;
getText.npt = npt;

configure({
	localeSettings: {
		// code: 'en',
		// plural: 'n == 1 ? 0 : 1'
		code: 'ru',
		plural: '(n%100) >= 5 && (n%100) <= 20 ? 2 : (n%10) == 1 ? 0 : (n%10) >= 2 && (n%10) <= 4 ? 1 : 2'
	},

	texts: {}
});

var formatters = Object.create(null);
formatters.t = getText.t;
formatters.pt = getText.pt;
formatters.nt = getText.nt;
formatters.npt = getText.npt;

var cache$4 = Object.create(null);

function compileBinding(binding) {
	var bindingRaw = binding.raw;

	if (cache$4[bindingRaw]) {
		return cache$4[bindingRaw];
	}

	var bindingJSExpr = bindingToJSExpression(binding);
	var jsExpr = (bindingJSExpr.usesTempVariable ? 'var temp; ' : '') + 'return ' + bindingJSExpr.value + ';';

	if (bindingJSExpr.usesFormatters) {
		var _ret = function () {
			var inner = Function('formatters', jsExpr);

			return {
				v: cache$4[bindingRaw] = function () {
					return inner.call(this, formatters);
				}
			};
		}();

		if ((typeof _ret === 'undefined' ? 'undefined' : _typeof(_ret)) === "object") return _ret.v;
	}

	return cache$4[bindingRaw] = Function(jsExpr);
}

var reEscapableChars$1 = /[\\'\r\n]/g;
var charToSpecialMap = Object.create(null);

charToSpecialMap['\\'] = '\\\\';
charToSpecialMap['\''] = '\\\'';
charToSpecialMap['\r'] = '\\r';
charToSpecialMap['\n'] = '\\n';

function escapeString(str) {
	return reEscapableChars$1.test(str) ? str.replace(reEscapableChars$1, function (chr) {
		return charToSpecialMap[chr];
	}) : str;
}

var cache$2 = Object.create(null);

function compileContent(parsedContent, content) {
	if (cache$2[content]) {
		return cache$2[content];
	}

	if (parsedContent.length == 1) {
		var node = parsedContent[0];

		if (node.type == ContentNodeType.BINDING) {
			return cache$2[content] = compileBinding(node);
		}
	}

	var usesFormatters = false;
	var usesTempVariable = false;
	var jsExpr = [];

	for (var i = 0, l = parsedContent.length; i < l; i++) {
		var _node = parsedContent[i];

		if (_node.type == ContentNodeType.TEXT) {
			jsExpr.push('\'' + escapeString(_node.value) + '\'');
		} else {
			var bindingJSExpr = bindingToJSExpression(_node);

			if (!usesFormatters && bindingJSExpr.usesFormatters) {
				usesFormatters = true;
			}
			if (!usesTempVariable && bindingJSExpr.usesTempVariable) {
				usesTempVariable = true;
			}

			jsExpr.push(bindingJSExpr.value);
		}
	}

	jsExpr = (usesTempVariable ? 'var temp; ' : '') + 'return [' + jsExpr.join(', ') + '].join(\'\');';

	if (usesFormatters) {
		var _ret = function () {
			var inner = Function('formatters', jsExpr);

			return {
				v: cache$2[content] = function () {
					return inner.call(this, formatters);
				}
			};
		}();

		if ((typeof _ret === 'undefined' ? 'undefined' : _typeof(_ret)) === "object") return _ret.v;
	}

	return cache$2[content] = Function(jsExpr);
}

function setAttribute(el, name, value) {
	if (value === false || value == null) {
		el.removeAttribute(name);
	} else {
		el.setAttribute(name, value === true ? '' : value);
	}
}

var reBinding = /{[^}]+}/;

function bind(node, component, context) {
	if (!context) {
		context = component;
	}

	var bindings = null;
	var childComponents = null;

	function bind_(node) {
		var _loop = function _loop(child) {
			switch (child.nodeType) {
				case 1:
					{
						var attrs = child.attributes;

						for (var i = attrs.length; i;) {
							var attr = attrs.item(--i);
							var value = attr.value;

							if (reBinding.test(value)) {
								var parsedValue = new ContentParser(value).parse();

								if (parsedValue.length > 1 || parsedValue[0].type == ContentNodeType.BINDING) {
									(function () {
										var name = attr.name;
										var cell = new cellx.Cell(compileContent(parsedValue, value), {
											owner: context,
											onChange: function onChange(evt) {
												setAttribute(child, name, evt.value);
											}
										});

										setAttribute(child, name, cell.get());

										(bindings || (bindings = [])).push(cell);
									})();
								}
							}
						}

						var childComponent = child.$c;

						if (childComponent) {
							childComponent.ownerComponent = component;
							childComponent.props.context = context;

							(childComponents || (childComponents = [])).push(childComponent);
						}

						if (child.firstChild && (!childComponent || childComponent.constructor.template == null)) {
							bind_(child);
						}

						break;
					}
				case 3:
					{
						var content = child.textContent;

						if (reBinding.test(content)) {
							var parsedContent = new ContentParser(content).parse();

							if (parsedContent.length > 1 || parsedContent[0].type == ContentNodeType.BINDING) {
								var _cell = new cellx.Cell(compileContent(parsedContent, content), {
									owner: context,
									onChange: function onChange(evt) {
										child.textContent = evt.value;
									}
								});

								child.textContent = _cell.get();

								(bindings || (bindings = [])).push(_cell);
							}
						}

						break;
					}
			}
		};

		for (var child = node.firstChild; child; child = child.nextSibling) {
			_loop(child);
		}
	}

	bind_(node);

	return { bindings: bindings, childComponents: childComponents };
}

function attachChildComponentElements(childComponents) {
	for (var i = 0, l = childComponents.length; i < l; i++) {
		var childComponent = childComponents[i];

		if (!childComponent.isElementAttached) {
			childComponent.isElementAttached = true;
			childComponent._attachElement();
		}
	}
}

function defineAssets(component, assetsConfig) {
	var assets = component.assets;

	var _loop = function _loop(name) {
		if (name.charAt(0) != ':') {
			(function () {
				var asset = void 0;

				Object.defineProperty(assets, name, {
					configurable: true,
					enumerable: true,

					get: function get() {
						return asset || (asset = component.$(assetsConfig[name].selector || '&__' + hyphenize(name)));
					}
				});
			})();
		}
	};

	for (var name in assetsConfig) {
		_loop(name);
	}
}

function listenAssets(component, assetsConfig) {
	var assets = component.assets;

	for (var name in assetsConfig) {
		var asset = void 0;

		if (name == ':component') {
			asset = component;
		} else if (name == ':element') {
			asset = component.element;
		} else {
			asset = assets[name];

			if (!asset) {
				continue;
			}
		}

		var assetConfig = assetsConfig[name];

		for (var key in assetConfig) {
			if (key.slice(0, 3) == 'on-' && key.length > 3) {
				component.listenTo(asset, key.slice(3), assetConfig[key]);
			}
		}
	}
}

var eventTypes = ['click', 'dblclick', 'mousedown', 'mouseup', 'input', 'change', 'submit', 'focusin', 'focusout'];

/**
 * @typesign (evt: cellx~Event|Event);
 */
function onEvent(evt) {
	var node = void 0;
	var attrName = void 0;
	var targetEls = void 0;

	if (evt instanceof Event) {
		node = evt.target;
		attrName = 'rt-' + evt.type;
	} else {
		node = evt.target.element;
		attrName = 'rt-component-' + evt.type;
	}

	for (;;) {
		if (node.nodeType == 1 && node.hasAttribute(attrName)) {
			(targetEls || (targetEls = [])).push(node);
		}

		node = node.parentNode;

		if (!node) {
			break;
		}

		var component = node.$c;

		if (component && targetEls) {
			for (var i = 0, l = targetEls.length; i < l; i++) {
				var targetEl = targetEls[i];
				var handler = component[targetEl.getAttribute(attrName)];

				if (typeof handler == 'function') {
					if (handler.call(component, evt, targetEl.$c || targetEl) === false) {
						evt.isPropagationStopped = true;
						return;
					}

					if (evt.isPropagationStopped) {
						return;
					}
				}
			}
		}
	}
}

var range = document.createRange();
var htmlToFragment = void 0;

if (range.createContextualFragment) {
	(function () {
		var selected = false;

		htmlToFragment = function htmlToFragment(html) {
			if (!selected) {
				range.selectNode(document.body);
				selected = true;
			}

			return range.createContextualFragment(html);
		};
	})();
} else {
	htmlToFragment = function htmlToFragment(html) {
		var el = document.createElement('div');
		var df = document.createDocumentFragment();

		el.innerHTML = html;

		for (var child; child = el.firstChild;) {
			df.appendChild(child);
		}

		return df;
	};
}

var htmlToFragment$1 = htmlToFragment;

var _Symbol = cellx.JS.Symbol;
var createClass$1 = cellx.Utils.createClass;

var KEY_RAW_CONTENT = _Symbol('rawContent');
var KEY_BLOCK_NAME_IN_MARKUP = _Symbol('blockNameInMarkup');
var KEY_SILENT = _Symbol('silent');

function created() {}
function initialize() {}
function ready() {}
function elementAttached() {}
function elementDetached() {}
function elementMoved() {}
function elementAttributeChanged() {}

var Component = cellx.EventEmitter.extend({
	Implements: [DisposableMixin],

	Static: {
		register: registerComponent,

		extend: function extend(elIs, description) {
			description.Extends = this;

			var Static = description.Static || (description.Static = {});

			Static.elementIs = elIs;

			var props = Static.props;

			if (props) {
				if (props.content || props.context) {
					throw new TypeError('It is not necessary to declare property "' + (props.content ? 'content' : 'context') + '"');
				}

				Static.elementAttributes = props;
			} else if (Static.elementAttributes) {
				Static.props = Static.elementAttributes;
			}

			return registerComponent(createClass$1(description));
		},


		elementIs: void 0,
		elementExtends: void 0,

		elementAttributes: null,
		props: null,

		i18n: null,

		template: null,

		assets: null
	},

	/**
  * @type {?Rionite.Component}
  */
	ownerComponent: null,

	_parentComponent: null,

	/**
  * @type {?Rionite.Component}
  */
	get parentComponent() {
		if (this._parentComponent !== void 0) {
			return this._parentComponent;
		}

		for (var node; node = (node || this.element).parentNode;) {
			if (node.$c) {
				return this._parentComponent = node.$c;
			}
		}

		return this._parentComponent = null;
	},

	/**
  * @type {HTMLElement}
  */
	element: null,

	/**
  * @type {Rionite.ElementAttributes}
  */
	get elementAttributes() {
		var attrs = new ElementAttributes(this.element);

		Object.defineProperty(this, 'elementAttributes', {
			configurable: true,
			enumerable: true,
			writable: true,
			value: attrs
		});

		return attrs;
	},

	/**
  * @type {Rionite.Properties}
  */
	get props() {
		var props = Object.create(this.elementAttributes);

		props.content = null;
		props.context = null;

		Object.defineProperty(this, 'props', {
			configurable: true,
			enumerable: true,
			writable: true,
			value: props
		});

		return props;
	},

	_bindings: null,

	assets: null,

	isElementAttached: false,

	initialized: false,
	isReady: false,

	constructor: function Component(el, props) {
		cellx.EventEmitter.call(this);
		DisposableMixin.call(this);

		if (el == null) {
			el = document.createElement(this.constructor.elementIs);
		} else if (typeof el == 'string') {
			var elIs = this.constructor.elementIs;
			var html = el;

			el = document.createElement(elIs);
			el.innerHTML = html;

			var firstChild = el.firstChild;

			if (firstChild == el.lastChild && firstChild.nodeType == 1 && firstChild.tagName.toLowerCase() == elIs) {
				el = firstChild;
			}
		}

		this.element = el;

		el.rioniteComponent = this;
		Object.defineProperty(el, '$c', { value: this });

		if (props) {
			var properties = this.props;

			for (var name in props) {
				properties[camelize(name)] = props[name];
			}
		}

		this.created();
	},

	/**
  * @override
  */
	_handleEvent: function _handleEvent(evt) {
		cellx.EventEmitter.prototype._handleEvent.call(this, evt);

		var silent = this[KEY_SILENT];

		if (silent === void 0) {
			silent = this[KEY_SILENT] = this.element.hasAttribute('rt-silent');
		}

		if (!silent && evt.bubbles !== false && !evt.isPropagationStopped) {
			var parentComponent = this.parentComponent;

			if (parentComponent) {
				parentComponent._handleEvent(evt);
			} else {
				onEvent(evt);
			}
		}
	},
	_attachElement: function _attachElement() {
		if (!this.initialized) {
			this.initialize();
			this.initialized = true;
		}

		var constr = this.constructor;
		var rawContent = constr[KEY_RAW_CONTENT];
		var el = this.element;

		if (this.isReady) {
			if (rawContent) {
				for (var child; child = el.firstChild;) {
					el.removeChild(child);
				}
			}
		} else {
			for (var c = constr;;) {
				el.classList.add(c.elementIs);
				c = Object.getPrototypeOf(c.prototype).constructor;

				if (c == Component) {
					break;
				}
			}

			var attrs = this.elementAttributes;
			var attributesConfig = constr.elementAttributes;

			for (var name in attributesConfig) {
				if (typeof attributesConfig[name] != 'function') {
					var camelizedName = camelize(name);
					attrs[camelizedName] = attrs[camelizedName];
				}
			}

			if (constr.template != null) {
				if (!rawContent) {
					var template = constr.template;

					rawContent = constr[KEY_RAW_CONTENT] = htmlToFragment$1(typeof template == 'string' ? template : template.render(constr));
				}

				var inputContent = this.props.content = document.createDocumentFragment();

				for (var _child; _child = el.firstChild;) {
					inputContent.appendChild(_child);
				}
			}
		}

		if (rawContent) {
			var content = rawContent.cloneNode(true);

			var _bind = bind(content, this);

			var bindings = _bind.bindings;
			var childComponents = _bind.childComponents;


			this._bindings = bindings;

			this.element.appendChild(content);

			if (childComponents) {
				attachChildComponentElements(childComponents);
			}

			this._initAssets();
		}

		if (!this.isReady) {
			if (!rawContent) {
				this._initAssets();
			}

			this.ready();
			this.isReady = true;
		}

		this.elementAttached();
	},
	_detachElement: function _detachElement() {
		this.dispose();
		this.elementDetached();
	},
	_initAssets: function _initAssets() {
		this.assets = Object.create(null);

		var assetsConfig = this.constructor.assets;

		if (assetsConfig) {
			defineAssets(this, assetsConfig);
			listenAssets(this, assetsConfig);
		}
	},


	/**
  * @override
  */
	dispose: function dispose() {
		this._destroyBindings();
		DisposableMixin.prototype.dispose.call(this);
	},
	_destroyBindings: function _destroyBindings() {
		var bindings = this._bindings;

		if (bindings) {
			for (var i = bindings.length; i;) {
				bindings[--i].off();
			}

			this._bindings = null;
		}
	},


	// Callbacks

	created: created,
	initialize: initialize,
	ready: ready,
	elementAttached: elementAttached,
	elementDetached: elementDetached,
	elementMoved: elementMoved,
	elementAttributeChanged: elementAttributeChanged,

	// Utils

	/**
  * @typesign (selector: string) -> ?Rionite.Component|HTMLElement;
  */
	$: function $(selector) {
		var el = this.element.querySelector(this._prepareSelector(selector));
		return el && (el.$c || el);
	},


	/**
  * @typesign (selector: string) -> Array<Rionite.Component|HTMLElement>;
  */
	$$: function $$(selector) {
		return map.call(this.element.querySelectorAll(this._prepareSelector(selector)), function (el) {
			return el.$c || el;
		});
	},
	_prepareSelector: function _prepareSelector(selector) {
		selector = selector.split('&');

		if (selector.length == 1) {
			return selector[0];
		}

		var constr = this.constructor;
		var blockName = constr[KEY_BLOCK_NAME_IN_MARKUP];

		if (!blockName) {
			var c = constr;

			do {
				if (c.template) {
					blockName = c.elementIs;
				}

				c = Object.getPrototypeOf(c.prototype).constructor;
			} while (c != Component);

			if (!blockName) {
				blockName = constr.elementIs;
			}

			constr[KEY_BLOCK_NAME_IN_MARKUP] = blockName;
		}

		return selector.join('.' + blockName);
	}
});

document.addEventListener('DOMContentLoaded', function onDOMContentLoaded() {
	document.removeEventListener('DOMContentLoaded', onDOMContentLoaded);

	eventTypes.forEach(function (type) {
		document.addEventListener(type, onEvent);
	});
});

var keypathPattern$1 = '(?:' + namePattern + '|\\[\\d+\\])(?:(?:\\.' + namePattern + '|\\[\\d+\\]))*';
var re = RegExp('{{' + '(?:' + '\\s*(?:' + ('block\\s+(' + namePattern + ')|(\\/)block|(s)uper\\(\\)|(' + keypathPattern$1 + ')') + (')\\s*|{\\s*(' + keypathPattern$1 + ')\\s*}') + ')' + '}}');

function Template(tmpl) {
	var parent = arguments.length <= 1 || arguments[1] === undefined ? null : arguments[1];

	this.parent = parent;

	var currentBlock = { js: [] };

	var blocks = [currentBlock];
	var blockMap = this._blocks = Object.create(parent ? parent._blocks : null);

	tmpl = tmpl.split(re);

	for (var i = 0, l = tmpl.length; i < l;) {
		if (i % 6) {
			var name = tmpl[i];

			if (name) {
				currentBlock.js.push('this.' + name + '.call(this, data)');
				currentBlock = blockMap[name] = { name: name, js: [] };
				blocks.push(currentBlock);
			} else if (tmpl[i + 1]) {
				if (blocks.length > 1) {
					blocks.pop();
					currentBlock = blocks[blocks.length - 1];
				}
			} else if (tmpl[i + 2]) {
				if (parent && blocks.length > 1 && parent._blocks[currentBlock.name]) {
					currentBlock.js.push('_super.call(this, data)');
				}
			} else {
				var keypath = tmpl[i + 2];
				currentBlock.js.push(keypath ? 'escape(data.' + keypath + ')' : 'data.' + tmpl[i + 3]);
			}

			i += 5;
		} else {
			var text = tmpl[i];

			if (text) {
				currentBlock.js.push('\'' + escapeString(text) + '\'');
			}

			i++;
		}
	}

	Object.keys(blockMap).forEach(function (name) {
		var _super = parent && parent._blocks[name];
		var inner = Function('_super', 'data', 'escape', 'return [' + blockMap[name].js.join(', ') + '].join(\'\');');

		blockMap[name] = function (data) {
			return inner.call(this, _super, data, escapeHTML);
		};
	});

	this._renderer = parent ? parent._renderer : Function('data', 'escape', 'return [' + blocks[0].js.join(', ') + '].join(\'\');');
}

Template.prototype.extend = function (tmpl) {
	return new Template(tmpl, this);
};

Template.prototype.render = function (data) {
	return this._renderer.call(this._blocks, data || {}, escapeHTML);
};

var div = document.createElement('div');
div.innerHTML = '<template>1</template>';

var template = div.firstChild;

var templateTagSupport = !template.firstChild;

var KEY_TEMPLATES_FIXED = cellx.JS.Symbol('templatesFixed');

var RtContent = Component.extend('rt-content', {
	Static: {
		props: {
			select: { type: String, readonly: true },
			getContext: { type: String, readonly: true }
		},

		template: ''
	},

	_rawContent: void 0,

	_attachElement: function _attachElement() {
		var ownerComponent = this.ownerComponent;
		var el = this.element;
		var props = this.props;

		if (this.isReady) {
			for (var child; child = el.firstChild;) {
				el.removeChild(child);
			}
		} else {
			var inputContent = props.content = document.createDocumentFragment();

			for (var _child; _child = el.firstChild;) {
				inputContent.appendChild(_child);
			}

			var ownerComponentInputContent = ownerComponent.props.content;
			var selector = this.elementAttributes.select;

			if (selector) {
				if (!templateTagSupport && !ownerComponentInputContent[KEY_TEMPLATES_FIXED]) {
					var templates = ownerComponentInputContent.querySelectorAll('template');

					for (var i = templates.length; i;) {
						templates[--i].content;
					}

					ownerComponentInputContent[KEY_TEMPLATES_FIXED] = true;
				}

				var selectedEls = ownerComponentInputContent.querySelectorAll(selector);
				var selectedElCount = selectedEls.length;

				if (selectedElCount) {
					var rawContent = this._rawContent = document.createDocumentFragment();

					for (var _i = 0; _i < selectedElCount; _i++) {
						rawContent.appendChild(selectedEls[_i].cloneNode(true));
					}
				} else {
					this._rawContent = inputContent;
				}
			} else {
				this._rawContent = ownerComponentInputContent.firstChild ? ownerComponentInputContent : inputContent;
			}

			this.isReady = true;
		}

		var content = this._rawContent.cloneNode(true);
		var getContext = props.getContext;

		var _ref = this._rawContent == props.content ? bind(content, ownerComponent, getContext ? ownerComponent[getContext](this, props.context) : props.context) : bind(content, ownerComponent.ownerComponent, getContext ? ownerComponent[getContext](this, ownerComponent.props.context) : ownerComponent.props.context);

		var bindings = _ref.bindings;
		var childComponents = _ref.childComponents;


		this._bindings = bindings;

		el.appendChild(content);

		if (childComponents) {
			attachChildComponentElements(childComponents);
		}
	},
	_detachElement: function _detachElement() {
		this._destroyBindings();
	}
});

var nextTick = cellx.Utils.nextTick;

var RtIfThen = Component.extend('rt-if-then', {
	Static: {
		elementExtends: 'template',

		props: {
			if: { type: String, required: true, readonly: true }
		}
	},

	_if: null,

	_elseMode: false,

	_nodes: null,

	_attachElement: function _attachElement() {
		var _this = this;

		if (!this.initialized) {
			(function () {
				var props = _this.props;

				props.content = document.importNode(_this.element.content, true);

				var parsedIf = new ContentParser('{' + props.if + '}').parse();

				if (parsedIf.length > 1 || parsedIf[0].type != ContentNodeType.BINDING) {
					throw new SyntaxError('Invalid value of attribute "if" (' + props.if + ')');
				}

				var getIfValue = compileBinding(parsedIf[0]);

				_this._if = new cellx.Cell(function () {
					return !!getIfValue.call(this);
				}, { owner: props.context });

				_this.initialized = true;
			})();
		}

		this._render(false);

		this._if.on('change', this._onIfChange, this);
	},
	_detachElement: function _detachElement() {
		this._destroyBindings();
		this._if.off('change', this._onIfChange, this);

		var nodes = this._nodes;

		if (nodes) {
			for (var i = nodes.length; i;) {
				var node = nodes[--i];
				var parentNode = node.parentNode;

				if (parentNode) {
					parentNode.removeChild(node);
				}
			}
		}
	},
	_onIfChange: function _onIfChange() {
		this._render(true);
	},
	_render: function _render(changed) {
		var _this2 = this;

		if (this._elseMode ? !this._if.get() : this._if.get()) {
			var content = this.props.content.cloneNode(true);

			var _bind = bind(content, this.ownerComponent, this.props.context);

			var bindings = _bind.bindings;
			var childComponents = _bind.childComponents;


			this._nodes = slice.call(content.childNodes);
			this._bindings = bindings;

			this.element.parentNode.insertBefore(content, this.element.nextSibling);

			if (childComponents) {
				attachChildComponentElements(childComponents);
			}
		} else {
			this._destroyBindings();

			var nodes = this._nodes;

			if (nodes) {
				for (var i = nodes.length; i;) {
					var node = nodes[--i];
					node.parentNode.removeChild(node);
				}

				this._nodes = null;
			}
		}

		if (changed) {
			nextTick(function () {
				_this2.emit('change');
			});
		}
	}
});

var RtIfElse = RtIfThen.extend('rt-if-else', {
	Static: {
		elementExtends: 'template'
	},

	_elseMode: true
});

var Map$2 = cellx.JS.Map;
var nextTick$1 = cellx.Utils.nextTick;

var reForAttributeValue = RegExp('^\\s*(' + namePattern + ')\\s+of\\s+(\\S.*)$');
var invalidForAttributeMessage = 'Invalid value of attribute "for"';

var RtRepeat = Component.extend('rt-repeat', {
	Static: {
		elementExtends: 'template',

		props: {
			for: { type: String, required: true, readonly: true },
			trackBy: { type: String, readonly: true },
			strip: { default: false, readonly: true }
		}
	},

	_itemName: void 0,

	_list: null,

	_itemMap: null,
	_oldItemMap: null,

	_trackBy: void 0,

	_rawItemContent: null,

	_context: null,

	_lastNode: null,

	_attachElement: function _attachElement() {
		if (!this.initialized) {
			var props = this.props;
			var forAttrValue = props.for.match(reForAttributeValue);

			if (!forAttrValue) {
				throw new SyntaxError(invalidForAttributeMessage + (' (' + props.for + ')'));
			}

			var parsedOf = new ContentParser('{' + forAttrValue[2] + '}').parse();

			if (parsedOf.length > 1 || parsedOf[0].type != ContentNodeType.BINDING) {
				throw new SyntaxError(invalidForAttributeMessage + (' (' + props.for + ')'));
			}

			this._itemName = forAttrValue[1];

			this._list = new cellx.Cell(compileBinding(parsedOf[0]), { owner: props.context });

			this._itemMap = new Map$2();

			this._trackBy = props.trackBy;

			var rawItemContent = this._rawItemContent = document.importNode(this.element.content, true);

			if (props.strip) {
				var firstChild = rawItemContent.firstChild;
				var lastChild = rawItemContent.lastChild;

				if (firstChild == lastChild) {
					if (firstChild.nodeType == 3) {
						firstChild.textContent = firstChild.textContent.trim();
					}
				} else {
					if (firstChild.nodeType == 3) {
						if (!(firstChild.textContent = firstChild.textContent.replace(/^\s+/, ''))) {
							rawItemContent.removeChild(firstChild);
						}
					}
					if (lastChild.nodeType == 3) {
						if (!(lastChild.textContent = lastChild.textContent.replace(/\s+$/, ''))) {
							rawItemContent.removeChild(lastChild);
						}
					}
				}
			}

			this._context = props.context;

			this.initialized = true;
		}

		this._render(false);

		this._list.on('change', this._onListChange, this);
	},
	_detachElement: function _detachElement() {
		this._clearWithItemMap(this._itemMap);
		this._list.off('change', this._onListChange, this);
	},
	_onListChange: function _onListChange() {
		this._render(true);
	},
	_render: function _render(c) {
		var _this = this;

		var oldItemMap = this._oldItemMap = this._itemMap;
		this._itemMap = new Map$2();

		var list = this._list.get();
		var changed = false;

		if (list) {
			this._lastNode = this.element;
			changed = list.reduce(function (changed, item, index) {
				return _this._renderListItem(item, index) || changed;
			}, changed);
		}

		if (oldItemMap.size) {
			this._clearWithItemMap(oldItemMap);
		} else if (!changed) {
			return;
		}

		if (c) {
			nextTick$1(function () {
				_this.emit('change');
			});
		}
	},
	_renderListItem: function _renderListItem(item, index) {
		var _Object$create;

		var trackBy = this._trackBy;
		var trackingValue = trackBy ? trackBy == '$index' ? index : item[trackBy] : item;
		var prevItems = this._oldItemMap.get(trackingValue);
		var currentItems = this._itemMap.get(trackingValue);

		if (prevItems) {
			var prevItem = void 0;

			if (prevItems.length == 1) {
				prevItem = prevItems[0];
				this._oldItemMap.delete(trackingValue);
			} else {
				prevItem = prevItems.shift();
			}

			if (currentItems) {
				currentItems.push(prevItem);
			} else {
				this._itemMap.set(trackingValue, [prevItem]);
			}

			prevItem.item.set(item);

			var nodes = prevItem.nodes;

			if (index == prevItem.index.get()) {
				this._lastNode = nodes[nodes.length - 1];
				return false;
			}

			prevItem.index.set(index);

			if (nodes.length == 1) {
				var node = nodes[0];
				this._lastNode.parentNode.insertBefore(node, this._lastNode.nextSibling);
				this._lastNode = node;
			} else {
				var df = document.createDocumentFragment();

				for (var i = 0, l = nodes.length; i < l; i++) {
					df.appendChild(nodes[i]);
				}

				var _newLastNode = df.lastChild;
				this._lastNode.parentNode.insertBefore(df, this._lastNode.nextSibling);
				this._lastNode = _newLastNode;
			}

			return true;
		}

		item = new cellx.Cell(item);
		index = new cellx.Cell(index);

		var content = this._rawItemContent.cloneNode(true);
		var context = Object.create(this._context, (_Object$create = {}, defineProperty(_Object$create, this._itemName, {
			get: function get() {
				return item.get();
			}
		}), defineProperty(_Object$create, '$index', {
			get: function get() {
				return index.get();
			}
		}), _Object$create));

		var _bind = bind(content, this.ownerComponent, context);

		var bindings = _bind.bindings;
		var childComponents = _bind.childComponents;


		var newItem = {
			item: item,
			index: index,
			nodes: slice.call(content.childNodes),
			bindings: bindings
		};

		if (currentItems) {
			currentItems.push(newItem);
		} else {
			this._itemMap.set(trackingValue, [newItem]);
		}

		var newLastNode = content.lastChild;
		this._lastNode.parentNode.insertBefore(content, this._lastNode.nextSibling);
		this._lastNode = newLastNode;

		if (childComponents) {
			attachChildComponentElements(childComponents);
		}

		return true;
	},
	_clearWithItemMap: function _clearWithItemMap(itemMap) {
		itemMap.forEach(this._clearWithItems, this);
		itemMap.clear();
	},
	_clearWithItems: function _clearWithItems(items) {
		for (var i = items.length; i;) {
			var item = items[--i];
			var bindings = item.bindings;

			if (bindings) {
				for (var _i = bindings.length; _i;) {
					bindings[--_i].off();
				}
			}

			var nodes = item.nodes;

			for (var _i2 = nodes.length; _i2;) {
				var node = nodes[--_i2];
				var parentNode = node.parentNode;

				if (parentNode) {
					parentNode.removeChild(node);
				}
			}
		}
	}
});

var Rionite = {
	DisposableMixin: DisposableMixin,

	formatters: formatters,
	getText: getText,

	ElementAttributes: ElementAttributes,
	Template: Template,

	Component: Component,

	Components: {
		RtContent: RtContent,
		RtIfThen: RtIfThen,
		RtIfElse: RtIfElse,
		RtRepeat: RtRepeat
	},

	Utils: {
		camelize: camelize,
		hyphenize: hyphenize,
		escapeString: escapeString,
		escapeHTML: escapeHTML,
		unescapeHTML: unescapeHTML,
		isRegExp: isRegExp,
		defer: defer,
		htmlToFragment: htmlToFragment$1
	}
};
Rionite.Rionite = Rionite;

return Rionite;

})));