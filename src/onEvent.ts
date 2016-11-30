import cellx = require('cellx');
import Component from './Component';

export default function onEvent(evt: cellx.IEvent | Event) {
	let node: Node;
	let attrName: string;
	let targetEls: Array<Element> | undefined;

	if (evt instanceof Event) {
		node = evt.target as Node;
		attrName = 'rt-' + evt.type;
	} else {
		node = (evt.target as Component).element;
		attrName = 'rt-component-' + evt.type;
	}

	for (;;) {
		if (node.nodeType == 1 && (node as Element).hasAttribute(attrName)) {
			(targetEls || (targetEls = [])).push(node as Element);
		}

		node = node.parentNode;

		if (!node) {
			break;
		}

		let component = (node as any).$c as Component | undefined;

		if (component && targetEls) {
			for (let i = 0, l = targetEls.length; i < l; i++) {
				let targetEl = targetEls[i] as Element;
				let handler = component[targetEl.getAttribute(attrName) as string];

				if (typeof handler == 'function') {
					if (handler.call(component, evt, (targetEl as any).$c || targetEl) === false) {
						(evt as cellx.IEvent).isPropagationStopped = true;
						return;
					}

					if ((evt as cellx.IEvent).isPropagationStopped) {
						return;
					}
				}
			}
		}
	}
}
