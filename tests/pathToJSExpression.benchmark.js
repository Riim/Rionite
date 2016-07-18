var Benchmark = require('benchmark');

function pathToJSExpression1(path) {
	path = path.split('?');

	var index = path.length - 2;
	var jsExpr = Array(index);

	while (index) {
		jsExpr[--index] = ' && (temp = temp' + path[index + 1] + ')';
	}

	return `(temp = this.${ path[0] })${ jsExpr.join('') } && temp${ path[path.length - 1] }`;
}

function pathToJSExpression2(path) {
	var jsExpr = path.split('?');
	var index = jsExpr.length - 2;

	while (index) {
		jsExpr[index] = ' && (temp = temp' + jsExpr[index--] + ')';
	}

	return `(temp = this.${ jsExpr[0] })${ jsExpr.slice(1, -1).join('') } && temp${ jsExpr[jsExpr.length - 1] }`;
}

function pathToJSExpression3(path) {
	var jsExpr = path.split('?');

	var last = jsExpr.pop();
	var first = jsExpr.shift();

	for (var i = jsExpr.length; i;) {
		jsExpr[--i] = ' && (temp = temp' + jsExpr[i] + ')';
	}

	return `(temp = this.${ first })${ jsExpr.join('') } && temp${ last }`;
}

var suite = new Benchmark.Suite();

suite
	.add('1.1', function() {
		pathToJSExpression1('a.b?.c');
	})
	.add('1.2', function() {
		pathToJSExpression1('a?.b.c.d?.e?.f');
	})
	.add('2.1', function() {
		pathToJSExpression2('a.b?.c');
	})
	.add('2.2', function() {
		pathToJSExpression2('a?.b.c.d?.e?.f');
	})
	.add('3.1', function() {
		pathToJSExpression3('a.b?.c');
	})
	.add('3.2', function() {
		pathToJSExpression3('a?.b.c.d?.e?.f');
	})
	.on('cycle', function(evt) {
		console.log(String(evt.target));
	})
	.run({ 'async': true });

// 1.1 x 2,951,295 ops/sec ±1.73% (78 runs sampled)
// 1.2 x 776,834 ops/sec ±1.28% (83 runs sampled)

// 2.1 x 2,214,555 ops/sec ±1.13% (83 runs sampled)
// 2.2 x 594,631 ops/sec ±1.07% (79 runs sampled)

// 3.1 x 1,210,592 ops/sec ±0.93% (78 runs sampled)
// 3.2 x 502,818 ops/sec ±1.16% (81 runs sampled)
