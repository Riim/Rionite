"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var cache = Object.create(null);
function keypathToJSExpression(keypath) {
    if (cache[keypath]) {
        return cache[keypath];
    }
    var keys = keypath.split('.');
    var keyCount = keys.length;
    if (keyCount == 1) {
        return (cache[keypath] = "this['" + keypath + "']");
    }
    var index = keyCount - 2;
    var jsExpr = Array(index);
    while (index) {
        jsExpr[--index] = " && (temp = temp['" + keys[index + 1] + "'])";
    }
    return (cache[keypath] = "(temp = this['" + keys[0] + "'])" + jsExpr.join('') + " && temp['" + keys[keyCount - 1] + "']");
}
exports.default = keypathToJSExpression;
