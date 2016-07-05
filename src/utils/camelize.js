let cache = Object.create(null);

function camelize(str: string): string {
	return cache[str] || (cache[str] = str.replace(/[\-_]+([a-z]|$)/g, (match, chr) => {
		return chr.toUpperCase();
	}));
}

module.exports = camelize;
