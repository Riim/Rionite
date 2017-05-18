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
			for (let i = 0, l = targetEls.length; i < l;) {
				let targetEl = targetEls[i];
				let handler = component[targetEl.getAttribute(attrName) as string];

				if (typeof handler == 'function') {
					if (handler.call(component, evt, targetEl) === false) {
						if (!isNativeEvent) {
							(evt as IEvent).isPropagationStopped = true;
						}

						return;
					}

					if (!isNativeEvent && (evt as IEvent).isPropagationStopped) {
						return;
					}

					targetEls.splice(i, 1);
					l--;

					continue;
				}

				i++;
			}
		}
	}
}
