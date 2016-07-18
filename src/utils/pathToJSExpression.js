let cache = Object.create(null);

function pathToJSExpression(path: string): [string, boolean] {
	if (cache[path]) {
		return cache[path];
	}

	path = path.split('?');

	let pathLength = path.length;

	if (pathLength == 1) {
		return [`this.${ path[0] }`, false];
	}

	let index = pathLength - 2;
	let jsExpr = Array(index);

	while (index) {
		jsExpr[--index] = ' && (temp = temp' + path[index + 1] + ')';
	}

	return (cache[path] = [`(temp = this.${ path[0] })${ jsExpr.join('') } && temp${ path[pathLength - 1] }`, true]);
}

module.exports = pathToJSExpression;
