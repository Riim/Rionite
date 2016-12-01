"use strict";
var keypathToJSExpression_1 = require("./keypathToJSExpression");
var cache = Object.create(null);
function compileKeypath(keypath) {
    return cache[keypath] || (cache[keypath] = Function("var temp; return " + keypathToJSExpression_1.default(keypath) + ";"));
}
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = compileKeypath;
