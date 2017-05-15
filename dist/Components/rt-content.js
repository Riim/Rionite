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
var clearNode_1 = require("../Utils/clearNode");
var Features_1 = require("../Features");
var d_1 = require("../d");
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
            var props = this.props;
            var ownerComponentContent = ownerComponent.props.content;
            var content = void 0;
            if (ownerComponentContent.firstChild) {
                var selector = props.select;
                var cloning = props.cloning;
                if (selector) {
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
                            content.appendChild(cloning ? selectedEls[i].cloneNode(true) : selectedEls[i]);
                        }
                    }
                }
                else {
                    content = cloning ?
                        ownerComponentContent.cloneNode(true) :
                        ownerComponentContent;
                }
            }
            var el = this.element;
            var getContext = props.getContext;
            var _a = content ?
                bindContent_1.default(content, ownerComponent.ownerComponent, getContext ?
                    ownerComponent[getContext](this, ownerComponent.props.context) :
                    ownerComponent.props.context) :
                bindContent_1.default(el, ownerComponent, getContext ? ownerComponent[getContext](this, props.context) : props.context), bindings = _a[0], childComponents = _a[1];
            this._bindings = bindings;
            if (content) {
                if (el.firstChild) {
                    ElementProtoMixin_1.ElementsController.skipConnectionStatusCallbacks = true;
                    clearNode_1.default(el);
                    ElementProtoMixin_1.ElementsController.skipConnectionStatusCallbacks = false;
                }
                el.appendChild(content);
            }
            if ((!content || !Features_1.nativeCustomElements) && childComponents) {
                attachChildComponentElements_1.default(childComponents);
            }
            this.isReady = true;
        }
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
            cloning: { default: true, readonly: true },
            getContext: { type: String, readonly: true }
        },
        template: ''
    })
], RtContent);
exports.default = RtContent;
