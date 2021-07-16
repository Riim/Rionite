import { Cell, TCellPull } from 'cellx';
import { escapeString } from 'escape-string';
import { IAttributeBindingCellMeta } from './bindContent';
import { bindingToJSExpression } from './bindingToJSExpression';
import { KEY_COMPONENT_PARAM_VALUES } from './componentParamValueConverters';
import { KEY_COMPONENT_SELF } from './Constants';
import { formatters } from './lib/formatters';
import { ITemplateNodeValueBinding, TemplateNodeValueNodeType, TTemplateNodeValueAST } from './TemplateNodeValueParser';

const cache = new Map<string, TCellPull<any>>();

export function compileTemplateNodeValue(
	templateNodeValueAST: TTemplateNodeValueAST,
	templateNodeValueString: string,
	useComponentParamValues: boolean
): TCellPull<any> {
	let cacheKey = templateNodeValueString + (useComponentParamValues ? ',' : '.');

	if (!cache.has(cacheKey)) {
		let inner: (formatters: Record<string, Function>) => any;

		if (templateNodeValueAST.length == 1) {
			// eslint-disable-next-line @typescript-eslint/no-implied-eval
			inner = Function(
				'formatters, KEY_COMPONENT_SELF',
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

			// eslint-disable-next-line @typescript-eslint/no-implied-eval
			inner = Function(
				'formatters, KEY_COMPONENT_SELF',
				`var tmp; return [${fragments.join(', ')}].join('');`
			) as any;
		}

		cache.set(
			cacheKey,
			useComponentParamValues
				? function (cell: Cell<any, IAttributeBindingCellMeta>): any {
						let value = inner.call(this, formatters, KEY_COMPONENT_SELF);

						if (value && (typeof value == 'object' || typeof value == 'function')) {
							let meta = cell.meta!;

							(
								meta.element[KEY_COMPONENT_PARAM_VALUES] ||
								(meta.element[KEY_COMPONENT_PARAM_VALUES] = new Map())
							).set(meta.attributeName, value);

							return meta.attributeName;
						}

						return value;
				  }
				: function (): string {
						let value = inner.call(this, formatters);
						return value == null ? '' : value + '';
				  }
		);
	}

	return cache.get(cacheKey)!;
}
