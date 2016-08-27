let reEscapableChars = /[&<>"]/g;
let charToEntityMap = Object.create(null);

charToEntityMap['&'] = '&amp;';
charToEntityMap['<'] = '&lt;';
charToEntityMap['>'] = '&gt;';
charToEntityMap['"'] = '&quot;';

export default function escapeHTML(str: string): string {
	return reEscapableChars.test(str) ? str.replace(reEscapableChars, chr => charToEntityMap[chr]) : str;
}
