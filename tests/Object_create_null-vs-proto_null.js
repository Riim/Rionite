var Benchmark = require('benchmark');

function ObjectCreate() {
	return Object.create(null);
}

function proto() {
	return { __proto__: null };
}

var suite = new Benchmark.Suite();

suite
	.add('ObjectCreate', function() {
		ObjectCreate();
	})
	.add('proto', function() {
		proto();
	})
	.on('cycle', function(evt) {
		console.log(String(evt.target));
	})
	.run({ 'async': true });

// ObjectCreate x 6,440,066 ops/sec ±2.62% (83 runs sampled)
// proto x 4,579,888 ops/sec ±2.20% (75 runs sampled)
