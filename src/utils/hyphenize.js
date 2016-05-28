let cache = Object.create(null);

/**
 * @typesign (str: string) -> string;
 */
function hyphenize(str) {
	return cache[str] || (cache[str] = str.replace(/([A-Z])([^A-Z])/g, (match, chr1, chr2) => {
		return '-' + chr1.toLowerCase() + chr2;
	}).replace(/([A-Z]+)/g, (match, chars) => {
		return '-' + chars.toLowerCase();
	}).replace('--', '-').replace(/^-/, ''));
}

module.exports = hyphenize;
