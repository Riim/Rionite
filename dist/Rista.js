(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define([], factory);
	else if(typeof exports === 'object')
		exports["Rista"] = factory();
	else
		root["Rista"] = factory();
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

	var EventEmitter = _require.EventEmitter;
	var map = _require.map;
	var list = _require.list;
	var cellx = _require.cellx;

	var camelize = __webpack_require__(17);
	var hyphenize = __webpack_require__(18);
	var escapeHTML = __webpack_require__(19);
	var unescapeHTML = __webpack_require__(20);
	var Component = __webpack_require__(21);

	var Rista = module.exports = {
		EventEmitter: EventEmitter,
		map: map,
		list: list,
		cellx: cellx,
		Component: Component,

		utils: {
			camelize: camelize,
			hyphenize: hyphenize,
			escapeHTML: escapeHTML,
			unescapeHTML: unescapeHTML
		}
	};
	Rista.Rista = Rista; // for destructuring

/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	var Map = __webpack_require__(2);
	var Symbol = __webpack_require__(3);
	var logError = __webpack_require__(8);
	var nextUID = __webpack_require__(4);
	var mixin = __webpack_require__(6);
	var createClass = __webpack_require__(5);
	var nextTick = __webpack_require__(9);
	var keys = __webpack_require__(7);
	var ErrorLogger = __webpack_require__(10);
	var EventEmitter = __webpack_require__(11);
	var ObservableMap = __webpack_require__(12);
	var ObservableList = __webpack_require__(15);
	var Cell = __webpack_require__(16);

	var KEY_UID = keys.UID;
	var KEY_CELLS = keys.CELLS;

	var hasOwn = Object.prototype.hasOwnProperty;
	var slice = Array.prototype.slice;
	var global = Function('return this;')();

	ErrorLogger.setHandler(logError);

	/**
	 * @typesign (value?, opts?: {
	 *     debugKey?: string,
	 *     owner?: Object,
	 *     validate?: (value, oldValue),
	 *     onChange?: (evt: cellx~Event) -> ?boolean,
	 *     onError?: (evt: cellx~Event) -> ?boolean
	 * }) -> cellx;
	 *
	 * @typesign (pull: (push: (value), fail: (err), oldValue) -> *, opts?: {
	 *     debugKey?: string
	 *     owner?: Object,
	 *     validate?: (value, oldValue),
	 *     put?: (value, push: (value), fail: (err), oldValue),
	 *     reap?: (),
	 *     onChange?: (evt: cellx~Event) -> ?boolean,
	 *     onError?: (evt: cellx~Event) -> ?boolean
	 * }) -> cellx;
	 */
	function cellx(value, opts) {
		if (!opts) {
			opts = {};
		}

		var initialValue = value;

		function cx(value) {
			var owner = this;

			if (!owner || owner == global) {
				owner = cx;
			}

			if (!hasOwn.call(owner, KEY_CELLS)) {
				Object.defineProperty(owner, KEY_CELLS, {
					value: new Map()
				});
			}

			var cell = owner[KEY_CELLS].get(cx);

			if (!cell) {
				if (value === 'dispose' && arguments.length >= 2) {
					return;
				}

				opts = Object.create(opts);
				opts.owner = owner;

				cell = new Cell(initialValue, opts);

				owner[KEY_CELLS].set(cx, cell);
			}

			switch (arguments.length) {
				case 0: {
					return cell.get();
				}
				case 1: {
					cell.set(value);
					return value;
				}
				default: {
					var method = value;

					switch (method) {
						case 'bind': {
							cx = cx.bind(owner);
							cx.constructor = cellx;
							return cx;
						}
						case 'unwrap': {
							return cell;
						}
						default: {
							var result = Cell.prototype[method].apply(cell, slice.call(arguments, 1));
							return result === cell ? cx : result;
						}
					}
				}
			}
		}
		cx.constructor = cellx;

		if (opts.onChange || opts.onError) {
			cx.call(opts.owner || global);
		}

		return cx;
	}

	cellx.KEY_UID = KEY_UID;
	cellx.ErrorLogger = ErrorLogger;
	cellx.EventEmitter = EventEmitter;
	cellx.ObservableMap = ObservableMap;
	cellx.ObservableList = ObservableList;
	cellx.Cell = Cell;

	/**
	 * @typesign (
	 *     entries?: Object|Array<{ 0, 1 }>|cellx.ObservableMap,
	 *     opts?: { adoptsItemChanges?: boolean }
	 * ) -> cellx.ObservableMap;
	 *
	 * @typesign (
	 *     entries?: Object|Array<{ 0, 1 }>|cellx.ObservableMap,
	 *     adoptsItemChanges?: boolean
	 * ) -> cellx.ObservableMap;
	 */
	function map(entries, opts) {
		return new ObservableMap(entries, typeof opts == 'boolean' ? { adoptsItemChanges: opts } : opts);
	}

	cellx.map = map;

	/**
	 * @typesign (items?: Array|cellx.ObservableList, opts?: {
	 *     adoptsItemChanges?: boolean,
	 *     comparator?: (a, b) -> int,
	 *     sorted?: boolean
	 * }) -> cellx.ObservableList;
	 *
	 * @typesign (items?: Array|cellx.ObservableList, adoptsItemChanges?: boolean) -> cellx.ObservableList;
	 */
	function list(items, opts) {
		return new ObservableList(items, typeof opts == 'boolean' ? { adoptsItemChanges: opts } : opts);
	}

	cellx.list = list;

	/**
	 * @typesign (obj: cellx.EventEmitter, name: string, value) -> cellx.EventEmitter;
	 */
	function defineObservableProperty(obj, name, value) {
		var _name = '_' + name;

		obj[_name] = typeof value == 'function' && value.constructor == cellx ? value : cellx(value);

		Object.defineProperty(obj, name, {
			configurable: true,
			enumerable: true,

			get: function() {
				return this[_name]();
			},

			set: function(value) {
				this[_name](value);
			}
		});

		return obj;
	}

	/**
	 * @typesign (obj: cellx.EventEmitter, props: Object) -> cellx.EventEmitter;
	 */
	function defineObservableProperties(obj, props) {
		Object.keys(props).forEach(function(name) {
			defineObservableProperty(obj, name, props[name]);
		});

		return obj;
	}

	/**
	 * @typesign (obj: cellx.EventEmitter, name: string, value) -> cellx.EventEmitter;
	 * @typesign (obj: cellx.EventEmitter, props: Object) -> cellx.EventEmitter;
	 */
	function define(obj, name, value) {
		if (arguments.length == 3) {
			defineObservableProperty(obj, name, value);
		} else {
			defineObservableProperties(obj, name);
		}

		return obj;
	}

	cellx.define = define;

	cellx.js = {
		Symbol: Symbol,
		Map: Map
	};

	cellx.utils = {
		logError: logError,
		nextUID: nextUID,
		mixin: mixin,
		createClass: createClass,
		nextTick: nextTick,
		defineObservableProperty: defineObservableProperty,
		defineObservableProperties: defineObservableProperties
	};

	cellx.cellx = cellx; // for destructuring

	module.exports = cellx;


/***/ },
/* 2 */
/***/ function(module, exports, __webpack_require__) {

	var Symbol = __webpack_require__(3);
	var nextUID = __webpack_require__(4);
	var createClass = __webpack_require__(5);
	var keys = __webpack_require__(7);

	var KEY_UID = keys.UID;

	var hasOwn = Object.prototype.hasOwnProperty;
	var global = Function('return this;')();

	var Map = global.Map;

	if (!Map) {
		var entryStub = {
			value: void 0
		};

		Map = createClass({
			constructor: function Map(entries) {
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

			has: function has(key) {
				return !!this._entries[this._getValueStamp(key)];
			},

			get: function get(key) {
				return (this._entries[this._getValueStamp(key)] || entryStub).value;
			},

			set: function set(key, value) {
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

			delete: function _delete(key) {
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

			clear: function clear() {
				var entries = this._entries;

				for (var stamp in entries) {
					delete entries[stamp];
				}

				this._objectStamps = {};

				this._first = null;
				this._last = null;

				this.size = 0;
			},

			_getValueStamp: function _getValueStamp(value) {
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

			_getObjectStamp: function _getObjectStamp(obj) {
				if (!hasOwn.call(obj, KEY_UID)) {
					if (!Object.isExtensible(obj)) {
						var stamps = this._objectStamps;
						var stamp;

						for (stamp in stamps) {
							if (hasOwn.call(stamps, stamp) && stamps[stamp] == obj) {
								return stamp;
							}
						}

						stamp = nextUID();
						stamps[stamp] = obj;

						return stamp;
					}

					Object.defineProperty(obj, KEY_UID, {
						value: nextUID()
					});
				}

				return obj[KEY_UID];
			},

			forEach: function forEach(cb, context) {
				context = arguments.length >= 2 ? context : global;

				var entry = this._first;

				while (entry) {
					cb.call(context, entry.value, entry.key, this);

					do {
						entry = entry.next;
					} while (entry && !this._entries[entry.keyStamp]);
				}
			},

			toString: function toString() {
				return '[object Map]';
			}
		});

		[
			['keys', function keys(entry) {
				return entry.key;
			}],
			['values', function values(entry) {
				return entry.value;
			}],
			['entries', function entries(entry) {
				return [entry.key, entry.value];
			}]
		].forEach(function(settings) {
			var getStepValue = settings[1];

			Map.prototype[settings[0]] = function() {
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
							value: void 0,
							done: true
						};
					}
				};
			};
		});
	}

	if (!Map.prototype[Symbol.iterator]) {
		Map.prototype[Symbol.iterator] = Map.prototype.entries;
	}

	module.exports = Map;


/***/ },
/* 3 */
/***/ function(module, exports, __webpack_require__) {

	var nextUID = __webpack_require__(4);

	var Symbol = Function('return this;')().Symbol;

	if (!Symbol) {
		Symbol = function Symbol(key) {
			return '__' + key + '_' + Math.floor(Math.random() * 1e9) + '_' + nextUID() + '__';
		};

		Symbol.iterator = Symbol('iterator');
	}

	module.exports = Symbol;


/***/ },
/* 4 */
/***/ function(module, exports) {

	var uidCounter = 0;

	/**
	 * @typesign () -> string;
	 */
	function nextUID() {
		return String(++uidCounter);
	}

	module.exports = nextUID;


/***/ },
/* 5 */
/***/ function(module, exports, __webpack_require__) {

	var mixin = __webpack_require__(6);

	var hasOwn = Object.prototype.hasOwnProperty;

	var extend;

	/**
	 * @typesign (description: {
	 *     Extends?: Function,
	 *     Implements?: Array<Object|Function>,
	 *     Static?: Object,
	 *     constructor?: Function,
	 *     [key: string]
	 * }) -> Function;
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
			constr = parent == Object ?
				function() {} :
				function() {
					return parent.apply(this, arguments);
				};
		}

		var proto = constr.prototype = Object.create(parent.prototype);

		if (description.Implements) {
			description.Implements.forEach(function(implementation) {
				if (typeof implementation == 'function') {
					Object.keys(implementation).forEach(function(name) {
						Object.defineProperty(constr, name, Object.getOwnPropertyDescriptor(implementation, name));
					});

					mixin(proto, implementation.prototype);
				} else {
					mixin(proto, implementation);
				}
			});

			delete description.Implements;
		}

		Object.keys(parent).forEach(function(name) {
			Object.defineProperty(constr, name, Object.getOwnPropertyDescriptor(parent, name));
		});

		if (description.Static) {
			mixin(constr, description.Static);
			delete description.Static;
		}

		if (constr.extend === void 0) {
			constr.extend = extend;
		}

		mixin(proto, description);

		Object.defineProperty(proto, 'constructor', {
			configurable: true,
			writable: true,
			value: constr
		});

		return constr;
	}

	/**
	 * @this {Function}
	 *
	 * @typesign (description: {
	 *     Implements?: Array<Object|Function>,
	 *     Static?: Object,
	 *     constructor?: Function,
	 *     [key: string]
	 * }) -> Function;
	 */
	extend = function extend(description) {
		description.Extends = this;
		return createClass(description);
	};

	module.exports = createClass;


/***/ },
/* 6 */
/***/ function(module, exports) {

	/**
	 * @typesign (target: Object, source: Object) -> Object;
	 */
	function mixin(target, source) {
		var names = Object.getOwnPropertyNames(source);

		for (var i = 0, l = names.length; i < l; i++) {
			var name = names[i];
			Object.defineProperty(target, name, Object.getOwnPropertyDescriptor(source, name));
		}

		return target;
	}

	module.exports = mixin;


/***/ },
/* 7 */
/***/ function(module, exports, __webpack_require__) {

	var Symbol = __webpack_require__(3);

	var keys = {
		UID: Symbol('uid'),
		CELLS: Symbol('cells')
	};

	module.exports = keys;


/***/ },
/* 8 */
/***/ function(module, exports) {

	function noop() {}

	var map = Array.prototype.map;
	var global = Function('return this;')();

	/**
	 * @typesign (...msg);
	 */
	function logError() {
		var console = global.console;

		(console && console.error || noop).call(console || global, map.call(arguments, function(part) {
			return part === Object(part) && part.stack || part;
		}).join(' '));
	}

	module.exports = logError;


/***/ },
/* 9 */
/***/ function(module, exports, __webpack_require__) {

	var ErrorLogger = __webpack_require__(10);

	var global = Function('return this;')();

	/**
	 * @typesign (cb: ());
	 */
	var nextTick;

	if (global.process && process.toString() == '[object process]' && process.nextTick) {
		nextTick = process.nextTick;
	} else if (global.setImmediate) {
		nextTick = function nextTick(cb) {
			setImmediate(cb);
		};
	} else if (global.Promise && Promise.toString().indexOf('[native code]') != -1) {
		var prm = Promise.resolve();

		nextTick = function nextTick(cb) {
			prm.then(function() {
				cb();
			});
		};
	} else {
		var queue;

		global.addEventListener('message', function() {
			if (queue) {
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
		});

		nextTick = function nextTick(cb) {
			if (queue) {
				queue.push(cb);
			} else {
				queue = [cb];
				postMessage('__tic__', '*');
			}
		};
	}

	module.exports = nextTick;


/***/ },
/* 10 */
/***/ function(module, exports) {

	var ErrorLogger = {
		_handler: null,

		/**
		 * @typesign (handler: (...msg));
		 */
		setHandler: function setHandler(handler) {
			this._handler = handler;
		},

		/**
		 * @typesign (...msg);
		 */
		log: function log() {
			this._handler.apply(this, arguments);
		}
	};

	module.exports = ErrorLogger;


/***/ },
/* 11 */
/***/ function(module, exports, __webpack_require__) {

	var Symbol = __webpack_require__(3);
	var createClass = __webpack_require__(5);
	var ErrorLogger = __webpack_require__(10);

	var hasOwn = Object.prototype.hasOwnProperty;

	var KEY_INNER = Symbol('inner');

	/**
	 * @typedef {{
	 *     target?: Object,
	 *     type: string,
	 *     bubbles?: boolean,
	 *     isPropagationStopped?: boolean
	 * }} cellx~Event
	 */

	/**
	 * @class cellx.EventEmitter
	 * @extends {Object}
	 * @typesign new EventEmitter() -> cellx.EventEmitter;
	 */
	var EventEmitter = createClass({
		Static: {
			KEY_INNER: KEY_INNER
		},

		constructor: function EventEmitter() {
			/**
			 * @type {Object<Array<{
			 *     listener: (evt: cellx~Event) -> ?boolean,
			 *     context
			 * }>>}
			 */
			this._events = Object.create(null);
		},

		/**
		 * @typesign (
		 *     type: string,
		 *     listener: (evt: cellx~Event) -> ?boolean,
		 *     context?
		 * ) -> cellx.EventEmitter;
		 *
		 * @typesign (
		 *     listeners: Object<(evt: cellx~Event) -> ?boolean>,
		 *     context?
		 * ) -> cellx.EventEmitter;
		 */
		on: function on(type, listener, context) {
			if (typeof type == 'object') {
				context = arguments.length >= 2 ? listener : this;

				var listeners = type;

				for (type in listeners) {
					if (hasOwn.call(listeners, type)) {
						this._on(type, listeners[type], context);
					}
				}
			} else {
				this._on(type, listener, arguments.length >= 3 ? context : this);
			}

			return this;
		},
		/**
		 * @typesign (
		 *     type: string,
		 *     listener: (evt: cellx~Event) -> ?boolean,
		 *     context?
		 * ) -> cellx.EventEmitter;
		 *
		 * @typesign (
		 *     listeners: Object<(evt: cellx~Event) -> ?boolean>,
		 *     context?
		 * ) -> cellx.EventEmitter;
		 *
		 * @typesign () -> cellx.EventEmitter;
		 */
		off: function off(type, listener, context) {
			var argCount = arguments.length;

			if (argCount) {
				if (typeof type == 'object') {
					context = argCount >= 2 ? listener : this;

					var listeners = type;

					for (type in listeners) {
						if (hasOwn.call(listeners, type)) {
							this._off(type, listeners[type], context);
						}
					}
				} else {
					this._off(type, listener, argCount >= 3 ? context : this);
				}
			} else if (this._events) {
				this._events = Object.create(null);
			}

			return this;
		},

		/**
		 * @typesign (
		 *     type: string,
		 *     listener: (evt: cellx~Event) -> ?boolean,
		 *     context
		 * );
		 */
		_on: function _on(type, listener, context) {
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
					context: context
				});
			}
		},
		/**
		 * @typesign (
		 *     type: string,
		 *     listener: (evt: cellx~Event) -> ?boolean,
		 *     context
		 * );
		 */
		_off: function _off(type, listener, context) {
			var index = type.indexOf(':');

			if (index != -1) {
				this['_' + type.slice(index + 1)]('off', type.slice(0, index), listener, context);
			} else {
				var events = this._events && this._events[type];

				if (!events) {
					return;
				}

				for (var i = events.length; i;) {
					var evt = events[--i];

					if ((evt.listener == listener || evt.listener[KEY_INNER] === listener) && evt.context === context) {
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
		 *     listener: (evt: cellx~Event) -> ?boolean,
		 *     context?
		 * ) -> cellx.EventEmitter;
		 */
		once: function once(type, listener, context) {
			if (arguments.length < 3) {
				context = this;
			}

			function wrapper() {
				this._off(type, wrapper, context);
				return listener.apply(this, arguments);
			}
			wrapper[KEY_INNER] = listener;

			this._on(type, wrapper, context);

			return this;
		},

		/**
		 * @typesign (evt: cellx~Event) -> cellx~Event;
		 * @typesign (type: string) -> cellx~Event;
		 */
		emit: function emit(evt) {
			if (typeof evt == 'string') {
				evt = {
					target: this,
					type: evt
				};
			} else if (!evt.target) {
				evt.target = this;
			} else if (evt.target != this) {
				throw new TypeError('Event cannot be emitted on this object');
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
		 *     EventEmitter.prototype._handleEvent.call(this, evt);
		 *
		 *     if (evt.bubbles !== false && !evt.isPropagationStopped) {
		 *         var parent = this.getParent();
		 *
		 *         if (parent) {
		 *             parent._handleEvent(evt);
		 *         }
		 *     }
		 * };
		 */
		_handleEvent: function _handleEvent(evt) {
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
		 * @typesign (...msg);
		 */
		_logError: function _logError() {
			ErrorLogger.log.apply(ErrorLogger, arguments);
		}
	});

	module.exports = EventEmitter;


/***/ },
/* 12 */
/***/ function(module, exports, __webpack_require__) {

	var Map = __webpack_require__(2);
	var Symbol = __webpack_require__(3);
	var is = __webpack_require__(13);
	var EventEmitter = __webpack_require__(11);
	var ObservableCollectionMixin = __webpack_require__(14);

	var hasOwn = Object.prototype.hasOwnProperty;
	var isArray = Array.isArray;
	var global = Function('return this;')();

	/**
	 * @class cellx.ObservableMap
	 * @extends {cellx.EventEmitter}
	 * @implements {ObservableCollectionMixin}
	 *
	 * @typesign new ObservableMap(entries?: Object|cellx.ObservableMap|Map|Array<{ 0, 1 }>, opts?: {
	 *     adoptsItemChanges?: boolean
	 * }) -> cellx.ObservableMap;
	 */
	var ObservableMap = EventEmitter.extend({
		Implements: [ObservableCollectionMixin],

		constructor: function ObservableMap(entries, opts) {
			EventEmitter.call(this);
			ObservableCollectionMixin.call(this);

			this._entries = new Map();

			this.size = 0;

			/**
			 * @type {boolean}
			 */
			this.adoptsItemChanges = !opts || opts.adoptsItemChanges !== false;

			if (entries) {
				var mapEntries = this._entries;

				if (entries instanceof ObservableMap || entries instanceof Map) {
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
						if (hasOwn.call(entries, key)) {
							mapEntries.set(key, entries[key]);
							this._registerValue(entries[key]);
						}
					}
				}

				this.size = mapEntries.size;
			}
		},

		/**
		 * @typesign (key) -> boolean;
		 */
		has: function has(key) {
			return this._entries.has(key);
		},

		/**
		 * @typesign (value) -> boolean;
		 */
		contains: function contains(value) {
			return this._valueCounts.has(value);
		},

		/**
		 * @typesign (key) -> *;
		 */
		get: function get(key) {
			return this._entries.get(key);
		},

		/**
		 * @typesign (key, value) -> cellx.ObservableMap;
		 */
		set: function set(key, value) {
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
		 * @typesign (key) -> boolean;
		 */
		delete: function _delete(key) {
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
				value: void 0
			});

			return true;
		},

		/**
		 * @typesign () -> cellx.ObservableMap;
		 */
		clear: function clear() {
			if (!this.size) {
				return this;
			}

			if (this.adoptsItemChanges) {
				this._valueCounts.forEach(function(value) {
					if (value instanceof EventEmitter) {
						value.off('change', this._onItemChange, this);
					}
				}, this);
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
		 * @typesign (
		 *     cb: (value, key, map: cellx.ObservableMap),
		 *     context?
		 * );
		 */
		forEach: function forEach(cb, context) {
			context = arguments.length >= 2 ? context : global;

			this._entries.forEach(function(value, key) {
				cb.call(context, value, key, this);
			}, this);
		},

		/**
		 * @typesign () -> { next: () -> { value, done: boolean } };
		 */
		keys: function keys() {
			return this._entries.keys();
		},

		/**
		 * @typesign () -> { next: () -> { value, done: boolean } };
		 */
		values: function values() {
			return this._entries.values();
		},

		/**
		 * @typesign () -> { next: () -> { value: { 0, 1 }, done: boolean } };
		 */
		entries: function entries() {
			return this._entries.entries();
		},

		/**
		 * @typesign () -> cellx.ObservableMap;
		 */
		clone: function clone() {
			return new this.constructor(this, {
				adoptsItemChanges: this.adoptsItemChanges
			});
		}
	});

	ObservableMap.prototype[Symbol.iterator] = ObservableMap.prototype.entries;

	module.exports = ObservableMap;


/***/ },
/* 13 */
/***/ function(module, exports) {

	/**
	 * @typesign (a, b) -> boolean;
	 */
	var is = Object.is || function is(a, b) {
		if (a === 0 && b === 0) {
			return 1 / a == 1 / b;
		}
		return a === b || (a != a && b != b);
	};

	module.exports = is;


/***/ },
/* 14 */
/***/ function(module, exports, __webpack_require__) {

	var Map = __webpack_require__(2);
	var EventEmitter = __webpack_require__(11);

	var ObservableCollectionMixin = EventEmitter.extend({
		constructor: function ObservableCollectionMixin() {
			/**
			 * @type {Map<*, uint>}
			 */
			this._valueCounts = new Map();
		},

		/**
		 * @typesign (evt: cellx~Event);
		 */
		_onItemChange: function _onItemChange(evt) {
			this._handleEvent(evt);
		},

		/**
		 * @typesign (value);
		 */
		_registerValue: function _registerValue(value) {
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
		_unregisterValue: function _unregisterValue(value) {
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
		}
	});

	module.exports = ObservableCollectionMixin;


/***/ },
/* 15 */
/***/ function(module, exports, __webpack_require__) {

	var Symbol = __webpack_require__(3);
	var is = __webpack_require__(13);
	var EventEmitter = __webpack_require__(11);
	var ObservableCollectionMixin = __webpack_require__(14);

	var push = Array.prototype.push;
	var splice = Array.prototype.splice;
	var global = Function('return this;')();

	/**
	 * @typesign (a, b) -> -1|1|0;
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
	 * @implements {ObservableCollectionMixin}
	 *
	 * @typesign new ObservableList(items?: Array|cellx.ObservableList, opts?: {
	 *     adoptsItemChanges?: boolean,
	 *     comparator?: (a, b) -> int,
	 *     sorted?: boolean
	 * }) -> cellx.ObservableList;
	 */
	var ObservableList = EventEmitter.extend({
		Implements: [ObservableCollectionMixin],

		constructor: function ObservableList(items, opts) {
			EventEmitter.call(this);
			ObservableCollectionMixin.call(this);

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
			 * @type {?(a, b) -> int}
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
		 * @typesign (index: ?int, allowedEndIndex?: boolean) -> ?uint;
		 */
		_validateIndex: function _validateIndex(index, allowedEndIndex) {
			if (index === void 0) {
				return index;
			}

			if (index < 0) {
				index += this.length;

				if (index < 0) {
					throw new RangeError('Index out of valid range');
				}
			} else if (index >= (this.length + (allowedEndIndex ? 1 : 0))) {
				throw new RangeError('Index out of valid range');
			}

			return index;
		},

		/**
		 * @typesign (value) -> boolean;
		 */
		contains: function contains(value) {
			return this._valueCounts.has(value);
		},

		/**
		 * @typesign (value, fromIndex?: int) -> int;
		 */
		indexOf: function indexOf(value, fromIndex) {
			return this._items.indexOf(value, this._validateIndex(fromIndex));
		},

		/**
		 * @typesign (value, fromIndex?: int) -> int;
		 */
		lastIndexOf: function lastIndexOf(value, fromIndex) {
			return this._items.lastIndexOf(value, fromIndex === void 0 ? -1 : this._validateIndex(fromIndex));
		},

		/**
		 * @typesign (index: int) -> *;
		 */
		get: function get(index) {
			return this._items[this._validateIndex(index)];
		},

		/**
		 * @typesign (index: int, count?: uint) -> Array;
		 */
		getRange: function getRange(index, count) {
			index = this._validateIndex(index, true);

			var items = this._items;

			if (count === void 0) {
				return items.slice(index);
			}

			if (index + count > items.length) {
				throw new RangeError('Sum of "index" and "count" out of valid range');
			}

			return items.slice(index, index + count);
		},

		/**
		 * @typesign (index: int, value) -> cellx.ObservableList;
		 */
		set: function set(index, value) {
			if (this.sorted) {
				throw new TypeError('Cannot set to sorted list');
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
		 * @typesign (index: int, items: Array) -> cellx.ObservableList;
		 */
		setRange: function setRange(index, items) {
			if (this.sorted) {
				throw new TypeError('Cannot set to sorted list');
			}

			index = this._validateIndex(index);

			var itemCount = items.length;

			if (!itemCount) {
				return this;
			}

			if (index + itemCount > this.length) {
				throw new RangeError('Sum of "index" and "items.length" out of valid range');
			}

			var listItems = this._items;
			var changed = false;

			for (var i = index + itemCount; i > index;) {
				var item = items[--i - index];

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
		 * @typesign (item) -> cellx.ObservableList;
		 */
		add: function add(item) {
			this.addRange([item]);
			return this;
		},

		/**
		 * @typesign (items: Array) -> cellx.ObservableList;
		 */
		addRange: function _addRange(items) {
			if (!items.length) {
				return this;
			}

			addRange(this, items);
			this.emit('change');

			return this;
		},

		/**
		 * @typesign (index: int, item) -> cellx.ObservableList;
		 */
		insert: function insert(index, item) {
			this.insertRange(index, [item]);
			return this;
		},

		/**
		 * @typesign (index: int, items: Array) -> cellx.ObservableList;
		 */
		insertRange: function insertRange(index, items) {
			if (this.sorted) {
				throw new TypeError('Cannot insert to sorted list');
			}

			index = this._validateIndex(index, true);

			var itemCount = items.length;

			if (!itemCount) {
				return this;
			}

			splice.apply(this._items, [index, 0].concat(items));

			for (var i = itemCount; i;) {
				this._registerValue(items[--i]);
			}

			this.length += itemCount;

			this.emit('change');

			return this;
		},

		/**
		 * @typesign (item, fromIndex?: int) -> boolean;
		 */
		remove: function remove(item, fromIndex) {
			var index = this._items.indexOf(item, this._validateIndex(fromIndex));

			if (index == -1) {
				return false;
			}

			this._items.splice(index, 1);
			this._unregisterValue(item);

			this.length--;

			this.emit('change');

			return true;
		},

		/**
		 * @typesign (item, fromIndex?: int) -> boolean;
		 */
		removeAll: function removeAll(item, fromIndex) {
			var items = this._items;
			var index = this._validateIndex(fromIndex);
			var changed = false;

			while ((index = items.indexOf(item, index)) != -1) {
				items.splice(index, 1);
				this._unregisterValue(item);

				changed = true;
			}

			if (!changed) {
				return false;
			}

			this.length = items.length;

			this.emit('change');

			return true;
		},

		/**
		 * @typesign (index: int) -> *;
		 */
		removeAt: function removeAt(index) {
			var removedItem = this._items.splice(this._validateIndex(index), 1)[0];

			this._unregisterValue(removedItem);
			this.length--;

			this.emit('change');

			return removedItem;
		},

		/**
		 * @typesign (index: int, count?: uint) -> Array;
		 */
		removeRange: function removeRange(index, count) {
			index = this._validateIndex(index, true);

			var items = this._items;

			if (count === void 0) {
				count = items.length - index;
			} else if (index + count > items.length) {
				throw new RangeError('Sum of "index" and "count" out of valid range');
			}

			if (!count) {
				return [];
			}

			for (var i = index + count; i > index;) {
				this._unregisterValue(items[--i]);
			}
			var removedItems = items.splice(index, count);

			this.length -= count;

			this.emit('change');

			return removedItems;
		},

		/**
		 * @typesign () -> cellx.ObservableList;
		 */
		clear: function clear() {
			if (this.length) {
				if (this.adoptsItemChanges) {
					this._valueCounts.forEach(function(value) {
						if (value instanceof EventEmitter) {
							value.off('change', this._onItemChange, this);
						}
					}, this);
				}

				this._items.length = 0;
				this._valueCounts.clear();

				this.length = 0;

				this.emit('change');
			}

			return this;
		},

		/**
		 * @typesign (separator?: string) -> string;
		 */
		join: function join(separator) {
			return this._items.join(separator);
		},

		/**
		 * @typesign (
		 *     cb: (item, index: uint, list: cellx.ObservableList),
		 *     context?
		 * );
		 */
		forEach: null,

		/**
		 * @typesign (
		 *     cb: (item, index: uint, list: cellx.ObservableList) -> *,
		 *     context?
		 * ) -> Array;
		 */
		map: null,

		/**
		 * @typesign (
		 *     cb: (item, index: uint, list: cellx.ObservableList) -> ?boolean,
		 *     context?
		 * ) -> Array;
		 */
		filter: null,

		/**
		 * @typesign (
		 *     cb: (item, index: uint, list: cellx.ObservableList) -> ?boolean,
		 *     context?
		 * ) -> *;
		 */
		find: function(cb, context) {
			context = arguments.length >= 2 ? context : global;

			var items = this._items;

			for (var i = 0, l = items.length; i < l; i++) {
				var item = items[i];

				if (cb.call(context, item, i, this)) {
					return item;
				}
			}
		},

		/**
		 * @typesign (
		 *     cb: (item, index: uint, list: cellx.ObservableList) -> ?boolean,
		 *     context?
		 * ) -> int;
		 */
		findIndex: function(cb, context) {
			context = arguments.length >= 2 ? context : global;

			var items = this._items;

			for (var i = 0, l = items.length; i < l; i++) {
				var item = items[i];

				if (cb.call(context, item, i, this)) {
					return i;
				}
			}

			return -1;
		},

		/**
		 * @typesign (
		 *     cb: (item, index: uint, list: cellx.ObservableList) -> ?boolean,
		 *     context?
		 * ) -> boolean;
		 */
		every: null,

		/**
		 * @typesign (
		 *     cb: (item, index: uint, list: cellx.ObservableList) -> ?boolean,
		 *     context?
		 * ) -> boolean;
		 */
		some: null,

		/**
		 * @typesign (
		 *     cb: (accumulator, item, index: uint, list: cellx.ObservableList) -> *,
		 *     initialValue?
		 * ) -> *;
		 */
		reduce: null,

		/**
		 * @typesign (
		 *     cb: (accumulator, item, index: uint, list: cellx.ObservableList) -> *,
		 *     initialValue?
		 * ) -> *;
		 */
		reduceRight: null,

		/**
		 * @typesign () -> cellx.ObservableList;
		 */
		clone: function clone() {
			return new this.constructor(this, {
				adoptsItemChanges: this.adoptsItemChanges,
				comparator: this.comparator,
				sorted: this.sorted
			});
		},

		/**
		 * @typesign () -> Array;
		 */
		toArray: function toArray() {
			return this._items.slice();
		},

		/**
		 * @typesign () -> string;
		 */
		toString: function toString() {
			return this._items.join();
		}
	});

	['forEach', 'map', 'filter', 'every', 'some'].forEach(function(name) {
		ObservableList.prototype[name] = function(cb, context) {
			context = arguments.length >= 2 ? context : global;

			return this._items[name](function(item, index) {
				return cb.call(context, item, index, this);
			}, this);
		};
	});

	['reduce', 'reduceRight'].forEach(function(name) {
		ObservableList.prototype[name] = function(cb, initialValue) {
			var list = this;
			var items = this._items;

			function wrapper(accumulator, item, index) {
				return cb(accumulator, item, index, list);
			}

			return arguments.length >= 2 ? items[name](wrapper, initialValue) : items[name](wrapper);
		};
	});

	[
		['keys', function keys(index) {
			return index;
		}],
		['values', function values(index, item) {
			return item;
		}],
		['entries', function entries(index, item) {
			return [index, item];
		}]
	].forEach(function(settings) {
		var getStepValue = settings[1];

		ObservableList.prototype[settings[0]] = function() {
			var items = this._items;
			var index = 0;
			var done = false;

			return {
				next: function() {
					if (!done) {
						if (index < items.length) {
							return {
								value: getStepValue(index, items[index++]),
								done: false
							};
						}

						done = true;
					}

					return {
						value: void 0,
						done: true
					};
				}
			};
		};
	});

	ObservableList.prototype[Symbol.iterator] = ObservableList.prototype.values;

	module.exports = ObservableList;


/***/ },
/* 16 */
/***/ function(module, exports, __webpack_require__) {

	var is = __webpack_require__(13);
	var nextTick = __webpack_require__(9);
	var EventEmitter = __webpack_require__(11);

	var slice = Array.prototype.slice;

	var MAX_SAFE_INTEGER = Number.MAX_SAFE_INTEGER || 0x1fffffffffffff;
	var KEY_INNER = EventEmitter.KEY_INNER;

	var pushingIndexCounter = 0;

	var releasePlan = [];

	var releasePlanIndex = MAX_SAFE_INTEGER;
	var releasePlanToIndex = -1;

	var releasePlanned = false;
	var currentlyRelease = false;

	var releaseVersion = 1;

	function release() {
		if (!releasePlanned) {
			return;
		}

		releasePlanned = false;
		currentlyRelease = true;

		var queue = releasePlan[releasePlanIndex];

		for (;;) {
			var cell = (queue || []).shift();

			if (!cell) {
				queue = releasePlan[++releasePlanIndex];
				continue;
			}

			var oldReleasePlanIndex = releasePlanIndex;

			var level = cell._level;
			var changeEvent = cell._changeEvent;

			if (!changeEvent) {
				if (level > releasePlanIndex || cell._levelInRelease == -1) {
					if (!queue.length) {
						if (++releasePlanIndex > releasePlanToIndex) {
							break;
						}

						queue = releasePlan[releasePlanIndex];
					}

					continue;
				}

				cell.pull();

				level = cell._level;
				changeEvent = cell._changeEvent;

				if (releasePlanIndex == oldReleasePlanIndex) {
					if (level > releasePlanIndex) {
						if (!queue.length) {
							queue = releasePlan[++releasePlanIndex];
						}

						continue;
					}
				} else {
					if (changeEvent) {
						queue.unshift(cell);
					} else if (level <= oldReleasePlanIndex) {
						cell._levelInRelease = -1;
					}

					queue = releasePlan[releasePlanIndex];
					continue;
				}
			}

			cell._levelInRelease = -1;

			if (changeEvent) {
				cell._fixedValue = cell._value;
				cell._changeEvent = null;

				if (cell._events.change) {
					cell._handleEvent(changeEvent);
				}

				var pushingIndex = cell._pushingIndex;
				var slaves = cell._slaves;

				for (var i = 0, l = slaves.length; i < l; i++) {
					var slave = slaves[i];

					if (slave._level <= level) {
						slave._level = level + 1;
					}

					if (pushingIndex > slave._pushingIndex) {
						slave._pushingIndex = pushingIndex;
						slave._changeEvent = null;

						slave._addToRelease();
					}
				}
			}

			if (releasePlanIndex == oldReleasePlanIndex) {
				if (queue.length) {
					continue;
				}

				if (++releasePlanIndex > releasePlanToIndex) {
					break;
				}
			}

			queue = releasePlan[releasePlanIndex];
		}

		releasePlanIndex = MAX_SAFE_INTEGER;
		releasePlanToIndex = -1;

		currentlyRelease = false;

		releaseVersion++;
	}

	var currentCell = null;
	var error = {
		original: null
	};

	/**
	 * @typesign (value);
	 */
	function defaultPut(value, push) {
		push(value);
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
	 * @typesign new Cell(value?, opts?: {
	 *     debugKey?: string,
	 *     owner?: Object,
	 *     get?: (value) -> *,
	 *     validate?: (value, oldValue),
	 *     merge: (value, oldValue) -> *,
	 *     onChange?: (evt: cellx~Event) -> ?boolean,
	 *     onError?: (evt: cellx~Event) -> ?boolean
	 * }) -> cellx.Cell;
	 *
	 * @typesign new Cell(pull: (push: (value), fail: (err), oldValue) -> *, opts?: {
	 *     debugKey?: string,
	 *     owner?: Object,
	 *     get?: (value) -> *,
	 *     validate?: (value, oldValue),
	 *     merge: (value, oldValue) -> *,
	 *     put?: (value, push: (value), fail: (err), oldValue),
	 *     reap?: (),
	 *     onChange?: (evt: cellx~Event) -> ?boolean,
	 *     onError?: (evt: cellx~Event) -> ?boolean
	 * }) -> cellx.Cell;
	 */
	var Cell = EventEmitter.extend({
		constructor: function Cell(value, opts) {
			EventEmitter.call(this);

			if (!opts) {
				opts = {};
			}

			var cell = this;

			this.debugKey = opts.debugKey;

			this.owner = opts.owner || this;

			this._pull = typeof value == 'function' ? value : null;
			this._get = opts.get || null;

			this._validate = opts.validate || null;
			this._merge = opts.merge || null;

			this._put = opts.put || defaultPut;

			var push = this.push;
			var fail = this.fail;

			this.push = function(value) { push.call(cell, value); };
			this.fail = function(err) { fail.call(cell, err); };

			this._onFulfilled = this._onRejected = null;

			this._reap = opts.reap || null;

			if (this._pull) {
				this._fixedValue = this._value = void 0;
			} else {
				if (this._validate) {
					this._validate(value, void 0);
				}
				if (this._merge) {
					value = this._merge(value, void 0);
				}

				this._fixedValue = this._value = value;

				if (value instanceof EventEmitter) {
					value.on('change', this._onValueChange, this);
				}
			}

			this._error = null;
			this._errorCell = null;

			this._pushingIndex = 0;
			this._version = 0;

			this._inited = false;
			this._currentlyPulls = false;
			this._active = false;
			this._hasFollowers = false;

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

			this._level = 0;
			this._levelInRelease = -1;

			this._pending = this._fulfilled = this._rejected = false;

			this._changeEvent = null;
			this._canCancelChange = true;

			this._lastErrorEvent = null;

			if (opts.onChange) {
				this.on('change', opts.onChange);
			}
			if (opts.onError) {
				this.on('error', opts.onError);
			}
		},

		/**
		 * @override
		 */
		on: function on(type, listener, context) {
			if (releasePlanned) {
				release();
			}

			this._activate();

			if (typeof type == 'object') {
				EventEmitter.prototype.on.call(this, type, arguments.length >= 2 ? listener : this.owner);
			} else {
				EventEmitter.prototype.on.call(this, type, listener, arguments.length >= 3 ? context : this.owner);
			}

			this._hasFollowers = true;

			return this;
		},
		/**
		 * @override
		 */
		off: function off(type, listener, context) {
			if (releasePlanned) {
				release();
			}

			var argCount = arguments.length;

			if (argCount) {
				if (typeof type == 'object') {
					EventEmitter.prototype.off.call(this, type, argCount >= 2 ? listener : this.owner);
				} else {
					EventEmitter.prototype.off.call(this, type, listener, argCount >= 3 ? context : this.owner);
				}
			} else {
				EventEmitter.prototype.off.call(this);
			}

			if (!this._slaves.length && !this._events.change && !this._events.error) {
				this._hasFollowers = false;
				this._deactivate();
			}

			return this;
		},

		/**
		 * @typesign (
		 *     listener: (evt: cellx~Event) -> ?boolean,
		 *     context?
		 * ) -> cellx.Cell;
		 */
		addChangeListener: function addChangeListener(listener, context) {
			return this.on('change', listener, arguments.length >= 2 ? context : this.owner);
		},
		/**
		 * @typesign (
		 *     listener: (evt: cellx~Event) -> ?boolean,
		 *     context?
		 * ) -> cellx.Cell;
		 */
		removeChangeListener: function removeChangeListener(listener, context) {
			return this.off('change', listener, arguments.length >= 2 ? context : this.owner);
		},

		/**
		 * @typesign (
		 *     listener: (evt: cellx~Event) -> ?boolean,
		 *     context?
		 * ) -> cellx.Cell;
		 */
		addErrorListener: function addErrorListener(listener, context) {
			return this.on('error', listener, arguments.length >= 2 ? context : this.owner);
		},
		/**
		 * @typesign (
		 *     listener: (evt: cellx~Event) -> ?boolean,
		 *     context?
		 * ) -> cellx.Cell;
		 */
		removeErrorListener: function removeErrorListener(listener, context) {
			return this.off('error', listener, arguments.length >= 2 ? context : this.owner);
		},

		/**
		 * @typesign (
		 *     listener: (err: ?Error, evt: cellx~Event) -> ?boolean,
		 *     context?
		 * ) -> cellx.Cell;
		 */
		subscribe: function subscribe(listener, context) {
			function wrapper(evt) {
				return listener.call(this, evt.error || null, evt);
			}
			wrapper[KEY_INNER] = listener;

			if (arguments.length < 2) {
				context = this.owner;
			}

			return this
				.on('change', wrapper, context)
				.on('error', wrapper, context);
		},
		/**
		 * @typesign (
		 *     listener: (err: ?Error, evt: cellx~Event) -> ?boolean,
		 *     context?
		 * ) -> cellx.Cell;
		 */
		unsubscribe: function unsubscribe(listener, context) {
			if (arguments.length < 2) {
				context = this.owner;
			}

			return this
				.off('change', listener, context)
				.off('error', listener, context);
		},

		/**
		 * @typesign (slave: cellx.Cell);
		 */
		_registerSlave: function _registerSlave(slave) {
			this._activate();

			this._slaves.push(slave);
			this._hasFollowers = true;
		},
		/**
		 * @typesign (slave: cellx.Cell);
		 */
		_unregisterSlave: function _unregisterSlave(slave) {
			this._slaves.splice(this._slaves.indexOf(slave), 1);

			if (!this._slaves.length && !this._events.change && !this._events.error) {
				this._hasFollowers = false;
				this._deactivate();
			}
		},

		/**
		 * @typesign ();
		 */
		_activate: function _activate() {
			if (!this._pull || this._active || this._inited && !this._masters) {
				return;
			}

			if (this._version < releaseVersion) {
				var value = this._tryPull();

				if (value === error) {
					this._fail(error.original, true);
				} else {
					this._push(value, true);
				}
			}

			var masters = this._masters;

			if (masters) {
				for (var i = masters.length; i;) {
					masters[--i]._registerSlave(this);
				}

				this._active = true;
			}
		},
		/**
		 * @typesign ();
		 */
		_deactivate: function _deactivate() {
			if (!this._active) {
				return;
			}

			var masters = this._masters;

			for (var i = masters.length; i;) {
				masters[--i]._unregisterSlave(this);
			}

			this._active = false;

			if (this._reap) {
				this._reap.call(this.owner);
			}
		},

		/**
		 * @typesign ();
		 */
		_addToRelease: function _addToRelease() {
			var level = this._level;

			if (level <= this._levelInRelease) {
				return;
			}

			(releasePlan[level] || (releasePlan[level] = [])).push(this);

			if (releasePlanIndex > level) {
				releasePlanIndex = level;
			}
			if (releasePlanToIndex < level) {
				releasePlanToIndex = level;
			}

			this._levelInRelease = level;

			if (!releasePlanned && !currentlyRelease) {
				releasePlanned = true;
				nextTick(release);
			}
		},

		/**
		 * @typesign (evt: cellx~Event);
		 */
		_onValueChange: function _onValueChange(evt) {
			if (this._changeEvent) {
				evt.prev = this._changeEvent;
				this._changeEvent = evt;

				if (this._value === this._fixedValue) {
					this._canCancelChange = false;
				}
			} else {
				evt.prev = null;
				this._changeEvent = evt;
				this._canCancelChange = false;

				this._addToRelease();
			}
		},

		/**
		 * @typesign () -> cellx.Cell;
		 */
		pull: function pull() {
			if (!this._pull) {
				return this;
			}

			if (releasePlanned) {
				release();
			}

			var hasFollowers = this._hasFollowers;

			var oldMasters;
			var oldLevel;

			if (hasFollowers) {
				oldMasters = this._masters || [];
				oldLevel = this._level;
			}

			this._pending = true;
			this._fulfilled = this._rejected = false;

			var value = this._tryPull();

			if (hasFollowers) {
				var masters = this._masters || [];
				var masterCount = masters.length;
				var notFoundMasterCount = 0;

				for (var i = masterCount; i;) {
					var master = masters[--i];

					if (oldMasters.indexOf(master) == -1) {
						master._registerSlave(this);
						notFoundMasterCount++;
					}
				}

				if (masterCount - notFoundMasterCount < oldMasters.length) {
					for (var j = oldMasters.length; j;) {
						var oldMaster = oldMasters[--j];

						if (masters.indexOf(oldMaster) == -1) {
							oldMaster._unregisterSlave(this);
						}
					}
				}

				this._active = !!masterCount;

				if (currentlyRelease && this._level > oldLevel) {
					this._addToRelease();
					return this;
				}
			}

			if (value === error) {
				this._fail(error.original, true);
			} else {
				this._push(value, true);
			}

			return this;
		},

		/**
		 * @typesign () -> *;
		 */
		_tryPull: function _tryPull() {
			if (this._currentlyPulls) {
				throw new TypeError('Circular pulling detected');
			}

			var prevCell = currentCell;
			currentCell = this;

			this._currentlyPulls = true;
			this._masters = null;
			this._level = 0;

			try {
				return this._pull.call(this.owner, this.push, this.fail, this._value);
			} catch (err) {
				error.original = err;
				return error;
			} finally {
				currentCell = prevCell;

				this._version = releaseVersion + currentlyRelease;

				this._inited = true;
				this._currentlyPulls = false;
			}
		},

		/**
		 * @typesign () -> *;
		 */
		get: function get() {
			if (releasePlanned && this._pull) {
				release();
			}

			if (this._pull && !this._active && this._version < releaseVersion && (!this._inited || this._masters)) {
				var value = this._tryPull();

				if (this._hasFollowers) {
					var masters = this._masters;

					if (masters) {
						for (var i = masters.length; i;) {
							masters[--i]._registerSlave(this);
						}

						this._active = true;
					}
				}

				if (value === error) {
					this._fail(error.original, true);
				} else {
					this._push(value, true);
				}
			}

			if (currentCell) {
				var currentCellMasters = currentCell._masters;
				var level = this._level;

				if (currentCellMasters) {
					if (currentCellMasters.indexOf(this) == -1) {
						currentCellMasters.push(this);

						if (currentCell._level <= level) {
							currentCell._level = level + 1;
						}
					}
				} else {
					currentCell._masters = [this];
					currentCell._level = level + 1;
				}
			}

			return this._get ? this._get(this._value) : this._value;
		},

		/**
		 * @typesign (value) -> cellx.Cell;
		 */
		set: function set(value) {
			var oldValue = this._value;

			if (this._validate) {
				this._validate(value, oldValue);
			}
			if (this._merge) {
				value = this._merge(value, oldValue);
			}

			this._put.call(this.owner, value, this.push, this.fail, oldValue);

			return this;
		},

		/**
		 * @typesign (value) -> cellx.Cell;
		 */
		push: function push(value) {
			this._push(value, false);
			return this;
		},

		/**
		 * @typesign (value, afterPull: boolean = false);
		 */
		_push: function _push(value, afterPull) {
			this._setError(null);

			if (!afterPull) {
				this._pushingIndex = ++pushingIndexCounter;
			}

			var oldValue = this._value;

			if (is(value, oldValue)) {
				return;
			}

			this._value = value;

			if (oldValue instanceof EventEmitter) {
				oldValue.off('change', this._onValueChange, this);
			}
			if (value instanceof EventEmitter) {
				value.on('change', this._onValueChange, this);
			}

			if (this._hasFollowers) {
				if (this._changeEvent) {
					if (is(value, this._fixedValue) && this._canCancelChange) {
						this._levelInRelease = -1;
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
					this._changeEvent = {
						target: this,
						type: 'change',
						oldValue: oldValue,
						value: value,
						prev: null
					};
					this._canCancelChange = true;

					this._addToRelease();
				}
			} else {
				if (!currentlyRelease && !afterPull) {
					releaseVersion++;
				}

				this._fixedValue = value;
			}

			if (!afterPull && this._pending) {
				this._pending = false;
				this._fulfilled = true;

				if (this._onFulfilled) {
					this._onFulfilled(value);
				}
			}
		},

		/**
		 * @typesign (err) -> cellx.Cell;
		 */
		fail: function fail(err) {
			this._fail(err, false);
			return this;
		},

		/**
		 * @typesign (err, afterPull: boolean = false);
		 */
		_fail: function _fail(err, afterPull) {
			this._logError(err);

			if (!(err instanceof Error)) {
				err = new Error(String(err));
			}

			if (!afterPull && this._pending) {
				this._pending = false;
				this._rejected = true;

				if (this._onRejected) {
					this._onRejected(err);
				}
			}

			this._handleErrorEvent({
				type: 'error',
				error: err
			});
		},

		/**
		 * @typesign (evt: cellx~Event{ error: Error });
		 */
		_handleErrorEvent: function _handleErrorEvent(evt) {
			if (this._lastErrorEvent === evt) {
				return;
			}

			this._setError(evt.error);

			this._lastErrorEvent = evt;
			this._handleEvent(evt);

			var slaves = this._slaves;

			for (var i = 0, l = slaves.length; i < l; i++) {
				slaves[i]._handleErrorEvent(evt);
			}
		},

		/**
		 * @typesign () -> ?Error;
		 */
		getError: function getError() {
			return (this._errorCell || (this._errorCell = new Cell(this._error))).get();
		},

		/**
		 * @typesign (err: ?Error);
		 */
		_setError: function _setError(err) {
			if (this._error === err) {
				return;
			}

			this._error = err;

			if (this._errorCell) {
				this._errorCell.set(err);
			}

			if (!err) {
				var slaves = this._slaves;

				for (var i = 0, l = slaves.length; i < l; i++) {
					slaves[i]._setError(err);
				}
			}
		},

		/**
		 * @typesign (onFulfilled?: (value) -> *, onRejected?: (err) -> *) -> Promise;
		 */
		then: function then(onFulfilled, onRejected) {
			if (releasePlanned) {
				release();
			}

			if (this._fulfilled) {
				return Promise.resolve(this._get ? this._get(this._value) : this._value).then(onFulfilled);
			}

			if (this._rejected) {
				return Promise.reject(this._error).catch(onRejected);
			}

			var cell = this;

			var promise = new Promise(function(resolve, reject) {
				cell._onFulfilled = function onFulfilled(value) {
					cell._onFulfilled = cell._onRejected = null;
					resolve(cell._get ? cell._get(value) : value);
				};

				cell._onRejected = function onRejected(err) {
					cell._onFulfilled = cell._onRejected = null;
					reject(err);
				};
			}).then(onFulfilled, onRejected);

			if (!this._pending) {
				this.pull();
			}

			return promise;
		},

		/**
		 * @typesign (onRejected: (err) -> *) -> Promise;
		 */
		catch: function _catch(onRejected) {
			return this.then(null, onRejected);
		},

		/**
		 * @override
		 */
		_logError: function _logError() {
			var msg = slice.call(arguments);

			if (this.debugKey) {
				msg.unshift('[' + this.debugKey + ']');
			}

			EventEmitter.prototype._logError.apply(this, msg);
		},

		/**
		 * @typesign () -> cellx.Cell;
		 */
		dispose: function dispose() {
			if (releasePlanned) {
				release();
			}

			this._dispose();

			return this;
		},

		/**
		 * @typesign ();
		 */
		_dispose: function _dispose() {
			var slaves = this._slaves;

			for (var i = 0, l = slaves.length; i < l; i++) {
				slaves[i]._dispose();
			}

			this.off();
		}
	});

	module.exports = Cell;


/***/ },
/* 17 */
/***/ function(module, exports) {

	"use strict";

	/**
	 * @typesign (str: string) -> string;
	 */
	function camelize(str) {
		return str.replace(/[\-_]+([a-z]|$)/g, function (match, chr) {
			return chr.toUpperCase();
		});
	}

	module.exports = camelize;

/***/ },
/* 18 */
/***/ function(module, exports) {

	'use strict';

	/**
	 * @typesign (str: string) -> string;
	 */
	function hyphenize(str) {
		return str.replace(/([A-Z])([^A-Z])/g, function (match, chr1, chr2) {
			return '-' + chr1.toLowerCase() + chr2;
		}).replace(/([A-Z]+)/g, function (match, chars) {
			return '-' + chars.toLowerCase();
		}).replace('--', '-').replace(/^-/, '');
	}

	module.exports = hyphenize;

/***/ },
/* 19 */
/***/ function(module, exports) {

	'use strict';

	var reAmpersand = /&/g;
	var reLessThan = /</g;
	var reGreaterThan = />/g;
	var reQuote = /"/g;

	/**
	 * @typesign (str: string) -> string;
	 */
	function escapeHTML(str) {
		return str.replace(reAmpersand, '&amp;').replace(reLessThan, '&lt;').replace(reGreaterThan, '&gt;').replace(reQuote, '&quot;');
	}

	module.exports = escapeHTML;

/***/ },
/* 20 */
/***/ function(module, exports) {

	'use strict';

	var reLessThan = /&lt;/g;
	var reGreaterThan = /&gt;/g;
	var reQuote = /&quot;/g;
	var reAmpersand = /&amp;/g;

	/**
	 * @typesign (str: string) -> string;
	 */
	function unescapeHTML(str) {
		return str.replace(reLessThan, '<').replace(reGreaterThan, '>').replace(reQuote, '"').replace(reAmpersand, '&');
	}

	module.exports = unescapeHTML;

/***/ },
/* 21 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _require = __webpack_require__(1);

	var EventEmitter = _require.EventEmitter;
	var Cell = _require.Cell;
	var _Symbol = _require.js.Symbol;
	var _require$utils = _require.utils;
	var mixin = _require$utils.mixin;
	var createClass = _require$utils.createClass;

	var morphElement = __webpack_require__(22);
	var camelize = __webpack_require__(17);
	var Disposable = __webpack_require__(25);
	var Attributes = __webpack_require__(26);
	var Properties = __webpack_require__(27);
	// let eventTypes = require('./eventTypes');

	var getPrototypeOf = Object.getPrototypeOf;
	var hasOwn = Object.prototype.hasOwnProperty;
	var isArray = Array.isArray;

	var reClosedCustomElementTag = /<(\w+(?:\-\w+)+)([^>]*)\/>/g;
	var lastAppliedAttributes = _Symbol('lastAppliedAttributes');

	/**
	 * @typesign (evt: Event|cellx~Event);
	 */
	function onEvent(evt) {
		var node = evt instanceof Event ? evt.target : evt.target.element;
		var attrName = 'rt-' + evt.type;
		var targets = [];

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

	var currentElement = null;
	var currentComponent = null;

	var elementProtoMixin = {
		ristaComponent: null,

		createdCallback: function createdCallback() {
			if (currentComponent) {
				this.ristaComponent = currentComponent;
			} else {
				currentElement = this;
				this.ristaComponent = new this._ristaComponentConstr();
				currentElement = null;
			}
		},
		attachedCallback: function attachedCallback() {
			this.ristaComponent._elementAttached.set(true);
		},
		detachedCallback: function detachedCallback() {
			this.ristaComponent._elementAttached.set(false);
		},
		attributeChangedCallback: function attributeChangedCallback(name, oldValue, value) {
			var component = this.ristaComponent;
			var attrs = component.elementAttributes;
			var privateName = '_' + name;

			if (hasOwn.call(attrs, privateName)) {
				var attrValue = attrs[privateName];
				var handledOldValue = attrValue.get();

				attrValue.set(value);

				if (component.isReady) {
					var handledValue = attrValue.get();

					component.emit({
						type: 'element-attribute-' + name + '-change',
						oldValue: handledOldValue,
						value: handledValue
					});
					component.emit({
						type: 'element-attribute-change',
						name: name,
						oldValue: handledOldValue,
						value: handledValue
					});

					if (component.elementAttributeChanged) {
						component.elementAttributeChanged(name, handledOldValue, handledValue);
					}
				}
			}
		}
	};

	/**
	 * @typesign () -> string;
	 */
	function renderInner() {
		var template = this.template;

		if (template) {
			return template.render ? template.render(this) : template.call(this, this);
		}

		return '';
	}

	var Component = EventEmitter.extend({
		Implements: [Disposable],

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
				description.elementTagName = elementTagName;

				var cl = createClass(description);
				var elementProto = Object.create(HTMLElement.prototype);

				mixin(elementProto, elementProtoMixin);
				elementProto._ristaComponentConstr = cl;

				document.registerElement(elementTagName, { prototype: elementProto });

				return cl;
			},


			elementAttributes: {}
		},

		element: null,

		elementTagName: void 0,

		_elementAttributes: null,

		get elementAttributes() {
			return this._elementAttributes || (this._elementAttributes = new Attributes(this));
		},

		_props: null,

		get props() {
			return this._props || (this._props = new Properties(this));
		},

		_elementInnerHTML: null,
		_lastAppliedElementInnerHTML: void 0,

		_elementAttached: null,

		initialized: false,
		isReady: false,

		template: null,

		constructor: function Component(props) {
			Disposable.call(this);

			var componentProto = Component.prototype;
			var proto = this.constructor.prototype;

			if (proto == componentProto) {
				throw new TypeError('Component is abstract class');
			}

			var el = void 0;

			if (currentElement) {
				el = this.element = currentElement;
			} else {
				currentComponent = this;
				el = this.element = document.createElement(this.elementTagName);
				currentComponent = null;
			}

			if (this.template || this.renderInner !== renderInner) {
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

			for (var p = proto;;) {
				el.className += ' ' + p.elementTagName;
				p = getPrototypeOf(p);

				if (p == componentProto) {
					break;
				}
			}

			if (props) {
				var attrs = this.elementAttributes;

				for (var name in props) {
					attrs[camelize(name)] = props[name];
				}
			}

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
				var parent = this.getParent();

				if (parent) {
					parent._handleEvent(evt);
				} else {
					onEvent(evt);
				}
			}
		},


		/**
	  * @typesign () -> ?Rista.Component;
	  */
		getParent: function getParent() {
			for (var node; node = (node || this.element).parentNode;) {
				if (node.ristaComponent) {
					return node.ristaComponent;
				}
			}

			return null;
		},
		_onElementInnerHTMLChange: function _onElementInnerHTMLChange() {
			this.update();
		},
		_onElementAttachedChange: function _onElementAttachedChange(_ref) {
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
				this.update();

				if (!this.isReady) {
					this.isReady = true;

					var attributesSchema = this.constructor.elementAttributes;
					var attrs = this.elementAttributes;

					for (var name in attributesSchema) {
						if (typeof attributesSchema[name] != 'function') {
							var camelizedName = camelize(name);
							attrs[camelizedName] = attrs[camelizedName];
						}
					}

					if (this.ready) {
						this.ready();
					}
				}

				if (this.elementAttached) {
					this.elementAttached();
				}
			} else {
				this.dispose();

				if (this.elementDetached) {
					this.elementDetached();
				}
			}
		},


		/**
	  * @typesign () -> string;
	  */
		renderInner: renderInner,

		/**
	  * @typesign () -> Rista.Component;
	  */
		update: function update() {
			if (!this._elementInnerHTML) {
				return this;
			}

			var html = this._elementInnerHTML.get();

			if (html == (this._lastAppliedElementInnerHTML || '')) {
				return this;
			}

			var el = document.createElement('div');
			el.innerHTML = html;

			morphElement(this.element, el, {
				contentOnly: true,

				getElementAttributes: function getElementAttributes(el) {
					return el[lastAppliedAttributes] || el.attributes;
				},
				getElementKey: function getElementKey(el) {
					return el.getAttribute('key');
				},
				onBeforeMorphElementContent: function onBeforeMorphElementContent(el, toEl) {
					var component = el.ristaComponent;

					if (component) {
						el[lastAppliedAttributes] = toEl.attributes;

						if (component.template || component.renderInner !== renderInner) {
							component.props.contentSourceElement = toEl;
							return false;
						}
					}
				}
			});

			this._lastAppliedElementInnerHTML = html;

			return this;
		},


		/**
	  * @typesign (selector: string) -> $|NodeList;
	  */
		$: function (_$) {
			function $(_x) {
				return _$.apply(this, arguments);
			}

			$.toString = function () {
				return _$.toString();
			};

			return $;
		}(function (selector) {
			selector = selector.split('&').join('.' + this.elementTagName);

			return typeof $ == 'function' && $.fn ? $(this.element).find(selector) : this.element.querySelectorAll(selector);
		})
	});

	module.exports = Component;

	// document.addEventListener('DOMContentLoaded', function onDOMContentLoaded() {
	// 	document.removeEventListener('DOMContentLoaded', onDOMContentLoaded);

	// 	eventTypes.forEach(type => {
	// 		document.addEventListener(type, onEvent);
	// 	});
	// });

/***/ },
/* 22 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var specialElementHandlers = __webpack_require__(23);
	var morphElementAttributes = __webpack_require__(24);
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
	        if (!contentOnly) {
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
	            for (var toElChild = toEl.firstChild; toElChild; toElChild = toElChild.nextSibling) {
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
	                            if (getElementKey(nextElChild) === toElChildKey && (toElChildKey ||
	                                isCompatibleElements(nextElChild, toElChild))) {
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
	                            var unmatchedEl = document.createElement(toElChild.tagName);
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
	        var specialElementHandler = specialElementHandlers[elTagName];
	        if (specialElementHandler) {
	            specialElementHandler(el, toEl);
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
/* 23 */
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
/* 24 */
/***/ function(module, exports) {

	"use strict";
	function morphElementAttributes(el, toEl, elAttributes) {
	    var toElAttributes = toEl.attributes;
	    for (var i = 0, l = toElAttributes.length; i < l; i++) {
	        var toElAttr = toElAttributes.item(i);
	        var elAttr = elAttributes.getNamedItem(toElAttr.name);
	        if (!elAttr || elAttr.value != toElAttr.value) {
	            el.setAttribute(toElAttr.name, toElAttr.value);
	        }
	    }
	    for (var i = elAttributes.length; i;) {
	        var elAttr = elAttributes.item(--i);
	        if (!toElAttributes.getNamedItem(elAttr.name)) {
	            el.removeAttribute(elAttr.name);
	        }
	    }
	}
	module.exports = morphElementAttributes;


/***/ },
/* 25 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj; };

	var _require = __webpack_require__(1);

	var EventEmitter = _require.EventEmitter;
	var nextUID = _require.utils.nextUID;


	var isArray = Array.isArray;

	var Disposable = EventEmitter.extend({
		constructor: function Disposable() {
			EventEmitter.call(this);

			/**
	   * @type {Array<{ dispose: () }>}
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
	  * @typesign () -> Rista.Disposable;
	  */
		dispose: function dispose() {
			var disposables = this._disposables;

			for (var id in disposables) {
				disposables[id].dispose();
			}

			return this;
		}
	});

	module.exports = Disposable;

/***/ },
/* 26 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj; };

	var _require = __webpack_require__(1);

	var EventEmitter = _require.EventEmitter;
	var Cell = _require.Cell;
	var Map = _require.js.Map;

	var camelize = __webpack_require__(17);
	var hyphenize = __webpack_require__(18);
	var escapeHTML = __webpack_require__(19);
	var unescapeHTML = __webpack_require__(20);

	var typeHandlers = new Map([[Boolean, [function (value) {
		return value != null ? value != 'no' : false;
	}, function (value) {
		return value ? '' : void 0;
	}]], ['boolean', [function (value, defaultValue) {
		return value != null ? value != 'no' : defaultValue;
	}, function (value, defaultValue) {
		return value ? '' : defaultValue ? 'no' : void 0;
	}]], [Number, [function (value) {
		return value != null ? +value : void 0;
	}, function (value) {
		return value !== void 0 ? String(+value) : void 0;
	}]], ['number', [function (value, defaultValue) {
		return value != null ? +value : defaultValue;
	}, function (value) {
		return value !== void 0 ? String(+value) : void 0;
	}]], [String, [function (value) {
		return value != null ? value : void 0;
	}, function (value) {
		return value !== void 0 ? String(value) : void 0;
	}]], ['string', [function (value, defaultValue) {
		return value != null ? value : defaultValue;
	}, function (value) {
		return value !== void 0 ? String(value) : void 0;
	}]], [Object, [function (value) {
		return value != null ? Object(Function('return ' + unescapeHTML(value) + ';')()) : null;
	}, function (value) {
		return value != null ? escapeHTML(JSON.stringify(value)) : void 0;
	}]], ['object', [function (value, defaultValue) {
		return value != null ? Object(Function('return ' + unescapeHTML(value) + ';')()) : defaultValue;
	}, function (value) {
		return value != null ? escapeHTML(JSON.stringify(value)) : void 0;
	}]]]);

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
				var hyphenizedName = hyphenize(camelizedName);
				var privateName = '_' + hyphenizedName;

				var attrValue = _this[privateName] = new Cell(el.getAttribute(hyphenizedName), {
					merge: function merge(value) {
						return handlers[0].call(component, value, defaultValue);
					}
				});
				var descriptor = {
					configurable: true,
					enumerable: true,

					get: function get() {
						return attrValue.get();
					},
					set: function set(value) {
						value = handlers[1](value, defaultValue);

						if (value === void 0) {
							el.removeAttribute(hyphenizedName);
						} else {
							el.setAttribute(hyphenizedName, value);
						}
					}
				};

				Object.defineProperty(_this, camelizedName, descriptor);

				if (hyphenizedName != camelizedName) {
					Object.defineProperty(_this, hyphenizedName, descriptor);
				}
			};

			for (var name in schema) {
				_loop(name);
			}
		}
	});

	module.exports = Attributes;

/***/ },
/* 27 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _require = __webpack_require__(1);

	var Cell = _require.Cell;
	var createClass = _require.utils.createClass;


	var Properties = createClass({
		constructor: function Properties(component) {
			var contentSourceElement = new Cell(component.element.childNodes, {
				merge: function merge(el) {
					if (typeof el == 'string') {
						var html = el;

						el = document.createElement('div');
						el.innerHTML = html;

						return el;
					}

					return el;
				}
			});

			return Object.create(component.elementAttributes, {
				contentSourceElement: {
					configurable: true,
					enumerable: true,

					get: function get() {
						return contentSourceElement.get();
					},
					set: function set(el) {
						contentSourceElement.set(el);
					}
				}
			});
		}
	});

	module.exports = Properties;

/***/ }
/******/ ])
});
;