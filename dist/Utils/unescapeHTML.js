"use strict";
var reEscapableEntities = /&(?:amp|lt|gt|quot);/g;
var entityToCharMap = Object.create(null);
entityToCharMap['&amp;'] = '&';
entityToCharMap['&lt;'] = '<';
entityToCharMap['&gt;'] = '>';
entityToCharMap['&quot;'] = '"';
function unescapeHTML(str) {
    return reEscapableEntities.test(str) ? str.replace(reEscapableEntities, function (entity) { return entityToCharMap[entity]; }) : str;
}
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = unescapeHTML;
