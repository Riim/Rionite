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
    if (props !== undefined) {
        if (props && (props['_content'] || props['context'])) {
            throw new TypeError("No need to declare property \"" + (props['_content'] ? '_content' : 'context') + "\"");
        }
        componentConstr.elementAttributes = props;
    }
    var parentComponentConstr = Object.getPrototypeOf(componentConstr.prototype).constructor;
    var bemlTemplate = componentConstr.bemlTemplate;
    if (bemlTemplate !== undefined) {
        if (bemlTemplate !== null) {
            if (parentComponentConstr.template instanceof beml_1.Template) {
                if (bemlTemplate === parentComponentConstr.bemlTemplate) {
                    componentConstr.template = parentComponentConstr.template.extend(undefined, { blockName: elIs });
                }
                else {
                    componentConstr.template = parentComponentConstr.template.extend(bemlTemplate, { blockName: elIs });
                    initBlockNames(componentConstr, parentComponentConstr, elIs);
                }
            }
            else {
                componentConstr.template = new beml_1.Template(bemlTemplate, { blockName: elIs });
                initBlockNames(componentConstr, parentComponentConstr, elIs);
            }
        }
        else {
            componentConstr.template = null;
        }
    }
    else {
        var template = componentConstr.template;
        if (template && template !== parentComponentConstr.template) {
            initBlockNames(componentConstr, parentComponentConstr, elIs);
        }
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
