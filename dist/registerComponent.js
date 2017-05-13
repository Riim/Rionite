"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var cellx_1 = require("cellx");
var beml_1 = require("@riim/beml");
var elementConstructorMap_1 = require("./elementConstructorMap");
var ElementProtoMixin_1 = require("./ElementProtoMixin");
var hyphenize_1 = require("./Utils/hyphenize");
var mixin = cellx_1.Utils.mixin;
var push = Array.prototype.push;
function registerComponent(componentConstr) {
    if (componentConstr._registeredComponent === componentConstr) {
        throw new TypeError('Component already registered');
    }
    var elIs = componentConstr.elementIs;
    if (!elIs) {
        throw new TypeError('Static property "elementIs" is required');
    }
    var props = componentConstr.props;
    if (props && (props.content || props.context)) {
        throw new TypeError("No need to declare property \"" + (props.content ? 'content' : 'context') + "\"");
    }
    var parentComponentConstr = Object.getPrototypeOf(componentConstr.prototype).constructor;
    componentConstr._blockNamesString = elIs + ' ' + (parentComponentConstr._blockNamesString || '');
    var template = componentConstr.template;
    if (template !== null && template !== parentComponentConstr.template) {
        componentConstr.template = template instanceof beml_1.Template ?
            template.setBlockName(elIs) :
            new beml_1.Template(template, { blockName: elIs });
    }
    componentConstr._contentBlockNames = [elIs];
    if (parentComponentConstr._contentBlockNames) {
        push.apply(componentConstr._contentBlockNames, parentComponentConstr._contentBlockNames);
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
    elConstr['_rioniteComponentConstructor'] = componentConstr;
    mixin(elProto, ElementProtoMixin_1.default);
    Object.defineProperty(elProto, 'constructor', {
        configurable: true,
        writable: true,
        value: elConstr
    });
    elementConstructorMap_1.default[elIs] = elConstr;
    window.customElements.define(elIs, elConstr, elExtends ? { extends: elExtends } : null);
    return (componentConstr._registeredComponent = componentConstr);
}
exports.default = registerComponent;
