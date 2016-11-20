let reHump = /-?([A-Z])([^A-Z])/g;
let reLongHump = /-?([A-Z]+)/g;
let reMinus = /^-/;

let cache = Object.create(null);

export default function hyphenize(str: string): string {
	return cache[str] || (cache[str] = str.replace(reHump, (match, alphaChar, notAlphaChar) => {
		return '-' + alphaChar.toLowerCase() + notAlphaChar;
	}).replace(reLongHump, (match, chars) => {
		return '-' + chars.toLowerCase();
	}).replace(reMinus, ''));
}
