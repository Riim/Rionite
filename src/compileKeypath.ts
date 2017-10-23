import { keypathToJSExpression } from './keypathToJSExpression';

let cache = Object.create(null);

export function compileKeypath(keypath: string): () => any {
	return (
		cache[keypath] ||
		(cache[keypath] = Function(`var temp; return ${keypathToJSExpression(keypath)};`))
	);
}
