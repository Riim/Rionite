let cache = Object.create(null);

export default function keypathToJSExpression(keypath: string): string {
	if (cache[keypath]) {
		return cache[keypath];
	}

	let keys = keypath.split('.');
	let keyCount = keys.length;

	if (keyCount == 1) {
		return (cache[keypath] = `this['${ keypath }']`);
	}

	let index = keyCount - 2;
	let jsExpr = Array(index);

	while (index) {
		jsExpr[--index] = ` && (temp = temp['${ keys[index + 1] }'])`;
	}

	return (cache[keypath] = `(temp = this['${ keys[0] }'])${ jsExpr.join('') } && temp['${ keys[keyCount - 1] }']`);
}
