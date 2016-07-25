let cache = Object.create(null);

function formattersReducer(jsExpr, formatter) {
	let args = formatter.arguments;

	return `(this['${ formatter.name }'] || formatters['${ formatter.name }']).call(this, ${ jsExpr }${
		args && args.value.length ? ', ' + args.raw.slice(1, -1) : ''
	})`;
}

function bindingToJSExpression(binding: Object): { value: string, usesFormatters: boolean, usesTempVariable: boolean } {
	let bindingRaw = binding.raw;

	if (cache[bindingRaw]) {
		return cache[bindingRaw];
	}

	let keypath = binding.keypath.value.split('?');
	let formatters = binding.formatters;

	let keypathLength = keypath.length;

	if (keypathLength == 1) {
		if (formatters.length) {
			return (cache[bindingRaw] = {
				value: formatters.reduce(formattersReducer, 'this.' + keypath[0]),
				usesFormatters: true,
				usesTempVariable: false
			});
		}

		return (cache[bindingRaw] = {
			value: 'this.' + keypath[0],
			usesFormatters: false,
			usesTempVariable: false
		});
	}

	let index = keypathLength - 2;
	let jsExpr = Array(index);

	while (index) {
		jsExpr[--index] = ` && (temp = temp${ keypath[index + 1] })`;
	}

	if (formatters.length) {
		return (cache[bindingRaw] = {
			value: `(temp = this.${ keypath[0] })${ jsExpr.join('') } && ${
				formatters.reduce(formattersReducer, 'temp' + keypath[keypathLength - 1])
			}`,
			usesFormatters: true,
			usesTempVariable: true
		});
	}

	return (cache[bindingRaw] = {
		value: `(temp = this.${ keypath[0] })${ jsExpr.join('') } && temp${ keypath[keypathLength - 1] }`,
		usesFormatters: false,
		usesTempVariable: true
	});
}

module.exports = bindingToJSExpression;
