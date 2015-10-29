(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define([], factory);
	else if(typeof exports === 'object')
		exports["rista"] = factory();
	else
		root["rista"] = factory();
})(this, function() {
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

	var map = _require.map;
	var list = _require.list;
	var cellx = _require.cellx;
	var d = _require.d;
	var utils = _require.utils;

	var settings = __webpack_require__(2);
	var observeDOM = __webpack_require__(3);
	var View = __webpack_require__(5);

	var _require2 = __webpack_require__(8);

	var initViews = _require2.initViews;
	var destroyViews = _require2.destroyViews;
	var KEY_VIEW = View.KEY_VIEW;
	var defineView = View.define;

	var inited = false;

	/**
	 * @typesign (name: string, description: {
	 *     render?: (): string,
	 *     init?: (),
	 *     dispose?: ()
	 * });
	 */
	function view(name, description) {
		defineView(name, description);

		if (inited) {
			initViews(document.documentElement);
		}
	}

	var rista = {
		map: map,
		list: list,
		cellx: cellx,
		d: d,
		utils: utils,
		settings: settings,
		View: View,
		view: view
	};
	rista.rista = rista; // for destructuring

	var eventTypes = ['click', 'dblclick', 'mousedown', 'mouseup', 'mouseover', 'mousemove', 'mouseout', 'dragstart', 'drag', 'dragenter', 'dragleave', 'dragover', 'drop', 'dragend', 'keydown', 'keypress', 'keyup', 'abort', 'error', 'resize', 'select', 'change', 'submit', 'reset', 'focusin', 'focusout'];

	function onDocumentEvent(evt) {
		var node = evt.target;
		var attrName = 'rt-' + evt.type;
		var targets = [];

		while (true) {
			if (node.nodeType == 1 && node.hasAttribute(attrName)) {
				targets.push(node);
			}

			node = node.parentNode;

			if (!node) {
				break;
			}

			if (node[KEY_VIEW]) {
				var _view = node[KEY_VIEW];

				for (var i = 0, l = targets.length; i < l; i++) {
					var target = targets[i];
					var handler = _view[target.getAttribute(attrName)];

					if (handler) {
						handler.call(_view, evt, target);
					}
				}

				break;
			}
		}
	}

	document.addEventListener('DOMContentLoaded', function onDOMContentLoaded() {
		document.removeEventListener('DOMContentLoaded', onDOMContentLoaded);

		utils.nextTick(function () {
			eventTypes.forEach(function (type) {
				document.addEventListener(type, onDocumentEvent);
			});

			observeDOM(function (removedNodes, addedNodes) {
				for (var i = 0, l = removedNodes.length; i < l; i++) {
					var removedNode = removedNodes[i];

					if (removedNode.nodeType == 1) {
						destroyViews(removedNode);
					}
				}

				for (var i = 0, l = addedNodes.length; i < l; i++) {
					var addedNode = addedNodes[i];

					if (addedNode.nodeType == 1) {
						initViews(addedNode);
					}
				}
			});

			initViews(document.documentElement);

			inited = true;
		});
	});

	module.exports = rista;

/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	(function(undefined) {
		'use strict';

		var hasOwn = Object.prototype.hasOwnProperty;
		var toString = Object.prototype.toString;
		var push = Array.prototype.push;
		var slice = Array.prototype.slice;
		var splice = Array.prototype.splice;

		var global = Function('return this;')();

		var invokeCell;

		/**
		 * @typesign (value?, opts?: {
		 *     get?: (value): *,
		 *     validate?: (value),
		 *     computed?: false
		 * }): cellx;
		 *
		 * @typesign (formula: (): *, opts?: {
		 *     get?: (value): *,
		 *     set?: (value),
		 *     validate?: (value),
		 *     computed?: true
		 * }): cellx;
		 */
		function cellx(value, opts) {
			if (!opts) {
				opts = {};
			}

			var initialValue = value;

			function cell(value) {
				return invokeCell(cell, initialValue, opts, this, value, slice.call(arguments, 1), arguments.length);
			}
			cell.constructor = cellx;

			return cell;
		}
		cellx.cellx = cellx;

		var KEY_CELLS = '__cellx_cells__';
		if (global.Symbol && typeof Symbol.iterator == 'symbol') {
			KEY_CELLS = Symbol(KEY_CELLS);
		}

		cellx.KEY_CELLS = KEY_CELLS;

		var uidCounter = 0;

		/**
		 * @typesign (err);
		 */
		var logError;

		if (global.console) {
			if (console.error) {
				logError = function(err) {
					console.error(err === Object(err) && err.stack || err);
				};
			} else {
				logError = function(err) {
					console.log('Error: ' + (err === Object(err) && err.stack || err));
				};
			}
		} else {
			logError = function() {};
		}

		/**
		 * For override:
		 * @example
		 * var cellx = require('cellx');
		 * var winston = require('winston');
		 *
		 * cellx._logError = function(err) {
		 *     winston.log('error', err.message + ' ' + err.stack);
		 * };
		 */
		cellx._logError = logError;

		/**
		 * @typesign (target: Object, source: Object): Object;
		 */
		function mixin(target, source) {
			var names = Object.getOwnPropertyNames(source);

			for (var i = names.length; i;) {
				Object.defineProperty(target, names[--i], Object.getOwnPropertyDescriptor(source, names[i]));
			}

			return target;
		}

		/**
		 * @typesign (a, b): boolean;
		 */
		var is = Object.is || function(a, b) {
			if (a === 0 && b === 0) {
				return 1 / a == 1 / b;
			}
			return a === b || (a != a && b != b);
		};

		/**
		 * @typesign (value): boolean;
		 */
		var isArray = Array.isArray || function(value) {
			return toString.call(value) == '[object Array]';
		};

		/**
		 * @typesign (description: {
		 *     Extends: Function,
		 *     Implements?: Array<Function>,
		 *     Static?: Object,
		 *     constructor?: Function
		 * }): Function;
		 */
		function createClass(description) {
			var parent;

			if (description.Extends) {
				parent = description.Extends;
				delete description.Extends;
			} else {
				parent = Object;
			}

			var constr;

			if (hasOwn.call(description, 'constructor')) {
				constr = description.constructor;
				delete description.constructor;
			} else {
				constr = function() {};
			}

			if (description.Static) {
				mixin(constr, description.Static);
				delete description.Static;
			}

			var proto = constr.prototype = Object.create(parent.prototype);

			if (description.Implements) {
				description.Implements.forEach(function(impl) {
					mixin(proto, impl.prototype);
				});

				delete description.Implements;
			}

			mixin(proto, description);

			proto.constructor = constr;

			return constr;
		}

		// gulp-include
		/**
		 * @typesign (cb: ());
		 */
		var nextTick = (function() {
			if (global.process && process.toString() == '[object process]' && process.nextTick) {
				return process.nextTick;
			}
		
			if (global.setImmediate) {
				return function(cb) {
					setImmediate(cb);
				};
			}
		
			if (global.Promise && Promise.toString().indexOf('[native code]') != -1) {
				var prm = Promise.resolve();
		
				return function(cb) {
					prm.then(function() {
						cb();
					});
				};
			}
		
			if (global.postMessage && !global.ActiveXObject) {
				var queue;
		
				global.addEventListener('message', function() {
					if (queue) {
						var q = queue;
		
						queue = null;
		
						for (var i = 0, l = q.length; i < l; i++) {
							try {
								q[i]();
							} catch (err) {
								cellx._logError(err);
							}
						}
					}
				}, false);
		
				return function(cb) {
					if (queue) {
						queue.push(cb);
					} else {
						queue = [cb];
						postMessage('__tic__', '*');
					}
				};
			}
		
			return function(cb) {
				setTimeout(cb, 1);
			};
		})();
		
		(function() {
			var Map = global.Map;
		
			if (!Map) {
				var KEY_UID = '__cellx_Map_uid__';
				if (global.Symbol && typeof Symbol.iterator == 'symbol') {
					KEY_UID = Symbol(KEY_UID);
				}
		
				var entryStub = {
					value: undefined
				};
		
				Map = createClass({
					constructor: function(entries) {
						this._entries = Object.create(null);
						this._objectStamps = {};
		
						this._first = null;
						this._last = null;
		
						this.size = 0;
		
						if (entries) {
							for (var i = 0, l = entries.length; i < l; i++) {
								this.set(entries[i][0], entries[i][1]);
							}
						}
					},
		
					has: function(key) {
						return !!this._entries[this._getValueStamp(key)];
					},
		
					get: function(key) {
						return (this._entries[this._getValueStamp(key)] || entryStub).value;
					},
		
					set: function(key, value) {
						var entries = this._entries;
						var keyStamp = this._getValueStamp(key);
		
						if (entries[keyStamp]) {
							entries[keyStamp].value = value;
						} else {
							var entry = entries[keyStamp] = {
								key: key,
								keyStamp: keyStamp,
								value: value,
								prev: this._last,
								next: null
							};
		
							if (this.size++) {
								this._last.next = entry;
							} else {
								this._first = entry;
							}
		
							this._last = entry;
						}
		
						return this;
					},
		
					delete: function(key) {
						var keyStamp = this._getValueStamp(key);
						var entry = this._entries[keyStamp];
		
						if (!entry) {
							return false;
						}
		
						if (--this.size) {
							var prev = entry.prev;
							var next = entry.next;
		
							if (prev) {
								prev.next = next;
							} else {
								this._first = next;
							}
		
							if (next) {
								next.prev = prev;
							} else {
								this._last = prev;
							}
						} else {
							this._first = null;
							this._last = null;
						}
		
						delete this._entries[keyStamp];
						delete this._objectStamps[keyStamp];
		
						return true;
					},
		
					clear: function() {
						var entries = this._entries;
		
						for (var stamp in entries) {
							delete entries[stamp];
						}
		
						this._objectStamps = {};
		
						this._first = null;
						this._last = null;
		
						this.size = 0;
					},
		
					_getValueStamp: function(value) {
						switch (typeof value) {
							case 'undefined': {
								return 'undefined';
							}
							case 'object': {
								if (value === null) {
									return 'null';
								}
		
								break;
							}
							case 'boolean': {
								return '?' + value;
							}
							case 'number': {
								return '+' + value;
							}
							case 'string': {
								return ',' + value;
							}
						}
		
						return this._getObjectStamp(value);
					},
		
					_getObjectStamp: function(obj) {
						if (!hasOwn.call(obj, KEY_UID)) {
							if (!Object.isExtensible(obj)) {
								var stamps = this._objectStamps;
								var stamp;
		
								for (stamp in stamps) {
									if (stamps[stamp] == obj) {
										return stamp;
									}
								}
		
								stamp = String(++uidCounter);
								stamps[stamp] = obj;
		
								return stamp;
							}
		
							Object.defineProperty(obj, KEY_UID, {
								value: String(++uidCounter)
							});
						}
		
						return obj[KEY_UID];
					},
		
					forEach: function(cb, context) {
						if (context == null) {
							context = global;
						}
		
						var entry = this._first;
		
						while (entry) {
							cb.call(context, entry.value, entry.key, this);
		
							do {
								entry = entry.next;
							} while (entry && !this._entries[entry.keyStamp]);
						}
					},
		
					toString: function() {
						return '[object Map]';
					}
				});
		
				[
					['keys', function(entry) {
						return entry.key;
					}],
					['values', function(entry) {
						return entry.value;
					}],
					['entries', function(entry) {
						return [entry.key, entry.value];
					}]
				].forEach(function(iterator) {
					var getStepValue = iterator[1];
		
					Map.prototype[iterator[0]] = function() {
						var entries = this._entries;
						var entry;
						var done = false;
						var map = this;
		
						return {
							next: function() {
								if (!done) {
									if (entry) {
										do {
											entry = entry.next;
										} while (entry && !entries[entry.keyStamp]);
									} else {
										entry = map._first;
									}
		
									if (entry) {
										return {
											value: getStepValue(entry),
											done: false
										};
									}
		
									done = true;
								}
		
								return {
									value: undefined,
									done: true
								};
							}
						};
					};
				});
			}
		
			cellx.Map = Map;
		})();
		
		/**
		 * @typedef {{
		 *     target?: Object,
		 *     type: string,
		 *     bubbles?: boolean,
		 *     isPropagationStopped?: boolean
		 * }} cellx~Event
		 */
		
		(function() {
			var KEY_INNER = '__cellx_EventEmitter_inner__';
		
			if (global.Symbol && typeof Symbol.iterator == 'symbol') {
				KEY_INNER = Symbol(KEY_INNER);
			}
		
			/**
			 * @class cellx.EventEmitter
			 * @extends {Object}
			 * @typesign new (): cellx.EventEmitter;
			 */
			var EventEmitter = createClass({
				Static: {
					KEY_INNER: KEY_INNER
				},
		
				constructor: function() {
					/**
					 * @type {Object<Array<{ listener: (evt: cellx~Event): boolean|undefined, context: Object }>>}
					 */
					this._events = Object.create(null);
				},
		
				/**
				 * @typesign (
				 *     type: string,
				 *     listener: (evt: cellx~Event): boolean|undefined,
				 *     context?: Object
				 * ): cellx.EventEmitter;
				 *
				 * @typesign (
				 *     listeners: Object<(evt: cellx~Event): boolean|undefined>,
				 *     context?: Object
				 * ): cellx.EventEmitter;
				 */
				on: function(type, listener, context) {
					if (typeof type == 'object') {
						context = listener;
		
						var listeners = type;
		
						for (type in listeners) {
							this._on(type, listeners[type], context);
						}
					} else {
						this._on(type, listener, context);
					}
		
					return this;
				},
				/**
				 * @typesign (
				 *     type: string,
				 *     listener: (evt: cellx~Event): boolean|undefined,
				 *     context?: Object
				 * ): cellx.EventEmitter;
				 *
				 * @typesign (
				 *     listeners: Object<(evt: cellx~Event): boolean|undefined>,
				 *     context?: Object
				 * ): cellx.EventEmitter;
				 *
				 * @typesign (): cellx.EventEmitter;
				 */
				off: function(type, listener, context) {
					if (type) {
						if (typeof type == 'object') {
							context = listener;
		
							var listeners = type;
		
							for (type in listeners) {
								this._off(type, listeners[type], context);
							}
						} else {
							this._off(type, listener, context);
						}
					} else if (this._events) {
						this._events = Object.create(null);
					}
		
					return this;
				},
		
				/**
				 * @typesign (
				 *     type: string,
				 *     listener: (evt: cellx~Event): boolean|undefined,
				 *     context?: Object
				 * );
				 */
				_on: function(type, listener, context) {
					var index = type.indexOf(':');
		
					if (index != -1) {
						this['_' + type.slice(index + 1)]('on', type.slice(0, index), listener, context);
					} else {
						var events = (this._events || (this._events = Object.create(null)))[type];
		
						if (!events) {
							events = this._events[type] = [];
						}
		
						events.push({
							listener: listener,
							context: context || this
						});
					}
				},
				/**
				 * @typesign (
				 *     type: string,
				 *     listener: (evt: cellx~Event): boolean|undefined,
				 *     context?: Object
				 * );
				 */
				_off: function(type, listener, context) {
					var index = type.indexOf(':');
		
					if (index != -1) {
						this['_' + type.slice(index + 1)]('off', type.slice(0, index), listener, context);
					} else {
						var events = this._events && this._events[type];
		
						if (!events) {
							return;
						}
		
						if (!context) {
							context = this;
						}
		
						for (var i = events.length; i;) {
							var evt = events[--i];
		
							if (evt.context == context && (evt.listener == listener || evt.listener[KEY_INNER] === listener)) {
								events.splice(i, 1);
								break;
							}
						}
		
						if (!events.length) {
							delete this._events[type];
						}
					}
				},
		
				/**
				 * @typesign (
				 *     type: string,
				 *     listener: (evt: cellx~Event): boolean|undefined,
				 *     context?: Object
				 * ): cellx.EventEmitter;
				 */
				once: function(type, listener, context) {
					function wrapper() {
						this._off(type, wrapper, context);
						return listener.apply(this, arguments);
					}
					wrapper[KEY_INNER] = listener;
		
					this._on(type, wrapper, context);
		
					return this;
				},
		
				/**
				 * @typesign (evt: cellx~Event): cellx~Event;
				 * @typesign (type: string): cellx~Event;
				 */
				emit: function(evt) {
					if (typeof evt == 'string') {
						evt = {
							target: this,
							type: evt
						};
					} else if (!evt.target) {
						evt.target = this;
					}
		
					this._handleEvent(evt);
		
					return evt;
				},
		
				/**
				 * @typesign (evt: cellx~Event);
				 *
				 * For override:
				 * @example
				 * function View(el) {
				 *     this.element = el;
				 *     el._view = this;
				 * }
				 *
				 * View.prototype = Object.create(EventEmitter.prototype);
				 * View.prototype.constructor = View;
				 *
				 * View.prototype.getParent = function() {
				 *     var node = this.element;
				 *
				 *     while (node = node.parentNode) {
				 *         if (node._view) {
				 *             return node._view;
				 *         }
				 *     }
				 *
				 *     return null;
				 * };
				 *
				 * View.prototype._handleEvent = function(evt) {
				 *     // call super._handleEvent
				 *     EventEmitter.prototype._handleEvent.call(this, evt);
				 *
				 *     var parent = this.getParent();
				 *
				 *     if (parent && evt.bubbles !== false && !evt.isPropagationStopped) {
				 *         parent._handleEvent(evt);
				 *     }
				 * };
				 */
				_handleEvent: function(evt) {
					var events = this._events && this._events[evt.type];
		
					if (events) {
						events = events.slice();
		
						for (var i = 0, l = events.length; i < l; i++) {
							try {
								if (events[i].listener.call(events[i].context, evt) === false) {
									evt.isPropagationStopped = true;
								}
							} catch (err) {
								this._logError(err);
							}
						}
					}
				},
		
				/**
				 * @typesign (err);
				 */
				_logError: function(err) {
					cellx._logError(err);
				}
			});
		
			cellx.EventEmitter = EventEmitter;
		})();
		
		var ObservableCollection;
		
		(function() {
			var Map = cellx.Map;
			var EventEmitter = cellx.EventEmitter;
		
			ObservableCollection = createClass({
				Extends: EventEmitter,
		
				constructor: function() {
					/**
					 * @type {Map<*, uint>}
					 */
					this._valueCounts = new Map();
				},
		
				/**
				 * @typesign (evt: cellx~Event);
				 */
				_onItemChange: function(evt) {
					this._handleEvent(evt);
				},
		
				/**
				 * @typesign (value);
				 */
				_registerValue: function(value) {
					var valueCounts = this._valueCounts;
					var valueCount = valueCounts.get(value);
		
					if (valueCount) {
						valueCounts.set(value, valueCount + 1);
					} else {
						valueCounts.set(value, 1);
		
						if (this.adoptsItemChanges && value instanceof EventEmitter) {
							value.on('change', this._onItemChange, this);
						}
					}
				},
		
				/**
				 * @typesign (value);
				 */
				_unregisterValue: function(value) {
					var valueCounts = this._valueCounts;
					var valueCount = valueCounts.get(value);
		
					if (valueCount > 1) {
						valueCounts.set(value, valueCount - 1);
					} else {
						valueCounts.delete(value);
		
						if (this.adoptsItemChanges && value instanceof EventEmitter) {
							value.off('change', this._onItemChange, this);
						}
					}
				},
		
				/**
				 * Освобождает занятые инстансом ресурсы.
				 * @typesign ();
				 */
				dispose: function() {
					if (this.adoptsItemChanges) {
						this._valueCounts.forEach(function(value) {
							if (value instanceof EventEmitter) {
								value.off('change', this._onItemChange, this);
							}
						}, this);
					}
				}
			});
		})();
		
		(function() {
			var Map = cellx.Map;
			var EventEmitter = cellx.EventEmitter;
		
			/**
			 * @class cellx.ObservableMap
			 * @extends {cellx.EventEmitter}
			 * @implements {ObservableCollection}
			 *
			 * @typesign new (entries?: Object|Array<{ 0, 1 }>|cellx.ObservableMap, opts?: {
			 *     adoptsItemChanges: boolean = true
			 * }): cellx.ObservableMap;
			 */
			var ObservableMap = createClass({
				Extends: EventEmitter,
				Implements: [ObservableCollection],
		
				constructor: function(entries, opts) {
					EventEmitter.call(this);
					ObservableCollection.call(this);
		
					this._entries = new Map();
		
					this.size = 0;
		
					/**
					 * @type {boolean}
					 */
					this.adoptsItemChanges = !opts || opts.adoptsItemChanges !== false;
		
					if (entries) {
						var mapEntries = this._entries;
		
						if (entries instanceof ObservableMap) {
							entries._entries.forEach(function(value, key) {
								mapEntries.set(key, value);
								this._registerValue(value);
							}, this);
						} else if (isArray(entries)) {
							for (var i = 0, l = entries.length; i < l; i++) {
								var entry = entries[i];
		
								mapEntries.set(entry[0], entry[1]);
								this._registerValue(entry[1]);
							}
						} else {
							for (var key in entries) {
								mapEntries.set(key, entries[key]);
								this._registerValue(entries[key]);
							}
						}
		
						this.size = mapEntries.size;
					}
				},
		
				/**
				 * @typesign (key): boolean;
				 */
				has: function(key) {
					return this._entries.has(key);
				},
		
				/**
				 * @typesign (value): boolean;
				 */
				contains: function(value) {
					return this._valueCounts.has(value);
				},
		
				/**
				 * @typesign (key): *;
				 */
				get: function(key) {
					return this._entries.get(key);
				},
		
				/**
				 * @typesign (key, value): cellx.ObservableMap;
				 */
				set: function(key, value) {
					var entries = this._entries;
					var hasKey = entries.has(key);
					var oldValue;
		
					if (hasKey) {
						oldValue = entries.get(key);
		
						if (is(oldValue, value)) {
							return this;
						}
		
						this._unregisterValue(oldValue);
					}
		
					entries.set(key, value);
					this._registerValue(value);
		
					if (!hasKey) {
						this.size++;
					}
		
					this.emit({
						type: 'change',
						subtype: hasKey ? 'update' : 'add',
						key: key,
						oldValue: oldValue,
						value: value
					});
		
					return this;
				},
		
				/**
				 * @typesign (key): boolean;
				 */
				delete: function(key) {
					var entries = this._entries;
		
					if (!entries.has(key)) {
						return false;
					}
		
					var value = entries.get(key);
		
					entries.delete(key);
					this._unregisterValue(value);
		
					this.size--;
		
					this.emit({
						type: 'change',
						subtype: 'delete',
						key: key,
						oldValue: value,
						value: undefined
					});
		
					return true;
				},
		
				/**
				 * @typesign (): cellx.ObservableMap;
				 */
				clear: function() {
					if (!this.size) {
						return this;
					}
		
					this._entries.clear();
					this._valueCounts.clear();
					this.size = 0;
		
					this.emit({
						type: 'change',
						subtype: 'clear'
					});
		
					return this;
				},
		
				/**
				 * @typesign (cb: (value, key, map: cellx.ObservableMap), context?: Object);
				 */
				forEach: function(cb, context) {
					if (context == null) {
						context = global;
					}
		
					this._entries.forEach(function(value, key) {
						cb.call(context, value, key, this);
					}, this);
				},
		
				/**
				 * @typesign (): { next: (): { value, done: boolean } };
				 */
				keys: function() {
					return this._entries.keys();
				},
		
				/**
				 * @typesign (): { next: (): { value, done: boolean } };
				 */
				values: function() {
					return this._entries.values();
				},
		
				/**
				 * @typesign (): { next: (): { value: { 0, 1 }, done: boolean } };
				 */
				entries: function() {
					return this._entries.entries();
				},
		
				/**
				 * @typesign (): cellx.ObservableMap;
				 */
				clone: function() {
					return new this.constructor(this, {
						adoptsItemChanges: this.adoptsItemChanges
					});
				}
			});
		
			cellx.ObservableMap = ObservableMap;
		
			/**
			 * @typesign (
			 *     entries?: Object|Array<{ 0, 1 }>|cellx.ObservableMap,
			 *     opts?: { adoptsItemChanges: boolean = true }
			 * ): cellx.ObservableMap;
			 *
			 * @typesign (
			 *     entries?: Object|Array<{ 0, 1 }>|cellx.ObservableMap,
			 *     adoptsItemChanges: boolean = true
			 * ): cellx.ObservableMap;
			 */
			function map(entries, opts) {
				return new ObservableMap(entries, typeof opts == 'boolean' ? { adoptsItemChanges: opts } : opts);
			}
		
			cellx.map = map;
		})();
		
		(function() {
			var EventEmitter = cellx.EventEmitter;
		
			/**
			 * @typesign (a, b): -1|1|0;
			 */
			function defaultComparator(a, b) {
				if (a < b) { return -1; }
				if (a > b) { return 1; }
				return 0;
			}
		
			/**
			 * @typesign (list: cellx.ObservableList, items: Array);
			 */
			function addRange(list, items) {
				var listItems = list._items;
		
				if (list.sorted) {
					var comparator = list.comparator;
		
					for (var i = 0, l = items.length; i < l; i++) {
						var item = items[i];
						var low = 0;
						var high = listItems.length;
		
						while (low != high) {
							var mid = (low + high) >> 1;
		
							if (comparator(item, listItems[mid]) < 0) {
								high = mid;
							} else {
								low = mid + 1;
							}
						}
		
						listItems.splice(low, 0, item);
						list._registerValue(item);
					}
				} else {
					push.apply(listItems, items);
		
					for (var j = items.length; j;) {
						list._registerValue(items[--j]);
					}
				}
		
				list.length = listItems.length;
			}
		
			/**
			 * @class cellx.ObservableList
			 * @extends {cellx.EventEmitter}
			 * @implements {ObservableCollection}
			 *
			 * @typesign new (items?: Array|cellx.ObservableList, opts?: {
			 *     adoptsItemChanges: boolean = true,
			 *     comparator?: (a, b): int,
			 *     sorted?: boolean
			 * }): cellx.ObservableList;
			 */
			var ObservableList = createClass({
				Extends: EventEmitter,
				Implements: [ObservableCollection],
		
				constructor: function(items, opts) {
					EventEmitter.call(this);
					ObservableCollection.call(this);
		
					if (!opts) {
						opts = {};
					}
		
					this._items = [];
		
					this.length = 0;
		
					/**
					 * @type {boolean}
					 */
					this.adoptsItemChanges = opts.adoptsItemChanges !== false;
		
					/**
					 * @type {?(a, b): int}
					 */
					this.comparator = null;
		
					this.sorted = false;
		
					if (opts.sorted || (opts.comparator && opts.sorted !== false)) {
						this.comparator = opts.comparator || defaultComparator;
						this.sorted = true;
					}
		
					if (items) {
						addRange(this, items instanceof ObservableList ? items._items : items);
					}
				},
		
				/**
				 * @typesign (index: int, allowEndIndex: boolean = false): uint|undefined;
				 */
				_validateIndex: function(index, allowEndIndex) {
					if (index === undefined) {
						return index;
					}
		
					if (index < 0) {
						index += this.length;
		
						if (index < 0) {
							throw new RangeError('Index out of range');
						}
					} else if (index >= (this.length + (allowEndIndex ? 1 : 0))) {
						throw new RangeError('Index out of range');
					}
		
					return index;
				},
		
				/**
				 * @typesign (value): boolean;
				 */
				contains: function(value) {
					return this._valueCounts.has(value);
				},
		
				/**
				 * @typesign (value, fromIndex: int = 0): int;
				 */
				indexOf: function(value, fromIndex) {
					return this._items.indexOf(value, this._validateIndex(fromIndex));
				},
		
				/**
				 * @typesign (value, fromIndex: int = -1): int;
				 */
				lastIndexOf: function(value, fromIndex) {
					return this._items.lastIndexOf(value, this._validateIndex(fromIndex));
				},
		
				/**
				 * @typesign (index: int): *;
				 */
				get: function(index) {
					return this._items[this._validateIndex(index)];
				},
		
				/**
				 * @typesign (index: int = 0, count?: uint): Array;
				 */
				getRange: function(index, count) {
					index = this._validateIndex(index || 0, true);
		
					var items = this._items;
		
					if (count === undefined) {
						return items.slice(index);
					}
		
					if (index + count > items.length) {
						throw new RangeError('"index" and "count" do not denote a valid range');
					}
		
					return items.slice(index, index + count);
				},
		
				/**
				 * @typesign (index: int, value): cellx.ObservableList;
				 */
				set: function(index, value) {
					if (this.sorted) {
						throw new TypeError('Can\'t set to sorted list');
					}
		
					index = this._validateIndex(index);
		
					var items = this._items;
		
					if (is(items[index], value)) {
						return this;
					}
		
					this._unregisterValue(items[index]);
		
					items[index] = value;
					this._registerValue(value);
		
					this.emit('change');
		
					return this;
				},
		
				/**
				 * @typesign (index: int, items: Array): cellx.ObservableList;
				 */
				setRange: function(index, items) {
					if (this.sorted) {
						throw new TypeError('Can\'t set to sorted list');
					}
		
					index = this._validateIndex(index);
		
					var itemCount = items.length;
		
					if (!itemCount) {
						return this;
					}
		
					if (index + itemCount > this.length) {
						throw new RangeError('"index" and length of "items" do not denote a valid range');
					}
		
					var listItems = this._items;
					var changed = false;
		
					for (var i = index + itemCount; i > index;) {
						var item = items[--i];
		
						if (!is(listItems[i], item)) {
							this._unregisterValue(listItems[i]);
		
							listItems[i] = item;
							this._registerValue(item);
		
							changed = true;
						}
					}
		
					if (changed) {
						this.emit('change');
					}
		
					return this;
				},
		
				/**
				 * @typesign (item): cellx.ObservableList;
				 */
				add: function(item) {
					this.addRange([item]);
					return this;
				},
		
				/**
				 * @typesign (items: Array): cellx.ObservableList;
				 */
				addRange: function(items) {
					if (!items.length) {
						return this;
					}
		
					addRange(this, items);
					this.emit('change');
		
					return this;
				},
		
				/**
				 * @typesign (index: int, item): cellx.ObservableList;
				 */
				insert: function(index, item) {
					this.insertRange(index, [item]);
					return this;
				},
		
				/**
				 * @typesign (index: int, items: Array): cellx.ObservableList;
				 */
				insertRange: function(index, items) {
					if (this.sorted) {
						throw new TypeError('Can\'t insert to sorted list');
					}
		
					index = this._validateIndex(index, true);
		
					var itemCount = items.length;
		
					if (!itemCount) {
						return this;
					}
		
					splice.apply(this._items, [].concat(index, 0, items));
		
					for (var i = itemCount; i;) {
						this._registerValue(items[--i]);
					}
		
					this.length += itemCount;
		
					this.emit('change');
		
					return this;
				},
		
				/**
				 * @typesign (item, fromIndex: int = 0): cellx.ObservableList;
				 */
				remove: function(item, fromIndex) {
					var index = this._items.indexOf(item, this._validateIndex(fromIndex));
		
					if (index == -1) {
						return this;
					}
		
					this._items.splice(index, 1);
					this._unregisterValue(item);
		
					this.length--;
		
					this.emit('change');
		
					return this;
				},
		
				/**
				 * @typesign (item, fromIndex: int = 0): cellx.ObservableList;
				 */
				removeAll: function(item, fromIndex) {
					var items = this._items;
					var index = this._validateIndex(fromIndex);
					var changed = false;
		
					while ((index = items.indexOf(item, index)) != -1) {
						items.splice(index, 1);
						this._unregisterValue(item);
		
						changed = true;
					}
		
					if (changed) {
						this.length = items.length;
						this.emit('change');
					}
		
					return this;
				},
		
				/**
				 * @typesign (index: int): cellx.ObservableList;
				 */
				removeAt: function(index) {
					this._unregisterValue(this._items.splice(this._validateIndex(index), 1)[0]);
					this.length--;
		
					this.emit('change');
		
					return this;
				},
		
				/**
				 * @typesign (index: int = 0, count?: uint): cellx.ObservableList;
				 */
				removeRange: function(index, count) {
					index = this._validateIndex(index || 0, true);
		
					var items = this._items;
		
					if (count === undefined) {
						count = items.length - index;
					} else if (index + count > items.length) {
						throw new RangeError('"index" and "count" do not denote a valid range');
					}
		
					if (!count) {
						return this;
					}
		
					for (var i = index + count; i > index;) {
						this._unregisterValue(items[--i]);
					}
					items.splice(index, count);
		
					this.length -= count;
		
					this.emit('change');
		
					return this;
				},
		
				/**
				 * @typesign (): cellx.ObservableList;
				 */
				clear: function() {
					if (this.length) {
						this._items.length = 0;
						this._valueCounts.clear();
		
						this.length = 0;
		
						this.emit('change');
					}
		
					return this;
				},
		
				/**
				 * @typesign (separator: string = ','): string;
				 */
				join: function(separator) {
					return this._items.join(separator);
				},
		
				/**
				 * @typesign (cb: (item, index: uint, arr: Array), context: Object = global);
				 */
				forEach: null,
		
				/**
				 * @typesign (cb: (item, index: uint, arr: Array): *, context: Object = global): Array;
				 */
				map: null,
		
				/**
				 * @typesign (cb: (item, index: uint, arr: Array): boolean, context: Object = global): Array;
				 */
				filter: null,
		
				/**
				 * @typesign (cb: (item, index: uint, arr: Array): boolean, context: Object = global): boolean;
				 */
				every: null,
		
				/**
				 * @typesign (cb: (item, index: uint, arr: Array): boolean, context: Object = global): boolean;
				 */
				some: null,
		
				/**
				 * @typesign (cb: (accumulator: *, item, index: uint, arr: Array): *, initialValue?): *;
				 */
				reduce: null,
		
				/**
				 * @typesign (cb: (accumulator: *, item, index: uint, arr: Array): *, initialValue?): *;
				 */
				reduceRight: null,
		
				/**
				 * @typesign (): cellx.ObservableList;
				 */
				clone: function() {
					return new this.constructor(this, {
						adoptsItemChanges: this.adoptsItemChanges,
						comparator: this.comparator,
						sorted: this.sorted
					});
				},
		
				/**
				 * @typesign (): Array;
				 */
				toArray: function() {
					return this._items.slice();
				},
		
				/**
				 * @typesign (): string;
				 */
				toString: function() {
					return this._items.join();
				}
			});
		
			['forEach', 'map', 'filter', 'every', 'some', 'reduce', 'reduceRight'].forEach(function(name) {
				ObservableList.prototype[name] = function() {
					return Array.prototype[name].apply(this._items, arguments);
				};
			});
		
			cellx.ObservableList = ObservableList;
		
			/**
			 * @typesign (items?: Array|cellx.ObservableList, opts?: {
			 *     adoptsItemChanges: boolean = true,
			 *     comparator?: (a, b): int,
			 *     sorted?: boolean
			 * }): cellx.ObservableList;
			 *
			 * @typesign (items?: Array|cellx.ObservableList, adoptsItemChanges: boolean = true): cellx.ObservableList;
			 */
			function list(items, opts) {
				return new ObservableList(items, typeof opts == 'boolean' ? { adoptsItemChanges: opts } : opts);
			}
		
			cellx.list = list;
		})();
		
		(function() {
			var EventEmitter = cellx.EventEmitter;
		
			var KEY_INNER = EventEmitter.KEY_INNER;
		
			var error = {
				original: null
			};
		
			var currentlyRelease = false;
		
			/**
			 * @type {Array<Array<cellx.Cell>|null>}
			 */
			var releasePlan = [[]];
		
			var releasePlanIndex = 0;
			var maxLevel = -1;
		
			var calculatedCell = null;
		
			var releaseVersion = 1;
		
			function release() {
				if (releasePlanIndex > maxLevel) {
					return;
				}
		
				currentlyRelease = true;
		
				do {
					var bundle = releasePlan[releasePlanIndex];
		
					if (bundle) {
						var cell = bundle.shift();
		
						if (releasePlanIndex) {
							var index = releasePlanIndex;
		
							cell._recalc();
		
							if (!releasePlan[index].length) {
								releasePlan[index] = null;
		
								if (releasePlanIndex) {
									releasePlanIndex++;
								}
							}
						} else {
							var changeEvent = cell._changeEvent;
		
							cell._fixedValue = cell._value;
							cell._changeEvent = null;
		
							cell._changed = true;
		
							if (cell._events.change) {
								cell._handleEvent(changeEvent);
							}
		
							var slaves = cell._slaves;
		
							for (var i = slaves.length; i;) {
								var slave = slaves[--i];
		
								if (slave._fixed) {
									(releasePlan[1] || (releasePlan[1] = [])).push(slave);
		
									if (!maxLevel) {
										maxLevel = 1;
									}
		
									slave._fixed = false;
								}
							}
		
							if (!releasePlan[0].length) {
								releasePlanIndex++;
							}
						}
					} else {
						releasePlanIndex++;
					}
				} while (releasePlanIndex <= maxLevel);
		
				maxLevel = -1;
		
				releaseVersion++;
		
				currentlyRelease = false;
			}
		
			/**
			 * @class cellx.Cell
			 * @extends {cellx.EventEmitter}
			 *
			 * @example
			 * var a = new Cell(1);
			 * var b = new Cell(2);
			 * var c = new Cell(function() {
			 *     return a.get() + b.get();
			 * });
			 *
			 * c.on('change', function() {
			 *     console.log('c = ' + c.get());
			 * });
			 *
			 * console.log(c.get());
			 * // => 3
			 *
			 * a.set(5);
			 * b.set(10);
			 * // => 'c = 15'
			 *
			 * @typesign new (value?, opts?: {
			 *     owner?: Object,
			 *     get?: (value): *,
			 *     validate?: (value),
			 *     onchange?: (evt: cellx~Event): boolean|undefined,
			 *     onerror?: (evt: cellx~Event): boolean|undefined,
			 *     computed?: false
			 * }): cellx.Cell;
			 *
			 * @typesign new (formula: (): *, opts?: {
			 *     owner?: Object,
			 *     get?: (value): *,
			 *     set?: (value),
			 *     validate?: (value),
			 *     onchange?: (evt: cellx~Event): boolean|undefined,
			 *     onerror?: (evt: cellx~Event): boolean|undefined,
			 *     computed?: true
			 * }): cellx.Cell;
			 */
			var Cell = createClass({
				Extends: EventEmitter,
		
				constructor: function(value, opts) {
					EventEmitter.call(this);
		
					if (!opts) {
						opts = {};
					}
		
					this.owner = opts.owner || null;
		
					this.computed = typeof value == 'function' &&
						(opts.computed !== undefined ? opts.computed : value.constructor == Function);
		
					this._value = undefined;
					this._fixedValue = undefined;
					this.initialValue = undefined;
					this._formula = null;
		
					this._get = opts.get || null;
					this._set = opts.set || null;
		
					this._validate = opts.validate || null;
		
					/**
					 * Ведущие ячейки.
					 * @type {?Array<cellx.Cell>}
					 */
					this._masters = null;
					/**
					 * Ведомые ячейки.
					 * @type {Array<cellx.Cell>}
					 */
					this._slaves = [];
		
					/**
					 * @type {uint|undefined}
					 */
					this._level = 0;
		
					this._active = !this.computed;
		
					this._changeEvent = null;
					this._isChangeCancellable = true;
		
					this._lastErrorEvent = null;
		
					this._fixed = true;
		
					this._version = 0;
		
					this._changed = false;
		
					this._circularityCounter = 0;
		
					if (this.computed) {
						this._formula = value;
					} else {
						if (this._validate) {
							this._validate.call(this.owner || this, value);
						}
		
						this._value = this._fixedValue = this.initialValue = value;
		
						if (value instanceof EventEmitter) {
							value.on('change', this._onValueChange, this);
						}
					}
		
					if (opts.onchange) {
						this.on('change', opts.onchange);
					}
					if (opts.onerror) {
						this.on('error', opts.onerror);
					}
				},
		
				/**
				 * @type {boolean}
				 */
				get changed() {
					if (!currentlyRelease) {
						release();
					}
		
					return this._changed;
				},
		
				/**
				 * @override cellx.EventEmitter#on
				 */
				on: function(type, listener, context) {
					if (!currentlyRelease) {
						release();
					}
		
					if (this.computed && !this._events.change && !this._slaves.length) {
						this._activate();
					}
		
					EventEmitter.prototype.on.call(this, type, listener, context);
		
					return this;
				},
				/**
				 * @override cellx.EventEmitter#off
				 */
				off: function(type, listener, context) {
					if (!currentlyRelease) {
						release();
					}
		
					EventEmitter.prototype.off.call(this, type, listener, context);
		
					if (this.computed && !this._events.change && !this._slaves.length) {
						this._deactivate();
					}
		
					return this;
				},
		
				/**
				 * @override cellx.EventEmitter#_on
				 */
				_on: function(type, listener, context) {
					EventEmitter.prototype._on.call(this, type, listener, context || this.owner);
				},
				/**
				 * @override cellx.EventEmitter#_off
				 */
				_off: function(type, listener, context) {
					EventEmitter.prototype._off.call(this, type, listener, context || this.owner);
				},
		
				/**
				 * @typesign (listener: (err: Error|null, evt: cellx~Event): boolean|undefined): cellx.Cell;
				 */
				subscribe: function(listener) {
					function wrapper(evt) {
						return listener.call(this, evt.error || null, evt);
					}
					wrapper[KEY_INNER] = listener;
		
					this
						.on('change', wrapper)
						.on('error', wrapper);
		
					return this;
				},
				/**
				 * @typesign (listener: (err: Error|null, evt: cellx~Event): boolean|undefined): cellx.Cell;
				 */
				unsubscribe: function(listener) {
					this
						.off('change', listener)
						.off('error', listener);
		
					return this;
				},
		
				/**
				 * @typesign (slave: cellx.Cell);
				 */
				_registerSlave: function(slave) {
					if (this.computed && !this._events.change && !this._slaves.length) {
						this._activate();
					}
		
					this._slaves.push(slave);
				},
				/**
				 * @typesign (slave: cellx.Cell);
				 */
				_unregisterSlave: function(slave) {
					this._slaves.splice(this._slaves.indexOf(slave), 1);
		
					if (this.computed && !this._events.change && !this._slaves.length) {
						this._deactivate();
					}
				},
		
				/**
				 * @typesign ();
				 */
				_activate: function() {
					if (this._version != releaseVersion) {
						this._masters = null;
						this._level = 0;
		
						var value = this._tryFormula();
		
						if (value === error) {
							this._handleError(error.original);
						} else if (!is(this._value, value)) {
							this._value = value;
							this._changed = true;
						}
		
						this._version = releaseVersion;
					}
		
					var masters = this._masters || [];
		
					for (var i = masters.length; i;) {
						masters[--i]._registerSlave(this);
					}
		
					this._active = true;
				},
				/**
				 * @typesign ();
				 */
				_deactivate: function() {
					var masters = this._masters || [];
		
					for (var i = masters.length; i;) {
						masters[--i]._unregisterSlave(this);
					}
		
					this._active = false;
				},
		
				/**
				 * @typesign (evt: cellx~Event);
				 */
				_onValueChange: function(evt) {
					if (this._changeEvent) {
						evt.prev = this._changeEvent;
		
						this._changeEvent = evt;
		
						if (this._value === this._fixedValue) {
							this._isChangeCancellable = false;
						}
					} else {
						releasePlan[0].push(this);
		
						releasePlanIndex = 0;
		
						if (maxLevel == -1) {
							maxLevel = 0;
						}
		
						evt.prev = null;
		
						this._changeEvent = evt;
						this._isChangeCancellable = false;
		
						if (!currentlyRelease) {
							nextTick(release);
						}
					}
				},
		
				/**
				 * @typesign (): *;
				 */
				get: function() {
					if (!currentlyRelease) {
						release();
					}
		
					if (this.computed && !this._active && this._version != releaseVersion) {
						this._masters = null;
						this._level = 0;
		
						var value = this._tryFormula();
		
						if (value === error) {
							this._handleError(error.original);
						} else {
							if (!is(this._value, value)) {
								this._value = value;
								this._changed = true;
							}
						}
		
						this._version = releaseVersion;
					}
		
					if (calculatedCell) {
						if (calculatedCell._masters) {
							if (calculatedCell._masters.indexOf(this) == -1) {
								calculatedCell._masters.push(this);
		
								if (calculatedCell._level <= this._level) {
									calculatedCell._level = this._level + 1;
								}
							}
						} else {
							calculatedCell._masters = [this];
							calculatedCell._level = this._level + 1;
						}
					}
		
					return this._get ? this._get.call(this.owner || this, this._value) : this._value;
				},
		
				/**
				 * @typesign (value): boolean;
				 */
				set: function(value) {
					if (this.computed && !this._set) {
						throw new TypeError('Cannot write to read-only cell');
					}
		
					var oldValue = this._value;
		
					if (is(oldValue, value)) {
						return false;
					}
		
					if (this._validate) {
						this._validate.call(this.owner || this, value);
					}
		
					if (this.computed) {
						this._set.call(this.owner || this, value);
					} else {
						this._value = value;
		
						if (oldValue instanceof EventEmitter) {
							oldValue.off('change', this._onValueChange, this);
						}
						if (value instanceof EventEmitter) {
							value.on('change', this._onValueChange, this);
						}
		
						if (this._changeEvent) {
							if (is(value, this._fixedValue) && this._isChangeCancellable) {
								if (releasePlan[0].length == 1) {
									releasePlan[0].pop();
		
									if (!maxLevel) {
										maxLevel = -1;
									}
								} else {
									releasePlan[0].splice(releasePlan[0].indexOf(this), 1);
								}
		
								this._changeEvent = null;
							} else {
								this._changeEvent = {
									target: this,
									type: 'change',
									oldValue: oldValue,
									value: value,
									prev: this._changeEvent
								};
							}
						} else {
							releasePlan[0].push(this);
		
							releasePlanIndex = 0;
		
							if (maxLevel == -1) {
								maxLevel = 0;
							}
		
							this._changeEvent = {
								target: this,
								type: 'change',
								oldValue: oldValue,
								value: value,
								prev: null
							};
							this._isChangeCancellable = true;
		
							if (!currentlyRelease) {
								nextTick(release);
							}
						}
					}
		
					return true;
				},
		
				/**
				 * @typesign (): boolean|undefined;
				 */
				recalc: function() {
					return this._recalc(true);
				},
		
				/**
				 * @typesign (force: boolean = false): boolean|undefined;
				 */
				_recalc: function(force) {
					if (!force) {
						if (this._version == releaseVersion + 1) {
							if (++this._circularityCounter == 10) {
								this._fixed = true;
								this._version = releaseVersion + 1;
		
								this._handleError(new RangeError('Circular dependency detected'));
		
								return false;
							}
						} else {
							this._circularityCounter = 1;
						}
					}
		
					var oldMasters = this._masters;
					this._masters = null;
		
					var oldLevel = this._level;
					this._level = 0;
		
					var value = this._tryFormula();
		
					var masters = this._masters || [];
					var haveRemovedMasters = false;
		
					for (var i = oldMasters.length; i;) {
						var oldMaster = oldMasters[--i];
		
						if (masters.indexOf(oldMaster) == -1) {
							oldMaster._unregisterSlave(this);
							haveRemovedMasters = true;
						}
					}
		
					if (haveRemovedMasters || oldMasters.length < masters.length) {
						for (var j = masters.length; j;) {
							var master = masters[--j];
		
							if (oldMasters.indexOf(master) == -1) {
								master._registerSlave(this);
							}
						}
		
						var level = this._level;
		
						if (level > oldLevel) {
							(releasePlan[level] || (releasePlan[level] = [])).push(this);
		
							if (maxLevel < level) {
								maxLevel = level;
							}
		
							if (force) {
								nextTick(release);
							}
		
							return;
						}
					}
		
					this._fixed = true;
					this._version = releaseVersion + 1;
		
					if (value === error) {
						this._handleError(error.original);
					} else {
						var oldValue = this._value;
		
						if (!is(oldValue, value) || value instanceof EventEmitter) {
							this._value = value;
							this._changed = true;
		
							if (this._events.change) {
								this.emit({
									type: 'change',
									oldValue: oldValue,
									value: value,
									prev: null
								});
							}
		
							var slaves = this._slaves;
		
							for (var k = slaves.length; k;) {
								var slave = slaves[--k];
		
								if (slave._fixed) {
									var slaveLevel = slave._level;
		
									(releasePlan[slaveLevel] || (releasePlan[slaveLevel] = [])).push(slave);
		
									if (maxLevel < slaveLevel) {
										maxLevel = slaveLevel;
									}
		
									slave._fixed = false;
								}
							}
		
							return true;
						}
					}
		
					return false;
				},
		
				/**
				 * @typesign (): *;
				 */
				_tryFormula: function() {
					var prevCalculatedCell = calculatedCell;
					calculatedCell = this;
		
					try {
						var value = this._formula.call(this.owner || this);
		
						if (this._validate) {
							this._validate.call(this.owner || this, value);
						}
		
						return value;
					} catch (err) {
						error.original = err;
						return error;
					} finally {
						calculatedCell = prevCalculatedCell;
					}
				},
		
				/**
				 * @typesign (err: Error);
				 */
				_handleError: function(err) {
					this._logError(err);
		
					this._handleErrorEvent({
						type: 'error',
						error: err
					});
				},
		
				/**
				 * @typesign (evt: cellx~Event);
				 */
				_handleErrorEvent: function(evt) {
					if (this._lastErrorEvent === evt) {
						return;
					}
		
					this._lastErrorEvent = evt;
		
					this._handleEvent(evt);
		
					var slaves = this._slaves;
		
					for (var i = slaves.length; i;) {
						if (evt.isPropagationStopped) {
							break;
						}
		
						slaves[--i]._handleErrorEvent(evt);
					}
				},
		
				/**
				 * @typesign (): cellx.Cell;
				 */
				dispose: function() {
					if (!currentlyRelease) {
						release();
					}
		
					this._dispose();
		
					return this;
				},
		
				/**
				 * @typesign ();
				 */
				_dispose: function() {
					this.off();
		
					if (this._active) {
						var slaves = this._slaves;
		
						for (var i = slaves.length; i;) {
							slaves[--i]._dispose();
						}
					}
				}
			});
		
			cellx.Cell = Cell;
		})();
		
		(function() {
			var Map = cellx.Map;
			var Cell = cellx.Cell;
		
			var cellProto = Cell.prototype;
		
			invokeCell = function(wrapper, initialValue, opts, owner, firstArg, otherArgs, argCount) {
				if (!owner || owner == global) {
					owner = wrapper;
				}
		
				if (!hasOwn.call(owner, KEY_CELLS)) {
					Object.defineProperty(owner, KEY_CELLS, {
						value: new Map()
					});
				}
		
				var cell = owner[KEY_CELLS].get(wrapper);
		
				if (!cell) {
					if (initialValue != null && typeof initialValue == 'object') {
						if (typeof initialValue.clone == 'function') {
							initialValue = initialValue.clone();
						} else if (isArray(initialValue)) {
							initialValue = initialValue.slice();
						} else if (initialValue.constructor === Object) {
							initialValue = mixin({}, initialValue);
						} else {
							switch (toString.call(initialValue)) {
								case '[object Date]': {
									initialValue = new Date(initialValue);
									break;
								}
								case '[object RegExp]': {
									initialValue = new RegExp(initialValue);
									break;
								}
							}
						}
					}
		
					opts = Object.create(opts);
					opts.owner = owner;
		
					cell = new Cell(initialValue, opts);
					owner[KEY_CELLS].set(wrapper, cell);
				}
		
				switch (argCount) {
					case 0: {
						return cell.get();
					}
					case 1: {
						return cell.set(firstArg);
					}
					default: {
						switch (firstArg) {
							case 'bind': {
								wrapper = wrapper.bind(owner);
								wrapper.constructor = cellx;
								return wrapper;
							}
							case 'unwrap': {
								return cell;
							}
							default: {
								return cellProto[firstArg].apply(cell, otherArgs);
							}
						}
					}
				}
			};
		})();
		
		(function() {
			function observable(target, name, descr, opts) {
				if (arguments.length == 1) {
					opts = target;
		
					return function(target, name, descr) {
						return observable(target, name, descr, opts);
					};
				}
		
				if (!opts) {
					opts = {};
				}
		
				opts.computed = false;
		
				var _name = '_' + name;
		
				target[_name] = cellx(descr.initializer(), opts);
		
				return {
					configurable: descr.configurable,
					enumerable: descr.enumerable,
		
					get: function() {
						return this[_name]();
					},
		
					set: function(value) {
						this[_name](value);
					}
				};
			}
		
			function computed(target, name, descr, opts) {
				if (arguments.length == 1) {
					opts = target;
		
					return function(target, name, descr) {
						return computed(target, name, descr, opts);
					};
				}
		
				var value = descr.initializer();
		
				if (typeof value != 'function') {
					throw new TypeError('Property value must be a function');
				}
		
				if (!opts) {
					opts = {};
				}
		
				opts.computed = true;
		
				var _name = '_' + name;
		
				target[_name] = cellx(value, opts);
		
				var descr = {
					configurable: descr.configurable,
					enumerable: descr.enumerable,
		
					get: function() {
						return this[_name]();
					}
				};
		
				if (opts.set) {
					descr.set = function(value) {
						this[_name](value);
					};
				}
		
				return descr;
			}
		
			cellx.d = {
				observable: observable,
				computed: computed
			};
		})();
		

		cellx.utils = {
			logError: logError,
			mixin: mixin,
			createClass: createClass,
			nextTick: nextTick
		};

		if (true) {
			if (true) {
				module.exports = cellx;
			} else {
				exports.cellx = cellx;
			}
		} else {
			global.cellx = cellx;
		}
	})();


/***/ },
/* 2 */
/***/ function(module, exports) {

	'use strict';

	var settings = {
		blockElementDelimiter: '__'
	};

	module.exports = settings;

/***/ },
/* 3 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _require = __webpack_require__(1);

	var nextTick = _require.utils.nextTick;

	var _require2 = __webpack_require__(4);

	var getUID = _require2.get;

	var removedNodes = {};
	var addedNodes = {};

	var releaseIsPlanned = false;

	var listeners = [];

	function registerRemovedNode(node) {
		var id = getUID(node);

		if (addedNodes[id]) {
			delete addedNodes[id];
		} else {
			removedNodes[id] = node;

			if (!releaseIsPlanned) {
				releaseIsPlanned = true;
				nextTick(release);
			}
		}
	}

	function registerAddedNode(node) {
		var id = getUID(node);

		if (removedNodes[id]) {
			delete removedNodes[id];
		} else {
			addedNodes[id] = node;

			if (!releaseIsPlanned) {
				releaseIsPlanned = true;
				nextTick(release);
			}
		}
	}

	function release() {
		releaseIsPlanned = false;

		var removedNodes_ = [];
		var addedNodes_ = [];

		for (var id in removedNodes) {
			removedNodes_.push(removedNodes[id]);
		}
		for (var id in addedNodes) {
			addedNodes_.push(addedNodes[id]);
		}

		if (removedNodes_.length || addedNodes_.length) {
			removedNodes = {};
			addedNodes = {};

			for (var i = 0, l = listeners.length; i < l; i++) {
				listeners[i](removedNodes_, addedNodes_);
			}
		}
	}

	/**
	 * @typsign (listener: ());
	 */
	function observeDOM(listener) {
		listeners.push(listener);
	}

	var MutationObserver = window.MutationObserver || window.WebKitMutationObserver;
	var docEl = document.documentElement;

	if (MutationObserver) {
		document.addEventListener('DOMContentLoaded', function onDOMContentLoaded() {
			document.removeEventListener('DOMContentLoaded', onDOMContentLoaded);

			var obs = new MutationObserver(function (mutations) {
				for (var i = 0, l = mutations.length; i < l; i++) {
					var mutation = mutations[i];
					var _removedNodes = mutation.removedNodes;
					var _addedNodes = mutation.addedNodes;

					for (var _i = 0, _l = _removedNodes.length; _i < _l; _i++) {
						registerRemovedNode(_removedNodes[_i]);
					}
					for (var _i2 = 0, _l2 = _addedNodes.length; _i2 < _l2; _i2++) {
						registerAddedNode(_addedNodes[_i2]);
					}
				}
			});

			obs.observe(docEl, {
				childList: true,
				subtree: true
			});
		});
	} else {
		docEl.addEventListener('DOMNodeRemoved', function () {
			registerRemovedNode(evt.target);
		}, false);
		docEl.addEventListener('DOMNodeInserted', function () {
			registerAddedNode(evt.target);
		}, false);
	}

	module.exports = observeDOM;

/***/ },
/* 4 */
/***/ function(module, exports) {

	'use strict';

	var uidCounter = 0;

	/**
	 * @typesign (): string;
	 */
	function nextUID() {
		return String(++uidCounter);
	}

	var KEY_UID = '__rista_uid__';
	if (window.Symbol && typeof Symbol.iterator == 'symbol') {
		KEY_UID = Symbol(KEY_UID);
	}

	/**
	 * @typesign (obj: Object): string;
	 */
	function getUID(obj) {
		return obj[KEY_UID] || Object.defineProperty(obj, KEY_UID, { value: nextUID() })[KEY_UID];
	}

	module.exports = {
		next: nextUID,
		get: getUID
	};

/***/ },
/* 5 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _require = __webpack_require__(1);

	var EventEmitter = _require.EventEmitter;
	var cellx = _require.cellx;
	var _require$utils = _require.utils;
	var logError = _require$utils.logError;
	var mixin = _require$utils.mixin;
	var createClass = _require$utils.createClass;

	var morphdom = __webpack_require__(6);
	var settings = __webpack_require__(2);

	var _require2 = __webpack_require__(4);

	var nextUID = _require2.next;

	var hasClass = __webpack_require__(7);

	var KEY_VIEW = '__rista_View_view__';
	if (window.Symbol && typeof Symbol.iterator == 'symbol') {
		KEY_VIEW = Symbol(KEY_VIEW);
	}

	/**
	 * @typesign (str: string): string;
	 */
	function toCamelCase(str) {
		return str.replace(/[^$0-9a-zA-Z]([$0-9a-zA-Z])/g, function (match, chr) {
			return chr.toUpperCase();
		});
	}

	var viewClasses = Object.create(null);

	/**
	 * @typesign (name: string): Function|undefined;
	 */
	function getViewClass(name) {
		return viewClasses[name];
	}

	/**
	 * @typesign (name: string, viewClass: Function): Function;
	 */
	function registerViewClass(name, viewClass) {
		if (viewClasses[name]) {
			throw new TypeError('ViewClass "' + name + '" is already registered');
		}

		Object.defineProperty(viewClass, '$viewClass', {
			value: name
		});

		viewClasses[name] = viewClass;

		return viewClass;
	}

	/**
	 * @typesign (name: string, description: {
	 *     render?: (): string,
	 *     init?: (),
	 *     dispose?: ()
	 * });
	 */
	function defineView(name, description) {
		var CustomView = Function('View', 'return function ' + toCamelCase('.' + name) + '(block) { View.call(this, block); };')(View);

		var proto = CustomView.prototype = Object.create(View.prototype);

		mixin(proto, description);
		proto.constructor = CustomView;

		if (!proto.blockName) {
			proto.blockName = toCamelCase(name);
		}

		registerViewClass(name, CustomView);
	}

	/**
	 * @typesign new (block: HTMLElement): rista.View;
	 */
	var View = createClass({
		Extends: EventEmitter,

		Static: {
			KEY_VIEW: KEY_VIEW,

			getClass: getViewClass,
			registerClass: registerViewClass,

			define: defineView
		},

		/**
	  * @type {Array<{ dispose: () }>}
	  */
		_disposables: null,

		/**
	  * @type {string}
	  */
		blockName: undefined,

		/**
	  * Корневой элемент вьюшки.
	  * @type {HTMLElement}
	  */
		block: null,

		/**
	  * @final
	  * @type {cellx<string>}
	  */
		_content: cellx(function () {
			return this.render();
		}),

		destroyed: false,

		constructor: function constructor(block) {
			if (block[KEY_VIEW]) {
				throw new TypeError('Element is already used as a block of view');
			}

			this._disposables = {};

			this.block = block;
			block[KEY_VIEW] = this;

			if (!hasClass(block, this.blockName)) {
				block.className = this.blockName + ' ' + block.className;
			}

			if (this.render) {
				block.innerHTML = this._content();
				this._content('on', 'change', this._onContentChange);
			}

			if (this.init) {
				this.init();
			}
		},

		/**
	  * @override
	  */
		_handleEvent: function _handleEvent(evt) {
			EventEmitter.prototype._handleEvent.call(this, evt);

			var parent = this.getParent();

			if (parent && evt.bubbles !== false && !evt.isPropagationStopped) {
				if (!parent.destroyed) {
					parent._handleEvent(evt);
				}
			}
		},

		_onContentChange: function _onContentChange() {
			var el = document.createElement('div');
			el.innerHTML = this._content();

			morphdom(this.block, el, {
				childrenOnly: true,

				onBeforeMorphEl: function onBeforeMorphEl(fromEl, toEl) {
					var view = fromEl[KEY_VIEW];

					if (view && view._onBeforeBlockMorph) {
						view._onBeforeBlockMorph(fromEl, toEl);
					}
				}
			});
		},

		_onBeforeBlockMorph: function _onBeforeBlockMorph(fromEl, toEl) {
			toEl.className = fromEl.className;
		},

		render: null,
		init: null,

		/**
	  * @typesign (selector: string): $;
	  */
		$: (function (_$) {
			function $(_x) {
				return _$.apply(this, arguments);
			}

			$.toString = function () {
				return _$.toString();
			};

			return $;
		})(function (selector) {
			selector = selector.split('&').join('.' + this.blockName + settings.blockElementDelimiter);

			if (typeof $ == 'function' && $.fn) {
				return $(this.block).find(selector);
			}

			return this.block.querySelectorAll(selector);
		}),

		/**
	  * @typesign (method: string, ...args?: Array): Array;
	  */
		broadcast: function broadcast(method) {
			var args = Array.prototype.slice.call(arguments, 1);

			return this.getDescendants().map(function (descendant) {
				if (!descendant.destroyed) {
					var methodDescr = Object.getOwnPropertyDescriptor(descendant, method);

					if (methodDescr && typeof methodDescr.value == 'function') {
						return descendant[method].apply(descendant, args);
					}
				}
			});
		},

		/**
	  * @typesign (): HTMLElement|null;
	  */
		getParent: function getParent() {
			var node = this.block;

			while (node = node.parentNode) {
				if (node[KEY_VIEW]) {
					return node[KEY_VIEW];
				}
			}

			return null;
		},

		/**
	  * @typesign (): Array<HTMLElement>;
	  */
		getDescendants: function getDescendants() {
			return Array.prototype.filter.call(this.block.querySelectorAll('[rt-view]'), function (block) {
				return block[KEY_VIEW];
			});
		},

		listenTo: function listenTo(target, type, listener, context) {
			var _this = this;

			var listenings = undefined;

			if (Array.isArray(target) || target.addClass && target.append) {
				listenings = [];

				for (var i = 0, l = target.length; i < l; i++) {
					listenings.push(this.listenTo(target[i], type, listener, context));
				}
			} else if (typeof type == 'object') {
				if (Array.isArray(type)) {
					var types = type;

					listenings = [];

					for (var i = 0, l = types.length; i < l; i++) {
						listenings.push(this.listenTo(target, types[i], listener, context));
					}
				} else {
					var listeners = type;

					context = listener;
					listenings = [];

					for (var _type in listeners) {
						listenings.push(this.listenTo(target, _type, listeners[_type], context));
					}
				}
			} else if (Array.isArray(listener)) {
				var listeners = listener;

				listenings = [];

				for (var i = 0, l = listeners.length; i < l; i++) {
					listenings.push(this.listenTo(target, type, listeners[i], context));
				}
			} else if (typeof listener == 'object') {
				var listeners = listener;

				listenings = [];

				for (var _name in listeners) {
					listenings.push(this.listenTo(target[_name]('unwrap', 0), type, listeners[_name], context));
				}
			} else {
				return this._listenTo(target, type, listener, context);
			}

			var id = nextUID();

			var stopListening = function stopListening() {
				for (var i = listenings.length; i;) {
					listenings[--i].stop();
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
	  *     listener: (evt: cellx~Event): boolean|undefined,
	  *     context?: Object
	  * );
	  */
		_listenTo: function _listenTo(target, type, listener, context) {
			var _this2 = this;

			if (!context) {
				context = this;
			}

			if (target instanceof EventEmitter) {
				target.on(type, listener, context);
			} else if (typeof target.addEventListener == 'function') {
				if (target != context) {
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
	  * @typesign (cb: Function): Function{ cancel: (), dispose: () };
	  */
		registerCallback: function registerCallback(cb) {
			var _this3 = this,
			    _arguments = arguments;

			var id = nextUID();

			var callback = function callback() {
				if (_this3._disposables[id]) {
					delete _this3._disposables[id];
					return cb.apply(_this3, _arguments);
				}
			};

			var cancelCallback = function cancelCallback() {
				delete _this3._disposables[id];
			};

			callback.cancel = cancelCallback;
			callback.dispose = cancelCallback;

			this._disposables[id] = callback;

			return callback;
		},

		/**
	  * @typesign (cb: Function, delay: uint): { clear: (), dispose: () };
	  */
		setTimeout: (function (_setTimeout) {
			function setTimeout(_x2, _x3) {
				return _setTimeout.apply(this, arguments);
			}

			setTimeout.toString = function () {
				return _setTimeout.toString();
			};

			return setTimeout;
		})(function (cb, delay) {
			var _this4 = this;

			var id = nextUID();

			var timeoutId = setTimeout(function () {
				delete _this4._disposables[id];
				cb.call(_this4);
			}, delay);

			var clearTimeout_ = function clearTimeout_() {
				if (_this4._disposables[id]) {
					clearTimeout(timeoutId);
					delete _this4._disposables[id];
				}
			};

			var timeout = this._disposables[id] = {
				clear: clearTimeout_,
				dispose: clearTimeout_
			};

			return timeout;
		}),

		/**
	  * @typesign (cb: Function, delay: uint): { clear: (), dispose: () };
	  */
		setInterval: (function (_setInterval) {
			function setInterval(_x4, _x5) {
				return _setInterval.apply(this, arguments);
			}

			setInterval.toString = function () {
				return _setInterval.toString();
			};

			return setInterval;
		})(function (cb, delay) {
			var _this5 = this;

			var id = nextUID();

			var intervalId = setInterval(function () {
				cb.call(_this5);
			}, delay);

			var clearInterval_ = function clearInterval_() {
				if (_this5._disposables[id]) {
					clearInterval(intervalId);
					delete _this5._disposables[id];
				}
			};

			var interval = this._disposables[id] = {
				clear: clearInterval_,
				dispose: clearInterval_
			};

			return interval;
		}),

		dispose: null,

		/**
	  * @typesign ();
	  */
		destroy: function destroy() {
			if (this.destroyed) {
				return;
			}

			this.block[KEY_VIEW] = null;

			this._content('off', 'change', this._onContentChange);

			var disposables = this._disposables;

			for (var id in disposables) {
				disposables[id].dispose();
			}

			if (this.dispose) {
				try {
					this.dispose();
				} catch (err) {
					logError(err);
				}
			}

			this.destroyed = true;
		}
	});

	module.exports = View;

/***/ },
/* 6 */
/***/ function(module, exports) {

	// Create a range object for efficently rendering strings to elements.
	var range;

	function toElement(str) {
	    if (!range) {
	        range = document.createRange();
	        range.selectNode(document.body);
	    }

	    var fragment;
	    if (range.createContextualFragment) {
	        fragment = range.createContextualFragment(str);
	    } else {
	        fragment = document.createElement('body');
	        fragment.innerHTML = str;
	    }
	    return fragment.childNodes[0];
	}

	var specialElHandlers = {
	    /**
	     * Needed for IE. Apparently IE doesn't think
	     * that "selected" is an attribute when reading
	     * over the attributes using selectEl.attributes
	     */
	    OPTION: function(fromEl, toEl) {
	        if ((fromEl.selected = toEl.selected)) {
	            fromEl.setAttribute('selected', '');
	        } else {
	            fromEl.removeAttribute('selected', '');
	        }
	    },
	    /**
	     * The "value" attribute is special for the <input> element
	     * since it sets the initial value. Changing the "value"
	     * attribute without changing the "value" property will have
	     * no effect since it is only used to the set the initial value.
	     * Similar for the "checked" attribute.
	     */
	    INPUT: function(fromEl, toEl) {
	        fromEl.checked = toEl.checked;

	        if (fromEl.value != toEl.value) {
	            fromEl.value = toEl.value;
	        }

	        if (!toEl.hasAttribute('checked')) {
	            fromEl.removeAttribute('checked');
	        }

	        if (!toEl.hasAttribute('value')) {
	            fromEl.removeAttribute('value');
	        }
	    },

	    TEXTAREA: function(fromEl, toEl) {
	        var newValue = toEl.value;
	        if (fromEl.value != newValue) {
	            fromEl.value = newValue;
	        }

	        if (fromEl.firstChild) {
	            fromEl.firstChild.nodeValue = newValue;
	        }
	    }
	};

	function noop() {}

	/**
	 * Loop over all of the attributes on the target node and make sure the
	 * original DOM node has the same attributes. If an attribute
	 * found on the original node is not on the new node then remove it from
	 * the original node
	 * @param  {HTMLElement} fromNode
	 * @param  {HTMLElement} toNode
	 */
	function morphAttrs(fromNode, toNode) {
	    var attrs = toNode.attributes;
	    var i;
	    var attr;
	    var attrName;
	    var attrValue;
	    var foundAttrs = {};

	    for (i=attrs.length-1; i>=0; i--) {
	        attr = attrs[i];
	        if (attr.specified !== false) {
	            attrName = attr.name;
	            attrValue = attr.value;
	            foundAttrs[attrName] = true;

	            if (fromNode.getAttribute(attrName) !== attrValue) {
	                fromNode.setAttribute(attrName, attrValue);
	            }
	        }
	    }

	    // Delete any extra attributes found on the original DOM element that weren't
	    // found on the target element.
	    attrs = fromNode.attributes;

	    for (i=attrs.length-1; i>=0; i--) {
	        attr = attrs[i];
	        if (attr.specified !== false) {
	            attrName = attr.name;
	            if (!foundAttrs.hasOwnProperty(attrName)) {
	                fromNode.removeAttribute(attrName);
	            }
	        }
	    }
	}

	/**
	 * Copies the children of one DOM element to another DOM element
	 */
	function moveChildren(fromEl, toEl) {
	    var curChild = fromEl.firstChild;
	    while(curChild) {
	        var nextChild = curChild.nextSibling;
	        toEl.appendChild(curChild);
	        curChild = nextChild;
	    }
	    return toEl;
	}

	function morphdom(fromNode, toNode, options) {
	    if (!options) {
	        options = {};
	    }

	    if (typeof toNode === 'string') {
	        toNode = toElement(toNode);
	    }

	    var savedEls = {}; // Used to save off DOM elements with IDs
	    var unmatchedEls = {};
	    var onNodeDiscarded = options.onNodeDiscarded || noop;
	    var onBeforeMorphEl = options.onBeforeMorphEl || noop;
	    var onBeforeMorphElChildren = options.onBeforeMorphElChildren || noop;
	    var onBeforeNodeDiscarded = options.onBeforeNodeDiscarded || noop;
	    var childrenOnly = options.childrenOnly === true;

	    function removeNodeHelper(node, nestedInSavedEl) {
	        var id = node.id;
	        // If the node has an ID then save it off since we will want
	        // to reuse it in case the target DOM tree has a DOM element
	        // with the same ID
	        if (id) {
	            savedEls[id] = node;
	        } else if (!nestedInSavedEl) {
	            // If we are not nested in a saved element then we know that this node has been
	            // completely discarded and will not exist in the final DOM.
	            onNodeDiscarded(node);
	        }

	        if (node.nodeType === 1) {
	            var curChild = node.firstChild;
	            while(curChild) {
	                removeNodeHelper(curChild, nestedInSavedEl || id);
	                curChild = curChild.nextSibling;
	            }
	        }
	    }

	    function walkDiscardedChildNodes(node) {
	        if (node.nodeType === 1) {
	            var curChild = node.firstChild;
	            while(curChild) {


	                if (!curChild.id) {
	                    // We only want to handle nodes that don't have an ID to avoid double
	                    // walking the same saved element.

	                    onNodeDiscarded(curChild);

	                    // Walk recursively
	                    walkDiscardedChildNodes(curChild);
	                }

	                curChild = curChild.nextSibling;
	            }
	        }
	    }

	    function removeNode(node, parentNode, alreadyVisited) {
	        if (onBeforeNodeDiscarded(node) === false) {
	            return;
	        }

	        parentNode.removeChild(node);
	        if (alreadyVisited) {
	            if (!node.id) {
	                onNodeDiscarded(node);
	                walkDiscardedChildNodes(node);
	            }
	        } else {
	            removeNodeHelper(node);
	        }
	    }

	    function morphEl(fromEl, toEl, alreadyVisited, childrenOnly) {
	        if (toEl.id) {
	            // If an element with an ID is being morphed then it is will be in the final
	            // DOM so clear it out of the saved elements collection
	            delete savedEls[toEl.id];
	        }

	        if (!childrenOnly) {
	            if (onBeforeMorphEl(fromEl, toEl) === false) {
	                return;
	            }

	            morphAttrs(fromEl, toEl);

	            if (onBeforeMorphElChildren(fromEl, toEl) === false) {
	                return;
	            }
	        }

	        if (fromEl.tagName != 'TEXTAREA') {
	            var curToNodeChild = toEl.firstChild;
	            var curFromNodeChild = fromEl.firstChild;
	            var curToNodeId;

	            var fromNextSibling;
	            var toNextSibling;
	            var savedEl;
	            var unmatchedEl;

	            outer: while(curToNodeChild) {
	                toNextSibling = curToNodeChild.nextSibling;
	                curToNodeId = curToNodeChild.id;

	                while(curFromNodeChild) {
	                    var curFromNodeId = curFromNodeChild.id;
	                    fromNextSibling = curFromNodeChild.nextSibling;

	                    if (!alreadyVisited) {
	                        if (curFromNodeId && (unmatchedEl = unmatchedEls[curFromNodeId])) {
	                            unmatchedEl.parentNode.replaceChild(curFromNodeChild, unmatchedEl);
	                            morphEl(curFromNodeChild, unmatchedEl, alreadyVisited);
	                            curFromNodeChild = fromNextSibling;
	                            continue;
	                        }
	                    }

	                    var curFromNodeType = curFromNodeChild.nodeType;

	                    if (curFromNodeType === curToNodeChild.nodeType) {
	                        var isCompatible = false;

	                        if (curFromNodeType === 1) { // Both nodes being compared are Element nodes
	                            if (curFromNodeChild.tagName === curToNodeChild.tagName) {
	                                // We have compatible DOM elements
	                                if (curFromNodeId || curToNodeId) {
	                                    // If either DOM element has an ID then we handle
	                                    // those differently since we want to match up
	                                    // by ID
	                                    if (curToNodeId === curFromNodeId) {
	                                        isCompatible = true;
	                                    }
	                                } else {
	                                    isCompatible = true;
	                                }
	                            }

	                            if (isCompatible) {
	                                // We found compatible DOM elements so transform the current "from" node
	                                // to match the current target DOM node.
	                                morphEl(curFromNodeChild, curToNodeChild, alreadyVisited);
	                            }
	                        } else if (curFromNodeType === 3) { // Both nodes being compared are Text nodes
	                            isCompatible = true;
	                            // Simply update nodeValue on the original node to change the text value
	                            curFromNodeChild.nodeValue = curToNodeChild.nodeValue;
	                        }

	                        if (isCompatible) {
	                            curToNodeChild = toNextSibling;
	                            curFromNodeChild = fromNextSibling;
	                            continue outer;
	                        }
	                    }

	                    // No compatible match so remove the old node from the DOM and continue trying
	                    // to find a match in the original DOM
	                    removeNode(curFromNodeChild, fromEl, alreadyVisited);
	                    curFromNodeChild = fromNextSibling;
	                }

	                if (curToNodeId) {
	                    if ((savedEl = savedEls[curToNodeId])) {
	                        morphEl(savedEl, curToNodeChild, true);
	                        curToNodeChild = savedEl; // We want to append the saved element instead
	                    } else {
	                        // The current DOM element in the target tree has an ID
	                        // but we did not find a match in any of the corresponding
	                        // siblings. We just put the target element in the old DOM tree
	                        // but if we later find an element in the old DOM tree that has
	                        // a matching ID then we will replace the target element
	                        // with the corresponding old element and morph the old element
	                        unmatchedEls[curToNodeId] = curToNodeChild;
	                    }
	                }

	                // If we got this far then we did not find a candidate match for our "to node"
	                // and we exhausted all of the children "from" nodes. Therefore, we will just
	                // append the current "to node" to the end
	                fromEl.appendChild(curToNodeChild);

	                curToNodeChild = toNextSibling;
	                curFromNodeChild = fromNextSibling;
	            }

	            // We have processed all of the "to nodes". If curFromNodeChild is non-null then
	            // we still have some from nodes left over that need to be removed
	            while(curFromNodeChild) {
	                fromNextSibling = curFromNodeChild.nextSibling;
	                removeNode(curFromNodeChild, fromEl, alreadyVisited);
	                curFromNodeChild = fromNextSibling;
	            }
	        }

	        var specialElHandler = specialElHandlers[fromEl.tagName];
	        if (specialElHandler) {
	            specialElHandler(fromEl, toEl);
	        }
	    } // END: morphEl(...)

	    var morphedNode = fromNode;
	    var morphedNodeType = morphedNode.nodeType;
	    var toNodeType = toNode.nodeType;

	    if (!childrenOnly) {
	        // Handle the case where we are given two DOM nodes that are not
	        // compatible (e.g. <div> --> <span> or <div> --> TEXT)
	        if (morphedNodeType === 1) {
	            if (toNodeType === 1) {
	                if (fromNode.tagName !== toNode.tagName) {
	                    onNodeDiscarded(fromNode);
	                    morphedNode = moveChildren(fromNode, document.createElement(toNode.tagName));
	                }
	            } else {
	                // Going from an element node to a text node
	                morphedNode = toNode;
	            }
	        } else if (morphedNodeType === 3) { // Text node
	            if (toNodeType === 3) {
	                morphedNode.nodeValue = toNode.nodeValue;
	                return morphedNode;
	            } else {
	                // Text node to something else
	                morphedNode = toNode;
	            }
	        }
	    }

	    if (morphedNode === toNode) {
	        // The "to node" was not compatible with the "from node"
	        // so we had to toss out the "from node" and use the "to node"
	        onNodeDiscarded(fromNode);
	    } else {
	        morphEl(morphedNode, toNode, false, childrenOnly);

	        // Fire the "onNodeDiscarded" event for any saved elements
	        // that never found a new home in the morphed DOM
	        for (var savedElId in savedEls) {
	            if (savedEls.hasOwnProperty(savedElId)) {
	                var savedEl = savedEls[savedElId];
	                onNodeDiscarded(savedEl);
	                walkDiscardedChildNodes(savedEl);
	            }
	        }
	    }

	    if (!childrenOnly && morphedNode !== fromNode && fromNode.parentNode) {
	        // If we had to swap out the from node with a new node because the old
	        // node was not compatible with the target node then we need to
	        // replace the old DOM node in the original DOM tree. This is only
	        // possible if the original DOM node was part of a DOM tree which
	        // we know is the case if it has a parent node.
	        fromNode.parentNode.replaceChild(morphedNode, fromNode);
	    }

	    return morphedNode;
	}

	module.exports = morphdom;

/***/ },
/* 7 */
/***/ function(module, exports) {

	/**
	 * @typesign (el: HTMLElement, name: string): boolean;
	 */
	"use strict";

	var hasClass = undefined;

	if (document.documentElement.classList) {
		hasClass = function (el, name) {
			el.classList.contains(name);
		};
	} else {
		(function () {
			var reNotWhite = /\S+/g;

			hasClass = function (el, name) {
				return (el.className.match(reNotWhite) || []).indexOf(name) != -1;
			};
		})();
	}

	module.exports = hasClass;

/***/ },
/* 8 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _require = __webpack_require__(5);

	var KEY_VIEW = _require.KEY_VIEW;
	var getViewClass = _require.getClass;

	/**
	 * @typesign (el: HTMLElement): Array<HTMLElement>;
	 */
	function findBlocks(el) {
		var blocks = [];

		if (el.hasAttribute('rt-view')) {
			blocks.push(el);
		}

		blocks.push.apply(blocks, el.querySelectorAll('[rt-view]'));

		return blocks;
	}

	/**
	 * @typesign (el: HTMLElement);
	 */
	function initViews(el) {
		var blocks = findBlocks(el);

		for (var i = blocks.length; i;) {
			var block = blocks[--i];

			if (!block[KEY_VIEW]) {
				var viewClass = getViewClass(block.getAttribute('rt-view'));

				if (viewClass) {
					new viewClass(block);
				}
			}
		}
	}

	/**
	 * @typesign (el: HTMLElement);
	 */
	function destroyViews(el) {
		var blocks = findBlocks(el);

		for (var i = blocks.length; i;) {
			var view = blocks[--i][KEY_VIEW];

			if (view) {
				view.destroy();
			}
		}
	}

	module.exports = {
		initViews: initViews,
		destroyViews: destroyViews
	};

/***/ }
/******/ ])
});
;