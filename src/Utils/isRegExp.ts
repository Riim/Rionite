let toString = Object.prototype.toString;

export default function isRegExp(value: any): boolean {
	return toString.call(value) == '[object RegExp]';
}
