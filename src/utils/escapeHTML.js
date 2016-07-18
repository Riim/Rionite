let reEscapableChars = /[&<>"]/g;
let charToEntityMap = Object.create(null);

charToEntityMap['&'] = '&amp;';
charToEntityMap['<'] = '&lt;';
charToEntityMap['>'] = '&gt;';
charToEntityMap['"'] = '&quot;';

function escapeHTML(str: string): string {
	return reEscapableChars.test(str) ? str.replace(reEscapableChars, chr => {
		return charToEntityMap[chr];
	}) : str;
}

module.exports = escapeHTML;
