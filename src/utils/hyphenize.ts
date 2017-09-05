let reHeadTail = /-?([A-Z])([^A-Z])/g;
let reLongHead = /-?([A-Z]+)/g;
let reMinus = /^-/;

let cache = Object.create(null);

export function hyphenize(str: string): string {
	return cache[str] || (
		cache[str] = str
			.replace(reHeadTail, (match, head, tail) => '-' + head.toLowerCase() + tail)
			.replace(reLongHead, (match, head) => '-' + head.toLowerCase())
			.replace(reMinus, '')
	);
}
