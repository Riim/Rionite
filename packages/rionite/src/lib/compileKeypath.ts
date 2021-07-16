import { keypathToJSExpression } from './keypathToJSExpression';

const cache = new Map<string, (this: object) => any>();

export function compileKeypath(keypath: string, cacheKey?: string): (this: object) => any;
export function compileKeypath(
	keypath: string | Array<string>,
	cacheKey: string
): (this: object) => any;
export function compileKeypath(
	keypath: string | Array<string>,
	cacheKey = keypath as string
): (this: object) => any {
	return (
		cache.get(cacheKey) ??
		cache
			.set(
				cacheKey,
				// eslint-disable-next-line @typescript-eslint/no-implied-eval
				Function(`var tmp; return ${keypathToJSExpression(keypath, cacheKey)};`) as any
			)
			.get(cacheKey)!
	);
}
