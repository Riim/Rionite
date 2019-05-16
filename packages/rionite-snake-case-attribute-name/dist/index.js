"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var reCamelCase = /^_?[a-z][0-9a-z]*$/i;
var reLetters = /[A-Z][^A-Z]/g;
var reLetters2 = /[A-Z]{2,}/g;
var cache = Object.create(null);
function snakeCaseAttributeName(str, useCache) {
    var value;
    return ((useCache && cache[str]) ||
        ((value = reCamelCase.test(str) ? str
            .replace(reLetters, function (word) { return '_' + word; })
            .replace(reLetters2, function (word) { return '_' + word; })
            .toLowerCase() : str),
            useCache ? (cache[str] = value) : value));
}
exports.snakeCaseAttributeName = snakeCaseAttributeName;
