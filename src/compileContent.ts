import escapeString from 'escape-string';
import { IContentBinding, TContent, default as ContentParser } from './ContentParser';
import bindingToJSExpression from './bindingToJSExpression';
import formatters from './formatters';
import Component from './Component';
import componentPropertyValuesKey from './componentPropertyValuesKey';
import getUID from './Utils/getUID';

let ContentNodeType = ContentParser.ContentNodeType;

let keyCounter = 0;

let cache = Object.create(null);

export default function compileContent(
	parsedContent: TContent,
	content: string,
	ownerComponent?: Component
): () => any {
	let cacheKey = (ownerComponent ? getUID(ownerComponent) + '/' : '/') + content;

	if (cache[cacheKey]) {
		return cache[cacheKey];
	}

	let inner: Function;

	if (parsedContent.length == 1 && parsedContent[0].nodeType == ContentNodeType.BINDING) {
		inner = Function(
			'formatters',
			`var temp; return ${ bindingToJSExpression(parsedContent[0] as IContentBinding) };`
		);
	} else {
		let jsExpr: Array<string> = [];

		for (let node of parsedContent) {
			jsExpr.push(
				node.nodeType == ContentNodeType.TEXT ?
					`'${ escapeString(node.value) }'` :
					bindingToJSExpression(node)
			);
		}

		inner = Function('formatters', `var temp; return [${ jsExpr.join(', ') }].join('');`);
	}

	return (cache[cacheKey] = ownerComponent ? function() {
		let result = inner.call(this, formatters);

		if (result && typeof result == 'object') {
			let key = String(++keyCounter);

			(
				ownerComponent[componentPropertyValuesKey] ||
					(ownerComponent[componentPropertyValuesKey] = new Map<string, Object>())
			).set(key, result);

			return key;
		}

		return result;
	} : function() {
		return inner.call(this, formatters);
	});
}
