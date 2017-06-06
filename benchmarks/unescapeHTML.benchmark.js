var Benchmark = require('benchmark');

var html1 = 'textotext';
var html2 = 'text&lt;o&gt;text';
var html3 = 'textotext textotext textotext textotext textotext textotext textotext textotext textotext textotext textotext textotext textotext textotext textotext textotext textotext textotext textotext textotext textotext textotext textotext textotext textotext textotext textotext textotext textotext textotext textotext textotext textotext textotext textotext textotext textotext textotext textotext textotext textotext textotext textotext textotext textotext textotext textotext textotext textotext textotext';
var html4 = 'text&lt;o&gt;text text&lt;o&gt;text text&lt;o&gt;text text&lt;o&gt;text text&lt;o&gt;text text&lt;o&gt;text text&lt;o&gt;text text&lt;o&gt;text text&lt;o&gt;text text&lt;o&gt;text text&lt;o&gt;text text&lt;o&gt;text text&lt;o&gt;text text&lt;o&gt;text text&lt;o&gt;text text&lt;o&gt;text text&lt;o&gt;text text&lt;o&gt;text text&lt;o&gt;text text&lt;o&gt;text text&lt;o&gt;text text&lt;o&gt;text text&lt;o&gt;text text&lt;o&gt;text text&lt;o&gt;text text&lt;o&gt;text text&lt;o&gt;text text&lt;o&gt;text text&lt;o&gt;text text&lt;o&gt;text text&lt;o&gt;text text&lt;o&gt;text text&lt;o&gt;text text&lt;o&gt;text text&lt;o&gt;text text&lt;o&gt;text text&lt;o&gt;text text&lt;o&gt;text text&lt;o&gt;text text&lt;o&gt;text text&lt;o&gt;text text&lt;o&gt;text text&lt;o&gt;text text&lt;o&gt;text text&lt;o&gt;text text&lt;o&gt;text text&lt;o&gt;text text&lt;o&gt;text text&lt;o&gt;text text&lt;o&gt;text';

function unescapeHTML1(str) {
	return str
		.replace(/&lt;/g, '<')
		.replace(/&gt;/g, '>')
		.replace(/&quot;/g, '"')
		.replace(/&amp;/g, '&');
}

var reLessThanEntity = /&lt;/g;
var reGreaterThanEntity = /&gt;/g;
var reQuoteEntity = /&quot;/g;
var reAmpersandEntity = /&amp;/g;

function unescapeHTML2(str) {
	return str
		.replace(reLessThanEntity, '<')
		.replace(reGreaterThanEntity, '>')
		.replace(reQuoteEntity, '"')
		.replace(reAmpersandEntity, '&');
}

function unescapeHTML3(str) {
	return str
		.split('&amp;').join('&')
		.split('&lt;').join('<')
		.split('&gt;').join('>')
		.split('&quot;').join('"');
}

var reEscapableEntities = /&(?:amp|lt|gt|quot);/g;
var entityToCharMap = Object.create(null);

entityToCharMap['&amp;'] = '&';
entityToCharMap['&lt;'] = '<';
entityToCharMap['&gt;'] = '>';
entityToCharMap['&quot;'] = '"';

function unescapeHTML4(str) {
	return str.replace(reEscapableEntities, function(entity) {
		return entityToCharMap[entity];
	});
}

function unescapeHTML5(str) {
	return reEscapableEntities.test(str) ? str.replace(reEscapableEntities, function(entity) {
		return entityToCharMap[entity];
	}) : str;
}

var suite = new Benchmark.Suite();

suite
	.add('1.1', function() {
		unescapeHTML1(html1);
	})
	.add('1.2', function() {
		unescapeHTML1(html2);
	})
	.add('1.3', function() {
		unescapeHTML1(html3);
	})
	.add('1.4', function() {
		unescapeHTML1(html4);
	})
	.add('2.1', function() {
		unescapeHTML2(html1);
	})
	.add('2.2', function() {
		unescapeHTML2(html2);
	})
	.add('2.3', function() {
		unescapeHTML2(html3);
	})
	.add('2.4', function() {
		unescapeHTML2(html4);
	})
	.add('3.1', function() {
		unescapeHTML3(html1);
	})
	.add('3.2', function() {
		unescapeHTML3(html2);
	})
	.add('3.3', function() {
		unescapeHTML3(html3);
	})
	.add('3.4', function() {
		unescapeHTML3(html4);
	})
	.add('4.1', function() {
		unescapeHTML4(html1);
	})
	.add('4.2', function() {
		unescapeHTML4(html2);
	})
	.add('4.3', function() {
		unescapeHTML4(html3);
	})
	.add('4.4', function() {
		unescapeHTML4(html4);
	})
	.add('5.1', function() {
		unescapeHTML5(html1);
	})
	.add('5.2', function() {
		unescapeHTML5(html2);
	})
	.add('5.3', function() {
		unescapeHTML5(html3);
	})
	.add('5.4', function() {
		unescapeHTML5(html4);
	})
	.on('cycle', function(evt) {
		console.log(String(evt.target));
	})
	.run({ 'async': true });

// 1.1 x 1,737,575 ops/sec ±1.40% (76 runs sampled)
// 1.2 x 1,367,054 ops/sec ±0.99% (80 runs sampled)
// 1.3 x 1,551,759 ops/sec ±1.02% (84 runs sampled)
// 1.4 x 163,016 ops/sec ±0.89% (85 runs sampled)

// 2.1 x 1,790,420 ops/sec ±0.93% (72 runs sampled)
// 2.2 x 1,420,078 ops/sec ±0.76% (82 runs sampled)
// 2.3 x 1,591,492 ops/sec ±0.73% (71 runs sampled)
// 2.4 x 164,880 ops/sec ±0.95% (82 runs sampled)

// 3.1 x 961,033 ops/sec ±1.59% (81 runs sampled)
// 3.2 x 896,283 ops/sec ±1.19% (81 runs sampled)
// 3.3 x 916,473 ops/sec ±0.85% (84 runs sampled)
// 3.4 x 164,254 ops/sec ±1.54% (74 runs sampled)

// 4.1 x 5,180,531 ops/sec ±0.91% (82 runs sampled)
// 4.2 x 861,377 ops/sec ±1.10% (82 runs sampled)
// 4.3 x 1,331,266 ops/sec ±1.11% (82 runs sampled)
// 4.4 x 33,547 ops/sec ±1.01% (83 runs sampled)

// 5.1 x 19,660,739 ops/sec ±0.83% (80 runs sampled)
// 5.2 x 805,990 ops/sec ±1.32% (78 runs sampled)
// 5.3 x 1,663,442 ops/sec ±0.63% (84 runs sampled)
// 5.4 x 33,444 ops/sec ±0.85% (86 runs sampled)
