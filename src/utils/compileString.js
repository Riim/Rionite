let pathToJSExpression = require('./pathToJSExpression');
let escapeString = require('./escapeString');
let compilePath = require('./compilePath');

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
			jsExpr.push(`'${ escapeString(substr) }'`);
		}
	}

	return (cache[str] = Function(`${ tempVar ? 'var temp; ' : '' }return [${ jsExpr.join(', ') }].join('');`));
}

module.exports = compileString;
