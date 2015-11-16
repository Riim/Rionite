let { EventEmitter, map, list, cellx, d, utils } = require('cellx');
let settings = require('./settings');
let morphElement = require('./morphElement');
let observeDOM = require('./observeDOM');
let Component = require('./Component');
let { applyComponents, destroyComponents } = require('./dom');

let { KEY_COMPONENT, defineSubclass: defineComponentSubclass } = Component;

let eventTypes = [
	'click', 'dblclick', 'mousedown', 'mouseup', 'mouseover', 'mousemove', 'mouseout',
	'dragstart', 'drag', 'dragenter', 'dragleave', 'dragover', 'drop', 'dragend',
	'keydown', 'keypress', 'keyup',
	'abort', 'error', 'resize',
	'select', 'change', 'submit', 'reset',
	'focusin', 'focusout'
];

let inited = false;

/**
 * @typesign (name: string, description: {
 *     styles?: string,
 *     blockName?: string,
 *     preinit?: (),
 *     render?: (): string,
 *     init?: (),
 *     dispose?: ()
 * });
 */
function component(name, description) {
	defineComponentSubclass(name, description);

	if (inited) {
		applyComponents(document.documentElement);
	}
}

function onDocumentEvent(evt) {
	let node = evt.target;
	let attrName = 'rt-' + evt.type;
	let targets = [];
	let component;

	while (true) {
		if (!component && node.nodeType == 1 && node.hasAttribute(attrName)) {
			targets.unshift(node);
		}

		node = node.parentNode;

		if (!node) {
			break;
		}

		if (node[KEY_COMPONENT]) {
			component = node[KEY_COMPONENT];

			for (let i = targets.length; i;) {
				let target = targets[--i];
				let handler = component[target.getAttribute(attrName)];

				if (handler) {
					handler.call(component, evt, target);
					targets.splice(i, 1);
				}
			}

			if (!targets.length) {
				break;
			}
		}
	}
}

document.addEventListener('DOMContentLoaded', function onDOMContentLoaded() {
	document.removeEventListener('DOMContentLoaded', onDOMContentLoaded);

	utils.nextTick(() => {
		eventTypes.forEach(type => {
			document.addEventListener(type, onDocumentEvent);
		});

		observeDOM((removedNodes, addedNodes) => {
			removedNodes.forEach(node => {
				if (node.nodeType == 1) {
					destroyComponents(node);
				}
			});

			addedNodes.forEach(node => {
				if (node.nodeType == 1) {
					applyComponents(node);
				}
			});
		});

		applyComponents(document.documentElement);

		inited = true;
	});
});

let rista = module.exports = {
	EventEmitter,
	map,
	list,
	cellx,
	d,
	utils,
	settings,
	morphElement,
	Component,
	component
};
rista.rista = rista; // for destructuring
