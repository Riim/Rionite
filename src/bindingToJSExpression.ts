import { IContentBindingFormatter, IContentBinding } from './ContentParser';

let cache: { [key: string]: { value: string; usesFormatters: boolean } } = Object.create(null);

function formattersReducer(jsExpr: string, formatter: IContentBindingFormatter): string {
	let args = formatter.arguments;

	return `(this.${ formatter.name } || formatters.${ formatter.name }).call(this, ${ jsExpr }${
		args && args.value.length ? ', ' + args.value.join(', ') : ''
	})`;
}

export default function bindingToJSExpression(binding: IContentBinding): { value: string; usesFormatters: boolean } {
	let bindingRaw = binding.raw;

	if (cache[bindingRaw]) {
		return cache[bindingRaw];
	}

	let keys = binding.keypath.value.split('.');
	let keyCount = keys.length;
	let formatters = binding.formatters;
	let usesFormatters = !!formatters.length;

	if (keyCount == 1) {
		return (cache[bindingRaw] = {
			value: usesFormatters ?
				formatters.reduce(formattersReducer, `this['${ keys[0] }']`) :
				`this['${ keys[0] }']`,
			usesFormatters
		});
	}

	let index = keyCount - 2;
	let jsExpr = Array(index);

	while (index) {
		jsExpr[--index] = ` && (temp = temp['${ keys[index + 1] }'])`;
	}

	return (cache[bindingRaw] = {
		value: `(temp = this['${ keys[0] }'])${ jsExpr.join('') } && ${
			usesFormatters ?
				formatters.reduce(formattersReducer, `temp['${ keys[keyCount - 1] }']`) :
				`temp['${ keys[keyCount - 1] }']`
		}`,
		usesFormatters
	});
}
