import { IEvent } from 'cellx';
import Component from './Component';

export default function onEvent(evt: IEvent | Event) {
	let node: Node | null;
	let attrName: string;
	let targetEls: Array<HTMLElement> | undefined;

	if (evt instanceof Event) {
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

		let component = (node as any).$component as Component | undefined;

		if (component && targetEls) {
			for (let targetEl of targetEls) {
				let handler = component[targetEl.getAttribute(attrName) as string];

				if (typeof handler == 'function') {
					if (handler.call(component, evt, (targetEl as any).$component || targetEl) === false) {
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
