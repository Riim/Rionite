let { EventEmitter, map, list, cellx, d, utils } = require('cellx');
let settings = require('./settings');
let observeDOM = require('./observeDOM');
let View = require('./View');
let { applyViews, destroyViews } = require('./dom');

let { KEY_VIEW, define: defineView } = View;

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
 *     init?: (),
 *     render?: (): string,
 *     bind?: (),
 *     dispose?: ()
 * });
 */
function view(name, description) {
	defineView(name, description);

	if (inited) {
		applyViews(document.documentElement);
	}
}

function onDocumentEvent(evt) {
	let node = evt.target;
	let attrName = 'rt-' + evt.type;
	let targets = [];

	while (true) {
		if (node.nodeType == 1 && node.hasAttribute(attrName)) {
			targets.push(node);
		}

		node = node.parentNode;

		if (!node) {
			break;
		}

		let view = node[KEY_VIEW];

		if (view) {
			for (let i = 0, l = targets.length; i < l; i++) {
				let target = targets[i];
				let handler = view[target.getAttribute(attrName)];

				if (handler) {
					handler.call(view, evt, target);
				}
			}

			break;
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
					destroyViews(node);
				}
			});

			addedNodes.forEach(node => {
				if (node.nodeType == 1) {
					applyViews(node);
				}
			});
		});

		applyViews(document.documentElement);

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
	View,
	view
};
rista.rista = rista; // for destructuring
