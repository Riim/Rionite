let { utils: { nextTick } } = require('cellx');
let { get: getUID } = require('./uid');

let removedNodes = {};
let addedNodes = {};

let releaseIsPlanned = false;

let listeners = [];

function registerRemovedNode(node) {
	let id = getUID(node);

	if (addedNodes[id]) {
		delete addedNodes[id];
	} else {
		removedNodes[id] = node;

		if (!releaseIsPlanned) {
			releaseIsPlanned = true;
			nextTick(release);
		}
	}
}

function registerAddedNode(node) {
	let id = getUID(node);

	if (removedNodes[id]) {
		delete removedNodes[id];
	} else {
		addedNodes[id] = node;

		if (!releaseIsPlanned) {
			releaseIsPlanned = true;
			nextTick(release);
		}
	}
}

function release() {
	releaseIsPlanned = false;

	let removedNodes_ = [];
	let addedNodes_ = [];

	for (let id in removedNodes) {
		removedNodes_.push(removedNodes[id]);
	}
	for (let id in addedNodes) {
		addedNodes_.push(addedNodes[id]);
	}

	if (removedNodes_.length || addedNodes_.length) {
		removedNodes = {};
		addedNodes = {};

		for (let i = 0, l = listeners.length; i < l; i++) {
			listeners[i](removedNodes_, addedNodes_);
		}
	}
}

/**
 * @typsign (listener: ());
 */
function observeDOM(listener) {
	listeners.push(listener);
}

let MutationObserver = window.MutationObserver || window.WebKitMutationObserver;
let docEl = document.documentElement;

if (MutationObserver) {
	document.addEventListener('DOMContentLoaded', function onDOMContentLoaded() {
		document.removeEventListener('DOMContentLoaded', onDOMContentLoaded);

		let obs = new MutationObserver(mutations => {
			for (let i = 0, l = mutations.length; i < l; i++) {
				let mutation = mutations[i];
				let removedNodes = mutation.removedNodes;
				let addedNodes = mutation.addedNodes;

				for (let i = 0, l = removedNodes.length; i < l; i++) {
					registerRemovedNode(removedNodes[i]);
				}
				for (let i = 0, l = addedNodes.length; i < l; i++) {
					registerAddedNode(addedNodes[i]);
				}
			}
		});

		obs.observe(docEl, {
			childList: true,
			subtree: true
		});
	});
} else {
	docEl.addEventListener('DOMNodeRemoved', () => { registerRemovedNode(evt.target); }, false);
	docEl.addEventListener('DOMNodeInserted', () => { registerAddedNode(evt.target); }, false);
}

module.exports = observeDOM;
