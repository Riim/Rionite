let cache = Object.create(null);

/**
 * @typesign (str: string) -> string;
 */
function camelize(str) {
	return cache[str] || (cache[str] = str.replace(/[\-_]+([a-z]|$)/g, (match, chr) => {
		return chr.toUpperCase();
	}));
}

module.exports = camelize;
