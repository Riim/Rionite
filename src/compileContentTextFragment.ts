import { escapeString } from 'escape-string';
import { bindingToJSExpression } from './bindingToJSExpression';
import { componentParamValueMap } from './componentParamValueMap';
import {
	ContentTextFragmentNodeType,
	IContentTextFragmentBinding,
	IContentTextFragmentTextNode,
	TContentTextFragment
	} from './ContentTextFragmentParser';
import { formatters } from './lib/formatters';

let valueMapKeyCounter = 0;

let cache = Object.create(null);

export function compileContentTextFragment(
	contentTextFragment: TContentTextFragment,
	contentTextFragmentString: string,
	useValueMap: boolean
): () => any {
	let cacheKey = contentTextFragmentString + (useValueMap ? ',' : '.');

	if (cache[cacheKey]) {
		return cache[cacheKey];
	}

	let inner: (formatters: { [name: string]: Function }) => any;

	if (contentTextFragment.length == 1) {
		inner = Function(
			'formatters',
			`var temp; return ${
				contentTextFragment[0].nodeType == ContentTextFragmentNodeType.TEXT
					? `'${escapeString(
							(contentTextFragment[0] as IContentTextFragmentTextNode).value
						)}'`
					: bindingToJSExpression(contentTextFragment[0] as IContentTextFragmentBinding)
			};`
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

	return (cache[cacheKey] = useValueMap
		? function() {
				let value = inner.call(this, formatters);

				if (value) {
					let valueType = typeof value;

					if (valueType == 'object' || valueType == 'function') {
						let key = ++valueMapKeyCounter + '';
						componentParamValueMap.set(key, value);
						return key;
					}
				}

				return value;
			}
		: function() {
				return inner.call(this, formatters) + '';
			});
}
