"use strict";
function setAttribute(el, name, value) {
    if (value === false || value == null) {
        el.removeAttribute(name);
    }
    else {
        el.setAttribute(name, value === true ? '' : value);
    }
}
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = setAttribute;
