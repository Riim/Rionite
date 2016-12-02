"use strict";
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
    var usesFormatters = !!formatters.length;
    if (keyCount == 1) {
        return (cache[bindingRaw] = {
            value: usesFormatters ?
                formatters.reduce(formattersReducer, "this['" + keys[0] + "']") :
                "this['" + keys[0] + "']",
            usesFormatters: usesFormatters
        });
    }
    var index = keyCount - 2;
    var jsExpr = Array(index);
    while (index) {
        jsExpr[--index] = " && (temp = temp['" + keys[index + 1] + "'])";
    }
    return (cache[bindingRaw] = {
        value: "(temp = this['" + keys[0] + "'])" + jsExpr.join('') + " && " + (usesFormatters ?
            formatters.reduce(formattersReducer, "temp['" + keys[keyCount - 1] + "']") :
            "temp['" + keys[keyCount - 1] + "']"),
        usesFormatters: usesFormatters
    });
}
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = bindingToJSExpression;
