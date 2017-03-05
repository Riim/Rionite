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
var cellx_1 = require("cellx");
var html_to_fragment_1 = require("html-to-fragment");
var DisposableMixin_1 = require("./DisposableMixin");
var elementConstructorMap_1 = require("./elementConstructorMap");
var registerComponent_1 = require("./registerComponent");
var ElementProtoMixin_1 = require("./ElementProtoMixin");
var ComponentProperties_1 = require("./ComponentProperties");
var initElementAttributes_1 = require("./initElementAttributes");
var bindContent_1 = require("./bindContent");
var componentBinding_1 = require("./componentBinding");
var attachChildComponentElements_1 = require("./attachChildComponentElements");
var bindEvents_1 = require("./bindEvents");
var eventTypes_1 = require("./eventTypes");
var onEvent_1 = require("./onEvent");
var camelize_1 = require("./Utils/camelize");
var getUID_1 = require("./Utils/getUID");
var Features_1 = require("./Features");
var Map = cellx_1.JS.Map;
var createClass = cellx_1.Utils.createClass;
var map = Array.prototype.map;
function findChildComponentElements(node, ownerComponent, context, _childComponents) {
    for (var child = node.firstChild; child; child = child.nextSibling) {
        if (child.nodeType == 1) {
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
