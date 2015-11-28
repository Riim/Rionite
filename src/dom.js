let { utils: { logError } } = require('cellx');
let {
	KEY_COMPONENT,
	getSubclass: getComponentSubclass,
	getSelector: getComponentSelector
} = require('./Component');

/**
 * @typesign (el: HTMLElement) -> Array<HTMLElement>;
 */
function findBlocks(el) {
	let blocks = [];

	if (el.hasAttribute('rt-is') || getComponentSubclass(el.tagName.toLowerCase())) {
		blocks.push(el);
	}

	blocks.push.apply(blocks, el.querySelectorAll(getComponentSelector()));

	return blocks;
}

/**
 * @typesign (el: HTMLElement);
 */
function applyComponents(el) {
	let blocks = findBlocks(el);

	for (let i = blocks.length; i;) {
		let block = blocks[--i];

		if (!block[KEY_COMPONENT]) {
			let componentSubclass = getComponentSubclass(block.getAttribute('rt-is') || block.tagName.toLowerCase());

			if (componentSubclass) {
				try {
					new componentSubclass(block);
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
function destroyComponents(el) {
	let blocks = findBlocks(el);

	for (let i = blocks.length; i;) {
		let component = blocks[--i][KEY_COMPONENT];

		if (component) {
			component.destroy();
		}
	}
}

module.exports = {
	applyComponents,
	destroyComponents
};
