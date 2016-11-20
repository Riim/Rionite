let reEscapableChars = /[\\'\r\n]/g;
let charToSpecialMap = Object.create(null);

charToSpecialMap['\\'] = '\\\\';
charToSpecialMap['\''] = '\\\'';
charToSpecialMap['\r'] = '\\r';
charToSpecialMap['\n'] = '\\n';

export default function escapeString(str: string): string {
	return reEscapableChars.test(str) ? str.replace(reEscapableChars, chr => charToSpecialMap[chr]) : str;
}
