import { bindingToJSExpression } from './bindingToJSExpression';
import { KEY_COMPONENT_SELF } from './Constants';
import { formatters } from './lib/formatters';
import { ITemplateNodeValueBinding, TTemplateNodeValueAST } from './TemplateNodeValueParser';

const cache = new Map<string, (this: object) => any>();

export function compileBinding(
	binding: TTemplateNodeValueAST,
	cacheKey: string
): (this: object) => any {
	if (!cache.has(cacheKey)) {
		let inner: (formatters: Record<string, Function>, KEY_COMPONENT_SELF: symbol) => any =
			// eslint-disable-next-line @typescript-eslint/no-implied-eval
			Function(
				'formatters, KEY_COMPONENT_SELF',
				`var tmp; return ${bindingToJSExpression(binding[0] as ITemplateNodeValueBinding)};`
			) as any;

		cache.set(cacheKey, function () {
			return inner.call(this, formatters, KEY_COMPONENT_SELF);
		});
	}

	return cache.get(cacheKey)!;
}
