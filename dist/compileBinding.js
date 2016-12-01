"use strict";
var bindingToJSExpression_1 = require('./bindingToJSExpression');
var formatters_1 = require('./formatters');
var cache = Object.create(null);
function compileBinding(binding) {
    var bindingRaw = binding.raw;
    if (cache[bindingRaw]) {
        return cache[bindingRaw];
    }
    var bindingJSExpr = bindingToJSExpression_1.default(binding);
    var jsExpr = "var temp; return " + bindingJSExpr.value + ";";
    if (bindingJSExpr.usesFormatters) {
        var inner_1 = Function('formatters', jsExpr);
        return (cache[bindingRaw] = function () {
            return inner_1.call(this, formatters_1.default);
        });
    }
    return (cache[bindingRaw] = Function(jsExpr));
}
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = compileBinding;
