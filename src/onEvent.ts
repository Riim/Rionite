import { IEvent } from 'cellx';
import { IPossiblyComponentElement, default as Component } from './Component';

export default function onEvent(evt: IEvent | Event) {
	let isNativeEvent = evt instanceof Event;
	let node: Node | null = isNativeEvent ? evt.target as Node : (evt.target as Component).element;
	let attrName = (isNativeEvent ? 'rt-' : 'rt-component-') + evt.type;
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

		if (component && targetEls) {
			for (let targetEl of targetEls) {
				let handler = component[targetEl.getAttribute(attrName) as string];

				if (typeof handler == 'function') {
					if (isNativeEvent) {
						handler.call(component, evt, targetEl);
					} else {
						if (handler.call(component, evt, targetEl) === false) {
							(evt as IEvent).isPropagationStopped = true;
							return;
						}

						if ((evt as IEvent).isPropagationStopped) {
							return;
						}
					}
				}
			}
		}
	}
}
