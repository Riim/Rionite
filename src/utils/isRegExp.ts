let toString = Object.prototype.toString;

export function isRegExp(value: any): boolean {
	return toString.call(value) == '[object RegExp]';
}
