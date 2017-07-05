import { IEvent } from 'cellx';
import { IPossiblyComponentElement, TEventHandler2, IComponentEvents2, default as Component } from './Component';

export default function handleEvent(evt: IEvent | Event, stopElement: Element) {
	let el: Element | null;
	let attrName: string;
	let receivers: Array<Element> | undefined;
	let eventsName: string;

	if (evt instanceof Event) {
		el = evt.target as Element;
		attrName = 'on-' + evt.type;
		eventsName = 'domEvents';
	} else {
		el = (evt.target as Component).element;
		attrName = 'oncomponent-' + evt.type;
		eventsName = 'events2';
	}

	for (;;) {
		if (el.hasAttribute(attrName)) {
			(receivers || (receivers = [])).push(el);
		}

		el = el.parentNode as Element;

		if (!el || el == stopElement) {
			break;
		}

		let component = (el as IPossiblyComponentElement).$component;

		if (component && receivers && receivers.length) {
			for (let i = 0; ;) {
				let attrValue = receivers[i].getAttribute(attrName) as string;
				let handler: TEventHandler2<Component> | undefined;

				if (attrValue.charAt(0) == ':') {
					handler = ((component.constructor as typeof Component)[eventsName] as IComponentEvents2<Component>)
						[attrValue.slice(1)][evt.type];
				} else {
					handler = component[attrValue];
				}

				if (handler) {
					if (handler.call(component, evt, receivers[i]) === false) {
						return;
					}

					receivers.splice(i, 1);
				} else {
					i++;
				}

				if (i == receivers.length) {
					break;
				}
			}
		}
	}
}
