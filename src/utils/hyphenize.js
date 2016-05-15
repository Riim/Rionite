/**
 * @typesign (str: string) -> string;
 */
function hyphenize(str) {
	return str.replace(/([A-Z])([^A-Z])/g, function(match, chr1, chr2) {
		return '-' + chr1.toLowerCase() + chr2;
	}).replace(/([A-Z]+)/g, function(match, chars) {
		return '-' + chars.toLowerCase();
	}).replace('--', '-').replace(/^-/, '');
}

module.exports = hyphenize;
