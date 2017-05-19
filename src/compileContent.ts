import escapeString from 'escape-string';
import { IContentBinding, TContent, default as ContentParser } from './ContentParser';
import bindingToJSExpression from './bindingToJSExpression';
import formatters from './formatters';
import Component from './Component';
import KEY_COMPONENT_PROPERTY_VALUES from './KEY_COMPONENT_PROPERTY_VALUES';
import getUID from './Utils/getUID';

let ContentNodeType = ContentParser.ContentNodeType;

let keyCounter = 0;

export function nextComponentPropertyValueKey(): string {
	return String(++keyCounter);
}

let cache = Object.create(null);

export default function compileContent(
	parsedContent: TContent,
	content: string,
	ownerComponent?: Component
): () => any {
	let key = (ownerComponent ? getUID(ownerComponent) + '/' : '/') + content;

	if (cache[key]) {
		return cache[key];
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

	return (cache[key] = ownerComponent ? function() {
		let value = inner.call(this, formatters);

		if (value && typeof value == 'object') {
			let key = String(++keyCounter);

			(
				ownerComponent[KEY_COMPONENT_PROPERTY_VALUES] ||
					(ownerComponent[KEY_COMPONENT_PROPERTY_VALUES] = new Map())
			).set(key, value);

			return key;
		}

		return value;
	} : function() {
		return inner.call(this, formatters);
	});
}
