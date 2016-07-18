let reEscapableEntities = /&(?:amp|lt|gt|quot);/g;
let entityToCharMap = Object.create(null);

entityToCharMap['&amp;'] = '&';
entityToCharMap['&lt;'] = '<';
entityToCharMap['&gt;'] = '>';
entityToCharMap['&quot;'] = '"';

function unescapeHTML(str: string): string {
	return reEscapableEntities.test(str) ? str.replace(reEscapableEntities, entity => {
		return entityToCharMap[entity];
	}) : str;
}

module.exports = unescapeHTML;
