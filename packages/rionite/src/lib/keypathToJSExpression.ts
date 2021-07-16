const cache = new Map<string, string>();

export function keypathToJSExpression(keypath: string, cacheKey?: string): string;
export function keypathToJSExpression(keypath: string | Array<string>, cacheKey: string): string;
export function keypathToJSExpression(
	keypath: string | Array<string>,
	cacheKey: string = keypath as any
): string {
	if (!cache.has(cacheKey)) {
		let keys = typeof keypath == 'string' ? keypath.split('.') : keypath;
		let keyCount = keys.length;

		if (keyCount == 1) {
			cache.set(cacheKey, `this['${keypath}']`);
		} else {
			let index = keyCount - 2;
			let fragments = Array(index);

			while (index != 0) {
				fragments[--index] = ` && (tmp = tmp['${keys[index + 1]}'])`;
			}

			cache.set(
				cacheKey,
				`(tmp = this['${keys[0]}'])${fragments.join('')} && tmp['${keys[keyCount - 1]}']`
			);
		}
	}

	return cache.get(cacheKey)!;
}
