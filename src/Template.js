let namePattern = require('./namePattern');
let escapeString = require('./utils/escapeString');
let escapeHTML = require('./utils/escapeHTML');

let keypathPattern = `${ namePattern }(?:\\.${ namePattern })*`;
let re = RegExp(
	'{{' +
		'(?:' +
			'\\s*(?:' +
				`block\\s+(${ namePattern })|(\\/)block|(s)uper\\(\\)|(${ keypathPattern })` +
			`)\\s*|{\\s*(${ keypathPattern })\\s*}` +
		')' +
	'}}'
);

function Template(tmpl, parent = null) {
	this.parent = parent;

	let currentBlock = { js: [] };

	let blocks = [currentBlock];
	let blockMap = this._blocks = Object.create(parent ? parent._blocks : null);

	tmpl = tmpl.split(re);

	for (let i = 0, l = tmpl.length; i < l;) {
		if (i % 6) {
			let name = tmpl[i];

			if (name) {
				currentBlock.js.push(`this.${ name }.call(this, data)`);
				currentBlock = blockMap[name] = { name, js: [] };
				blocks.push(currentBlock);
			} else if (tmpl[i + 1]) {
				if (blocks.length > 1) {
					blocks.pop();
					currentBlock = blocks[blocks.length - 1];
				}
			} else if (tmpl[i + 2]) {
				if (parent && blocks.length > 1 && parent._blocks[currentBlock.name]) {
					currentBlock.js.push('_super.call(this, data)');
				}
			} else {
				let keypath = tmpl[i + 2];
				currentBlock.js.push(keypath ? `escape(data.${ keypath })` : 'data.' + tmpl[i + 3]);
			}

			i += 5;
		} else {
			let text = tmpl[i];

			if (text) {
				currentBlock.js.push(`'${ escapeString(text) }'`);
			}

			i++;
		}
	}

	Object.keys(blockMap).forEach(name => {
		let _super = parent && parent._blocks[name];
		let inner = Function('_super', 'data', 'escape', `return [${ blockMap[name].js.join(', ') }].join('');`);

		blockMap[name] = function(data) {
			return inner.call(this, _super, data, escapeHTML);
		};
	});

	this._renderer = parent ?
		parent._renderer :
		Function('data', 'escape', `return [${ blocks[0].js.join(', ') }].join('');`);
}

Template.prototype.extend = function(tmpl) {
	return new Template(tmpl, this);
};

Template.prototype.render = function(data) {
	return this._renderer.call(this._blocks, data || {}, escapeHTML);
};

module.exports = Template;
