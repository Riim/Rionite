let { utils: { nextTick } } = require('cellx');
let Set = require('./Set');

let removedNodes = new Set();
let addedNodes = new Set();

let listeners = [];

function registerRemovedNode(node) {
	if (addedNodes.has(node)) {
		addedNodes.delete(node);
	} else {
		removedNodes.add(node);
		nextTick(release);
	}
}

function registerAddedNode(node) {
	if (removedNodes.has(node)) {
		removedNodes.delete(node);
	} else {
		addedNodes.add(node);
		nextTick(release);
	}
}

function release() {
	if (removedNodes.size || addedNodes.size) {
		for (let i = 0, l = listeners.length; i < l; i++) {
			listeners[i](removedNodes, addedNodes);
		}

		removedNodes.clear();
		addedNodes.clear();
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
	docEl.addEventListener('DOMNodeRemoved', evt => { registerRemovedNode(evt.target); }, false);
	docEl.addEventListener('DOMNodeInserted', evt => { registerAddedNode(evt.target); }, false);
}

module.exports = observeDOM;
