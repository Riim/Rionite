"use strict";
var cellx = require("cellx");
var elementConstructorMap_1 = require("./elementConstructorMap");
var ElementProtoMixin_1 = require("./ElementProtoMixin");
var hyphenize_1 = require("./Utils/hyphenize");
var mixin = cellx.Utils.mixin;
var push = Array.prototype.push;
function registerComponent(componentConstr) {
    if (componentConstr._registeredComponent === componentConstr) {
        throw new TypeError('Component already registered');
    }
    var elIs = componentConstr.elementIs;
    if (!elIs) {
        throw new TypeError('Static property "elementIs" is required');
    }
    var parentComponentConstr = Object.getPrototypeOf(componentConstr.prototype).constructor;
    if (componentConstr.props !== parentComponentConstr.props) {
        var props = componentConstr.props;
        if (props && (props['content'] || props['context'])) {
            throw new TypeError("No need to declare property \"" + (props['content'] ? 'content' : 'context') + "\"");
        }
        componentConstr.elementAttributes = props;
    }
    if (componentConstr.template !== parentComponentConstr.template && componentConstr.template) {
        componentConstr._markupBlockNames = [elIs];
        if (parentComponentConstr._markupBlockNames) {
            push.apply(componentConstr._markupBlockNames, parentComponentConstr._markupBlockNames);
        }
    }
    componentConstr._assetClassNames = Object.create(parentComponentConstr._assetClassNames || null);
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
            var elAttrsConfig = componentConstr.elementAttributes;
            if (!elAttrsConfig) {
                return [];
            }
            var observedAttrs = [];
            for (var name_1 in elAttrsConfig) {
                observedAttrs.push(hyphenize_1.default(name_1));
            }
            return observedAttrs;
        }
    });
    mixin(elProto, ElementProtoMixin_1.default);
    Object.defineProperty(elProto, 'constructor', {
        configurable: true,
        writable: true,
        value: elConstr
    });
    elProto._rioniteComponentConstructor = componentConstr;
    elementConstructorMap_1.default[elIs] = window.customElements.define(elIs, elConstr, elExtends ? { extends: elExtends } : null);
    return (componentConstr._registeredComponent = componentConstr);
}
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = registerComponent;
