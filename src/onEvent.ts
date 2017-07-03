import { IEvent } from 'cellx';
import { IPossiblyComponentElement, default as Component } from './Component';

export default function onEvent(evt: IEvent | Event) {
	let isNativeEvent = evt instanceof Event;
	let node: Node | null = isNativeEvent ? evt.target as Node : (evt.target as Component).element;
	let attrName = (isNativeEvent ? 'on-' : 'oncomponent-') + evt.type;
	let targetEls: Array<Element> | undefined;

	for (;;) {
		if ((node as Element).hasAttribute(attrName)) {
			(targetEls || (targetEls = [])).push(node as Element);
		}

		node = node.parentNode;

		if (!node || node == document) {
			break;
		}

		let component = (node as IPossiblyComponentElement).$component;

		if (component && targetEls && targetEls.length) {
			let i = 0;

			do {
				let targetEl = targetEls[i];
				let handler = component[targetEl.getAttribute(attrName) as string];

				if (typeof handler == 'function') {
					if (handler.call(component, evt, targetEl) === false) {
						return;
					}

					targetEls.splice(i, 1);

					continue;
				}

				i++;
			} while (i < targetEls.length);
		}
	}
}
