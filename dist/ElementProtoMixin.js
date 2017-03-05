"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var cellx_1 = require("cellx");
var defer_1 = require("./Utils/defer");
var Features_1 = require("./Features");
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
