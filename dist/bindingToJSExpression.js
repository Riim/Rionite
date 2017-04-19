"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var cache = Object.create(null);
function formattersReducer(jsExpr, formatter) {
    var args = formatter.arguments;
    return "(this." + formatter.name + " || formatters." + formatter.name + ").call(this, " + jsExpr + (args && args.value.length ? ', ' + args.value.join(', ') : '') + ")";
}
function bindingToJSExpression(binding) {
    var bindingRaw = binding.raw;
    if (cache[bindingRaw]) {
        return cache[bindingRaw];
    }
    var keys = binding.keypath.value.split('.');
    var keyCount = keys.length;
    var formatters = binding.formatters;
    if (keyCount == 1) {
        return (cache[bindingRaw] = formatters ?
            formatters.reduce(formattersReducer, "this['" + keys[0] + "']") :
            "this['" + keys[0] + "']");
    }
    var index = keyCount - 2;
    var jsExprArr = Array(index);
    while (index) {
        jsExprArr[--index] = " && (temp = temp['" + keys[index + 1] + "'])";
    }
    var jsExpr = "(temp = this['" + keys[0] + "'])" + jsExprArr.join('') + " && temp['" + keys[keyCount - 1] + "']";
    return (cache[bindingRaw] = formatters ? formatters.reduce(formattersReducer, jsExpr) : jsExpr);
}
exports.default = bindingToJSExpression;
