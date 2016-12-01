"use strict";
var toString = Object.prototype.toString;
function isRegExp(value) {
    return toString.call(value) == '[object RegExp]';
}
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = isRegExp;
