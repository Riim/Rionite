let pathToJSExpression = require('./pathToJSExpression');
let compilePath = require('./compilePath');

let reEscapableChars = /['\r\n]/g;
let charToRegExpMap = Object.create(null);

charToRegExpMap['\''] = '\\\'';
charToRegExpMap['\r'] = '\\r';
charToRegExpMap['\n'] = '\\n';

let cache = Object.create(null);

function compileString(substrings: Array<string>, str: string): Function {
	if (cache[str]) {
		return cache[str];
	}

	if (substrings.length == 3 && substrings[0] == '' && substrings[2] == '') {
		return (cache[str] = compilePath(substrings[1]));
	}

	let tempVar = false;
	let jsExpr = [];

	for (let i = 0, l = substrings.length; i < l; i++) {
		let substr = substrings[i];

		if (i % 2) {
			let pathJSExpr = pathToJSExpression(substr);

			if (pathJSExpr[1]) {
				tempVar = true;
			}

			jsExpr.push(pathJSExpr[0]);
		} else if (substr) {
			jsExpr.push(`'${
				reEscapableChars.test(substr) ? substr.replace(reEscapableChars, chr => charToRegExpMap[chr]) : substr
			}'`);
		}
	}

	return (cache[str] = Function(`${ tempVar ? 'var temp; ' : '' }return [${ jsExpr.join(', ') }].join('');`));
}

module.exports = compileString;
