"use strict";
var reEscapableChars = /[\\'\r\n]/g;
var charToSpecialMap = Object.create(null);
charToSpecialMap['\\'] = '\\\\';
charToSpecialMap['\''] = '\\\'';
charToSpecialMap['\r'] = '\\r';
charToSpecialMap['\n'] = '\\n';
function escapeString(str) {
    return reEscapableChars.test(str) ? str.replace(reEscapableChars, function (chr) { return charToSpecialMap[chr]; }) : str;
}
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = escapeString;
