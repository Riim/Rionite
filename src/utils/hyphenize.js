let cache = Object.create(null);

function hyphenize(str: string): string {
	return cache[str] || (cache[str] = str.replace(/\-?([A-Z])([^A-Z])/g, (match, chr1, chr2) => {
		return '-' + chr1.toLowerCase() + chr2;
	}).replace(/\-?([A-Z]+)/g, (match, chars) => {
		return '-' + chars.toLowerCase();
	}).replace(/^-/, ''));
}

module.exports = hyphenize;
