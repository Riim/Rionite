import { keypathToJSExpression } from './keypathToJSExpression';

const cache = new Map<string, (this: object) => any>();

export function compileKeypath(keypath: string, cacheKey?: string): (this: object) => any;
export function compileKeypath(
	keypath: string | Array<string>,
	cacheKey: string
): (this: object) => any;
export function compileKeypath(
	keypath: string | Array<string>,
	cacheKey: string = keypath as any
): (this: object) => any {
	return (
		cache.get(cacheKey) ||
		cache
			.set(cacheKey, Function(
				`var tmp; return ${keypathToJSExpression(keypath, cacheKey)};`
			) as any)
			.get(cacheKey)!
	);
}
