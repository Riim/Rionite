let reEscapableChars = /[&<>"]/g;
let charToEscapedMap = Object.create(null);

charToEscapedMap['&'] = '&amp;';
charToEscapedMap['<'] = '&lt;';
charToEscapedMap['>'] = '&gt;';
charToEscapedMap['"'] = '&quot;';

export default function escapeHTML(str: string): string {
	return reEscapableChars.test(str) ? str.replace(reEscapableChars, chr => charToEscapedMap[chr]) : str;
}
