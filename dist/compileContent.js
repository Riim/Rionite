"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var escape_string_1 = require("escape-string");
var ContentParser_1 = require("./ContentParser");
var bindingToJSExpression_1 = require("./bindingToJSExpression");
var formatters_1 = require("./formatters");
var componentPropertyValuesKey_1 = require("./componentPropertyValuesKey");
var ContentNodeType = ContentParser_1.default.ContentNodeType;
var keyCounter = 0;
var cache = Object.create(null);
function compileContent(parsedContent, content, ownerComponent) {
    if (cache[content]) {
        return cache[content];
    }
    var inner;
    if (parsedContent.length == 1 && parsedContent[0].nodeType == ContentNodeType.BINDING) {
        inner = Function('formatters', "var temp; return " + bindingToJSExpression_1.default(parsedContent[0]) + ";");
    }
    else {
        var jsExprArray = [];
        for (var _i = 0, parsedContent_1 = parsedContent; _i < parsedContent_1.length; _i++) {
            var node = parsedContent_1[_i];
            jsExprArray.push(node.nodeType == ContentNodeType.TEXT ?
                "'" + escape_string_1.default(node.value) + "'" :
                bindingToJSExpression_1.default(node));
        }
        inner = Function('formatters', "var temp; return [" + jsExprArray.join(', ') + "].join('');");
    }
    return (cache[content] = ownerComponent ? function () {
        var result = inner.call(this, formatters_1.default);
        if (result && typeof result == 'object') {
            var key = String(++keyCounter);
            (ownerComponent[componentPropertyValuesKey_1.default] ||
                (ownerComponent[componentPropertyValuesKey_1.default] = new Map())).set(key, result);
            return key;
        }
        return result;
    } : function () {
        return inner.call(this, formatters_1.default);
    });
}
exports.default = compileContent;
