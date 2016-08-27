let reHyphen = /[-_]+([a-z]|$)/g;

let cache = Object.create(null);

export default function camelize(str: string): string {
	return cache[str] || (cache[str] = str.replace(reHyphen, (match, chr) => {
		return chr.toUpperCase();
	}));
}
