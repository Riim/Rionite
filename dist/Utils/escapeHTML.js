"use strict";
var reEscapableChars = /[&<>"]/g;
var charToEntityMap = Object.create(null);
charToEntityMap['&'] = '&amp;';
charToEntityMap['<'] = '&lt;';
charToEntityMap['>'] = '&gt;';
charToEntityMap['"'] = '&quot;';
function escapeHTML(str) {
    return reEscapableChars.test(str) ? str.replace(reEscapableChars, function (chr) { return charToEntityMap[chr]; }) : str;
}
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = escapeHTML;
