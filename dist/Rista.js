(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory(require("cellx"));
	else if(typeof define === 'function' && define.amd)
		define(["cellx"], factory);
	else if(typeof exports === 'object')
		exports["Rista"] = factory(require("cellx"));
	else
		root["Rista"] = factory(root["cellx"]);
})(this, function(__WEBPACK_EXTERNAL_MODULE_1__) {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _require = __webpack_require__(1);

	var EventEmitter = _require.EventEmitter;
	var map = _require.map;
	var list = _require.list;
	var cellx = _require.cellx;

	var Attributes = __webpack_require__(2);
	var Component = __webpack_require__(7);
	var registerComponent = __webpack_require__(9);
	var morphComponentElement = __webpack_require__(12);
	var RtContent = __webpack_require__(20);
	var camelize = __webpack_require__(3);
	var hyphenize = __webpack_require__(4);
	var escapeHTML = __webpack_require__(5);
	var unescapeHTML = __webpack_require__(6);
	var defer = __webpack_require__(19);

	var Rista = module.exports = {
		EventEmitter: EventEmitter,
		map: map,
		list: list,
		cellx: cellx,
		Attributes: Attributes,
		Component: Component,
		registerComponent: registerComponent,
		morphComponentElement: morphComponentElement,

		components: {
			RtContent: RtContent
		},

		utils: {
			camelize: camelize,
			hyphenize: hyphenize,
			escapeHTML: escapeHTML,
			unescapeHTML: unescapeHTML,
			defer: defer
		}
	};
	Rista.Rista = Rista; // for destructuring

/***/ },
/* 1 */
/***/ function(module, exports) {

	module.exports = __WEBPACK_EXTERNAL_MODULE_1__;

/***/ },
/* 2 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj; };

	var _require = __webpack_require__(1);

	var EventEmitter = _require.EventEmitter;
	var Cell = _require.Cell;
	var Map = _require.js.Map;

	var camelize = __webpack_require__(3);
	var hyphenize = __webpack_require__(4);
	var escapeHTML = __webpack_require__(5);
	var unescapeHTML = __webpack_require__(6);

	var defineProperty = Object.defineProperty;
	var toString = Object.prototype.toString;

	function isRegExp(value) {
		return toString.call(value) == '[object RegExp]';
	}

	var typeHandlers = new Map([[Boolean, [function (value) {
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
	}]], [Object, [function (value, defaultValue, component) {
		return value !== null ? Object(Function('return ' + unescapeHTML(value) + ';').call(component)) : null;
	}, function (value) {
		return value != null ? escapeHTML(isRegExp(value) ? value.toString() : JSON.stringify(value)) : null;
	}]], ['object', [function (value, defaultValue, component) {
		return value !== null ? Object(Function('return ' + unescapeHTML(value) + ';').call(component)) : defaultValue;
	}, function (value) {
		return value != null ? escapeHTML(isRegExp(value) ? value.toString() : JSON.stringify(value)) : null;
	}]]]);

	/**
	 * @typesign new Attributes(component: Rista.Component) -> Rista.Attributes;
	 */
	var Attributes = EventEmitter.extend({
		Static: {
			typeHandlers: typeHandlers
		},

		constructor: function Attributes(component) {
			var _this = this;

			var el = component.element;
			var schema = component.constructor.elementAttributes;

			var _loop = function _loop(name) {
				var defaultValue = schema[name];
				var type = typeof defaultValue === 'undefined' ? 'undefined' : _typeof(defaultValue);
				var handlers = typeHandlers.get(type == 'function' ? defaultValue : type);

				if (!handlers) {
					throw new TypeError('Unsupported attribute type');
				}

				var camelizedName = camelize(name);
				var hyphenizedName = hyphenize(name);

				var attrValue = _this['_' + camelizedName] = _this['_' + hyphenizedName] = new Cell(el.getAttribute(hyphenizedName), {
					merge: function merge(value, oldValue) {
						return oldValue && value === oldValue[0] ? oldValue : [value, handlers[0](value, defaultValue, component)];
					},
					onChange: function onChange(_ref) {
						var oldValue = _ref.oldValue[1];
						var value = _ref.value[1];

						if (component.isReady) {
							component.emit({
								type: 'element-attribute-' + hyphenizedName + '-change',
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
				});

				var descriptor = {
					configurable: true,
					enumerable: true,

					get: function get() {
						return attrValue.get()[1];
					},
					set: function set(value) {
						value = handlers[1](value, defaultValue);

						if (value === null) {
							el.removeAttribute(hyphenizedName);
						} else {
							el.setAttribute(hyphenizedName, value);
						}

						attrValue.set(value);
					}
				};

				defineProperty(_this, camelizedName, descriptor);

				if (hyphenizedName != camelizedName) {
					defineProperty(_this, hyphenizedName, descriptor);
				}
			};

			for (var name in schema) {
				_loop(name);
			}
		}
	});

	module.exports = Attributes;

/***/ },
/* 3 */
/***/ function(module, exports) {

	"use strict";

	var cache = Object.create(null);

	function camelize(str) {
		return cache[str] || (cache[str] = str.replace(/[\-_]+([a-z]|$)/g, function (match, chr) {
			return chr.toUpperCase();
		}));
	}

	module.exports = camelize;

/***/ },
/* 4 */
/***/ function(module, exports) {

	'use strict';

	var cache = Object.create(null);

	function hyphenize(str) {
		return cache[str] || (cache[str] = str.replace(/\-?([A-Z])([^A-Z])/g, function (match, chr1, chr2) {
			return '-' + chr1.toLowerCase() + chr2;
		}).replace(/\-?([A-Z]+)/g, function (match, chars) {
			return '-' + chars.toLowerCase();
		}).replace(/^-/, ''));
	}

	module.exports = hyphenize;

/***/ },
/* 5 */
/***/ function(module, exports) {

	'use strict';

	var reAmpersand = /&/g;
	var reLessThan = /</g;
	var reGreaterThan = />/g;
	var reQuote = /"/g;

	function escapeHTML(str) {
		return str.replace(reAmpersand, '&amp;').replace(reLessThan, '&lt;').replace(reGreaterThan, '&gt;').replace(reQuote, '&quot;');
	}

	module.exports = escapeHTML;

/***/ },
/* 6 */
/***/ function(module, exports) {

	'use strict';

	var reLessThan = /&lt;/g;
	var reGreaterThan = /&gt;/g;
	var reQuote = /&quot;/g;
	var reAmpersand = /&amp;/g;

	function unescapeHTML(str) {
		return str.replace(reLessThan, '<').replace(reGreaterThan, '>').replace(reQuote, '"').replace(reAmpersand, '&');
	}

	module.exports = unescapeHTML;

/***/ },
/* 7 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _require = __webpack_require__(1);

	var EventEmitter = _require.EventEmitter;
	var Cell = _require.Cell;
	var _require$utils = _require.utils;
	var createClass = _require$utils.createClass;
	var defineObservableProperty = _require$utils.defineObservableProperty;

	var DisposableMixin = __webpack_require__(8);
	var Attributes = __webpack_require__(2);
	var registerComponent = __webpack_require__(9);
	var renderInner = __webpack_require__(11);
	var morphComponentElement = __webpack_require__(12);
	var defineAssets = __webpack_require__(16);
	var listenAssets = __webpack_require__(17);
	var eventTypes = __webpack_require__(18);
	var camelize = __webpack_require__(3);
	var defer = __webpack_require__(19);

	var createObject = Object.create;
	var getPrototypeOf = Object.getPrototypeOf;
	var defineProperties = Object.defineProperties;
	var hasOwn = Object.prototype.hasOwnProperty;
	var isArray = Array.isArray;
	var map = Array.prototype.map;

	var reClosedCustomElementTag = /<(\w+(?:\-\w+)+)([^>]*)\/>/g;

	/**
	 * @typesign (evt: Event|cellx~Event);
	 */
	function onEvent(evt) {
		var node = void 0;
		var attrName = void 0;
		var targets = [];

		if (evt instanceof Event) {
			node = evt.target;
			attrName = 'rt-' + evt.type;
		} else {
			node = evt.target.element;
			attrName = 'rt-component-' + evt.type;
		}

		for (;;) {
			if (node.nodeType == 1 && node.hasAttribute(attrName)) {
				targets.unshift(node);
			}

			node = node.parentNode;

			if (!node) {
				break;
			}

			var component = node.ristaComponent;

			if (!component) {
				continue;
			}

			for (var i = targets.length; i;) {
				var target = targets[--i];
				var handler = component[target.getAttribute(attrName)];

				if (typeof handler == 'function') {
					handler.call(component, evt, target);
					targets.splice(i, 1);
				}
			}
		}
	}

	var Component = EventEmitter.extend({
		Implements: [DisposableMixin],

		Static: {
			/**
	   * @this {Function}
	   *
	   * @typesign (elementTagName: string, description: {
	   *     Implements?: Array<Object|Function>,
	   *     Static?: {
	   *         elementAttributes?: Object,
	   *         [key: string]
	   *     },
	   *     constructor?: Function,
	   *     [key: string]
	   * }) -> Function;
	   */

			extend: function extend(elementTagName, description) {
				description.Extends = this;
				(description.Static || (description.Static = {})).elementTagName = elementTagName;
				return registerComponent(createClass(description));
			},


			elementTagName: void 0,
			elementAttributes: {},

			template: null
		},

		_parentComponent: null,

		/**
	  * @type {?Rista.Component}
	  */
		get parentComponent() {
			if (this._parentComponent !== void 0) {
				return this._parentComponent;
			}

			for (var node; node = (node || this.element).parentNode;) {
				if (node.ristaComponent) {
					return this._parentComponent = node.ristaComponent;
				}
			}

			return this._parentComponent = null;
		},

		ownerComponent: null,

		/**
	  * @type {HTMLElement}
	  */
		element: null,

		_elementAttributes: null,

		/**
	  * @type {Rista.Attributes}
	  */
		get elementAttributes() {
			return this._elementAttributes || (this._elementAttributes = new Attributes(this));
		},

		_props: null,

		/**
	  * @type {Rista.Properties}
	  */
		get props() {
			return this._props || (this._props = defineObservableProperty(createObject(this.elementAttributes), 'contentSourceElement', null));
		},

		_elementInnerHTML: null,
		_prevAppliedElementInnerHTML: void 0,

		_elementAttached: null,

		initialized: false,
		isReady: false,

		_blockNameInMarkup: void 0,

		constructor: function Component(el) {
			EventEmitter.call(this);
			DisposableMixin.call(this);

			var constr = this.constructor;

			if (constr.prototype == Component.prototype) {
				throw new TypeError('Component is abstract class');
			}

			if (el == null) {
				el = document.createElement(constr.elementTagName);
			} else if (typeof el == 'string') {
				var elementTagName = constr.elementTagName;
				var html = el;

				el = document.createElement(elementTagName);
				el.innerHTML = html;

				var firstChild = el.firstChild;

				if (firstChild == el.lastChild && firstChild.nodeType == 1 && firstChild.tagName.toLowerCase() == elementTagName) {
					el = firstChild;
				}
			}

			this.element = el;

			defineProperties(el, {
				ristaComponent: { value: this },
				$c: { value: this }
			});

			if (constr.template || this.renderInner !== renderInner) {
				this._elementInnerHTML = new Cell(function () {
					var html = this.renderInner();
					return (isArray(html) ? html.join('') : html).replace(reClosedCustomElementTag, '<$1$2></$1>');
				}, {
					owner: this
				});
			}

			this._elementAttached = new Cell(false, {
				owner: this,
				onChange: this._onElementAttachedChange
			});

			if (this.created) {
				this.created();
			}
		},

		/**
	  * @override
	  */
		_handleEvent: function _handleEvent(evt) {
			EventEmitter.prototype._handleEvent.call(this, evt);

			if (evt.bubbles !== false && !evt.isPropagationStopped) {
				var parentComponent = this.parentComponent;

				if (parentComponent) {
					parentComponent._handleEvent(evt);
				} else {
					onEvent(evt);
				}
			}
		},
		_onElementInnerHTMLChange: function _onElementInnerHTMLChange() {
			this.updateElement();
		},
		_onElementAttachedChange: function _onElementAttachedChange(_ref) {
			var _this = this;

			var attached = _ref.value;

			if (attached && !this.initialized) {
				this.initialized = true;

				if (this.initialize) {
					this.initialize();
				}
			}

			if (this._elementInnerHTML) {
				this._elementInnerHTML[attached ? 'on' : 'off']('change', this._onElementInnerHTMLChange);
			}

			if (attached) {
				if (!this.ownerComponent && !this.props.contentSourceElement) {
					this.props.contentSourceElement = this.element.cloneNode(true);
				}

				this.updateElement();

				if (!this.isReady) {
					var el = this.element;

					for (var constr = this.constructor;;) {
						el.className += ' ' + constr.elementTagName;
						constr = getPrototypeOf(constr.prototype).constructor;

						if (constr == Component) {
							break;
						}
					}

					var attrs = this.elementAttributes;
					var attributesSchema = this.constructor.elementAttributes;

					for (var name in attributesSchema) {
						if (typeof attributesSchema[name] != 'function') {
							var camelizedName = camelize(name);
							attrs[camelizedName] = attrs[camelizedName];
						}
					}

					el.className += ' _component-ready';
				}

				if (!this.isReady || this.elementAttached) {
					defer(function () {
						var assets = _this.constructor.assets;

						if (!_this.isReady) {
							_this.isReady = true;

							if (assets) {
								defineAssets(_this, assets);
							}

							if (_this.ready) {
								_this.ready();
							}
						}

						if (assets) {
							listenAssets(_this, assets);
						}

						if (_this.elementAttached) {
							_this.elementAttached();
						}
					});
				}
			} else {
				this.dispose();

				if (this.elementDetached) {
					this.elementDetached();
				}
			}
		},


		/**
	  * @typesign () -> boolean;
	  */
		shouldElementUpdate: function shouldElementUpdate() {
			return !!this._elementInnerHTML;
		},


		/**
	  * @typesign () -> string|Array<string>;
	  */
		renderInner: renderInner,

		/**
	  * @typesign () -> Rista.Component;
	  */
		updateElement: function updateElement() {
			var _this2 = this;

			if (!this._elementInnerHTML) {
				return this;
			}

			var html = this._elementInnerHTML.get();

			if (html == (this._prevAppliedElementInnerHTML || '')) {
				return this;
			}

			var toEl = document.createElement('div');
			toEl.innerHTML = html;

			morphComponentElement(this, toEl);

			this._prevAppliedElementInnerHTML = html;

			if (this.isReady) {
				defer(function () {
					if (_this2.elementUpdated) {
						_this2.elementUpdated();
					}

					_this2.emit('element-update');
				});
			}

			return this;
		},


		/**
	  * @typesign (selector: string) -> Rista.Component|HTMLElement;
	  */
		$: function $(selector) {
			var el = this.element.querySelector(this._prepareSelector(selector));
			return el.$c || el;
		},


		/**
	  * @typesign (selector: string) -> Array<Rista.Component|HTMLElement>;
	  */
		$$: function $$(selector) {
			return map.call(this.element.querySelectorAll(this._prepareSelector(selector)), function (el) {
				return el.$c || el;
			});
		},


		/**
	  * @typesign (selector: string) -> string;
	  */
		_prepareSelector: function _prepareSelector(selector) {
			selector = selector.split('&');

			if (selector.length == 1) {
				return selector[0];
			}

			var blockName = this._blockNameInMarkup;

			if (!blockName) {
				for (var constr = this.constructor;;) {
					if (hasOwn.call(constr.prototype, 'renderInner')) {
						blockName = constr.elementTagName;
						break;
					}

					var parentConstr = getPrototypeOf(constr.prototype).constructor;

					if (constr.template && constr.template !== parentConstr.template) {
						blockName = constr.elementTagName;
						break;
					}

					if (parentConstr == Component) {
						blockName = this.constructor.elementTagName;
						break;
					}

					constr = parentConstr;
				}

				this._blockNameInMarkup = blockName;
			}

			return selector.join('.' + blockName);
		}
	});

	module.exports = Component;

	document.addEventListener('DOMContentLoaded', function onDOMContentLoaded() {
		document.removeEventListener('DOMContentLoaded', onDOMContentLoaded);

		eventTypes.forEach(function (type) {
			document.addEventListener(type, onEvent);
		});
	});

/***/ },
/* 8 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj; };

	var _require = __webpack_require__(1);

	var EventEmitter = _require.EventEmitter;
	var nextUID = _require.utils.nextUID;


	var isArray = Array.isArray;

	var DisposableMixin = EventEmitter.extend({
		constructor: function DisposableMixin() {
			/**
	   * @type {Object<{ dispose: () }>}
	   */
			this._disposables = {};
		},

		listenTo: function listenTo(target, type, listener, context) {
			var _this = this;

			var listenings = void 0;

			if (isArray(target) || target instanceof NodeList || target instanceof HTMLCollection || target.addClass && target.each) {
				if ((typeof type === 'undefined' ? 'undefined' : _typeof(type)) == 'object' && !isArray(type)) {
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

				if (isArray(type)) {
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

					if (isArray(_listeners)) {
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

			if (target instanceof EventEmitter) {
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
					if (target instanceof EventEmitter) {
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

			var _clearTimeout = function _clearTimeout() {
				if (_this3._disposables[id]) {
					clearTimeout(timeoutId);
					delete _this3._disposables[id];
				}
			};

			var timeout = this._disposables[id] = {
				clear: _clearTimeout,
				dispose: _clearTimeout
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

			var _clearInterval = function _clearInterval() {
				if (_this4._disposables[id]) {
					clearInterval(intervalId);
					delete _this4._disposables[id];
				}
			};

			var interval = this._disposables[id] = {
				clear: _clearInterval,
				dispose: _clearInterval
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
	  * @typesign () -> Rista.DisposableMixin;
	  */
		dispose: function dispose() {
			var disposables = this._disposables;

			for (var id in disposables) {
				disposables[id].dispose();
			}

			return this;
		}
	});

	module.exports = DisposableMixin;

/***/ },
/* 9 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _require = __webpack_require__(1);

	var mixin = _require.utils.mixin;

	var ElementProtoMixin = __webpack_require__(10);

	var createObject = Object.create;
	var getPrototypeOf = Object.getPrototypeOf;
	var hasOwn = Object.prototype.hasOwnProperty;

	var inheritedStaticProperties = ['template', 'elementAttributes', 'assets'];

	function registerComponent(componentClass) {
		var elementTagName = componentClass.elementTagName;

		if (!elementTagName) {
			throw new TypeError('"elementTagName" is required');
		}

		var parent = void 0;

		// Babel, в отличии от typescript-а и Component.extend-а, не копирует статические свойства при наследовании,
		// а так как парочка нам очень нужны, копируем их сами.
		inheritedStaticProperties.forEach(function (name) {
			if (!hasOwn.call(componentClass, name) && hasOwn.call(parent || (parent = getPrototypeOf(componentClass.prototype).constructor), name)) {
				componentClass[name] = parent[name];
			}
		});

		var elementProto = createObject(HTMLElement.prototype);

		mixin(elementProto, ElementProtoMixin);
		elementProto._ristaComponentConstr = componentClass;

		document.registerElement(elementTagName, { prototype: elementProto });

		return componentClass;
	}

	module.exports = registerComponent;

/***/ },
/* 10 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _require = __webpack_require__(1);

	var nextTick = _require.utils.nextTick;


	var hasOwn = Object.prototype.hasOwnProperty;

	var ElementProtoMixin = {
		get ristaComponent() {
			return new this._ristaComponentConstr(this);
		},

		get $c() {
			return this.ristaComponent;
		},

		attachedCallback: function attachedCallback() {
			var component = this.ristaComponent;

			component._parentComponent = void 0;

			if (component.parentComponent) {
				component._elementAttached.set(true);
			} else {
				nextTick(function () {
					component._elementAttached.set(true);
				});
			}
		},
		detachedCallback: function detachedCallback() {
			var component = this.ristaComponent;
			component._parentComponent = null;
			component._elementAttached.set(false);
		},
		attributeChangedCallback: function attributeChangedCallback(name, oldValue, value) {
			var component = this.ristaComponent;

			if (component.isReady) {
				var attrs = component.elementAttributes;
				var privateName = '_' + name;

				if (hasOwn.call(attrs, privateName)) {
					attrs[privateName].set(value);
				}
			}
		}
	};

	module.exports = ElementProtoMixin;

/***/ },
/* 11 */
/***/ function(module, exports) {

	'use strict';

	function renderInner() {
		var template = this.constructor.template;

		if (template) {
			return template.render ? template.render(this) : template.call(this, this);
		}

		return '';
	}

	module.exports = renderInner;

/***/ },
/* 12 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _require = __webpack_require__(1);

	var _Symbol = _require.js.Symbol;

	var morphElement = __webpack_require__(13);

	var KEY_PREV_APPLIED_ATTRIBUTES = _Symbol('prevAppliedAttributes');

	/**
	 * @typesign (component: Rista.Component, contentSource: HTMLElement|NodeList, ownerComponent?: Rista.Component);
	 */
	function morphComponentElement(component, contentSource, ownerComponent) {
		if (!ownerComponent) {
			ownerComponent = component;
		}

		morphElement(component.element, contentSource, {
			contentOnly: true,

			getElementAttributes: function getElementAttributes(el) {
				return el[KEY_PREV_APPLIED_ATTRIBUTES] || el.attributes;
			},
			onBeforeMorphElementContent: function onBeforeMorphElementContent(el, toEl) {
				var component = el.ristaComponent;

				if (component) {
					el[KEY_PREV_APPLIED_ATTRIBUTES] = toEl.attributes;

					component.ownerComponent = ownerComponent;

					if (component.shouldElementUpdate()) {
						component.props.contentSourceElement = toEl;
						return false;
					}
				}
			}
		});
	}

	module.exports = morphComponentElement;

/***/ },
/* 13 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var specialElementHandlers = __webpack_require__(14);
	var morphElementAttributes = __webpack_require__(15);
	var defaultNamespaceURI = document.documentElement.namespaceURI;
	function defaultGetElementAttributes(el) {
	    return el.attributes;
	}
	function defaultGetElementKey(el) {
	    return el.getAttribute('key');
	}
	function defaultIsCompatibleElements(el1, el2) {
	    return el1.tagName == el2.tagName;
	}
	function morphElement(el, toEl, options) {
	    if (!options) {
	        options = {};
	    }
	    var contentOnly = !!options.contentOnly;
	    var getElementAttributes = options.getElementAttributes || defaultGetElementAttributes;
	    var getElementKey = options.getElementKey || defaultGetElementKey;
	    var isCompatibleElements = options.isCompatibleElements || defaultIsCompatibleElements;
	    var onBeforeMorphElement = options.onBeforeMorphElement;
	    var onBeforeMorphElementContent = options.onBeforeMorphElementContent;
	    var onElementRemoved = options.onElementRemoved;
	    var activeElement = document.activeElement;
	    var scrollLeft;
	    var scrollTop;
	    if (activeElement.selectionStart !== void 0) {
	        scrollLeft = activeElement.scrollLeft;
	        scrollTop = activeElement.scrollTop;
	    }
	    var storedElements = Object.create(null);
	    var someStoredElements = Object.create(null);
	    var unmatchedElements = Object.create(null);
	    var haveNewStoredElements = false;
	    var haveNewUnmatchedElements = false;
	    function storeElement(el, remove) {
	        var key = getElementKey(el);
	        if (key) {
	            var unmatchedEl = unmatchedElements[key];
	            if (unmatchedEl) {
	                delete unmatchedElements[key];
	                unmatchedEl.el.parentNode.replaceChild(el, unmatchedEl.el);
	                _morphElement(el, unmatchedEl.toEl, false);
	            }
	            else {
	                storedElements[key] = someStoredElements[key] = el;
	                haveNewStoredElements = true;
	                if (remove) {
	                    el.parentNode.removeChild(el);
	                }
	            }
	        }
	        else {
	            if (remove) {
	                el.parentNode.removeChild(el);
	            }
	            for (var child = el.firstElementChild; child; child = child.nextElementSibling) {
	                storeElement(child, false);
	            }
	            if (onElementRemoved) {
	                onElementRemoved(el);
	            }
	        }
	    }
	    function restoreElement(el) {
	        for (var child = el.firstElementChild, nextChild = void 0; child; child = nextChild) {
	            nextChild = child.nextElementSibling;
	            var key = getElementKey(child);
	            if (key) {
	                var unmatchedEl = unmatchedElements[key];
	                if (unmatchedEl) {
	                    delete unmatchedElements[key];
	                    unmatchedEl.el.parentNode.replaceChild(child, unmatchedEl.el);
	                    _morphElement(child, unmatchedEl.toEl, false);
	                }
	                else {
	                    storedElements[key] = someStoredElements[key] = child;
	                    haveNewStoredElements = true;
	                }
	            }
	            else {
	                restoreElement(child);
	            }
	        }
	    }
	    function handleRemovedElement(el) {
	        for (var child = el.firstElementChild; child; child = child.nextElementSibling) {
	            handleRemovedElement(child);
	        }
	        if (onElementRemoved) {
	            onElementRemoved(el);
	        }
	    }
	    function _morphElement(el, toEl, contentOnly) {
	        var isToElNodeList = toEl instanceof NodeList;
	        if (!contentOnly && !isToElNodeList) {
	            if (onBeforeMorphElement && onBeforeMorphElement(el, toEl) === false) {
	                return;
	            }
	            morphElementAttributes(el, toEl, getElementAttributes(el));
	            if (onBeforeMorphElementContent && onBeforeMorphElementContent(el, toEl) === false) {
	                return;
	            }
	        }
	        var elTagName = el.tagName;
	        if (elTagName != 'TEXTAREA') {
	            var elChild = el.firstChild;
	            var toElChildren = isToElNodeList ? toEl : toEl.childNodes;
	            for (var i = 0, l = toElChildren.length; i < l; i++) {
	                var toElChild = toElChildren[i];
	                var toElChildType = toElChild.nodeType;
	                var toElChildKey = void 0;
	                if (toElChildType == 1) {
	                    toElChildKey = getElementKey(toElChild);
	                    if (toElChildKey) {
	                        var storedEl = storedElements[toElChildKey];
	                        if (storedEl) {
	                            delete storedElements[toElChildKey];
	                            delete someStoredElements[toElChildKey];
	                            if (elChild === storedEl) {
	                                elChild = elChild.nextSibling;
	                            }
	                            else {
	                                el.insertBefore(storedEl, elChild || null);
	                            }
	                            _morphElement(storedEl, toElChild, false);
	                            continue;
	                        }
	                    }
	                }
	                var found = false;
	                for (var nextElChild = elChild; nextElChild; nextElChild = nextElChild.nextSibling) {
	                    if (nextElChild.nodeType == toElChildType) {
	                        if (toElChildType == 1) {
	                            if (getElementKey(nextElChild) === toElChildKey &&
	                                (toElChildKey || isCompatibleElements(nextElChild, toElChild))) {
	                                found = true;
	                                _morphElement(nextElChild, toElChild, false);
	                            }
	                        }
	                        else {
	                            found = true;
	                            nextElChild.nodeValue = toElChild.nodeValue;
	                        }
	                    }
	                    if (found) {
	                        if (elChild == nextElChild) {
	                            elChild = elChild.nextSibling;
	                        }
	                        else {
	                            el.insertBefore(nextElChild, elChild);
	                        }
	                        break;
	                    }
	                }
	                if (!found) {
	                    switch (toElChildType) {
	                        case 1: {
	                            var unmatchedEl = toElChild.namespaceURI == defaultNamespaceURI ?
	                                document.createElement(toElChild.tagName) :
	                                document.createElementNS(toElChild.namespaceURI, toElChild.tagName);
	                            el.insertBefore(unmatchedEl, elChild || null);
	                            if (toElChildKey) {
	                                unmatchedElements[toElChildKey] = {
	                                    el: unmatchedEl,
	                                    toEl: toElChild
	                                };
	                                haveNewUnmatchedElements = true;
	                            }
	                            else {
	                                _morphElement(unmatchedEl, toElChild, false);
	                            }
	                            break;
	                        }
	                        case 3: {
	                            el.insertBefore(document.createTextNode(toElChild.nodeValue), elChild || null);
	                            break;
	                        }
	                        case 8: {
	                            el.insertBefore(document.createComment(toElChild.nodeValue), elChild || null);
	                            break;
	                        }
	                        default: {
	                            throw new TypeError('Unsupported node type');
	                        }
	                    }
	                }
	            }
	            for (var nextElChild = void 0; elChild; elChild = nextElChild) {
	                nextElChild = elChild.nextSibling;
	                if (elChild.nodeType == 1) {
	                    storeElement(elChild, true);
	                }
	                else {
	                    el.removeChild(elChild);
	                }
	            }
	        }
	        if (!isToElNodeList) {
	            var specialElementHandler = specialElementHandlers[elTagName];
	            if (specialElementHandler) {
	                specialElementHandler(el, toEl);
	            }
	        }
	    }
	    _morphElement(el, toEl, contentOnly);
	    while (haveNewUnmatchedElements) {
	        while (haveNewStoredElements) {
	            haveNewStoredElements = false;
	            for (var key in someStoredElements) {
	                var storedEl = someStoredElements[key];
	                delete someStoredElements[key];
	                restoreElement(storedEl);
	            }
	        }
	        haveNewUnmatchedElements = false;
	        for (var key in unmatchedElements) {
	            var unmatchedEl = unmatchedElements[key];
	            delete unmatchedElements[key];
	            _morphElement(unmatchedEl.el, unmatchedEl.toEl, false);
	            if (haveNewUnmatchedElements) {
	                break;
	            }
	        }
	    }
	    for (var key in storedElements) {
	        handleRemovedElement(storedElements[key]);
	    }
	    if (activeElement != document.activeElement) {
	        if (scrollLeft !== void 0) {
	            activeElement.scrollLeft = scrollLeft;
	            activeElement.scrollTop = scrollTop;
	        }
	        activeElement.focus();
	    }
	}
	module.exports = morphElement;


/***/ },
/* 14 */
/***/ function(module, exports) {

	"use strict";
	var specialElementHandlers = {
	    INPUT: function (el, toEl) {
	        if (el.value != toEl.value) {
	            el.value = toEl.value;
	        }
	        el.checked = toEl.checked;
	    },
	    TEXTAREA: function (el, toEl) {
	        var value = toEl.value;
	        if (el.value != value) {
	            el.value = value;
	        }
	        if (el.firstChild) {
	            el.firstChild.nodeValue = value;
	        }
	    },
	    OPTION: function (el, toEl) {
	        el.selected = toEl.selected;
	    }
	};
	module.exports = specialElementHandlers;


/***/ },
/* 15 */
/***/ function(module, exports) {

	"use strict";
	function morphElementAttributes(el, toEl, elAttributes) {
	    var toElAttributes = toEl.attributes;
	    for (var i = 0, l = toElAttributes.length; i < l; i++) {
	        var toElAttr = toElAttributes.item(i);
	        var toElAttrNamespaceURI = toElAttr.namespaceURI;
	        var elAttr = toElAttrNamespaceURI ?
	            elAttributes.getNamedItemNS(toElAttrNamespaceURI, toElAttr.name) :
	            elAttributes.getNamedItem(toElAttr.name);
	        if (!elAttr || elAttr.value != toElAttr.value) {
	            if (toElAttrNamespaceURI) {
	                el.setAttributeNS(toElAttrNamespaceURI, toElAttr.name, toElAttr.value);
	            }
	            else {
	                el.setAttribute(toElAttr.name, toElAttr.value);
	            }
	        }
	    }
	    for (var i = elAttributes.length; i;) {
	        var elAttr = elAttributes.item(--i);
	        var elAttrNamespaceURI = elAttr.namespaceURI;
	        if (elAttrNamespaceURI) {
	            if (!toElAttributes.getNamedItemNS(elAttrNamespaceURI, elAttr.name)) {
	                el.removeAttributeNS(elAttrNamespaceURI, elAttr.name);
	            }
	        }
	        else {
	            if (!toElAttributes.getNamedItem(elAttr.name)) {
	                el.removeAttribute(elAttr.name);
	            }
	        }
	    }
	}
	module.exports = morphElementAttributes;


/***/ },
/* 16 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var hyphenize = __webpack_require__(4);

	var hasOwn = Object.prototype.hasOwnProperty;

	function defineAssets(component, assets) {
		for (var name in assets) {
			if (hasOwn.call(assets, name) && name.charAt(0) != ':') {
				component[name] = component.$(assets[name].selector || '&__' + hyphenize(name));
			}
		}
	}

	module.exports = defineAssets;

/***/ },
/* 17 */
/***/ function(module, exports) {

	'use strict';

	var hasOwn = Object.prototype.hasOwnProperty;

	function listenAssets(component, assets) {
		for (var name in assets) {
			if (hasOwn.call(assets, name)) {
				var asset = name == ':host' ? component : name == ':element' ? component.element : component[name];
				var config = assets[name];

				for (var key in config) {
					if (hasOwn.call(config, key) && key.length > 3 && key.slice(0, 3) == 'on-') {
						component.listenTo(asset, key.slice(3), config[key]);
					}
				}
			}
		}
	}

	module.exports = listenAssets;

/***/ },
/* 18 */
/***/ function(module, exports) {

	'use strict';

	module.exports = ['click', 'dblclick', 'mousedown', 'mouseup', 'input', 'change', 'submit', 'focusin', 'focusout'];

/***/ },
/* 19 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _require = __webpack_require__(1);

	var ErrorLogger = _require.ErrorLogger;


	var queue = void 0;

	function run() {
		var track = queue;

		queue = null;

		for (var i = 0, l = track.length; i < l; i++) {
			try {
				track[i]();
			} catch (err) {
				ErrorLogger.log(err);
			}
		}
	}

	function defer(cb) {
		if (queue) {
			queue.push(cb);
		} else {
			queue = [cb];
			setTimeout(run, 1);
		}
	}

	module.exports = defer;

/***/ },
/* 20 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _require = __webpack_require__(1);

	var Cell = _require.Cell;
	var nextTick = _require.utils.nextTick;

	var Component = __webpack_require__(7);
	var morphComponentElement = __webpack_require__(12);

	module.exports = Component.extend('rt-content', {
		Static: {
			elementAttributes: {
				select: String
			}
		},

		shouldElementUpdate: function shouldElementUpdate() {
			return true;
		},


		/**
	  * @override
	  */
		updateElement: function updateElement() {
			var _this = this;

			var contentSource = this._contentSource.get();

			morphComponentElement(this, contentSource, contentSource == this.props.contentSourceElement ? this.ownerComponent : this.ownerComponent.ownerComponent);

			if (this.isReady) {
				nextTick(function () {
					_this.emit('element-update');
				});
			}

			return this;
		},
		initialize: function initialize() {
			var ownerComponentProperties = this.ownerComponent.props;
			var elementAttributes = this.elementAttributes;

			this._contentSource = new Cell(function () {
				var ownerComponentContentSourceElement = ownerComponentProperties.contentSourceElement;
				var selector = elementAttributes.select;

				if (selector) {
					var selectedElements = ownerComponentContentSourceElement.querySelectorAll(selector);
					return selectedElements.length ? selectedElements : this.props.contentSourceElement;
				}

				return ownerComponentContentSourceElement.firstChild ? ownerComponentContentSourceElement : this.props.contentSourceElement;
			}, {
				owner: this,
				onChange: this._onContentSourceChange
			});

			this._contentSourceListening = true;
		},
		elementAttached: function elementAttached() {
			if (!this._contentSourceListening) {
				this._contentSource.on('change', this._onContentSourceChange);
			}
		},
		elementDetached: function elementDetached() {
			this._contentSource.off('change', this._onContentSourceChange);
			this._contentSourceListening = false;
		},
		_onContentSourceChange: function _onContentSourceChange() {
			this.updateElement();
		}
	});

/***/ }
/******/ ])
});
;