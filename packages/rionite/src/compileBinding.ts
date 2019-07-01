import { bindingToJSExpression } from './bindingToJSExpression';
import { formatters } from './lib/formatters';
import { ITemplateNodeValueBinding, TTemplateNodeValue } from './TemplateNodeValueParser';

const cache = new Map<string, (this: object) => any>();

export function compileBinding(
	binding: TTemplateNodeValue,
	cacheKey: string
): (this: object) => any {
	if (!cache.has(cacheKey)) {
		let inner: (formatters: Record<string, Function>) => any = Function(
			'formatters',
			`var tmp; return ${bindingToJSExpression(binding[0] as ITemplateNodeValueBinding)};`
		) as any;

		cache.set(cacheKey, function() {
			return inner.call(this, formatters);
		});
	}

	return cache.get(cacheKey)!;
}
