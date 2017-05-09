import { IEvent } from 'cellx';
import { IPossiblyComponentElement, default as Component } from './Component';

export default function onEvent(evt: IEvent | Event) {
	let isNativeEvent = evt instanceof Event;
	let node: Node | null;
	let attrName: string;
	let targetEls: Array<HTMLElement> | undefined;

	if (isNativeEvent) {
		node = evt.target as Node;
		attrName = 'rt-' + evt.type;
	} else {
		node = (evt.target as Component).element;
		attrName = 'rt-component-' + evt.type;
	}

	for (;;) {
		if (node.nodeType == Node.ELEMENT_NODE && (node as HTMLElement).hasAttribute(attrName)) {
			(targetEls || (targetEls = [])).push(node as HTMLElement);
		}

		node = node.parentNode;

		if (!node) {
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
