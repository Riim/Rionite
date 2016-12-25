"use strict";
var camelize_1 = require("./Utils/camelize");
function initElementAttributes(component, constr) {
    var elAttrsConfig = constr.elementAttributes;
    if (elAttrsConfig) {
        var attrs = component.elementAttributes;
        for (var name_1 in elAttrsConfig) {
            if (typeof elAttrsConfig[name_1] != 'function') {
                var camelizedName = camelize_1.default(name_1);
                attrs[camelizedName] = attrs[camelizedName];
            }
        }
    }
}
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = initElementAttributes;
