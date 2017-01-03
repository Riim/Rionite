"use strict";
var reEscapableChars = /[\\'\r\n]/g;
var charToEscapedMap = Object.create(null);
charToEscapedMap['\\'] = '\\\\';
charToEscapedMap['\''] = '\\\'';
charToEscapedMap['\r'] = '\\r';
charToEscapedMap['\n'] = '\\n';
function escapeString(str) {
    return reEscapableChars.test(str) ? str.replace(reEscapableChars, function (chr) { return charToEscapedMap[chr]; }) : str;
}
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = escapeString;
