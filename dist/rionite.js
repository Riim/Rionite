(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory(require("@riim/map-set-polyfill"), require("cellx"), require("@riim/symbol-polyfill"), require("@riim/di"), require("nelm-parser"), require("@riim/logger"), require("@riim/escape-html"), require("escape-string"), require("@riim/hyphenize"), require("@riim/get-uid"), require("@riim/move-content"), require("@riim/next-tick"), require("@riim/next-uid"), require("@riim/gettext"), require("@riim/mixin"), require("html-to-fragment"), require("@riim/is-regexp"), require("@riim/set-attribute"), require("@riim/defer"), require("@riim/lower-case-first-word"), require("@riim/clear-node"));
	else if(typeof define === 'function' && define.amd)
		define(["@riim/map-set-polyfill", "cellx", "@riim/symbol-polyfill", "@riim/di", "nelm-parser", "@riim/logger", "@riim/escape-html", "escape-string", "@riim/hyphenize", "@riim/get-uid", "@riim/move-content", "@riim/next-tick", "@riim/next-uid", "@riim/gettext", "@riim/mixin", "html-to-fragment", "@riim/is-regexp", "@riim/set-attribute", "@riim/defer", "@riim/lower-case-first-word", "@riim/clear-node"], factory);
	else if(typeof exports === 'object')
		exports["rionite"] = factory(require("@riim/map-set-polyfill"), require("cellx"), require("@riim/symbol-polyfill"), require("@riim/di"), require("nelm-parser"), require("@riim/logger"), require("@riim/escape-html"), require("escape-string"), require("@riim/hyphenize"), require("@riim/get-uid"), require("@riim/move-content"), require("@riim/next-tick"), require("@riim/next-uid"), require("@riim/gettext"), require("@riim/mixin"), require("html-to-fragment"), require("@riim/is-regexp"), require("@riim/set-attribute"), require("@riim/defer"), require("@riim/lower-case-first-word"), require("@riim/clear-node"));
	else
		root["rionite"] = factory(root["@riim/map-set-polyfill"], root["cellx"], root["@riim/symbol-polyfill"], root["@riim/di"], root["nelm-parser"], root["@riim/logger"], root["@riim/escape-html"], root["escape-string"], root["@riim/hyphenize"], root["@riim/get-uid"], root["@riim/move-content"], root["@riim/next-tick"], root["@riim/next-uid"], root["@riim/gettext"], root["@riim/mixin"], root["html-to-fragment"], root["@riim/is-regexp"], root["@riim/set-attribute"], root["@riim/defer"], root["@riim/lower-case-first-word"], root["@riim/clear-node"]);
})(typeof self !== 'undefined' ? self : this, function(__WEBPACK_EXTERNAL_MODULE_0__, __WEBPACK_EXTERNAL_MODULE_3__, __WEBPACK_EXTERNAL_MODULE_5__, __WEBPACK_EXTERNAL_MODULE_10__, __WEBPACK_EXTERNAL_MODULE_11__, __WEBPACK_EXTERNAL_MODULE_19__, __WEBPACK_EXTERNAL_MODULE_20__, __WEBPACK_EXTERNAL_MODULE_21__, __WEBPACK_EXTERNAL_MODULE_25__, __WEBPACK_EXTERNAL_MODULE_26__, __WEBPACK_EXTERNAL_MODULE_27__, __WEBPACK_EXTERNAL_MODULE_31__, __WEBPACK_EXTERNAL_MODULE_38__, __WEBPACK_EXTERNAL_MODULE_39__, __WEBPACK_EXTERNAL_MODULE_40__, __WEBPACK_EXTERNAL_MODULE_43__, __WEBPACK_EXTERNAL_MODULE_45__, __WEBPACK_EXTERNAL_MODULE_46__, __WEBPACK_EXTERNAL_MODULE_50__, __WEBPACK_EXTERNAL_MODULE_55__, __WEBPACK_EXTERNAL_MODULE_58__) {
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
/******/ 	return __webpack_require__(__webpack_require__.s = 34);
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
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
var di_1 = __webpack_require__(10);
var get_uid_1 = __webpack_require__(26);
var hyphenize_1 = __webpack_require__(25);
var logger_1 = __webpack_require__(19);
var map_set_polyfill_1 = __webpack_require__(0);
var move_content_1 = __webpack_require__(27);
var symbol_polyfill_1 = __webpack_require__(5);
var cellx_1 = __webpack_require__(3);
var html_to_fragment_1 = __webpack_require__(43);
var attachChildComponentElements_1 = __webpack_require__(6);
var bindContent_1 = __webpack_require__(8);
var componentBinding_1 = __webpack_require__(49);
var componentConstructorMap_1 = __webpack_require__(16);
var DisposableMixin_1 = __webpack_require__(22);
var elementConstructorMap_1 = __webpack_require__(30);
var ElementProtoMixin_1 = __webpack_require__(2);
var handledEvents_1 = __webpack_require__(51);
var handleDOMEvent_1 = __webpack_require__(52);
var handleEvent_1 = __webpack_require__(53);
var Features_1 = __webpack_require__(9);
var map = Array.prototype.map;
exports.KEY_PARAMS_CONFIG = symbol_polyfill_1.Symbol('paramsConfig');
exports.KEY_PARAMS = symbol_polyfill_1.Symbol('params');
function findChildComponents(node, ownerComponent, context, childComponents) {
    for (var child = node.firstChild; child; child = child.nextSibling) {
        if (child.nodeType == Node.ELEMENT_NODE) {
            var childComponent = child.$component;
            if (childComponent) {
                childComponent._ownerComponent = ownerComponent;
                childComponent.$context = context;
                (childComponents || (childComponents = [])).push(childComponent);
            }
            if (child.firstChild &&
                (!childComponent ||
                    childComponent.constructor.template === null)) {
                childComponents = findChildComponents(child, ownerComponent, context, childComponents);
            }
        }
    }
    return childComponents || null;
}
var BaseComponent = /** @class */ (function (_super) {
    __extends(BaseComponent, _super);
    function BaseComponent(el) {
        var _this = _super.call(this) || this;
        _this._parentComponent = null;
        _this._attached = false;
        _this.initialized = false;
        _this.isReady = false;
        DisposableMixin_1.DisposableMixin.call(_this);
        var constr = _this.constructor;
        if (!elementConstructorMap_1.elementConstructorMap.has(constr.elementIs)) {
            throw new TypeError('Component must be registered');
        }
        if (!el) {
            el = document.createElement(hyphenize_1.hyphenize(constr.elementIs, true));
        }
        _this.element = el;
        el.rioniteComponent = _this;
        Object.defineProperty(el, '$component', { value: _this });
        _this[exports.KEY_PARAMS] = new map_set_polyfill_1.Map();
        _this.created();
        return _this;
    }
    Object.defineProperty(BaseComponent.prototype, "ownerComponent", {
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
    Object.defineProperty(BaseComponent.prototype, "parentComponent", {
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
    BaseComponent.prototype.handleEvent = function (evt) {
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
    BaseComponent.prototype.listenTo = function (target, type, listener, context, useCapture) {
        return DisposableMixin_1.DisposableMixin.prototype.listenTo.call(this, typeof target == 'string' ? this.$(target) : target, type, listener, context, useCapture);
    };
    BaseComponent.prototype._listenTo = function (target, type, listener, context, useCapture) {
        if (target instanceof BaseComponent) {
            if (type.charAt(0) == '<') {
                var index = type.indexOf('>', 2);
                var targetType = type.slice(1, index);
                if (targetType != '*') {
                    var targetConstr_1 = elementConstructorMap_1.elementConstructorMap.has(targetType) &&
                        componentConstructorMap_1.componentConstructorMap.get(targetType);
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
    BaseComponent.prototype._attach = function () {
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
        }
        else {
            var el = this.element;
            el.className = constr._blockNamesString + el.className;
            if (constr.template === null) {
                this._bindings = null;
                var childComponents = findChildComponents(el, this.ownerComponent, this.$context || this.ownerComponent);
                if (childComponents) {
                    attachChildComponentElements_1.attachChildComponentElements(childComponents);
                }
            }
            else {
                if (el.firstChild) {
                    ElementProtoMixin_1.suppressConnectionStatusCallbacks();
                    this.$content = move_content_1.moveContent(document.createDocumentFragment(), el);
                    ElementProtoMixin_1.resumeConnectionStatusCallbacks();
                }
                else {
                    this.$content = document.createDocumentFragment();
                }
                var rawContent = constr._rawContent ||
                    (constr._rawContent = bindContent_1.prepareContent(html_to_fragment_1.htmlToFragment(constr.template.render())));
                var content = rawContent.cloneNode(true);
                if (!Features_1.templateTag) {
                    var templates = content.querySelectorAll('template');
                    for (var i = 0, l = templates.length; i < l;) {
                        i += templates[i].content.querySelectorAll('template').length + 1;
                    }
                }
                var _a = bindContent_1.bindContent(content, this, this, {
                    0: null,
                    1: null,
                    2: null
                }), bindings = _a[0], backBindings = _a[1], childComponents = _a[2];
                this._bindings = bindings;
                ElementProtoMixin_1.suppressConnectionStatusCallbacks();
                this.element.appendChild(content);
                ElementProtoMixin_1.resumeConnectionStatusCallbacks();
                if (childComponents) {
                    attachChildComponentElements_1.attachChildComponentElements(childComponents);
                }
                if (backBindings) {
                    for (var i = backBindings.length; i;) {
                        var backBinding = backBindings[--i];
                        backBinding[0].on('change:' + backBinding[1], backBinding[2]);
                    }
                }
            }
            this.ready();
            this.isReady = true;
        }
        this.elementAttached();
    };
    BaseComponent.prototype._detach = function () {
        this._attached = false;
        this.elementDetached();
        this.dispose();
    };
    BaseComponent.prototype.dispose = function () {
        this._freezeBindings();
        return DisposableMixin_1.DisposableMixin.prototype.dispose.call(this);
    };
    BaseComponent.prototype._freezeBindings = function () {
        if (this._bindings) {
            componentBinding_1.freezeBindings(this._bindings);
        }
    };
    BaseComponent.prototype._unfreezeBindings = function () {
        if (this._bindings) {
            componentBinding_1.unfreezeBindings(this._bindings);
        }
    };
    BaseComponent.prototype._destroyBindings = function () {
        var bindings = this._bindings;
        if (bindings) {
            for (var i = bindings.length; i;) {
                bindings[--i].off();
            }
            this._bindings = null;
        }
    };
    // Callbacks
    BaseComponent.prototype.created = function () { };
    BaseComponent.prototype.initialize = function () { };
    BaseComponent.prototype.ready = function () { };
    BaseComponent.prototype.elementConnected = function () { };
    BaseComponent.prototype.elementDisconnected = function () { };
    BaseComponent.prototype.elementAttached = function () { };
    BaseComponent.prototype.elementDetached = function () { };
    BaseComponent.prototype.elementMoved = function () { };
    // Utils
    BaseComponent.prototype.$ = function (name, container) {
        var elList = this._getElementList(name, container);
        return (elList && elList.length
            ? elList[0].$component || elList[0]
            : null);
    };
    BaseComponent.prototype.$$ = function (name, container) {
        var elList = this._getElementList(name, container);
        return elList
            ? map.call(elList, function (el) { return el.$component || el; })
            : [];
    };
    BaseComponent.prototype._getElementList = function (name, container) {
        var elListMap = this._elementListMap || (this._elementListMap = new map_set_polyfill_1.Map());
        var containerEl;
        if (container) {
            if (typeof container == 'string') {
                container = this.$(container);
            }
            containerEl = container instanceof BaseComponent ? container.element : container;
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
    BaseComponent.elementExtends = null;
    BaseComponent.params = null;
    BaseComponent.i18n = null;
    BaseComponent.template = null;
    BaseComponent.events = null;
    BaseComponent.domEvents = null;
    __decorate([
        di_1.Inject('logger'),
        __metadata("design:type", logger_1.Logger)
    ], BaseComponent.prototype, "logger", void 0);
    return BaseComponent;
}(cellx_1.EventEmitter));
exports.BaseComponent = BaseComponent;
var disposableMixinProto = DisposableMixin_1.DisposableMixin.prototype;
var baseComponentProto = BaseComponent.prototype;
Object.getOwnPropertyNames(disposableMixinProto).forEach(function (name) {
    if (!(name in baseComponentProto)) {
        Object.defineProperty(baseComponentProto, name, Object.getOwnPropertyDescriptor(disposableMixinProto, name));
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
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var defer_1 = __webpack_require__(50);
var di_1 = __webpack_require__(10);
var symbol_polyfill_1 = __webpack_require__(5);
var BaseComponent_1 = __webpack_require__(1);
var ComponentParams_1 = __webpack_require__(7);
var Features_1 = __webpack_require__(9);
exports.KEY_IS_ELEMENT_CONNECTED = symbol_polyfill_1.Symbol('Rionite.isElementConnected');
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
    _a[exports.KEY_IS_ELEMENT_CONNECTED] = false,
    _a.connectedCallback = function () {
        var _this = this;
        this[exports.KEY_IS_ELEMENT_CONNECTED] = true;
        if (isConnectionStatusCallbacksSuppressed) {
            return;
        }
        var component = this.rioniteComponent;
        if (component) {
            ComponentParams_1.ComponentParams.init(component);
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
                if (_this[exports.KEY_IS_ELEMENT_CONNECTED]) {
                    var component_1 = _this.$component;
                    component_1._parentComponent = undefined;
                    if (!component_1.parentComponent && !component_1._attached) {
                        ComponentParams_1.ComponentParams.init(component_1);
                        component_1.elementConnected();
                        component_1._attach();
                    }
                }
            });
        }
    },
    _a.disconnectedCallback = function () {
        this[exports.KEY_IS_ELEMENT_CONNECTED] = false;
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
    _a.attributeChangedCallback = function (name, prevRawValue, rawValue) {
        var component = this.rioniteComponent;
        if (component && component.isReady) {
            var $paramConfig = component.constructor[BaseComponent_1.KEY_PARAMS_CONFIG][name];
            if ($paramConfig.readonly) {
                if (Features_1.nativeCustomElements) {
                    throw new TypeError("Cannot write to readonly parameter \"" + $paramConfig.name + "\"");
                }
            }
            else {
                var valueCell = component[$paramConfig.property + 'Cell'];
                var value = $paramConfig.typeSerializer.read(rawValue, $paramConfig.default);
                if (valueCell) {
                    valueCell.set(value);
                }
                else {
                    component[BaseComponent_1.KEY_PARAMS].set($paramConfig.name, value);
                }
            }
        }
    },
    _a);
var _a;


/***/ }),
/* 3 */
/***/ (function(module, exports) {

module.exports = __WEBPACK_EXTERNAL_MODULE_3__;

/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var registerComponent_1 = __webpack_require__(24);
function Component(config) {
    return function (componentConstr) {
        if (config) {
            if (config.elementIs !== undefined) {
                componentConstr.elementIs = config.elementIs;
            }
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
            if (config.events !== undefined) {
                componentConstr.events = config.events;
            }
            if (config.domEvents !== undefined) {
                componentConstr.domEvents = config.domEvents;
            }
        }
        registerComponent_1.registerComponent(componentConstr);
    };
}
exports.Component = Component;


/***/ }),
/* 5 */
/***/ (function(module, exports) {

module.exports = __WEBPACK_EXTERNAL_MODULE_5__;

/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var ComponentParams_1 = __webpack_require__(7);
function attachChildComponentElements(childComponents) {
    for (var _i = 0, childComponents_1 = childComponents; _i < childComponents_1.length; _i++) {
        var childComponent = childComponents_1[_i];
        if (!childComponent._attached) {
            childComponent._parentComponent = undefined;
            ComponentParams_1.ComponentParams.init(childComponent);
            childComponent.elementConnected();
            childComponent._attach();
        }
    }
}
exports.attachChildComponentElements = attachChildComponentElements;


/***/ }),
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var symbol_polyfill_1 = __webpack_require__(5);
var BaseComponent_1 = __webpack_require__(1);
var componentParamTypeSerializerMap_1 = __webpack_require__(44);
exports.KEY_IS_COMPONENT_PARAMS_INITED = symbol_polyfill_1.Symbol('Rionite.isComponentParamsInited');
function initParam(component, $paramConfig, name) {
    if ($paramConfig === null) {
        return;
    }
    var typeSerializer = $paramConfig.typeSerializer;
    var defaultValue;
    if (typeSerializer) {
        defaultValue = $paramConfig.default;
    }
    else {
        var paramConfig = $paramConfig.paramConfig;
        var type = typeof paramConfig;
        defaultValue = component[$paramConfig.property];
        var isObject = type == 'object' &&
            (paramConfig.type !== undefined ||
                paramConfig.default !== undefined);
        if (defaultValue === undefined) {
            if (isObject) {
                defaultValue = paramConfig.default;
            }
            else if (type != 'function') {
                defaultValue = paramConfig;
            }
        }
        type = isObject ? paramConfig.type : paramConfig;
        if (defaultValue !== undefined && type !== eval) {
            type = typeof defaultValue;
        }
        typeSerializer = componentParamTypeSerializerMap_1.componentParamTypeSerializerMap.get(type);
        if (!typeSerializer) {
            throw new TypeError('Unsupported parameter type');
        }
        $paramConfig.type = type;
        $paramConfig.typeSerializer = typeSerializer;
        $paramConfig.default = defaultValue;
    }
    var rawValue = component.element.getAttribute(name);
    if (rawValue === null) {
        if ($paramConfig.required) {
            throw new TypeError("Parameter \"" + name + "\" is required");
        }
        if (defaultValue != null && defaultValue !== false) {
            component.element.setAttribute(name, typeSerializer.write(defaultValue));
        }
    }
    component[BaseComponent_1.KEY_PARAMS].set(name, typeSerializer.read(rawValue, defaultValue));
}
exports.ComponentParams = {
    init: function (component) {
        if (component[exports.KEY_IS_COMPONENT_PARAMS_INITED]) {
            return;
        }
        var paramsConfig = component.constructor.params;
        if (paramsConfig) {
            var $paramsConfig = component.constructor[BaseComponent_1.KEY_PARAMS_CONFIG];
            for (var name_1 in paramsConfig) {
                initParam(component, $paramsConfig[name_1], name_1);
            }
        }
        component[exports.KEY_IS_COMPONENT_PARAMS_INITED] = true;
    }
};


/***/ }),
/* 8 */
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
var map_set_polyfill_1 = __webpack_require__(0);
var set_attribute_1 = __webpack_require__(46);
var cellx_1 = __webpack_require__(3);
var BaseComponent_1 = __webpack_require__(1);
var compileContentNodeValue_1 = __webpack_require__(47);
var componentConstructorMap_1 = __webpack_require__(16);
var ContentNodeValueParser_1 = __webpack_require__(28);
var compileKeypath_1 = __webpack_require__(17);
var FLAG_SKIP_ATTRIBUTES = String(1);
var FLAG_SKIP_CONTENT = String(2);
var FLAG_SKIP_ALL = String(+FLAG_SKIP_ATTRIBUTES | +FLAG_SKIP_CONTENT);
var KEY_SKIP_ATTRIBUTES = Symbol('skipAttributes');
var KEY_SKIP_CONTENT = Symbol('skipContent');
var contentNodeValueCache = Object.create(null);
function prepareContent(node) {
    _prepareContent(node, true);
    return node;
}
exports.prepareContent = prepareContent;
function _prepareContent(node, isRoot) {
    var containsBindingsOrComponents = false;
    for (var child = node.firstChild; child; child = child.nextSibling) {
        switch (child.nodeType) {
            case Node.ELEMENT_NODE: {
                var componentConstr = componentConstructorMap_1.componentConstructorMap.get(child.getAttribute('is') || child.tagName);
                var attrs = child.attributes;
                var skipAttributes = true;
                var skipContent = true;
                for (var i = attrs.length; i;) {
                    var value = attrs[--i].value;
                    if (!value) {
                        continue;
                    }
                    var contentNodeValue = contentNodeValueCache[value];
                    if (!contentNodeValue) {
                        if (contentNodeValue === null) {
                            continue;
                        }
                        var bracketIndex = value.indexOf('{');
                        if (bracketIndex == -1) {
                            contentNodeValueCache[value] = null;
                            continue;
                        }
                        contentNodeValue = contentNodeValueCache[value] = new ContentNodeValueParser_1.ContentNodeValueParser(value).parse(bracketIndex);
                    }
                    var contentNodeValueLength = contentNodeValue.length;
                    if (contentNodeValueLength > 1 ||
                        contentNodeValue[0].nodeType == ContentNodeValueParser_1.ContentNodeValueNodeType.BINDING) {
                        containsBindingsOrComponents = true;
                        skipAttributes = false;
                    }
                }
                if (child.firstChild || child instanceof HTMLTemplateElement) {
                    if (componentConstr &&
                        componentConstr.template !== null) {
                        containsBindingsOrComponents = true;
                        _prepareContent(child instanceof HTMLTemplateElement
                            ? child.content
                            : child, true);
                    }
                    else if (_prepareContent(child, false)) {
                        containsBindingsOrComponents = true;
                        skipContent = false;
                    }
                    else if (componentConstr) {
                        containsBindingsOrComponents = true;
                    }
                }
                else if (componentConstr) {
                    containsBindingsOrComponents = true;
                }
                if (isRoot) {
                    if (skipContent) {
                        child.setAttribute('_rn', skipAttributes ? FLAG_SKIP_ALL : FLAG_SKIP_CONTENT);
                    }
                }
                else {
                    child[KEY_SKIP_ATTRIBUTES] = skipAttributes;
                    child[KEY_SKIP_CONTENT] = skipContent;
                }
                break;
            }
            case Node.TEXT_NODE: {
                for (var nextChild = void 0; (nextChild = child.nextSibling) && nextChild.nodeType == Node.TEXT_NODE;) {
                    child.nodeValue += nextChild.nodeValue;
                    node.removeChild(nextChild);
                }
                var value = child.nodeValue;
                var contentNodeValue = contentNodeValueCache[value];
                if (!contentNodeValue) {
                    if (contentNodeValue === null) {
                        continue;
                    }
                    var bracketIndex = value.indexOf('{');
                    if (bracketIndex == -1) {
                        contentNodeValueCache[value] = null;
                        continue;
                    }
                    contentNodeValue = contentNodeValueCache[value] = new ContentNodeValueParser_1.ContentNodeValueParser(value).parse(bracketIndex);
                }
                if (contentNodeValue.length > 1 ||
                    contentNodeValue[0].nodeType == ContentNodeValueParser_1.ContentNodeValueNodeType.BINDING) {
                    containsBindingsOrComponents = true;
                }
                break;
            }
        }
    }
    if (!isRoot && containsBindingsOrComponents) {
        for (var child = node.firstElementChild; child; child = child.nextElementSibling) {
            if (child[KEY_SKIP_CONTENT]) {
                child.setAttribute('_rn', child[KEY_SKIP_ATTRIBUTES] ? FLAG_SKIP_ALL : FLAG_SKIP_CONTENT);
            }
        }
    }
    return containsBindingsOrComponents;
}
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
exports.AttributeBindingCell = AttributeBindingCell;
var TextNodeBindingCell = /** @class */ (function (_super) {
    __extends(TextNodeBindingCell, _super);
    function TextNodeBindingCell(pull, textNode, opts) {
        var _this = _super.call(this, pull, opts) || this;
        _this.textNode = textNode;
        return _this;
    }
    return TextNodeBindingCell;
}(cellx_1.Cell));
exports.TextNodeBindingCell = TextNodeBindingCell;
function onAttributeBindingCellChange(evt) {
    set_attribute_1.setAttribute(evt.target.element, evt.target.attributeName, evt.data.value);
}
function onTextNodeBindingCellChange(evt) {
    evt.target.textNode.nodeValue = evt.data.value;
}
function bindContent(node, ownerComponent, context, result) {
    for (var child = node.firstChild; child; child = child.nextSibling) {
        switch (child.nodeType) {
            case Node.ELEMENT_NODE: {
                var flags = child.getAttribute('_rn');
                var childComponent = child.$component;
                var $paramsConfig = void 0;
                var $specifiedParams = void 0;
                if (childComponent) {
                    $paramsConfig = childComponent.constructor[BaseComponent_1.KEY_PARAMS_CONFIG];
                    $specifiedParams = new map_set_polyfill_1.Set();
                }
                if (flags !== FLAG_SKIP_ALL) {
                    var attrs = child.attributes;
                    for (var i = attrs.length; i;) {
                        var attr = attrs[--i];
                        var name_1 = attr.name;
                        if (name_1.charAt(0) == '_') {
                            name_1 = name_1.slice(1);
                        }
                        var $paramConfig = $paramsConfig && $paramsConfig[name_1];
                        var paramName = void 0;
                        var paramConfig = void 0;
                        if ($paramConfig) {
                            paramName = $paramConfig.name;
                            paramConfig = $paramConfig.paramConfig;
                            $specifiedParams.add(paramName);
                        }
                        var value = attr.value;
                        if (!value) {
                            continue;
                        }
                        var contentNodeValue = contentNodeValueCache[value];
                        if (!contentNodeValue) {
                            if (contentNodeValue === null) {
                                continue;
                            }
                            var bracketIndex = value.indexOf('{');
                            if (bracketIndex == -1) {
                                contentNodeValueCache[value] = null;
                                continue;
                            }
                            contentNodeValue = contentNodeValueCache[value] = new ContentNodeValueParser_1.ContentNodeValueParser(value).parse(bracketIndex);
                        }
                        var contentNodeValueLength = contentNodeValue.length;
                        if (contentNodeValueLength > 1 ||
                            contentNodeValue[0].nodeType == ContentNodeValueParser_1.ContentNodeValueNodeType.BINDING) {
                            var prefix = contentNodeValueLength == 1
                                ? contentNodeValue[0].prefix
                                : null;
                            if (prefix !== '->') {
                                var cell = new AttributeBindingCell(compileContentNodeValue_1.compileContentNodeValue(contentNodeValue, value, contentNodeValueLength == 1), child, paramName || name_1, {
                                    context: context,
                                    onChange: onAttributeBindingCellChange
                                });
                                set_attribute_1.setAttribute(child, paramName || name_1, cell.get());
                                (result[0] || (result[0] = [])).push(cell);
                            }
                            if (paramConfig !== undefined &&
                                (prefix === '->' || prefix === '<->')) {
                                if (prefix == '->' && attr.name.charAt(0) != '_') {
                                    child.removeAttribute(paramName);
                                }
                                var keypath = contentNodeValue[0]
                                    .keypath;
                                var keys = keypath.split('.');
                                var handler = void 0;
                                if (keys.length == 1) {
                                    handler = (function (propertyName) {
                                        return function (evt) {
                                            this.ownerComponent[propertyName] = evt.data.value;
                                        };
                                    })(keys[0]);
                                }
                                else {
                                    handler = (function (propertyName, keys) {
                                        var getPropertyHolder = compileKeypath_1.compileKeypath(keys, keys.join('.'));
                                        return function (evt) {
                                            var propertyHolder = getPropertyHolder.call(this.ownerComponent);
                                            if (propertyHolder) {
                                                propertyHolder[propertyName] = evt.data.value;
                                            }
                                        };
                                    })(keys[keys.length - 1], keys.slice(0, -1));
                                }
                                (result[1] || (result[1] = [])).push([
                                    childComponent,
                                    (typeof paramConfig == 'object' &&
                                        (paramConfig.type !== undefined ||
                                            paramConfig.default !== undefined) &&
                                        paramConfig.property) ||
                                        paramName,
                                    handler
                                ]);
                            }
                        }
                    }
                }
                if (childComponent) {
                    childComponent._ownerComponent = ownerComponent;
                    childComponent.$context = context;
                    childComponent.$specifiedParams = $specifiedParams;
                    (result[2] || (result[2] = [])).push(childComponent);
                }
                if (flags !== FLAG_SKIP_CONTENT &&
                    flags !== FLAG_SKIP_ALL &&
                    child.firstChild &&
                    (!childComponent ||
                        childComponent.constructor.template === null)) {
                    bindContent(child, ownerComponent, context, result);
                }
                break;
            }
            case Node.TEXT_NODE: {
                var value = child.nodeValue;
                var contentNodeValue = contentNodeValueCache[value];
                if (!contentNodeValue) {
                    if (contentNodeValue === null) {
                        continue;
                    }
                    var bracketIndex = value.indexOf('{');
                    if (bracketIndex == -1) {
                        contentNodeValueCache[value] = null;
                        continue;
                    }
                    contentNodeValue = contentNodeValueCache[value] = new ContentNodeValueParser_1.ContentNodeValueParser(value).parse(bracketIndex);
                }
                if (contentNodeValue.length > 1 ||
                    contentNodeValue[0].nodeType == ContentNodeValueParser_1.ContentNodeValueNodeType.BINDING) {
                    var cell = new TextNodeBindingCell(compileContentNodeValue_1.compileContentNodeValue(contentNodeValue, value, false), child, {
                        context: context,
                        onChange: onTextNodeBindingCellChange
                    });
                    child.nodeValue = cell.get();
                    (result[0] || (result[0] = [])).push(cell);
                }
                break;
            }
        }
    }
    return result;
}
exports.bindContent = bindContent;


/***/ }),
/* 9 */
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
/* 10 */
/***/ (function(module, exports) {

module.exports = __WEBPACK_EXTERNAL_MODULE_10__;

/***/ }),
/* 11 */
/***/ (function(module, exports) {

module.exports = __WEBPACK_EXTERNAL_MODULE_11__;

/***/ }),
/* 12 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var escape_html_1 = __webpack_require__(20);
var self_closing_tags_1 = __webpack_require__(37);
var escape_string_1 = __webpack_require__(21);
var nelm_parser_1 = __webpack_require__(11);
var join = Array.prototype.join;
exports.ELEMENT_NAME_DELIMITER = '__';
var Template = /** @class */ (function () {
    function Template(nelm, opts) {
        var parent = (this.parent = (opts && opts.parent) || null);
        this.nelm = typeof nelm == 'string' ? new nelm_parser_1.Parser(nelm).parse() : nelm;
        var blockName = (opts && opts.blockName) || this.nelm.name;
        if (parent) {
            this._elementBlockNamesTemplate = [
                blockName ? blockName + exports.ELEMENT_NAME_DELIMITER : ''
            ].concat(parent._elementBlockNamesTemplate);
        }
        else if (blockName) {
            if (Array.isArray(blockName)) {
                this.setBlockName(blockName);
            }
            else {
                this._elementBlockNamesTemplate = [blockName + exports.ELEMENT_NAME_DELIMITER, ''];
            }
        }
        else {
            this._elementBlockNamesTemplate = ['', ''];
        }
        this.onBeforeNamedElementOpeningTagClosing =
            (opts && opts.onBeforeNamedElementOpeningTagClosing) || (function () { return ''; });
        this._tagNameMap = { __proto__: parent && parent._tagNameMap };
        this._attributeListMap = { __proto__: parent && parent._attributeListMap };
        this._attributeCountMap = { __proto__: parent && parent._attributeCountMap };
    }
    Template.prototype.extend = function (nelm, opts) {
        return new Template(nelm, { __proto__: opts || null, parent: this });
    };
    Template.prototype.setBlockName = function (blockName) {
        if (Array.isArray(blockName)) {
            (this._elementBlockNamesTemplate = blockName.map(function (blockName) { return blockName + exports.ELEMENT_NAME_DELIMITER; })).push('');
        }
        else {
            this._elementBlockNamesTemplate[0] = blockName + exports.ELEMENT_NAME_DELIMITER;
        }
        return this;
    };
    Template.prototype.render = function () {
        return (this._renderer || this._compileRenderers()).call({
            __proto__: this._elementRendererMap,
            '@': this,
            '@renderElementClasses': this._renderElementClasses,
            '@onBeforeNamedElementOpeningTagClosing': this.onBeforeNamedElementOpeningTagClosing
        });
    };
    Template.prototype._compileRenderers = function () {
        var parent = this.parent;
        this._elements = [
            (this._currentElement = {
                name: null,
                superCall: false,
                source: null,
                innerSource: []
            })
        ];
        var elMap = (this._elementMap = {});
        if (parent) {
            this._renderer = parent._renderer || parent._compileRenderers();
        }
        this._elementRendererMap = { __proto__: parent && parent._elementRendererMap };
        var content = this.nelm.content;
        var contentLength = content.length;
        if (contentLength) {
            for (var i = 0; i < contentLength; i++) {
                this._compileNode(content[i]);
            }
            Object.keys(elMap).forEach(function (name) {
                var el = elMap[name];
                this[name] = Function("return " + el.source.join(' + ') + ";");
                if (el.superCall) {
                    var inner_1 = Function('$super', "return " + el.innerSource.join(' + ') + ";");
                    var parentElementRendererMap_1 = parent && parent._elementRendererMap;
                    this[name + '/content'] = function () {
                        return inner_1.call(this, parentElementRendererMap_1);
                    };
                }
                else {
                    this[name + '/content'] = Function("return " + (el.innerSource.join(' + ') || "''") + ";");
                }
            }, this._elementRendererMap);
            if (!parent) {
                return (this._renderer = Function("return " + (this._currentElement.innerSource.join(' + ') || "''") + ";"));
            }
        }
        else if (!parent) {
            return (this._renderer = function () { return ''; });
        }
        return this._renderer;
    };
    Template.prototype._compileNode = function (node, parentElName) {
        switch (node.nodeType) {
            case nelm_parser_1.NodeType.ELEMENT: {
                var parent_1 = this.parent;
                var els = this._elements;
                var el = node;
                var tagName = el.tagName;
                var isHelper = el.isHelper;
                var elNames = el.names;
                var elName = elNames && elNames[0];
                var elAttrs = el.attributes;
                var content = el.content;
                if (elNames) {
                    if (elName) {
                        if (tagName) {
                            this._tagNameMap[elName] = tagName;
                        }
                        else {
                            // Не надо добавлять ` || 'div'`,
                            // тк. ниже tagName используется как имя хелпера.
                            tagName = parent_1 && parent_1._tagNameMap[elName];
                        }
                        var renderedAttrs = void 0;
                        if (elAttrs && (elAttrs.list.length || elAttrs.superCall)) {
                            var attrListMap = this._attributeListMap ||
                                (this._attributeListMap = {
                                    __proto__: (parent_1 && parent_1._attributeListMap) || null
                                });
                            var attrCountMap = this._attributeCountMap ||
                                (this._attributeCountMap = {
                                    __proto__: (parent_1 && parent_1._attributeCountMap) || null
                                });
                            var elAttrsSuperCall = elAttrs.superCall;
                            var attrList = void 0;
                            var attrCount = void 0;
                            if (elAttrsSuperCall) {
                                if (!parent_1) {
                                    throw new TypeError('Parent template is required when using super');
                                }
                                attrList = attrListMap[elName] = {
                                    __proto__: parent_1._attributeListMap[elAttrsSuperCall.elementName || elName] || null
                                };
                                attrCount = attrCountMap[elName] =
                                    parent_1._attributeCountMap[elAttrsSuperCall.elementName || elName] || 0;
                            }
                            else {
                                attrList = attrListMap[elName] = { __proto__: null };
                                attrCount = attrCountMap[elName] = 0;
                            }
                            for (var _i = 0, _a = elAttrs.list; _i < _a.length; _i++) {
                                var attr = _a[_i];
                                var name_1 = attr.name;
                                var value = attr.value;
                                var index = attrList[name_1];
                                attrList[index === undefined ? attrCount : index] = " " + name_1 + "=\"" + (value && escape_string_1.escapeString(escape_html_1.escapeHTML(value))) + "\"";
                                if (index === undefined) {
                                    attrList[name_1] = attrCount;
                                    attrCountMap[elName] = ++attrCount;
                                }
                            }
                            if (!isHelper) {
                                attrList = {
                                    __proto__: attrList,
                                    length: attrCount
                                };
                                if (attrList['class'] !== undefined) {
                                    attrList[attrList['class']] =
                                        " class=\"' + this['@renderElementClasses'].call(this['@'], ['" + elNames.join("','") + "']) + ' " +
                                            attrList[attrList['class']].slice(' class="'.length);
                                    renderedAttrs = join.call(attrList, '');
                                }
                                else {
                                    renderedAttrs =
                                        " class=\"' + this['@renderElementClasses'].call(this['@'], ['" + elNames.join("','") + "']) + '\"" + join.call(attrList, '');
                                }
                            }
                        }
                        else if (!isHelper) {
                            renderedAttrs = " class=\"' + this['@renderElementClasses'].call(this['@'], ['" + elNames.join("','") + "']) + '\"";
                        }
                        var currentEl = {
                            name: elName,
                            superCall: false,
                            source: isHelper
                                ? ["this['" + elName + "/content']()"]
                                : [
                                    "'<" + (tagName ||
                                        'div') + renderedAttrs + "' + this['@onBeforeNamedElementOpeningTagClosing'].call(null, ['" + elNames.join("','") + "']) + '>'",
                                    content && content.length
                                        ? "this['" + elName + "/content']() + '</" + (tagName ||
                                            'div') + ">'"
                                        : !content && tagName && self_closing_tags_1.map.has(tagName)
                                            ? "''"
                                            : "'</" + (tagName || 'div') + ">'"
                                ],
                            innerSource: []
                        };
                        els.push((this._currentElement = currentEl));
                        this._elementMap[elName] = currentEl;
                    }
                    else if (!isHelper) {
                        if (elAttrs && elAttrs.list.length) {
                            var hasClassAttr = false;
                            var attrs = '';
                            for (var _b = 0, _c = elAttrs.list; _b < _c.length; _b++) {
                                var attr = _c[_b];
                                var value = attr.value;
                                if (attr.name == 'class') {
                                    hasClassAttr = true;
                                    attrs += " class=\"' + this['@renderElementClasses'].call(this['@'], ['" + elNames
                                        .slice(1)
                                        .join("','") + "']) + '" + (value ? ' ' + escape_string_1.escapeString(escape_html_1.escapeHTML(value)) : '') + "\"";
                                }
                                else {
                                    attrs += " " + attr.name + "=\"" + (value &&
                                        escape_string_1.escapeString(escape_html_1.escapeHTML(value))) + "\"";
                                }
                            }
                            this._currentElement.innerSource.push("'<" + (tagName || 'div') + (hasClassAttr
                                ? attrs
                                : " class=\"' + this['@renderElementClasses'].call(this['@'], ['" + elNames
                                    .slice(1)
                                    .join("','") + "']) + '\"" + attrs) + "' + this['@onBeforeNamedElementOpeningTagClosing'].call(null, ['" + elNames
                                .slice(1)
                                .join("','") + "']) + '>'");
                        }
                        else {
                            this._currentElement.innerSource.push("'<" + (tagName ||
                                'div') + " class=\"' + this['@renderElementClasses'].call(this['@'], ['" + elNames
                                .slice(1)
                                .join("','") + "']) + '\"' + this['@onBeforeNamedElementOpeningTagClosing'].call(null, ['" + elNames
                                .slice(1)
                                .join("','") + "']) + '>'");
                        }
                    }
                }
                else if (!isHelper) {
                    this._currentElement.innerSource.push("'<" + (tagName || 'div') + (elAttrs
                        ? elAttrs.list
                            .map(function (attr) {
                            return " " + attr.name + "=\"" + (attr.value &&
                                escape_string_1.escapeString(escape_html_1.escapeHTML(attr.value))) + "\"";
                        })
                            .join('')
                        : '') + ">'");
                }
                if (isHelper) {
                    if (!tagName) {
                        throw new TypeError('"tagName" is required');
                    }
                    var helper = Template.helpers[tagName];
                    if (!helper) {
                        throw new TypeError("Helper \"" + tagName + "\" is not defined");
                    }
                    content = helper(el);
                }
                if (content) {
                    for (var _d = 0, content_1 = content; _d < content_1.length; _d++) {
                        var contentNode = content_1[_d];
                        this._compileNode(contentNode, elName || parentElName);
                    }
                }
                if (elName) {
                    els.pop();
                    this._currentElement = els[els.length - 1];
                    this._currentElement.innerSource.push("this['" + elName + "']()");
                }
                else if (!isHelper && (content || !tagName || !self_closing_tags_1.map.has(tagName))) {
                    this._currentElement.innerSource.push("'</" + (tagName || 'div') + ">'");
                }
                break;
            }
            case nelm_parser_1.NodeType.TEXT: {
                this._currentElement.innerSource.push("'" + (node.value && escape_string_1.escapeString(node.value)) + "'");
                break;
            }
            case nelm_parser_1.NodeType.SUPER_CALL: {
                this._currentElement.superCall = true;
                this._currentElement.innerSource.push("$super['" + (node.elementName ||
                    parentElName) + "/content'].call(this)");
                break;
            }
        }
    };
    Template.prototype._renderElementClasses = function (elNames) {
        var elClasses = '';
        for (var i = 0, l = elNames.length; i < l; i++) {
            elClasses += this._elementBlockNamesTemplate.join(elNames[i] + ' ');
        }
        return elClasses.slice(0, -1);
    };
    Template.helpers = {
        section: function (el) { return el.content; }
    };
    return Template;
}());
exports.Template = Template;


/***/ }),
/* 13 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var map_set_polyfill_1 = __webpack_require__(0);
exports.componentParamValueMap = new map_set_polyfill_1.Map();


/***/ }),
/* 14 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var namePattern_1 = __webpack_require__(15);
exports.keypathPattern = "(?:" + namePattern_1.namePattern + "|\\d+)(?:\\.(?:" + namePattern_1.namePattern + "|\\d+))*";


/***/ }),
/* 15 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
exports.namePattern = '[$_a-zA-Z][$\\w]*';


/***/ }),
/* 16 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var map_set_polyfill_1 = __webpack_require__(0);
exports.componentConstructorMap = new map_set_polyfill_1.Map();


/***/ }),
/* 17 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var keypathToJSExpression_1 = __webpack_require__(29);
var cache = Object.create(null);
function compileKeypath(keypath, cacheKey) {
    if (cacheKey === void 0) { cacheKey = keypath; }
    return (cache[cacheKey] ||
        (cache[cacheKey] = Function("var temp; return " + keypathToJSExpression_1.keypathToJSExpression(keypath, cacheKey) + ";")));
}
exports.compileKeypath = compileKeypath;


/***/ }),
/* 18 */
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
var next_tick_1 = __webpack_require__(31);
var cellx_1 = __webpack_require__(3);
var attachChildComponentElements_1 = __webpack_require__(6);
var BaseComponent_1 = __webpack_require__(1);
var bindContent_1 = __webpack_require__(8);
var Component_1 = __webpack_require__(4);
var ElementProtoMixin_1 = __webpack_require__(2);
var ElementProtoMixin_2 = __webpack_require__(2);
var compileKeypath_1 = __webpack_require__(17);
var Features_1 = __webpack_require__(9);
var keypathPattern_1 = __webpack_require__(14);
var removeNodes_1 = __webpack_require__(32);
var RnRepeat_1 = __webpack_require__(33);
var slice = Array.prototype.slice;
var reKeypath = RegExp("^" + keypathPattern_1.keypathPattern + "$");
var RnIfThen = /** @class */ (function (_super) {
    __extends(RnIfThen, _super);
    function RnIfThen() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this._elseMode = false;
        _this._nodes = null;
        _this._childComponents = null;
        _this._active = false;
        return _this;
    }
    RnIfThen_1 = RnIfThen;
    RnIfThen.prototype.elementConnected = function () {
        if (this._active) {
            return;
        }
        this._active = true;
        if (!this.initialized) {
            var if_ = this.paramIf.trim();
            if (!reKeypath.test(if_)) {
                throw new SyntaxError("Invalid value of attribute \"if\" (" + if_ + ")");
            }
            var getIfValue_1 = compileKeypath_1.compileKeypath(if_);
            this._if = new cellx_1.Cell(function () {
                return !!getIfValue_1.call(this);
            }, { context: this.$context });
            this.initialized = true;
        }
        this._if.on('change', this._onIfChange, this);
        this._render(false);
    };
    RnIfThen.prototype.elementDisconnected = function () {
        var _this = this;
        next_tick_1.nextTick(function () {
            if (!_this.element[ElementProtoMixin_2.KEY_IS_ELEMENT_CONNECTED]) {
                _this._deactivate();
            }
        });
    };
    RnIfThen.prototype._onIfChange = function () {
        if (this.element.parentNode) {
            this._render(true);
        }
    };
    RnIfThen.prototype._attach = function () {
        this._attached = true;
    };
    RnIfThen.prototype._detach = function () {
        this._attached = false;
    };
    RnIfThen.prototype._render = function (changed) {
        if (this._elseMode ? !this._if.get() : this._if.get()) {
            var content = document.importNode(this.element.content, true);
            if (!Features_1.templateTag) {
                var templates = content.querySelectorAll('template');
                for (var i = 0, l = templates.length; i < l;) {
                    i += templates[i].content.querySelectorAll('template').length + 1;
                }
            }
            var _a = bindContent_1.bindContent(content, this.ownerComponent, this.$context, { 0: null, 1: null, 2: null }), bindings = _a[0], backBindings = _a[1], childComponents = _a[2];
            this._nodes = slice.call(content.childNodes);
            this._bindings = bindings;
            this._childComponents = childComponents;
            ElementProtoMixin_1.suppressConnectionStatusCallbacks();
            this.element.parentNode.insertBefore(content, this.element);
            ElementProtoMixin_1.resumeConnectionStatusCallbacks();
            if (childComponents) {
                attachChildComponentElements_1.attachChildComponentElements(childComponents);
            }
            if (backBindings) {
                for (var i = backBindings.length; i;) {
                    var backBinding = backBindings[--i];
                    backBinding[0].on('change:' + backBinding[1], backBinding[2]);
                }
            }
        }
        else {
            var nodes = this._nodes;
            if (nodes) {
                removeNodes_1.removeNodes(nodes);
                this._destroyBindings();
                this._nodes = null;
                this._deactivateChildComponents();
            }
        }
        if (changed) {
            cellx_1.Cell.forceRelease();
            this.emit('change');
        }
    };
    RnIfThen.prototype._deactivate = function () {
        if (!this._active) {
            return;
        }
        this._active = false;
        this._if.off('change', this._onIfChange, this);
        var nodes = this._nodes;
        if (nodes) {
            removeNodes_1.removeNodes(nodes);
            this._destroyBindings();
            this._nodes = null;
            this._deactivateChildComponents();
        }
    };
    RnIfThen.prototype._deactivateChildComponents = function () {
        var childComponents = this._childComponents;
        if (childComponents) {
            for (var i = childComponents.length; i;) {
                var childComponent = childComponents[--i];
                if (childComponent instanceof RnIfThen_1 || childComponent instanceof RnRepeat_1.RnRepeat) {
                    childComponent._deactivate();
                }
            }
        }
        this._childComponents = null;
    };
    RnIfThen = RnIfThen_1 = __decorate([
        Component_1.Component({
            elementExtends: 'template',
            params: {
                if: { property: 'paramIf', type: String, required: true, readonly: true }
            },
            template: ''
        })
    ], RnIfThen);
    return RnIfThen;
    var RnIfThen_1;
}(BaseComponent_1.BaseComponent));
exports.RnIfThen = RnIfThen;


/***/ }),
/* 19 */
/***/ (function(module, exports) {

module.exports = __WEBPACK_EXTERNAL_MODULE_19__;

/***/ }),
/* 20 */
/***/ (function(module, exports) {

module.exports = __WEBPACK_EXTERNAL_MODULE_20__;

/***/ }),
/* 21 */
/***/ (function(module, exports) {

module.exports = __WEBPACK_EXTERNAL_MODULE_21__;

/***/ }),
/* 22 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var next_uid_1 = __webpack_require__(38);
var cellx_1 = __webpack_require__(3);
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
/* 23 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var gettext_1 = __webpack_require__(39);
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
    is: function (value) {
        return !!value;
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
    dump: function (value) {
        return JSON.stringify(value);
    }
};
exports.formatters.seq = exports.formatters.identical;


/***/ }),
/* 24 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var hyphenize_1 = __webpack_require__(25);
var mixin_1 = __webpack_require__(40);
var pascalize_1 = __webpack_require__(41);
var cellx_1 = __webpack_require__(3);
var BaseComponent_1 = __webpack_require__(1);
var componentConstructorMap_1 = __webpack_require__(16);
var ComponentParams_1 = __webpack_require__(7);
var elementConstructorMap_1 = __webpack_require__(30);
var ElementProtoMixin_1 = __webpack_require__(2);
var Template_1 = __webpack_require__(12);
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
    var elIs = componentConstr.hasOwnProperty('elementIs')
        ? componentConstr.elementIs
        : (componentConstr.elementIs = componentConstr.name);
    if (!elIs) {
        throw new TypeError('Static property "elementIs" is required');
    }
    var hyphenizedElIs = hyphenize_1.hyphenize(elIs, true);
    if (componentConstructorMap_1.componentConstructorMap.has(hyphenizedElIs)) {
        throw new TypeError("Component \"" + hyphenizedElIs + "\" already registered");
    }
    var componentProto = componentConstr.prototype;
    var parentComponentConstr = Object.getPrototypeOf(componentProto)
        .constructor;
    inheritProperty(componentConstr, parentComponentConstr, 'params', 0);
    var paramsConfig = componentConstr.params;
    if (paramsConfig) {
        var _loop_1 = function (name_1) {
            var paramConfig = paramsConfig[name_1];
            if (paramConfig === null) {
                var parentParamConfig = parentComponentConstr.params && parentComponentConstr.params[name_1];
                if (parentParamConfig != null) {
                    Object.defineProperty(componentProto, (typeof parentParamConfig == 'object' &&
                        (parentParamConfig.type !== undefined ||
                            parentParamConfig.default !== undefined) &&
                        parentParamConfig.property) ||
                        name_1, {
                        configurable: true,
                        enumerable: true,
                        writable: true,
                        value: null
                    });
                }
            }
            else {
                var isObject = typeof paramConfig == 'object' &&
                    (paramConfig.type !== undefined || paramConfig.default !== undefined);
                var propertyName_1 = (isObject && paramConfig.property) || name_1;
                var required = void 0;
                var readonly = void 0;
                if (isObject) {
                    required = paramConfig.required || false;
                    readonly = paramConfig.readonly || false;
                }
                else {
                    required = readonly = false;
                }
                var $paramConfig_1 = ((componentConstr.hasOwnProperty(BaseComponent_1.KEY_PARAMS_CONFIG)
                    ? componentConstr[BaseComponent_1.KEY_PARAMS_CONFIG]
                    : (componentConstr[BaseComponent_1.KEY_PARAMS_CONFIG] = Object.create(null)))[name_1] = componentConstr[BaseComponent_1.KEY_PARAMS_CONFIG][name_1.toLowerCase()] = {
                    name: name_1,
                    property: propertyName_1,
                    type: undefined,
                    typeSerializer: undefined,
                    default: undefined,
                    required: required,
                    readonly: readonly,
                    paramConfig: paramsConfig[name_1]
                });
                var descriptor = void 0;
                if (readonly) {
                    descriptor = {
                        configurable: true,
                        enumerable: true,
                        get: function () {
                            return this[BaseComponent_1.KEY_PARAMS].get(name_1);
                        },
                        set: function (value) {
                            if (this[ComponentParams_1.KEY_IS_COMPONENT_PARAMS_INITED]) {
                                if (value !== this[BaseComponent_1.KEY_PARAMS].get(name_1)) {
                                    throw new TypeError("Parameter \"" + name_1 + "\" is readonly");
                                }
                            }
                            else {
                                this[BaseComponent_1.KEY_PARAMS].set(name_1, value);
                            }
                        }
                    };
                }
                else {
                    Object.defineProperty(componentProto, propertyName_1 + 'Cell', {
                        configurable: true,
                        enumerable: false,
                        writable: true,
                        value: undefined
                    });
                    descriptor = {
                        configurable: true,
                        enumerable: true,
                        get: function () {
                            var valueCell = this[propertyName_1 + 'Cell'];
                            if (valueCell) {
                                return valueCell.get();
                            }
                            var currentlyPulling = cellx_1.Cell.currentlyPulling;
                            var value = this[BaseComponent_1.KEY_PARAMS].get(name_1);
                            if (currentlyPulling || cellx_1.EventEmitter.currentlySubscribing) {
                                valueCell = new cellx_1.Cell(value, { context: this });
                                Object.defineProperty(this, propertyName_1 + 'Cell', {
                                    configurable: true,
                                    enumerable: false,
                                    writable: true,
                                    value: valueCell
                                });
                                if (currentlyPulling) {
                                    return valueCell.get();
                                }
                            }
                            return value;
                        },
                        set: function (value) {
                            if (this[ComponentParams_1.KEY_IS_COMPONENT_PARAMS_INITED]) {
                                var rawValue = $paramConfig_1.typeSerializer.write(value, $paramConfig_1.default);
                                if (rawValue === null) {
                                    this.element.removeAttribute(name_1);
                                }
                                else {
                                    this.element.setAttribute(name_1, rawValue);
                                }
                                var valueCell = this[propertyName_1 + 'Cell'];
                                if (valueCell) {
                                    valueCell.set(value);
                                }
                                else {
                                    this[BaseComponent_1.KEY_PARAMS].set(name_1, value);
                                }
                            }
                            else {
                                this[BaseComponent_1.KEY_PARAMS].set(name_1, value);
                            }
                        }
                    };
                }
                Object.defineProperty(componentProto, propertyName_1, descriptor);
            }
        };
        for (var name_1 in paramsConfig) {
            _loop_1(name_1);
        }
    }
    inheritProperty(componentConstr, parentComponentConstr, 'i18n', 0);
    componentConstr._blockNamesString =
        elIs + ' ' + (parentComponentConstr._blockNamesString || '');
    componentConstr._elementBlockNames = [elIs];
    if (parentComponentConstr._elementBlockNames) {
        push.apply(componentConstr._elementBlockNames, parentComponentConstr._elementBlockNames);
    }
    var template = componentConstr.template;
    if (template !== null) {
        if (template === parentComponentConstr.template) {
            componentConstr.template = template.extend('', {
                blockName: elIs
            });
        }
        else if (template instanceof Template_1.Template) {
            template.setBlockName(componentConstr._elementBlockNames);
        }
        else {
            componentConstr.template = parentComponentConstr.template
                ? parentComponentConstr.template.extend(template, {
                    blockName: elIs
                })
                : new Template_1.Template(template, { blockName: componentConstr._elementBlockNames });
        }
    }
    componentConstr._rawContent = undefined;
    inheritProperty(componentConstr, parentComponentConstr, 'events', 1);
    inheritProperty(componentConstr, parentComponentConstr, 'domEvents', 1);
    if (template !== null) {
        var events_1 = componentConstr.events;
        var domEvents_1 = componentConstr.domEvents;
        if (events_1 || domEvents_1) {
            componentConstr.template.onBeforeNamedElementOpeningTagClosing = function (elNames) {
                var attrs = '';
                for (var _i = 0, elNames_1 = elNames; _i < elNames_1.length; _i++) {
                    var name_2 = elNames_1[_i];
                    if (events_1 && events_1[name_2]) {
                        for (var type in events_1[name_2]) {
                            attrs += " oncomponent-" + (type.charAt(0) == '<' ? type.slice(type.indexOf('>', 2) + 1) : type) + "=\"/" + name_2 + "\"";
                        }
                    }
                    if (domEvents_1 && domEvents_1[name_2]) {
                        for (var type in domEvents_1[name_2]) {
                            attrs += " on-" + type + "=\"/" + name_2 + "\"";
                        }
                    }
                }
                return attrs;
            };
        }
    }
    var elExtends = componentConstr.elementExtends;
    var parentElConstr;
    if (elExtends) {
        parentElConstr =
            elementConstructorMap_1.elementConstructorMap.get(elExtends) || window["HTML" + pascalize_1.pascalize(elExtends) + "Element"];
        if (!parentElConstr) {
            throw new TypeError("Component \"" + elExtends + "\" is not registered");
        }
    }
    else {
        parentElConstr = HTMLElement;
    }
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
            var attrs = [];
            for (var name_3 in paramsConfig) {
                attrs.push(name_3.toLowerCase());
            }
            return attrs;
        }
    });
    var elProto = (elConstr.prototype = Object.create(parentElConstr.prototype));
    elProto.constructor = elConstr;
    mixin_1.mixin(elProto, ElementProtoMixin_1.ElementProtoMixin);
    window.customElements.define(hyphenizedElIs, elConstr, elExtends ? { extends: elExtends } : undefined);
    componentConstructorMap_1.componentConstructorMap
        .set(elIs, componentConstr)
        .set(hyphenizedElIs, componentConstr)
        .set(hyphenizedElIs.toUpperCase(), componentConstr);
    elementConstructorMap_1.elementConstructorMap.set(elIs, elConstr);
    return componentConstr;
}
exports.registerComponent = registerComponent;


/***/ }),
/* 25 */
/***/ (function(module, exports) {

module.exports = __WEBPACK_EXTERNAL_MODULE_25__;

/***/ }),
/* 26 */
/***/ (function(module, exports) {

module.exports = __WEBPACK_EXTERNAL_MODULE_26__;

/***/ }),
/* 27 */
/***/ (function(module, exports) {

module.exports = __WEBPACK_EXTERNAL_MODULE_27__;

/***/ }),
/* 28 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var keypathPattern_1 = __webpack_require__(14);
var keypathToJSExpression_1 = __webpack_require__(29);
var namePattern_1 = __webpack_require__(15);
var ContentNodeValueNodeType;
(function (ContentNodeValueNodeType) {
    ContentNodeValueNodeType[ContentNodeValueNodeType["TEXT"] = 1] = "TEXT";
    ContentNodeValueNodeType[ContentNodeValueNodeType["BINDING"] = 2] = "BINDING";
    ContentNodeValueNodeType[ContentNodeValueNodeType["BINDING_KEYPATH"] = 3] = "BINDING_KEYPATH";
    ContentNodeValueNodeType[ContentNodeValueNodeType["BINDING_FORMATTER"] = 4] = "BINDING_FORMATTER";
    ContentNodeValueNodeType[ContentNodeValueNodeType["BINDING_FORMATTER_ARGUMENTS"] = 5] = "BINDING_FORMATTER_ARGUMENTS";
})(ContentNodeValueNodeType = exports.ContentNodeValueNodeType || (exports.ContentNodeValueNodeType = {}));
var reWhitespace = /\s/;
var reNameOrNothing = RegExp(namePattern_1.namePattern + '|', 'g');
var reKeypathOrNothing = RegExp(keypathPattern_1.keypathPattern + '|', 'g');
var reBooleanOrNothing = /false|true|/g;
var reNumberOrNothing = /(?:[+-]\s*)?(?:0b[01]+|0[0-7]+|0x[0-9a-fA-F]+|(?:(?:0|[1-9]\d*)(?:\.\d+)?|\.\d+)(?:[eE][+-]?\d+)?|Infinity|NaN)|/g;
var reVacuumOrNothing = /null|undefined|void 0|/g;
var ContentNodeValueParser = /** @class */ (function () {
    function ContentNodeValueParser(contentNodeValue) {
        this.contentNodeValue = contentNodeValue;
    }
    ContentNodeValueParser.prototype.parse = function (index) {
        var contentNodeValue = this.contentNodeValue;
        this.at = 0;
        var result = (this.result = []);
        do {
            this._pushText(contentNodeValue.slice(this.at, index));
            this.at = index;
            this.chr = contentNodeValue.charAt(index);
            var binding = this._readBinding();
            if (binding) {
                result.push(binding);
            }
            else {
                this._pushText(this.chr);
                this._next('{');
            }
            index = contentNodeValue.indexOf('{', this.at);
        } while (index != -1);
        this._pushText(contentNodeValue.slice(this.at));
        return result;
    };
    ContentNodeValueParser.prototype._pushText = function (value) {
        if (value) {
            var result = this.result;
            var resultLen = result.length;
            if (resultLen && result[resultLen - 1].nodeType == ContentNodeValueNodeType.TEXT) {
                result[resultLen - 1].value += value;
            }
            else {
                result.push({
                    nodeType: ContentNodeValueNodeType.TEXT,
                    value: value
                });
            }
        }
    };
    ContentNodeValueParser.prototype._readBinding = function () {
        var at = this.at;
        this._next('{');
        this._skipWhitespaces();
        var prefix = this._readPrefix();
        this._skipWhitespaces();
        var keypath = this._readKeypath();
        var value;
        if (!prefix && !keypath) {
            value = this._readValue();
        }
        if (keypath || value) {
            var formatters = void 0;
            for (var formatter = void 0; this._skipWhitespaces() == '|' && (formatter = this._readFormatter());) {
                (formatters || (formatters = [])).push(formatter);
            }
            if (this.chr == '}') {
                this._next();
                return {
                    nodeType: ContentNodeValueNodeType.BINDING,
                    prefix: prefix,
                    keypath: keypath,
                    value: value || null,
                    formatters: formatters || null,
                    raw: this.contentNodeValue.slice(at, this.at)
                };
            }
        }
        this.at = at;
        this.chr = this.contentNodeValue.charAt(at);
        return null;
    };
    ContentNodeValueParser.prototype._readPrefix = function () {
        if (this.chr == '<') {
            var at = this.at;
            if (this.contentNodeValue.charAt(at + 1) == '-') {
                if (this.contentNodeValue.charAt(at + 2) == '>') {
                    this.chr = this.contentNodeValue.charAt((this.at = at + 3));
                    return '<->';
                }
                this.chr = this.contentNodeValue.charAt((this.at = at + 2));
                return '<-';
            }
        }
        else if (this.chr == '-' && this.contentNodeValue.charAt(this.at + 1) == '>') {
            this.chr = this.contentNodeValue.charAt((this.at += 2));
            return '->';
        }
        return null;
    };
    ContentNodeValueParser.prototype._readFormatter = function () {
        var at = this.at;
        this._next('|');
        this._skipWhitespaces();
        var name = this._readName();
        if (name) {
            var args = this.chr == '(' ? this._readFormatterArguments() : null;
            return {
                nodeType: ContentNodeValueNodeType.BINDING_FORMATTER,
                name: name,
                arguments: args
            };
        }
        this.at = at;
        this.chr = this.contentNodeValue.charAt(at);
        return null;
    };
    ContentNodeValueParser.prototype._readFormatterArguments = function () {
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
                this.chr = this.contentNodeValue.charAt(at);
                return null;
            }
        }
        this._next();
        return {
            nodeType: ContentNodeValueNodeType.BINDING_FORMATTER_ARGUMENTS,
            value: args
        };
    };
    ContentNodeValueParser.prototype._readValue = function () {
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
    ContentNodeValueParser.prototype._readObject = function () {
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
            this.chr = this.contentNodeValue.charAt(at);
            return null;
        }
        this._next();
        return obj;
    };
    ContentNodeValueParser.prototype._readObjectKey = function () {
        return this._readName();
    };
    ContentNodeValueParser.prototype._readArray = function () {
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
                    this.chr = this.contentNodeValue.charAt(at);
                    return null;
                }
            }
        }
        this._next();
        return arr + ']';
    };
    ContentNodeValueParser.prototype._readBoolean = function () {
        reBooleanOrNothing.lastIndex = this.at;
        var bool = reBooleanOrNothing.exec(this.contentNodeValue)[0];
        if (bool) {
            this.chr = this.contentNodeValue.charAt((this.at = reBooleanOrNothing.lastIndex));
            return bool;
        }
        return null;
    };
    ContentNodeValueParser.prototype._readNumber = function () {
        reNumberOrNothing.lastIndex = this.at;
        var num = reNumberOrNothing.exec(this.contentNodeValue)[0];
        if (num) {
            this.chr = this.contentNodeValue.charAt((this.at = reNumberOrNothing.lastIndex));
            return num;
        }
        return null;
    };
    ContentNodeValueParser.prototype._readString = function () {
        var quoteChar = this.chr;
        if (quoteChar != "'" && quoteChar != '"') {
            throw {
                name: 'SyntaxError',
                message: "Expected \"'\" instead of \"" + this.chr + "\"",
                at: this.at,
                contentNodeValue: this.contentNodeValue
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
        this.chr = this.contentNodeValue.charAt(at);
        return null;
    };
    ContentNodeValueParser.prototype._readVacuum = function () {
        reVacuumOrNothing.lastIndex = this.at;
        var vacuum = reVacuumOrNothing.exec(this.contentNodeValue)[0];
        if (vacuum) {
            this.chr = this.contentNodeValue.charAt((this.at = reVacuumOrNothing.lastIndex));
            return vacuum;
        }
        return null;
    };
    ContentNodeValueParser.prototype._readKeypath = function (toJSExpression) {
        reKeypathOrNothing.lastIndex = this.at;
        var keypath = reKeypathOrNothing.exec(this.contentNodeValue)[0];
        if (keypath) {
            this.chr = this.contentNodeValue.charAt((this.at = reKeypathOrNothing.lastIndex));
            return toJSExpression ? keypathToJSExpression_1.keypathToJSExpression(keypath) : keypath;
        }
        return null;
    };
    ContentNodeValueParser.prototype._readName = function () {
        reNameOrNothing.lastIndex = this.at;
        var name = reNameOrNothing.exec(this.contentNodeValue)[0];
        if (name) {
            this.chr = this.contentNodeValue.charAt((this.at = reNameOrNothing.lastIndex));
            return name;
        }
        return null;
    };
    ContentNodeValueParser.prototype._skipWhitespaces = function () {
        var chr = this.chr;
        while (chr && reWhitespace.test(chr)) {
            chr = this._next();
        }
        return chr;
    };
    ContentNodeValueParser.prototype._next = function (current) {
        if (current && current != this.chr) {
            throw {
                name: 'SyntaxError',
                message: "Expected \"" + current + "\" instead of \"" + this.chr + "\"",
                at: this.at,
                contentNodeValue: this.contentNodeValue
            };
        }
        return (this.chr = this.contentNodeValue.charAt(++this.at));
    };
    return ContentNodeValueParser;
}());
exports.ContentNodeValueParser = ContentNodeValueParser;


/***/ }),
/* 29 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var cache = Object.create(null);
function keypathToJSExpression(keypath, cacheKey) {
    if (cacheKey === void 0) { cacheKey = keypath; }
    if (cache[cacheKey]) {
        return cache[cacheKey];
    }
    var keys = typeof keypath == 'string' ? keypath.split('.') : keypath;
    var keyCount = keys.length;
    if (keyCount == 1) {
        return (cache[cacheKey] = "this['" + keypath + "']");
    }
    var index = keyCount - 2;
    var jsExpr = Array(index);
    while (index) {
        jsExpr[--index] = " && (temp = temp['" + keys[index + 1] + "'])";
    }
    return (cache[cacheKey] = "(temp = this['" + keys[0] + "'])" + jsExpr.join('') + " && temp['" + keys[keyCount - 1] + "']");
}
exports.keypathToJSExpression = keypathToJSExpression;


/***/ }),
/* 30 */
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
/* 31 */
/***/ (function(module, exports) {

module.exports = __WEBPACK_EXTERNAL_MODULE_31__;

/***/ }),
/* 32 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
function removeNodes(nodes) {
    var nodeCount = nodes.length;
    if (nodeCount == 1) {
        var node = nodes[0];
        if (node.parentNode) {
            node.parentNode.removeChild(node);
        }
    }
    else {
        for (var i = 0; i < nodeCount; i++) {
            var node = nodes[i];
            if (node.parentNode) {
                node.parentNode.removeChild(node);
            }
        }
    }
}
exports.removeNodes = removeNodes;


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
var map_set_polyfill_1 = __webpack_require__(0);
var next_tick_1 = __webpack_require__(31);
var cellx_1 = __webpack_require__(3);
var attachChildComponentElements_1 = __webpack_require__(6);
var BaseComponent_1 = __webpack_require__(1);
var bindContent_1 = __webpack_require__(8);
var Component_1 = __webpack_require__(4);
var ElementProtoMixin_1 = __webpack_require__(2);
var ElementProtoMixin_2 = __webpack_require__(2);
var compileKeypath_1 = __webpack_require__(17);
var Features_1 = __webpack_require__(9);
var keypathPattern_1 = __webpack_require__(14);
var namePattern_1 = __webpack_require__(15);
var removeNodes_1 = __webpack_require__(32);
var RnIfThen_1 = __webpack_require__(18);
var slice = Array.prototype.slice;
var reForAttrValue = RegExp("^\\s*(" + namePattern_1.namePattern + ")\\s+(?:in|of)\\s+(" + keypathPattern_1.keypathPattern + ")\\s*$");
function getItem(list, index) {
    return Array.isArray(list) ? list[index] : list.get(index);
}
function insertNodes(nodes, lastNode) {
    var nodeCount = nodes.length;
    if (nodeCount == 1) {
        lastNode.parentNode.insertBefore(nodes[0], lastNode.nextSibling);
        return nodes[0];
    }
    var df = document.createDocumentFragment();
    for (var i = 0; i < nodeCount; i++) {
        df.appendChild(nodes[i]);
    }
    lastNode.parentNode.insertBefore(df, lastNode.nextSibling);
    return nodes[nodeCount - 1];
}
function offBindings(bindings) {
    if (bindings) {
        for (var i = bindings.length; i;) {
            bindings[--i].off();
        }
    }
}
function deactivateChildComponents(childComponents) {
    if (childComponents) {
        for (var i = childComponents.length; i;) {
            var childComponent = childComponents[--i];
            if (childComponent instanceof RnIfThen_1.RnIfThen || childComponent instanceof RnRepeat) {
                childComponent._deactivate();
            }
        }
    }
}
var RnRepeat = /** @class */ (function (_super) {
    __extends(RnRepeat, _super);
    function RnRepeat() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this._active = false;
        return _this;
    }
    RnRepeat.prototype.elementConnected = function () {
        if (this._active) {
            return;
        }
        this._active = true;
        if (!this.initialized) {
            var for_ = this.paramFor.match(reForAttrValue);
            if (!for_) {
                throw new SyntaxError("Invalid value of parameter \"for\" (" + this.paramFor + ")");
            }
            this._itemName = for_[1];
            this._prevList = [];
            this._list = new cellx_1.Cell(compileKeypath_1.compileKeypath(for_[2]), {
                context: this.$context
            });
            this._$itemMap = new map_set_polyfill_1.Map();
            this._trackBy = this.paramTrackBy;
            this._rawItemContent = document.importNode(this.element.content, true);
            this.initialized = true;
        }
        this._list.on('change', this._onListChange, this);
        this._render(false);
    };
    RnRepeat.prototype.elementDisconnected = function () {
        var _this = this;
        next_tick_1.nextTick(function () {
            if (!_this.element[ElementProtoMixin_2.KEY_IS_ELEMENT_CONNECTED]) {
                _this._deactivate();
            }
        });
    };
    RnRepeat.prototype._onListChange = function () {
        if (this.element.parentNode) {
            this._render(true);
        }
    };
    RnRepeat.prototype._attach = function () {
        this._attached = true;
    };
    RnRepeat.prototype._detach = function () {
        this._attached = false;
    };
    RnRepeat.prototype._render = function (fromChangeEvent) {
        var prevList = this._prevList;
        var prevListLength = prevList.length;
        var list = this._list.get();
        var $itemMap = this._$itemMap;
        var trackBy = this._trackBy;
        var startIndex = 0;
        var changed = false;
        if (list) {
            var lastNode = this.element;
            var removedValues_1 = new map_set_polyfill_1.Set();
            for (var i = 0, l = list.length; i < l;) {
                var item = getItem(list, i);
                var value = trackBy ? item[trackBy] : item;
                var $item = $itemMap.get(value);
                if ($item) {
                    if (removedValues_1.delete(value)) {
                        $item.item.set(item);
                        $item.index.set(i);
                        lastNode = insertNodes($item.nodes, lastNode);
                        i++;
                    }
                    else {
                        var foundIndex = void 0;
                        for (var j = startIndex;; j++) {
                            if (foundIndex === undefined) {
                                if (value === (trackBy ? prevList[j][trackBy] : prevList[j])) {
                                    if (j == startIndex) {
                                        lastNode = $item.nodes[$item.nodes.length - 1];
                                        startIndex++;
                                        i++;
                                        break;
                                    }
                                    foundIndex = j;
                                }
                            }
                            else {
                                var foundCount = j - foundIndex;
                                var ii = i + foundCount;
                                if (ii < l) {
                                    if (j < prevListLength && trackBy
                                        ? getItem(list, ii)[trackBy] === prevList[j][trackBy]
                                        : getItem(list, ii) === prevList[j]) {
                                        continue;
                                    }
                                    if (foundCount < foundIndex - startIndex) {
                                        for (var k = foundIndex; k < j; k++) {
                                            var k$Item = $itemMap.get(trackBy ? prevList[k][trackBy] : prevList[k]);
                                            k$Item.item.set(item);
                                            k$Item.index.set(i);
                                            lastNode = insertNodes(k$Item.nodes, lastNode);
                                        }
                                        prevList.splice(foundIndex, foundCount);
                                        prevListLength -= foundCount;
                                        changed = true;
                                        i = ii;
                                        break;
                                    }
                                }
                                for (var k = startIndex; k < foundIndex; k++) {
                                    var value_1 = trackBy ? prevList[k][trackBy] : prevList[k];
                                    removeNodes_1.removeNodes($itemMap.get(value_1).nodes);
                                    removedValues_1.add(value_1);
                                }
                                var nodes = $itemMap.get(trackBy ? prevList[j - 1][trackBy] : prevList[j - 1]).nodes;
                                lastNode = nodes[nodes.length - 1];
                                changed = true;
                                startIndex = j;
                                i = ii;
                                break;
                            }
                        }
                    }
                }
                else {
                    var itemCell = new cellx_1.Cell(item);
                    var indexCell = new cellx_1.Cell(i);
                    var content = this._rawItemContent.cloneNode(true);
                    if (!Features_1.templateTag) {
                        var templates = content.querySelectorAll('template');
                        for (var i_1 = 0, l_1 = templates.length; i_1 < l_1;) {
                            i_1 += templates[i_1].content.querySelectorAll('template').length + 1;
                        }
                    }
                    var context = this.$context;
                    var _a = bindContent_1.bindContent(content, this.ownerComponent, Object.create(context, (_b = {
                            '$/': {
                                configurable: false,
                                enumerable: false,
                                writable: false,
                                value: context['$/'] || context
                            }
                        },
                        _b[this._itemName] = {
                            configurable: true,
                            enumerable: true,
                            get: (function (itemCell) { return function () {
                                return itemCell.get();
                            }; })(itemCell)
                        },
                        _b.$index = {
                            configurable: true,
                            enumerable: true,
                            get: (function (indexCell) { return function () {
                                return indexCell.get();
                            }; })(indexCell)
                        },
                        _b)), { 0: null, 1: null, 2: null }), bindings = _a[0], backBindings = _a[1], childComponents = _a[2];
                    $itemMap.set(value, {
                        item: itemCell,
                        index: indexCell,
                        nodes: slice.call(content.childNodes),
                        bindings: bindings,
                        childComponents: childComponents
                    });
                    var newLastNode = content.lastChild;
                    ElementProtoMixin_1.suppressConnectionStatusCallbacks();
                    lastNode.parentNode.insertBefore(content, lastNode.nextSibling);
                    ElementProtoMixin_1.resumeConnectionStatusCallbacks();
                    lastNode = newLastNode;
                    if (childComponents) {
                        attachChildComponentElements_1.attachChildComponentElements(childComponents);
                    }
                    if (backBindings) {
                        for (var i_2 = backBindings.length; i_2;) {
                            var backBinding = backBindings[--i_2];
                            backBinding[0].on('change:' + backBinding[1], backBinding[2]);
                        }
                    }
                    changed = true;
                    i++;
                }
            }
            if (removedValues_1.size) {
                (function ($itemMap) {
                    removedValues_1.forEach(function (value) {
                        var bindings = $itemMap.get(value).bindings;
                        if (bindings) {
                            for (var i = bindings.length; i;) {
                                bindings[--i].off();
                            }
                        }
                        $itemMap.delete(value);
                    });
                })($itemMap);
            }
        }
        if (startIndex < prevListLength) {
            for (var i = startIndex; i < prevListLength; i++) {
                var value = trackBy ? prevList[i][trackBy] : prevList[i];
                var $item = $itemMap.get(value);
                removeNodes_1.removeNodes($item.nodes);
                offBindings($item.bindings);
                $itemMap.delete(value);
                deactivateChildComponents($item.childComponents);
            }
        }
        else if (!changed) {
            return;
        }
        this._prevList = Array.isArray(list) ? list.slice() : list.toArray();
        if (fromChangeEvent) {
            cellx_1.Cell.forceRelease();
            this.emit('change');
        }
        var _b;
    };
    RnRepeat.prototype._deactivate = function () {
        if (!this._active) {
            return;
        }
        this._active = false;
        this._list.off('change', this._onListChange, this);
        var prevList = this._prevList;
        var $itemMap = this._$itemMap;
        var trackBy = this._trackBy;
        for (var i = 0, l = prevList.length; i < l; i++) {
            var value = trackBy ? prevList[i][trackBy] : prevList[i];
            var $item = $itemMap.get(value);
            removeNodes_1.removeNodes($item.nodes);
            offBindings($item.bindings);
            $itemMap.delete(value);
            deactivateChildComponents($item.childComponents);
        }
    };
    RnRepeat = __decorate([
        Component_1.Component({
            elementExtends: 'template',
            params: {
                for: { property: 'paramFor', type: String, required: true, readonly: true },
                trackBy: { property: 'paramTrackBy', type: String, readonly: true }
            }
        })
    ], RnRepeat);
    return RnRepeat;
}(BaseComponent_1.BaseComponent));
exports.RnRepeat = RnRepeat;


/***/ }),
/* 34 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var di_1 = __webpack_require__(10);
var logger_1 = __webpack_require__(19);
__webpack_require__(35);
__webpack_require__(36);
var nelm_parser_1 = __webpack_require__(11);
exports.NelmNodeType = nelm_parser_1.NodeType;
exports.NelmParser = nelm_parser_1.Parser;
var Template_1 = __webpack_require__(12);
exports.Template = Template_1.Template;
var DisposableMixin_1 = __webpack_require__(22);
exports.DisposableMixin = DisposableMixin_1.DisposableMixin;
var formatters_1 = __webpack_require__(23);
exports.formatters = formatters_1.formatters;
var Component_1 = __webpack_require__(4);
exports.Component = Component_1.Component;
var Param_1 = __webpack_require__(54);
exports.Param = Param_1.Param;
var BaseComponent_1 = __webpack_require__(1);
exports.KEY_PARAMS_CONFIG = BaseComponent_1.KEY_PARAMS_CONFIG;
exports.KEY_PARAMS = BaseComponent_1.KEY_PARAMS;
exports.BaseComponent = BaseComponent_1.BaseComponent;
var ElementProtoMixin_1 = __webpack_require__(2);
exports.KEY_IS_ELEMENT_CONNECTED = ElementProtoMixin_1.KEY_IS_ELEMENT_CONNECTED;
var ComponentParams_1 = __webpack_require__(7);
exports.ComponentParams = ComponentParams_1.ComponentParams;
var componentParamValueMap_1 = __webpack_require__(13);
exports.componentParamValueMap = componentParamValueMap_1.componentParamValueMap;
var registerComponent_1 = __webpack_require__(24);
exports.registerComponent = registerComponent_1.registerComponent;
var RnIfThen_1 = __webpack_require__(18);
exports.RnIfThen = RnIfThen_1.RnIfThen;
var RnIfElse_1 = __webpack_require__(56);
exports.RnIfElse = RnIfElse_1.RnIfElse;
var RnRepeat_1 = __webpack_require__(33);
exports.RnRepeat = RnRepeat_1.RnRepeat;
var RnSlot_1 = __webpack_require__(57);
exports.RnSlot = RnSlot_1.RnSlot;
di_1.Container.registerService('logger', logger_1.logger);


/***/ }),
/* 35 */
/***/ (function(module, exports) {

if (!('firstElementChild' in DocumentFragment.prototype)) {
    Object.defineProperty(DocumentFragment.prototype, 'firstElementChild', {
        configurable: true,
        enumerable: false,
        get: function () {
            for (var child = this.firstChild; child; child = child.nextSibling) {
                if (child.nodeType == Node.ELEMENT_NODE) {
                    return child;
                }
            }
            return null;
        }
    });
}
if (!('nextElementSibling' in DocumentFragment.prototype)) {
    Object.defineProperty(DocumentFragment.prototype, 'nextElementSibling', {
        configurable: true,
        enumerable: false,
        get: function () {
            for (var child = this.nextSibling; child; child = child.nextSibling) {
                if (child.nodeType == Node.ELEMENT_NODE) {
                    return child;
                }
            }
            return null;
        }
    });
}


/***/ }),
/* 36 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var nelm_parser_1 = __webpack_require__(11);
var Template_1 = __webpack_require__(12);
['if-then', 'if-else', 'repeat'].forEach(function (name) {
    Template_1.Template.helpers[name] = function (el) {
        var attrs = el.attributes;
        if (name != 'repeat') {
            var list = attrs.list;
            var index = list.length - 1;
            var foundIndex = void 0;
            for (; index >= 0; index--) {
                if (list[index].value == '') {
                    foundIndex = index;
                }
                else if (list[index].name == 'if') {
                    break;
                }
            }
            if (index == -1 && foundIndex !== undefined) {
                list[foundIndex] = {
                    name: 'if',
                    value: list[foundIndex].name
                };
            }
        }
        attrs = {
            superCall: attrs && attrs.superCall,
            list: attrs ? attrs.list.slice() : []
        };
        attrs.list.push({
            name: 'is',
            value: 'rn-' + name
        });
        return [
            {
                nodeType: nelm_parser_1.NodeType.ELEMENT,
                isHelper: false,
                tagName: 'template',
                names: el.names && el.names[0] ? ['$' + el.names[0]].concat(el.names) : null,
                attributes: attrs,
                content: el.content
            }
        ];
    };
});


/***/ }),
/* 37 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var map_set_polyfill_1 = __webpack_require__(0);
exports.list = [
    'area',
    'base',
    'basefont',
    'br',
    'col',
    'command',
    'embed',
    'frame',
    'hr',
    'img',
    'input',
    'isindex',
    'keygen',
    'link',
    'meta',
    'param',
    'source',
    'track',
    'wbr',
    // svg tags
    'circle',
    'ellipse',
    'line',
    'path',
    'polygone',
    'polyline',
    'rect',
    'stop',
    'use'
];
exports.map = exports.list.reduce(function (map, name) { return map.set(name, true); }, new map_set_polyfill_1.Map());


/***/ }),
/* 38 */
/***/ (function(module, exports) {

module.exports = __WEBPACK_EXTERNAL_MODULE_38__;

/***/ }),
/* 39 */
/***/ (function(module, exports) {

module.exports = __WEBPACK_EXTERNAL_MODULE_39__;

/***/ }),
/* 40 */
/***/ (function(module, exports) {

module.exports = __WEBPACK_EXTERNAL_MODULE_40__;

/***/ }),
/* 41 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var camelize_1 = __webpack_require__(42);
var cache = Object.create(null);
function pascalize(str, useCache) {
    str = String(str);
    var value;
    return ((useCache && cache[str]) ||
        ((value = camelize_1.camelize(str)),
            (value = value.charAt(0).toUpperCase() + value.slice(1)),
            useCache ? (cache[str] = value) : value));
}
exports.pascalize = pascalize;


/***/ }),
/* 42 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var reHyphen = /[-_]+([a-z])/g;
var cache = Object.create(null);
function camelize(str, useCache) {
    str = String(str);
    var value;
    return ((useCache && cache[str]) ||
        ((value = str.replace(reHyphen, function (match, chr) { return chr.toUpperCase(); })),
            useCache ? (cache[str] = value) : value));
}
exports.camelize = camelize;


/***/ }),
/* 43 */
/***/ (function(module, exports) {

module.exports = __WEBPACK_EXTERNAL_MODULE_43__;

/***/ }),
/* 44 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var escape_html_1 = __webpack_require__(20);
var is_regexp_1 = __webpack_require__(45);
var map_set_polyfill_1 = __webpack_require__(0);
var componentParamValueMap_1 = __webpack_require__(13);
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
                return value != null ? +value + '' : null;
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
                return value != null ? value + '' : null;
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
var escape_string_1 = __webpack_require__(21);
var bindingToJSExpression_1 = __webpack_require__(48);
var componentParamValueMap_1 = __webpack_require__(13);
var ContentNodeValueParser_1 = __webpack_require__(28);
var formatters_1 = __webpack_require__(23);
var valueMapKeyCounter = 0;
var cache = Object.create(null);
function compileContentNodeValue(contentNodeValue, contentNodeValueString, useValueMap) {
    var cacheKey = contentNodeValueString + (useValueMap ? ',' : '.');
    if (cache[cacheKey]) {
        return cache[cacheKey];
    }
    var inner;
    if (contentNodeValue.length == 1) {
        inner = Function('formatters', "var temp; return " + (contentNodeValue[0].nodeType == ContentNodeValueParser_1.ContentNodeValueNodeType.TEXT
            ? "'" + escape_string_1.escapeString(contentNodeValue[0].value) + "'"
            : bindingToJSExpression_1.bindingToJSExpression(contentNodeValue[0])) + ";");
    }
    else {
        var jsExpr = [];
        for (var _i = 0, contentNodeValue_1 = contentNodeValue; _i < contentNodeValue_1.length; _i++) {
            var node = contentNodeValue_1[_i];
            jsExpr.push(node.nodeType == ContentNodeValueParser_1.ContentNodeValueNodeType.TEXT
                ? "'" + escape_string_1.escapeString(node.value) + "'"
                : bindingToJSExpression_1.bindingToJSExpression(node));
        }
        inner = Function('formatters', "var temp; return [" + jsExpr.join(', ') + "].join('');");
    }
    return (cache[cacheKey] = useValueMap
        ? function (cell, next) {
            var value = inner.call(this, formatters_1.formatters);
            if (value) {
                if (value === cell.prevValue) {
                    return next;
                }
                var valueType = typeof value;
                if (valueType == 'object' || valueType == 'function') {
                    var key = ++valueMapKeyCounter + '';
                    componentParamValueMap_1.componentParamValueMap.set(key, value);
                    cell.prevValue = value;
                    return key;
                }
            }
            return value;
        }
        : function () {
            var value = inner.call(this, formatters_1.formatters);
            return value == null ? '' : value + '';
        });
}
exports.compileContentNodeValue = compileContentNodeValue;


/***/ }),
/* 48 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
function formattersReducer(jsExpr, formatter) {
    var args = formatter.arguments;
    return "(this." + formatter.name + " || formatters." + formatter.name + ").call(this['$/'], " + jsExpr + (args && args.value.length ? ', ' + args.value.join(', ') : '') + ")";
}
function bindingToJSExpression(binding) {
    var formatters = binding.formatters;
    if (binding.keypath) {
        var keys = binding.keypath.split('.');
        var keyCount = keys.length;
        if (keyCount == 1) {
            return formatters
                ? formatters.reduce(formattersReducer, "this['" + keys[0] + "']")
                : "this['" + keys[0] + "']";
        }
        var index = keyCount - 2;
        var jsExprArr = Array(index);
        while (index) {
            jsExprArr[--index] = " && (temp = temp['" + keys[index + 1] + "'])";
        }
        var jsExpr = "(temp = this['" + keys[0] + "'])" + jsExprArr.join('') + " && temp['" + keys[keyCount - 1] + "']";
        return formatters ? formatters.reduce(formattersReducer, jsExpr) : jsExpr;
    }
    return formatters ? formatters.reduce(formattersReducer, binding.value) : binding.value;
}
exports.bindingToJSExpression = bindingToJSExpression;


/***/ }),
/* 49 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var cellx_1 = __webpack_require__(3);
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
/* 50 */
/***/ (function(module, exports) {

module.exports = __WEBPACK_EXTERNAL_MODULE_50__;

/***/ }),
/* 51 */
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
/* 52 */
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
/* 53 */
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
    var targetEl = target.element;
    if (!targetEl.parentNode) {
        return;
    }
    ownerComponentStack.length = 0;
    var attrName = 'oncomponent-' + evt.type;
    var el = targetEl;
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
                    var receiver = receivers[i];
                    var attrValue = receiver.getAttribute(attrName);
                    var handler = void 0;
                    if (attrValue.charAt(0) == '/') {
                        if (receiver != targetEl) {
                            var elementBlockNames = target.constructor
                                ._elementBlockNames;
                            for (var j = 0, m = elementBlockNames.length; j < m; j++) {
                                var typedHandler = ownerComponent.constructor
                                    .events[attrValue.slice(1)]["<" + elementBlockNames[j] + ">" + evt.type];
                                if (typedHandler) {
                                    if (typedHandler &&
                                        typedHandler.call(ownerComponent, evt, receiver) === false) {
                                        return;
                                    }
                                    break;
                                }
                            }
                        }
                        handler = ownerComponent.constructor.events[attrValue.slice(1)][(receiver == targetEl ? '' : '<*>') + evt.type];
                    }
                    else {
                        handler = ownerComponent[attrValue];
                    }
                    if (handler && handler.call(ownerComponent, evt, receiver) === false) {
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
/* 54 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var lower_case_first_word_1 = __webpack_require__(55);
var map_set_polyfill_1 = __webpack_require__(0);
var types = new map_set_polyfill_1.Set([Boolean, Number, String, Object]);
var prefix = 'param';
var prefixLength = prefix.length;
function Param(target, propertyName, propertyDesc, name, config) {
    if (typeof propertyName != 'string') {
        if (target && typeof target != 'string') {
            config = target;
        }
        else {
            name = target;
            config = propertyName;
        }
        return function (target, propertyName, propertyDesc) {
            return Param(target, propertyName, propertyDesc, name, config);
        };
    }
    if (!config) {
        config = {};
    }
    else if (typeof config == 'function') {
        config = { type: config };
    }
    config.property = propertyName;
    if (!config.type) {
        var type = Reflect.getMetadata('design:type', target, propertyName);
        config.type = types.has(type) ? type : Object;
    }
    var constr = target.constructor;
    ((constr.hasOwnProperty('params') && constr.params) || (constr.params = {}))[(name ||
        (propertyName.length <= prefixLength || propertyName.lastIndexOf(prefix, 0)
            ? propertyName
            : lower_case_first_word_1.lowerCaseFirstWord(propertyName.slice(5))))] = config;
}
exports.Param = Param;


/***/ }),
/* 55 */
/***/ (function(module, exports) {

module.exports = __WEBPACK_EXTERNAL_MODULE_55__;

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
var Component_1 = __webpack_require__(4);
var RnIfThen_1 = __webpack_require__(18);
var RnIfElse = /** @class */ (function (_super) {
    __extends(RnIfElse, _super);
    function RnIfElse() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this._elseMode = true;
        return _this;
    }
    RnIfElse = __decorate([
        Component_1.Component({
            elementExtends: 'template'
        })
    ], RnIfElse);
    return RnIfElse;
}(RnIfThen_1.RnIfThen));
exports.RnIfElse = RnIfElse;


/***/ }),
/* 57 */
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
var clear_node_1 = __webpack_require__(58);
var get_uid_1 = __webpack_require__(26);
var map_set_polyfill_1 = __webpack_require__(0);
var move_content_1 = __webpack_require__(27);
var symbol_polyfill_1 = __webpack_require__(5);
var attachChildComponentElements_1 = __webpack_require__(6);
var BaseComponent_1 = __webpack_require__(1);
var bindContent_1 = __webpack_require__(8);
var Component_1 = __webpack_require__(4);
var ElementProtoMixin_1 = __webpack_require__(2);
var KEY_SLOT_CONTENT_MAP = symbol_polyfill_1.Symbol('Rionite.RnSlot.slotContentMap');
var RnSlot = /** @class */ (function (_super) {
    __extends(RnSlot, _super);
    function RnSlot() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    RnSlot.prototype._attach = function () {
        this._attached = true;
        if (this.isReady) {
            this._unfreezeBindings();
        }
        else {
            var ownerComponent = this.ownerComponent;
            var el = this.element;
            var contentOwnerComponent = ownerComponent.ownerComponent;
            var ownerComponentContent = ownerComponent.$content;
            var cloneContent = this.paramCloneContent;
            var content = void 0;
            var bindings = void 0;
            var backBindings = void 0;
            var childComponents = void 0;
            if (!cloneContent || ownerComponentContent.firstChild) {
                var slotName = this.paramName;
                var forTag = void 0;
                var for_ = void 0;
                if (!slotName) {
                    forTag = this.paramForTag;
                    if (forTag) {
                        forTag = forTag.toUpperCase();
                    }
                    else {
                        for_ = this.paramFor;
                    }
                }
                var key = get_uid_1.getUID(ownerComponent) +
                    '/' +
                    (slotName ? '@' + slotName : forTag ? ':' + forTag : for_ || '');
                if (slotName || forTag || for_) {
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
                    else if (ownerComponentContent.firstElementChild) {
                        if (for_ && for_.indexOf('__') == -1) {
                            var elementBlockNames = ownerComponent.constructor
                                ._elementBlockNames;
                            for_ = elementBlockNames[elementBlockNames.length - 1] + '__' + for_;
                        }
                        var selectedElements = ownerComponentContent.querySelectorAll(slotName ? "[slot=" + slotName + "]" : forTag || '.' + for_);
                        var selectedElementCount = selectedElements.length;
                        if (selectedElementCount) {
                            content = document.createDocumentFragment();
                            for (var i = 0; i < selectedElementCount; i++) {
                                content.appendChild(cloneContent
                                    ? selectedElements[i].cloneNode(true)
                                    : selectedElements[i]);
                            }
                        }
                        if (!cloneContent) {
                            (contentMap ||
                                contentOwnerComponent[KEY_SLOT_CONTENT_MAP] ||
                                (contentOwnerComponent[KEY_SLOT_CONTENT_MAP] = new map_set_polyfill_1.Map())).set(key, el);
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
                        (contentMap || (contentOwnerComponent[KEY_SLOT_CONTENT_MAP] = new map_set_polyfill_1.Map())).set(key, el);
                    }
                }
                else {
                    content = ownerComponentContent.cloneNode(true);
                }
            }
            if (bindings === undefined) {
                if (content || el.firstChild) {
                    _a = content
                        ? bindContent_1.bindContent(content, contentOwnerComponent, this.paramGetContext
                            ? this.paramGetContext.call(ownerComponent, ownerComponent.$context, this)
                            : ownerComponent.$context, { 0: null, 1: null, 2: null })
                        : bindContent_1.bindContent(el, ownerComponent, this.paramGetContext
                            ? this.paramGetContext.call(ownerComponent, this.$context, this)
                            : this.$context, { 0: null, 1: null, 2: null }), this._bindings = _a[0], backBindings = _a[1], childComponents = _a[2];
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
            if (backBindings) {
                for (var i = backBindings.length; i;) {
                    var backBinding = backBindings[--i];
                    backBinding[0].on('change:' + backBinding[1], backBinding[2]);
                }
            }
            this.isReady = true;
        }
        var _a;
    };
    RnSlot.prototype._detach = function () {
        this._attached = false;
        this._freezeBindings();
    };
    RnSlot = __decorate([
        Component_1.Component({
            params: {
                name: { property: 'paramName', type: String, readonly: true },
                forTag: { property: 'paramForTag', type: String, readonly: true },
                for: { property: 'paramFor', type: String, readonly: true },
                cloneContent: { property: 'paramCloneContent', default: false, readonly: true },
                getContext: { property: 'paramGetContext', type: Object, readonly: true }
            },
            template: ''
        })
    ], RnSlot);
    return RnSlot;
}(BaseComponent_1.BaseComponent));
exports.RnSlot = RnSlot;


/***/ }),
/* 58 */
/***/ (function(module, exports) {

module.exports = __WEBPACK_EXTERNAL_MODULE_58__;

/***/ })
/******/ ]);
});