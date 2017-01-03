let reEscapableEntities = /&(?:amp|lt|gt|quot);/g;
let escapedToCharMap = Object.create(null);

escapedToCharMap['&amp;'] = '&';
escapedToCharMap['&lt;'] = '<';
escapedToCharMap['&gt;'] = '>';
escapedToCharMap['&quot;'] = '"';

export default function unescapeHTML(str: string): string {
	return reEscapableEntities.test(str) ? str.replace(reEscapableEntities, entity => escapedToCharMap[entity]) : str;
}
