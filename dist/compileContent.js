"use strict";
var ContentParser_1 = require("./ContentParser");
var bindingToJSExpression_1 = require("./bindingToJSExpression");
var compileBinding_1 = require("./compileBinding");
var formatters_1 = require("./formatters");
var escapeString_1 = require("./Utils/escapeString");
var ContentNodeType = ContentParser_1.default.ContentNodeType;
var cache = Object.create(null);
function compileContent(parsedContent, content) {
    if (cache[content]) {
        return cache[content];
    }
    if (parsedContent.length == 1 && parsedContent[0].nodeType == ContentNodeType.BINDING) {
        return (cache[content] = compileBinding_1.default(parsedContent[0]));
    }
    var usesFormatters = false;
    var jsExprParts = [];
    for (var _i = 0, parsedContent_1 = parsedContent; _i < parsedContent_1.length; _i++) {
        var node = parsedContent_1[_i];
        if (node.nodeType == ContentNodeType.TEXT) {
            jsExprParts.push("'" + escapeString_1.default(node.value) + "'");
        }
        else {
            var bindingJSExpr = bindingToJSExpression_1.default(node);
            if (!usesFormatters && bindingJSExpr.usesFormatters) {
                usesFormatters = true;
            }
            jsExprParts.push(bindingJSExpr.value);
        }
    }
    var jsExpr = "var temp; return [" + jsExprParts.join(', ') + "].join('');";
    if (usesFormatters) {
        var inner_1 = Function('formatters', jsExpr);
        return (cache[content] = function () {
            return inner_1.call(this, formatters_1.default);
        });
    }
    return (cache[content] = Function(jsExpr));
}
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = compileContent;
