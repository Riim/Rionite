let cache = Object.create(null);

function formattersReducer(jsExpr, formatter) {
	let args = formatter.arguments;

	return `(this['${ formatter.name }'] || formatters['${ formatter.name }']).call(this, ${ jsExpr }${
		args && args.value.length ? ', ' + args.value.join(', ') : ''
	})`;
}

export default function bindingToJSExpression(binding: Object): { value: string, usesFormatters: boolean } {
	let bindingRaw = binding.raw;

	if (cache[bindingRaw]) {
		return cache[bindingRaw];
	}

	let keypath = binding.keypath.value.split('?');
	let keypathLen = keypath.length;
	let formatters = binding.formatters;
	let usesFormatters = !!formatters.length;

	if (keypathLen == 1) {
		return (cache[bindingRaw] = {
			value: usesFormatters ? formatters.reduce(formattersReducer, 'this.' + keypath[0]) : 'this.' + keypath[0],
			usesFormatters
		});
	}

	let index = keypathLen - 2;
	let jsExpr = Array(index);

	while (index) {
		jsExpr[--index] = ` && (temp = temp${ keypath[index + 1] })`;
	}

	return (cache[bindingRaw] = {
		value: `(temp = this.${ keypath[0] })${ jsExpr.join('') } && ${
			usesFormatters ?
				formatters.reduce(formattersReducer, 'temp' + keypath[keypathLen - 1]) :
				'temp' + keypath[keypathLen - 1]
		}`,
		usesFormatters
	});
}
