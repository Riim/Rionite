let bindingToJSExpression = require('./bindingToJSExpression');
let ContentNodeType = require('./ContentNodeType');
let compileBinding = require('./compileBinding');
let formatters = require('./formatters');
let escapeString = require('./utils/escapeString');

let cache = Object.create(null);

function compileContent(parsedContent: Array<Object>, content: string): Function {
	if (cache[content]) {
		return cache[content];
	}

	if (parsedContent.length == 1) {
		let node = parsedContent[0];

		if (node.type == ContentNodeType.BINDING) {
			return (cache[content] = compileBinding(node));
		}
	}

	let usesFormatters = false;
	let usesTempVariable = false;
	let jsExpr = [];

	for (let i = 0, l = parsedContent.length; i < l; i++) {
		let node = parsedContent[i];

		if (node.type == ContentNodeType.TEXT) {
			jsExpr.push(`'${ escapeString(node.value) }'`);
		} else {
			let bindingJSExpr = bindingToJSExpression(node);

			if (!usesFormatters && bindingJSExpr.usesFormatters) {
				usesFormatters = true;
			}
			if (!usesTempVariable && bindingJSExpr.usesTempVariable) {
				usesTempVariable = true;
			}

			jsExpr.push(bindingJSExpr.value);
		}
	}

	jsExpr = `${ usesTempVariable ? 'var temp; ' : '' }return [${ jsExpr.join(', ') }].join('');`;

	if (usesFormatters) {
		let inner = Function('formatters', jsExpr);

		return (cache[content] = function() {
			return inner.call(this, formatters);
		});
	}

	return (cache[content] = Function(jsExpr));
}

module.exports = compileContent;
