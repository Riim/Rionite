"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Component_1 = require("./Component");
var d = {
    Component: function Component_(config) {
        return function (componentConstr) {
            componentConstr.elementIs = config.elementIs;
            if (config.elementExtends !== undefined) {
                componentConstr.elementExtends = config.elementExtends;
            }
            if (config.props !== undefined) {
                componentConstr.props = config.props;
            }
            if (config.i18n) {
                componentConstr.i18n = config.i18n;
            }
            if (config.template !== undefined) {
                componentConstr.template = config.template;
            }
            if (config.events !== undefined) {
                componentConstr.events = config.events;
            }
            Component_1.default.register(componentConstr);
        };
    }
};
exports.default = d;
