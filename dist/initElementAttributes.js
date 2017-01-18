"use strict";
var camelize_1 = require("./Utils/camelize");
function initElementAttributes(component, constr) {
    var propsConfig = constr.props;
    if (propsConfig) {
        var props = component.props;
        for (var name_1 in propsConfig) {
            if (typeof propsConfig[name_1] != 'function') {
                var camelizedName = camelize_1.default(name_1);
                props[camelizedName] = props[camelizedName];
            }
        }
    }
}
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = initElementAttributes;
