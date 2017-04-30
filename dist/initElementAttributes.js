"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function initElementAttributes(component) {
    var constr = component.constructor;
    var propsConfig = constr.props;
    if (propsConfig) {
        var props = component.props;
        for (var name_1 in propsConfig) {
            if (props.hasOwnProperty('_initialize_' + name_1)) {
                props['_initialize_' + name_1]();
            }
        }
    }
}
exports.default = initElementAttributes;
