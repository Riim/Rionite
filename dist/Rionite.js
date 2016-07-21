(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory(require("cellx"));
	else if(typeof define === 'function' && define.amd)
		define(["cellx"], factory);
	else if(typeof exports === 'object')
		exports["Rionite"] = factory(require("cellx"));
	else
		root["Rionite"] = factory(root["cellx"]);
})(this, function(__WEBPACK_EXTERNAL_MODULE_2__) {
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

	var DisposableMixin = __webpack_require__(1);
	var ElementAttributes = __webpack_require__(3);
	var Component = __webpack_require__(10);
	var registerComponent = __webpack_require__(11);
	var KeyedList = __webpack_require__(25);
	var RtContent = __webpack_require__(26);
	var RtIfThen = __webpack_require__(28);
	var RtIfElse = __webpack_require__(29);
	var RtRepeat = __webpack_require__(30);
	var camelize = __webpack_require__(8);
	var hyphenize = __webpack_require__(9);
	var escapeHTML = __webpack_require__(5);
	var unescapeHTML = __webpack_require__(6);
	var isRegExp = __webpack_require__(7);
	var pathToJSExpression = __webpack_require__(18);
	var compilePath = __webpack_require__(19);
	var compileString = __webpack_require__(17);
	var defer = __webpack_require__(14);
	var htmlToFragment = __webpack_require__(24);

	var Rionite = module.exports = {
		DisposableMixin: DisposableMixin,
		ElementAttributes: ElementAttributes,
		Component: Component,
		registerComponent: registerComponent,
		KeyedList: KeyedList,

		components: {
			RtContent: RtContent,
			RtIfThen: RtIfThen,
			RtIfElse: RtIfElse,
			RtRepeat: RtRepeat
		},

		utils: {
			camelize: camelize,
			hyphenize: hyphenize,
			escapeHTML: escapeHTML,
			unescapeHTML: unescapeHTML,
			isRegExp: isRegExp,
			pathToJSExpression: pathToJSExpression,
			compilePath: compilePath,
			compileString: compileString,
			defer: defer,
			htmlToFragment: htmlToFragment
		}
	};
	Rionite.Rionite = Rionite; // for destructuring

/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj; };

	var _require = __webpack_require__(2);

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

	module.exports = DisposableMixin;

/***/ },
/* 2 */
/***/ function(module, exports) {

	module.exports = __WEBPACK_EXTERNAL_MODULE_2__;

/***/ },
/* 3 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj; };

	var _require = __webpack_require__(2);

	var EventEmitter = _require.EventEmitter;
	var Cell = _require.Cell;

	var attributeTypeHandlers = __webpack_require__(4);
	var camelize = __webpack_require__(8);
	var hyphenize = __webpack_require__(9);

	var defineProperty = Object.defineProperty;

	/**
	 * @typesign new ElementAttributes(el: HTMLElement) -> Rionite.ElementAttributes;
	 */
	var ElementAttributes = EventEmitter.extend({
		constructor: function ElementAttributes(el) {
			var _this = this;

			var component = el.$c;
			var attributesConfig = component.constructor.elementAttributes;

			var _loop = function _loop(name) {
				var defaultValue = attributesConfig[name];
				var type = typeof defaultValue === 'undefined' ? 'undefined' : _typeof(defaultValue);
				var handlers = attributeTypeHandlers.get(type == 'function' ? defaultValue : type);

				if (!handlers) {
					throw new TypeError('Unsupported attribute type');
				}

				var camelizedName = camelize(name);
				var hyphenizedName = hyphenize(name);

				var attrValue = _this['_' + camelizedName] = _this['_' + hyphenizedName] = new Cell(el.getAttribute(hyphenizedName), {
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

			for (var name in attributesConfig) {
				_loop(name);
			}
		}
	});

	module.exports = ElementAttributes;

/***/ },
/* 4 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _require = __webpack_require__(2);

	var Map = _require.js.Map;

	var escapeHTML = __webpack_require__(5);
	var unescapeHTML = __webpack_require__(6);
	var isRegExp = __webpack_require__(7);

	module.exports = new Map([[Boolean, [function (value) {
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

/***/ },
/* 5 */
/***/ function(module, exports) {

	'use strict';

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

	module.exports = escapeHTML;

/***/ },
/* 6 */
/***/ function(module, exports) {

	'use strict';

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

	module.exports = unescapeHTML;

/***/ },
/* 7 */
/***/ function(module, exports) {

	'use strict';

	var toString = Object.prototype.toString;

	function isRegExp(value) {
		return toString.call(value) == '[object RegExp]';
	}

	module.exports = isRegExp;

/***/ },
/* 8 */
/***/ function(module, exports) {

	"use strict";

	var reHyphen = /[\-_]+([a-z]|$)/g;

	var cache = Object.create(null);

	function camelize(str) {
		return cache[str] || (cache[str] = str.replace(reHyphen, function (match, chr) {
			return chr.toUpperCase();
		}));
	}

	module.exports = camelize;

/***/ },
/* 9 */
/***/ function(module, exports) {

	'use strict';

	var reHump = /\-?([A-Z])([^A-Z])/g;
	var reLongHump = /\-?([A-Z]+)/g;
	var reMinus = /^-/;

	var cache = Object.create(null);

	function hyphenize(str) {
		return cache[str] || (cache[str] = str.replace(reHump, function (match, chr1, chr2) {
			return '-' + chr1.toLowerCase() + chr2;
		}).replace(reLongHump, function (match, chars) {
			return '-' + chars.toLowerCase();
		}).replace(reMinus, ''));
	}

	module.exports = hyphenize;

/***/ },
/* 10 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _require = __webpack_require__(2);

	var EventEmitter = _require.EventEmitter;
	var Cell = _require.Cell;
	var _Symbol = _require.js.Symbol;
	var createClass = _require.utils.createClass;

	var DisposableMixin = __webpack_require__(1);
	var ElementAttributes = __webpack_require__(3);
	var registerComponent = __webpack_require__(11);
	var bind = __webpack_require__(15);
	var defineAssets = __webpack_require__(20);
	var listenAssets = __webpack_require__(21);
	var eventTypes = __webpack_require__(22);
	var onEvent = __webpack_require__(23);
	var camelize = __webpack_require__(8);
	var defer = __webpack_require__(14);
	var htmlToFragment = __webpack_require__(24);

	var createObject = Object.create;
	var getPrototypeOf = Object.getPrototypeOf;
	var defineProperty = Object.defineProperty;
	var map = Array.prototype.map;

	var KEY_RAW_CONTENT = _Symbol('rawContent');

	var reClosedCustomElementTag = /<(\w+(?:\-\w+)+)([^>]*)\/>/g;

	function created() {}
	function initialize() {}
	function ready() {}
	function elementAttached() {}
	function elementDetached() {}
	function elementMoved() {}
	function elementAttributeChanged() {}

	var Component = EventEmitter.extend({
		Implements: [DisposableMixin],

		Static: {
			extend: function extend(elementIs, description) {
				description.Extends = this;

				var Static = description.Static || (description.Static = {});

				Static.elementIs = elementIs;

				var props = Static.props;

				if (props) {
					if (props.content) {
						throw new TypeError('It is not necessary to declare property "content"');
					}
					if (props.context) {
						throw new TypeError('It is not necessary to declare property "context"');
					}

					Static.elementAttributes = props;
				} else if (Static.elementAttributes) {
					Static.props = Static.elementAttributes;
				}

				return registerComponent(createClass(description));
			},


			template: null,

			elementIs: void 0,
			elementExtends: void 0,

			elementAttributes: null,
			props: null,

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

			defineProperty(this, 'elementAttributes', {
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
			var props = createObject(this.elementAttributes);

			props.content = null;
			props.context = null;

			defineProperty(this, 'props', {
				configurable: true,
				enumerable: true,
				writable: true,
				value: props
			});

			return props;
		},

		_elementAttached: null,

		_bindings: null,

		initialized: false,
		isReady: false,

		_blockNameInMarkup: void 0,

		constructor: function Component(el, props) {
			EventEmitter.call(this);
			DisposableMixin.call(this);

			if (el == null) {
				el = document.createElement(this.constructor.elementIs);
			} else if (typeof el == 'string') {
				var elementIs = this.constructor.elementIs;
				var html = el;

				el = document.createElement(elementIs);
				el.innerHTML = html;

				var firstChild = el.firstChild;

				if (firstChild == el.lastChild && firstChild.nodeType == 1 && firstChild.tagName.toLowerCase() == elementIs) {
					el = firstChild;
				}
			}

			this.element = el;

			defineProperty(el, '$c', { value: this });

			if (props) {
				var properties = this.props;

				for (var name in props) {
					properties[camelize(name)] = props[name];
				}
			}

			this._elementAttached = new Cell(false, {
				owner: this,
				onChange: this._onElementAttachedChange
			});

			this.created();
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
		_onElementAttachedChange: function _onElementAttachedChange(evt) {
			var _this = this;

			if (evt.value) {
				if (!this.initialized) {
					this.initialize();
					this.initialized = true;
				}

				var constr = this.constructor;
				var rawContent = constr[KEY_RAW_CONTENT];
				var el = this.element;

				if (this.isReady) {
					for (var child; child = el.firstChild;) {
						el.removeChild(child);
					}
				} else {
					for (var c = constr;;) {
						el.classList.add(c.elementIs);
						c = getPrototypeOf(c.prototype).constructor;

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

							if (typeof template != 'string') {
								template = template.render ? template.render(this) : template.call(this, this);
							}

							rawContent = constr[KEY_RAW_CONTENT] = htmlToFragment(template.replace(reClosedCustomElementTag, '<$1$2></$1>'));
						}

						var inputContent = this.props.content = document.createDocumentFragment();

						for (var _child; _child = el.firstChild;) {
							inputContent.appendChild(_child);
						}
					}
				}

				var content = rawContent && rawContent.cloneNode(true);

				if (content) {
					this._bindings = bind(content, this);
					this.element.appendChild(content);
				}

				if (!this.isReady || this.elementAttached !== elementAttached) {
					defer(function () {
						var assetsConfig = _this.constructor.assets;

						if (!_this.isReady) {
							if (assetsConfig) {
								defineAssets(_this, assetsConfig);
							}

							_this.ready();

							_this.isReady = true;
						}

						if (assetsConfig) {
							listenAssets(_this, assetsConfig);
						}

						_this.elementAttached();
					});
				}
			} else {
				this.dispose();
				this._destroyBindings();
				this.elementDetached();
			}
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


		created: created,
		initialize: initialize,
		ready: ready,
		elementAttached: elementAttached,
		elementDetached: elementDetached,
		elementMoved: elementMoved,
		elementAttributeChanged: elementAttributeChanged,

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

			var blockName = this._blockNameInMarkup;

			if (!blockName) {
				for (var constr = this.constructor;;) {
					var parentConstr = getPrototypeOf(constr.prototype).constructor;

					if (constr.template !== parentConstr.template) {
						blockName = constr.elementIs;
						break;
					}

					if (parentConstr == Component) {
						blockName = this.constructor.elementIs;
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
/* 11 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _require = __webpack_require__(2);

	var mixin = _require.utils.mixin;

	var elementConstructorMap = __webpack_require__(12);
	var ElementProtoMixin = __webpack_require__(13);

	var createObject = Object.create;
	var getPrototypeOf = Object.getPrototypeOf;
	var hasOwn = Object.prototype.hasOwnProperty;

	var inheritedStaticProperties = ['template', 'elementExtends', 'elementAttributes', 'assets'];

	function registerComponent(componentConstr) {
		var elementIs = componentConstr.elementIs;

		if (!elementIs) {
			throw new TypeError('Static property "elementIs" is required');
		}

		var parentComponentConstr = void 0;

		inheritedStaticProperties.forEach(function (name) {
			if (!hasOwn.call(componentConstr, name)) {
				componentConstr[name] = (parentComponentConstr || (parentComponentConstr = getPrototypeOf(componentConstr.prototype).constructor))[name];
			}
		});

		var elementExtends = componentConstr.elementExtends;
		var parentElementConstr = elementExtends ? elementConstructorMap[elementExtends] || window['HTML' + (elementExtends.charAt(0).toUpperCase() + elementExtends.slice(1)) + 'Element'] : HTMLElement;
		var elementProto = createObject(parentElementConstr.prototype);

		mixin(elementProto, ElementProtoMixin);
		elementProto._rioniteComponentConstructor = componentConstr;

		elementConstructorMap[elementIs] = document.registerElement(elementIs, elementExtends ? { extends: elementExtends, prototype: elementProto } : { prototype: elementProto });

		return componentConstr;
	}

	module.exports = registerComponent;

/***/ },
/* 12 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _require = __webpack_require__(2);

	var mixin = _require.utils.mixin;


	module.exports = mixin(Object.create(null), {
		template: window.HTMLTemplateElement || HTMLElement,

		br: window.HTMLBRElement,
		caption: window.HTMLTableCaptionElement,
		col: window.HTMLTableColElement,
		datalist: window.HTMLDataListElement,
		dl: window.HTMLDListElement,
		fieldset: window.HTMLFieldSetElement,
		frameset: window.HTMLFrameSetElement,
		hr: window.HTMLHRElement,
		iframe: window.HTMLIFrameElement,
		li: window.HTMLLIElement,
		ol: window.HTMLOListElement,
		optgroup: window.HTMLOptGroupElement,
		tbody: window.HTMLTableSectionElement,
		td: window.HTMLTableCellElement,
		textarea: window.HTMLTextAreaElement,
		tfoot: window.HTMLTableSectionElement,
		thead: window.HTMLTableSectionElement,
		tr: window.HTMLTableRowElement,
		ul: window.HTMLUListElement
	});

/***/ },
/* 13 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _require = __webpack_require__(2);

	var nextTick = _require.utils.nextTick;

	var defer = __webpack_require__(14);

	var hasOwn = Object.prototype.hasOwnProperty;

	var ElementProtoMixin = {
		get rioniteComponent() {
			return this.$c;
		},

		get $c() {
			return new this._rioniteComponentConstructor(this);
		},

		attachedCallback: function attachedCallback() {
			var component = this.$c;

			if (component._elementAttached.get()) {
				if (component._parentComponent === null) {
					component._parentComponent = void 0;
					component.elementMoved();
				} else {
					component._parentComponent = void 0;
				}
			} else {
				component._parentComponent = void 0;

				if (component.parentComponent) {
					if (component.ownerComponent) {
						component._elementAttached.set(true);
					}
				} else {
					nextTick(function () {
						component._parentComponent = void 0;

						if (!component.parentComponent) {
							component._elementAttached.set(true);
						}
					});
				}
			}
		},
		detachedCallback: function detachedCallback() {
			var component = this.$c;

			component._parentComponent = null;

			defer(function () {
				if (component._parentComponent === null) {
					component._elementAttached.set(false);
				}
			});
		},
		attributeChangedCallback: function attributeChangedCallback(name, oldValue, value) {
			if (this.$c.isReady) {
				var attrs = this.$c.elementAttributes;
				var privateName = '_' + name;

				if (hasOwn.call(attrs, privateName)) {
					attrs[privateName].set(value);
				}
			}
		}
	};

	module.exports = ElementProtoMixin;

/***/ },
/* 14 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _require = __webpack_require__(2);

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
/* 15 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _require = __webpack_require__(2);

	var Cell = _require.Cell;

	var pathPattern = __webpack_require__(16);
	var compileString = __webpack_require__(17);

	var reBinding = RegExp('\\{\\s*(' + pathPattern + ')\\s*\\}', 'g');

	function bind(node, component, context) {
		if (!context) {
			context = component;
		}

		var bindings = [];

		function bind_(node) {
			var _loop = function _loop(child) {
				switch (child.nodeType) {
					case 1:
						{
							var attrs = child.attributes;

							for (var i = attrs.length; i;) {
								var attr = attrs.item(--i);
								var value = attr.value;
								var splitValue = value.split(reBinding);

								if (splitValue.length > 1) {
									(function () {
										var name = attr.name;
										var cell = new Cell(compileString(splitValue, value), {
											owner: context,
											onChange: function onChange(_ref) {
												var value = _ref.value;

												if (value === false || value == null) {
													child.removeAttribute(name);
												} else {
													child.setAttribute(name, value === true ? '' : value);
												}
											}
										});

										value = cell.get();

										if (value === false || value == null) {
											child.removeAttribute(name);
										} else {
											child.setAttribute(name, value === true ? '' : value);
										}

										bindings.push(cell);
									})();
								}
							}

							var childComponent = child.$c;

							if (childComponent) {
								childComponent.ownerComponent = component;
								childComponent._parentComponent = void 0;
								childComponent.props.context = context;
								childComponent._elementAttached.set(true);
							}

							if (child.firstChild && (!childComponent || childComponent.constructor.template == null)) {
								bind_(child);
							}

							break;
						}
					case 3:
						{
							var content = child.textContent;
							var splitContent = content.split(reBinding);

							if (splitContent.length > 1) {
								var _cell = new Cell(compileString(splitContent, content), {
									owner: context,
									onChange: function onChange(evt) {
										child.textContent = evt.value;
									}
								});

								child.textContent = _cell.get();

								bindings.push(_cell);
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

		return bindings.length ? bindings : null;
	}

	module.exports = bind;

/***/ },
/* 16 */
/***/ function(module, exports) {

	'use strict';

	module.exports = '[$\\w]+(?:\\??\\.[$\\w]+)*';

/***/ },
/* 17 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var pathToJSExpression = __webpack_require__(18);
	var compilePath = __webpack_require__(19);

	var reEscapableChars = /['\r\n]/g;
	var charToRegExpMap = Object.create(null);

	charToRegExpMap['\''] = '\\\'';
	charToRegExpMap['\r'] = '\\r';
	charToRegExpMap['\n'] = '\\n';

	var cache = Object.create(null);

	function compileString(substrings, str) {
		if (cache[str]) {
			return cache[str];
		}

		if (substrings.length == 3 && substrings[0] == '' && substrings[2] == '') {
			return cache[str] = compilePath(substrings[1]);
		}

		var tempVar = false;
		var jsExpr = [];

		for (var i = 0, l = substrings.length; i < l; i++) {
			var substr = substrings[i];

			if (i % 2) {
				var pathJSExpr = pathToJSExpression(substr);

				if (pathJSExpr[1]) {
					tempVar = true;
				}

				jsExpr.push(pathJSExpr[0]);
			} else if (substr) {
				jsExpr.push('\'' + (reEscapableChars.test(substr) ? substr.replace(reEscapableChars, function (chr) {
					return charToRegExpMap[chr];
				}) : substr) + '\'');
			}
		}

		return cache[str] = Function((tempVar ? 'var temp; ' : '') + 'return [' + jsExpr.join(', ') + '].join(\'\');');
	}

	module.exports = compileString;

/***/ },
/* 18 */
/***/ function(module, exports) {

	'use strict';

	var cache = Object.create(null);

	function pathToJSExpression(path) {
		if (cache[path]) {
			return cache[path];
		}

		path = path.split('?');

		var pathLength = path.length;

		if (pathLength == 1) {
			return ['this.' + path[0], false];
		}

		var index = pathLength - 2;
		var jsExpr = Array(index);

		while (index) {
			jsExpr[--index] = ' && (temp = temp' + path[index + 1] + ')';
		}

		return cache[path] = ['(temp = this.' + path[0] + ')' + jsExpr.join('') + ' && temp' + path[pathLength - 1], true];
	}

	module.exports = pathToJSExpression;

/***/ },
/* 19 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var pathToJSExpression = __webpack_require__(18);

	var cache = Object.create(null);

	function compilePath(path) {
		if (cache[path]) {
			return cache[path];
		}

		var pathJSExpr = pathToJSExpression(path);
		return cache[path] = Function((pathJSExpr[1] ? 'var temp; ' : '') + 'return ' + pathJSExpr[0] + ';');
	}

	module.exports = compilePath;

/***/ },
/* 20 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var hyphenize = __webpack_require__(9);

	var hasOwn = Object.prototype.hasOwnProperty;

	function defineAssets(component, assetsConfig) {
		for (var name in assetsConfig) {
			if (hasOwn.call(assetsConfig, name) && name.charAt(0) != ':') {
				component[name] = component.$(assetsConfig[name].selector || '&__' + hyphenize(name));
			}
		}
	}

	module.exports = defineAssets;

/***/ },
/* 21 */
/***/ function(module, exports) {

	'use strict';

	var hasOwn = Object.prototype.hasOwnProperty;

	function listenAssets(component, assetsConfig) {
		for (var name in assetsConfig) {
			if (hasOwn.call(assetsConfig, name)) {
				var asset = void 0;

				if (name == ':component') {
					asset = component;
				} else if (name == ':element') {
					asset = component.element;
				} else {
					asset = component[name];

					if (!asset) {
						throw new TypeError('Asset "' + name + '" is not defined');
					}
				}

				var assetConfig = assetsConfig[name];

				for (var key in assetConfig) {
					if (hasOwn.call(assetConfig, key) && key.length > 3 && key.slice(0, 3) == 'on-') {
						component.listenTo(asset, key.slice(3), assetConfig[key]);
					}
				}
			}
		}
	}

	module.exports = listenAssets;

/***/ },
/* 22 */
/***/ function(module, exports) {

	'use strict';

	module.exports = ['click', 'dblclick', 'mousedown', 'mouseup', 'input', 'change', 'submit', 'focusin', 'focusout'];

/***/ },
/* 23 */
/***/ function(module, exports) {

	'use strict';

	/**
	 * @typesign (evt: cellx~Event|Event);
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

			var component = node.$c;

			if (component) {
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
	}

	module.exports = onEvent;

/***/ },
/* 24 */
/***/ function(module, exports) {

	'use strict';

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

	module.exports = htmlToFragment;

/***/ },
/* 25 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _require = __webpack_require__(2);

	var ObservableList = _require.ObservableList;
	var nextUID = _require.utils.nextUID;
	var _ObservableList$proto = ObservableList.prototype;
	var _registerValue2 = _ObservableList$proto._registerValue;
	var _unregisterValue2 = _ObservableList$proto._unregisterValue;
	var _get = _ObservableList$proto.get;
	var _set = _ObservableList$proto.set;
	var _setRange = _ObservableList$proto.setRange;
	var _add = _ObservableList$proto.add;
	var _addRange2 = _ObservableList$proto._addRange;
	var _insert = _ObservableList$proto.insert;
	var _insertRange = _ObservableList$proto.insertRange;


	var createObject = Object.create;
	var defineProperty = Object.defineProperty;

	/**
	 * @class Rionite.KeyedList
	 * @extends {cellx.ObservableList}
	 *
	 * @typesign new KeyedList(items?: Array|cellx.ObservableList, opts?: {
	 *     adoptsItemChanges?: boolean,
	 *     comparator?: (a, b) -> int,
	 *     sorted?: boolean,
	 *     keyName?: string
	 * }) -> Rionite.KeyedList;
	 */
	var KeyedList = ObservableList.extend({
		constructor: function KeyedList(items, opts) {
			this._itemsByKey = createObject(null);
			this._keyName = opts && opts.keyName || 'id';

			ObservableList.call(this, items, opts);
		},

		/**
	  * @override
	  * @typesign (value: Object);
	  */
		_registerValue: function _registerValue(value) {
			this._itemsByKey[value[this._keyName]] = value;
			_registerValue2.call(this, value);
		},


		/**
	  * @override
	  * @typesign (value: Object);
	  */
		_unregisterValue: function _unregisterValue(value) {
			delete this._itemsByKey[value[this._keyName]];
			_unregisterValue2.call(this, value);
		},


		/**
	  * @typesign (values: Array);
	  */
		_checkValues: function _checkValues(values) {
			for (var i = 0, l = values.length; i < l; i++) {
				this._checkValue(values[i]);
			}
		},


		/**
	  * @typesign (value);
	  */
		_checkValue: function _checkValue(value) {
			if (value !== Object(value)) {
				throw new TypeError('Value must be an object');
			}

			var key = value[this._keyName];

			if (key == null) {
				do {
					key = nextUID();
				} while (this._itemsByKey[key]);

				defineProperty(value, this._keyName, {
					configurable: false,
					enumerable: false,
					writable: false,
					value: key
				});
			} else if (this._itemsByKey[key]) {
				throw new TypeError('Key of value must be unique');
			}
		},


		/**
	  * @override
	  * @typesign (key: int|string) -> *;
	  */
		get: function get(key) {
			return typeof key == 'string' ? this._itemsByKey[key] : _get.call(this, key);
		},


		/**
	  * @override
	  */
		set: function set(index, value) {
			this._checkValue(value);
			return _set.call(this, index, value);
		},


		/**
	  * @override
	  */
		setRange: function setRange(index, values) {
			this._checkValues(values);
			return _setRange.call(this, index, values);
		},


		/**
	  * @override
	  */
		add: function add(item) {
			this._checkValue(item);
			return _add.call(this, item);
		},


		/**
	  * @override
	  */
		_addRange: function _addRange(items) {
			this._checkValues(items);
			_addRange2.call(this, items);
		},


		/**
	  * @override
	  */
		insert: function insert(index, item) {
			this._checkValue(item);
			return _insert.call(this, index, item);
		},


		/**
	  * @override
	  */
		insertRange: function insertRange(index, items) {
			this._checkValues(items);
			return _insertRange.call(this, index, items);
		}
	});

	module.exports = KeyedList;

/***/ },
/* 26 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _require = __webpack_require__(2);

	var _Symbol = _require.js.Symbol;

	var bind = __webpack_require__(15);
	var Component = __webpack_require__(10);
	var templateTagSupported = __webpack_require__(27).templateTagSupported;

	var KEY_TEMPLATES_FIXED = _Symbol('templatesFixed');

	module.exports = Component.extend('rt-content', {
		Static: {
			template: '',

			elementAttributes: {
				select: String
			}
		},

		_rawContent: void 0,

		_onElementAttachedChange: function _onElementAttachedChange(evt) {
			if (evt.value) {
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
						if (!templateTagSupported && !ownerComponentInputContent[KEY_TEMPLATES_FIXED]) {
							var templates = ownerComponentInputContent.querySelectorAll('template');

							for (var i = templates.length; i;) {
								templates[--i].content;
							}

							ownerComponentInputContent[KEY_TEMPLATES_FIXED] = true;
						}

						var selectedElements = ownerComponentInputContent.querySelectorAll(selector);
						var selectedElementCount = selectedElements.length;

						if (selectedElementCount) {
							var rawContent = this._rawContent = document.createDocumentFragment();

							for (var _i = 0; _i < selectedElementCount; _i++) {
								rawContent.appendChild(selectedElements[_i].cloneNode(true));
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

				this._bindings = this._rawContent == props.content ? bind(content, ownerComponent, props.context) : bind(content, ownerComponent.ownerComponent, ownerComponent.props.context);

				el.appendChild(content);
			} else {
				this._destroyBindings();
			}
		}
	});

/***/ },
/* 27 */
/***/ function(module, exports) {

	'use strict';

	var div = document.createElement('div');
	div.innerHTML = '<template>1</template>';

	var template = div.firstChild;

	exports.templateTagSupported = !template.firstChild;

/***/ },
/* 28 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _require = __webpack_require__(2);

	var Cell = _require.Cell;

	var bind = __webpack_require__(15);
	var Component = __webpack_require__(10);
	var pathPattern = __webpack_require__(16);
	var compilePath = __webpack_require__(19);

	var slice = Array.prototype.slice;

	var rePath = RegExp('^\\s*(' + pathPattern + ')\\s*$');

	module.exports = Component.extend('rt-if-then', {
		Static: {
			elementExtends: 'template',

			elementAttributes: {
				if: String
			}
		},

		_if: null,

		_elseMode: false,

		_nodes: null,

		_onElementAttachedChange: function _onElementAttachedChange(evt) {
			var _this = this;

			if (evt.value) {
				if (!this.initialized) {
					(function () {
						var props = _this.props;

						props.content = document.importNode(_this.element.content, true);

						if (!rePath.test(props.if)) {
							throw new SyntaxError('Invalid value of attribute "if"');
						}

						var getState = compilePath(RegExp.$1);

						_this._if = new Cell(_this._elseMode ? function () {
							return !getState.call(this);
						} : function () {
							return !!getState.call(this);
						}, { owner: props.context });

						_this.initialized = true;
					})();
				}

				this._renderElement();

				this._if.on('change', this._onIfChange, this);
			} else {
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
			}
		},
		_onIfChange: function _onIfChange() {
			this._renderElement();
		},
		_renderElement: function _renderElement() {
			if (this._if.get()) {
				var content = this.props.content.cloneNode(true);

				this._nodes = slice.call(content.childNodes);

				this._bindings = bind(content, this.ownerComponent, this.props.context);
				this.element.parentNode.insertBefore(content, this.element.nextSibling);
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

			this.emit('change');
		}
	});

/***/ },
/* 29 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var RtIfThen = __webpack_require__(28);

	module.exports = RtIfThen.extend('rt-if-else', {
		Static: {
			elementExtends: 'template'
		},

		_elseMode: true
	});

/***/ },
/* 30 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

	var _require = __webpack_require__(2);

	var Cell = _require.Cell;
	var Map = _require.js.Map;

	var bind = __webpack_require__(15);
	var Component = __webpack_require__(10);
	var namePattern = __webpack_require__(31);
	var pathPattern = __webpack_require__(16);
	var compilePath = __webpack_require__(19);

	var createObject = Object.create;
	var slice = Array.prototype.slice;

	var reForAttributeValue = RegExp('^\\s*(' + namePattern + ')\\s+of\\s+(' + pathPattern + ')\\s*$');

	module.exports = Component.extend('rt-repeat', {
		Static: {
			elementExtends: 'template',

			elementAttributes: {
				for: String,
				trackBy: String,
				strip: false
			}
		},

		_itemName: void 0,

		_list: null,

		_itemMap: null,
		_oldItemMap: null,

		_trackBy: void 0,

		_rawContent: null,

		_context: null,

		_lastNode: null,

		_onElementAttachedChange: function _onElementAttachedChange(evt) {
			if (evt.value) {
				if (!this.initialized) {
					var props = this.props;
					var rawContent = props.content = document.importNode(this.element.content, true);

					if (props.strip) {
						var firstChild = rawContent.firstChild;
						var lastChild = rawContent.lastChild;

						if (firstChild == lastChild) {
							if (firstChild.nodeType == 3) {
								firstChild.textContent = firstChild.textContent.trim();
							}
						} else {
							if (firstChild.nodeType == 3) {
								if (!(firstChild.textContent = firstChild.textContent.replace(/^\s+/, ''))) {
									rawContent.removeChild(firstChild);
								}
							}
							if (lastChild.nodeType == 3) {
								if (!(lastChild.textContent = lastChild.textContent.replace(/\s+$/, ''))) {
									rawContent.removeChild(lastChild);
								}
							}
						}
					}

					var forAttrValue = props.for.match(reForAttributeValue);

					if (!forAttrValue) {
						throw new SyntaxError('Invalid value of attribute "for"');
					}

					this._itemName = forAttrValue[1];

					this._list = new Cell(compilePath(forAttrValue[2]), { owner: props.context });

					this._itemMap = new Map();

					this._trackBy = props.trackBy;

					this._rawContent = rawContent;

					this._context = props.context;

					this.initialized = true;
				}

				this._renderElement();

				this._list.on('change', this._onListChange, this);
			} else {
				this._clearItemMap(this._itemMap);
				this._list.off('change', this._onListChange, this);
			}
		},
		_onListChange: function _onListChange() {
			this._renderElement();
		},
		_renderElement: function _renderElement() {
			var _this = this;

			var oldItemMap = this._oldItemMap = this._itemMap;
			this._itemMap = new Map();

			var list = this._list.get();
			var changed = void 0;

			if (list) {
				this._lastNode = this.element;
				changed = list.reduce(function (changed, item, index) {
					return _this._renderListItem(item, index) || changed;
				}, false);
			}

			if (oldItemMap.size) {
				this._clearItemMap(oldItemMap);
			} else if (!changed) {
				return;
			}

			this.emit('change');
		},
		_renderListItem: function _renderListItem(item, index) {
			var _createObject;

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

					var _lastNode = df.lastChild;
					this._lastNode.parentNode.insertBefore(df, this._lastNode.nextSibling);
					this._lastNode = _lastNode;
				}

				return true;
			}

			item = new Cell(item);
			index = new Cell(index);

			var content = this._rawContent.cloneNode(true);
			var context = createObject(this._context, (_createObject = {}, _defineProperty(_createObject, this._itemName, {
				get: function get() {
					return item.get();
				}
			}), _defineProperty(_createObject, '$index', {
				get: function get() {
					return index.get();
				}
			}), _createObject));

			var newItem = {
				item: item,
				index: index,
				nodes: slice.call(content.childNodes),
				bindings: bind(content, this.ownerComponent, context)
			};

			if (currentItems) {
				currentItems.push(newItem);
			} else {
				this._itemMap.set(trackingValue, [newItem]);
			}

			var lastNode = content.lastChild;
			this._lastNode.parentNode.insertBefore(content, this._lastNode.nextSibling);
			this._lastNode = lastNode;

			return true;
		},
		_clearItemMap: function _clearItemMap(itemMap) {
			itemMap.forEach(this._clearItems, this);
			itemMap.clear();
		},
		_clearItems: function _clearItems(items) {
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

/***/ },
/* 31 */
/***/ function(module, exports) {

	'use strict';

	module.exports = '[$_a-zA-Z][$\\w]*';

/***/ }
/******/ ])
});
;