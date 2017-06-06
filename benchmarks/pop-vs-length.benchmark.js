var Benchmark = require('benchmark');

function getArray() {
	return [1];
}

function pop() {
	var arr = getArray();
	arr.pop();
	return arr.length;
}

function length() {
	var arr = getArray();
	return --arr.length;
}

var suite = new Benchmark.Suite();

suite
	.add('pop', function() {
		pop();
	})
	.add('length', function() {
		length();
	})
	.on('cycle', function(evt) {
		console.log(String(evt.target));
	})
	.run({ 'async': true });

// pop x 49,446,859 ops/sec ±0.95% (80 runs sampled)
// length x 12,742,802 ops/sec ±1.79% (80 runs sampled)
