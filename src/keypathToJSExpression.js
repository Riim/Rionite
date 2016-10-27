let cache = Object.create(null);

export default function keypathToJSExpression(keypath) {
	if (cache[keypath]) {
		return cache[keypath];
	}

	keypath = keypath.split('?');

	let keypathLen = keypath.length;

	if (keypathLen == 1) {
		return (cache[keypath] = 'this.' + keypath[0]);
	}

	let index = keypath.length - 2;
	let jsExpr = Array(index);

	while (index) {
		jsExpr[--index] = ' && (temp = temp' + keypath[index + 1] + ')';
	}

	return (
		cache[keypath] = `(temp = this.${ keypath[0] })${ jsExpr.join('') } && temp${ keypath[keypath.length - 1] }`
	);
}
