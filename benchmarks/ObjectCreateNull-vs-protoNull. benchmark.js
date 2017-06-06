var Benchmark = require('benchmark');

function ObjectCreateNull() {
	return Object.create(null);
}

function protoNull() {
	return { __proto__: null };
}

var suite = new Benchmark.Suite();

suite
	.add('ObjectCreateNull', function() {
		ObjectCreateNull();
	})
	.add('protoNull', function() {
		protoNull();
	})
	.on('cycle', function(evt) {
		console.log(String(evt.target));
	})
	.run({ 'async': true });

// ObjectCreateNull x 6,440,066 ops/sec ±2.62% (83 runs sampled)
// protoNull x 4,579,888 ops/sec ±2.20% (75 runs sampled)
