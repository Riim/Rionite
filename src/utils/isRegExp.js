let toString = Object.prototype.toString;

function isRegExp(value: any): boolean {
	return toString.call(value) == '[object RegExp]';
}

module.exports = isRegExp;
