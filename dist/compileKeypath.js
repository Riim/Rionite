"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var keypathToJSExpression_1 = require("./keypathToJSExpression");
var cache = Object.create(null);
function compileKeypath(keypath) {
    return cache[keypath] || (cache[keypath] = Function("var temp; return " + keypathToJSExpression_1.default(keypath) + ";"));
}
exports.default = compileKeypath;
