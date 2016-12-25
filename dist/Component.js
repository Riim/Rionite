"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var cellx_1 = require("cellx");
var DisposableMixin_1 = require("./DisposableMixin");
var registerComponent_1 = require("./registerComponent");
var ElementAttributes_1 = require("./ElementAttributes");
var initElementClasses_1 = require("./initElementClasses");
var initElementAttributes_1 = require("./initElementAttributes");
var bindContent_1 = require("./bindContent");
var componentBinding_1 = require("./componentBinding");
var attachChildComponentElements_1 = require("./attachChildComponentElements");
var bindEvents_1 = require("./bindEvents");
var eventTypes_1 = require("./eventTypes");
var onEvent_1 = require("./onEvent");
var camelize_1 = require("./Utils/camelize");
var getUID_1 = require("./Utils/getUID");
var htmlToFragment_1 = require("./Utils/htmlToFragment");
var Features_1 = require("./Features");
var Map = cellx_1.JS.Map;
var createClass = cellx_1.Utils.createClass;
var map = Array.prototype.map;
var created;
var initialize;
var ready;
var elementAttached;
var elementDetached;
var elementMoved;
var elementAttributeChanged;
var Component = (function (_super) {
    __extends(Component, _super);
    function Component(el, props) {
        var _this = _super.call(this) || this;
        _this.ownerComponent = null;
        _this._parentComponent = null;
        _this.isElementAttached = false;
        _this.initialized = false;
        _this.isReady = false;
        DisposableMixin_1.default.call(_this);
        var constr = _this.constructor;
        if (constr._registeredComponent !== constr) {
            throw new TypeError('Component must be registered');
        }
        if (el == null) {
            el = document.createElement(constr.elementIs);
        }
        else if (typeof el == 'string') {
            var elIs = constr.elementIs;
            var html = el;
            el = document.createElement(elIs);
            el.innerHTML = html;
            var firstChild = el.firstChild;
            if (firstChild && firstChild == el.lastChild && firstChild.nodeType == 1 && (firstChild.tagName.toLowerCase() == elIs ||
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
    Object.defineProperty(Component.prototype, "elementAttributes", {
        get: function () {
            var attrs = new ElementAttributes_1.default(this.element);
            Object.defineProperty(this, 'elementAttributes', {
                configurable: true,
                enumerable: true,
                writable: true,
                value: attrs
            });
            return attrs;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Component.prototype, "props", {
        get: function () {
            var props = Object.create(this.elementAttributes);
            props._content = null;
            props.context = null;
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
        var silent = this._isComponentSilent;
        if (silent === undefined) {
            silent = this._isComponentSilent = this.element.hasAttribute('rt-silent');
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
    Component.prototype._attachElement = function () {
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
            initElementClasses_1.default(el, constr);
            initElementAttributes_1.default(this, constr);
            var template = constr.template;
            if (template == null) {
                if (constr.events) {
                    bindEvents_1.default(this, constr.events);
                }
            }
            else {
                var inputContent = this.props._content = document.createDocumentFragment();
                for (var child = void 0; (child = el.firstChild);) {
                    inputContent.appendChild(child);
                }
                var rawContent = constr._rawContent;
                if (!rawContent) {
                    rawContent = constr._rawContent = htmlToFragment_1.default(typeof template == 'string' ? template : template.render(constr));
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
                this.ready();
                this.isReady = true;
            }
        }
        this.elementAttached();
    };
    Component.prototype._detachElement = function () {
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
    // Callbacks
    Component.prototype.created = function () { };
    Component.prototype.initialize = function () { };
    Component.prototype.ready = function () { };
    Component.prototype.elementAttached = function () { };
    Component.prototype.elementDetached = function () { };
    Component.prototype.elementMoved = function () { };
    Component.prototype.elementAttributeChanged = function (name, oldValue, value) { };
    // Utils
    Component.prototype.$ = function (name, container) {
        var assetList = this._getAssetList(name, container);
        return assetList && assetList.length ? assetList[0].$c || assetList[0] : null;
    };
    Component.prototype.$$ = function (name, container) {
        var assetList = this._getAssetList(name, container);
        return assetList ? map.call(assetList, function (el) { return el.$c || el; }) : [];
    };
    Component.prototype._getAssetList = function (name, container) {
        var assets = this._assets || (this._assets = new Map());
        var containerEl = container ?
            (container instanceof Component ? container.element : container) :
            this.element;
        var key = container ? getUID_1.default(containerEl) + '/' + name : name;
        var assetList = assets.get(key);
        if (!assetList) {
            var constr = this.constructor;
            var className = constr._assetClassNames[name];
            if (className) {
                assetList = containerEl.getElementsByClassName(className);
                assets.set(key, assetList);
            }
            else {
                var markupBlockNames = constr._markupBlockNames;
                if (!markupBlockNames) {
                    throw new TypeError('Component must have a template');
                }
                for (var i = markupBlockNames.length; i;) {
                    className = markupBlockNames[--i] + '__' + name;
                    assetList = containerEl.getElementsByClassName(className);
                    if (assetList.length) {
                        constr._assetClassNames[name] = className;
                        assets.set(key, assetList);
                        break;
                    }
                }
                if (!assetList.length) {
                    return;
                }
            }
        }
        return assetList;
    };
    return Component;
}(cellx_1.EventEmitter));
Component.register = registerComponent_1.default;
Object.defineProperty(exports, "__esModule", { value: true });
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
elementAttached = ComponentProto.elementAttached;
elementDetached = ComponentProto.elementDetached;
elementMoved = ComponentProto.elementMoved;
elementAttributeChanged = ComponentProto.elementAttributeChanged;
document.addEventListener('DOMContentLoaded', function onDOMContentLoaded() {
    document.removeEventListener('DOMContentLoaded', onDOMContentLoaded);
    eventTypes_1.default.forEach(function (type) {
        document.addEventListener(type, onEvent_1.default);
    });
});
