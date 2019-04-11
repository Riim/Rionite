import { keypathToJSExpression } from './keypathToJSExpression';

const cache: Record<string, (this: object) => any> = Object.create(null);

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
		cache[cacheKey] ||
		(cache[cacheKey] = Function(
			`var tmp; return ${keypathToJSExpression(keypath, cacheKey)};`
		) as any)
	);
}
