"use strict";
var cache = Object.create(null);
function formattersReducer(jsExpr, formatter) {
    var args = formatter.arguments;
    return "(this['" + formatter.name + "'] || formatters['" + formatter.name + "']).call(this, " + jsExpr + (args && args.value.length ? ', ' + args.value.join(', ') : '') + ")";
}
function bindingToJSExpression(binding) {
    var bindingRaw = binding.raw;
    if (cache[bindingRaw]) {
        return cache[bindingRaw];
    }
    var keypath = binding.keypath.value.split('?');
    var keypathLen = keypath.length;
    var formatters = binding.formatters;
    var usesFormatters = !!formatters.length;
    if (keypathLen == 1) {
        return (cache[bindingRaw] = {
            value: usesFormatters ? formatters.reduce(formattersReducer, 'this.' + keypath[0]) : 'this.' + keypath[0],
            usesFormatters: usesFormatters
        });
    }
    var index = keypathLen - 2;
    var jsExpr = Array(index);
    while (index) {
        jsExpr[--index] = " && (temp = temp" + keypath[index + 1] + ")";
    }
    return (cache[bindingRaw] = {
        value: "(temp = this." + keypath[0] + ")" + jsExpr.join('') + " && " + (usesFormatters ?
            formatters.reduce(formattersReducer, 'temp' + keypath[keypathLen - 1]) :
            'temp' + keypath[keypathLen - 1]),
        usesFormatters: usesFormatters
    });
}
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = bindingToJSExpression;
