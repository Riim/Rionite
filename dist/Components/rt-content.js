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
var cellx_1 = require("cellx");
var Component_1 = require("../Component");
var ElementProtoMixin_1 = require("../ElementProtoMixin");
var bindContent_1 = require("../bindContent");
var attachChildComponentElements_1 = require("../attachChildComponentElements");
var getUID_1 = require("../Utils/getUID");
var moveContent_1 = require("../Utils/moveContent");
var clearNode_1 = require("../Utils/clearNode");
var Features_1 = require("../Features");
var d_1 = require("../d");
var Map = cellx_1.JS.Map;
var KEY_CONTENT_MAP = cellx_1.JS.Symbol('contentMap');
var KEY_TEMPLATES_FIXED = cellx_1.JS.Symbol('Rionite.RtContent#templatesFixed');
var RtContent = (function (_super) {
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
            var props = this.props;
            var contentOwnerComponent = ownerComponent.ownerComponent;
            var ownerComponentContent = ownerComponent.props.content;
            var clone = props.clone;
            var content = void 0;
            var bindings = void 0;
            var childComponents = void 0;
            if (!clone || ownerComponentContent.firstChild) {
                var selector = props.select;
                var key = getUID_1.default(ownerComponent) + '/' + (selector || '');
                if (selector) {
                    var contentMap = void 0;
                    if (!clone &&
                        contentOwnerComponent &&
                        (contentMap = contentOwnerComponent[KEY_CONTENT_MAP]) &&
                        contentMap.has(key)) {
                        var c = contentMap.get(key);
                        if (c.firstChild) {
                            content = moveContent_1.default(document.createDocumentFragment(), c);
                            contentMap.set(key, el);
                            bindings = c.$component._bindings;
                            childComponents = c.$component._childComponents;
                        }
                    }
                    else if (ownerComponentContent.firstChild) {
                        if (!Features_1.templateTag && !ownerComponentContent[KEY_TEMPLATES_FIXED]) {
                            var templates = ownerComponentContent.querySelectorAll('template');
                            for (var i = templates.length; i;) {
                                templates[--i].content;
                            }
                            ownerComponentContent[KEY_TEMPLATES_FIXED] = true;
                        }
                        var selectedEls = ownerComponentContent.querySelectorAll(selector);
                        var selectedElCount = selectedEls.length;
                        if (selectedElCount) {
                            content = document.createDocumentFragment();
                            for (var i = 0; i < selectedElCount; i++) {
                                content.appendChild(clone ? selectedEls[i].cloneNode(true) : selectedEls[i]);
                            }
                        }
                        if (!clone && contentOwnerComponent) {
                            (contentMap ||
                                contentOwnerComponent[KEY_CONTENT_MAP] ||
                                (contentOwnerComponent[KEY_CONTENT_MAP] = new Map())).set(key, el);
                        }
                    }
                }
                else if (!clone && contentOwnerComponent) {
                    var contentMap = contentOwnerComponent[KEY_CONTENT_MAP];
                    if (contentMap && contentMap.has(key)) {
                        var c = contentMap.get(key);
                        content = moveContent_1.default(document.createDocumentFragment(), c);
                        contentMap.set(key, el);
                        bindings = c.$component._bindings;
                        childComponents = c.$component._childComponents;
                    }
                    else if (ownerComponentContent.firstChild) {
                        content = ownerComponentContent;
                        (contentMap || (contentOwnerComponent[KEY_CONTENT_MAP] = new Map())).set(key, el);
                    }
                }
                else if (ownerComponentContent.firstChild) {
                    content = clone ? ownerComponentContent.cloneNode(true) : ownerComponentContent;
                }
            }
            if (bindings === undefined) {
                if (content || el.firstChild) {
                    var getContext = props.getContext;
                    _a = content ?
                        bindContent_1.default(content, contentOwnerComponent, getContext ?
                            ownerComponent[getContext](this, ownerComponent.props.context) :
                            ownerComponent.props.context) :
                        bindContent_1.default(el, ownerComponent, getContext ? ownerComponent[getContext](this, props.context) : props.context), this._bindings = _a[0], childComponents = _a[1];
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
                if (el.firstChild) {
                    ElementProtoMixin_1.ElementsController.skipConnectionStatusCallbacks = true;
                    clearNode_1.default(el);
                    ElementProtoMixin_1.ElementsController.skipConnectionStatusCallbacks = false;
                }
                el.appendChild(content);
            }
            if (!(content && Features_1.nativeCustomElements) && childComponents) {
                attachChildComponentElements_1.default(childComponents);
            }
            this.isReady = true;
        }
        var _a;
    };
    RtContent.prototype._detach = function () {
        this._attached = false;
        this._freezeBindings();
    };
    return RtContent;
}(Component_1.default));
RtContent = __decorate([
    d_1.default.Component({
        elementIs: 'rt-content',
        props: {
            select: { type: String, readonly: true },
            clone: { default: false, readonly: true },
            getContext: { type: String, readonly: true }
        },
        template: ''
    })
], RtContent);
exports.default = RtContent;
