"use strict";
function attachChildComponentElements(childComponents) {
    for (var _i = 0, childComponents_1 = childComponents; _i < childComponents_1.length; _i++) {
        var childComponent = childComponents_1[_i];
        if (!childComponent.isElementAttached) {
            childComponent.isElementAttached = true;
            childComponent._attachElement();
        }
    }
}
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = attachChildComponentElements;
