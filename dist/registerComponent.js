"use strict";
var cellx_1 = require("cellx");
var beml_1 = require("@riim/beml");
var elementConstructorMap_1 = require("./elementConstructorMap");
var ElementProtoMixin_1 = require("./ElementProtoMixin");
var hyphenize_1 = require("./Utils/hyphenize");
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
