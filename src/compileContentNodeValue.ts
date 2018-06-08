import { Cell, TCellPull } from 'cellx/dist/Cell';
import { escapeString } from 'escape-string';
import { IAttributeBindingCellMeta } from './bindContent';
import { bindingToJSExpression } from './bindingToJSExpression';
import { KEY_COMPONENT_PARAM_VALUE_MAP } from './componentParamTypeSerializerMap';
import {
	ContentNodeValueNodeType,
	IContentNodeValueBinding,
	IContentNodeValueText,
	TContentNodeValue
	} from './ContentNodeValueParser';
import { formatters } from './lib/formatters';

const cache = Object.create(null);

export function compileContentNodeValue(
	contentNodeValueAST: TContentNodeValue,
	contentNodeValueString: string,
	useValueMap: boolean
): TCellPull<any> {
	let cacheKey = contentNodeValueString + (useValueMap ? ',' : '.');

	if (cache[cacheKey]) {
		return cache[cacheKey];
	}

	let inner: (formatters: { [name: string]: Function }) => any;

	if (contentNodeValueAST.length == 1) {
		inner = Function(
			'formatters',
			`var temp; return ${
				contentNodeValueAST[0].nodeType == ContentNodeValueNodeType.TEXT
					? `'${escapeString((contentNodeValueAST[0] as IContentNodeValueText).value)}'`
					: bindingToJSExpression(contentNodeValueAST[0] as IContentNodeValueBinding)
			};`
		) as any;
	} else {
		let jsExpr: Array<string> = [];

		for (let node of contentNodeValueAST) {
			jsExpr.push(
				node.nodeType == ContentNodeValueNodeType.TEXT
					? `'${escapeString(node.value)}'`
					: bindingToJSExpression(node)
			);
		}

		inner = Function('formatters', `var temp; return [${jsExpr.join(', ')}].join('');`) as any;
	}

	return (cache[cacheKey] = useValueMap
		? function(cell: Cell<any, IAttributeBindingCellMeta>): any {
				let value = inner.call(this, formatters);

				if (value) {
					let valueType = typeof value;

					if (valueType == 'object' || valueType == 'function') {
						let meta = cell.meta!;

						(meta.element[KEY_COMPONENT_PARAM_VALUE_MAP] ||
							(meta.element[KEY_COMPONENT_PARAM_VALUE_MAP] = Object.create(null)))[
							meta.attributeName
						] = value;

						return meta.attributeName;
					}
				}

				return value;
		  }
		: function(): string {
				let value = inner.call(this, formatters);
				return value == null ? '' : value + '';
		  });
}
