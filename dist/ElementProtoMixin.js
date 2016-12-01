"use strict";
var cellx = require("cellx");
var defer_1 = require("./Utils/defer");
var Symbol = cellx.JS.Symbol;
var attached = Symbol('Rionite.ElementProtoMixin.attached');
var ElementProtoMixin = (_a = {
        rioniteComponent: null,
        get $c() {
            return new this._rioniteComponentConstructor(this);
        }
    },
    _a[attached] = false,
    _a.connectedCallback = function () {
        this[attached] = true;
        var component = this.rioniteComponent;
        if (component) {
            if (component.isElementAttached) {
                if (component._parentComponent === null) {
                    component._parentComponent = undefined;
                    component.elementMoved();
                }
            }
            else {
                component._parentComponent = undefined;
                component.isElementAttached = true;
                component._attachElement();
            }
        }
        else {
            defer_1.default(function () {
                if (this[attached]) {
                    var component_1 = this.$c;
                    component_1._parentComponent = undefined;
                    if (!component_1.parentComponent) {
                        component_1.isElementAttached = true;
                        component_1._attachElement();
                    }
                }
            }, this);
        }
    },
    _a.disconnectedCallback = function () {
        this[attached] = false;
        var component = this.rioniteComponent;
        if (component && component.isElementAttached) {
            component._parentComponent = null;
            defer_1.default(function () {
                if (component._parentComponent === null && component.isElementAttached) {
                    component.isElementAttached = false;
                    component._detachElement();
                }
            });
        }
    },
    _a.attributeChangedCallback = function (name, oldValue, value) {
        var component = this.rioniteComponent;
        if (component && component.isReady) {
            component.elementAttributes['_' + name].set(value);
        }
    },
    _a);
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = ElementProtoMixin;
var _a;
