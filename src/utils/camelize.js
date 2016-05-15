/**
 * @typesign (str: string) -> string;
 */
function camelize(str) {
	return str.replace(/[\-_]+([a-z]|$)/g, function(match, chr) {
		return chr.toUpperCase();
	});
}

module.exports = camelize;
