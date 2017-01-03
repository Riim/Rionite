let reEscapableChars = /[\\'\r\n]/g;
let charToEscapedMap = Object.create(null);

charToEscapedMap['\\'] = '\\\\';
charToEscapedMap['\''] = '\\\'';
charToEscapedMap['\r'] = '\\r';
charToEscapedMap['\n'] = '\\n';

export default function escapeString(str: string): string {
	return reEscapableChars.test(str) ? str.replace(reEscapableChars, chr => charToEscapedMap[chr]) : str;
}
