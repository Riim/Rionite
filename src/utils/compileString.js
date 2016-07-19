let pathToJSExpression = require('./pathToJSExpression');
let compilePath = require('./compilePath');

let reEscapableChars = /['\r\n]/g;
let charToRegExpMap = Object.create(null);

charToRegExpMap['\''] = '\\\'';
charToRegExpMap['\r'] = '\\r';
charToRegExpMap['\n'] = '\\n';

let cache = Object.create(null);

function compileString(splitString: Array<string>, str: string): Function {
	if (cache[str]) {
		return cache[str];
	}

	if (splitString.length == 3 && splitString[0] == '' && splitString[2] == '') {
		return (cache[str] = compilePath(splitString[1]));
	}

	let tempVar = false;
	let jsExpr = Array(splitString.length);

	for (let i = 0, l = splitString.length; i < l; i++) {
		if (i % 2) {
			let pathJSExpr = pathToJSExpression(splitString[i]);

			if (pathJSExpr[1]) {
				tempVar = true;
			}

			jsExpr[i] = `', ${ pathJSExpr[0] }, '`;
		} else {
			jsExpr[i] = reEscapableChars.test(splitString[i]) ? splitString[i].replace(reEscapableChars, chr => {
				return charToRegExpMap[chr];
			}) : splitString[i];
		}
	}

	return (cache[str] = Function(`${ tempVar ? 'var temp; ' : '' }return ['${ jsExpr.join('') }'].join('');`));
}

module.exports = compileString;
