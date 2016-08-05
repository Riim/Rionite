(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory(require("cellx"));
	else if(typeof define === 'function' && define.amd)
		define(["cellx"], factory);
	else if(typeof exports === 'object')
		exports["rionite"] = factory(require("cellx"));
	else
		root["rionite"] = factory(root["cellx"]);
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

	var IndexedList = __webpack_require__(1);
	var DisposableMixin = __webpack_require__(3);
	var ElementAttributes = __webpack_require__(4);
	var Component = __webpack_require__(11);
	var registerComponent = __webpack_require__(12);
	var formatters = __webpack_require__(24);
	var getText = __webpack_require__(25);
	var Template = __webpack_require__(32);
	var RtContent = __webpack_require__(33);
	var RtIfThen = __webpack_require__(35);
	var RtIfElse = __webpack_require__(36);
	var RtRepeat = __webpack_require__(37);
	var camelize = __webpack_require__(9);
	var hyphenize = __webpack_require__(10);
	var escapeString = __webpack_require__(26);
	var escapeHTML = __webpack_require__(6);
	var unescapeHTML = __webpack_require__(7);
	var isRegExp = __webpack_require__(8);
	var defer = __webpack_require__(15);
	var htmlToFragment = __webpack_require__(31);

	var Rionite = module.exports = {
		IndexedList: IndexedList,
		DisposableMixin: DisposableMixin,
		ElementAttributes: ElementAttributes,
		Component: Component,
		registerComponent: registerComponent,

		formatters: formatters,

		getText: getText,

		Template: Template,
		template: function template(tmpl) {
			return new Template(tmpl);
		},


		components: {
			RtContent: RtContent,
			RtIfThen: RtIfThen,
			RtIfElse: RtIfElse,
			RtRepeat: RtRepeat
		},

		utils: {
			camelize: camelize,
			hyphenize: hyphenize,
			escapeString: escapeString,
			escapeHTML: escapeHTML,
			unescapeHTML: unescapeHTML,
			isRegExp: isRegExp,
			defer: defer,
			htmlToFragment: htmlToFragment
		}
	};
	Rionite.Rionite = Rionite; // for destructuring

/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _require = __webpack_require__(2);

	var ObservableList = _require.ObservableList;
	var nextUID = _require.utils.nextUID;
	var _ObservableList$proto = ObservableList.prototype;
	var _registerValue2 = _ObservableList$proto._registerValue;
	var _unregisterValue2 = _ObservableList$proto._unregisterValue;
	var _get = _ObservableList$proto.get;

	/**
	 * @class Rionite.IndexedList
	 * @extends {cellx.ObservableList}
	 *
	 * @typesign new IndexedList(items?: Array|cellx.ObservableList, opts?: {
	 *     adoptsItemChanges?: boolean,
	 *     comparator?: (a, b) -> int,
	 *     sorted?: boolean,
	 *     keyIndexes?: Array<string|{ keyName: string, keyGenerator?: () -> string }>
	 * }) -> Rionite.IndexedList;
	 */

	var IndexedList = ObservableList.extend({
		constructor: function IndexedList(items, opts) {
			this._keyIndexesConfig = opts && opts.keyIndexes ? opts.keyIndexes.map(function (keyIndexConfig) {
				return typeof keyIndexConfig == 'string' ? { keyName: keyIndexConfig } : keyIndexConfig;
			}) : [{ keyName: 'id', keyGenerator: nextUID }];

			this._keyIndexes = Object.create(null);

			ObservableList.call(this, items, opts);
		},

		/**
	  * @override
	  */
		_registerValue: function _registerValue(value) {
			if (value === Object(value)) {
				var keyIndexesConfig = this._keyIndexesConfig;
				var keyIndexes = this._keyIndexes;

				for (var i = keyIndexesConfig.length; i;) {
					var keyIndexConfig = keyIndexesConfig[--i];
					var keyName = keyIndexConfig.keyName;
					var keyIndex = keyIndexes[keyName] || (keyIndexes[keyName] = Object.create(null));
					var key = value[keyName];

					if (key == null) {
						var keyGenerator = keyIndexConfig.keyGenerator;

						if (keyGenerator) {
							do {
								key = keyGenerator();
							} while (keyIndex[key]);

							Object.defineProperty(value, keyName, {
								configurable: false,
								enumerable: false,
								writable: false,
								value: key
							});
						}
					}

					if (key != null) {
						(keyIndex[key] || (keyIndex[key] = [])).push(value);
					}
				}
			}

			_registerValue2.call(this, value);
		},


		/**
	  * @override
	  */
		_unregisterValue: function _unregisterValue(value) {
			if (value === Object(value)) {
				var keyIndexesConfig = this._keyIndexesConfig;
				var keyIndexes = this._keyIndexes;

				for (var i = keyIndexesConfig.length; i;) {
					var keyName = keyIndexesConfig[--i].keyName;
					var key = value[keyName];

					if (key != null) {
						var keyIndex = keyIndexes[keyName];
						var items = keyIndex[key];

						items.pop();

						if (!items.length) {
							delete keyIndex[key];
						}
					}
				}
			}

			_unregisterValue2.call(this, value);
		},


		/**
	  * @override
	  * @typesign (index: int) -> *;
	  * @typesign (key: string, keyName?: string) -> *;
	  */
		get: function get(key, keyName) {
			if (keyName !== void 0) {
				var keyIndex = this._keyIndexes[keyName];

				if (!keyIndex) {
					return void 0;
				}

				var items = keyIndex[key];
				return items && items[items.length - 1];
			}

			return _get.call(this, key);
		}
	});

	module.exports = IndexedList;

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
	var nextUID = _require.utils.nextUID;


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
/* 4 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj; };

	var _require = __webpack_require__(2);

	var EventEmitter = _require.EventEmitter;
	var Cell = _require.Cell;

	var attributeTypeHandlers = __webpack_require__(5);
	var camelize = __webpack_require__(9);
	var hyphenize = __webpack_require__(10);

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

	module.exports = ElementAttributes;

/***/ },
/* 5 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _require = __webpack_require__(2);

	var Map = _require.js.Map;

	var escapeHTML = __webpack_require__(6);
	var unescapeHTML = __webpack_require__(7);
	var isRegExp = __webpack_require__(8);

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
/* 6 */
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
/* 7 */
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
/* 8 */
/***/ function(module, exports) {

	'use strict';

	var toString = Object.prototype.toString;

	function isRegExp(value) {
		return toString.call(value) == '[object RegExp]';
	}

	module.exports = isRegExp;

/***/ },
/* 9 */
/***/ function(module, exports) {

	"use strict";

	var reHyphen = /[-_]+([a-z]|$)/g;

	var cache = Object.create(null);

	function camelize(str) {
		return cache[str] || (cache[str] = str.replace(reHyphen, function (match, chr) {
			return chr.toUpperCase();
		}));
	}

	module.exports = camelize;

/***/ },
/* 10 */
/***/ function(module, exports) {

	'use strict';

	var reHump = /-?([A-Z])([^A-Z])/g;
	var reLongHump = /-?([A-Z]+)/g;
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
/* 11 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _require = __webpack_require__(2);

	var EventEmitter = _require.EventEmitter;
	var Cell = _require.Cell;
	var _Symbol = _require.js.Symbol;
	var createClass = _require.utils.createClass;

	var DisposableMixin = __webpack_require__(3);
	var ElementAttributes = __webpack_require__(4);
	var registerComponent = __webpack_require__(12);
	var bind = __webpack_require__(16);
	var defineAssets = __webpack_require__(27);
	var listenAssets = __webpack_require__(28);
	var eventTypes = __webpack_require__(29);
	var onEvent = __webpack_require__(30);
	var camelize = __webpack_require__(9);
	var defer = __webpack_require__(15);
	var htmlToFragment = __webpack_require__(31);

	var map = Array.prototype.map;

	var KEY_RAW_CONTENT = _Symbol('rawContent');
	var KEY_BLOCK_NAME_IN_MARKUP = _Symbol('blockNameInMarkup');

	var reClosedCustomElementTag = /<(\w+(?:-\w+)+)([^>]*)\/>/g;

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
					if (props.content || props.context) {
						throw new TypeError('It is not necessary to declare property "' + (props.content ? 'content' : 'context') + '"');
					}

					Static.elementAttributes = props;
				} else if (Static.elementAttributes) {
					Static.props = Static.elementAttributes;
				}

				return registerComponent(createClass(description));
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

		_elementAttached: null,

		initialized: false,
		isReady: false,

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

			Object.defineProperty(el, '$c', { value: this });

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

							rawContent = constr[KEY_RAW_CONTENT] = htmlToFragment((typeof template == 'string' ? template : template.render(constr)).replace(reClosedCustomElementTag, '<$1$2></$1>'));
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
								_this.assets = Object.create(null);
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

	module.exports = Component;

	document.addEventListener('DOMContentLoaded', function onDOMContentLoaded() {
		document.removeEventListener('DOMContentLoaded', onDOMContentLoaded);

		eventTypes.forEach(function (type) {
			document.addEventListener(type, onEvent);
		});
	});

/***/ },
/* 12 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _require = __webpack_require__(2);

	var mixin = _require.utils.mixin;

	var elementConstructorMap = __webpack_require__(13);
	var ElementProtoMixin = __webpack_require__(14);

	var hasOwn = Object.prototype.hasOwnProperty;

	var inheritedStaticProperties = ['elementExtends', 'elementAttributes', 'props', 'i18n', 'template', 'assets'];

	function registerComponent(componentConstr) {
		var elementIs = componentConstr.elementIs;

		if (!elementIs) {
			throw new TypeError('Static property "elementIs" is required');
		}

		var parentComponentConstr = void 0;

		inheritedStaticProperties.forEach(function (name) {
			if (!hasOwn.call(componentConstr, name)) {
				componentConstr[name] = (parentComponentConstr || (parentComponentConstr = Object.getPrototypeOf(componentConstr.prototype).constructor))[name];
			}
		});

		var elementExtends = componentConstr.elementExtends;
		var parentElementConstr = elementExtends ? elementConstructorMap[elementExtends] || window['HTML' + (elementExtends.charAt(0).toUpperCase() + elementExtends.slice(1)) + 'Element'] : HTMLElement;
		var elementProto = Object.create(parentElementConstr.prototype);

		mixin(elementProto, ElementProtoMixin);
		elementProto._rioniteComponentConstructor = componentConstr;

		elementConstructorMap[elementIs] = document.registerElement(elementIs, elementExtends ? { extends: elementExtends, prototype: elementProto } : { prototype: elementProto });

		return componentConstr;
	}

	module.exports = registerComponent;

/***/ },
/* 13 */
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
/* 14 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _require = __webpack_require__(2);

	var nextTick = _require.utils.nextTick;

	var defer = __webpack_require__(15);

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
/* 15 */
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
/* 16 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _require = __webpack_require__(2);

	var Cell = _require.Cell;

	var ContentNodeType = __webpack_require__(17);
	var parseContent = __webpack_require__(18);
	var compileContent = __webpack_require__(21);

	var reBinding = /{[^}]+}/;

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

								if (reBinding.test(value)) {
									var parsedValue = parseContent(value);

									if (parsedValue.length > 1 || parsedValue[0].type == ContentNodeType.BINDING) {
										(function () {
											var name = attr.name;
											var cell = new Cell(compileContent(parsedValue, value), {
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

							if (reBinding.test(content)) {
								var parsedContent = parseContent(content);

								if (parsedContent.length > 1 || parsedContent[0].type == ContentNodeType.BINDING) {
									var _cell = new Cell(compileContent(parsedContent, content), {
										owner: context,
										onChange: function onChange(evt) {
											child.textContent = evt.value;
										}
									});

									child.textContent = _cell.get();

									bindings.push(_cell);
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

		return bindings.length ? bindings : null;
	}

	module.exports = bind;

/***/ },
/* 17 */
/***/ function(module, exports) {

	"use strict";

	module.exports = {
		TEXT: 0,
		KEYPATH: 1,
		BINDING: 2,
		BINDING_FORMATTER: 3,
		BINDING_FORMATTER_ARGUMENTS: 4,
		BINDING_FORMATTER_ARGUMENT: 5
	};

/***/ },
/* 18 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var namePattern = __webpack_require__(19);
	var keypathPattern = __webpack_require__(20);
	var ContentNodeType = __webpack_require__(17);

	var reNameOrEmpty = RegExp(namePattern + '|', 'g');
	var reKeypathOrEmpty = RegExp(keypathPattern + '|', 'g');
	var reBooleanOrEmpty = /false|true|/g;
	var reDecimalOrEmpty = /-?(?:\s*(?:(?:0|[1-9]\d*)(?:\.\d+)?|\.\d+)(?:[eE][+-]?\d+)?|Infinity|NaN)|/g;
	var reVacuumOrEmpty = /null|undefined|void 0|/g;

	var NOT_VALUE = {};

	function parseContent(content) {
		var at = 0;
		var chr = content[0];

		var result = [];

		for (var index; (index = content.indexOf('{', at)) > -1;) {
			pushText(content.slice(at, index));
			at = index;
			chr = content[at];

			var binding = readBinding();

			if (binding) {
				result.push(binding);
			} else {
				pushText(chr);
				next('{');
			}
		}

		pushText(content.slice(at));

		return result;

		function next(c) {
			if (c && c != chr) {
				throw {
					name: 'SyntaxError',
					message: 'Expected "' + c + '" instead of "' + chr + '"',
					at: at,
					content: content
				};
			}

			chr = content[++at];
			return chr;
		}

		function pushText(value) {
			if (value.length) {
				var resultLength = result.length;

				if (resultLength && result[resultLength - 1].type == ContentNodeType.TEXT) {
					result[resultLength - 1].value = result[resultLength - 1].raw += value;
				} else {
					result.push({
						type: ContentNodeType.TEXT,
						at: at,
						raw: value,
						value: value
					});
				}
			}
		}

		function readBinding() {
			var bindingAt = at;

			next('{');
			skipWhitespaces();

			var keypath = readKeypath();

			if (keypath) {
				skipWhitespaces();

				var formatters = [];

				for (var formatter; chr == '|' && (formatter = readFormatter());) {
					formatters.push(formatter);
					skipWhitespaces();
				}

				if (chr == '}') {
					next();

					return {
						type: ContentNodeType.BINDING,
						at: bindingAt,
						raw: content.slice(bindingAt, at),
						keypath: keypath,
						formatters: formatters
					};
				}
			}

			at = bindingAt;
			chr = content[at];

			return null;
		}

		function readKeypath() {
			reKeypathOrEmpty.lastIndex = at;
			var keypath = reKeypathOrEmpty.exec(content)[0];

			if (keypath) {
				var keypathAt = at;

				at += keypath.length;
				chr = content[at];

				return {
					type: ContentNodeType.KEYPATH,
					at: keypathAt,
					raw: content.slice(keypathAt, at),
					value: keypath
				};
			}

			return null;
		}

		function readFormatter() {
			var formatterAt = at;

			next('|');
			skipWhitespaces();

			reNameOrEmpty.lastIndex = at;
			var name = reNameOrEmpty.exec(content)[0];

			if (name) {
				at += name.length;
				chr = content[at];

				var args = chr == '(' ? readFormatterArguments() : null;

				return {
					type: ContentNodeType.BINDING_FORMATTER,
					at: formatterAt,
					raw: content.slice(formatterAt, at),
					name: name,
					arguments: args
				};
			}

			at = formatterAt;
			chr = content[at];

			return null;
		}

		function readFormatterArguments() {
			var formatterArgumentsAt = at;

			next('(');
			skipWhitespaces();

			var args = [];

			if (chr != ')') {
				for (;;) {
					var arg = readValue();

					if (arg !== NOT_VALUE) {
						skipWhitespaces();

						if (chr == ',' || chr == ')') {
							args.push(arg);

							if (chr == ',') {
								next();
								skipWhitespaces();
								continue;
							}

							break;
						}
					}

					at = formatterArgumentsAt;
					chr = content[at];
					return null;
				}
			}

			next();

			return {
				type: ContentNodeType.BINDING_FORMATTER_ARGUMENTS,
				at: formatterArgumentsAt,
				raw: content.slice(formatterArgumentsAt, at),
				value: args
			};
		}

		function readValue() {
			switch (chr) {
				case '{':
					{
						return readObject();
					}
				case '[':
					{
						return readArray();
					}
				case "'":
				case '"':
					{
						return readString();
					}
			}

			var readers = [readBoolean, readDecimal, readVacuum];

			for (var i = 0, l = readers.length; i < l; i++) {
				var value = readers[i]();

				if (value !== NOT_VALUE) {
					return value;
				}
			}

			return NOT_VALUE;
		}

		function readObject() {
			var objectAt = at;

			next('{');
			skipWhitespaces();

			var obj = {};

			if (chr != '}') {
				for (;;) {
					var key = chr == "'" || chr == '"' ? readString() : readObjectKey();

					if (key !== null && key !== NOT_VALUE) {
						skipWhitespaces();

						if (chr == ':') {
							next();
							skipWhitespaces();

							var value = readValue();

							if (value !== NOT_VALUE) {
								skipWhitespaces();

								if (chr == ',' || chr == '}') {
									obj[key] = value;

									if (chr == ',') {
										next();
										skipWhitespaces();
										continue;
									}

									break;
								}
							}
						}
					}

					at = objectAt;
					chr = content[at];
					return NOT_VALUE;
				}
			}

			next();

			return obj;
		}

		function readObjectKey() {
			reNameOrEmpty.lastIndex = at;
			var key = reNameOrEmpty.exec(content)[0];

			if (key != '') {
				at += key.length;
				chr = content[at];
				return key;
			}

			return null;
		}

		function readArray() {
			var arrayAt = at;

			next('[');
			skipWhitespaces();

			var arr = [];

			if (chr != ']') {
				for (;;) {
					var value = readValue();

					if (value !== NOT_VALUE) {
						skipWhitespaces();

						if (chr == ',' || chr == ']') {
							arr.push(value);

							if (chr == ',') {
								next();
								skipWhitespaces();
								continue;
							}

							break;
						}
					}

					at = arrayAt;
					chr = content[at];
					return NOT_VALUE;
				}
			}

			next();

			return arr;
		}

		function readBoolean() {
			reBooleanOrEmpty.lastIndex = at;
			var bool = reBooleanOrEmpty.exec(content)[0];

			if (bool != '') {
				at += bool.length;
				chr = content[at];
				return bool == 'true';
			}

			return NOT_VALUE;
		}

		function readDecimal() {
			reDecimalOrEmpty.lastIndex = at;
			var decimal = reDecimalOrEmpty.exec(content)[0];

			if (decimal != '') {
				at += decimal.length;
				chr = content[at];
				return +decimal;
			}

			return NOT_VALUE;
		}

		function readString() {
			if (chr != "'" && chr != '"') {
				next("'");
			}

			var stringAt = at;
			var quote = chr;
			var str = '';

			while (next()) {
				if (chr == quote) {
					next();
					return str;
				}

				if (chr == '\\') {
					str += chr + (next() || '');
				} else {
					if (chr == '\r' || chr == '\n') {
						at = stringAt;
						chr = content[at];
						return NOT_VALUE;
					}

					str += chr;
				}
			}
		}

		function readVacuum() {
			reVacuumOrEmpty.lastIndex = at;
			var vacuum = reVacuumOrEmpty.exec(content)[0];

			if (vacuum != '') {
				at += vacuum.length;
				chr = content[at];
				return vacuum == 'null' ? null : void 0;
			}

			return NOT_VALUE;
		}

		function skipWhitespaces() {
			while (chr && chr <= ' ') {
				next();
			}
		}
	}

	module.exports = parseContent;

/***/ },
/* 19 */
/***/ function(module, exports) {

	'use strict';

	module.exports = '[$_a-zA-Z][$\\w]*';

/***/ },
/* 20 */
/***/ function(module, exports) {

	'use strict';

	module.exports = '[$\\w]+(?:\\??\\.[$\\w]+)*';

/***/ },
/* 21 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj; };

	var bindingToJSExpression = __webpack_require__(22);
	var ContentNodeType = __webpack_require__(17);
	var compileBinding = __webpack_require__(23);
	var formatters = __webpack_require__(24);
	var escapeString = __webpack_require__(26);

	var cache = Object.create(null);

	function compileContent(parsedContent, content) {
		if (cache[content]) {
			return cache[content];
		}

		if (parsedContent.length == 1) {
			var node = parsedContent[0];

			if (node.type == ContentNodeType.BINDING) {
				return cache[content] = compileBinding(node);
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
					v: cache[content] = function () {
						return inner.call(this, formatters);
					}
				};
			}();

			if ((typeof _ret === 'undefined' ? 'undefined' : _typeof(_ret)) === "object") return _ret.v;
		}

		return cache[content] = Function(jsExpr);
	}

	module.exports = compileContent;

/***/ },
/* 22 */
/***/ function(module, exports) {

	'use strict';

	var cache = Object.create(null);

	function formattersReducer(jsExpr, formatter) {
		var args = formatter.arguments;

		return '(this[\'' + formatter.name + '\'] || formatters[\'' + formatter.name + '\']).call(this, ' + jsExpr + (args && args.value.length ? ', ' + args.raw.slice(1, -1) : '') + ')';
	}

	function bindingToJSExpression(binding) {
		var bindingRaw = binding.raw;

		if (cache[bindingRaw]) {
			return cache[bindingRaw];
		}

		var keypath = binding.keypath.value.split('?');
		var formatters = binding.formatters;

		var keypathLength = keypath.length;

		if (keypathLength == 1) {
			if (formatters.length) {
				return cache[bindingRaw] = {
					value: formatters.reduce(formattersReducer, 'this.' + keypath[0]),
					usesFormatters: true,
					usesTempVariable: false
				};
			}

			return cache[bindingRaw] = {
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
			return cache[bindingRaw] = {
				value: '(temp = this.' + keypath[0] + ')' + jsExpr.join('') + ' && ' + formatters.reduce(formattersReducer, 'temp' + keypath[keypathLength - 1]),
				usesFormatters: true,
				usesTempVariable: true
			};
		}

		return cache[bindingRaw] = {
			value: '(temp = this.' + keypath[0] + ')' + jsExpr.join('') + ' && temp' + keypath[keypathLength - 1],
			usesFormatters: false,
			usesTempVariable: true
		};
	}

	module.exports = bindingToJSExpression;

/***/ },
/* 23 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj; };

	var bindingToJSExpression = __webpack_require__(22);
	var formatters = __webpack_require__(24);

	var cache = Object.create(null);

	function compileBinding(binding) {
		var bindingRaw = binding.raw;

		if (cache[bindingRaw]) {
			return cache[bindingRaw];
		}

		var bindingJSExpr = bindingToJSExpression(binding);
		var jsExpr = (bindingJSExpr.usesTempVariable ? 'var temp; ' : '') + 'return ' + bindingJSExpr.value + ';';

		if (bindingJSExpr.usesFormatters) {
			var _ret = function () {
				var inner = Function('formatters', jsExpr);

				return {
					v: cache[bindingRaw] = function () {
						return inner.call(this, formatters);
					}
				};
			}();

			if ((typeof _ret === 'undefined' ? 'undefined' : _typeof(_ret)) === "object") return _ret.v;
		}

		return cache[bindingRaw] = Function(jsExpr);
	}

	module.exports = compileBinding;

/***/ },
/* 24 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var getText = __webpack_require__(25);

	var formatters = Object.create(null);
	formatters.t = getText.t;
	formatters.pt = getText.pt;
	formatters.nt = getText.nt;
	formatters.npt = getText.npt;

	module.exports = formatters;

/***/ },
/* 25 */
/***/ function(module, exports) {

	'use strict';

	var hasOwn = Object.prototype.hasOwnProperty;
	var slice = Array.prototype.slice;

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

	module.exports = getText;

/***/ },
/* 26 */
/***/ function(module, exports) {

	'use strict';

	var reEscapableChars = /[\\'\r\n]/g;
	var charToSpecialMap = Object.create(null);

	charToSpecialMap['\\'] = '\\\\';
	charToSpecialMap['\''] = '\\\'';
	charToSpecialMap['\r'] = '\\r';
	charToSpecialMap['\n'] = '\\n';

	function escapeString(str) {
		return reEscapableChars.test(str) ? str.replace(reEscapableChars, function (chr) {
			return charToSpecialMap[chr];
		}) : str;
	}

	module.exports = escapeString;

/***/ },
/* 27 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var hyphenize = __webpack_require__(10);

	var hasOwn = Object.prototype.hasOwnProperty;

	function defineAssets(component, assetsConfig) {
		var assets = component.assets;

		for (var name in assetsConfig) {
			if (hasOwn.call(assetsConfig, name) && name.charAt(0) != ':') {
				assets[name] = component.$(assetsConfig[name].selector || '&__' + hyphenize(name));
			}
		}
	}

	module.exports = defineAssets;

/***/ },
/* 28 */
/***/ function(module, exports) {

	'use strict';

	var hasOwn = Object.prototype.hasOwnProperty;

	function listenAssets(component, assetsConfig) {
		var assets = component.assets;

		for (var name in assetsConfig) {
			if (hasOwn.call(assetsConfig, name)) {
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
					if (hasOwn.call(assetConfig, key) && key.length > 3 && key.slice(0, 3) == 'on-') {
						component.listenTo(asset, key.slice(3), assetConfig[key]);
					}
				}
			}
		}
	}

	module.exports = listenAssets;

/***/ },
/* 29 */
/***/ function(module, exports) {

	'use strict';

	module.exports = ['click', 'dblclick', 'mousedown', 'mouseup', 'input', 'change', 'submit', 'focusin', 'focusout'];

/***/ },
/* 30 */
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
						if (handler.call(component, evt, target) === false) {
							evt.isPropagationStopped = true;
						}

						if (evt.isPropagationStopped) {
							return;
						}
					}
				}
			}
		}
	}

	module.exports = onEvent;

/***/ },
/* 31 */
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
/* 32 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var namePattern = __webpack_require__(19);
	var escapeString = __webpack_require__(26);
	var escapeHTML = __webpack_require__(6);

	var keypathPattern = '[$\\w]+(?:\\.[$\\w]+)*';
	var re = RegExp('{{' + '(?:' + '\\s*(?:' + ('block\\s+(' + namePattern + ')|(\\/)block|(s)uper\\(\\)|(' + keypathPattern + ')') + (')\\s*|{\\s*(' + keypathPattern + ')\\s*}') + ')' + '}}');

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

	module.exports = Template;

/***/ },
/* 33 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _require = __webpack_require__(2);

	var _Symbol = _require.js.Symbol;

	var bind = __webpack_require__(16);
	var Component = __webpack_require__(11);
	var templateTagSupported = __webpack_require__(34).templateTagSupported;

	var KEY_TEMPLATES_FIXED = _Symbol('templatesFixed');

	module.exports = Component.extend('rt-content', {
		Static: {
			elementAttributes: {
				select: String,
				getContext: String
			},

			template: ''
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
				var getContext = props.getContext;

				this._bindings = this._rawContent == props.content ? bind(content, ownerComponent, getContext ? ownerComponent[getContext](this, props.context) : props.context) : bind(content, ownerComponent.ownerComponent, getContext ? ownerComponent[getContext](this, ownerComponent.props.context) : ownerComponent.props.context);

				el.appendChild(content);
			} else {
				this._destroyBindings();
			}
		}
	});

/***/ },
/* 34 */
/***/ function(module, exports) {

	'use strict';

	var div = document.createElement('div');
	div.innerHTML = '<template>1</template>';

	var template = div.firstChild;

	exports.templateTagSupported = !template.firstChild;

/***/ },
/* 35 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _require = __webpack_require__(2);

	var Cell = _require.Cell;
	var nextTick = _require.utils.nextTick;

	var ContentNodeType = __webpack_require__(17);
	var parseContent = __webpack_require__(18);
	var compileBinding = __webpack_require__(23);
	var bind = __webpack_require__(16);
	var Component = __webpack_require__(11);

	var slice = Array.prototype.slice;

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

						var parsedIf = parseContent('{' + props.if + '}');

						if (parsedIf.length > 1 || parsedIf[0].type != ContentNodeType.BINDING) {
							throw new SyntaxError('Invalid value of attribute "if"');
						}

						var getState = compileBinding(parsedIf[0]);

						_this._if = new Cell(_this._elseMode ? function () {
							return !getState.call(this);
						} : function () {
							return !!getState.call(this);
						}, { owner: props.context });

						_this.initialized = true;
					})();
				}

				this._render();

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
			this._render();
		},
		_render: function _render() {
			var _this2 = this;

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

			nextTick(function () {
				_this2.emit('change');
			});
		}
	});

/***/ },
/* 36 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var RtIfThen = __webpack_require__(35);

	module.exports = RtIfThen.extend('rt-if-else', {
		Static: {
			elementExtends: 'template'
		},

		_elseMode: true
	});

/***/ },
/* 37 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

	var _require = __webpack_require__(2);

	var Cell = _require.Cell;
	var Map = _require.js.Map;
	var nextTick = _require.utils.nextTick;

	var namePattern = __webpack_require__(19);
	var ContentNodeType = __webpack_require__(17);
	var parseContent = __webpack_require__(18);
	var compileBinding = __webpack_require__(23);
	var bind = __webpack_require__(16);
	var Component = __webpack_require__(11);

	var slice = Array.prototype.slice;

	var reForAttributeValue = RegExp('^\\s*(' + namePattern + ')\\s+of\\s+(\\S.*)$');
	var invalidAttributeForMessage = 'Invalid value of attribute "for"';

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

		_lastNode: null,

		_rawContent: null,

		_context: null,

		_onElementAttachedChange: function _onElementAttachedChange(evt) {
			if (evt.value) {
				if (!this.initialized) {
					var props = this.props;
					var forAttrValue = props.for.match(reForAttributeValue);

					if (!forAttrValue) {
						throw new SyntaxError(invalidAttributeForMessage);
					}

					var parsedOf = parseContent('{' + forAttrValue[2] + '}');

					if (parsedOf.length > 1 || parsedOf[0].type != ContentNodeType.BINDING) {
						throw new SyntaxError(invalidAttributeForMessage);
					}

					this._itemName = forAttrValue[1];

					this._list = new Cell(compileBinding(parsedOf[0]), { owner: props.context });

					this._itemMap = new Map();

					this._trackBy = props.trackBy;

					var rawContent = this._rawContent = document.importNode(this.element.content, true);

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

					this._context = props.context;

					this.initialized = true;
				}

				this._render();

				this._list.on('change', this._onListChange, this);
			} else {
				this._clearItemMap(this._itemMap);
				this._list.off('change', this._onListChange, this);
			}
		},
		_onListChange: function _onListChange() {
			this._render();
		},
		_render: function _render() {
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

			nextTick(function () {
				_this.emit('change');
			});
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

					var _lastNode = df.lastChild;
					this._lastNode.parentNode.insertBefore(df, this._lastNode.nextSibling);
					this._lastNode = _lastNode;
				}

				return true;
			}

			item = new Cell(item);
			index = new Cell(index);

			var content = this._rawContent.cloneNode(true);
			var context = Object.create(this._context, (_Object$create = {}, _defineProperty(_Object$create, this._itemName, {
				get: function get() {
					return item.get();
				}
			}), _defineProperty(_Object$create, '$index', {
				get: function get() {
					return index.get();
				}
			}), _Object$create));

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

/***/ }
/******/ ])
});
;