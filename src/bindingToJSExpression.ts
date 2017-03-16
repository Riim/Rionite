import { IContentBindingFormatter, IContentBinding } from './ContentParser';

let cache: { [key: string]: string } = Object.create(null);

function formattersReducer(jsExpr: string, formatter: IContentBindingFormatter): string {
	let args = formatter.arguments;

	return `(this.${ formatter.name } || formatters.${ formatter.name }).call(this, ${ jsExpr }${
		args && args.value.length ? ', ' + args.value.join(', ') : ''
	})`;
}

export default function bindingToJSExpression(binding: IContentBinding): string {
	let bindingRaw = binding.raw;

	if (cache[bindingRaw]) {
		return cache[bindingRaw];
	}

	let keys = binding.keypath.value.split('.');
	let keyCount = keys.length;
	let formatters = binding.formatters;

	if (keyCount == 1) {
		return (
			cache[bindingRaw] = formatters.length ?
				formatters.reduce(formattersReducer, `this['${ keys[0] }']`) :
				`this['${ keys[0] }']`
		);
	}

	let index = keyCount - 2;
	let jsExpr = Array(index);

	while (index) {
		jsExpr[--index] = ` && (temp = temp['${ keys[index + 1] }'])`;
	}

	return (cache[bindingRaw] = `(temp = this['${ keys[0] }'])${ jsExpr.join('') } && ${
		formatters.length ?
			formatters.reduce(formattersReducer, `temp['${ keys[keyCount - 1] }']`) :
			`temp['${ keys[keyCount - 1] }']`
	}`);
}
