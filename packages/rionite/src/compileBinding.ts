import { bindingToJSExpression } from './bindingToJSExpression';
import { formatters } from './lib/formatters';
import { ITemplateNodeValueBinding, TTemplateNodeValue } from './TemplateNodeValueParser';

const cache: Record<string, (this: object) => any> = Object.create(null);

export function compileBinding(
	binding: TTemplateNodeValue,
	cacheKey: string
): (this: object) => any {
	if (cache[cacheKey]) {
		return cache[cacheKey];
	}

	let inner: (formatters: Record<string, Function>) => any = Function(
		'formatters',
		`var tmp; return ${bindingToJSExpression(binding[0] as ITemplateNodeValueBinding)};`
	) as any;

	return (cache[cacheKey] = function() {
		return inner.call(this, formatters);
	});
}
