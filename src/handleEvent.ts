import { IEvent } from 'cellx';
import { Component, IPossiblyComponentElement, TEventHandler } from './Component';

export function handleEvent(evt: IEvent | Event, stopElement: Element) {
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
		eventsName = 'events';
	}

	for (; ; ) {
		let parentEl: Element | null = el.parentNode as Element | null;

		if (!parentEl || parentEl == stopElement) {
			break;
		}

		if (el.hasAttribute(attrName)) {
			(receivers || (receivers = [])).push(el);
		}

		el = parentEl;

		let component = (el as IPossiblyComponentElement).$component;

		if (component && receivers && receivers.length) {
			for (let i = 0; ; ) {
				let attrValue = receivers[i].getAttribute(attrName)!;
				let handler: TEventHandler<Component> | undefined;

				if (attrValue.charAt(0) == ':') {
					let events = (component.constructor as any)[eventsName];

					if (events) {
						events = events[attrValue.slice(1)];

						if (events) {
							handler = events[evt.type];
						}
					}
				} else {
					handler = (component as any)[attrValue];
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
