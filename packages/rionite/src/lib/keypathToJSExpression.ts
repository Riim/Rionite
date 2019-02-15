const cache = Object.create(null);

export function keypathToJSExpression(keypath: string, cacheKey?: string): string;
export function keypathToJSExpression(keypath: string | Array<string>, cacheKey: string): string;
export function keypathToJSExpression(
	keypath: string | Array<string>,
	cacheKey: string = keypath as any
): string {
	if (cache[cacheKey]) {
		return cache[cacheKey];
	}

	let keys = typeof keypath == 'string' ? keypath.split('.') : keypath;
	let keyCount = keys.length;

	if (keyCount == 1) {
		return (cache[cacheKey] = `this['${keypath}']`);
	}

	let index = keyCount - 2;
	let jsExpr = Array(index);

	while (index) {
		jsExpr[--index] = ` && (tmp = tmp['${keys[index + 1]}'])`;
	}

	return (cache[cacheKey] = `(tmp = this['${keys[0]}'])${jsExpr.join('')} && tmp['${
		keys[keyCount - 1]
	}']`);
}