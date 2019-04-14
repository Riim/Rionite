import { Cell, TCellPull } from 'cellx';
import { escapeString } from 'escape-string';
import { IAttributeBindingCellMeta } from './bindContent';
import { bindingToJSExpression } from './bindingToJSExpression';
import { KEY_COMPONENT_PARAM_VALUE_MAP } from './componentParamTypeSerializerMap';
import { formatters } from './lib/formatters';
import { ITemplateNodeValueBinding, TemplateNodeValueNodeType, TTemplateNodeValue } from './TemplateNodeValueParser';

const cache: Record<string, TCellPull<any>> = Object.create(null);

export function compileTemplateNodeValue(
	templateNodeValueAST: TTemplateNodeValue,
	templateNodeValueString: string,
	useComponentParamValueMap: boolean
): TCellPull<any> {
	let cacheKey = templateNodeValueString + (useComponentParamValueMap ? ',' : '.');

	if (cache[cacheKey]) {
		return cache[cacheKey];
	}

	let inner: (formatters: Record<string, Function>) => any;

	if (templateNodeValueAST.length == 1) {
		inner = Function(
			'formatters',
			`var tmp; return ${bindingToJSExpression(
				templateNodeValueAST[0] as ITemplateNodeValueBinding
			)};`
		) as any;
	} else {
		let fragments: Array<string> = [];

		for (let node of templateNodeValueAST) {
			fragments.push(
				node.nodeType == TemplateNodeValueNodeType.TEXT
					? `'${escapeString(node.value)}'`
					: bindingToJSExpression(node)
			);
		}

		inner = Function(
			'formatters',
			`var tmp; return [${fragments.join(', ')}].join('');`
		) as any;
	}

	return (cache[cacheKey] = useComponentParamValueMap
		? function(cell: Cell<any, IAttributeBindingCellMeta>): any {
				let value = inner.call(this, formatters);

				if (value) {
					let valueType = typeof value;

					if (valueType == 'object' || valueType == 'function') {
						let meta = cell.meta!;

						(meta.element[KEY_COMPONENT_PARAM_VALUE_MAP] ||
							(meta.element[KEY_COMPONENT_PARAM_VALUE_MAP] = { __proto__: null }))[
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
