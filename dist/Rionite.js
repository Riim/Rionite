(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory(require("cellx"));
	else if(typeof define === 'function' && define.amd)
		define(["cellx"], factory);
	else if(typeof exports === 'object')
		exports["rionite"] = factory(require("cellx"));
	else
		root["Rionite"] = root["rionite"] = factory(root["cellx"]);
})(this, function(__WEBPACK_EXTERNAL_MODULE_0__) {
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
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.l = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// identity function for calling harmory imports with the correct context
/******/ 	__webpack_require__.i = function(value) { return value; };

/******/ 	// define getter function for harmory exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		Object.defineProperty(exports, name, {
/******/ 			configurable: false,
/******/ 			enumerable: true,
/******/ 			get: getter
/******/ 		});
/******/ 	};

/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};

/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 42);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports) {

module.exports = __WEBPACK_EXTERNAL_MODULE_0__;

/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

"use strict";
'use strict';

exports.__esModule = true;

var _cellx = __webpack_require__(0);

var _DisposableMixin = __webpack_require__(14);

var _DisposableMixin2 = _interopRequireDefault(_DisposableMixin);

var _ElementAttributes = __webpack_require__(22);

var _ElementAttributes2 = _interopRequireDefault(_ElementAttributes);

var _registerComponent = __webpack_require__(40);

var _registerComponent2 = _interopRequireDefault(_registerComponent);

var _setElementClasses = __webpack_require__(41);

var _setElementClasses2 = _interopRequireDefault(_setElementClasses);

var _initAttributes = __webpack_require__(38);

var _initAttributes2 = _interopRequireDefault(_initAttributes);

var _bind2 = __webpack_require__(8);

var _bind3 = _interopRequireDefault(_bind2);

var _attachChildComponentElements = __webpack_require__(7);

var _attachChildComponentElements2 = _interopRequireDefault(_attachChildComponentElements);

var _bindEvents = __webpack_require__(37);

var _bindEvents2 = _interopRequireDefault(_bindEvents);

var _eventTypes = __webpack_require__(29);

var _eventTypes2 = _interopRequireDefault(_eventTypes);

var _onEvent = __webpack_require__(39);

var _onEvent2 = _interopRequireDefault(_onEvent);

var _Array = __webpack_require__(3);

var _camelize = __webpack_require__(5);

var _camelize2 = _interopRequireDefault(_camelize);

var _htmlToFragment = __webpack_require__(16);

var _htmlToFragment2 = _interopRequireDefault(_htmlToFragment);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Map = _cellx.JS.Map;
var createClass = _cellx.Utils.createClass;

function created() {}
function initialize() {}
function ready() {}
function elementAttached() {}
function beforeElementDetach() {}
function elementDetached() {}
function elementMoved() {}
function elementAttributeChanged() {}

var Component = _cellx.EventEmitter.extend({
	Implements: [_DisposableMixin2.default],

	Static: {
		register: _registerComponent2.default,

		extend: function extend(elIs, description) {
			description.Extends = this;
			(description.Static || (description.Static = {})).elementIs = elIs;
			return (0, _registerComponent2.default)(createClass(description));
		},

		elementIs: void 0,
		elementExtends: void 0,

		elementAttributes: null,
		props: null,

		i18n: null,

		template: null,

		_rawContent: null,

		_markupBlockNames: null,
		_assetClassNames: null,

		events: null
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
		var attrs = new _ElementAttributes2.default(this.element);

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

	_assets: null,

	isElementAttached: false,

	initialized: false,
	isReady: false,

	_isComponentSilent: void 0,

	constructor: function Component(el, props) {
		_cellx.EventEmitter.call(this);
		_DisposableMixin2.default.call(this);

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
				properties[(0, _camelize2.default)(name)] = props[name];
			}
		}

		this.created();
	},

	/**
  * @override
  */
	_handleEvent: function _handleEvent(evt) {
		_cellx.EventEmitter.prototype._handleEvent.call(this, evt);

		var silent = this._isComponentSilent;

		if (silent === void 0) {
			silent = this._isComponentSilent = this.element.hasAttribute('rt-silent');
		}

		if (!silent && evt.bubbles !== false && !evt.isPropagationStopped) {
			var parentComponent = this.parentComponent;

			if (parentComponent) {
				parentComponent._handleEvent(evt);
			} else {
				(0, _onEvent2.default)(evt);
			}
		}
	},
	_attachElement: function _attachElement() {
		if (!this.initialized) {
			this.initialize();
			this.initialized = true;
		}

		var constr = this.constructor;
		var rawContent = constr._rawContent;
		var el = this.element;

		if (this.isReady) {
			if (rawContent) {
				for (var child; child = el.firstChild;) {
					el.removeChild(child);
				}
			}
		} else {
			(0, _setElementClasses2.default)(el, constr);
			(0, _initAttributes2.default)(this, constr);

			var template = constr.template;

			if (template != null) {
				if (!rawContent) {
					rawContent = constr._rawContent = (0, _htmlToFragment2.default)(typeof template == 'string' ? template : template.render(constr));
				}

				var inputContent = this.props.content = document.createDocumentFragment();

				for (var _child; _child = el.firstChild;) {
					inputContent.appendChild(_child);
				}
			}
		}

		if (rawContent) {
			var content = rawContent.cloneNode(true);

			var _bind = (0, _bind3.default)(content, this);

			var bindings = _bind.bindings;
			var childComponents = _bind.childComponents;


			this._bindings = bindings;

			this.element.appendChild(content);

			if (childComponents) {
				(0, _attachChildComponentElements2.default)(childComponents);
			}

			(0, _bindEvents2.default)(this, constr.events);
		}

		if (!this.isReady) {
			if (!rawContent) {
				(0, _bindEvents2.default)(this, constr.events);
			}

			this.ready();
			this.isReady = true;
		}

		this.elementAttached();
	},
	_detachElement: function _detachElement() {
		this.beforeElementDetach();
		this.dispose();
		this.elementDetached();
	},


	/**
  * @override
  */
	dispose: function dispose() {
		this._destroyBindings();
		_DisposableMixin2.default.prototype.dispose.call(this);
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
	beforeElementDetach: beforeElementDetach,
	elementDetached: elementDetached,
	elementMoved: elementMoved,
	elementAttributeChanged: elementAttributeChanged,

	// Utils

	/**
  * @typesign (name: string, opts?: {
  *     container?: Rionite.Component|HTMLElement,
  *     useCache?: boolean,
  *     all?: boolean
  * }) -> ?Rionite.Component|HTMLElement;
  *
  * @typesign (name: string, useCache?: boolean) -> ?Rionite.Component|HTMLElement;
  */
	$: function $(name, opts) {
		if (typeof opts == 'boolean') {
			opts = { useCache: opts };
		}

		var useCache = !opts || opts.useCache !== false;
		var all = opts && opts.all;

		var assets = this._assets || (this._assets = new Map());
		var asset = useCache && assets.get(all ? name + '*' : name);

		if (!asset) {
			var container = opts && opts.container;

			var constr = this.constructor;
			var className = constr._assetClassNames[name];
			var containerEl = container ? container instanceof Component ? container.element : container : this.element;
			var els = void 0;

			if (className) {
				els = containerEl.getElementsByClassName(className);
			} else {
				var markupBlockNames = constr._markupBlockNames;

				for (var i = markupBlockNames.length; i;) {
					className = markupBlockNames[--i] + '__' + name;

					els = containerEl.getElementsByClassName(className);

					if (els.length) {
						constr._assetClassNames[name] = className;
						break;
					}
				}
			}

			if (all) {
				assets.set(name + '*', els);
				return els;
			}

			var assetEl = els[0];

			asset = assetEl ? assetEl.$c || assetEl : null;
			assets.set(name, asset);
		}

		return asset;
	},


	/**
  * @typesign (name: string, opts?: {
  *     container?: Rionite.Component|HTMLElement,
  *     useCache?: boolean
  * }) -> Array<Rionite.Component|HTMLElement>;
  *
  * @typesign (name: string, useCache?: boolean) -> Array<Rionite.Component|HTMLElement>;
  */
	$$: function $$(name, opts) {
		if (typeof opts == 'boolean') {
			opts = { useCache: opts };
		}

		return _Array.map.call(this.$(name, { __proto__: opts, all: true }), function (el) {
			return el.$c || el;
		});
	}
});

document.addEventListener('DOMContentLoaded', function onDOMContentLoaded() {
	document.removeEventListener('DOMContentLoaded', onDOMContentLoaded);

	_eventTypes2.default.forEach(function (type) {
		document.addEventListener(type, _onEvent2.default);
	});
});

exports.default = Component;

/***/ },
/* 2 */
/***/ function(module, exports, __webpack_require__) {

"use strict";
"use strict";
var keypathToJSExpression_1 = __webpack_require__(31);
var namePattern_1 = __webpack_require__(6);
var keypathPattern_1 = __webpack_require__(30);
var reNameOrNothing = RegExp(namePattern_1["default"] + '|', 'g');
var reKeypathOrNothing = RegExp(keypathPattern_1["default"] + '|', 'g');
var reBooleanOrNothing = /false|true|/g;
var reNumberOrNothing = /(?:[+-]\s*)?(?:0b[01]+|0[0-7]+|0x[0-9a-fA-F]+|(?:(?:0|[1-9]\d*)(?:\.\d+)?|\.\d+)(?:[eE][+-]?\d+)?|Infinity|NaN)|/g;
var reVacuumOrNothing = /null|undefined|void 0|/g;
var NOT_VALUE_AND_NOT_KEYPATH = {};
var ContentNodeType = {
    TEXT: 0,
    BINDING: 1,
    BINDING_KEYPATH: 2,
    BINDING_FORMATTER: 3,
    BINDING_FORMATTER_ARGUMENTS: 4
};
var ContentParser = (function () {
    function ContentParser(content) {
        this.content = content;
    }
    ContentParser.prototype.parse = function () {
        this.at = 0;
        var result = this.result = [];
        for (var index = void 0; (index = this.content.indexOf('{', this.at)) > -1;) {
            this.pushText(this.content.slice(this.at, index));
            this.at = index;
            this.chr = this.content.charAt(index);
            var binding = this.readBinding();
            if (binding) {
                result.push(binding);
            }
            else {
                this.pushText(this.chr);
                this.next('{');
            }
        }
        this.pushText(this.content.slice(this.at));
        return result;
    };
    ContentParser.prototype.pushText = function (value) {
        if (value.length) {
            var result = this.result;
            var resultLen = result.length;
            if (resultLen && result[resultLen - 1].type == ContentNodeType.TEXT) {
                result[resultLen - 1].value = result[resultLen - 1].raw += value;
            }
            else {
                result.push({
                    type: ContentNodeType.TEXT,
                    at: this.at,
                    raw: value,
                    value: value
                });
            }
        }
    };
    ContentParser.prototype.readBinding = function () {
        var bindingAt = this.at;
        this.next('{');
        this.skipWhitespaces();
        var keypath = this.readBindingKeypath();
        if (keypath) {
            var formatters = [];
            for (var formatter = void 0; this.skipWhitespaces() == '|' && (formatter = this.readFormatter());) {
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
    };
    ContentParser.prototype.readBindingKeypath = function () {
        reKeypathOrNothing.lastIndex = this.at;
        var keypath = reKeypathOrNothing.exec(this.content)[0];
        if (keypath) {
            var keypathAt = this.at;
            this.chr = this.content.charAt((this.at += keypath.length));
            return {
                type: ContentNodeType.BINDING_KEYPATH,
                at: keypathAt,
                raw: this.content.slice(keypathAt, this.at),
                value: keypath
            };
        }
        return null;
    };
    ContentParser.prototype.readFormatter = function () {
        var formatterAt = this.at;
        this.next('|');
        this.skipWhitespaces();
        reNameOrNothing.lastIndex = this.at;
        var name = reNameOrNothing.exec(this.content)[0];
        if (name) {
            var args = (this.chr = this.content.charAt((this.at += name.length))) == '(' ?
                this.readFormatterArguments() :
                null;
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
    };
    ContentParser.prototype.readFormatterArguments = function () {
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
    };
    ContentParser.prototype.readValueOrValueKeypath = function () {
        var value = this.readValue();
        return value === NOT_VALUE_AND_NOT_KEYPATH ? this.readValueKeypath() : value;
    };
    ContentParser.prototype.readValue = function () {
        switch (this.chr) {
            case '{': {
                return this.readObject();
            }
            case '[': {
                return this.readArray();
            }
            case "'":
            case '"': {
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
    };
    ContentParser.prototype.readObject = function () {
        var objectAt = this.at;
        this.next('{');
        var obj = '{';
        while (this.skipWhitespaces() != '}') {
            var key = this.chr == "'" || this.chr == '"' ? this.readString() : this.readObjectKey();
            if (key !== NOT_VALUE_AND_NOT_KEYPATH && key !== null && this.skipWhitespaces() == ':') {
                this.next();
                this.skipWhitespaces();
                var v = this.readValueOrValueKeypath();
                if (v !== NOT_VALUE_AND_NOT_KEYPATH) {
                    if (this.skipWhitespaces() == ',') {
                        obj += key + ':' + v + ',';
                        this.next();
                        continue;
                    }
                    else if (this.chr == '}') {
                        obj += key + ':' + v + '}';
                        break;
                    }
                }
            }
            this.at = objectAt;
            this.chr = this.content.charAt(objectAt);
            return NOT_VALUE_AND_NOT_KEYPATH;
        }
        this.next();
        return obj;
    };
    ContentParser.prototype.readObjectKey = function () {
        reNameOrNothing.lastIndex = this.at;
        var key = reNameOrNothing.exec(this.content)[0];
        if (key) {
            this.chr = this.content.charAt((this.at += key.length));
            return key;
        }
        return null;
    };
    ContentParser.prototype.readArray = function () {
        var arrayAt = this.at;
        this.next('[');
        var arr = '[';
        while (this.skipWhitespaces() != ']') {
            if (this.chr == ',') {
                arr += ',';
                this.next();
            }
            else {
                var v = this.readValueOrValueKeypath();
                if (v === NOT_VALUE_AND_NOT_KEYPATH) {
                    this.at = arrayAt;
                    this.chr = this.content.charAt(arrayAt);
                    return NOT_VALUE_AND_NOT_KEYPATH;
                }
                else {
                    arr += v;
                }
            }
        }
        this.next();
        return arr + ']';
    };
    ContentParser.prototype.readBoolean = function () {
        reBooleanOrNothing.lastIndex = this.at;
        var bool = reBooleanOrNothing.exec(this.content)[0];
        if (bool) {
            this.chr = this.content.charAt((this.at += bool.length));
            return bool;
        }
        return NOT_VALUE_AND_NOT_KEYPATH;
    };
    ContentParser.prototype.readNumber = function () {
        reNumberOrNothing.lastIndex = this.at;
        var num = reNumberOrNothing.exec(this.content)[0];
        if (num) {
            this.chr = this.content.charAt((this.at += num.length));
            return num;
        }
        return NOT_VALUE_AND_NOT_KEYPATH;
    };
    ContentParser.prototype.readString = function () {
        if (this.chr != "'" && this.chr != '"') {
            throw {
                name: 'SyntaxError',
                message: "Expected \"'\" or '\"' instead of \"" + this.chr + "\"",
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
            }
            else {
                if (this.chr == '\r' || this.chr == '\n') {
                    break;
                }
                str += this.chr;
            }
        }
        this.at = stringAt;
        this.chr = this.content.charAt(stringAt);
        return NOT_VALUE_AND_NOT_KEYPATH;
    };
    ContentParser.prototype.readVacuum = function () {
        reVacuumOrNothing.lastIndex = this.at;
        var vacuum = reVacuumOrNothing.exec(this.content)[0];
        if (vacuum) {
            this.chr = this.content.charAt((this.at += vacuum.length));
            return vacuum;
        }
        return NOT_VALUE_AND_NOT_KEYPATH;
    };
    ContentParser.prototype.readValueKeypath = function () {
        reKeypathOrNothing.lastIndex = this.at;
        var keypath = reKeypathOrNothing.exec(this.content)[0];
        if (keypath) {
            this.chr = this.content.charAt((this.at += keypath.length));
            return keypathToJSExpression_1["default"](keypath);
        }
        return NOT_VALUE_AND_NOT_KEYPATH;
    };
    ContentParser.prototype.next = function (c) {
        if (c && c != this.chr) {
            throw {
                name: 'SyntaxError',
                message: "Expected \"" + c + "\" instead of \"" + this.chr + "\"",
                at: this.at,
                content: this.content
            };
        }
        return (this.chr = this.content.charAt(++this.at));
    };
    ContentParser.prototype.skipWhitespaces = function () {
        var chr = this.chr;
        while (chr && chr <= ' ') {
            chr = this.next();
        }
        return chr;
    };
    return ContentParser;
}());
exports.__esModule = true;
exports["default"] = ContentParser;
ContentParser.ContentNodeType = ContentNodeType;


/***/ },
/* 3 */
/***/ function(module, exports) {

"use strict";
"use strict";
exports.slice = Array.prototype.slice;
exports.push = Array.prototype.push;
exports.map = Array.prototype.map;


/***/ },
/* 4 */
/***/ function(module, exports) {

"use strict";
"use strict";
exports.hasOwn = Object.prototype.hasOwnProperty;
exports.toString = Object.prototype.toString;


/***/ },
/* 5 */
/***/ function(module, exports) {

"use strict";
"use strict";
var reHyphen = /[-_]+([a-z]|$)/g;
var cache = Object.create(null);
function camelize(str) {
    return cache[str] || (cache[str] = str.replace(reHyphen, function (match, chr) {
        return chr.toUpperCase();
    }));
}
exports.__esModule = true;
exports["default"] = camelize;


/***/ },
/* 6 */
/***/ function(module, exports) {

"use strict";
"use strict";
exports.__esModule = true;
exports["default"] = '[$_a-zA-Z][$\\w]*';


/***/ },
/* 7 */
/***/ function(module, exports) {

"use strict";
"use strict";

exports.__esModule = true;
exports.default = attachChildComponentElements;
function attachChildComponentElements(childComponents) {
	for (var i = 0, l = childComponents.length; i < l; i++) {
		var childComponent = childComponents[i];

		if (!childComponent.isElementAttached) {
			childComponent.isElementAttached = true;
			childComponent._attachElement();
		}
	}
}

/***/ },
/* 8 */
/***/ function(module, exports, __webpack_require__) {

"use strict";
'use strict';

exports.__esModule = true;
exports.default = bind;

var _cellx = __webpack_require__(0);

var _ContentParser = __webpack_require__(2);

var _ContentParser2 = _interopRequireDefault(_ContentParser);

var _compileContent = __webpack_require__(27);

var _compileContent2 = _interopRequireDefault(_compileContent);

var _setAttribute = __webpack_require__(25);

var _setAttribute2 = _interopRequireDefault(_setAttribute);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var ContentNodeType = _ContentParser2.default.ContentNodeType;

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
								var parsedValue = new _ContentParser2.default(value).parse();

								if (parsedValue.length > 1 || parsedValue[0].type == ContentNodeType.BINDING) {
									(function () {
										var name = attr.name;
										var cell = new _cellx.Cell((0, _compileContent2.default)(parsedValue, value), {
											owner: context,
											onChange: function onChange(evt) {
												(0, _setAttribute2.default)(child, name, evt.value);
											}
										});

										(0, _setAttribute2.default)(child, name, cell.get());

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
							var parsedContent = new _ContentParser2.default(content).parse();

							if (parsedContent.length > 1 || parsedContent[0].type == ContentNodeType.BINDING) {
								var _cell = new _cellx.Cell((0, _compileContent2.default)(parsedContent, content), {
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

/***/ },
/* 9 */
/***/ function(module, exports) {

"use strict";
"use strict";
var reEscapableChars = /[&<>"]/g;
var charToEntityMap = Object.create(null);
charToEntityMap['&'] = '&amp;';
charToEntityMap['<'] = '&lt;';
charToEntityMap['>'] = '&gt;';
charToEntityMap['"'] = '&quot;';
function escapeHTML(str) {
    return reEscapableChars.test(str) ? str.replace(reEscapableChars, function (chr) { return charToEntityMap[chr]; }) : str;
}
exports.__esModule = true;
exports["default"] = escapeHTML;


/***/ },
/* 10 */
/***/ function(module, exports) {

"use strict";
"use strict";
var reEscapableChars = /[\\'\r\n]/g;
var charToSpecialMap = Object.create(null);
charToSpecialMap['\\'] = '\\\\';
charToSpecialMap['\''] = '\\\'';
charToSpecialMap['\r'] = '\\r';
charToSpecialMap['\n'] = '\\n';
function escapeString(str) {
    return reEscapableChars.test(str) ? str.replace(reEscapableChars, function (chr) { return charToSpecialMap[chr]; }) : str;
}
exports.__esModule = true;
exports["default"] = escapeString;


/***/ },
/* 11 */
/***/ function(module, exports) {

"use strict";
"use strict";
var reHump = /-?([A-Z])([^A-Z])/g;
var reLongHump = /-?([A-Z]+)/g;
var reMinus = /^-/;
var cache = Object.create(null);
function hyphenize(str) {
    return cache[str] || (cache[str] = str.replace(reHump, function (match, alphaChar, notAlphaChar) {
        return '-' + alphaChar.toLowerCase() + notAlphaChar;
    }).replace(reLongHump, function (match, chars) {
        return '-' + chars.toLowerCase();
    }).replace(reMinus, ''));
}
exports.__esModule = true;
exports["default"] = hyphenize;


/***/ },
/* 12 */
/***/ function(module, exports, __webpack_require__) {

"use strict";
"use strict";
var bindingToJSExpression_1 = __webpack_require__(19);
var formatters_1 = __webpack_require__(13);
var cache = Object.create(null);
function compileBinding(binding) {
    var bindingRaw = binding.raw;
    if (cache[bindingRaw]) {
        return cache[bindingRaw];
    }
    var bindingJSExpr = bindingToJSExpression_1["default"](binding);
    var jsExpr = "var temp; return " + bindingJSExpr.value + ";";
    if (bindingJSExpr.usesFormatters) {
        var inner_1 = Function('formatters', jsExpr);
        return (cache[bindingRaw] = function () {
            return inner_1.call(this, formatters_1["default"]);
        });
    }
    return (cache[bindingRaw] = Function(jsExpr));
}
exports.__esModule = true;
exports["default"] = compileBinding;


/***/ },
/* 13 */
/***/ function(module, exports, __webpack_require__) {

"use strict";
"use strict";
var getText_1 = __webpack_require__(20);
exports.__esModule = true;
exports["default"] = {
    or: function or(value, arg) {
        return value || arg;
    },
    "default": function default_(value, arg) {
        return value === void 0 ? arg : value;
    },
    not: function not(value) {
        return !value;
    },
    eq: function eq(value, arg) {
        return value == arg;
    },
    identical: function identical(value, arg) {
        return value === arg;
    },
    lt: function lt(value, arg) {
        return value < arg;
    },
    lte: function lte(value, arg) {
        return value <= arg;
    },
    gt: function gt(value, arg) {
        return value > arg;
    },
    gte: function gte(value, arg) {
        return value >= arg;
    },
    join: function join(arr, separator) {
        if (separator === void 0) { separator = ', '; }
        return arr.join(separator);
    },
    t: getText_1["default"].t,
    pt: getText_1["default"].pt,
    nt: function nt(count, key) {
        var args = [];
        for (var _i = 2; _i < arguments.length; _i++) {
            args[_i - 2] = arguments[_i];
        }
        args.unshift(count);
        return getText_1["default"]('', key, true, args);
    },
    npt: function npt(count, key, context) {
        var args = [];
        for (var _i = 3; _i < arguments.length; _i++) {
            args[_i - 3] = arguments[_i];
        }
        args.unshift(count);
        return getText_1["default"](context, key, true, args);
    },
    key: function key(obj, key) {
        return obj && obj[key];
    },
    json: function json(value) {
        return JSON.stringify(value);
    }
};


/***/ },
/* 14 */
/***/ function(module, exports, __webpack_require__) {

"use strict";
"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var cellx = __webpack_require__(0);
var EventEmitter = cellx.EventEmitter;
var nextUID = cellx.Utils.nextUID;
var DisposableMixin = (function (_super) {
    __extends(DisposableMixin, _super);
    function DisposableMixin() {
        var _this = _super.call(this) || this;
        _this._disposables = {};
        return _this;
    }
    DisposableMixin.prototype.listenTo = function (target, typeOrListeners, listenerOrContext, context) {
        var _this = this;
        var listenings;
        if (typeof typeOrListeners == 'object') {
            listenings = [];
            if (Array.isArray(typeOrListeners)) {
                if (arguments.length < 4) {
                    context = this;
                }
                for (var _i = 0, typeOrListeners_1 = typeOrListeners; _i < typeOrListeners_1.length; _i++) {
                    var type = typeOrListeners_1[_i];
                    listenings.push(this.listenTo(target, type, listenerOrContext, context));
                }
            }
            else {
                if (arguments.length < 3) {
                    listenerOrContext = this;
                }
                for (var type in typeOrListeners) {
                    listenings.push(this.listenTo(target, type, typeOrListeners[type], listenerOrContext));
                }
            }
        }
        else {
            if (arguments.length < 4) {
                context = this;
            }
            if (Array.isArray(target) || target instanceof NodeList || target instanceof HTMLCollection) {
                listenings = [];
                for (var i = 0, l = target.length; i < l; i++) {
                    listenings.push(this.listenTo(target[i], typeOrListeners, listenerOrContext, context));
                }
            }
            else if (Array.isArray(listenerOrContext)) {
                listenings = [];
                for (var _a = 0, listenerOrContext_1 = listenerOrContext; _a < listenerOrContext_1.length; _a++) {
                    var listener = listenerOrContext_1[_a];
                    listenings.push(this.listenTo(target, typeOrListeners, listener, context));
                }
            }
            else {
                return this._listenTo(target, typeOrListeners, listenerOrContext, context);
            }
        }
        var id = nextUID();
        var stopListening = function () {
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
    };
    DisposableMixin.prototype._listenTo = function (target, type, listener, context) {
        var _this = this;
        if (target instanceof EventEmitter) {
            target.on(type, listener, context);
        }
        else if (target.addEventListener) {
            if (target !== context) {
                listener = listener.bind(context);
            }
            target.addEventListener(type, listener);
        }
        else {
            throw new TypeError('Unable to add a listener');
        }
        var id = nextUID();
        var stopListening = function () {
            if (_this._disposables[id]) {
                if (target instanceof EventEmitter) {
                    target.off(type, listener, context);
                }
                else {
                    target.removeEventListener(type, listener);
                }
                delete _this._disposables[id];
            }
        };
        var listening = this._disposables[id] = {
            stop: stopListening,
            dispose: stopListening
        };
        return listening;
    };
    DisposableMixin.prototype.setTimeout = function (cb, delay) {
        var _this = this;
        var id = nextUID();
        var timeoutId = setTimeout(function () {
            delete _this._disposables[id];
            cb.call(_this);
        }, delay);
        var clearTimeout_ = function () {
            if (_this._disposables[id]) {
                clearTimeout(timeoutId);
                delete _this._disposables[id];
            }
        };
        var timeout = this._disposables[id] = {
            clear: clearTimeout_,
            dispose: clearTimeout_
        };
        return timeout;
    };
    DisposableMixin.prototype.setInterval = function (cb, delay) {
        var _this = this;
        var id = nextUID();
        var intervalId = setInterval(function () {
            cb.call(_this);
        }, delay);
        var clearInterval_ = function () {
            if (_this._disposables[id]) {
                clearInterval(intervalId);
                delete _this._disposables[id];
            }
        };
        var interval = this._disposables[id] = {
            clear: clearInterval_,
            dispose: clearInterval_
        };
        return interval;
    };
    DisposableMixin.prototype.registerCallback = function (cb) {
        var _this = this;
        var id = nextUID();
        var disposable = this;
        var cancelCallback = function () {
            delete _this._disposables[id];
        };
        var wrapper = function wrapper() {
            if (disposable._disposables[id]) {
                delete disposable._disposables[id];
                return cb.apply(disposable, arguments);
            }
        };
        wrapper.cancel = cancelCallback;
        wrapper.dispose = cancelCallback;
        this._disposables[id] = wrapper;
        return wrapper;
    };
    DisposableMixin.prototype.dispose = function () {
        var disposables = this._disposables;
        for (var id in disposables) {
            disposables[id].dispose();
        }
        return this;
    };
    return DisposableMixin;
}(EventEmitter));
exports.__esModule = true;
exports["default"] = DisposableMixin;


/***/ },
/* 15 */
/***/ function(module, exports, __webpack_require__) {

"use strict";
"use strict";
var cellx_1 = __webpack_require__(0);
var queue;
function run() {
    var track = queue;
    queue = null;
    for (var _i = 0, track_1 = track; _i < track_1.length; _i++) {
        var item = track_1[_i];
        try {
            item.callback.call(item.context);
        }
        catch (err) {
            cellx_1.ErrorLogger.log(err);
        }
    }
}
function defer(cb, context) {
    if (queue) {
        queue.push({ callback: cb, context: context });
    }
    else {
        queue = [{ callback: cb, context: context }];
        setTimeout(run, 1);
    }
}
exports.__esModule = true;
exports["default"] = defer;


/***/ },
/* 16 */
/***/ function(module, exports) {

"use strict";
"use strict";
var range = document.createRange();
var htmlToFragment;
if (range.createContextualFragment) {
    var selected_1 = false;
    htmlToFragment = function (html) {
        if (!selected_1) {
            range.selectNode(document.body);
            selected_1 = true;
        }
        return range.createContextualFragment(html);
    };
}
else {
    htmlToFragment = function (html) {
        var el = document.createElement('div');
        var df = document.createDocumentFragment();
        el.innerHTML = html;
        for (var child = void 0; (child = el.firstChild);) {
            df.appendChild(child);
        }
        return df;
    };
}
exports.__esModule = true;
exports["default"] = htmlToFragment;


/***/ },
/* 17 */
/***/ function(module, exports, __webpack_require__) {

"use strict";
"use strict";
var Object_1 = __webpack_require__(4);
function isRegExp(value) {
    return Object_1.toString.call(value) == '[object RegExp]';
}
exports.__esModule = true;
exports["default"] = isRegExp;


/***/ },
/* 18 */
/***/ function(module, exports) {

"use strict";
"use strict";
var reEscapableEntities = /&(?:amp|lt|gt|quot);/g;
var entityToCharMap = Object.create(null);
entityToCharMap['&amp;'] = '&';
entityToCharMap['&lt;'] = '<';
entityToCharMap['&gt;'] = '>';
entityToCharMap['&quot;'] = '"';
function unescapeHTML(str) {
    return reEscapableEntities.test(str) ? str.replace(reEscapableEntities, function (entity) { return entityToCharMap[entity]; }) : str;
}
exports.__esModule = true;
exports["default"] = unescapeHTML;


/***/ },
/* 19 */
/***/ function(module, exports) {

"use strict";
"use strict";
var cache = Object.create(null);
function formattersReducer(jsExpr, formatter) {
    var args = formatter.arguments;
    return "(this['" + formatter.name + "'] || formatters['" + formatter.name + "']).call(this, " + jsExpr + (args && args.value.length ? ', ' + args.value.join(', ') : '') + ")";
}
function bindingToJSExpression(binding) {
    var bindingRaw = binding.raw;
    if (cache[bindingRaw]) {
        return cache[bindingRaw];
    }
    var keypath = binding.keypath.value.split('?');
    var keypathLen = keypath.length;
    var formatters = binding.formatters;
    var usesFormatters = !!formatters.length;
    if (keypathLen == 1) {
        return (cache[bindingRaw] = {
            value: usesFormatters ? formatters.reduce(formattersReducer, 'this.' + keypath[0]) : 'this.' + keypath[0],
            usesFormatters: usesFormatters
        });
    }
    var index = keypathLen - 2;
    var jsExpr = Array(index);
    while (index) {
        jsExpr[--index] = " && (temp = temp" + keypath[index + 1] + ")";
    }
    return (cache[bindingRaw] = {
        value: "(temp = this." + keypath[0] + ")" + jsExpr.join('') + " && " + (usesFormatters ?
            formatters.reduce(formattersReducer, 'temp' + keypath[keypathLen - 1]) :
            'temp' + keypath[keypathLen - 1]),
        usesFormatters: usesFormatters
    });
}
exports.__esModule = true;
exports["default"] = bindingToJSExpression;


/***/ },
/* 20 */
/***/ function(module, exports, __webpack_require__) {

"use strict";
"use strict";
var Object_1 = __webpack_require__(4);
var reInsert = /\{([1-9]\d*|n)(?::((?:[^|]*\|)+?[^}]*))?\}/;
var texts;
var getPluralIndex;
var getText = function getText(context, key, plural, args) {
    var rawText;
    if (Object_1.hasOwn.call(texts, context) && Object_1.hasOwn.call(texts[context], key)) {
        rawText = (plural ? texts[context][key][getPluralIndex(+args[0])] : texts[context][key]);
    }
    else {
        rawText = key;
    }
    var data = Object.create(null);
    for (var i = args.length; i;) {
        data[i] = args[--i];
    }
    if (plural) {
        data.n = args[0];
    }
    var splittedRawText = rawText.split(reInsert);
    var text = [];
    for (var i = 0, l = splittedRawText.length; i < l;) {
        if (i % 3) {
            text.push(splittedRawText[i + 1] ?
                splittedRawText[i + 1].split('|')[getPluralIndex(data[splittedRawText[i]])] :
                data[splittedRawText[i]]);
            i += 2;
        }
        else {
            text.push(splittedRawText[i]);
            i++;
        }
    }
    return text.join('');
};
function configure(config) {
    texts = config.texts;
    getPluralIndex = Function('n', "return " + config.localeSettings.plural + ";");
    getText.localeSettings = config.localeSettings;
}
function t(key) {
    var args = [];
    for (var _i = 1; _i < arguments.length; _i++) {
        args[_i - 1] = arguments[_i];
    }
    return getText('', key, false, args);
}
function pt(key, context) {
    var args = [];
    for (var _i = 2; _i < arguments.length; _i++) {
        args[_i - 2] = arguments[_i];
    }
    return getText(context, key, false, args);
}
function nt(key) {
    var args = [];
    for (var _i = 1; _i < arguments.length; _i++) {
        args[_i - 1] = arguments[_i];
    }
    return getText('', key, true, args);
}
function npt(key, context) {
    var args = [];
    for (var _i = 2; _i < arguments.length; _i++) {
        args[_i - 2] = arguments[_i];
    }
    return getText(context, key, true, args);
}
getText.configure = configure;
getText.t = t;
getText.pt = pt;
getText.nt = nt;
getText.npt = npt;
exports.__esModule = true;
exports["default"] = getText;
configure({
    localeSettings: {
        code: 'ru',
        plural: '(n%100) >= 5 && (n%100) <= 20 ? 2 : (n%10) == 1 ? 0 : (n%10) >= 2 && (n%10) <= 4 ? 1 : 2'
    },
    texts: {}
});


/***/ },
/* 21 */
/***/ function(module, exports, __webpack_require__) {

"use strict";
'use strict';

exports.__esModule = true;

var _cellx = __webpack_require__(0);

var _ContentParser = __webpack_require__(2);

var _ContentParser2 = _interopRequireDefault(_ContentParser);

var _compileBinding = __webpack_require__(12);

var _compileBinding2 = _interopRequireDefault(_compileBinding);

var _bind2 = __webpack_require__(8);

var _bind3 = _interopRequireDefault(_bind2);

var _attachChildComponentElements = __webpack_require__(7);

var _attachChildComponentElements2 = _interopRequireDefault(_attachChildComponentElements);

var _Component = __webpack_require__(1);

var _Component2 = _interopRequireDefault(_Component);

var _Array = __webpack_require__(3);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var nextTick = _cellx.Utils.nextTick;
var ContentNodeType = _ContentParser2.default.ContentNodeType;

exports.default = _Component2.default.extend('rt-if-then', {
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

				var parsedIf = new _ContentParser2.default('{' + props.if + '}').parse();

				if (parsedIf.length > 1 || parsedIf[0].type != ContentNodeType.BINDING) {
					throw new SyntaxError('Invalid value of attribute "if" (' + props.if + ')');
				}

				var getIfValue = (0, _compileBinding2.default)(parsedIf[0]);

				_this._if = new _cellx.Cell(function () {
					return !!getIfValue.call(this);
				}, { owner: props.context });

				_this.initialized = true;
			})();
		}

		this._if.on('change', this._onIfChange, this);

		this._render(false);
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
		if (this.element.parentNode) {
			this._render(true);
		}
	},
	_render: function _render(changed) {
		var _this2 = this;

		if (this._elseMode ? !this._if.get() : this._if.get()) {
			var content = this.props.content.cloneNode(true);

			var _bind = (0, _bind3.default)(content, this.ownerComponent, this.props.context);

			var bindings = _bind.bindings;
			var childComponents = _bind.childComponents;


			this._nodes = _Array.slice.call(content.childNodes);
			this._bindings = bindings;

			this.element.parentNode.insertBefore(content, this.element.nextSibling);

			if (childComponents) {
				(0, _attachChildComponentElements2.default)(childComponents);
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

/***/ },
/* 22 */
/***/ function(module, exports, __webpack_require__) {

"use strict";
'use strict';

exports.__esModule = true;

var _cellx = __webpack_require__(0);

var _attributeTypeHandlerMap = __webpack_require__(26);

var _attributeTypeHandlerMap2 = _interopRequireDefault(_attributeTypeHandlerMap);

var _camelize = __webpack_require__(5);

var _camelize2 = _interopRequireDefault(_camelize);

var _hyphenize = __webpack_require__(11);

var _hyphenize2 = _interopRequireDefault(_hyphenize);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Map = _cellx.JS.Map;

var typeMap = new Map([[Boolean, 'boolean'], ['boolean', 'boolean'], [Number, 'number'], ['number', 'number'], [String, 'string'], ['string', 'string']]);

/**
 * @typesign new ElementAttributes(el: HTMLElement) -> Rionite.ElementAttributes;
 */
var ElementAttributes = _cellx.EventEmitter.extend({
	constructor: function ElementAttributes(el) {
		var _this = this;

		var component = el.$c;
		var attributesConfig = component.constructor.elementAttributes;

		var _loop = function _loop(name) {
			var attrConfig = attributesConfig[name];
			var type = typeof attrConfig;
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
					type = typeof defaultValue;
				} else if (defaultValue !== void 0 && typeMap.get(type) !== typeof defaultValue) {
					throw new TypeError('Specified type does not match type of defaultValue');
				}

				required = attrConfig.required;
				readonly = attrConfig.readonly;
			} else {
				defaultValue = attrConfig;
				required = readonly = false;
			}

			var handlers = _attributeTypeHandlerMap2.default.get(type);

			if (!handlers) {
				throw new TypeError('Unsupported attribute type');
			}

			var camelizedName = (0, _camelize2.default)(name);
			var hyphenizedName = (0, _hyphenize2.default)(name);

			if (required && !el.hasAttribute(hyphenizedName)) {
				throw new TypeError('Property "' + name + '" is required');
			}

			var descriptor = void 0;

			if (readonly) {
				(function () {
					var value = handlers[0](el.getAttribute(hyphenizedName), defaultValue);

					descriptor = {
						configurable: true,
						enumerable: true,

						get: function get() {
							return value;
						},
						set: function set(v) {
							if (v !== value) {
								throw new TypeError('Property "' + name + '" is readonly');
							}
						}
					};
				})();
			} else {
				(function () {
					var oldValue = void 0;
					var value = void 0;
					var isReady = void 0;

					var rawValue = _this['_' + camelizedName] = _this['_' + hyphenizedName] = new _cellx.Cell(el.getAttribute(hyphenizedName), {
						merge: function merge(v, ov) {
							if (v !== ov) {
								oldValue = value;
								value = handlers[0](v, defaultValue);
							}

							isReady = component.isReady;

							return v;
						},
						onChange: function onChange(evt) {
							evt.oldValue = oldValue;
							evt.value = value;

							if (isReady) {
								component.elementAttributeChanged(hyphenizedName, oldValue, value);
							}
						}
					});

					descriptor = {
						configurable: true,
						enumerable: true,

						get: function get() {
							rawValue.get();
							return value;
						},
						set: function set(v) {
							v = handlers[1](v, defaultValue);

							if (v === null) {
								el.removeAttribute(hyphenizedName);
							} else {
								el.setAttribute(hyphenizedName, v);
							}

							rawValue.set(v);
						}
					};
				})();
			}

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

exports.default = ElementAttributes;

/***/ },
/* 23 */
/***/ function(module, exports, __webpack_require__) {

"use strict";
'use strict';

exports.__esModule = true;

var _DisposableMixin = __webpack_require__(14);

var _DisposableMixin2 = _interopRequireDefault(_DisposableMixin);

var _formatters = __webpack_require__(13);

var _formatters2 = _interopRequireDefault(_formatters);

var _getText = __webpack_require__(20);

var _getText2 = _interopRequireDefault(_getText);

var _ElementAttributes = __webpack_require__(22);

var _ElementAttributes2 = _interopRequireDefault(_ElementAttributes);

var _ComponentTemplate = __webpack_require__(24);

var _ComponentTemplate2 = _interopRequireDefault(_ComponentTemplate);

var _Component = __webpack_require__(1);

var _Component2 = _interopRequireDefault(_Component);

var _rtContent = __webpack_require__(33);

var _rtContent2 = _interopRequireDefault(_rtContent);

var _rtIfThen = __webpack_require__(21);

var _rtIfThen2 = _interopRequireDefault(_rtIfThen);

var _rtIfElse = __webpack_require__(34);

var _rtIfElse2 = _interopRequireDefault(_rtIfElse);

var _rtRepeat = __webpack_require__(35);

var _rtRepeat2 = _interopRequireDefault(_rtRepeat);

var _camelize = __webpack_require__(5);

var _camelize2 = _interopRequireDefault(_camelize);

var _hyphenize = __webpack_require__(11);

var _hyphenize2 = _interopRequireDefault(_hyphenize);

var _escapeString = __webpack_require__(10);

var _escapeString2 = _interopRequireDefault(_escapeString);

var _escapeHTML = __webpack_require__(9);

var _escapeHTML2 = _interopRequireDefault(_escapeHTML);

var _unescapeHTML = __webpack_require__(18);

var _unescapeHTML2 = _interopRequireDefault(_unescapeHTML);

var _isRegExp = __webpack_require__(17);

var _isRegExp2 = _interopRequireDefault(_isRegExp);

var _defer = __webpack_require__(15);

var _defer2 = _interopRequireDefault(_defer);

var _htmlToFragment = __webpack_require__(16);

var _htmlToFragment2 = _interopRequireDefault(_htmlToFragment);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Rionite = {
	DisposableMixin: _DisposableMixin2.default,

	formatters: _formatters2.default,
	getText: _getText2.default,

	ElementAttributes: _ElementAttributes2.default,
	ComponentTemplate: _ComponentTemplate2.default,

	Component: _Component2.default,

	Components: {
		RtContent: _rtContent2.default,
		RtIfThen: _rtIfThen2.default,
		RtIfElse: _rtIfElse2.default,
		RtRepeat: _rtRepeat2.default
	},

	Utils: {
		camelize: _camelize2.default,
		hyphenize: _hyphenize2.default,
		escapeString: _escapeString2.default,
		escapeHTML: _escapeHTML2.default,
		unescapeHTML: _unescapeHTML2.default,
		isRegExp: _isRegExp2.default,
		defer: _defer2.default,
		htmlToFragment: _htmlToFragment2.default
	}
};
Rionite.Rionite = Rionite; // for destructuring

module.exports = Rionite.default = Rionite;

/***/ },
/* 24 */
/***/ function(module, exports, __webpack_require__) {

"use strict";
"use strict";
var escapeString_1 = __webpack_require__(10);
var escapeHTML_1 = __webpack_require__(9);
var namePattern_1 = __webpack_require__(6);
var keypathPattern = '(?:' + namePattern_1["default"] + '|\\[\\d+\\])(?:\\.' + namePattern_1["default"] + '|\\[\\d+\\])*';
var re = RegExp('\\{\\{' +
    '(?:' +
    '\\s*(?:' +
    'block\\s+(' + namePattern_1["default"] + ')|(\\/)block|(s)uper\\(\\)|(' + keypathPattern + ')' +
    ')\\s*|\\{\\s*(' + keypathPattern + ')\\s*\\}' +
    ')' +
    '\\}\\}');
var ComponentTemplate = (function () {
    function ComponentTemplate(tmpl, parent) {
        if (parent === void 0) { parent = null; }
        this.parent = parent;
        var currentBlock = { name: null, source: [] };
        var blocks = [currentBlock];
        var blockMap = {};
        var splittedTemplate = tmpl.split(re);
        for (var i = 0, l = splittedTemplate.length; i < l;) {
            if (i % 6) {
                var blockName = splittedTemplate[i];
                if (blockName) {
                    currentBlock.source.push("this." + blockName + ".call(this, data)");
                    currentBlock = { name: blockName, source: [] };
                    blocks.push((blockMap[blockName] = currentBlock));
                }
                else if (splittedTemplate[i + 1]) {
                    if (blocks.length > 1) {
                        blocks.pop();
                        currentBlock = blocks[blocks.length - 1];
                    }
                }
                else if (splittedTemplate[i + 2]) {
                    if (parent && blocks.length > 1 && parent._blockMap[currentBlock.name]) {
                        currentBlock.source.push('$super.call(this, data)');
                    }
                }
                else {
                    var keypath = splittedTemplate[i + 3];
                    currentBlock.source.push(keypath ? "escape(data." + keypath + ")" : 'data.' + splittedTemplate[i + 4]);
                }
                i += 5;
            }
            else {
                var text = splittedTemplate[i];
                if (text) {
                    currentBlock.source.push("'" + escapeString_1["default"](text) + "'");
                }
                i++;
            }
        }
        this._renderer = parent ? parent._renderer : Function('data', 'escape', "return [" + blocks[0].source.join(', ') + "].join('');");
        Object.keys(blockMap).forEach(function (name) {
            var parentBlock = parent && parent._blockMap[name];
            var inner = Function('$super', 'data', 'escape', "return [" + blockMap[name].source.join(', ') + "].join('');");
            this[name] = function (data) {
                return inner.call(this, parentBlock, data, escapeHTML_1["default"]);
            };
        }, (this._blockMap = Object.create(parent && parent._blockMap)));
    }
    ComponentTemplate.prototype.extend = function (tmpl) {
        return new ComponentTemplate(tmpl, this);
    };
    ComponentTemplate.prototype.render = function (data) {
        return this._renderer.call(this._blockMap, data || {}, escapeHTML_1["default"]);
    };
    return ComponentTemplate;
}());
exports.__esModule = true;
exports["default"] = ComponentTemplate;


/***/ },
/* 25 */
/***/ function(module, exports) {

"use strict";
"use strict";
function setAttribute(el, name, value) {
    if (value === false || value == null) {
        el.removeAttribute(name);
    }
    else {
        el.setAttribute(name, value === true ? '' : value);
    }
}
exports.__esModule = true;
exports["default"] = setAttribute;


/***/ },
/* 26 */
/***/ function(module, exports, __webpack_require__) {

"use strict";
"use strict";
var cellx_1 = __webpack_require__(0);
var escapeHTML_1 = __webpack_require__(9);
var unescapeHTML_1 = __webpack_require__(18);
var isRegExp_1 = __webpack_require__(17);
var Map = cellx_1.JS.Map;
exports.__esModule = true;
exports["default"] = new Map([
    [Boolean, [function (value) {
                return value !== null ? value != 'no' : false;
            }, function (value) {
                return value ? '' : null;
            }]],
    ['boolean', [function (value, defaultValue) {
                return value !== null ? value != 'no' : defaultValue;
            }, function (value, defaultValue) {
                return value ? '' : (defaultValue ? 'no' : null);
            }]],
    [Number, [function (value) {
                return value !== null ? +value : void 0;
            }, function (value) {
                return value !== void 0 ? String(+value) : null;
            }]],
    ['number', [function (value, defaultValue) {
                return value !== null ? +value : defaultValue;
            }, function (value) {
                return value !== void 0 ? String(+value) : null;
            }]],
    [String, [function (value) {
                return value !== null ? value : void 0;
            }, function (value) {
                return value !== void 0 ? String(value) : null;
            }]],
    ['string', [function (value, defaultValue) {
                return value !== null ? value : defaultValue;
            }, function (value) {
                return value !== void 0 ? String(value) : null;
            }]],
    [Object, [function (value) {
                return value !== null ? Object(Function("return " + unescapeHTML_1["default"](value) + ";")()) : void 0;
            }, function (value) {
                return value != null ? escapeHTML_1["default"](isRegExp_1["default"](value) ? value.toString() : JSON.stringify(value)) : null;
            }]],
    ['object', [function (value, defaultValue) {
                return value !== null ? Object(Function("return " + unescapeHTML_1["default"](value) + ";")()) : defaultValue;
            }, function (value) {
                return value != null ? escapeHTML_1["default"](isRegExp_1["default"](value) ? value.toString() : JSON.stringify(value)) : null;
            }]]
]);


/***/ },
/* 27 */
/***/ function(module, exports, __webpack_require__) {

"use strict";
"use strict";
var ContentParser_1 = __webpack_require__(2);
var bindingToJSExpression_1 = __webpack_require__(19);
var compileBinding_1 = __webpack_require__(12);
var formatters_1 = __webpack_require__(13);
var escapeString_1 = __webpack_require__(10);
var ContentNodeType = ContentParser_1["default"].ContentNodeType;
var cache = Object.create(null);
function compileContent(parsedContent, content) {
    if (cache[content]) {
        return cache[content];
    }
    if (parsedContent.length == 1) {
        var node = parsedContent[0];
        if (node.type == ContentNodeType.BINDING) {
            return (cache[content] = compileBinding_1["default"](node));
        }
    }
    var usesFormatters = false;
    var jsExpr = [];
    for (var i = 0, l = parsedContent.length; i < l; i++) {
        var node = parsedContent[i];
        if (node.type == ContentNodeType.TEXT) {
            jsExpr.push("'" + escapeString_1["default"](node.value) + "'");
        }
        else {
            var bindingJSExpr = bindingToJSExpression_1["default"](node);
            if (!usesFormatters && bindingJSExpr.usesFormatters) {
                usesFormatters = true;
            }
            jsExpr.push(bindingJSExpr.value);
        }
    }
    jsExpr = "var temp; return [" + jsExpr.join(', ') + "].join('');";
    if (usesFormatters) {
        var inner_1 = Function('formatters', jsExpr);
        return (cache[content] = function () {
            return inner_1.call(this, formatters_1["default"]);
        });
    }
    return (cache[content] = Function(jsExpr));
}
exports.__esModule = true;
exports["default"] = compileContent;


/***/ },
/* 28 */
/***/ function(module, exports, __webpack_require__) {

"use strict";
"use strict";
var cellx_1 = __webpack_require__(0);
var mixin = cellx_1.Utils.mixin;
exports.__esModule = true;
exports["default"] = mixin(Object.create(null), {
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


/***/ },
/* 29 */
/***/ function(module, exports) {

"use strict";
"use strict";
exports.__esModule = true;
exports["default"] = [
    'click', 'dblclick', 'mousedown', 'mouseup',
    'input', 'change', 'submit',
    'focusin', 'focusout'
];


/***/ },
/* 30 */
/***/ function(module, exports, __webpack_require__) {

"use strict";
"use strict";
var namePattern_1 = __webpack_require__(6);
exports.__esModule = true;
exports["default"] = "(?:" + namePattern_1["default"] + "|\\[\\d+\\])(?:\\??(?:\\." + namePattern_1["default"] + "|\\[\\d+\\]))*";


/***/ },
/* 31 */
/***/ function(module, exports) {

"use strict";
"use strict";
var cache = Object.create(null);
function keypathToJSExpression(keypath) {
    if (cache[keypath]) {
        return cache[keypath];
    }
    var splittedKeypath = keypath.split('?');
    var splittedKeypathLen = splittedKeypath.length;
    if (splittedKeypathLen == 1) {
        return (cache[keypath] = 'this.' + keypath);
    }
    var index = splittedKeypathLen - 2;
    var jsExpr = Array(index);
    while (index) {
        jsExpr[--index] = ' && (temp = temp' + splittedKeypath[index + 1] + ')';
    }
    return (cache[keypath] = "(temp = this." + splittedKeypath[0] + ")" + jsExpr.join('') + " && temp" + splittedKeypath[splittedKeypathLen - 1]);
}
exports.__esModule = true;
exports["default"] = keypathToJSExpression;


/***/ },
/* 32 */
/***/ function(module, exports) {

"use strict";
"use strict";
var div = document.createElement('div');
div.innerHTML = '<template>1</template>';
var template = div.firstChild;
exports.templateTagSupport = !template.firstChild;


/***/ },
/* 33 */
/***/ function(module, exports, __webpack_require__) {

"use strict";
'use strict';

exports.__esModule = true;

var _cellx = __webpack_require__(0);

var _bind = __webpack_require__(8);

var _bind2 = _interopRequireDefault(_bind);

var _attachChildComponentElements = __webpack_require__(7);

var _attachChildComponentElements2 = _interopRequireDefault(_attachChildComponentElements);

var _Component = __webpack_require__(1);

var _Component2 = _interopRequireDefault(_Component);

var _templateTagSupport = __webpack_require__(32);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var KEY_TEMPLATES_FIXED = _cellx.JS.Symbol('Rionite.RtContent#templatesFixed');

exports.default = _Component2.default.extend('rt-content', {
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
				if (!_templateTagSupport.templateTagSupport && !ownerComponentInputContent[KEY_TEMPLATES_FIXED]) {
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

		var _ref = this._rawContent == props.content ? (0, _bind2.default)(content, ownerComponent, getContext ? ownerComponent[getContext](this, props.context) : props.context) : (0, _bind2.default)(content, ownerComponent.ownerComponent, getContext ? ownerComponent[getContext](this, ownerComponent.props.context) : ownerComponent.props.context);

		var bindings = _ref.bindings;
		var childComponents = _ref.childComponents;


		this._bindings = bindings;

		el.appendChild(content);

		if (childComponents) {
			(0, _attachChildComponentElements2.default)(childComponents);
		}
	},
	_detachElement: function _detachElement() {
		this._destroyBindings();
	}
});

/***/ },
/* 34 */
/***/ function(module, exports, __webpack_require__) {

"use strict";
'use strict';

exports.__esModule = true;

var _rtIfThen = __webpack_require__(21);

var _rtIfThen2 = _interopRequireDefault(_rtIfThen);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = _rtIfThen2.default.extend('rt-if-else', {
	Static: {
		elementExtends: 'template'
	},

	_elseMode: true
});

/***/ },
/* 35 */
/***/ function(module, exports, __webpack_require__) {

"use strict";
'use strict';

exports.__esModule = true;

var _cellx = __webpack_require__(0);

var _ContentParser = __webpack_require__(2);

var _ContentParser2 = _interopRequireDefault(_ContentParser);

var _compileBinding = __webpack_require__(12);

var _compileBinding2 = _interopRequireDefault(_compileBinding);

var _bind2 = __webpack_require__(8);

var _bind3 = _interopRequireDefault(_bind2);

var _attachChildComponentElements = __webpack_require__(7);

var _attachChildComponentElements2 = _interopRequireDefault(_attachChildComponentElements);

var _Component = __webpack_require__(1);

var _Component2 = _interopRequireDefault(_Component);

var _namePattern = __webpack_require__(6);

var _namePattern2 = _interopRequireDefault(_namePattern);

var _Array = __webpack_require__(3);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Map = _cellx.JS.Map;
var nextTick = _cellx.Utils.nextTick;
var ContentNodeType = _ContentParser2.default.ContentNodeType;

var reForAttributeValue = RegExp('^\\s*(' + _namePattern2.default + ')\\s+of\\s+(\\S.*)$');
var invalidForAttributeMessage = 'Invalid value of attribute "for"';

exports.default = _Component2.default.extend('rt-repeat', {
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

			var parsedOf = new _ContentParser2.default('{' + forAttrValue[2] + '}').parse();

			if (parsedOf.length > 1 || parsedOf[0].type != ContentNodeType.BINDING) {
				throw new SyntaxError(invalidForAttributeMessage + (' (' + props.for + ')'));
			}

			this._itemName = forAttrValue[1];

			this._list = new _cellx.Cell((0, _compileBinding2.default)(parsedOf[0]), { owner: props.context });

			this._itemMap = new Map();

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

		this._list.on('change', this._onListChange, this);

		this._render(false);
	},
	_detachElement: function _detachElement() {
		this._clearWithItemMap(this._itemMap);
		this._list.off('change', this._onListChange, this);
	},
	_onListChange: function _onListChange() {
		if (this.element.parentNode) {
			this._render(true);
		}
	},
	_render: function _render(c) {
		var _this = this;

		var oldItemMap = this._oldItemMap = this._itemMap;
		this._itemMap = new Map();

		var list = this._list.get();
		var changed = false;

		if (list) {
			this._lastNode = this.element;
			changed = list.reduce(function (changed, item, index) {
				return _this._renderItem(item, index) || changed;
			}, changed);
		}

		if (oldItemMap.size) {
			this._clearWithItemMap(oldItemMap);
		} else if (!changed) {
			return;
		}

		if (c) {
			nextTick(function () {
				_this.emit('change');
			});
		}
	},
	_renderItem: function _renderItem(item, index) {
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

		item = new _cellx.Cell(item);
		index = new _cellx.Cell(index);

		var content = this._rawItemContent.cloneNode(true);
		var context = Object.create(this._context, (_Object$create = {}, _Object$create[this._itemName] = {
			get: function get() {
				return item.get();
			}
		}, _Object$create.$index = {
			get: function get() {
				return index.get();
			}
		}, _Object$create));

		var _bind = (0, _bind3.default)(content, this.ownerComponent, context);

		var bindings = _bind.bindings;
		var childComponents = _bind.childComponents;


		var newItem = {
			item: item,
			index: index,
			nodes: _Array.slice.call(content.childNodes),
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
			(0, _attachChildComponentElements2.default)(childComponents);
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

/***/ },
/* 36 */
/***/ function(module, exports, __webpack_require__) {

"use strict";
'use strict';

exports.__esModule = true;

var _ElementProtoMixin;

var _cellx = __webpack_require__(0);

var _Object = __webpack_require__(4);

var _defer = __webpack_require__(15);

var _defer2 = _interopRequireDefault(_defer);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Symbol = _cellx.JS.Symbol;

var attached = Symbol('Rionite.ElementProtoMixin.attached');

var ElementProtoMixin = (_ElementProtoMixin = {
	rioniteComponent: null,

	get $c() {
		return new this._rioniteComponentConstructor(this);
	}

}, _ElementProtoMixin[attached] = false, _ElementProtoMixin.connectedCallback = function connectedCallback() {
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
		(0, _defer2.default)(function () {
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
}, _ElementProtoMixin.disconnectedCallback = function disconnectedCallback() {
	this[attached] = false;

	var component = this.rioniteComponent;

	if (component && component.isElementAttached) {
		component._parentComponent = null;

		(0, _defer2.default)(function () {
			if (component._parentComponent === null && component.isElementAttached) {
				component.isElementAttached = false;
				component._detachElement();
			}
		});
	}
}, _ElementProtoMixin.attributeChangedCallback = function attributeChangedCallback(name, oldValue, value) {
	var component = this.rioniteComponent;

	if (component && component.isReady) {
		var attrs = component.elementAttributes;
		var privateName = '_' + name;

		if (_Object.hasOwn.call(attrs, privateName)) {
			attrs[privateName].set(value);
		}
	}
}, _ElementProtoMixin);

exports.default = ElementProtoMixin;

/***/ },
/* 37 */
/***/ function(module, exports) {

"use strict";
'use strict';

exports.__esModule = true;
exports.default = bindEvents;
function bindEvents(component, events) {
	for (var assetName in events) {
		var asset = void 0;

		if (assetName == ':component') {
			asset = component;
		} else if (assetName == ':element') {
			asset = component.element;
		} else {
			asset = component.$(assetName);

			if (!asset) {
				continue;
			}
		}

		var assetEvents = events[assetName];

		for (var evtName in assetEvents) {
			component.listenTo(asset, evtName, assetEvents[evtName]);
		}
	}
}

/***/ },
/* 38 */
/***/ function(module, exports, __webpack_require__) {

"use strict";
'use strict';

exports.__esModule = true;
exports.default = initAttributes;

var _camelize = __webpack_require__(5);

var _camelize2 = _interopRequireDefault(_camelize);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function initAttributes(component, constr) {
	var attrs = component.elementAttributes;
	var attributesConfig = constr.elementAttributes;

	for (var name in attributesConfig) {
		if (typeof attributesConfig[name] != 'function') {
			var camelizedName = (0, _camelize2.default)(name);
			attrs[camelizedName] = attrs[camelizedName];
		}
	}
}

/***/ },
/* 39 */
/***/ function(module, exports) {

"use strict";
'use strict';

exports.__esModule = true;
exports.default = onEvent;
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

/***/ },
/* 40 */
/***/ function(module, exports, __webpack_require__) {

"use strict";
'use strict';

exports.__esModule = true;
exports.default = registerComponent;

var _cellx = __webpack_require__(0);

var _elementConstructorMap = __webpack_require__(28);

var _elementConstructorMap2 = _interopRequireDefault(_elementConstructorMap);

var _ElementProtoMixin = __webpack_require__(36);

var _ElementProtoMixin2 = _interopRequireDefault(_ElementProtoMixin);

var _Object = __webpack_require__(4);

var _Array = __webpack_require__(3);

var _hyphenize = __webpack_require__(11);

var _hyphenize2 = _interopRequireDefault(_hyphenize);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var mixin = _cellx.Utils.mixin;

function registerComponent(componentConstr) {
	var elIs = componentConstr.elementIs;

	if (!elIs) {
		throw new TypeError('Static property "elementIs" is required');
	}

	if (_Object.hasOwn.call(componentConstr, 'props')) {
		var props = componentConstr.props;

		if (props && (props.content || props.context)) {
			throw new TypeError('No need to declare property "' + (props.content ? 'content' : 'context') + '"');
		}

		componentConstr.elementAttributes = props;
	}

	var parentComponentConstr = Object.getPrototypeOf(componentConstr.prototype).constructor;

	if (componentConstr.template !== parentComponentConstr.template && componentConstr.template) {
		_Array.push.apply(componentConstr._markupBlockNames = [elIs], parentComponentConstr._markupBlockNames || []);
	}

	componentConstr._assetClassNames = Object.create(parentComponentConstr._assetClassNames || null);

	var elExtends = componentConstr.elementExtends;

	var parentElConstr = elExtends ? _elementConstructorMap2.default[elExtends] || window['HTML' + (elExtends.charAt(0).toUpperCase() + elExtends.slice(1)) + 'Element'] : HTMLElement;

	var elConstr = function elConstr(self) {
		return parentElConstr.call(this, self);
	};
	var elProto = elConstr.prototype = Object.create(parentElConstr.prototype);

	Object.defineProperty(elConstr, 'observedAttributes', {
		configurable: true,
		enumerable: true,

		get: function get() {
			var elementAttributes = componentConstr.elementAttributes;
			return elementAttributes ? Object.keys(elementAttributes).map(function (name) {
				return (0, _hyphenize2.default)(name);
			}) : [];
		}
	});

	mixin(elProto, _ElementProtoMixin2.default);

	Object.defineProperty(elProto, 'constructor', {
		configurable: true,
		writable: true,
		value: elConstr
	});

	elProto._rioniteComponentConstructor = componentConstr;

	_elementConstructorMap2.default[elIs] = customElements.define(elIs, elConstr, elExtends ? { extends: elExtends } : null);

	return componentConstr;
}

/***/ },
/* 41 */
/***/ function(module, exports, __webpack_require__) {

"use strict";
'use strict';

exports.__esModule = true;
exports.default = setElementClasses;

var _Component = __webpack_require__(1);

var _Component2 = _interopRequireDefault(_Component);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function setElementClasses(el, constr) {
	for (var c = constr;;) {
		el.classList.add(c.elementIs);
		c = Object.getPrototypeOf(c.prototype).constructor;

		if (c == _Component2.default) {
			break;
		}
	}
}

/***/ },
/* 42 */
/***/ function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(23);


/***/ }
/******/ ]);
});