let cache = Object.create(null);

export default function keypathToJSExpression(keypath: string): string {
	if (cache[keypath]) {
		return cache[keypath];
	}

	let splittedKeypath = keypath.split('?');
	let splittedKeypathLen = splittedKeypath.length;

	if (splittedKeypathLen == 1) {
		return (cache[keypath] = 'this.' + keypath);
	}

	let index = splittedKeypathLen - 2;
	let jsExpr = Array(index);

	while (index) {
		jsExpr[--index] = ' && (temp = temp' + splittedKeypath[index + 1] + ')';
	}

	return (
		cache[keypath] = `(temp = this.${ splittedKeypath[0] })${ jsExpr.join('') } && temp${
			splittedKeypath[splittedKeypathLen - 1] }`
	);
}
