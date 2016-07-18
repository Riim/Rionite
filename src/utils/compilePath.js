let pathToJSExpression = require('./pathToJSExpression');

let cache = Object.create(null);

function compilePath(path: string): Function {
	if (cache[path]) {
		return cache[path];
	}

	let pathJSExpr = pathToJSExpression(path);
	return (cache[path] = Function(`${ pathJSExpr[1] ? 'var temp; ' : '' }return ${ pathJSExpr[0] };`));
}

module.exports = compilePath;
