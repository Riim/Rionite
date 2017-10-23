import { escapeString } from 'escape-string';
import { bindingToJSExpression } from './bindingToJSExpression';
import { componentInputValueMap } from './componentInputValueMap';
import {
	ContentTextFragmentParser,
	IContentTextFragmentBinding,
	IContentTextFragmentTextNode,
	TContentTextFragment
	} from './ContentTextFragmentParser';
import { formatters } from './formatters';

let ContentTextFragmentNodeType = ContentTextFragmentParser.ContentTextFragmentNodeType;

let keyCounter = 0;

let cache = Object.create(null);

export function compileContentTextFragment(
	contentTextFragment: TContentTextFragment,
	contentTextFragmentString: string,
	c: boolean
): () => any {
	let key = contentTextFragmentString + (c ? ',' : '.');

	if (cache[key]) {
		return cache[key];
	}

	let inner: (formatters: { [name: string]: Function }) => any;

	if (contentTextFragment.length == 1) {
		inner = Function(
			'formatters',
			`var temp; return ${contentTextFragment[0].nodeType == ContentTextFragmentNodeType.TEXT
				? `'${escapeString(
						(contentTextFragment[0] as IContentTextFragmentTextNode).value
					)}'`
				: bindingToJSExpression(contentTextFragment[0] as IContentTextFragmentBinding)};`
		) as any;
	} else {
		let jsExpr: Array<string> = [];

		for (let node of contentTextFragment) {
			jsExpr.push(
				node.nodeType == ContentTextFragmentNodeType.TEXT
					? `'${escapeString(node.value)}'`
					: bindingToJSExpression(node)
			);
		}

		inner = Function('formatters', `var temp; return [${jsExpr.join(', ')}].join('');`) as any;
	}

	return (cache[key] = c
		? function() {
				let value = inner.call(this, formatters);

				if (value) {
					let valueType = typeof value;

					if (valueType == 'object' || valueType == 'function') {
						let key = String(++keyCounter);
						componentInputValueMap.set(key, value);
						return key;
					}
				}

				return value;
			}
		: function() {
				return inner.call(this, formatters);
			});
}
