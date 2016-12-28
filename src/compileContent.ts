import { IContentTextNode, IContentBinding, TContent, default as ContentParser } from './ContentParser';
import bindingToJSExpression from './bindingToJSExpression';
import compileBinding from './compileBinding';
import formatters from './formatters';
import escapeString from './Utils/escapeString';

let ContentNodeType = ContentParser.ContentNodeType;

let cache = Object.create(null);

export default function compileContent(parsedContent: TContent, content: string): () => any {
	if (cache[content]) {
		return cache[content];
	}

	if (parsedContent.length == 1 && parsedContent[0].nodeType == ContentNodeType.BINDING) {
		return (cache[content] = compileBinding(parsedContent[0] as IContentBinding));
	}

	let usesFormatters = false;
	let jsExprParts: Array<string> = [];

	for (let node of parsedContent) {
		if (node.nodeType == ContentNodeType.TEXT) {
			jsExprParts.push(`'${ escapeString((node as IContentTextNode).value) }'`);
		} else {
			let bindingJSExpr = bindingToJSExpression(node as IContentBinding);

			if (!usesFormatters && bindingJSExpr.usesFormatters) {
				usesFormatters = true;
			}

			jsExprParts.push(bindingJSExpr.value);
		}
	}

	let jsExpr = `var temp; return [${ jsExprParts.join(', ') }].join('');`;

	if (usesFormatters) {
		let inner = Function('formatters', jsExpr);

		return (cache[content] = function() {
			return inner.call(this, formatters);
		});
	}

	return (cache[content] = Function(jsExpr) as any);
}
