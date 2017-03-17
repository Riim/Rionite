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

/******/ 	// identity function for calling harmony imports with the correct context
/******/ 	__webpack_require__.i = function(value) { return value; };

/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
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
/******/ 	return __webpack_require__(__webpack_require__.s = 48);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports) {

module.exports = __WEBPACK_EXTERNAL_MODULE_0__;

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var cellx_1 = __webpack_require__(0);
var html_to_fragment_1 = __webpack_require__(28);
var DisposableMixin_1 = __webpack_require__(16);
var elementConstructorMap_1 = __webpack_require__(22);
var registerComponent_1 = __webpack_require__(43);
var ElementProtoMixin_1 = __webpack_require__(7);
var ComponentProperties_1 = __webpack_require__(13);
var initElementAttributes_1 = __webpack_require__(41);
var bindContent_1 = __webpack_require__(6);
var componentBinding_1 = __webpack_require__(37);
var attachChildComponentElements_1 = __webpack_require__(5);
var bindEvents_1 = __webpack_require__(34);
var eventTypes_1 = __webpack_require__(40);
var onEvent_1 = __webpack_require__(42);
var camelize_1 = __webpack_require__(4);
var getUID_1 = __webpack_require__(18);
var Features_1 = __webpack_require__(2);
var Map = cellx_1.JS.Map;
var createClass = cellx_1.Utils.createClass;
var map = Array.prototype.map;
function findChildComponentElements(node, ownerComponent, context, _childComponents) {
    for (var child = node.firstChild; child; child = child.nextSibling) {
        if (child.nodeType == Node.ELEMENT_NODE) {
            var childComponent = child.$c;
            if (childComponent) {
                childComponent.ownerComponent = ownerComponent;
                childComponent.props.context = context;
                (_childComponents || (_childComponents = [])).push(childComponent);
            }
            if (child.firstChild &&
                (!childComponent || childComponent.constructor.template == null)) {
                findChildComponentElements(child, ownerComponent, context, _childComponents);
            }
        }
    }
    return _childComponents || null;
}
var created;
var initialize;
var ready;
var elementConnected;
var elementDisconnected;
var elementAttached;
var elementDetached;
var elementMoved;
var propertyChanged;
var Component = (function (_super) {
    __extends(Component, _super);
    function Component(el, props) {
        var _this = _super.call(this) || this;
        _this.ownerComponent = null;
        _this._parentComponent = null;
        _this._attached = false;
        _this.initialized = false;
        _this.isReady = false;
        DisposableMixin_1.default.call(_this);
        var constr = _this.constructor;
        if (constr._registeredComponent !== constr) {
            throw new TypeError('Component must be registered');
        }
        if (el === undefined) {
            el = document.createElement(constr.elementIs);
        }
        else if (typeof el == 'string') {
            var elIs = constr.elementIs;
            var html = el;
            el = document.createElement(elIs);
            el.innerHTML = html;
            var firstChild = el.firstChild;
            if (firstChild && firstChild == el.lastChild && firstChild.nodeType == Node.ELEMENT_NODE && (firstChild.tagName.toLowerCase() == elIs ||
                firstChild.getAttribute('is') == elIs)) {
                el = firstChild;
            }
        }
        _this.element = el;
        el.rioniteComponent = _this;
        Object.defineProperty(el, '$c', { value: _this });
        if (props) {
            var properties = _this.props;
            for (var name_1 in props) {
                properties[camelize_1.default(name_1)] = props[name_1];
            }
        }
        _this.created();
        return _this;
    }
    Component.extend = function (elIs, description) {
        description.Extends = this;
        (description.Static || (description.Static = {})).elementIs = elIs;
        return registerComponent_1.default(createClass(description));
    };
    Object.defineProperty(Component.prototype, "parentComponent", {
        get: function () {
            if (this._parentComponent !== undefined) {
                return this._parentComponent;
            }
            for (var node = void 0; (node = (node || this.element).parentNode);) {
                if (node.$c) {
                    return (this._parentComponent = node.$c);
                }
            }
            return (this._parentComponent = null);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Component.prototype, "props", {
        get: function () {
            var props = ComponentProperties_1.default.create(this.element);
            Object.defineProperty(this, 'props', {
                configurable: true,
                enumerable: true,
                writable: true,
                value: props
            });
            return props;
        },
        enumerable: true,
        configurable: true
    });
    Component.prototype._handleEvent = function (evt) {
        _super.prototype._handleEvent.call(this, evt);
        var silent = this._silent;
        if (silent === undefined) {
            silent = this._silent = this.element.hasAttribute('rt-silent');
        }
        if (!silent && evt.bubbles !== false && !evt.isPropagationStopped) {
            var parentComponent = this.parentComponent;
            if (parentComponent) {
                parentComponent._handleEvent(evt);
            }
            else {
                onEvent_1.default(evt);
            }
        }
    };
    Component.prototype._listenTo = function (target, type, listener, context) {
        if (target instanceof Component) {
            var index = void 0;
            if (type.charAt(0) == '<' && (index = type.indexOf('>', 1)) > 1) {
                var targetName = type.slice(1, index);
                if (targetName != '*') {
                    var targetElConstr = elementConstructorMap_1.default[targetName];
                    if (!targetElConstr) {
                        throw new TypeError("Component \"" + targetName + "\" is not defined");
                    }
                    var targetConstr_1 = targetElConstr._rioniteComponentConstructor;
                    var inner_1 = listener;
                    listener = function (evt) {
                        if (evt.target instanceof targetConstr_1) {
                            return inner_1.call(this, evt);
                        }
                    };
                }
                type = type.slice(index + 1);
            }
            else if (type.indexOf(':') == -1) {
                var inner_2 = listener;
                listener = function (evt) {
                    if (evt.target == target) {
                        return inner_2.call(this, evt);
                    }
                };
            }
        }
        return DisposableMixin_1.default.prototype._listenTo.call(this, target, type, listener, context);
    };
    Component.prototype._attach = function () {
        this._attached = true;
        if (!this.initialized) {
            this.initialize();
            this.initialized = true;
        }
        var constr = this.constructor;
        if (this.isReady) {
            this._unfreezeBindings();
            if (constr.events) {
                bindEvents_1.default(this, constr.events);
            }
        }
        else {
            var el = this.element;
            el.className = constr._blockNamesString + el.className;
            initElementAttributes_1.default(this, constr);
            var template = constr.template;
            if (template == null) {
                var childComponents = findChildComponentElements(el, this.ownerComponent, this.ownerComponent);
                if (childComponents) {
                    attachChildComponentElements_1.default(childComponents);
                }
                if (constr.events) {
                    bindEvents_1.default(this, constr.events);
                }
            }
            else {
                var inputContent = this.props.content = document.createDocumentFragment();
                ElementProtoMixin_1.ElementsController.skipConnectionStatusCallbacks = true;
                for (var child = void 0; (child = el.firstChild);) {
                    inputContent.appendChild(child);
                }
                ElementProtoMixin_1.ElementsController.skipConnectionStatusCallbacks = false;
                var rawContent = constr._rawContent;
                if (!rawContent) {
                    rawContent = constr._rawContent = html_to_fragment_1.default(typeof template == 'string' ? template : template.render(constr));
                }
                var content = rawContent.cloneNode(true);
                var _a = bindContent_1.default(content, this), bindings = _a.bindings, childComponents = _a.childComponents;
                this._bindings = bindings;
                this.element.appendChild(content);
                if (!Features_1.nativeCustomElements && childComponents) {
                    attachChildComponentElements_1.default(childComponents);
                }
                if (constr.events) {
                    bindEvents_1.default(this, constr.events);
                }
            }
            this.ready();
            this.isReady = true;
        }
        this.elementAttached();
    };
    Component.prototype._detach = function () {
        this._attached = false;
        this.elementDetached();
        this.dispose();
    };
    Component.prototype.dispose = function () {
        this._freezeBindings();
        return DisposableMixin_1.default.prototype.dispose.call(this);
    };
    Component.prototype._freezeBindings = function () {
        if (this._bindings) {
            componentBinding_1.freezeBindings(this._bindings);
        }
    };
    Component.prototype._unfreezeBindings = function () {
        if (this._bindings) {
            componentBinding_1.unfreezeBindings(this._bindings);
        }
    };
    Component.prototype._destroyBindings = function () {
        var bindings = this._bindings;
        if (bindings) {
            for (var i = bindings.length; i;) {
                bindings[--i].off();
            }
            this._bindings = null;
        }
    };
    // Callbacks
    Component.prototype.created = function () { };
    Component.prototype.initialize = function () { };
    Component.prototype.ready = function () { };
    Component.prototype.elementConnected = function () { };
    Component.prototype.elementDisconnected = function () { };
    Component.prototype.elementAttached = function () { };
    Component.prototype.elementDetached = function () { };
    Component.prototype.elementMoved = function () { };
    Component.prototype.propertyChanged = function (name, oldValue, value) { };
    // Utils
    Component.prototype.$ = function (name, container) {
        var elList = this._getElementList(name, container);
        return elList && elList.length ? elList[0].$c || elList[0] : null;
    };
    Component.prototype.$$ = function (name, container) {
        var elList = this._getElementList(name, container);
        return elList ? map.call(elList, function (el) { return el.$c || el; }) : [];
    };
    Component.prototype._getElementList = function (name, container) {
        var elListMap = this._elementListMap || (this._elementListMap = new Map());
        var containerEl = container ?
            (container instanceof Component ? container.element : container) :
            this.element;
        var key = container ? getUID_1.default(containerEl) + '/' + name : name;
        var elList = elListMap.get(key);
        if (!elList) {
            var constr = this.constructor;
            var className = constr._elementClassNameMap[name];
            if (className) {
                elList = containerEl.getElementsByClassName(className);
                elListMap.set(key, elList);
            }
            else {
                var blockNames = constr._blockNames;
                if (!blockNames) {
                    throw new TypeError('Component must have a template');
                }
                for (var i = blockNames.length; i;) {
                    className = blockNames[--i] + '__' + name;
                    elList = containerEl.getElementsByClassName(className);
                    if (elList.length) {
                        constr._elementClassNameMap[name] = className;
                        elListMap.set(key, elList);
                        break;
                    }
                }
                if (!elList.length) {
                    return;
                }
            }
        }
        return elList;
    };
    return Component;
}(cellx_1.EventEmitter));
Component.register = registerComponent_1.default;
Component._blockNamesString = '';
exports.default = Component;
var DisposableMixinProto = DisposableMixin_1.default.prototype;
var ComponentProto = Component.prototype;
Object.getOwnPropertyNames(DisposableMixinProto).forEach(function (name) {
    if (!(name in ComponentProto)) {
        Object.defineProperty(ComponentProto, name, Object.getOwnPropertyDescriptor(DisposableMixinProto, name));
    }
});
created = ComponentProto.created;
initialize = ComponentProto.initialize;
ready = ComponentProto.ready;
elementConnected = ComponentProto.elementConnected;
elementDisconnected = ComponentProto.elementDisconnected;
elementAttached = ComponentProto.elementAttached;
elementDetached = ComponentProto.elementDetached;
elementMoved = ComponentProto.elementMoved;
propertyChanged = ComponentProto.propertyChanged;
document.addEventListener('DOMContentLoaded', function onDOMContentLoaded() {
    document.removeEventListener('DOMContentLoaded', onDOMContentLoaded);
    eventTypes_1.default.forEach(function (type) {
        document.addEventListener(type, onEvent_1.default);
    });
});


/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var dummyEl = document.createElement('div');
dummyEl.innerHTML = '<template>1</template>';
exports.templateTag = !dummyEl.firstChild.firstChild;
var nativeCustomElementsFeature = false;
function TestNativeCustomElementsFeature(self) {
    return HTMLElement.call(this, self);
}
Object.defineProperty(TestNativeCustomElementsFeature, 'observedAttributes', {
    get: function () {
        return ['test'];
    }
});
TestNativeCustomElementsFeature.prototype = Object.create(HTMLElement.prototype, {
    constructor: { value: TestNativeCustomElementsFeature }
});
TestNativeCustomElementsFeature.prototype.attributeChangedCallback = function () {
    nativeCustomElementsFeature = true;
};
window.customElements.define('test-native-custom-elements-feature', TestNativeCustomElementsFeature);
var testNCEF = document.createElement('test-native-custom-elements-feature');
testNCEF.setAttribute('test', '');
exports.nativeCustomElements = nativeCustomElementsFeature;


/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var Component_1 = __webpack_require__(1);
var d = {
    Component: function Component_(config) {
        return function (componentConstr) {
            if (config.elementIs) {
                componentConstr.elementIs = config.elementIs;
            }
            if (config.elementExtends) {
                componentConstr.elementExtends = config.elementExtends;
            }
            if (config.props !== undefined) {
                componentConstr.props = config.props;
            }
            if (config.i18n) {
                componentConstr.i18n = config.i18n;
            }
            if (config.template !== undefined) {
                componentConstr.template = config.template;
            }
            if (config.bemlTemplate !== undefined) {
                componentConstr.bemlTemplate = config.bemlTemplate;
            }
            if (config.events !== undefined) {
                componentConstr.events = config.events;
            }
            Component_1.default.register(componentConstr);
        };
    }
};
exports.default = d;


/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var reHyphen = /[-_]+([a-z]|$)/g;
var cache = Object.create(null);
function camelize(str) {
    return cache[str] || (cache[str] = str.replace(reHyphen, function (match, chr) {
        return chr.toUpperCase();
    }));
}
exports.default = camelize;


/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
function attachChildComponentElements(childComponents) {
    for (var _i = 0, childComponents_1 = childComponents; _i < childComponents_1.length; _i++) {
        var childComponent = childComponents_1[_i];
        if (!childComponent._attached) {
            childComponent._parentComponent = undefined;
            childComponent.elementConnected();
            childComponent._attach();
        }
    }
}
exports.default = attachChildComponentElements;


/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var cellx_1 = __webpack_require__(0);
var ContentParser_1 = __webpack_require__(15);
var compileContent_1 = __webpack_require__(36);
var setAttribute_1 = __webpack_require__(33);
var ContentNodeType = ContentParser_1.default.ContentNodeType;
var reBinding = /{[^}]+}/;
function bindContent(content, ownerComponent, context) {
    if (!context) {
        context = ownerComponent;
    }
    var bindings;
    var childComponents;
    function bind(content) {
        var _loop_1 = function (child) {
            switch (child.nodeType) {
                case Node.ELEMENT_NODE: {
                    var attrs = child.attributes;
                    var _loop_2 = function (i) {
                        var attr = attrs.item(--i);
                        var value = attr.value;
                        if (reBinding.test(value)) {
                            var parsedValue = (new ContentParser_1.default(value)).parse();
                            if (parsedValue.length > 1 || parsedValue[0].nodeType == ContentNodeType.BINDING) {
                                var name_1 = attr.name;
                                if (name_1.charAt(0) == '_') {
                                    name_1 = name_1.slice(1);
                                }
                                var cell = new cellx_1.Cell(compileContent_1.default(parsedValue, value, ownerComponent), {
                                    owner: context,
                                    onChange: function (evt) {
                                        setAttribute_1.default(child, name_1, evt['value']);
                                    }
                                });
                                setAttribute_1.default(child, name_1, cell.get());
                                (bindings || (bindings = [])).push(cell);
                            }
                        }
                        out_i_1 = i;
                    };
                    var out_i_1;
                    for (var i = attrs.length; i;) {
                        _loop_2(i);
                        i = out_i_1;
                    }
                    var childComponent = child.$c;
                    if (childComponent) {
                        childComponent.ownerComponent = ownerComponent;
                        childComponent.props.context = context;
                        (childComponents || (childComponents = [])).push(childComponent);
                    }
                    if (child.firstChild &&
                        (!childComponent || childComponent.constructor.template == null)) {
                        bind(child);
                    }
                    break;
                }
                case Node.TEXT_NODE: {
                    var content_1 = child.textContent;
                    if (reBinding.test(content_1)) {
                        var parsedContent = (new ContentParser_1.default(content_1)).parse();
                        if (parsedContent.length > 1 || parsedContent[0].nodeType == ContentNodeType.BINDING) {
                            var cell = new cellx_1.Cell(compileContent_1.default(parsedContent, content_1), {
                                owner: context,
                                onChange: function (evt) {
                                    child.textContent = evt['value'];
                                }
                            });
                            child.textContent = cell.get();
                            (bindings || (bindings = [])).push(cell);
                        }
                    }
                    break;
                }
            }
        };
        for (var child = content.firstChild; child; child = child.nextSibling) {
            _loop_1(child);
        }
    }
    bind(content);
    return {
        bindings: bindings || null,
        childComponents: childComponents || null
    };
}
exports.default = bindContent;


/***/ }),
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var cellx_1 = __webpack_require__(0);
var defer_1 = __webpack_require__(17);
var Features_1 = __webpack_require__(2);
var Symbol = cellx_1.JS.Symbol;
var KEY_CONNECTED = Symbol('Rionite.ElementProtoMixin.connected');
exports.ElementsController = {
    skipConnectionStatusCallbacks: false
};
var ElementProtoMixin = (_a = {
        rioniteComponent: null,
        get $c() {
            return new this.constructor._rioniteComponentConstructor(this);
        }
    },
    _a[KEY_CONNECTED] = false,
    _a.connectedCallback = function () {
        this[KEY_CONNECTED] = true;
        if (exports.ElementsController.skipConnectionStatusCallbacks) {
            return;
        }
        var component = this.rioniteComponent;
        if (component) {
            component.elementConnected();
            if (component._attached) {
                if (component._parentComponent === null) {
                    component._parentComponent = undefined;
                    component.elementMoved();
                }
            }
            else {
                component._parentComponent = undefined;
                component._attach();
            }
        }
        else {
            defer_1.default(function () {
                if (this[KEY_CONNECTED]) {
                    var component_1 = this.$c;
                    component_1._parentComponent = undefined;
                    if (!component_1.parentComponent) {
                        component_1.elementConnected();
                        component_1._attach();
                    }
                }
            }, this);
        }
    },
    _a.disconnectedCallback = function () {
        this[KEY_CONNECTED] = false;
        if (exports.ElementsController.skipConnectionStatusCallbacks) {
            return;
        }
        var component = this.rioniteComponent;
        if (component && component._attached) {
            component._parentComponent = null;
            component.elementDisconnected();
            defer_1.default(function () {
                if (component._parentComponent === null && component._attached) {
                    component._detach();
                }
            });
        }
    },
    _a.attributeChangedCallback = function (name, oldValue, value) {
        var component = this.rioniteComponent;
        if (component && component.isReady) {
            var props = component.props;
            var privateName = '_' + name;
            if (props[privateName]) {
                props[privateName].set(value);
            }
            else if (Features_1.nativeCustomElements) {
                throw new TypeError("Cannot write to readonly property \"" + privateName.slice(1) + "\"");
            }
        }
    },
    _a);
exports.default = ElementProtoMixin;
var _a;


/***/ }),
/* 8 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
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
exports.default = hyphenize;


/***/ }),
/* 9 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var namePattern_1 = __webpack_require__(10);
exports.default = "(?:" + namePattern_1.default + "|\\d+)(?:\\.(?:" + namePattern_1.default + "|\\d+))*";


/***/ }),
/* 10 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
exports.default = '[$_a-zA-Z][$\\w]*';


/***/ }),
/* 11 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var escapeHTML_1 = __webpack_require__(46);
exports.escapeHTML = escapeHTML_1.default;
var unescapeHTML_1 = __webpack_require__(47);
exports.unescapeHTML = unescapeHTML_1.default;
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = escapeHTML_1.default;


/***/ }),
/* 12 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var reEscapableChars = /[\\'"\r\n]/g;
var charToEscapedMap = Object.create(null);
charToEscapedMap['\\'] = '\\\\';
charToEscapedMap['\''] = '\\\'';
charToEscapedMap['"'] = '\\"';
charToEscapedMap['\r'] = '\\r';
charToEscapedMap['\n'] = '\\n';
function escapeString(str) {
    return reEscapableChars.test(str) ? str.replace(reEscapableChars, function (chr) { return charToEscapedMap[chr]; }) : str;
}
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = escapeString;


/***/ }),
/* 13 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var cellx_1 = __webpack_require__(0);
var componentPropertyTypeMap_1 = __webpack_require__(39);
var componentPropertyTypeHandlersMap_1 = __webpack_require__(38);
var camelize_1 = __webpack_require__(4);
var hyphenize_1 = __webpack_require__(8);
function initProperty(props, name, el) {
    var component = el.$c;
    var propConfig = component.constructor.props[name];
    var type = typeof propConfig;
    var defaultValue;
    var required;
    var readonly;
    if (type == 'function') {
        type = propConfig;
        required = readonly = false;
    }
    else if (type == 'object' && (propConfig.type !== undefined || propConfig.default !== undefined)) {
        type = propConfig.type;
        defaultValue = propConfig.default;
        if (type === undefined) {
            type = typeof defaultValue;
        }
        else if (defaultValue !== undefined && componentPropertyTypeMap_1.default.has(type) &&
            componentPropertyTypeMap_1.default.get(type) != (defaultValue === null ? 'null' : typeof defaultValue)) {
            throw new TypeError('Specified type does not match type of defaultValue');
        }
        required = propConfig.required;
        readonly = propConfig.readonly;
    }
    else {
        defaultValue = propConfig;
        required = readonly = false;
    }
    var handlers = componentPropertyTypeHandlersMap_1.default.get(type);
    if (!handlers) {
        throw new TypeError('Unsupported attribute type');
    }
    var camelizedName = camelize_1.default(name);
    var hyphenizedName = hyphenize_1.default(name);
    if (required && !el.hasAttribute(hyphenizedName)) {
        throw new TypeError("Property \"" + name + "\" is required");
    }
    var descriptor;
    if (readonly) {
        var value_1 = handlers[0](el.getAttribute(hyphenizedName), defaultValue, component);
        descriptor = {
            configurable: true,
            enumerable: true,
            get: function () {
                return value_1;
            },
            set: function (v) {
                if (v !== value_1) {
                    throw new TypeError("Property \"" + name + "\" is readonly");
                }
            }
        };
    }
    else {
        var oldValue_1;
        var value_2;
        var needHandling_1 = false;
        var rawValue_1 = props['_' + camelizedName] = props['_' + hyphenizedName] = new cellx_1.Cell(el.getAttribute(hyphenizedName), {
            merge: function (v, ov) {
                if (v !== ov) {
                    var newValue = handlers[0](v, defaultValue, component);
                    if (newValue === value_2) {
                        return ov;
                    }
                    oldValue_1 = value_2;
                    value_2 = newValue;
                    needHandling_1 = component.isReady;
                }
                return v;
            },
            onChange: function () {
                if (needHandling_1) {
                    needHandling_1 = false;
                    component.propertyChanged(camelizedName, value_2, oldValue_1);
                    component.emit({
                        type: "property-" + hyphenizedName + "-change",
                        oldValue: oldValue_1,
                        value: value_2
                    });
                }
            }
        });
        descriptor = {
            configurable: true,
            enumerable: true,
            get: function () {
                rawValue_1.get();
                return value_2;
            },
            set: function (v) {
                v = handlers[1](v, defaultValue, component);
                if (v === null) {
                    el.removeAttribute(hyphenizedName);
                }
                else {
                    el.setAttribute(hyphenizedName, v);
                }
                rawValue_1.set(v);
            }
        };
    }
    Object.defineProperty(props, camelizedName, descriptor);
    if (hyphenizedName != camelizedName) {
        Object.defineProperty(props, hyphenizedName, descriptor);
    }
}
var ComponentProperties = {
    create: function (el) {
        var propsConfig = el.$c.constructor.props;
        var props = { content: null, context: null };
        if (propsConfig) {
            for (var name_1 in propsConfig) {
                initProperty(props, name_1, el);
            }
        }
        return props;
    }
};
exports.default = ComponentProperties;


/***/ }),
/* 14 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var cellx_1 = __webpack_require__(0);
var Component_1 = __webpack_require__(1);
var compileKeypath_1 = __webpack_require__(20);
var bindContent_1 = __webpack_require__(6);
var attachChildComponentElements_1 = __webpack_require__(5);
var keypathPattern_1 = __webpack_require__(9);
var Features_1 = __webpack_require__(2);
var d_1 = __webpack_require__(3);
var nextTick = cellx_1.Utils.nextTick;
var slice = Array.prototype.slice;
var reKeypath = RegExp("^" + keypathPattern_1.default + "$");
var RtIfThen = (function (_super) {
    __extends(RtIfThen, _super);
    function RtIfThen() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this._elseMode = false;
        _this._destroyed = false;
        return _this;
    }
    RtIfThen.prototype.elementConnected = function () {
        if (this._destroyed) {
            throw new TypeError('Instance of RtIfThen was destroyed and can no longer be used');
        }
        if (!this.initialized) {
            var props = this.props;
            props.content = document.importNode(this.element.content, true);
            var if_ = (props['if'] || '').trim();
            if (!reKeypath.test(if_)) {
                throw new SyntaxError("Invalid value of attribute \"if\" (" + if_ + ")");
            }
            var getIfValue_1 = compileKeypath_1.default(if_);
            this._if = new cellx_1.Cell(function () {
                return !!getIfValue_1.call(this);
            }, { owner: props.context });
            this.initialized = true;
        }
        this._if.on('change', this._onIfChange, this);
        this._render(false);
    };
    RtIfThen.prototype.elementDisconnected = function () {
        this._destroy();
    };
    RtIfThen.prototype._onIfChange = function () {
        if (this.element.parentNode) {
            this._render(true);
        }
    };
    RtIfThen.prototype._attach = function () {
        this._attached = true;
    };
    RtIfThen.prototype._detach = function () {
        this._attached = false;
    };
    RtIfThen.prototype._render = function (changed) {
        var _this = this;
        if (this._elseMode ? !this._if.get() : this._if.get()) {
            var content = this.props.content.cloneNode(true);
            var _a = bindContent_1.default(content, this.ownerComponent, this.props.context), bindings = _a.bindings, childComponents = _a.childComponents;
            this._nodes = slice.call(content.childNodes);
            this._bindings = bindings;
            this.element.parentNode.insertBefore(content, this.element.nextSibling);
            if (!Features_1.nativeCustomElements && childComponents) {
                attachChildComponentElements_1.default(childComponents);
            }
        }
        else {
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
                _this.emit('change');
            });
        }
    };
    RtIfThen.prototype._destroy = function () {
        if (this._destroyed) {
            return;
        }
        this._destroyed = true;
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
    };
    return RtIfThen;
}(Component_1.default));
RtIfThen = __decorate([
    d_1.default.Component({
        elementIs: 'rt-if-then',
        elementExtends: 'template',
        props: {
            if: { type: String, required: true, readonly: true }
        }
    })
], RtIfThen);
exports.default = RtIfThen;


/***/ }),
/* 15 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var keypathToJSExpression_1 = __webpack_require__(25);
var namePattern_1 = __webpack_require__(10);
var keypathPattern_1 = __webpack_require__(9);
var ContentNodeType;
(function (ContentNodeType) {
    ContentNodeType[ContentNodeType["TEXT"] = 1] = "TEXT";
    ContentNodeType[ContentNodeType["BINDING"] = 2] = "BINDING";
    ContentNodeType[ContentNodeType["BINDING_KEYPATH"] = 3] = "BINDING_KEYPATH";
    ContentNodeType[ContentNodeType["BINDING_FORMATTER"] = 4] = "BINDING_FORMATTER";
    ContentNodeType[ContentNodeType["BINDING_FORMATTER_ARGUMENTS"] = 5] = "BINDING_FORMATTER_ARGUMENTS";
})(ContentNodeType = exports.ContentNodeType || (exports.ContentNodeType = {}));
;
var reNameOrNothing = RegExp(namePattern_1.default + '|', 'g');
var reKeypathOrNothing = RegExp(keypathPattern_1.default + '|', 'g');
var reBooleanOrNothing = /false|true|/g;
var reNumberOrNothing = /(?:[+-]\s*)?(?:0b[01]+|0[0-7]+|0x[0-9a-fA-F]+|(?:(?:0|[1-9]\d*)(?:\.\d+)?|\.\d+)(?:[eE][+-]?\d+)?|Infinity|NaN)|/g;
var reVacuumOrNothing = /null|undefined|void 0|/g;
var NOT_VALUE_AND_NOT_KEYPATH = {};
var ContentParser = (function () {
    function ContentParser(content) {
        this.content = content;
    }
    ContentParser.prototype.parse = function () {
        var content = this.content;
        if (!content) {
            return [];
        }
        this.at = 0;
        var result = this.result = [];
        for (var index = void 0; (index = content.indexOf('{', this.at)) > -1;) {
            this._pushText(content.slice(this.at, index));
            this.at = index;
            this.chr = content.charAt(index);
            var binding = this._readBinding();
            if (binding) {
                result.push(binding);
            }
            else {
                this._pushText(this.chr);
                this._next('{');
            }
        }
        this._pushText(content.slice(this.at));
        return result;
    };
    ContentParser.prototype._pushText = function (value) {
        if (value) {
            var result = this.result;
            var resultLen = result.length;
            if (resultLen && result[resultLen - 1].nodeType == ContentNodeType.TEXT) {
                result[resultLen - 1].value = result[resultLen - 1].raw += value;
            }
            else {
                result.push({
                    nodeType: ContentNodeType.TEXT,
                    value: value,
                    at: this.at,
                    raw: value
                });
            }
        }
    };
    ContentParser.prototype._readBinding = function () {
        var at = this.at;
        this._next('{');
        this._skipWhitespaces();
        var keypath = this._readBindingKeypath();
        if (keypath) {
            var formatters = [];
            for (var formatter = void 0; this._skipWhitespaces() == '|' && (formatter = this._readFormatter());) {
                formatters.push(formatter);
            }
            if (this.chr == '}') {
                this._next();
                return {
                    nodeType: ContentNodeType.BINDING,
                    keypath: keypath,
                    formatters: formatters,
                    at: at,
                    raw: this.content.slice(at, this.at)
                };
            }
        }
        this.at = at;
        this.chr = this.content.charAt(at);
        return null;
    };
    ContentParser.prototype._readBindingKeypath = function () {
        var content = this.content;
        reKeypathOrNothing.lastIndex = this.at;
        var keypath = reKeypathOrNothing.exec(content)[0];
        if (keypath) {
            var at = this.at;
            this.chr = content.charAt((this.at += keypath.length));
            return {
                nodeType: ContentNodeType.BINDING_KEYPATH,
                value: keypath,
                at: at,
                raw: content.slice(at, this.at)
            };
        }
        return null;
    };
    ContentParser.prototype._readFormatter = function () {
        var at = this.at;
        this._next('|');
        this._skipWhitespaces();
        var name = this._readName();
        if (name) {
            var args = this.chr == '(' ? this._readFormatterArguments() : null;
            return {
                nodeType: ContentNodeType.BINDING_FORMATTER,
                name: name,
                arguments: args,
                at: at,
                raw: this.content.slice(at, this.at)
            };
        }
        this.at = at;
        this.chr = this.content.charAt(at);
        return null;
    };
    ContentParser.prototype._readFormatterArguments = function () {
        var at = this.at;
        this._next('(');
        var args = [];
        if (this._skipWhitespaces() != ')') {
            for (;;) {
                var arg = this._readValueOrValueKeypath();
                if (arg !== NOT_VALUE_AND_NOT_KEYPATH) {
                    if (this._skipWhitespaces() == ',' || this.chr == ')') {
                        args.push(arg);
                        if (this.chr == ',') {
                            this._next();
                            this._skipWhitespaces();
                            continue;
                        }
                        break;
                    }
                }
                this.at = at;
                this.chr = this.content.charAt(at);
                return null;
            }
        }
        this._next();
        return {
            nodeType: ContentNodeType.BINDING_FORMATTER_ARGUMENTS,
            value: args,
            at: at,
            raw: this.content.slice(at, this.at)
        };
    };
    ContentParser.prototype._readValueOrValueKeypath = function () {
        var value = this._readValue();
        return value === NOT_VALUE_AND_NOT_KEYPATH ? this._readValueKeypath() : value;
    };
    ContentParser.prototype._readValue = function () {
        switch (this.chr) {
            case '{': {
                return this._readObject();
            }
            case '[': {
                return this._readArray();
            }
            case "'":
            case '"': {
                return this._readString();
            }
        }
        var readers = ['_readBoolean', '_readNumber', '_readVacuum'];
        for (var _i = 0, readers_1 = readers; _i < readers_1.length; _i++) {
            var reader = readers_1[_i];
            var value = this[reader]();
            if (value !== NOT_VALUE_AND_NOT_KEYPATH) {
                return value;
            }
        }
        return NOT_VALUE_AND_NOT_KEYPATH;
    };
    ContentParser.prototype._readObject = function () {
        var at = this.at;
        this._next('{');
        var obj = '{';
        while (this._skipWhitespaces() != '}') {
            var key = this.chr == "'" || this.chr == '"' ? this._readString() : this._readObjectKey();
            if (key !== NOT_VALUE_AND_NOT_KEYPATH && key !== null && this._skipWhitespaces() == ':') {
                this._next();
                this._skipWhitespaces();
                var v = this._readValueOrValueKeypath();
                if (v !== NOT_VALUE_AND_NOT_KEYPATH) {
                    if (this._skipWhitespaces() == ',') {
                        obj += key + ':' + v + ',';
                        this._next();
                        continue;
                    }
                    else if (this.chr == '}') {
                        obj += key + ':' + v + '}';
                        break;
                    }
                }
            }
            this.at = at;
            this.chr = this.content.charAt(at);
            return NOT_VALUE_AND_NOT_KEYPATH;
        }
        this._next();
        return obj;
    };
    ContentParser.prototype._readObjectKey = function () {
        return this._readName();
    };
    ContentParser.prototype._readArray = function () {
        var at = this.at;
        this._next('[');
        var arr = '[';
        while (this._skipWhitespaces() != ']') {
            if (this.chr == ',') {
                arr += ',';
                this._next();
            }
            else {
                var v = this._readValueOrValueKeypath();
                if (v === NOT_VALUE_AND_NOT_KEYPATH) {
                    this.at = at;
                    this.chr = this.content.charAt(at);
                    return NOT_VALUE_AND_NOT_KEYPATH;
                }
                else {
                    arr += v;
                }
            }
        }
        this._next();
        return arr + ']';
    };
    ContentParser.prototype._readBoolean = function () {
        reBooleanOrNothing.lastIndex = this.at;
        var bool = reBooleanOrNothing.exec(this.content)[0];
        if (bool) {
            this.chr = this.content.charAt((this.at += bool.length));
            return bool;
        }
        return NOT_VALUE_AND_NOT_KEYPATH;
    };
    ContentParser.prototype._readNumber = function () {
        reNumberOrNothing.lastIndex = this.at;
        var num = reNumberOrNothing.exec(this.content)[0];
        if (num) {
            this.chr = this.content.charAt((this.at += num.length));
            return num;
        }
        return NOT_VALUE_AND_NOT_KEYPATH;
    };
    ContentParser.prototype._readString = function () {
        var quoteChar = this.chr;
        if (quoteChar != "'" && quoteChar != '"') {
            throw {
                name: 'SyntaxError',
                message: "Expected \"'\" instead of \"" + this.chr + "\"",
                at: this.at,
                content: this.content
            };
        }
        var at = this.at;
        var str = '';
        for (var next = void 0; (next = this._next());) {
            if (next == quoteChar) {
                this._next();
                return quoteChar + str + quoteChar;
            }
            if (next == '\\') {
                str += next + this._next();
            }
            else {
                if (next == '\r' || next == '\n') {
                    break;
                }
                str += next;
            }
        }
        this.at = at;
        this.chr = this.content.charAt(at);
        return NOT_VALUE_AND_NOT_KEYPATH;
    };
    ContentParser.prototype._readVacuum = function () {
        reVacuumOrNothing.lastIndex = this.at;
        var vacuum = reVacuumOrNothing.exec(this.content)[0];
        if (vacuum) {
            this.chr = this.content.charAt((this.at += vacuum.length));
            return vacuum;
        }
        return NOT_VALUE_AND_NOT_KEYPATH;
    };
    ContentParser.prototype._readValueKeypath = function () {
        reKeypathOrNothing.lastIndex = this.at;
        var keypath = reKeypathOrNothing.exec(this.content)[0];
        if (keypath) {
            this.chr = this.content.charAt((this.at += keypath.length));
            return keypathToJSExpression_1.default(keypath);
        }
        return NOT_VALUE_AND_NOT_KEYPATH;
    };
    ContentParser.prototype._readName = function () {
        reNameOrNothing.lastIndex = this.at;
        var name = reNameOrNothing.exec(this.content)[0];
        if (name) {
            this.chr = this.content.charAt((this.at += name.length));
            return name;
        }
        return null;
    };
    ContentParser.prototype._skipWhitespaces = function () {
        var chr = this.chr;
        while (chr && chr <= ' ') {
            chr = this._next();
        }
        return chr;
    };
    ContentParser.prototype._next = function (current) {
        if (current && current != this.chr) {
            throw {
                name: 'SyntaxError',
                message: "Expected \"" + current + "\" instead of \"" + this.chr + "\"",
                at: this.at,
                content: this.content
            };
        }
        return (this.chr = this.content.charAt(++this.at));
    };
    return ContentParser;
}());
ContentParser.ContentNodeType = ContentNodeType;
exports.default = ContentParser;


/***/ }),
/* 16 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var cellx_1 = __webpack_require__(0);
var nextUID = cellx_1.Utils.nextUID;
var DisposableMixin = (function () {
    function DisposableMixin() {
        this._disposables = {};
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
        if (target instanceof cellx_1.EventEmitter) {
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
                if (target instanceof cellx_1.EventEmitter) {
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
        var callback = function callback() {
            if (disposable._disposables[id]) {
                delete disposable._disposables[id];
                return cb.apply(disposable, arguments);
            }
        };
        callback.cancel = cancelCallback;
        callback.dispose = cancelCallback;
        this._disposables[id] = callback;
        return callback;
    };
    DisposableMixin.prototype.dispose = function () {
        var disposables = this._disposables;
        for (var id in disposables) {
            disposables[id].dispose();
        }
        return this;
    };
    return DisposableMixin;
}());
exports.default = DisposableMixin;


/***/ }),
/* 17 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
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
exports.default = defer;


/***/ }),
/* 18 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var cellx_1 = __webpack_require__(0);
var nextUID = cellx_1.Utils.nextUID;
var hasOwn = Object.prototype.hasOwnProperty;
var KEY_UID = cellx_1.JS.Symbol('uid');
var getUID;
if (typeof KEY_UID == 'symbol') {
    getUID = function getUID(obj) {
        return hasOwn.call(obj, KEY_UID) ? obj[KEY_UID] : (obj[KEY_UID] = nextUID());
    };
}
else {
    getUID = function getUID(obj) {
        return hasOwn.call(obj, KEY_UID) ? obj[KEY_UID] : Object.defineProperty(obj, KEY_UID, {});
    };
}
exports.default = getUID;


/***/ }),
/* 19 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var toString = Object.prototype.toString;
function isRegExp(value) {
    return toString.call(value) == '[object RegExp]';
}
exports.default = isRegExp;


/***/ }),
/* 20 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var keypathToJSExpression_1 = __webpack_require__(25);
var cache = Object.create(null);
function compileKeypath(keypath) {
    return cache[keypath] || (cache[keypath] = Function("var temp; return " + keypathToJSExpression_1.default(keypath) + ";"));
}
exports.default = compileKeypath;


/***/ }),
/* 21 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var cellx_1 = __webpack_require__(0);
var componentPropertyValuesKey = cellx_1.JS.Symbol('componentPropertyValues');
exports.default = componentPropertyValuesKey;


/***/ }),
/* 22 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var cellx_1 = __webpack_require__(0);
var mixin = cellx_1.Utils.mixin;
exports.default = mixin(Object.create(null), {
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


/***/ }),
/* 23 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var getText_1 = __webpack_require__(24);
exports.default = {
    or: function or(value, arg) {
        return value || arg;
    },
    default: function default_(value, arg) {
        return value === undefined ? arg : value;
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
    t: getText_1.default.t,
    pt: getText_1.default.pt,
    nt: function nt(count, key) {
        var args = [];
        for (var _i = 2; _i < arguments.length; _i++) {
            args[_i - 2] = arguments[_i];
        }
        args.unshift(count);
        return getText_1.default('', key, true, args);
    },
    npt: function npt(count, key, context) {
        var args = [];
        for (var _i = 3; _i < arguments.length; _i++) {
            args[_i - 3] = arguments[_i];
        }
        args.unshift(count);
        return getText_1.default(context, key, true, args);
    },
    // Safary: "Cannot declare a parameter named 'key' as it shadows the name of a strict mode function."
    key: function key_(obj, key) {
        return obj && obj[key];
    },
    json: function json(value) {
        return JSON.stringify(value);
    }
};


/***/ }),
/* 24 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var hasOwn = Object.prototype.hasOwnProperty;
var reInsert = /\{([1-9]\d*|n)(?::((?:[^|]*\|)+?[^}]*))?\}/;
var texts;
var getPluralIndex;
var getText = function getText(context, key, plural, args) {
    var rawText;
    if (hasOwn.call(texts, context) && hasOwn.call(texts[context], key)) {
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
exports.default = getText;
configure({
    localeSettings: {
        code: 'ru',
        plural: '(n%100) >= 5 && (n%100) <= 20 ? 2 : (n%10) == 1 ? 0 : (n%10) >= 2 && (n%10) <= 4 ? 1 : 2'
    },
    texts: {}
});


/***/ }),
/* 25 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var cache = Object.create(null);
function keypathToJSExpression(keypath) {
    if (cache[keypath]) {
        return cache[keypath];
    }
    var keys = keypath.split('.');
    var keyCount = keys.length;
    if (keyCount == 1) {
        return (cache[keypath] = "this['" + keypath + "']");
    }
    var index = keyCount - 2;
    var jsExpr = Array(index);
    while (index) {
        jsExpr[--index] = " && (temp = temp['" + keys[index + 1] + "'])";
    }
    return (cache[keypath] = "(temp = this['" + keys[0] + "'])" + jsExpr.join('') + " && temp['" + keys[keyCount - 1] + "']");
}
exports.default = keypathToJSExpression;


/***/ }),
/* 26 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var NodeType;
(function (NodeType) {
    NodeType[NodeType["BLOCK"] = 1] = "BLOCK";
    NodeType[NodeType["ELEMENT"] = 2] = "ELEMENT";
    NodeType[NodeType["TEXT"] = 3] = "TEXT";
    NodeType[NodeType["COMMENT"] = 4] = "COMMENT";
    NodeType[NodeType["SUPER_CALL"] = 5] = "SUPER_CALL";
})(NodeType = exports.NodeType || (exports.NodeType = {}));
var reBlockNameOrNothing = /[a-zA-Z][\-\w]*|/g;
var reTagNameOrNothing = /[a-zA-Z][\-\w]*(?::[_a-zA-Z][\-\w]*)?|/g;
var reElementNameOrNothing = /[_a-zA-Z][\-\w]*|/g;
var reAttributeNameOrNothing = /[_a-zA-Z][\-\w]*(?::[_a-zA-Z][\-\w]*)?|/g;
var reSuperCallOrNothing = /super(?:\.([_a-zA-Z][\-\w]*))?!|/g;
function normalizeMultilineText(text) {
    return text.trim().replace(/\s*(?:\r\n?|\n)/g, '\n').replace(/\n\s+/g, '\n');
}
var Parser = (function () {
    function Parser(beml) {
        this.beml = beml;
    }
    Parser.prototype.parse = function () {
        this.at = 0;
        this.chr = this.beml.charAt(0);
        var content;
        while (this._skipWhitespaces() == '/') {
            (content || (content = [])).push(this._readComment());
        }
        var decl = this.chr == '#' ? this._readBlockDeclaration() : null;
        return {
            nodeType: NodeType.BLOCK,
            nodeName: '#root',
            declaration: decl,
            name: decl ? decl.blockName : undefined,
            content: content ? content.concat(this._readContent(false)) : this._readContent(false),
            at: 0,
            raw: this.beml,
        };
    };
    Parser.prototype._readBlockDeclaration = function () {
        var at = this.at;
        this._next('#');
        var blockName = this._readName(reBlockNameOrNothing);
        if (!blockName) {
            throw {
                name: 'SyntaxError',
                message: 'Invalid block declaration',
                at: at,
                beml: this.beml
            };
        }
        return {
            blockName: blockName,
            at: at,
            raw: '#' + blockName
        };
    };
    Parser.prototype._readContent = function (withBrackets) {
        if (withBrackets) {
            this._next('{');
        }
        var content = [];
        for (;;) {
            switch (this._skipWhitespaces()) {
                case "'":
                case '"':
                case '`': {
                    content.push(this._readTextNode());
                    break;
                }
                case '/': {
                    content.push(this._readComment());
                    break;
                }
                case '': {
                    if (withBrackets) {
                        throw {
                            name: 'SyntaxError',
                            message: 'Missing "}" in compound statement',
                            at: this.at,
                            beml: this.beml
                        };
                    }
                    return content;
                }
                default: {
                    if (withBrackets) {
                        if (this.chr == '}') {
                            this._next();
                            return content;
                        }
                        var at = this.at;
                        reSuperCallOrNothing.lastIndex = at;
                        var superCallMatch = reSuperCallOrNothing.exec(this.beml);
                        var superCallRaw = superCallMatch[0];
                        if (superCallRaw) {
                            this.chr = this.beml.charAt((this.at = at + superCallRaw.length));
                            content.push({
                                nodeType: NodeType.SUPER_CALL,
                                elementName: superCallMatch[1] || null,
                                at: at,
                                raw: superCallRaw
                            });
                            break;
                        }
                    }
                    content.push(this._readElement());
                    break;
                }
            }
        }
    };
    Parser.prototype._readElement = function () {
        var at = this.at;
        var tagName = this._readName(reTagNameOrNothing);
        if (!tagName) {
            throw {
                name: 'SyntaxError',
                message: 'Expected tag name',
                at: at,
                beml: this.beml
            };
        }
        var elName = this._skipWhitespaces() == '/' ? (this._next(), this._readName(reElementNameOrNothing)) : null;
        if (elName) {
            this._skipWhitespaces();
        }
        var attrs = this.chr == '(' ? this._readAttributes() : null;
        if (attrs) {
            this._skipWhitespaces();
        }
        var content = this.chr == '{' ? this._readContent(true) : null;
        return {
            nodeType: NodeType.ELEMENT,
            nodeName: elName,
            tagName: tagName,
            name: elName,
            attributes: attrs,
            content: content,
            at: at,
            raw: this.beml.slice(at, this.at).trim(),
        };
    };
    Parser.prototype._readAttributes = function () {
        var at = this.at;
        this._next('(');
        if (this._skipWhitespacesAndComments() == ')') {
            this._next();
            return {
                superCall: null,
                list: [],
                at: at,
                raw: this.beml.slice(at, this.at)
            };
        }
        var superCall;
        var list = [];
        for (;;) {
            if (!superCall && this.chr == 's' && (superCall = this._readSuperCall())) {
                this._skipWhitespacesAndComments();
            }
            else {
                var name_1 = this._readName(reAttributeNameOrNothing);
                if (!name_1) {
                    throw {
                        name: 'SyntaxError',
                        message: 'Invalid attribute name',
                        at: this.at,
                        beml: this.beml
                    };
                }
                if (this._skipWhitespacesAndComments() == '=') {
                    this._next();
                    var next = this._skipWhitespaces();
                    if (next == "'" || next == '"' || next == '`') {
                        var str = this._readString();
                        list.push({
                            name: name_1,
                            value: str.multiline ? normalizeMultilineText(str.value) : str.value
                        });
                    }
                    else {
                        var value = '';
                        for (;;) {
                            if (!next) {
                                throw {
                                    name: 'SyntaxError',
                                    message: 'Invalid attribute',
                                    at: this.at,
                                    beml: this.beml
                                };
                            }
                            if (next == '\r' || next == '\n' || next == ',' || next == ')') {
                                list.push({ name: name_1, value: value.trim() });
                                break;
                            }
                            value += next;
                            next = this._next();
                        }
                    }
                    this._skipWhitespacesAndComments();
                }
                else {
                    list.push({ name: name_1, value: '' });
                }
            }
            if (this.chr == ')') {
                this._next();
                break;
            }
            else if (this.chr == ',') {
                this._next();
                this._skipWhitespacesAndComments();
            }
            else {
                throw {
                    name: 'SyntaxError',
                    message: 'Invalid attributes',
                    at: this.at,
                    beml: this.beml
                };
            }
        }
        return {
            superCall: superCall || null,
            list: list,
            at: at,
            raw: this.beml.slice(at, this.at)
        };
    };
    Parser.prototype._skipWhitespacesAndComments = function () {
        var chr = this.chr;
        for (;;) {
            if (chr && chr <= ' ') {
                chr = this._next();
            }
            else if (chr == '/') {
                this._readComment();
                chr = this.chr;
            }
            else {
                break;
            }
        }
        return chr;
    };
    Parser.prototype._readSuperCall = function () {
        var at = this.at;
        reSuperCallOrNothing.lastIndex = at;
        var superCallMatch = reSuperCallOrNothing.exec(this.beml);
        var superCallRaw = superCallMatch[0];
        if (superCallRaw) {
            this.chr = this.beml.charAt((this.at = at + superCallRaw.length));
            return {
                nodeType: NodeType.SUPER_CALL,
                elementName: superCallMatch[1] || null,
                at: at,
                raw: superCallRaw
            };
        }
        return null;
    };
    Parser.prototype._readTextNode = function () {
        var at = this.at;
        var str = this._readString();
        return {
            nodeType: NodeType.TEXT,
            value: str.multiline ? normalizeMultilineText(str.value) : str.value,
            at: at,
            raw: this.beml.slice(at, this.at)
        };
    };
    Parser.prototype._readString = function () {
        var quoteChar = this.chr;
        if (quoteChar != "'" && quoteChar != '"' && quoteChar != '`') {
            throw {
                name: 'SyntaxError',
                message: "Expected \"'\" instead of \"" + this.chr + "\"",
                at: this.at,
                beml: this.beml
            };
        }
        var str = '';
        for (var next = void 0; (next = this._next());) {
            if (next == quoteChar) {
                this._next();
                return {
                    value: str,
                    multiline: quoteChar == '`'
                };
            }
            if (next == '\\') {
                str += next + this._next();
            }
            else {
                if (quoteChar != '`' && (next == '\r' || next == '\n')) {
                    break;
                }
                str += next;
            }
        }
        throw {
            name: 'SyntaxError',
            message: 'Invalid string',
            at: this.at,
            beml: this.beml
        };
    };
    Parser.prototype._readComment = function () {
        var at = this.at;
        var value = '';
        var multiline;
        switch (this._next('/')) {
            case '/': {
                for (var next = void 0; (next = this._next()) && next != '\r' && next != '\n';) {
                    value += next;
                }
                multiline = false;
                break;
            }
            case '*': {
                var stop_1 = false;
                do {
                    switch (this._next()) {
                        case '*': {
                            if (this._next() == '/') {
                                this._next();
                                stop_1 = true;
                            }
                            else {
                                value += '*' + this.chr;
                            }
                            break;
                        }
                        case '': {
                            throw {
                                name: 'SyntaxError',
                                message: 'Missing "*/" in compound statement',
                                at: this.at,
                                beml: this.beml
                            };
                        }
                        default: {
                            value += this.chr;
                        }
                    }
                } while (!stop_1);
                multiline = true;
                break;
            }
            default: {
                throw {
                    name: 'SyntaxError',
                    message: "Expected \"/\" instead of \"" + this.chr + "\"",
                    at: this.at,
                    beml: this.beml
                };
            }
        }
        return {
            nodeType: NodeType.COMMENT,
            value: value,
            multiline: multiline,
            at: at,
            raw: this.beml.slice(at, this.at)
        };
    };
    Parser.prototype._readName = function (reNameOrNothing) {
        reNameOrNothing.lastIndex = this.at;
        var name = reNameOrNothing.exec(this.beml)[0];
        if (name) {
            this.chr = this.beml.charAt((this.at += name.length));
            return name;
        }
        return null;
    };
    Parser.prototype._skipWhitespaces = function () {
        var chr = this.chr;
        while (chr && chr <= ' ') {
            chr = this._next();
        }
        return chr;
    };
    Parser.prototype._next = function (current) {
        if (current && current != this.chr) {
            throw {
                name: 'SyntaxError',
                message: "Expected \"" + current + "\" instead of \"" + this.chr + "\"",
                at: this.at,
                beml: this.beml
            };
        }
        return (this.chr = this.beml.charAt(++this.at));
    };
    return Parser;
}());
exports.default = Parser;


/***/ }),
/* 27 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var Parser_1 = __webpack_require__(26);
exports.Parser = Parser_1.default;
var Template_1 = __webpack_require__(44);
exports.Template = Template_1.default;


/***/ }),
/* 28 */
/***/ (function(module, exports, __webpack_require__) {

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
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = htmlToFragment;


/***/ }),
/* 29 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var beml_1 = __webpack_require__(27);
exports.BemlParser = beml_1.Parser;
exports.BemlTemplate = beml_1.Template;
var escape_string_1 = __webpack_require__(12);
var escape_html_1 = __webpack_require__(11);
var html_to_fragment_1 = __webpack_require__(28);
var DisposableMixin_1 = __webpack_require__(16);
exports.DisposableMixin = DisposableMixin_1.default;
var formatters_1 = __webpack_require__(23);
exports.formatters = formatters_1.default;
var getText_1 = __webpack_require__(24);
exports.getText = getText_1.default;
var Component_1 = __webpack_require__(1);
exports.Component = Component_1.default;
var rt_content_1 = __webpack_require__(30);
var rt_if_then_1 = __webpack_require__(14);
var rt_if_else_1 = __webpack_require__(31);
var rt_repeat_1 = __webpack_require__(32);
var ComponentProperties_1 = __webpack_require__(13);
exports.ComponentProperties = ComponentProperties_1.default;
var d_1 = __webpack_require__(3);
exports.d = d_1.default;
var camelize_1 = __webpack_require__(4);
var hyphenize_1 = __webpack_require__(8);
var isRegExp_1 = __webpack_require__(19);
var defer_1 = __webpack_require__(17);
var Components = {
    RtContent: rt_content_1.default,
    RtIfThen: rt_if_then_1.default,
    RtIfElse: rt_if_else_1.default,
    RtRepeat: rt_repeat_1.default
};
exports.Components = Components;
var Utils = {
    camelize: camelize_1.default,
    hyphenize: hyphenize_1.default,
    escapeString: escape_string_1.default,
    escapeHTML: escape_html_1.escapeHTML,
    unescapeHTML: escape_html_1.unescapeHTML,
    isRegExp: isRegExp_1.default,
    defer: defer_1.default,
    htmlToFragment: html_to_fragment_1.default
};
exports.Utils = Utils;


/***/ }),
/* 30 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var cellx_1 = __webpack_require__(0);
var Component_1 = __webpack_require__(1);
var ElementProtoMixin_1 = __webpack_require__(7);
var bindContent_1 = __webpack_require__(6);
var attachChildComponentElements_1 = __webpack_require__(5);
var Features_1 = __webpack_require__(2);
var d_1 = __webpack_require__(3);
var KEY_TEMPLATES_FIXED = cellx_1.JS.Symbol('Rionite.RtContent#templatesFixed');
var RtContent = (function (_super) {
    __extends(RtContent, _super);
    function RtContent() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    RtContent.prototype._attach = function () {
        this._attached = true;
        var props = this.props;
        if (props['cloning']) {
            var ownerComponent = this.ownerComponent;
            var el = this.element;
            if (this.isReady) {
                for (var child = void 0; (child = el.firstChild);) {
                    el.removeChild(child);
                }
            }
            else {
                var content_1 = props.content = document.createDocumentFragment();
                ElementProtoMixin_1.ElementsController.skipConnectionStatusCallbacks = true;
                for (var child = void 0; (child = el.firstChild);) {
                    content_1.appendChild(child);
                }
                ElementProtoMixin_1.ElementsController.skipConnectionStatusCallbacks = false;
                var ownerComponentInputContent = ownerComponent.props.content;
                var selector = this.props['select'];
                if (selector) {
                    if (!Features_1.templateTag && !ownerComponentInputContent[KEY_TEMPLATES_FIXED]) {
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
                        ElementProtoMixin_1.ElementsController.skipConnectionStatusCallbacks = true;
                        for (var i = 0; i < selectedElCount; i++) {
                            rawContent.appendChild(selectedEls[i].cloneNode(true));
                        }
                        ElementProtoMixin_1.ElementsController.skipConnectionStatusCallbacks = false;
                    }
                    else {
                        this._rawContent = content_1;
                    }
                }
                else {
                    this._rawContent = ownerComponentInputContent.firstChild ? ownerComponentInputContent : content_1;
                }
                this.isReady = true;
            }
            var content = this._rawContent.cloneNode(true);
            var getContext = props['getContext'];
            var _a = this._rawContent == props.content ?
                bindContent_1.default(content, ownerComponent, getContext ? ownerComponent[getContext](this, props.context) : props.context) :
                bindContent_1.default(content, ownerComponent.ownerComponent, getContext ?
                    ownerComponent[getContext](this, ownerComponent.props.context) :
                    ownerComponent.props.context), bindings = _a.bindings, childComponents = _a.childComponents;
            this._bindings = bindings;
            el.appendChild(content);
            if (!Features_1.nativeCustomElements && childComponents) {
                attachChildComponentElements_1.default(childComponents);
            }
        }
        else {
            if (this.isReady) {
                this._unfreezeBindings();
            }
            else {
                var ownerComponent = this.ownerComponent;
                var ownerComponentInputContent = ownerComponent.props.content;
                var content = void 0;
                if (ownerComponentInputContent.firstChild) {
                    var selector = this.props['select'];
                    if (selector) {
                        if (!Features_1.templateTag && !ownerComponentInputContent[KEY_TEMPLATES_FIXED]) {
                            var templates = ownerComponentInputContent.querySelectorAll('template');
                            for (var i = templates.length; i;) {
                                templates[--i].content;
                            }
                            ownerComponentInputContent[KEY_TEMPLATES_FIXED] = true;
                        }
                        var selectedEls = ownerComponentInputContent.querySelectorAll(selector);
                        var selectedElCount = selectedEls.length;
                        if (selectedElCount) {
                            content = document.createDocumentFragment();
                            ElementProtoMixin_1.ElementsController.skipConnectionStatusCallbacks = true;
                            for (var i = 0; i < selectedElCount; i++) {
                                content.appendChild(selectedEls[i]);
                            }
                            ElementProtoMixin_1.ElementsController.skipConnectionStatusCallbacks = false;
                        }
                    }
                    else {
                        content = ownerComponentInputContent;
                    }
                }
                var el = this.element;
                var getContext = props['getContext'];
                var _b = content ?
                    bindContent_1.default(content, ownerComponent.ownerComponent, getContext ?
                        ownerComponent[getContext](this, ownerComponent.props.context) :
                        ownerComponent.props.context) :
                    bindContent_1.default(el, ownerComponent, getContext ? ownerComponent[getContext](this, props.context) : props.context), bindings = _b.bindings, childComponents = _b.childComponents;
                this._bindings = bindings;
                if (content) {
                    for (var child = void 0; (child = el.firstChild);) {
                        el.removeChild(child);
                    }
                    el.appendChild(content);
                }
                if ((!content || !Features_1.nativeCustomElements) && childComponents) {
                    attachChildComponentElements_1.default(childComponents);
                }
                this.isReady = true;
            }
        }
    };
    RtContent.prototype._detach = function () {
        this._attached = false;
        if (this.props['cloning']) {
            this._destroyBindings();
        }
        else {
            this._freezeBindings();
        }
    };
    return RtContent;
}(Component_1.default));
RtContent = __decorate([
    d_1.default.Component({
        elementIs: 'rt-content',
        props: {
            select: { type: String, readonly: true },
            cloning: { default: true, readonly: true },
            getContext: { type: String, readonly: true }
        },
        template: ''
    })
], RtContent);
exports.default = RtContent;


/***/ }),
/* 31 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var d_1 = __webpack_require__(3);
var rt_if_then_1 = __webpack_require__(14);
var RtIfElse = (function (_super) {
    __extends(RtIfElse, _super);
    function RtIfElse() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this._elseMode = true;
        return _this;
    }
    return RtIfElse;
}(rt_if_then_1.default));
RtIfElse = __decorate([
    d_1.default.Component({
        elementIs: 'rt-if-else',
        elementExtends: 'template'
    })
], RtIfElse);
exports.default = RtIfElse;


/***/ }),
/* 32 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var cellx_1 = __webpack_require__(0);
var Component_1 = __webpack_require__(1);
var compileKeypath_1 = __webpack_require__(20);
var bindContent_1 = __webpack_require__(6);
var attachChildComponentElements_1 = __webpack_require__(5);
var namePattern_1 = __webpack_require__(10);
var keypathPattern_1 = __webpack_require__(9);
var Features_1 = __webpack_require__(2);
var d_1 = __webpack_require__(3);
var Map = cellx_1.JS.Map;
var nextTick = cellx_1.Utils.nextTick;
var slice = Array.prototype.slice;
var reForAttributeValue = RegExp("^\\s*(" + namePattern_1.default + ")\\s+of\\s+(" + keypathPattern_1.default + ")\\s*$");
var RtRepeat = (function (_super) {
    __extends(RtRepeat, _super);
    function RtRepeat() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this._destroyed = false;
        return _this;
    }
    RtRepeat.prototype.elementConnected = function () {
        if (this._destroyed) {
            throw new TypeError('Instance of RtRepeat was destroyed and can no longer be used');
        }
        if (!this.initialized) {
            var props = this.props;
            var forAttrValue = props['for'].match(reForAttributeValue);
            if (!forAttrValue) {
                throw new SyntaxError("Invalid value of attribute \"for\" (" + props['for'] + ")");
            }
            this._itemName = forAttrValue[1];
            this._list = new cellx_1.Cell(compileKeypath_1.default(forAttrValue[2]), { owner: props.context });
            this._itemMap = new Map();
            this._trackBy = props['trackBy'];
            var rawItemContent = this._rawItemContent =
                document.importNode(this.element.content, true);
            if (props['strip']) {
                var firstChild = rawItemContent.firstChild;
                var lastChild = rawItemContent.lastChild;
                if (firstChild == lastChild) {
                    if (firstChild.nodeType == Node.TEXT_NODE) {
                        firstChild.textContent = firstChild.textContent.trim();
                    }
                }
                else {
                    if (firstChild.nodeType == Node.TEXT_NODE) {
                        if (!(firstChild.textContent = firstChild.textContent.replace(/^\s+/, ''))) {
                            rawItemContent.removeChild(firstChild);
                        }
                    }
                    if (lastChild.nodeType == Node.TEXT_NODE) {
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
    };
    RtRepeat.prototype.elementDisconnected = function () {
        this._destroy();
    };
    RtRepeat.prototype._onListChange = function () {
        if (this.element.parentNode) {
            this._render(true);
        }
    };
    RtRepeat.prototype._attach = function () {
        this._attached = true;
    };
    RtRepeat.prototype._detach = function () {
        this._attached = false;
    };
    RtRepeat.prototype._render = function (c) {
        var _this = this;
        var oldItemMap = this._oldItemMap = this._itemMap;
        this._itemMap = new Map();
        var list = this._list.get();
        var changed = false;
        if (list) {
            this._lastNode = this.element;
            changed = list.reduce(function (changed, item, index) { return _this._renderItem(item, index) || changed; }, changed);
        }
        if (oldItemMap.size) {
            this._clearByItemMap(oldItemMap);
        }
        else if (!changed) {
            return;
        }
        if (c) {
            nextTick(function () {
                _this.emit('change');
            });
        }
    };
    RtRepeat.prototype._renderItem = function (item, index) {
        var trackBy = this._trackBy;
        var trackingValue = trackBy ? (trackBy == '$index' ? index : item[trackBy]) : item;
        var prevItems = this._oldItemMap.get(trackingValue);
        var currentItems = this._itemMap.get(trackingValue);
        if (prevItems) {
            var prevItem = void 0;
            if (prevItems.length == 1) {
                prevItem = prevItems[0];
                this._oldItemMap.delete(trackingValue);
            }
            else {
                prevItem = prevItems.shift();
            }
            if (currentItems) {
                currentItems.push(prevItem);
            }
            else {
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
            }
            else {
                var df = document.createDocumentFragment();
                for (var _i = 0, nodes_1 = nodes; _i < nodes_1.length; _i++) {
                    var node = nodes_1[_i];
                    df.appendChild(node);
                }
                var newLastNode_1 = df.lastChild;
                this._lastNode.parentNode.insertBefore(df, this._lastNode.nextSibling);
                this._lastNode = newLastNode_1;
            }
            return true;
        }
        var itemCell = new cellx_1.Cell(item);
        var indexCell = new cellx_1.Cell(index);
        var content = this._rawItemContent.cloneNode(true);
        var context = Object.create(this._context, (_a = {},
            _a[this._itemName] = {
                get: function () {
                    return itemCell.get();
                }
            },
            _a.$index = {
                get: function () {
                    return indexCell.get();
                }
            },
            _a));
        var _b = bindContent_1.default(content, this.ownerComponent, context), bindings = _b.bindings, childComponents = _b.childComponents;
        var newItem = {
            item: itemCell,
            index: indexCell,
            nodes: slice.call(content.childNodes),
            bindings: bindings
        };
        if (currentItems) {
            currentItems.push(newItem);
        }
        else {
            this._itemMap.set(trackingValue, [newItem]);
        }
        var newLastNode = content.lastChild;
        this._lastNode.parentNode.insertBefore(content, this._lastNode.nextSibling);
        this._lastNode = newLastNode;
        if (!Features_1.nativeCustomElements && childComponents) {
            attachChildComponentElements_1.default(childComponents);
        }
        return true;
        var _a;
    };
    RtRepeat.prototype._clearByItemMap = function (itemMap) {
        itemMap.forEach(this._clearByItems, this);
        itemMap.clear();
    };
    RtRepeat.prototype._clearByItems = function (items) {
        for (var i = items.length; i;) {
            var item = items[--i];
            var bindings = item.bindings;
            if (bindings) {
                for (var i_1 = bindings.length; i_1;) {
                    bindings[--i_1].off();
                }
            }
            var nodes = item.nodes;
            for (var i_2 = nodes.length; i_2;) {
                var node = nodes[--i_2];
                var parentNode = node.parentNode;
                if (parentNode) {
                    parentNode.removeChild(node);
                }
            }
        }
    };
    RtRepeat.prototype._destroy = function () {
        if (this._destroyed) {
            return;
        }
        this._destroyed = true;
        this._clearByItemMap(this._itemMap);
        this._list.off('change', this._onListChange, this);
    };
    return RtRepeat;
}(Component_1.default));
RtRepeat = __decorate([
    d_1.default.Component({
        elementIs: 'rt-repeat',
        elementExtends: 'template',
        props: {
            for: { type: String, required: true, readonly: true },
            trackBy: { type: String, readonly: true },
            strip: { default: false, readonly: true }
        }
    })
], RtRepeat);
exports.default = RtRepeat;


/***/ }),
/* 33 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
function setAttribute(el, name, value) {
    if (value === false || value == null) {
        el.removeAttribute(name);
    }
    else {
        el.setAttribute(name, value === true ? '' : value);
    }
}
exports.default = setAttribute;


/***/ }),
/* 34 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
function bindEvents(component, events) {
    for (var elName in events) {
        var asset = void 0;
        if (elName == ':component') {
            asset = component;
        }
        else if (elName == ':element') {
            asset = component.element;
        }
        else {
            asset = component.$(elName);
            if (!asset) {
                continue;
            }
        }
        var assetEvents = events[elName];
        for (var evtName in assetEvents) {
            component.listenTo(asset, evtName, assetEvents[evtName]);
        }
    }
}
exports.default = bindEvents;


/***/ }),
/* 35 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var cache = Object.create(null);
function formattersReducer(jsExpr, formatter) {
    var args = formatter.arguments;
    return "(this." + formatter.name + " || formatters." + formatter.name + ").call(this, " + jsExpr + (args && args.value.length ? ', ' + args.value.join(', ') : '') + ")";
}
function bindingToJSExpression(binding) {
    var bindingRaw = binding.raw;
    if (cache[bindingRaw]) {
        return cache[bindingRaw];
    }
    var keys = binding.keypath.value.split('.');
    var keyCount = keys.length;
    var formatters = binding.formatters;
    if (keyCount == 1) {
        return (cache[bindingRaw] = formatters.length ?
            formatters.reduce(formattersReducer, "this['" + keys[0] + "']") :
            "this['" + keys[0] + "']");
    }
    var index = keyCount - 2;
    var jsExpr = Array(index);
    while (index) {
        jsExpr[--index] = " && (temp = temp['" + keys[index + 1] + "'])";
    }
    return (cache[bindingRaw] = "(temp = this['" + keys[0] + "'])" + jsExpr.join('') + " && " + (formatters.length ?
        formatters.reduce(formattersReducer, "temp['" + keys[keyCount - 1] + "']") :
        "temp['" + keys[keyCount - 1] + "']"));
}
exports.default = bindingToJSExpression;


/***/ }),
/* 36 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var escape_string_1 = __webpack_require__(12);
var ContentParser_1 = __webpack_require__(15);
var bindingToJSExpression_1 = __webpack_require__(35);
var formatters_1 = __webpack_require__(23);
var componentPropertyValuesKey_1 = __webpack_require__(21);
var getUID_1 = __webpack_require__(18);
var ContentNodeType = ContentParser_1.default.ContentNodeType;
var keyCounter = 0;
var cache = Object.create(null);
function compileContent(parsedContent, content, ownerComponent) {
    var cacheKey = (ownerComponent ? getUID_1.default(ownerComponent) + '/' : '/') + content;
    if (cache[cacheKey]) {
        return cache[cacheKey];
    }
    var inner;
    if (parsedContent.length == 1 && parsedContent[0].nodeType == ContentNodeType.BINDING) {
        inner = Function('formatters', "var temp; return " + bindingToJSExpression_1.default(parsedContent[0]) + ";");
    }
    else {
        var jsExprArray = [];
        for (var _i = 0, parsedContent_1 = parsedContent; _i < parsedContent_1.length; _i++) {
            var node = parsedContent_1[_i];
            jsExprArray.push(node.nodeType == ContentNodeType.TEXT ?
                "'" + escape_string_1.default(node.value) + "'" :
                bindingToJSExpression_1.default(node));
        }
        inner = Function('formatters', "var temp; return [" + jsExprArray.join(', ') + "].join('');");
    }
    return (cache[cacheKey] = ownerComponent ? function () {
        var result = inner.call(this, formatters_1.default);
        if (result && typeof result == 'object') {
            var key = String(++keyCounter);
            (ownerComponent[componentPropertyValuesKey_1.default] ||
                (ownerComponent[componentPropertyValuesKey_1.default] = new Map())).set(key, result);
            return key;
        }
        return result;
    } : function () {
        return inner.call(this, formatters_1.default);
    });
}
exports.default = compileContent;


/***/ }),
/* 37 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var cellx_1 = __webpack_require__(0);
function freezeBinding(binding) {
    binding._frozenState = {
        changeEvents: binding.getEvents('change'),
        value: binding._value
    };
    binding.off();
}
function unfreezeBinding(binding) {
    var frozenState = binding._frozenState;
    var changeEvents = frozenState.changeEvents;
    binding._frozenState = null;
    for (var _i = 0, changeEvents_1 = changeEvents; _i < changeEvents_1.length; _i++) {
        var evt = changeEvents_1[_i];
        binding.on('change', evt.listener, evt.context);
    }
    if (frozenState.value !== binding._value) {
        binding._changeEvent = {
            target: binding,
            type: 'change',
            oldValue: frozenState.value,
            value: binding._value,
            prev: null
        };
        binding._canCancelChange = true;
        binding._addToRelease();
    }
}
function freezeBindings(bindings) {
    cellx_1.Cell.forceRelease();
    for (var _i = 0, bindings_1 = bindings; _i < bindings_1.length; _i++) {
        var binding = bindings_1[_i];
        freezeBinding(binding);
    }
}
exports.freezeBindings = freezeBindings;
function unfreezeBindings(bindings) {
    cellx_1.Cell.forceRelease();
    for (var _i = 0, bindings_2 = bindings; _i < bindings_2.length; _i++) {
        var binding = bindings_2[_i];
        unfreezeBinding(binding);
    }
    cellx_1.Cell.forceRelease();
}
exports.unfreezeBindings = unfreezeBindings;


/***/ }),
/* 38 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var cellx_1 = __webpack_require__(0);
var escape_html_1 = __webpack_require__(11);
var componentPropertyValuesKey_1 = __webpack_require__(21);
var isRegExp_1 = __webpack_require__(19);
var componentPropertyTypeHandlersMap = new cellx_1.JS.Map([
    [Boolean, [
            function (value, defaultValue) {
                return value !== null ? value != 'no' : !!defaultValue;
            },
            function (value, defaultValue) {
                return value ? '' : (defaultValue ? 'no' : null);
            }
        ]],
    [Number, [
            function (value, defaultValue) {
                return value !== null ? +value : (defaultValue !== undefined ? defaultValue : null);
            },
            function (value) {
                return value != null ? String(+value) : null;
            }
        ]],
    [String, [
            function (value, defaultValue) {
                return value !== null ? value : (defaultValue !== undefined ? defaultValue : null);
            },
            function (value) {
                return value != null ? String(value) : null;
            }
        ]],
    [Object, [
            function (value, defaultValue, component) {
                if (value === null) {
                    return defaultValue || null;
                }
                var componentPropertyValues = component.ownerComponent &&
                    component.ownerComponent[componentPropertyValuesKey_1.default];
                if (!componentPropertyValues || !componentPropertyValues.has(value)) {
                    throw new TypeError('Using a nonexistent key');
                }
                var result = componentPropertyValues.get(value);
                componentPropertyValues.delete(value);
                return result;
            },
            function (value) {
                return value != null ? '' : null;
            }
        ]],
    [eval, [
            function (value, defaultValue) {
                return value !== null ?
                    Function("return " + escape_html_1.unescapeHTML(value) + ";")() :
                    (defaultValue !== undefined ? defaultValue : null);
            },
            function (value) {
                return value != null ? escape_html_1.escapeHTML(isRegExp_1.default(value) ? value.toString() : JSON.stringify(value)) : null;
            }
        ]]
]);
componentPropertyTypeHandlersMap.set('boolean', componentPropertyTypeHandlersMap.get(Boolean));
componentPropertyTypeHandlersMap.set('number', componentPropertyTypeHandlersMap.get(Number));
componentPropertyTypeHandlersMap.set('string', componentPropertyTypeHandlersMap.get(String));
componentPropertyTypeHandlersMap.set('object', componentPropertyTypeHandlersMap.get(Object));
exports.default = componentPropertyTypeHandlersMap;


/***/ }),
/* 39 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var cellx_1 = __webpack_require__(0);
exports.default = new cellx_1.JS.Map([
    [Boolean, 'boolean'],
    ['boolean', 'boolean'],
    [Number, 'number'],
    ['number', 'number'],
    [String, 'string'],
    ['string', 'string'],
    [Object, 'object'],
    ['object', 'object']
]);


/***/ }),
/* 40 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
exports.default = [
    'change',
    'click',
    'dblclick',
    'focusin',
    'focusout',
    'input',
    'keydown',
    'keypress',
    'keyup',
    'mousedown',
    'mouseup',
    'submit'
];


/***/ }),
/* 41 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var camelize_1 = __webpack_require__(4);
function initElementAttributes(component, constr) {
    var propsConfig = constr.props;
    if (propsConfig) {
        var props = component.props;
        for (var name_1 in propsConfig) {
            var type = typeof propsConfig[name_1];
            if (type != 'function' && (type != 'object' || propsConfig[name_1].default !== undefined)) {
                var camelizedName = camelize_1.default(name_1);
                props[camelizedName] = props[camelizedName];
            }
        }
    }
}
exports.default = initElementAttributes;


/***/ }),
/* 42 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
function onEvent(evt) {
    var node;
    var attrName;
    var targetEls;
    if (evt instanceof Event) {
        node = evt.target;
        attrName = 'rt-' + evt.type;
    }
    else {
        node = evt.target.element;
        attrName = 'rt-component-' + evt.type;
    }
    for (;;) {
        if (node.nodeType == Node.ELEMENT_NODE && node.hasAttribute(attrName)) {
            (targetEls || (targetEls = [])).push(node);
        }
        node = node.parentNode;
        if (!node) {
            break;
        }
        var component = node.$c;
        if (component && targetEls) {
            for (var _i = 0, targetEls_1 = targetEls; _i < targetEls_1.length; _i++) {
                var targetEl = targetEls_1[_i];
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
exports.default = onEvent;


/***/ }),
/* 43 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var cellx_1 = __webpack_require__(0);
var beml_1 = __webpack_require__(27);
var elementConstructorMap_1 = __webpack_require__(22);
var ElementProtoMixin_1 = __webpack_require__(7);
var hyphenize_1 = __webpack_require__(8);
var mixin = cellx_1.Utils.mixin;
var push = Array.prototype.push;
function initBlockNames(componentConstr, parentComponentConstr, elIs) {
    componentConstr._blockNames = [elIs];
    if (parentComponentConstr._blockNames) {
        push.apply(componentConstr._blockNames, parentComponentConstr._blockNames);
    }
}
function registerComponent(componentConstr) {
    if (componentConstr._registeredComponent === componentConstr) {
        throw new TypeError('Component already registered');
    }
    var elIs = componentConstr.elementIs;
    if (!elIs) {
        throw new TypeError('Static property "elementIs" is required');
    }
    var props = componentConstr.props;
    if (props && (props['content'] || props['context'])) {
        throw new TypeError("No need to declare property \"" + (props['content'] ? 'content' : 'context') + "\"");
    }
    var parentComponentConstr = Object.getPrototypeOf(componentConstr.prototype).constructor;
    var bemlTemplate = componentConstr.bemlTemplate;
    if (bemlTemplate !== undefined && bemlTemplate !== parentComponentConstr.bemlTemplate) {
        if (bemlTemplate !== null) {
            if (typeof bemlTemplate == 'string') {
                if (parentComponentConstr.bemlTemplate) {
                    componentConstr.template = parentComponentConstr.bemlTemplate
                        .extend(bemlTemplate, { blockName: elIs });
                }
                else {
                    componentConstr.template = componentConstr.bemlTemplate =
                        new beml_1.Template(bemlTemplate, { blockName: elIs });
                }
            }
            else {
                componentConstr.template = bemlTemplate;
            }
            initBlockNames(componentConstr, parentComponentConstr, elIs);
        }
        else {
            componentConstr.template = null;
        }
    }
    else if (componentConstr.template !== undefined && componentConstr.template !== parentComponentConstr.template) {
        if (bemlTemplate !== null && bemlTemplate !== undefined) {
            componentConstr.bemlTemplate = null;
        }
        initBlockNames(componentConstr, parentComponentConstr, elIs);
    }
    componentConstr._blockNamesString = elIs + ' ' + parentComponentConstr._blockNamesString;
    componentConstr._rawContent = undefined;
    componentConstr._elementClassNameMap = Object.create(parentComponentConstr._elementClassNameMap || null);
    var elExtends = componentConstr.elementExtends;
    var parentElConstr = elExtends ?
        elementConstructorMap_1.default[elExtends] ||
            window["HTML" + (elExtends.charAt(0).toUpperCase() + elExtends.slice(1)) + "Element"] :
        HTMLElement;
    var elConstr = function (self) {
        return parentElConstr.call(this, self);
    };
    var elProto = elConstr.prototype = Object.create(parentElConstr.prototype);
    Object.defineProperty(elConstr, 'observedAttributes', {
        configurable: true,
        enumerable: true,
        get: function () {
            var props = componentConstr.props;
            if (!props) {
                return [];
            }
            var observedAttrs = [];
            for (var name_1 in props) {
                observedAttrs.push(hyphenize_1.default(name_1));
            }
            return observedAttrs;
        }
    });
    elConstr['_rioniteComponentConstructor'] = componentConstr;
    mixin(elProto, ElementProtoMixin_1.default);
    Object.defineProperty(elProto, 'constructor', {
        configurable: true,
        writable: true,
        value: elConstr
    });
    elementConstructorMap_1.default[elIs] = elConstr;
    window.customElements.define(elIs, elConstr, elExtends ? { extends: elExtends } : null);
    return (componentConstr._registeredComponent = componentConstr);
}
exports.default = registerComponent;


/***/ }),
/* 44 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var escape_string_1 = __webpack_require__(12);
var escape_html_1 = __webpack_require__(11);
var Parser_1 = __webpack_require__(26);
var selfClosingTags_1 = __webpack_require__(45);
var join = Array.prototype.join;
var elDelimiter = '__';
var Template = (function () {
    function Template(beml, opts) {
        var block = new Parser_1.default(beml).parse();
        var blockName = opts && opts.blockName || block.name;
        if (!blockName) {
            throw new TypeError('blockName is required');
        }
        var parent = this.parent = opts && opts.parent || null;
        this._elementClassesTemplate = parent ?
            [blockName + elDelimiter].concat(parent._elementClassesTemplate) :
            [blockName + elDelimiter, ''];
        var rootNode = { elementName: null, source: null, innerSource: [], containsSuperCall: false };
        this._currentNode = rootNode;
        this._nodes = [rootNode];
        var nodeMap = this._nodeMap = { '#root': rootNode };
        for (var _i = 0, _a = block.content; _i < _a.length; _i++) {
            var node = _a[_i];
            this._handleNode(node, '#root');
        }
        this._renderer = parent ?
            parent._renderer :
            Function("return " + this._currentNode.innerSource.join(' + ') + ";");
        Object.keys(nodeMap).forEach(function (name) {
            var node = nodeMap[name];
            if (node.source) {
                this[name] = Function("return " + node.source.join(' + ') + ";");
                if (node.containsSuperCall) {
                    var inner_1 = Function('$super', "return " + (node.innerSource.join(' + ') || "''") + ";");
                    var parentElementRendererMap_1 = parent && parent._elementRendererMap;
                    this[name + '@content'] = function () { return inner_1.call(this, parentElementRendererMap_1); };
                }
                else {
                    this[name + '@content'] = Function("return " + (node.innerSource.join(' + ') || "''") + ";");
                }
            }
        }, (this._elementRendererMap = { __proto__: parent && parent._elementRendererMap }));
    }
    Template.prototype._handleNode = function (node, parentNodeName) {
        switch (node.nodeType) {
            case Parser_1.NodeType.ELEMENT: {
                var parent_1 = this.parent;
                var nodes = this._nodes;
                var el = node;
                var tagName = el.tagName;
                var elName = el.name;
                var elAttrs = el.attributes;
                var content = el.content;
                if (elName) {
                    var attrListMap = this._attributeListMap ||
                        (this._attributeListMap = { __proto__: parent_1 && parent_1._attributeListMap || null });
                    var attrCountMap = this._attributeCountMap ||
                        (this._attributeCountMap = { __proto__: parent_1 && parent_1._attributeCountMap || null });
                    var renderredAttrs = void 0;
                    if (elAttrs && (elAttrs.list.length || elAttrs.superCall)) {
                        var superCall = elAttrs.superCall;
                        var attrList = void 0;
                        var attrCount = void 0;
                        if (superCall) {
                            if (!parent_1) {
                                throw new TypeError("Required parent template for \"" + superCall.raw + "\"");
                            }
                            attrList = attrListMap[elName] =
                                Object.create(parent_1._attributeListMap[superCall.elementName || elName] || null);
                            attrCount = attrCountMap[elName] =
                                parent_1._attributeCountMap[superCall.elementName || elName] || 0;
                        }
                        else {
                            attrList = attrListMap[elName] = {};
                            attrCount = attrCountMap[elName] = 0;
                        }
                        for (var _i = 0, _a = elAttrs.list; _i < _a.length; _i++) {
                            var attr = _a[_i];
                            var name_1 = attr.name;
                            var value = attr.value;
                            var index = attrList[name_1];
                            if (index === undefined) {
                                attrList[attrCount] = " " + name_1 + "=\"" + (value && escape_html_1.default(escape_string_1.default(value))) + "\"";
                                attrList[name_1] = attrCount++;
                                attrCountMap[elName] = attrCount;
                            }
                            else {
                                attrList[index] = " " + name_1 + "=\"" + (value && escape_html_1.default(escape_string_1.default(value))) + "\"";
                                attrList[name_1] = index;
                            }
                        }
                        if (elName.charAt(0) != '_') {
                            var hasAttrClass = 'class' in attrList;
                            attrList = { __proto__: attrList, length: attrCount + +!hasAttrClass };
                            if (hasAttrClass) {
                                attrList[attrList['class']] = ' class="' +
                                    this._elementClassesTemplate.join(elName + ' ') +
                                    attrList[attrList['class']].slice(8);
                            }
                            else {
                                attrList[attrCount] = " class=\"" + this._elementClassesTemplate.join(elName + ' ').slice(0, -1) + "\"";
                            }
                        }
                        else {
                            attrList = { __proto__: attrList, length: attrCount };
                        }
                        renderredAttrs = join.call(attrList, '');
                    }
                    else {
                        renderredAttrs = elName.charAt(0) != '_' ?
                            " class=\"" + this._elementClassesTemplate.join(elName + ' ').slice(0, -1) + "\"" :
                            '';
                    }
                    var currentNode = {
                        elementName: elName,
                        source: [
                            "'<" + tagName + renderredAttrs + ">'",
                            content && content.length ?
                                "this['" + elName + "@content']() + '</" + tagName + ">'" :
                                (!content && tagName in selfClosingTags_1.default ? "''" : "'</" + tagName + ">'")
                        ],
                        innerSource: [],
                        containsSuperCall: false
                    };
                    nodes.push((this._currentNode = currentNode));
                    this._nodeMap[elName] = currentNode;
                }
                else {
                    this._currentNode.innerSource.push("'<" + tagName + (elAttrs ?
                        elAttrs.list.map(function (attr) { return " " + attr.name + "=\"" + (attr.value && escape_html_1.default(escape_string_1.default(attr.value))) + "\""; }).join('') :
                        '') + ">'");
                }
                if (content) {
                    for (var _b = 0, content_1 = content; _b < content_1.length; _b++) {
                        var contentNode = content_1[_b];
                        this._handleNode(contentNode, elName || parentNodeName);
                    }
                }
                if (elName) {
                    nodes.pop();
                    this._currentNode = nodes[nodes.length - 1];
                    this._currentNode.innerSource.push("this['" + elName + "']()");
                }
                else if (content || !(tagName in selfClosingTags_1.default)) {
                    this._currentNode.innerSource.push("'</" + tagName + ">'");
                }
                break;
            }
            case Parser_1.NodeType.TEXT: {
                this._currentNode.innerSource.push("'" + escape_string_1.default(node.value) + "'");
                break;
            }
            case Parser_1.NodeType.SUPER_CALL: {
                this._currentNode.innerSource.push("$super['" + (node.elementName || parentNodeName) + "@content'].call(this)");
                this._currentNode.containsSuperCall = true;
                break;
            }
        }
    };
    Template.prototype.extend = function (beml, opts) {
        return new Template(beml, { __proto__: opts || null, parent: this });
    };
    Template.prototype.render = function () {
        return this._renderer.call(this._elementRendererMap);
    };
    return Template;
}());
exports.default = Template;


/***/ }),
/* 45 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var selfClosingTags = {
    __proto__: null,
    area: 1,
    base: 1,
    basefont: 1,
    br: 1,
    col: 1,
    command: 1,
    embed: 1,
    frame: 1,
    hr: 1,
    img: 1,
    input: 1,
    isindex: 1,
    keygen: 1,
    link: 1,
    meta: 1,
    param: 1,
    source: 1,
    track: 1,
    wbr: 1,
    // svg tags
    circle: 1,
    ellipse: 1,
    line: 1,
    path: 1,
    polygone: 1,
    polyline: 1,
    rect: 1,
    stop: 1,
    use: 1
};
exports.default = selfClosingTags;


/***/ }),
/* 46 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var reEscapableChars = /[&<>"]/g;
var charToEscapedMap = Object.create(null);
charToEscapedMap['&'] = '&amp;';
charToEscapedMap['<'] = '&lt;';
charToEscapedMap['>'] = '&gt;';
charToEscapedMap['"'] = '&quot;';
function escapeHTML(str) {
    return reEscapableChars.test(str) ? str.replace(reEscapableChars, function (chr) { return charToEscapedMap[chr]; }) : str;
}
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = escapeHTML;


/***/ }),
/* 47 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var reEscapableEntities = /&(?:amp|lt|gt|quot);/g;
var escapedToCharMap = Object.create(null);
escapedToCharMap['&amp;'] = '&';
escapedToCharMap['&lt;'] = '<';
escapedToCharMap['&gt;'] = '>';
escapedToCharMap['&quot;'] = '"';
function unescapeHTML(str) {
    return reEscapableEntities.test(str) ? str.replace(reEscapableEntities, function (entity) { return escapedToCharMap[entity]; }) : str;
}
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = unescapeHTML;


/***/ }),
/* 48 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(29);


/***/ })
/******/ ]);
});