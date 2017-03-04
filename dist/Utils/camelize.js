"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var reHyphen = /[-_]+([a-z]|$)/g;
var cache = Object.create(null);
function camelize(str) {
    return cache[str] || (cache[str] = str.replace(reHyphen, function (match, chr) {
        return chr.toUpperCase();
    }));
}
exports.default = camelize;
