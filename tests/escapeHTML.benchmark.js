var html1 = 'textotext';
var html2 = 'text<o>text';
var html3 = 'textotext textotext textotext textotext textotext textotext textotext textotext textotext textotext textotext textotext textotext textotext textotext textotext textotext textotext textotext textotext textotext textotext textotext textotext textotext textotext textotext textotext textotext textotext textotext textotext textotext textotext textotext textotext textotext textotext textotext textotext textotext textotext textotext textotext textotext textotext textotext textotext textotext textotext';
var html4 = 'text<o>text text<o>text text<o>text text<o>text text<o>text text<o>text text<o>text text<o>text text<o>text text<o>text text<o>text text<o>text text<o>text text<o>text text<o>text text<o>text text<o>text text<o>text text<o>text text<o>text text<o>text text<o>text text<o>text text<o>text text<o>text text<o>text text<o>text text<o>text text<o>text text<o>text text<o>text text<o>text text<o>text text<o>text text<o>text text<o>text text<o>text text<o>text text<o>text text<o>text text<o>text text<o>text text<o>text text<o>text text<o>text text<o>text text<o>text text<o>text text<o>text text<o>text';

var Benchmark = require('benchmark');

function escapeHTML1(str) {
	return str
		.replace(/&/g, '&amp;')
		.replace(/</g, '&lt;')
		.replace(/>/g, '&gt;')
		.replace(/"/g, '&quot;');
}

var reAmpersand = /&/g;
var reLessThan = /</g;
var reGreaterThan = />/g;
var reQuote = /"/g;

function escapeHTML2(str) {
	return str
		.replace(reAmpersand, '&amp;')
		.replace(reLessThan, '&lt;')
		.replace(reGreaterThan, '&gt;')
		.replace(reQuote, '&quot;');
}

function escapeHTML3(str) {
	return str
		.split('&').join('&amp;')
		.split('<').join('&lt;')
		.split('>').join('&gt;')
		.split('"').join('&quot;');
}

var reEscapableChars = /[&<>"]/g;
var charToEntityMap = Object.create(null);

charToEntityMap['&'] = '&amp;';
charToEntityMap['<'] = '&lt;';
charToEntityMap['>'] = '&gt;';
charToEntityMap['"'] = '&quot;';

function escapeHTML4(str) {
	return str.replace(reEscapableChars, function(chr) {
		return charToEntityMap[chr];
	});
}

function escapeHTML5(str) {
	return reEscapableChars.test(str) ? str.replace(reEscapableChars, function(chr) {
		return charToEntityMap[chr];
	}) : str;
}

var suite = new Benchmark.Suite();

suite
	.add('1.1', function() {
		escapeHTML1(html1);
	})
	.add('1.2', function() {
		escapeHTML1(html2);
	})
	.add('1.3', function() {
		escapeHTML1(html3);
	})
	.add('1.4', function() {
		escapeHTML1(html4);
	})
	.add('2.1', function() {
		escapeHTML2(html1);
	})
	.add('2.2', function() {
		escapeHTML2(html2);
	})
	.add('2.3', function() {
		escapeHTML2(html3);
	})
	.add('2.4', function() {
		escapeHTML2(html4);
	})
	.add('3.1', function() {
		escapeHTML3(html1);
	})
	.add('3.2', function() {
		escapeHTML3(html2);
	})
	.add('3.3', function() {
		escapeHTML3(html3);
	})
	.add('3.4', function() {
		escapeHTML3(html4);
	})
	.add('4.1', function() {
		escapeHTML4(html1);
	})
	.add('4.2', function() {
		escapeHTML4(html2);
	})
	.add('4.3', function() {
		escapeHTML4(html3);
	})
	.add('4.4', function() {
		escapeHTML4(html4);
	})
	.add('5.1', function() {
		escapeHTML5(html1);
	})
	.add('5.2', function() {
		escapeHTML5(html2);
	})
	.add('5.3', function() {
		escapeHTML5(html3);
	})
	.add('5.4', function() {
		escapeHTML5(html4);
	})
	.on('cycle', function(evt) {
		console.log(String(evt.target));
	})
	.run({ 'async': true });

// 1.1 x 1,752,754 ops/sec ±0.89% (76 runs sampled)
// 1.2 x 1,378,742 ops/sec ±1.05% (82 runs sampled)
// 1.3 x 1,557,711 ops/sec ±1.07% (76 runs sampled)
// 1.4 x 197,485 ops/sec ±0.81% (84 runs sampled)

// 2.1 x 1,788,852 ops/sec ±0.84% (75 runs sampled)
// 2.2 x 1,438,812 ops/sec ±0.84% (85 runs sampled)
// 2.3 x 1,594,855 ops/sec ±1.04% (80 runs sampled)
// 2.4 x 197,518 ops/sec ±0.86% (82 runs sampled)

// 3.1 x 1,031,498 ops/sec ±1.33% (77 runs sampled)
// 3.2 x 948,518 ops/sec ±1.14% (75 runs sampled)
// 3.3 x 959,172 ops/sec ±0.98% (82 runs sampled)
// 3.4 x 121,587 ops/sec ±0.94% (83 runs sampled)

// 4.1 x 5,074,371 ops/sec ±1.06% (74 runs sampled)
// 4.2 x 1,411,578 ops/sec ±0.86% (84 runs sampled)
// 4.3 x 1,318,213 ops/sec ±1.28% (81 runs sampled)
// 4.4 x 71,011 ops/sec ±1.21% (82 runs sampled)

// 5.1 x 18,135,478 ops/sec ±0.76% (83 runs sampled)
// 5.2 x 1,267,092 ops/sec ±1.71% (79 runs sampled)
// 5.3 x 1,642,661 ops/sec ±0.79% (78 runs sampled)
// 5.4 x 78,513 ops/sec ±1.44% (79 runs sampled)
