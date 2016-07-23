let escapeString = require('./utils/escapeString');

let re = /{{\s*(?:block\s+([$_a-zA-Z][$\w]*)|(\/)block|(s)uper)\s*}}/;

function Template(tmpl, parent) {
	let currentBlock = { js: [] };
	let blocks = [currentBlock];
	let blockMap = this._blocks = Object.create(parent ? parent._blocks : null);

	this.parent = parent;

	tmpl = tmpl.split(re);

	for (let i = 0, l = tmpl.length; i < l;) {
		if (i % 4) {
			let name = tmpl[i];

			if (name) {
				currentBlock.js.push(`this.${ name }()`);
				currentBlock = { name, js: [] };
				blocks.push(currentBlock);
				blockMap[name] = currentBlock;
			} else if (tmpl[i + 1]) {
				if (blocks.length > 1) {
					blocks.pop();
					currentBlock = blocks[blocks.length - 1];
				}
			} else if (parent) {
				if (blocks.length == 1) {
					currentBlock.js.push('parent.render()');
				} else if (parent._blocks[currentBlock.name]) {
					currentBlock.js.push('_super()');
				}
			}

			i += 3;
		} else {
			currentBlock.js.push(`'${ escapeString(tmpl[i]) }'`);
			i++;
		}
	}

	Object.keys(blockMap).forEach(name => {
		let _super = parent && parent._blocks[name];
		let fn = Function('_super', `return ${ blockMap[name].js.join(' + ') };`);

		blockMap[name] = () => fn.call(this._blocks, _super);
	});

	this._fn = Function('parent', `return ${ blocks[0].js.join(' + ') };`);
}

Template.prototype.extend = function(tmpl) {
	return new Template(tmpl, this);
};

Template.prototype.render = function() {
	return this._fn.call(this._blocks, this.parent);
};

module.exports = Template;
