"use strict";
var reEscapableChars = /[&<>"]/g;
var charToEscapedMap = Object.create(null);
charToEscapedMap['&'] = '&amp;';
charToEscapedMap['<'] = '&lt;';
charToEscapedMap['>'] = '&gt;';
charToEscapedMap['"'] = '&quot;';
function escapeHTML(str) {
    return reEscapableChars.test(str) ? str.replace(reEscapableChars, function (chr) { return charToEscapedMap[chr]; }) : str;
}
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = escapeHTML;
