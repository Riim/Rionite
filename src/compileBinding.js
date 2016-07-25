let bindingToJSExpression = require('./bindingToJSExpression');
let formatters = require('./formatters');

let cache = Object.create(null);

function compileBinding(binding: Object): Function {
	let bindingRaw = binding.raw;

	if (cache[bindingRaw]) {
		return cache[bindingRaw];
	}

	let bindingJSExpr = bindingToJSExpression(binding);
	let jsExpr = `${ bindingJSExpr.usesTempVariable ? 'var temp; ' : '' }return ${ bindingJSExpr.value };`;

	if (bindingJSExpr.usesFormatters) {
		let inner = Function('formatters', jsExpr);

		return (cache[bindingRaw] = function() {
			return inner.call(this, formatters);
		});
	}

	return (cache[bindingRaw] = Function(jsExpr));
}

module.exports = compileBinding;
