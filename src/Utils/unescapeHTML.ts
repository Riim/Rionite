let reEscapableEntities = /&(?:amp|lt|gt|quot);/g;
let entityToCharMap = Object.create(null);

entityToCharMap['&amp;'] = '&';
entityToCharMap['&lt;'] = '<';
entityToCharMap['&gt;'] = '>';
entityToCharMap['&quot;'] = '"';

export default function unescapeHTML(str: string): string {
	return reEscapableEntities.test(str) ? str.replace(reEscapableEntities, entity => entityToCharMap[entity]) : str;
}
