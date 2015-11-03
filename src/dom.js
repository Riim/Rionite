let { utils: { logError } } = require('cellx');
let { KEY_VIEW, getClass: getViewClass } = require('./View');

/**
 * @typesign (el: HTMLElement): Array<HTMLElement>;
 */
function findBlocks(el) {
	let blocks = [];

	if (el.hasAttribute('rt-view')) {
		blocks.push(el);
	}

	blocks.push.apply(blocks, el.querySelectorAll('[rt-view]'));

	return blocks;
}

/**
 * @typesign (el: HTMLElement);
 */
function initViews(el) {
	let blocks = findBlocks(el);

	for (let i = 0, l = blocks.length; i < l; i++) {
		let block = blocks[i];

		if (!block[KEY_VIEW]) {
			let viewClass = getViewClass(block.getAttribute('rt-view'));

			if (viewClass) {
				try {
					new viewClass(block);
				} catch (err) {
					logError(err);
				}
			}
		}
	}
}

/**
 * @typesign (el: HTMLElement);
 */
function destroyViews(el) {
	let blocks = findBlocks(el);

	for (let i = 0, l = blocks.length; i < l; i++) {
		let view = blocks[i][KEY_VIEW];

		if (view) {
			view.destroy();
		}
	}
}

module.exports = {
	initViews,
	destroyViews
};
