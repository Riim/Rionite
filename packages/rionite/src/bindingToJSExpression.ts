import { ITemplateNodeValueBinding, ITemplateNodeValueBindingFormatter } from './TemplateNodeValueParser';

function formattersReducer(jsExpr: string, formatter: ITemplateNodeValueBindingFormatter): string {
	return `(this.${formatter.name} || formatters.${formatter.name}).call(this['$/'], ${jsExpr}${
		formatter.arguments ? ', ' + formatter.arguments.join(', ') : ''
	})`;
}

export function bindingToJSExpression(binding: ITemplateNodeValueBinding): string {
	let formatters = binding.formatters;

	if (binding.keypath) {
		let keys = binding.keypath.split('.');
		let keyCount = keys.length;

		if (keyCount == 1) {
			return formatters
				? formatters.reduce(formattersReducer, `this['${keys[0]}']`)
				: `this['${keys[0]}']`;
		}

		let index = keyCount - 2;
		let fragments = Array(index);

		while (index) {
			fragments[--index] = ` && (tmp = tmp['${keys[index + 1]}'])`;
		}

		let jsExpr = `(tmp = this['${keys[0]}'])${fragments.join('')} && tmp['${
			keys[keyCount - 1]
		}']`;

		return formatters ? formatters.reduce(formattersReducer, jsExpr) : jsExpr;
	}

	return formatters ? formatters.reduce(formattersReducer, binding.value!) : binding.value!;
}
