import { Cell, TCellPull } from 'cellx';
import { escapeString } from 'escape-string';
import { IAttributeBindingCellMeta } from './bindContent';
import { bindingToJSExpression } from './bindingToJSExpression';
import { KEY_COMPONENT_PARAM_VALUES } from './componentParamValueConverters';
import { formatters } from './lib/formatters';
import { ITemplateNodeValueBinding, TemplateNodeValueNodeType, TTemplateNodeValue } from './TemplateNodeValueParser';

const cache = new Map<string, TCellPull<any>>();

export function compileTemplateNodeValue(
	templateNodeValueAST: TTemplateNodeValue,
	templateNodeValueString: string,
	useComponentParamValues: boolean
): TCellPull<any> {
	let cacheKey = templateNodeValueString + (useComponentParamValues ? ',' : '.');

	if (!cache.has(cacheKey)) {
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

		cache.set(
			cacheKey,
			useComponentParamValues
				? function(cell: Cell<any, IAttributeBindingCellMeta>): any {
						let value = inner.call(this, formatters);

						if (value) {
							let valueType = typeof value;

							if (valueType == 'object' || valueType == 'function') {
								let meta = cell.meta!;

								(
									meta.element[KEY_COMPONENT_PARAM_VALUES] ||
									(meta.element[KEY_COMPONENT_PARAM_VALUES] = new Map())
								).set(meta.attributeName, value);

								return meta.attributeName;
							}
						}

						return value;
				  }
				: function(): string {
						let value = inner.call(this, formatters);
						return value == null ? '' : value + '';
				  }
		);
	}

	return cache.get(cacheKey)!;
}
