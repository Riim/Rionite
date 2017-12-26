import { TCellPull } from 'cellx/dist/Cell';
import { escapeString } from 'escape-string';
import { AttributeBindingCell } from './bindContent';
import { bindingToJSExpression } from './bindingToJSExpression';
import { componentParamValueMap } from './componentParamValueMap';
import {
	ContentNodeValueNodeType,
	IContentNodeValueBinding,
	IContentNodeValueText,
	TContentNodeValue
	} from './ContentNodeValueParser';
import { formatters } from './lib/formatters';

let valueMapKeyCounter = 0;

let cache = Object.create(null);

export function compileContentNodeValue(
	contentNodeValue: TContentNodeValue,
	contentNodeValueString: string,
	useValueMap: boolean
): TCellPull<any> {
	let cacheKey = contentNodeValueString + (useValueMap ? ',' : '.');

	if (cache[cacheKey]) {
		return cache[cacheKey];
	}

	let inner: (formatters: { [name: string]: Function }) => any;

	if (contentNodeValue.length == 1) {
		inner = Function(
			'formatters',
			`var temp; return ${
				contentNodeValue[0].nodeType == ContentNodeValueNodeType.TEXT
					? `'${escapeString((contentNodeValue[0] as IContentNodeValueText).value)}'`
					: bindingToJSExpression(contentNodeValue[0] as IContentNodeValueBinding)
			};`
		) as any;
	} else {
		let jsExpr: Array<string> = [];

		for (let node of contentNodeValue) {
			jsExpr.push(
				node.nodeType == ContentNodeValueNodeType.TEXT
					? `'${escapeString(node.value)}'`
					: bindingToJSExpression(node)
			);
		}

		inner = Function('formatters', `var temp; return [${jsExpr.join(', ')}].join('');`) as any;
	}

	return (cache[cacheKey] = useValueMap
		? function(cell: AttributeBindingCell, next: string): any {
				let value = inner.call(this, formatters);

				if (value) {
					if (value === cell.prevValue) {
						return next;
					}

					let valueType = typeof value;

					if (valueType == 'object' || valueType == 'function') {
						let key = ++valueMapKeyCounter + '';
						componentParamValueMap.set(key, value);
						cell.prevValue = value;
						return key;
					}
				}

				return value;
			}
		: function(): string {
				let value = inner.call(this, formatters);
				return value === undefined ? '' : value + '';
			});
}
