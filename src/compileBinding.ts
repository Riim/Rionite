import bindingToJSExpression from './bindingToJSExpression';
import formatters from './formatters';
import { IContentBinding } from './ContentParser';

let cache = Object.create(null);

export default function compileBinding(binding: IContentBinding): () => any {
	let bindingRaw = binding.raw;

	if (cache[bindingRaw]) {
		return cache[bindingRaw];
	}

	let bindingJSExpr = bindingToJSExpression(binding);
	let jsExpr = `var temp; return ${ bindingJSExpr.value };`;

	if (bindingJSExpr.usesFormatters) {
		let inner = Function('formatters', jsExpr);

		return (cache[bindingRaw] = function() {
			return inner.call(this, formatters);
		});
	}

	return (cache[bindingRaw] = Function(jsExpr) as any);
}
