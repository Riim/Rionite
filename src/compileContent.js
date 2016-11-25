import ContentParser from './ContentParser';
import bindingToJSExpression from './bindingToJSExpression';
import compileBinding from './compileBinding';
import formatters from './formatters';
import escapeString from './Utils/escapeString';

let ContentNodeType = ContentParser.ContentNodeType;

let cache = Object.create(null);

export default function compileContent(parsedContent: Array<Object>, content: string): Function {
	if (cache[content]) {
		return cache[content];
	}

	if (parsedContent.length == 1) {
		let node = parsedContent[0];

		if (node.type == ContentNodeType.BINDING) {
			return (cache[content] = compileBinding(node));
		}
	}

	let usesFormatters = false;
	let jsExpr = [];

	for (let i = 0, l = parsedContent.length; i < l; i++) {
		let node = parsedContent[i];

		if (node.type == ContentNodeType.TEXT) {
			jsExpr.push(`'${ escapeString(node.value) }'`);
		} else {
			let bindingJSExpr = bindingToJSExpression(node);

			if (!usesFormatters && bindingJSExpr.usesFormatters) {
				usesFormatters = true;
			}

			jsExpr.push(bindingJSExpr.value);
		}
	}

	jsExpr = `var temp; return [${ jsExpr.join(', ') }].join('');`;

	if (usesFormatters) {
		let inner = Function('formatters', jsExpr);

		return (cache[content] = function() {
			return inner.call(this, formatters);
		});
	}

	return (cache[content] = Function(jsExpr));
}
