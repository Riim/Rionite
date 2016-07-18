let pathToJSExpression = require('./pathToJSExpression');
let compilePath = require('./compilePath');

let reEscapableChars = /['\r\n]/g;
let charToRegExpMap = Object.create(null);

charToRegExpMap['\''] = '\\\'';
charToRegExpMap['\r'] = '\\r';
charToRegExpMap['\n'] = '\\n';

let cache = Object.create(null);

function compileContent(splitContent: Array<string>, content: string): Function {
	if (cache[content]) {
		return cache[content];
	}

	if (splitContent.length == 3 && splitContent[0] == '' && splitContent[2] == '') {
		return (cache[content] = compilePath(splitContent[1]));
	}

	let tempVar = false;
	let jsExpr = Array(splitContent.length);

	for (let i = 0, l = splitContent.length; i < l; i++) {
		if (i % 2) {
			let pathJSExpr = pathToJSExpression(splitContent[i]);

			if (pathJSExpr[1]) {
				tempVar = true;
			}

			jsExpr[i] = `', ${ pathJSExpr[0] }, '`;
		} else {
			jsExpr[i] = reEscapableChars.test(splitContent[i]) ? splitContent[i].replace(reEscapableChars, chr => {
				return charToRegExpMap[chr];
			}) : splitContent[i];
		}
	}

	return (cache[content] = Function(`${ tempVar ? 'var temp; ' : '' }return ['${ jsExpr.join('') }'].join('');`));
}

module.exports = compileContent;
