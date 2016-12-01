"use strict";
var cache = Object.create(null);
function keypathToJSExpression(keypath) {
    if (cache[keypath]) {
        return cache[keypath];
    }
    var splittedKeypath = keypath.split('?');
    var splittedKeypathLen = splittedKeypath.length;
    if (splittedKeypathLen == 1) {
        return (cache[keypath] = 'this.' + keypath);
    }
    var index = splittedKeypathLen - 2;
    var jsExpr = Array(index);
    while (index) {
        jsExpr[--index] = ' && (temp = temp' + splittedKeypath[index + 1] + ')';
    }
    return (cache[keypath] = "(temp = this." + splittedKeypath[0] + ")" + jsExpr.join('') + " && temp" + splittedKeypath[splittedKeypathLen - 1]);
}
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = keypathToJSExpression;
