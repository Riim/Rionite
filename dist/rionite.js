(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory(require("@riim/map-set-polyfill"), require("cellx"), require("@riim/di"), require("nelm"), require("@riim/get-uid"), require("@riim/move-content"), require("@riim/symbol-polyfill"), require("@riim/camelize"), require("@riim/clear-node"), require("@riim/hyphenize"), require("@riim/next-tick"), require("@riim/logger"), require("@riim/next-uid"), require("@riim/gettext"), require("@riim/set-attribute"), require("escape-string"), require("html-to-fragment"), require("@riim/escape-html"), require("@riim/is-regexp"), require("@riim/defer"), require("@riim/mixin"));
	else if(typeof define === 'function' && define.amd)
		define(["@riim/map-set-polyfill", "cellx", "@riim/di", "nelm", "@riim/get-uid", "@riim/move-content", "@riim/symbol-polyfill", "@riim/camelize", "@riim/clear-node", "@riim/hyphenize", "@riim/next-tick", "@riim/logger", "@riim/next-uid", "@riim/gettext", "@riim/set-attribute", "escape-string", "html-to-fragment", "@riim/escape-html", "@riim/is-regexp", "@riim/defer", "@riim/mixin"], factory);
	else if(typeof exports === 'object')
		exports["rionite"] = factory(require("@riim/map-set-polyfill"), require("cellx"), require("@riim/di"), require("nelm"), require("@riim/get-uid"), require("@riim/move-content"), require("@riim/symbol-polyfill"), require("@riim/camelize"), require("@riim/clear-node"), require("@riim/hyphenize"), require("@riim/next-tick"), require("@riim/logger"), require("@riim/next-uid"), require("@riim/gettext"), require("@riim/set-attribute"), require("escape-string"), require("html-to-fragment"), require("@riim/escape-html"), require("@riim/is-regexp"), require("@riim/defer"), require("@riim/mixin"));
	else
		root["rionite"] = factory(root["@riim/map-set-polyfill"], root["cellx"], root["@riim/di"], root["nelm"], root["@riim/get-uid"], root["@riim/move-content"], root["@riim/symbol-polyfill"], root["@riim/camelize"], root["@riim/clear-node"], root["@riim/hyphenize"], root["@riim/next-tick"], root["@riim/logger"], root["@riim/next-uid"], root["@riim/gettext"], root["@riim/set-attribute"], root["escape-string"], root["html-to-fragment"], root["@riim/escape-html"], root["@riim/is-regexp"], root["@riim/defer"], root["@riim/mixin"]);
})(this, function(__WEBPACK_EXTERNAL_MODULE_0__, __WEBPACK_EXTERNAL_MODULE_1__, __WEBPACK_EXTERNAL_MODULE_8__, __WEBPACK_EXTERNAL_MODULE_9__, __WEBPACK_EXTERNAL_MODULE_10__, __WEBPACK_EXTERNAL_MODULE_11__, __WEBPACK_EXTERNAL_MODULE_12__, __WEBPACK_EXTERNAL_MODULE_13__, __WEBPACK_EXTERNAL_MODULE_19__, __WEBPACK_EXTERNAL_MODULE_24__, __WEBPACK_EXTERNAL_MODULE_26__, __WEBPACK_EXTERNAL_MODULE_29__, __WEBPACK_EXTERNAL_MODULE_31__, __WEBPACK_EXTERNAL_MODULE_32__, __WEBPACK_EXTERNAL_MODULE_34__, __WEBPACK_EXTERNAL_MODULE_36__, __WEBPACK_EXTERNAL_MODULE_38__, __WEBPACK_EXTERNAL_MODULE_44__, __WEBPACK_EXTERNAL_MODULE_45__, __WEBPACK_EXTERNAL_MODULE_46__, __WEBPACK_EXTERNAL_MODULE_51__) {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
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
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 28);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports) {

module.exports = __WEBPACK_EXTERNAL_MODULE_0__;

/***/ }),
/* 1 */
/***/ (function(module, exports) {

module.exports = __WEBPACK_EXTERNAL_MODULE_1__;

/***/ }),
/* 2 */
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
var camelize_1 = __webpack_require__(13);
var di_1 = __webpack_require__(8);
var get_uid_1 = __webpack_require__(10);
var map_set_polyfill_1 = __webpack_require__(0);
var move_content_1 = __webpack_require__(11);
var cellx_1 = __webpack_require__(1);
var html_to_fragment_1 = __webpack_require__(38);
var attachChildComponentElements_1 = __webpack_require__(4);
var bindContent_1 = __webpack_require__(5);
var bindEvents_1 = __webpack_require__(39);
var componentBinding_1 = __webpack_require__(40);
var ComponentConfigDecorator_1 = __webpack_require__(41);
var componentConstructorMap_1 = __webpack_require__(22);
var ComponentParams_1 = __webpack_require__(23);
var DisposableMixin_1 = __webpack_require__(17);
var ElementProtoMixin_1 = __webpack_require__(3);
var Features_1 = __webpack_require__(6);
var handledEvents_1 = __webpack_require__(47);
var handleDOMEvent_1 = __webpack_require__(48);
var handleEvent_1 = __webpack_require__(49);
var registerComponent_1 = __webpack_require__(50);
var map = Array.prototype.map;
var reClassBlockElement = / class="([a-zA-Z][\-\w]*)__([a-zA-Z][\-\w]*)(?:\s[^"]*)?"/g;
var reParamChangeEventName = /param\-([\-0-9a-z]*)\-change/;
function createClassBlockElementReplacer(contentBlockName, events, evtPrefix) {
    return function (match, blockName, elName) {
        var elEvents;
        if (blockName == contentBlockName && (elEvents = events[elName])) {
            var eventAttrs = [];
            for (var type in elEvents) {
                eventAttrs.push(" " + evtPrefix + type + "=\"/" + elName + "\"");
            }
            return match + eventAttrs.join('');
        }
        return match;
    };
}
function findChildComponents(node, ownerComponent, context, childComponents) {
    for (var child = node.firstChild; child; child = child.nextSibling) {
        if (child.nodeType == Node.ELEMENT_NODE) {
            var childComponent = child.$component;
            if (childComponent) {
                childComponent._ownerComponent = ownerComponent;
                childComponent.params.$context = context;
                (childComponents || (childComponents = [])).push(childComponent);
            }
            if (child.firstChild &&
                (!childComponent ||
                    childComponent.constructor.template == null)) {
                childComponents = findChildComponents(child, ownerComponent, context, childComponents);
            }
        }
    }
    return childComponents || null;
}
var Component = /** @class */ (function (_super) {
    __extends(Component, _super);
    function Component(el) {
        var _this = _super.call(this) || this;
        _this._parentComponent = null;
        _this._attached = false;
        _this.initialized = false;
        _this.isReady = false;
        DisposableMixin_1.DisposableMixin.call(_this);
        var constr = _this.constructor;
        if (!componentConstructorMap_1.componentConstructorMap.has(constr.elementIs)) {
            throw new TypeError('Component must be registered');
        }
        if (!el) {
            el = document.createElement(constr._elementBlockNames[0]);
        }
        _this.element = el;
        el.rioniteComponent = _this;
        Object.defineProperty(el, '$component', { value: _this });
        _this.created();
        return _this;
    }
    Object.defineProperty(Component.prototype, "ownerComponent", {
        get: function () {
            if (this._ownerComponent) {
                return this._ownerComponent;
            }
            var component = this.parentComponent;
            if (!component) {
                return (this._ownerComponent = this);
            }
            for (var parentComponent = void 0; (parentComponent = component.parentComponent);) {
                component = parentComponent;
            }
            return (this._ownerComponent = component);
        },
        set: function (ownerComponent) {
            this._ownerComponent = ownerComponent;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Component.prototype, "parentComponent", {
        get: function () {
            if (this._parentComponent !== undefined) {
                return this._parentComponent;
            }
            for (var node = void 0; (node = (node || this.element).parentNode);) {
                if (node.$component) {
                    return (this._parentComponent = node.$component);
                }
            }
            return (this._parentComponent = null);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Component.prototype, "params", {
        get: function () {
            var params = ComponentParams_1.ComponentParams.init(this);
            Object.defineProperty(this, 'params', {
                configurable: true,
                enumerable: true,
                writable: true,
                value: params
            });
            return params;
        },
        enumerable: true,
        configurable: true
    });
    Component.prototype._on = function (type, listener, context) {
        if (!type.lastIndexOf('param-', 0) && reParamChangeEventName.test(type)) {
            cellx_1.EventEmitter.currentlySubscribing = true;
            this.params[camelize_1.camelize(RegExp.$1, true)];
            cellx_1.EventEmitter.currentlySubscribing = false;
        }
        _super.prototype._on.call(this, type, listener, context);
    };
    Component.prototype.handleEvent = function (evt) {
        _super.prototype.handleEvent.call(this, evt);
        if (evt.bubbles !== false && !evt.isPropagationStopped) {
            var parentComponent = this.parentComponent;
            if (parentComponent) {
                parentComponent.handleEvent(evt);
                return;
            }
        }
        handleEvent_1.handleEvent(evt);
    };
    Component.prototype.listenTo = function (target, type, listener, context, useCapture) {
        return DisposableMixin_1.DisposableMixin.prototype.listenTo.call(this, typeof target == 'string' ? this.$(target) : target, type, listener, context, useCapture);
    };
    Component.prototype._listenTo = function (target, type, listener, context, useCapture) {
        if (target instanceof Component) {
            var index = void 0;
            if (type.charAt(0) == '<' && (index = type.indexOf('>', 1)) > 1) {
                var targetType = type.slice(1, index);
                if (targetType != '*') {
                    var targetConstr_1 = componentConstructorMap_1.componentConstructorMap.get(targetType);
                    if (!targetConstr_1) {
                        throw new TypeError("Component \"" + targetType + "\" is not defined");
                    }
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
        return DisposableMixin_1.DisposableMixin.prototype._listenTo.call(this, target, type, listener, context, useCapture);
    };
    Component.prototype._attach = function () {
        var _this = this;
        this._attached = true;
        if (!this.initialized) {
            var result = this.initialize();
            if (result) {
                result.then(function () {
                    _this.initialized = true;
                    _this._attach();
                });
                return;
            }
            this.initialized = true;
        }
        var constr = this.constructor;
        if (this.isReady) {
            this._unfreezeBindings();
            if (constr.oevents) {
                bindEvents_1.bindEvents(this, constr.oevents);
            }
        }
        else {
            var el = this.element;
            el.className = constr._blockNamesString + el.className;
            if (constr.template == null) {
                this.params;
                this._bindings = null;
                var childComponents = findChildComponents(el, this.ownerComponent, this.params.$context);
                if (childComponents) {
                    attachChildComponentElements_1.attachChildComponentElements(childComponents);
                }
                if (constr.oevents) {
                    bindEvents_1.bindEvents(this, constr.oevents);
                }
            }
            else {
                if (el.firstChild) {
                    ElementProtoMixin_1.suppressConnectionStatusCallbacks();
                    this.params.$content = move_content_1.moveContent(document.createDocumentFragment(), el);
                    ElementProtoMixin_1.resumeConnectionStatusCallbacks();
                }
                else {
                    this.params.$content = document.createDocumentFragment();
                }
                var rawContent = constr._rawContent;
                if (!rawContent) {
                    var contentHTML = constr.template.render();
                    if (constr.events) {
                        contentHTML = contentHTML.replace(reClassBlockElement, createClassBlockElementReplacer(constr._elementBlockNames[0], constr.events, 'oncomponent-'));
                    }
                    if (constr.domEvents) {
                        contentHTML = contentHTML.replace(reClassBlockElement, createClassBlockElementReplacer(constr._elementBlockNames[0], constr.domEvents, 'on-'));
                    }
                    rawContent = constr._rawContent = html_to_fragment_1.htmlToFragment(contentHTML);
                }
                var content = rawContent.cloneNode(true);
                if (!Features_1.templateTag) {
                    var templates = content.querySelectorAll('template');
                    for (var i = 0, l = templates.length; i < l;) {
                        i += templates[i].content.querySelectorAll('template').length + 1;
                    }
                }
                var _a = bindContent_1.bindContent(content, this, this, {
                    0: null,
                    1: null
                }), bindings = _a[0], childComponents = _a[1];
                this._bindings = bindings;
                ElementProtoMixin_1.suppressConnectionStatusCallbacks();
                this.element.appendChild(content);
                ElementProtoMixin_1.resumeConnectionStatusCallbacks();
                if (childComponents) {
                    attachChildComponentElements_1.attachChildComponentElements(childComponents);
                }
                if (constr.oevents) {
                    bindEvents_1.bindEvents(this, constr.oevents);
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
        return DisposableMixin_1.DisposableMixin.prototype.dispose.call(this);
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
    // Utils
    Component.prototype.$ = function (name, container) {
        var elList = this._getElementList(name, container);
        return (elList && elList.length
            ? elList[0].$component || elList[0]
            : null);
    };
    Component.prototype.$$ = function (name, container) {
        var elList = this._getElementList(name, container);
        return elList
            ? map.call(elList, function (el) { return el.$component || el; })
            : [];
    };
    Component.prototype._getElementList = function (name, container) {
        var elListMap = this._elementListMap || (this._elementListMap = new map_set_polyfill_1.Map());
        var containerEl;
        if (container) {
            if (typeof container == 'string') {
                container = this.$(container);
            }
            containerEl = container instanceof Component ? container.element : container;
        }
        else {
            containerEl = this.element;
        }
        var key = container ? get_uid_1.getUID(containerEl) + '/' + name : name;
        var elList = elListMap.get(key);
        if (!elList) {
            var elementBlockNames = this.constructor._elementBlockNames;
            elList = containerEl.getElementsByClassName(elementBlockNames[elementBlockNames.length - 1] + '__' + name);
            elListMap.set(key, elList);
        }
        return elList;
    };
    Component.Config = ComponentConfigDecorator_1.ComponentConfigDecorator;
    Component.register = registerComponent_1.registerComponent;
    Component.elementExtends = null;
    Component.params = null;
    Component.i18n = null;
    Component.template = null;
    Component.oevents = null;
    Component.events = null;
    Component.domEvents = null;
    __decorate([
        di_1.Inject('logger')
    ], Component.prototype, "logger", void 0);
    return Component;
}(cellx_1.EventEmitter));
exports.Component = Component;
var disposableMixinProto = DisposableMixin_1.DisposableMixin.prototype;
var componentProto = Component.prototype;
Object.getOwnPropertyNames(disposableMixinProto).forEach(function (name) {
    if (!(name in componentProto)) {
        Object.defineProperty(componentProto, name, Object.getOwnPropertyDescriptor(disposableMixinProto, name));
    }
});
document.addEventListener('DOMContentLoaded', function onDOMContentLoaded() {
    document.removeEventListener('DOMContentLoaded', onDOMContentLoaded);
    handledEvents_1.handledEvents.forEach(function (type) {
        document.documentElement.addEventListener(type, function (evt) {
            if (evt.target != document.documentElement) {
                handleDOMEvent_1.handleDOMEvent(evt);
            }
        });
    });
});


/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var defer_1 = __webpack_require__(46);
var di_1 = __webpack_require__(8);
var Features_1 = __webpack_require__(6);
var KEY_ELEMENT_CONNECTED_1 = __webpack_require__(7);
var isConnectionStatusCallbacksSuppressed = false;
function suppressConnectionStatusCallbacks() {
    isConnectionStatusCallbacksSuppressed = true;
}
exports.suppressConnectionStatusCallbacks = suppressConnectionStatusCallbacks;
function resumeConnectionStatusCallbacks() {
    isConnectionStatusCallbacksSuppressed = false;
}
exports.resumeConnectionStatusCallbacks = resumeConnectionStatusCallbacks;
exports.ElementProtoMixin = (_a = {
        rioniteComponent: null,
        get $component() {
            return (this.rioniteComponent ||
                di_1.Container.get(this.constructor._rioniteComponentConstructor, [this]));
        }
    },
    _a[KEY_ELEMENT_CONNECTED_1.KEY_ELEMENT_CONNECTED] = false,
    _a.connectedCallback = function () {
        var _this = this;
        this[KEY_ELEMENT_CONNECTED_1.KEY_ELEMENT_CONNECTED] = true;
        if (isConnectionStatusCallbacksSuppressed) {
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
            defer_1.defer(function () {
                if (_this[KEY_ELEMENT_CONNECTED_1.KEY_ELEMENT_CONNECTED]) {
                    var component_1 = _this.$component;
                    component_1._parentComponent = undefined;
                    if (!component_1.parentComponent && !component_1._attached) {
                        component_1.elementConnected();
                        component_1._attach();
                    }
                }
            });
        }
    },
    _a.disconnectedCallback = function () {
        this[KEY_ELEMENT_CONNECTED_1.KEY_ELEMENT_CONNECTED] = false;
        if (isConnectionStatusCallbacksSuppressed) {
            return;
        }
        var component = this.rioniteComponent;
        if (component && component._attached) {
            component._parentComponent = null;
            component.elementDisconnected();
            defer_1.defer(function () {
                if (component._parentComponent === null && component._attached) {
                    component._detach();
                }
            });
        }
    },
    _a.attributeChangedCallback = function (name, prev, value) {
        var component = this.rioniteComponent;
        if (component && component.isReady) {
            var params = component.params;
            var privateName = '_' + name;
            if (params[privateName]) {
                params[privateName](value);
            }
            else if (Features_1.nativeCustomElements) {
                throw new TypeError("Cannot write to readonly parameter \"" + name + "\"");
            }
        }
    },
    _a);
var _a;


/***/ }),
/* 4 */
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
exports.attachChildComponentElements = attachChildComponentElements;


/***/ }),
/* 5 */
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
var camelize_1 = __webpack_require__(13);
var map_set_polyfill_1 = __webpack_require__(0);
var set_attribute_1 = __webpack_require__(34);
var cellx_1 = __webpack_require__(1);
var compileContentTextFragment_1 = __webpack_require__(35);
var ContentTextFragmentParser_1 = __webpack_require__(20);
var AttributeBindingCell = /** @class */ (function (_super) {
    __extends(AttributeBindingCell, _super);
    function AttributeBindingCell(pull, el, attrName, opts) {
        var _this = _super.call(this, pull, opts) || this;
        _this.element = el;
        _this.attributeName = attrName;
        return _this;
    }
    return AttributeBindingCell;
}(cellx_1.Cell));
var TextNodeBindingCell = /** @class */ (function (_super) {
    __extends(TextNodeBindingCell, _super);
    function TextNodeBindingCell(pull, textNode, opts) {
        var _this = _super.call(this, pull, opts) || this;
        _this.textNode = textNode;
        return _this;
    }
    return TextNodeBindingCell;
}(cellx_1.Cell));
function onAttributeBindingCellChange(evt) {
    set_attribute_1.setAttribute(evt.target.element, evt.target.attributeName, evt.data.value);
}
function onTextNodeBindingCellChange(evt) {
    evt.target.textNode.nodeValue = evt.data.value;
}
var ContentTextFragmentNodeType = ContentTextFragmentParser_1.ContentTextFragmentParser.ContentTextFragmentNodeType;
function bindContent(node, ownerComponent, context, result) {
    for (var child = node.firstChild; child; child = child.nextSibling) {
        switch (child.nodeType) {
            case Node.ELEMENT_NODE: {
                var childComponent = child.$component;
                var $specified = void 0;
                if (childComponent) {
                    $specified = new map_set_polyfill_1.Set();
                }
                var attrs = child.attributes;
                for (var i = attrs.length; i;) {
                    var attr = attrs.item(--i);
                    if ($specified) {
                        $specified.add(camelize_1.camelize(attr.name, true));
                    }
                    var value = attr.value;
                    if (value.indexOf('{') != -1) {
                        var contentTextFragment = new ContentTextFragmentParser_1.ContentTextFragmentParser(value).parse();
                        if (contentTextFragment.length > 1 ||
                            contentTextFragment[0].nodeType == ContentTextFragmentNodeType.BINDING) {
                            var name_1 = attr.name;
                            if (name_1.charAt(0) == '_') {
                                name_1 = name_1.slice(1);
                            }
                            var cell = new AttributeBindingCell(compileContentTextFragment_1.compileContentTextFragment(contentTextFragment, value, contentTextFragment.length == 1), child, name_1, {
                                context: context,
                                onChange: onAttributeBindingCellChange
                            });
                            set_attribute_1.setAttribute(child, name_1, cell.get());
                            (result[0] || (result[0] = [])).push(cell);
                        }
                    }
                }
                if (childComponent) {
                    childComponent._ownerComponent = ownerComponent;
                    childComponent.params.$context = context;
                    childComponent.params.$specified = $specified;
                    (result[1] || (result[1] = [])).push(childComponent);
                }
                if (child.firstChild &&
                    (!childComponent ||
                        childComponent.constructor.template == null)) {
                    bindContent(child, ownerComponent, context, result);
                }
                break;
            }
            case Node.TEXT_NODE: {
                for (var nextChild = void 0; (nextChild = child.nextSibling) && nextChild.nodeType == Node.TEXT_NODE;) {
                    child.nodeValue += nextChild.nodeValue;
                    node.removeChild(nextChild);
                }
                var value = child.nodeValue;
                if (value.indexOf('{') != -1) {
                    var contentTextFragment = new ContentTextFragmentParser_1.ContentTextFragmentParser(value).parse();
                    if (contentTextFragment.length > 1 ||
                        contentTextFragment[0].nodeType == ContentTextFragmentNodeType.BINDING) {
                        var cell = new TextNodeBindingCell(compileContentTextFragment_1.compileContentTextFragment(contentTextFragment, value, false), child, {
                            context: context,
                            onChange: onTextNodeBindingCellChange
                        });
                        child.nodeValue = cell.get();
                        (result[0] || (result[0] = [])).push(cell);
                    }
                }
                break;
            }
        }
    }
    return result;
}
exports.bindContent = bindContent;


/***/ }),
/* 6 */
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
    constructor: {
        configurable: true,
        enumerable: false,
        writable: true,
        value: TestNativeCustomElementsFeature
    }
});
TestNativeCustomElementsFeature.prototype.attributeChangedCallback = function () {
    nativeCustomElementsFeature = true;
};
window.customElements.define('test-native-custom-elements-feature', TestNativeCustomElementsFeature);
var testNCEF = document.createElement('test-native-custom-elements-feature');
testNCEF.setAttribute('test', '');
exports.nativeCustomElements = nativeCustomElementsFeature;


/***/ }),
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var symbol_polyfill_1 = __webpack_require__(12);
exports.KEY_ELEMENT_CONNECTED = symbol_polyfill_1.Symbol('Rionite.KEY_ELEMENT_CONNECTED');


/***/ }),
/* 8 */
/***/ (function(module, exports) {

module.exports = __WEBPACK_EXTERNAL_MODULE_8__;

/***/ }),
/* 9 */
/***/ (function(module, exports) {

module.exports = __WEBPACK_EXTERNAL_MODULE_9__;

/***/ }),
/* 10 */
/***/ (function(module, exports) {

module.exports = __WEBPACK_EXTERNAL_MODULE_10__;

/***/ }),
/* 11 */
/***/ (function(module, exports) {

module.exports = __WEBPACK_EXTERNAL_MODULE_11__;

/***/ }),
/* 12 */
/***/ (function(module, exports) {

module.exports = __WEBPACK_EXTERNAL_MODULE_12__;

/***/ }),
/* 13 */
/***/ (function(module, exports) {

module.exports = __WEBPACK_EXTERNAL_MODULE_13__;

/***/ }),
/* 14 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var map_set_polyfill_1 = __webpack_require__(0);
exports.componentParamValueMap = new map_set_polyfill_1.Map();


/***/ }),
/* 15 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var namePattern_1 = __webpack_require__(16);
exports.keypathPattern = "(?:" + namePattern_1.namePattern + "|\\d+)(?:\\.(?:" + namePattern_1.namePattern + "|\\d+))*";


/***/ }),
/* 16 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
exports.namePattern = '[$_a-zA-Z][$\\w]*';


/***/ }),
/* 17 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var next_uid_1 = __webpack_require__(31);
var cellx_1 = __webpack_require__(1);
var DisposableMixin = /** @class */ (function () {
    function DisposableMixin() {
        this._disposables = {};
    }
    DisposableMixin.prototype.listenTo = function (target, type, listener, context, useCapture) {
        var _this = this;
        var listenings;
        if (typeof type == 'object') {
            listenings = [];
            if (Array.isArray(type)) {
                for (var i = 0, l = type.length; i < l; i++) {
                    listenings.push(this.listenTo(target, type[i], listener, context, useCapture));
                }
            }
            else {
                for (var name_1 in type) {
                    listenings.push(this.listenTo(target, name_1, type[name_1], listener, context));
                }
            }
        }
        else {
            if (Array.isArray(target) ||
                target instanceof NodeList ||
                target instanceof HTMLCollection) {
                listenings = [];
                for (var i = 0, l = target.length; i < l; i++) {
                    listenings.push(this.listenTo(target[i], type, listener, context, useCapture));
                }
            }
            else if (Array.isArray(listener)) {
                listenings = [];
                for (var i = 0, l = listener.length; i < l; i++) {
                    listenings.push(this.listenTo(target, type, listener[i], context, useCapture));
                }
            }
            else {
                return this._listenTo(target, type, listener, context !== undefined ? context : this, useCapture || false);
            }
        }
        var id = next_uid_1.nextUID();
        var stopListening = function () {
            for (var i = listenings.length; i;) {
                listenings[--i].stop();
            }
            delete _this._disposables[id];
        };
        var listening = (this._disposables[id] = {
            stop: stopListening,
            dispose: stopListening
        });
        return listening;
    };
    DisposableMixin.prototype._listenTo = function (target, type, listener, context, useCapture) {
        var _this = this;
        if (target instanceof cellx_1.EventEmitter) {
            target.on(type, listener, context);
        }
        else if (target.addEventListener) {
            if (target !== context) {
                listener = listener.bind(context);
            }
            target.addEventListener(type, listener, useCapture);
        }
        else {
            throw new TypeError('Unable to add a listener');
        }
        var id = next_uid_1.nextUID();
        var stopListening = function () {
            if (_this._disposables[id]) {
                if (target instanceof cellx_1.EventEmitter) {
                    target.off(type, listener, context);
                }
                else {
                    target.removeEventListener(type, listener, useCapture);
                }
                delete _this._disposables[id];
            }
        };
        var listening = (this._disposables[id] = {
            stop: stopListening,
            dispose: stopListening
        });
        return listening;
    };
    DisposableMixin.prototype.setTimeout = function (callback, delay) {
        var _this = this;
        var id = next_uid_1.nextUID();
        var timeoutId = setTimeout(function () {
            delete _this._disposables[id];
            callback.call(_this);
        }, delay);
        var clearTimeout_ = function () {
            if (_this._disposables[id]) {
                clearTimeout(timeoutId);
                delete _this._disposables[id];
            }
        };
        var timeout = (this._disposables[id] = {
            clear: clearTimeout_,
            dispose: clearTimeout_
        });
        return timeout;
    };
    DisposableMixin.prototype.setInterval = function (callback, delay) {
        var _this = this;
        var id = next_uid_1.nextUID();
        var intervalId = setInterval(function () {
            callback.call(_this);
        }, delay);
        var clearInterval_ = function () {
            if (_this._disposables[id]) {
                clearInterval(intervalId);
                delete _this._disposables[id];
            }
        };
        var interval = (this._disposables[id] = {
            clear: clearInterval_,
            dispose: clearInterval_
        });
        return interval;
    };
    DisposableMixin.prototype.registerCallback = function (callback) {
        var _this = this;
        var id = next_uid_1.nextUID();
        var disposable = this;
        var cancelCallback = function () {
            delete _this._disposables[id];
        };
        var registeredCallback = function registeredCallback() {
            if (disposable._disposables[id]) {
                delete disposable._disposables[id];
                return callback.apply(disposable, arguments);
            }
        };
        registeredCallback.cancel = cancelCallback;
        registeredCallback.dispose = cancelCallback;
        this._disposables[id] = registeredCallback;
        return registeredCallback;
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
exports.DisposableMixin = DisposableMixin;


/***/ }),
/* 18 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var gettext_1 = __webpack_require__(32);
exports.formatters = {
    or: function (value, arg) {
        return value || arg;
    },
    default: function (value, arg) {
        return value === undefined ? arg : value;
    },
    not: function (value) {
        return !value;
    },
    eq: function (value, arg) {
        return value == arg;
    },
    identical: function (value, arg) {
        return value === arg;
    },
    lt: function (value, arg) {
        return value < arg;
    },
    lte: function (value, arg) {
        return value <= arg;
    },
    gt: function (value, arg) {
        return value > arg;
    },
    gte: function (value, arg) {
        return value >= arg;
    },
    has: function (obj, key) {
        return !!obj && (typeof obj.has == 'function' ? obj.has(key) : obj.hasOwnProperty(key));
    },
    get: function (obj, key) {
        return obj && (typeof obj.get == 'function' ? obj.get(key) : obj[key]);
    },
    key: function (obj, key) {
        return obj && obj[key];
    },
    join: function (arr, separator) {
        if (separator === void 0) { separator = ', '; }
        return arr && arr.join(separator);
    },
    t: gettext_1.getText.t,
    pt: gettext_1.getText.pt,
    nt: function (count, key) {
        var args = [];
        for (var _i = 2; _i < arguments.length; _i++) {
            args[_i - 2] = arguments[_i];
        }
        args.unshift(count);
        return gettext_1.getText('', key, true, args);
    },
    npt: function (count, key, context) {
        var args = [];
        for (var _i = 3; _i < arguments.length; _i++) {
            args[_i - 3] = arguments[_i];
        }
        args.unshift(count);
        return gettext_1.getText(context, key, true, args);
    },
    json: function (value) {
        return JSON.stringify(value);
    }
};
exports.formatters.seq = exports.formatters.identical;


/***/ }),
/* 19 */
/***/ (function(module, exports) {

module.exports = __WEBPACK_EXTERNAL_MODULE_19__;

/***/ }),
/* 20 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var keypathPattern_1 = __webpack_require__(15);
var keypathToJSExpression_1 = __webpack_require__(21);
var namePattern_1 = __webpack_require__(16);
var ContentTextFragmentNodeType;
(function (ContentTextFragmentNodeType) {
    ContentTextFragmentNodeType[ContentTextFragmentNodeType["TEXT"] = 1] = "TEXT";
    ContentTextFragmentNodeType[ContentTextFragmentNodeType["BINDING"] = 2] = "BINDING";
    ContentTextFragmentNodeType[ContentTextFragmentNodeType["BINDING_KEYPATH"] = 3] = "BINDING_KEYPATH";
    ContentTextFragmentNodeType[ContentTextFragmentNodeType["BINDING_FORMATTER"] = 4] = "BINDING_FORMATTER";
    ContentTextFragmentNodeType[ContentTextFragmentNodeType["BINDING_FORMATTER_ARGUMENTS"] = 5] = "BINDING_FORMATTER_ARGUMENTS";
})(ContentTextFragmentNodeType = exports.ContentTextFragmentNodeType || (exports.ContentTextFragmentNodeType = {}));
var reNameOrNothing = RegExp(namePattern_1.namePattern + '|', 'g');
var reKeypathOrNothing = RegExp(keypathPattern_1.keypathPattern + '|', 'g');
var reBooleanOrNothing = /false|true|/g;
var reNumberOrNothing = /(?:[+-]\s*)?(?:0b[01]+|0[0-7]+|0x[0-9a-fA-F]+|(?:(?:0|[1-9]\d*)(?:\.\d+)?|\.\d+)(?:[eE][+-]?\d+)?|Infinity|NaN)|/g;
var reVacuumOrNothing = /null|undefined|void 0|/g;
var ContentTextFragmentParser = /** @class */ (function () {
    function ContentTextFragmentParser(contentTextFragment) {
        this.contentTextFragment = contentTextFragment;
    }
    ContentTextFragmentParser.prototype.parse = function () {
        var contentTextFragment = this.contentTextFragment;
        if (!contentTextFragment) {
            return [];
        }
        this.at = 0;
        var result = (this.result = []);
        for (var index = void 0; (index = contentTextFragment.indexOf('{', this.at)) != -1;) {
            this._pushText(contentTextFragment.slice(this.at, index));
            this.at = index;
            this.chr = contentTextFragment.charAt(index);
            var binding = this._readBinding();
            if (binding) {
                result.push(binding);
            }
            else {
                this._pushText(this.chr);
                this._next('{');
            }
        }
        this._pushText(contentTextFragment.slice(this.at));
        return result;
    };
    ContentTextFragmentParser.prototype._pushText = function (value) {
        if (value) {
            var result = this.result;
            var resultLen = result.length;
            if (resultLen && result[resultLen - 1].nodeType == ContentTextFragmentNodeType.TEXT) {
                result[resultLen - 1].value = value;
            }
            else {
                result.push({
                    nodeType: ContentTextFragmentNodeType.TEXT,
                    value: value
                });
            }
        }
    };
    ContentTextFragmentParser.prototype._readBinding = function () {
        var at = this.at;
        this._next('{');
        this._skipWhitespaces();
        var argument = this._readValue();
        var isArgumentKeypath;
        if (!argument) {
            argument = this._readKeypath();
            isArgumentKeypath = true;
        }
        if (argument) {
            var formatters = void 0;
            for (var formatter = void 0; this._skipWhitespaces() == '|' && (formatter = this._readFormatter());) {
                (formatters || (formatters = [])).push(formatter);
            }
            if (this.chr == '}') {
                this._next();
                return {
                    nodeType: ContentTextFragmentNodeType.BINDING,
                    argument: argument,
                    isArgumentKeypath: isArgumentKeypath || false,
                    formatters: formatters || null,
                    raw: this.contentTextFragment.slice(at, this.at)
                };
            }
        }
        this.at = at;
        this.chr = this.contentTextFragment.charAt(at);
        return null;
    };
    ContentTextFragmentParser.prototype._readFormatter = function () {
        var at = this.at;
        this._next('|');
        this._skipWhitespaces();
        var name = this._readName();
        if (name) {
            var args = this.chr == '(' ? this._readFormatterArguments() : null;
            return {
                nodeType: ContentTextFragmentNodeType.BINDING_FORMATTER,
                name: name,
                arguments: args
            };
        }
        this.at = at;
        this.chr = this.contentTextFragment.charAt(at);
        return null;
    };
    ContentTextFragmentParser.prototype._readFormatterArguments = function () {
        var at = this.at;
        this._next('(');
        var args = [];
        if (this._skipWhitespaces() != ')') {
            for (;;) {
                var arg = this._readValue() || this._readKeypath(true);
                if (arg) {
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
                this.chr = this.contentTextFragment.charAt(at);
                return null;
            }
        }
        this._next();
        return {
            nodeType: ContentTextFragmentNodeType.BINDING_FORMATTER_ARGUMENTS,
            value: args
        };
    };
    ContentTextFragmentParser.prototype._readValue = function () {
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
            if (value) {
                return value;
            }
        }
        return null;
    };
    ContentTextFragmentParser.prototype._readObject = function () {
        var at = this.at;
        this._next('{');
        var obj = '{';
        while (this._skipWhitespaces() != '}') {
            var key = this.chr == "'" || this.chr == '"' ? this._readString() : this._readObjectKey();
            if (key && this._skipWhitespaces() == ':') {
                this._next();
                this._skipWhitespaces();
                var valueOrKeypath = this._readValue() || this._readKeypath(true);
                if (valueOrKeypath) {
                    if (this._skipWhitespaces() == ',') {
                        obj += key + ':' + valueOrKeypath + ',';
                        this._next();
                        continue;
                    }
                    else if (this.chr == '}') {
                        obj += key + ':' + valueOrKeypath + '}';
                        break;
                    }
                }
            }
            this.at = at;
            this.chr = this.contentTextFragment.charAt(at);
            return null;
        }
        this._next();
        return obj;
    };
    ContentTextFragmentParser.prototype._readObjectKey = function () {
        return this._readName();
    };
    ContentTextFragmentParser.prototype._readArray = function () {
        var at = this.at;
        this._next('[');
        var arr = '[';
        while (this._skipWhitespaces() != ']') {
            if (this.chr == ',') {
                arr += ',';
                this._next();
            }
            else {
                var valueOrKeypath = this._readValue() || this._readKeypath(true);
                if (valueOrKeypath) {
                    arr += valueOrKeypath;
                }
                else {
                    this.at = at;
                    this.chr = this.contentTextFragment.charAt(at);
                    return null;
                }
            }
        }
        this._next();
        return arr + ']';
    };
    ContentTextFragmentParser.prototype._readBoolean = function () {
        reBooleanOrNothing.lastIndex = this.at;
        var bool = reBooleanOrNothing.exec(this.contentTextFragment)[0];
        if (bool) {
            this.chr = this.contentTextFragment.charAt((this.at += bool.length));
            return bool;
        }
        return null;
    };
    ContentTextFragmentParser.prototype._readNumber = function () {
        reNumberOrNothing.lastIndex = this.at;
        var num = reNumberOrNothing.exec(this.contentTextFragment)[0];
        if (num) {
            this.chr = this.contentTextFragment.charAt((this.at += num.length));
            return num;
        }
        return null;
    };
    ContentTextFragmentParser.prototype._readString = function () {
        var quoteChar = this.chr;
        if (quoteChar != "'" && quoteChar != '"') {
            throw {
                name: 'SyntaxError',
                message: "Expected \"'\" instead of \"" + this.chr + "\"",
                at: this.at,
                contentTextFragment: this.contentTextFragment
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
        this.chr = this.contentTextFragment.charAt(at);
        return null;
    };
    ContentTextFragmentParser.prototype._readVacuum = function () {
        reVacuumOrNothing.lastIndex = this.at;
        var vacuum = reVacuumOrNothing.exec(this.contentTextFragment)[0];
        if (vacuum) {
            this.chr = this.contentTextFragment.charAt((this.at += vacuum.length));
            return vacuum;
        }
        return null;
    };
    ContentTextFragmentParser.prototype._readKeypath = function (toJSExpression) {
        reKeypathOrNothing.lastIndex = this.at;
        var keypath = reKeypathOrNothing.exec(this.contentTextFragment)[0];
        if (keypath) {
            this.chr = this.contentTextFragment.charAt((this.at += keypath.length));
            return toJSExpression ? keypathToJSExpression_1.keypathToJSExpression(keypath) : keypath;
        }
        return null;
    };
    ContentTextFragmentParser.prototype._readName = function () {
        reNameOrNothing.lastIndex = this.at;
        var name = reNameOrNothing.exec(this.contentTextFragment)[0];
        if (name) {
            this.chr = this.contentTextFragment.charAt((this.at += name.length));
            return name;
        }
        return null;
    };
    ContentTextFragmentParser.prototype._skipWhitespaces = function () {
        var chr = this.chr;
        while (chr && chr <= ' ') {
            chr = this._next();
        }
        return chr;
    };
    ContentTextFragmentParser.prototype._next = function (current) {
        if (current && current != this.chr) {
            throw {
                name: 'SyntaxError',
                message: "Expected \"" + current + "\" instead of \"" + this.chr + "\"",
                at: this.at,
                contentTextFragment: this.contentTextFragment
            };
        }
        return (this.chr = this.contentTextFragment.charAt(++this.at));
    };
    ContentTextFragmentParser.ContentTextFragmentNodeType = ContentTextFragmentNodeType;
    return ContentTextFragmentParser;
}());
exports.ContentTextFragmentParser = ContentTextFragmentParser;


/***/ }),
/* 21 */
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
exports.keypathToJSExpression = keypathToJSExpression;


/***/ }),
/* 22 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var map_set_polyfill_1 = __webpack_require__(0);
exports.componentConstructorMap = new map_set_polyfill_1.Map();


/***/ }),
/* 23 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var hyphenize_1 = __webpack_require__(24);
var cellx_1 = __webpack_require__(1);
var componentParamTypeMap_1 = __webpack_require__(42);
var componentParamTypeSerializerMap_1 = __webpack_require__(43);
function initParam(params, name, el) {
    var component = el.$component;
    var config = component.constructor.params[name];
    if (config == null) {
        return;
    }
    var type = typeof config;
    var defaultValue;
    var required;
    var readonly;
    if (type == 'function') {
        type = config;
        required = readonly = false;
    }
    else if (type == 'object' && (config.type !== undefined || config.default !== undefined)) {
        type = config.type;
        defaultValue = config.default;
        if (type === undefined) {
            type = typeof defaultValue;
        }
        else if (defaultValue !== undefined &&
            componentParamTypeMap_1.componentParamTypeMap.has(type) &&
            componentParamTypeMap_1.componentParamTypeMap.get(type) != typeof defaultValue) {
            throw new TypeError('Specified type does not match defaultValue type');
        }
        required = config.required;
        readonly = config.readonly;
    }
    else {
        defaultValue = config;
        required = readonly = false;
    }
    var typeSerializer = componentParamTypeSerializerMap_1.componentParamTypeSerializerMap.get(type);
    if (!typeSerializer) {
        throw new TypeError('Unsupported parameter type');
    }
    var hyphenizedName = hyphenize_1.hyphenize(name, true);
    var rawValue = el.getAttribute(hyphenizedName);
    if (rawValue === null) {
        if (required) {
            throw new TypeError("Parameter \"" + name + "\" is required");
        }
        if (defaultValue != null && defaultValue !== false) {
            el.setAttribute(hyphenizedName, typeSerializer.write(defaultValue));
        }
    }
    var value = typeSerializer.read(rawValue, defaultValue);
    var descriptor;
    if (readonly) {
        descriptor = {
            configurable: true,
            enumerable: true,
            get: function () {
                return value;
            },
            set: function (val) {
                if (val !== value) {
                    throw new TypeError("Parameter \"" + name + "\" is readonly");
                }
            }
        };
    }
    else {
        var valueCell_1;
        params['_' + hyphenizedName] = function (rawValue) {
            var val = typeSerializer.read(rawValue, defaultValue);
            if (valueCell_1) {
                valueCell_1.set(val);
            }
            else {
                value = val;
            }
        };
        descriptor = {
            configurable: true,
            enumerable: true,
            get: function () {
                if (valueCell_1) {
                    return valueCell_1.get();
                }
                var currentlyPulling = cellx_1.Cell.currentlyPulling;
                if (currentlyPulling || cellx_1.EventEmitter.currentlySubscribing) {
                    valueCell_1 = new cellx_1.Cell(value, {
                        context: params,
                        onChange: function (evt) {
                            component.emit({
                                type: "param-" + hyphenizedName + "-change",
                                data: evt.target == valueCell_1
                                    ? evt.data
                                    : {
                                        prevEvent: null,
                                        prevValue: evt.target,
                                        value: evt.target
                                    }
                            });
                        }
                    });
                    if (currentlyPulling) {
                        return valueCell_1.get();
                    }
                }
                return value;
            },
            set: function (val) {
                var rawValue = typeSerializer.write(val, defaultValue);
                if (rawValue === null) {
                    el.removeAttribute(hyphenizedName);
                }
                else {
                    el.setAttribute(hyphenizedName, rawValue);
                }
                if (valueCell_1) {
                    valueCell_1.set(val);
                }
                else {
                    value = val;
                }
            }
        };
    }
    Object.defineProperty(params, name, descriptor);
}
exports.ComponentParams = {
    init: function (component) {
        var config = component.constructor.params;
        var el = component.element;
        var params = {
            $content: null,
            $context: null,
            $specified: null
        };
        if (config) {
            for (var name_1 in config) {
                initParam(params, name_1, el);
            }
        }
        return params;
    }
};


/***/ }),
/* 24 */
/***/ (function(module, exports) {

module.exports = __WEBPACK_EXTERNAL_MODULE_24__;

/***/ }),
/* 25 */
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
var next_tick_1 = __webpack_require__(26);
var cellx_1 = __webpack_require__(1);
var attachChildComponentElements_1 = __webpack_require__(4);
var bindContent_1 = __webpack_require__(5);
var compileKeypath_1 = __webpack_require__(27);
var Component_1 = __webpack_require__(2);
var ElementProtoMixin_1 = __webpack_require__(3);
var Features_1 = __webpack_require__(6);
var KEY_ELEMENT_CONNECTED_1 = __webpack_require__(7);
var keypathPattern_1 = __webpack_require__(15);
var slice = Array.prototype.slice;
var reKeypath = RegExp("^" + keypathPattern_1.keypathPattern + "$");
var RtIfThen = /** @class */ (function (_super) {
    __extends(RtIfThen, _super);
    function RtIfThen() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this._elseMode = false;
        _this._active = false;
        return _this;
    }
    RtIfThen.prototype.elementConnected = function () {
        if (this._active) {
            return;
        }
        this._active = true;
        if (!this.initialized) {
            var if_ = (this.params['if'] || '').trim();
            if (!reKeypath.test(if_)) {
                throw new SyntaxError("Invalid value of attribute \"if\" (" + if_ + ")");
            }
            var getIfValue_1 = compileKeypath_1.compileKeypath(if_);
            this._if = new cellx_1.Cell(function () {
                return !!getIfValue_1.call(this);
            }, { context: this.params.$context });
            this.initialized = true;
        }
        this._if.on('change', this._onIfChange, this);
        this._render(false);
    };
    RtIfThen.prototype.elementDisconnected = function () {
        var _this = this;
        next_tick_1.nextTick(function () {
            if (!_this.element[KEY_ELEMENT_CONNECTED_1.KEY_ELEMENT_CONNECTED]) {
                _this._deactivate();
            }
        });
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
        if (this._elseMode ? !this._if.get() : this._if.get()) {
            var content = document.importNode(this.element.content, true);
            if (!Features_1.templateTag) {
                var templates = content.querySelectorAll('template');
                for (var i = 0, l = templates.length; i < l;) {
                    i += templates[i].content.querySelectorAll('template').length + 1;
                }
            }
            var _a = bindContent_1.bindContent(content, this.ownerComponent, this.params.$context, { 0: null, 1: null }), bindings = _a[0], childComponents = _a[1];
            this._nodes = slice.call(content.childNodes);
            this._bindings = bindings;
            ElementProtoMixin_1.suppressConnectionStatusCallbacks();
            this.element.parentNode.insertBefore(content, this.element.nextSibling);
            ElementProtoMixin_1.resumeConnectionStatusCallbacks();
            if (childComponents) {
                attachChildComponentElements_1.attachChildComponentElements(childComponents);
            }
        }
        else {
            var nodes = this._nodes;
            if (nodes) {
                this._destroyBindings();
                for (var i = nodes.length; i;) {
                    var node = nodes[--i];
                    var parentNode = node.parentNode;
                    if (parentNode) {
                        parentNode.removeChild(node);
                    }
                }
                this._nodes = null;
            }
        }
        if (changed) {
            cellx_1.Cell.forceRelease();
            this.emit('change');
        }
    };
    RtIfThen.prototype._deactivate = function () {
        if (!this._active) {
            return;
        }
        this._active = false;
        this._if.off('change', this._onIfChange, this);
        var nodes = this._nodes;
        if (nodes) {
            this._destroyBindings();
            for (var i = nodes.length; i;) {
                var node = nodes[--i];
                var parentNode = node.parentNode;
                if (parentNode) {
                    parentNode.removeChild(node);
                }
            }
        }
    };
    RtIfThen = __decorate([
        Component_1.Component.Config({
            elementIs: 'RtIfThen',
            elementExtends: 'template',
            params: {
                if: { type: String, required: true, readonly: true }
            }
        })
    ], RtIfThen);
    return RtIfThen;
}(Component_1.Component));
exports.RtIfThen = RtIfThen;


/***/ }),
/* 26 */
/***/ (function(module, exports) {

module.exports = __WEBPACK_EXTERNAL_MODULE_26__;

/***/ }),
/* 27 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var keypathToJSExpression_1 = __webpack_require__(21);
var cache = Object.create(null);
function compileKeypath(keypath) {
    return (cache[keypath] ||
        (cache[keypath] = Function("var temp; return " + keypathToJSExpression_1.keypathToJSExpression(keypath) + ";")));
}
exports.compileKeypath = compileKeypath;


/***/ }),
/* 28 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var di_1 = __webpack_require__(8);
var logger_1 = __webpack_require__(29);
__webpack_require__(30);
var nelm_1 = __webpack_require__(9);
exports.NelmNodeType = nelm_1.NodeType;
exports.NelmParser = nelm_1.Parser;
exports.Template = nelm_1.Template;
var DisposableMixin_1 = __webpack_require__(17);
exports.DisposableMixin = DisposableMixin_1.DisposableMixin;
var formatters_1 = __webpack_require__(18);
exports.formatters = formatters_1.formatters;
var rt_slot_1 = __webpack_require__(33);
exports.RtSlot = rt_slot_1.RtSlot;
var rt_content_1 = __webpack_require__(54);
exports.RtContent = rt_content_1.RtContent;
var Component_1 = __webpack_require__(2);
exports.Component = Component_1.Component;
var KEY_ELEMENT_CONNECTED_1 = __webpack_require__(7);
exports.KEY_ELEMENT_CONNECTED = KEY_ELEMENT_CONNECTED_1.KEY_ELEMENT_CONNECTED;
var ComponentParams_1 = __webpack_require__(23);
exports.ComponentParams = ComponentParams_1.ComponentParams;
var componentParamValueMap_1 = __webpack_require__(14);
exports.componentParamValueMap = componentParamValueMap_1.componentParamValueMap;
var rt_if_then_1 = __webpack_require__(25);
exports.RtIfThen = rt_if_then_1.RtIfThen;
var rt_if_else_1 = __webpack_require__(55);
exports.RtIfElse = rt_if_else_1.RtIfElse;
var rt_repeat_1 = __webpack_require__(56);
exports.RtRepeat = rt_repeat_1.RtRepeat;
di_1.Container.registerService('logger', logger_1.logger);


/***/ }),
/* 29 */
/***/ (function(module, exports) {

module.exports = __WEBPACK_EXTERNAL_MODULE_29__;

/***/ }),
/* 30 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var nelm_1 = __webpack_require__(9);
['if-then', 'if-else', 'repeat'].forEach(function (tagName) {
    nelm_1.Template.helpers[tagName] = function (el) {
        var attrs = el.attributes;
        attrs = {
            superCall: attrs && attrs.superCall,
            list: attrs ? attrs.list.slice() : []
        };
        attrs.list.push({
            name: 'is',
            value: 'rt-' + tagName
        });
        return [
            {
                nodeType: nelm_1.NodeType.ELEMENT,
                isHelper: false,
                tagName: 'template',
                names: el.names && el.names[0] ? ['$' + el.names[0]].concat(el.names) : el.names,
                attributes: attrs,
                content: el.content
            }
        ];
    };
});


/***/ }),
/* 31 */
/***/ (function(module, exports) {

module.exports = __WEBPACK_EXTERNAL_MODULE_31__;

/***/ }),
/* 32 */
/***/ (function(module, exports) {

module.exports = __WEBPACK_EXTERNAL_MODULE_32__;

/***/ }),
/* 33 */
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
var clear_node_1 = __webpack_require__(19);
var get_uid_1 = __webpack_require__(10);
var map_set_polyfill_1 = __webpack_require__(0);
var move_content_1 = __webpack_require__(11);
var symbol_polyfill_1 = __webpack_require__(12);
var attachChildComponentElements_1 = __webpack_require__(4);
var bindContent_1 = __webpack_require__(5);
var Component_1 = __webpack_require__(2);
var ElementProtoMixin_1 = __webpack_require__(3);
var KEY_SLOT_CONTENT_MAP = symbol_polyfill_1.Symbol('slotContentMap');
var RtSlot = /** @class */ (function (_super) {
    __extends(RtSlot, _super);
    function RtSlot() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    RtSlot.prototype._attach = function () {
        this._attached = true;
        if (this.isReady) {
            this._unfreezeBindings();
        }
        else {
            var ownerComponent = this.ownerComponent;
            var el = this.element;
            var params = this.params;
            var contentOwnerComponent = ownerComponent.ownerComponent;
            var ownerComponentContent = ownerComponent.params.$content;
            var cloneContent = params.cloneContent;
            var content = void 0;
            var bindings = void 0;
            var childComponents = void 0;
            if (!cloneContent || ownerComponentContent.firstChild) {
                var tagName = params.forTag;
                var for_ = params['for'];
                var key = get_uid_1.getUID(ownerComponent) + '/' + (tagName ? ':' + tagName : for_ || '');
                if (tagName || for_) {
                    var contentMap = void 0;
                    if (!cloneContent &&
                        (contentMap = contentOwnerComponent[KEY_SLOT_CONTENT_MAP]) &&
                        contentMap.has(key)) {
                        var container = contentMap.get(key);
                        if (container.firstChild) {
                            content = move_content_1.moveContent(document.createDocumentFragment(), container);
                            contentMap.set(key, el);
                            bindings = container.$component._bindings;
                            childComponents = container.$component._childComponents;
                        }
                    }
                    else {
                        var contentEl = ownerComponentContent.firstElementChild;
                        if (contentEl) {
                            if (tagName) {
                                tagName = tagName.toUpperCase();
                            }
                            else if (for_.indexOf('__') == -1) {
                                var elementBlockNames = ownerComponent.constructor
                                    ._elementBlockNames;
                                for_ =
                                    elementBlockNames[elementBlockNames.length - 1] + '__' + for_;
                            }
                            do {
                                if (tagName
                                    ? contentEl.tagName == tagName
                                    : contentEl.classList.contains(for_)) {
                                    var selectedEl = (cloneContent
                                        ? contentEl.cloneNode(true)
                                        : contentEl);
                                    contentEl = contentEl.nextElementSibling;
                                    (content || (content = document.createDocumentFragment())).appendChild(selectedEl);
                                }
                                else {
                                    contentEl = contentEl.nextElementSibling;
                                }
                            } while (contentEl);
                            if (!cloneContent) {
                                (contentMap ||
                                    contentOwnerComponent[KEY_SLOT_CONTENT_MAP] ||
                                    (contentOwnerComponent[KEY_SLOT_CONTENT_MAP] = new map_set_polyfill_1.Map())).set(key, el);
                            }
                        }
                    }
                }
                else if (!cloneContent) {
                    var contentMap = contentOwnerComponent[KEY_SLOT_CONTENT_MAP];
                    if (contentMap && contentMap.has(key)) {
                        var container = contentMap.get(key);
                        content = move_content_1.moveContent(document.createDocumentFragment(), container);
                        contentMap.set(key, el);
                        bindings = container.$component._bindings;
                        childComponents = container.$component._childComponents;
                    }
                    else if (ownerComponentContent.firstChild) {
                        content = ownerComponentContent;
                        (contentMap ||
                            (contentOwnerComponent[KEY_SLOT_CONTENT_MAP] = new map_set_polyfill_1.Map())).set(key, el);
                    }
                }
                else {
                    content = ownerComponentContent.cloneNode(true);
                }
            }
            if (bindings === undefined) {
                if (content || el.firstChild) {
                    _a = content
                        ? bindContent_1.bindContent(content, contentOwnerComponent, params.getContext
                            ? params.getContext.call(ownerComponent, ownerComponent.params.$context, this)
                            : ownerComponent.params.$context, { 0: null, 1: null })
                        : bindContent_1.bindContent(el, ownerComponent, params.getContext
                            ? params.getContext.call(ownerComponent, params.$context, this)
                            : params.$context, { 0: null, 1: null }), this._bindings = _a[0], childComponents = _a[1];
                    this._childComponents = childComponents;
                }
                else {
                    this._bindings = null;
                    childComponents = this._childComponents = null;
                }
            }
            else {
                this._bindings = bindings;
                this._childComponents = childComponents;
                this._unfreezeBindings();
            }
            if (content) {
                ElementProtoMixin_1.suppressConnectionStatusCallbacks();
                if (el.firstChild) {
                    clear_node_1.clearNode(el);
                }
                el.appendChild(content);
                ElementProtoMixin_1.resumeConnectionStatusCallbacks();
            }
            if (childComponents) {
                attachChildComponentElements_1.attachChildComponentElements(childComponents);
            }
            this.isReady = true;
        }
        var _a;
    };
    RtSlot.prototype._detach = function () {
        this._attached = false;
        this._freezeBindings();
    };
    RtSlot = __decorate([
        Component_1.Component.Config({
            elementIs: 'RtSlot',
            params: {
                forTag: { type: String, readonly: true },
                for: { type: String, readonly: true },
                cloneContent: { default: false, readonly: true },
                getContext: { type: Object, readonly: true }
            },
            template: ''
        })
    ], RtSlot);
    return RtSlot;
}(Component_1.Component));
exports.RtSlot = RtSlot;


/***/ }),
/* 34 */
/***/ (function(module, exports) {

module.exports = __WEBPACK_EXTERNAL_MODULE_34__;

/***/ }),
/* 35 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var escape_string_1 = __webpack_require__(36);
var bindingToJSExpression_1 = __webpack_require__(37);
var componentParamValueMap_1 = __webpack_require__(14);
var ContentTextFragmentParser_1 = __webpack_require__(20);
var formatters_1 = __webpack_require__(18);
var ContentTextFragmentNodeType = ContentTextFragmentParser_1.ContentTextFragmentParser.ContentTextFragmentNodeType;
var keyCounter = 0;
var cache = Object.create(null);
function compileContentTextFragment(contentTextFragment, contentTextFragmentString, c) {
    var key = contentTextFragmentString + (c ? ',' : '.');
    if (cache[key]) {
        return cache[key];
    }
    var inner;
    if (contentTextFragment.length == 1) {
        inner = Function('formatters', "var temp; return " + (contentTextFragment[0].nodeType == ContentTextFragmentNodeType.TEXT
            ? "'" + escape_string_1.escapeString(contentTextFragment[0].value) + "'"
            : bindingToJSExpression_1.bindingToJSExpression(contentTextFragment[0])) + ";");
    }
    else {
        var jsExpr = [];
        for (var _i = 0, contentTextFragment_1 = contentTextFragment; _i < contentTextFragment_1.length; _i++) {
            var node = contentTextFragment_1[_i];
            jsExpr.push(node.nodeType == ContentTextFragmentNodeType.TEXT
                ? "'" + escape_string_1.escapeString(node.value) + "'"
                : bindingToJSExpression_1.bindingToJSExpression(node));
        }
        inner = Function('formatters', "var temp; return [" + jsExpr.join(', ') + "].join('');");
    }
    return (cache[key] = c
        ? function () {
            var value = inner.call(this, formatters_1.formatters);
            if (value) {
                var valueType = typeof value;
                if (valueType == 'object' || valueType == 'function') {
                    var key_1 = String(++keyCounter);
                    componentParamValueMap_1.componentParamValueMap.set(key_1, value);
                    return key_1;
                }
            }
            return value;
        }
        : function () {
            return inner.call(this, formatters_1.formatters);
        });
}
exports.compileContentTextFragment = compileContentTextFragment;


/***/ }),
/* 36 */
/***/ (function(module, exports) {

module.exports = __WEBPACK_EXTERNAL_MODULE_36__;

/***/ }),
/* 37 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var cache = Object.create(null);
function formattersReducer(jsExpr, formatter) {
    var args = formatter.arguments;
    return "(this." + formatter.name + " || formatters." + formatter.name + ").call(this.$component, " + jsExpr + (args &&
        args.value.length
        ? ', ' + args.value.join(', ')
        : '') + ")";
}
function bindingToJSExpression(binding) {
    var bindingRaw = binding.raw;
    if (cache[bindingRaw]) {
        return cache[bindingRaw];
    }
    var formatters = binding.formatters;
    if (!binding.isArgumentKeypath) {
        return (cache[bindingRaw] = formatters
            ? formatters.reduce(formattersReducer, binding.argument)
            : binding.argument);
    }
    var keys = binding.argument.split('.');
    var keyCount = keys.length;
    if (keyCount == 1) {
        return (cache[bindingRaw] = formatters
            ? formatters.reduce(formattersReducer, "this['" + keys[0] + "']")
            : "this['" + keys[0] + "']");
    }
    var index = keyCount - 2;
    var jsExprArr = Array(index);
    while (index) {
        jsExprArr[--index] = " && (temp = temp['" + keys[index + 1] + "'])";
    }
    var jsExpr = "(temp = this['" + keys[0] + "'])" + jsExprArr.join('') + " && temp['" + keys[keyCount - 1] + "']";
    return (cache[bindingRaw] = formatters ? formatters.reduce(formattersReducer, jsExpr) : jsExpr);
}
exports.bindingToJSExpression = bindingToJSExpression;


/***/ }),
/* 38 */
/***/ (function(module, exports) {

module.exports = __WEBPACK_EXTERNAL_MODULE_38__;

/***/ }),
/* 39 */
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
exports.bindEvents = bindEvents;


/***/ }),
/* 40 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var cellx_1 = __webpack_require__(1);
function freezeBinding(binding) {
    var changeEvent = binding._events.get('change');
    binding._events.delete('change');
    binding._frozenState = {
        changeEventListener: changeEvent.listener,
        changeEventContext: changeEvent.context,
        value: binding._value
    };
}
function unfreezeBinding(binding) {
    var frozenState = binding._frozenState;
    binding._frozenState = null;
    binding.on('change', frozenState.changeEventListener, frozenState.changeEventContext);
    if (frozenState.value !== binding._value) {
        binding._changeEvent = {
            target: binding,
            type: 'change',
            data: {
                prevEvent: null,
                prevValue: frozenState.value,
                value: binding._value
            }
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
    for (var _i = 0, bindings_2 = bindings; _i < bindings_2.length; _i++) {
        var binding = bindings_2[_i];
        unfreezeBinding(binding);
    }
    cellx_1.Cell.forceRelease();
}
exports.unfreezeBindings = unfreezeBindings;


/***/ }),
/* 41 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var Component_1 = __webpack_require__(2);
function ComponentConfigDecorator(config) {
    return function (componentConstr) {
        componentConstr.elementIs = config.elementIs;
        if (config.elementExtends !== undefined) {
            componentConstr.elementExtends = config.elementExtends;
        }
        if (config.params !== undefined) {
            componentConstr.params = config.params;
        }
        if (config.i18n !== undefined) {
            componentConstr.i18n = config.i18n;
        }
        if (config.template !== undefined) {
            componentConstr.template = config.template;
        }
        if (config.oevents !== undefined) {
            componentConstr.oevents = config.oevents;
        }
        if (config.events !== undefined) {
            componentConstr.events = config.events;
        }
        if (config.domEvents !== undefined) {
            componentConstr.domEvents = config.domEvents;
        }
        Component_1.Component.register(componentConstr);
    };
}
exports.ComponentConfigDecorator = ComponentConfigDecorator;


/***/ }),
/* 42 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var map_set_polyfill_1 = __webpack_require__(0);
exports.componentParamTypeMap = new map_set_polyfill_1.Map([
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
/* 43 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var escape_html_1 = __webpack_require__(44);
var is_regexp_1 = __webpack_require__(45);
var map_set_polyfill_1 = __webpack_require__(0);
var componentParamValueMap_1 = __webpack_require__(14);
exports.componentParamTypeSerializerMap = new map_set_polyfill_1.Map([
    [
        Boolean,
        {
            read: function (value, defaultValue) {
                return value !== null ? value != 'no' : !!defaultValue;
            },
            write: function (value, defaultValue) {
                return value ? '' : defaultValue ? 'no' : null;
            }
        }
    ],
    [
        Number,
        {
            read: function (value, defaultValue) {
                return value !== null ? +value : defaultValue !== undefined ? defaultValue : null;
            },
            write: function (value) {
                return value != null ? String(+value) : null;
            }
        }
    ],
    [
        String,
        {
            read: function (value, defaultValue) {
                return value !== null ? value : defaultValue !== undefined ? defaultValue : null;
            },
            write: function (value) {
                return value != null ? String(value) : null;
            }
        }
    ],
    [
        Object,
        {
            read: function (value, defaultValue) {
                if (value === null) {
                    return defaultValue || null;
                }
                if (!componentParamValueMap_1.componentParamValueMap.has(value)) {
                    throw new TypeError('Value is not an object');
                }
                var val = componentParamValueMap_1.componentParamValueMap.get(value);
                componentParamValueMap_1.componentParamValueMap.delete(value);
                return val;
            },
            write: function (value) {
                return value != null ? '' : null;
            }
        }
    ],
    [
        eval,
        {
            read: function (value, defaultValue) {
                return value !== null
                    ? Function("return " + escape_html_1.unescapeHTML(value) + ";")()
                    : defaultValue !== undefined ? defaultValue : null;
            },
            write: function (value) {
                return value != null
                    ? escape_html_1.escapeHTML(is_regexp_1.isRegExp(value) ? value.toString() : JSON.stringify(value))
                    : null;
            }
        }
    ]
]);
exports.componentParamTypeSerializerMap.set('boolean', exports.componentParamTypeSerializerMap.get(Boolean));
exports.componentParamTypeSerializerMap.set('number', exports.componentParamTypeSerializerMap.get(Number));
exports.componentParamTypeSerializerMap.set('string', exports.componentParamTypeSerializerMap.get(String));
exports.componentParamTypeSerializerMap.set('object', exports.componentParamTypeSerializerMap.get(Object));


/***/ }),
/* 44 */
/***/ (function(module, exports) {

module.exports = __WEBPACK_EXTERNAL_MODULE_44__;

/***/ }),
/* 45 */
/***/ (function(module, exports) {

module.exports = __WEBPACK_EXTERNAL_MODULE_45__;

/***/ }),
/* 46 */
/***/ (function(module, exports) {

module.exports = __WEBPACK_EXTERNAL_MODULE_46__;

/***/ }),
/* 47 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
exports.handledEvents = [
    'change',
    'click',
    'dblclick',
    'focusin',
    'focusout',
    'input',
    'mousedown',
    'mouseup',
    'submit'
];


/***/ }),
/* 48 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
function handleDOMEvent(evt) {
    var el = evt.target;
    var attrName = 'on-' + evt.type;
    var receivers;
    while (el.parentNode) {
        if (el.hasAttribute(attrName)) {
            (receivers || (receivers = [])).push(el);
        }
        el = el.parentNode;
        var component = el.$component;
        if (component && receivers && receivers.length) {
            for (var i = 0;;) {
                var attrValue = receivers[i].getAttribute(attrName);
                var handler = void 0;
                if (attrValue.charAt(0) == '/') {
                    var events = component.constructor.domEvents;
                    if (events) {
                        events = events[attrValue.slice(1)];
                        if (events) {
                            handler = events[evt.type];
                        }
                    }
                }
                else {
                    handler = component[attrValue];
                }
                if (handler) {
                    if (handler.call(component, evt, receivers[i]) === false) {
                        return;
                    }
                    receivers.splice(i, 1);
                }
                else {
                    i++;
                }
                if (i == receivers.length) {
                    break;
                }
            }
        }
        if (el == document.documentElement) {
            break;
        }
    }
}
exports.handleDOMEvent = handleDOMEvent;


/***/ }),
/* 49 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var ownerComponentStack = [];
function handleEvent(evt) {
    var target = evt.target;
    var ownerComponent = target.ownerComponent;
    if (target == ownerComponent) {
        return;
    }
    var el = target.element;
    if (!el.parentNode) {
        return;
    }
    ownerComponentStack.length = 0;
    var attrName = 'oncomponent-' + evt.type;
    var ownerComponentEl = ownerComponent.element;
    var receivers;
    for (var component = void 0;;) {
        if (el.hasAttribute(attrName)) {
            (receivers || (receivers = [])).push(el);
        }
        el = el.parentNode;
        if (el == ownerComponentEl) {
            if (receivers) {
                for (var i = 0, l = receivers.length; i < l; i++) {
                    var attrValue = receivers[i].getAttribute(attrName);
                    var handler = void 0;
                    if (attrValue.charAt(0) == '/') {
                        var events = ownerComponent.constructor.events;
                        if (events) {
                            events = events[attrValue.slice(1)];
                            if (events) {
                                handler = events[evt.type];
                            }
                        }
                    }
                    else {
                        handler = ownerComponent[attrValue];
                    }
                    if (handler && handler.call(ownerComponent, evt, receivers[i]) === false) {
                        return;
                    }
                }
            }
            if (ownerComponentStack.length) {
                if (!el.parentNode) {
                    break;
                }
                _a = ownerComponentStack.pop(), ownerComponent = _a[0], receivers = _a[1];
                ownerComponentEl = ownerComponent.element;
                continue;
            }
            else {
                break;
            }
        }
        if (!el.parentNode) {
            break;
        }
        component = el.$component;
        if (component && component.ownerComponent != ownerComponent) {
            ownerComponentStack.push([ownerComponent, receivers]);
            ownerComponent = component.ownerComponent;
            ownerComponentEl = ownerComponent.element;
            receivers = undefined;
        }
    }
    var _a;
}
exports.handleEvent = handleEvent;


/***/ }),
/* 50 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var hyphenize_1 = __webpack_require__(24);
var mixin_1 = __webpack_require__(51);
var pascalize_1 = __webpack_require__(52);
var nelm_1 = __webpack_require__(9);
var componentConstructorMap_1 = __webpack_require__(22);
var elementConstructorMap_1 = __webpack_require__(53);
var ElementProtoMixin_1 = __webpack_require__(3);
var push = Array.prototype.push;
function inheritProperty(target, source, name, depth) {
    var obj = target[name];
    var parentObj = source[name];
    if (obj && parentObj && obj != parentObj) {
        var o = (target[name] = { __proto__: parentObj });
        for (var key in obj) {
            o[key] = obj[key];
            if (depth) {
                inheritProperty(o, parentObj, key, depth - 1);
            }
        }
    }
}
function registerComponent(componentConstr) {
    var elIs = componentConstr.elementIs;
    if (!elIs) {
        throw new TypeError('Static property "elementIs" is required');
    }
    var hyphenizedElIs = hyphenize_1.hyphenize(elIs);
    if (componentConstructorMap_1.componentConstructorMap.has(hyphenizedElIs)) {
        throw new TypeError("Component \"" + hyphenizedElIs + "\" already registered");
    }
    var parentComponentConstr = Object.getPrototypeOf(componentConstr.prototype)
        .constructor;
    inheritProperty(componentConstr, parentComponentConstr, 'params', 0);
    inheritProperty(componentConstr, parentComponentConstr, 'i18n', 0);
    componentConstr._blockNamesString =
        hyphenizedElIs + ' ' + (parentComponentConstr._blockNamesString || '');
    componentConstr._elementBlockNames = [hyphenizedElIs];
    if (parentComponentConstr._elementBlockNames) {
        push.apply(componentConstr._elementBlockNames, parentComponentConstr._elementBlockNames);
    }
    var template = componentConstr.template;
    if (template !== null) {
        if (template === parentComponentConstr.template) {
            componentConstr.template = template.extend('', {
                blockName: hyphenizedElIs
            });
        }
        else {
            if (template instanceof nelm_1.Template) {
                template.setBlockName(componentConstr._elementBlockNames);
            }
            else {
                componentConstr.template = parentComponentConstr.template
                    ? parentComponentConstr.template.extend(template, {
                        blockName: hyphenizedElIs
                    })
                    : new nelm_1.Template(template, { blockName: componentConstr._elementBlockNames });
            }
        }
    }
    componentConstr._rawContent = undefined;
    inheritProperty(componentConstr, parentComponentConstr, 'oevents', 1);
    inheritProperty(componentConstr, parentComponentConstr, 'events', 1);
    inheritProperty(componentConstr, parentComponentConstr, 'domEvents', 1);
    var elExtends = componentConstr.elementExtends && hyphenize_1.hyphenize(componentConstr.elementExtends);
    var parentElConstr = (elExtends &&
        (elementConstructorMap_1.elementConstructorMap.get(elExtends) ||
            window["HTML" + pascalize_1.pascalize(elExtends) + "Element"])) ||
        HTMLElement;
    var elConstr = function (self) {
        return parentElConstr.call(this, self);
    };
    elConstr._rioniteComponentConstructor = componentConstr;
    Object.defineProperty(elConstr, 'observedAttributes', {
        configurable: true,
        enumerable: true,
        get: function () {
            var paramsConfig = componentConstr.params;
            if (!paramsConfig) {
                return [];
            }
            var observedAttrs = [];
            for (var name_1 in paramsConfig) {
                observedAttrs.push(hyphenize_1.hyphenize(name_1, true));
            }
            return observedAttrs;
        }
    });
    var elProto = (elConstr.prototype = Object.create(parentElConstr.prototype));
    elProto.constructor = elConstr;
    mixin_1.mixin(elProto, ElementProtoMixin_1.ElementProtoMixin);
    window.customElements.define(hyphenizedElIs, elConstr, elExtends ? { extends: elExtends } : null);
    componentConstructorMap_1.componentConstructorMap.set(elIs, componentConstr);
    elementConstructorMap_1.elementConstructorMap.set(elIs, elConstr);
    if (hyphenizedElIs != elIs) {
        componentConstructorMap_1.componentConstructorMap.set(hyphenizedElIs, componentConstr);
        elementConstructorMap_1.elementConstructorMap.set(hyphenizedElIs, elConstr);
    }
    return componentConstr;
}
exports.registerComponent = registerComponent;


/***/ }),
/* 51 */
/***/ (function(module, exports) {

module.exports = __WEBPACK_EXTERNAL_MODULE_51__;

/***/ }),
/* 52 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var camelize_1 = __webpack_require__(13);
var cache = Object.create(null);
function pascalize(str, useCache) {
    var value;
    return ((useCache && cache[str]) ||
        ((value = camelize_1.camelize(str)),
            (value = value.charAt(0).toUpperCase() + value.slice(1)),
            useCache ? (cache[str] = value) : value));
}
exports.pascalize = pascalize;


/***/ }),
/* 53 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var map_set_polyfill_1 = __webpack_require__(0);
exports.elementConstructorMap = new map_set_polyfill_1.Map([
    ['a', window.HTMLAnchorElement],
    ['blockquote', window.HTMLQuoteElement],
    ['br', window.HTMLBRElement],
    ['caption', window.HTMLTableCaptionElement],
    ['col', window.HTMLTableColElement],
    ['colgroup', window.HTMLTableColElement],
    ['datalist', window.HTMLDataListElement],
    ['del', window.HTMLModElement],
    ['dir', window.HTMLDirectoryElement],
    ['dl', window.HTMLDListElement],
    ['document', window.HTMLDocument],
    ['element', Element],
    ['fieldset', window.HTMLFieldSetElement],
    ['frameset', window.HTMLFrameSetElement],
    ['h1', window.HTMLHeadingElement],
    ['h2', window.HTMLHeadingElement],
    ['h3', window.HTMLHeadingElement],
    ['h4', window.HTMLHeadingElement],
    ['h5', window.HTMLHeadingElement],
    ['h6', window.HTMLHeadingElement],
    ['hr', window.HTMLHRElement],
    ['iframe', window.HTMLIFrameElement],
    ['img', window.HTMLImageElement],
    ['ins', window.HTMLModElement],
    ['li', window.HTMLLIElement],
    ['menuitem', window.HTMLMenuItemElement],
    ['ol', window.HTMLOListElement],
    ['optgroup', window.HTMLOptGroupElement],
    ['p', window.HTMLParagraphElement],
    ['q', window.HTMLQuoteElement],
    ['tbody', window.HTMLTableSectionElement],
    ['td', window.HTMLTableCellElement],
    ['template', window.HTMLTemplateElement],
    ['textarea', window.HTMLTextAreaElement],
    ['tfoot', window.HTMLTableSectionElement],
    ['th', window.HTMLTableCellElement],
    ['thead', window.HTMLTableSectionElement],
    ['tr', window.HTMLTableRowElement],
    ['ul', window.HTMLUListElement],
    ['vhgroupv', window.HTMLUnknownElement],
    ['vkeygen', window.HTMLUnknownElement]
]);


/***/ }),
/* 54 */
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
var clear_node_1 = __webpack_require__(19);
var get_uid_1 = __webpack_require__(10);
var map_set_polyfill_1 = __webpack_require__(0);
var move_content_1 = __webpack_require__(11);
var symbol_polyfill_1 = __webpack_require__(12);
var attachChildComponentElements_1 = __webpack_require__(4);
var bindContent_1 = __webpack_require__(5);
var Component_1 = __webpack_require__(2);
var ElementProtoMixin_1 = __webpack_require__(3);
var KEY_CONTENT_MAP = symbol_polyfill_1.Symbol('contentMap');
var RtContent = /** @class */ (function (_super) {
    __extends(RtContent, _super);
    function RtContent() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    RtContent.prototype._attach = function () {
        this._attached = true;
        if (this.isReady) {
            this._unfreezeBindings();
        }
        else {
            var ownerComponent = this.ownerComponent;
            var el = this.element;
            var params = this.params;
            var contentOwnerComponent = ownerComponent.ownerComponent;
            var ownerComponentContent = ownerComponent.params.$content;
            var clone = params.clone;
            var content = void 0;
            var bindings = void 0;
            var childComponents = void 0;
            if (!clone || ownerComponentContent.firstChild) {
                var selector = params.select;
                var key = get_uid_1.getUID(ownerComponent) + '/' + (selector || '');
                if (selector) {
                    var contentMap = void 0;
                    if (!clone &&
                        (contentMap = contentOwnerComponent[KEY_CONTENT_MAP]) &&
                        contentMap.has(key)) {
                        var container = contentMap.get(key);
                        if (container.firstChild) {
                            content = move_content_1.moveContent(document.createDocumentFragment(), container);
                            contentMap.set(key, el);
                            bindings = container.$component._bindings;
                            childComponents = container.$component._childComponents;
                        }
                    }
                    else if (ownerComponentContent.firstElementChild) {
                        var selectedElements = ownerComponentContent.querySelectorAll(selector);
                        var selectedElementCount = selectedElements.length;
                        if (selectedElementCount) {
                            content = document.createDocumentFragment();
                            for (var i = 0; i < selectedElementCount; i++) {
                                content.appendChild(clone
                                    ? selectedElements[i].cloneNode(true)
                                    : selectedElements[i]);
                            }
                        }
                        if (!clone) {
                            (contentMap ||
                                contentOwnerComponent[KEY_CONTENT_MAP] ||
                                (contentOwnerComponent[KEY_CONTENT_MAP] = new map_set_polyfill_1.Map())).set(key, el);
                        }
                    }
                }
                else if (!clone) {
                    var contentMap = contentOwnerComponent[KEY_CONTENT_MAP];
                    if (contentMap && contentMap.has(key)) {
                        var container = contentMap.get(key);
                        content = move_content_1.moveContent(document.createDocumentFragment(), container);
                        contentMap.set(key, el);
                        bindings = container.$component._bindings;
                        childComponents = container.$component._childComponents;
                    }
                    else if (ownerComponentContent.firstChild) {
                        content = ownerComponentContent;
                        (contentMap || (contentOwnerComponent[KEY_CONTENT_MAP] = new map_set_polyfill_1.Map())).set(key, el);
                    }
                }
                else {
                    content = ownerComponentContent.cloneNode(true);
                }
            }
            if (bindings === undefined) {
                if (content || el.firstChild) {
                    _a = content
                        ? bindContent_1.bindContent(content, contentOwnerComponent, params.getContext
                            ? params.getContext.call(ownerComponent, ownerComponent.params.$context, this)
                            : ownerComponent.params.$context, { 0: null, 1: null })
                        : bindContent_1.bindContent(el, ownerComponent, params.getContext
                            ? params.getContext.call(ownerComponent, params.$context, this)
                            : params.$context, { 0: null, 1: null }), this._bindings = _a[0], childComponents = _a[1];
                    this._childComponents = childComponents;
                }
                else {
                    this._bindings = null;
                    childComponents = this._childComponents = null;
                }
            }
            else {
                this._bindings = bindings;
                this._childComponents = childComponents;
                this._unfreezeBindings();
            }
            if (content) {
                ElementProtoMixin_1.suppressConnectionStatusCallbacks();
                if (el.firstChild) {
                    clear_node_1.clearNode(el);
                }
                el.appendChild(content);
                ElementProtoMixin_1.resumeConnectionStatusCallbacks();
            }
            if (childComponents) {
                attachChildComponentElements_1.attachChildComponentElements(childComponents);
            }
            this.isReady = true;
        }
        var _a;
    };
    RtContent.prototype._detach = function () {
        this._attached = false;
        this._freezeBindings();
    };
    RtContent = __decorate([
        Component_1.Component.Config({
            elementIs: 'RtContent',
            params: {
                select: { type: String, readonly: true },
                clone: { default: false, readonly: true },
                getContext: { type: Object, readonly: true }
            },
            template: ''
        })
    ], RtContent);
    return RtContent;
}(Component_1.Component));
exports.RtContent = RtContent;


/***/ }),
/* 55 */
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
var rt_if_then_1 = __webpack_require__(25);
var RtIfElse = /** @class */ (function (_super) {
    __extends(RtIfElse, _super);
    function RtIfElse() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this._elseMode = true;
        return _this;
    }
    RtIfElse = __decorate([
        rt_if_then_1.RtIfThen.Config({
            elementIs: 'RtIfElse',
            elementExtends: 'template'
        })
    ], RtIfElse);
    return RtIfElse;
}(rt_if_then_1.RtIfThen));
exports.RtIfElse = RtIfElse;


/***/ }),
/* 56 */
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
var map_set_polyfill_1 = __webpack_require__(0);
var next_tick_1 = __webpack_require__(26);
var cellx_1 = __webpack_require__(1);
var attachChildComponentElements_1 = __webpack_require__(4);
var bindContent_1 = __webpack_require__(5);
var compileKeypath_1 = __webpack_require__(27);
var Component_1 = __webpack_require__(2);
var ElementProtoMixin_1 = __webpack_require__(3);
var Features_1 = __webpack_require__(6);
var KEY_ELEMENT_CONNECTED_1 = __webpack_require__(7);
var keypathPattern_1 = __webpack_require__(15);
var namePattern_1 = __webpack_require__(16);
var slice = Array.prototype.slice;
var reForAttrValue = RegExp("^\\s*(" + namePattern_1.namePattern + ")\\s+of\\s+(" + keypathPattern_1.keypathPattern + ")\\s*$");
var RtRepeat = /** @class */ (function (_super) {
    __extends(RtRepeat, _super);
    function RtRepeat() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this._active = false;
        return _this;
    }
    RtRepeat.prototype.elementConnected = function () {
        if (this._active) {
            return;
        }
        this._active = true;
        if (!this.initialized) {
            var params = this.params;
            var for_ = params['for'].match(reForAttrValue);
            if (!for_) {
                throw new SyntaxError("Invalid value of parameter \"for\" (" + params['for'] + ")");
            }
            this._itemName = for_[1];
            this._list = new cellx_1.Cell(compileKeypath_1.compileKeypath(for_[2]), {
                context: params.$context
            });
            this._trackBy = params.trackBy;
            var rawItemContent = (this._rawItemContent = document.importNode(this.element.content, true));
            if (params.strip) {
                var firstChild = rawItemContent.firstChild;
                var lastChild = rawItemContent.lastChild;
                if (firstChild == lastChild) {
                    if (firstChild.nodeType == Node.TEXT_NODE) {
                        firstChild.nodeValue = firstChild.nodeValue.trim();
                    }
                }
                else {
                    if (firstChild.nodeType == Node.TEXT_NODE) {
                        if (!(firstChild.nodeValue = firstChild.nodeValue.replace(/^\s+/, ''))) {
                            rawItemContent.removeChild(firstChild);
                        }
                    }
                    if (lastChild.nodeType == Node.TEXT_NODE) {
                        if (!(lastChild.nodeValue = lastChild.nodeValue.replace(/\s+$/, ''))) {
                            rawItemContent.removeChild(lastChild);
                        }
                    }
                }
            }
            this._itemMap = new map_set_polyfill_1.Map();
            this.initialized = true;
        }
        this._list.on('change', this._onListChange, this);
        this._render(false);
    };
    RtRepeat.prototype.elementDisconnected = function () {
        var _this = this;
        next_tick_1.nextTick(function () {
            if (!_this.element[KEY_ELEMENT_CONNECTED_1.KEY_ELEMENT_CONNECTED]) {
                _this._deactivate();
            }
        });
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
    RtRepeat.prototype._render = function (changed) {
        var _this = this;
        var prevItemMap = (this._prevItemMap = this._itemMap);
        this._itemMap = new map_set_polyfill_1.Map();
        var list = this._list.get();
        var c;
        if (list) {
            this._lastNode = this.element;
            c = list.reduce(function (changed, item, index) { return _this._renderItem(item, index) || changed; }, false);
        }
        else {
            c = false;
        }
        if (prevItemMap.size) {
            this._clearByItemMap(prevItemMap);
        }
        else if (!c) {
            return;
        }
        if (changed) {
            cellx_1.Cell.forceRelease();
            this.emit('change');
        }
    };
    RtRepeat.prototype._renderItem = function (item, index) {
        var trackBy = this._trackBy;
        var value = trackBy ? (trackBy == '$index' ? index : item[trackBy]) : item;
        var prevItems = this._prevItemMap.get(value);
        var items = this._itemMap.get(value);
        if (prevItems) {
            var prevItem = void 0;
            if (prevItems.length == 1) {
                prevItem = prevItems[0];
                this._prevItemMap.delete(value);
            }
            else {
                prevItem = prevItems.shift();
            }
            if (items) {
                items.push(prevItem);
            }
            else {
                this._itemMap.set(value, [prevItem]);
            }
            prevItem.item.set(item);
            var nodes = prevItem.nodes;
            if (index == prevItem.index.get()) {
                this._lastNode = nodes[nodes.length - 1];
                return false;
            }
            prevItem.index.set(index);
            var nodeCount = nodes.length;
            if (nodeCount == 1) {
                var node = nodes[0];
                var nextNode = this._lastNode.nextSibling;
                if (node !== nextNode) {
                    this._lastNode.parentNode.insertBefore(node, nextNode);
                }
                this._lastNode = node;
            }
            else {
                if (nodes[0] !== this._lastNode.nextSibling) {
                    var df = document.createDocumentFragment();
                    for (var i = 0; i < nodeCount; i++) {
                        df.appendChild(nodes[i]);
                    }
                    this._lastNode.parentNode.insertBefore(df, this._lastNode.nextSibling);
                }
                this._lastNode = nodes[nodeCount - 1];
            }
            return true;
        }
        var itemCell = new cellx_1.Cell(item);
        var indexCell = new cellx_1.Cell(index);
        var content = this._rawItemContent.cloneNode(true);
        if (!Features_1.templateTag) {
            var templates = content.querySelectorAll('template');
            for (var i = 0, l = templates.length; i < l;) {
                i += templates[i].content.querySelectorAll('template').length + 1;
            }
        }
        var context = this.params.$context;
        var _a = bindContent_1.bindContent(content, this.ownerComponent, Object.create(context, (_b = {
                $component: {
                    configurable: false,
                    enumerable: false,
                    writable: false,
                    value: context.$component || context
                }
            },
            _b[this._itemName + 'Cell'] = {
                configurable: true,
                enumerable: false,
                writable: true,
                value: itemCell
            },
            _b[this._itemName] = {
                configurable: true,
                enumerable: true,
                get: function () {
                    return itemCell.get();
                }
            },
            _b.$indexCell = {
                configurable: true,
                enumerable: false,
                writable: true,
                value: indexCell
            },
            _b.$index = {
                configurable: true,
                enumerable: true,
                get: function () {
                    return indexCell.get();
                }
            },
            _b)), { 0: null, 1: null }), bindings = _a[0], childComponents = _a[1];
        var newItem = {
            item: itemCell,
            index: indexCell,
            nodes: slice.call(content.childNodes),
            bindings: bindings
        };
        if (items) {
            items.push(newItem);
        }
        else {
            this._itemMap.set(value, [newItem]);
        }
        var newLastNode = content.lastChild;
        ElementProtoMixin_1.suppressConnectionStatusCallbacks();
        this._lastNode.parentNode.insertBefore(content, this._lastNode.nextSibling);
        ElementProtoMixin_1.resumeConnectionStatusCallbacks();
        this._lastNode = newLastNode;
        if (childComponents) {
            attachChildComponentElements_1.attachChildComponentElements(childComponents);
        }
        return true;
        var _b;
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
    RtRepeat.prototype._deactivate = function () {
        if (!this._active) {
            return;
        }
        this._active = false;
        this._list.off('change', this._onListChange, this);
        this._clearByItemMap(this._itemMap);
    };
    RtRepeat = __decorate([
        Component_1.Component.Config({
            elementIs: 'RtRepeat',
            elementExtends: 'template',
            params: {
                for: { type: String, required: true, readonly: true },
                trackBy: { type: String, readonly: true },
                strip: { default: false, readonly: true }
            }
        })
    ], RtRepeat);
    return RtRepeat;
}(Component_1.Component));
exports.RtRepeat = RtRepeat;


/***/ })
/******/ ]);
});