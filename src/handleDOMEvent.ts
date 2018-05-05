import { BaseComponent, IPossiblyComponentElement, TEventHandler } from './BaseComponent';
import { KEY_CONTEXT } from './bindContent';

export function handleDOMEvent(evt: Event) {
	let el = evt.target as Element;
	let attrName = 'on-' + evt.type;
	let receivers: Array<Element> | undefined;

	while (el.parentNode) {
		if (el.hasAttribute(attrName)) {
			(receivers || (receivers = [])).push(el);
		}

		el = el.parentNode as Element;

		let component = (el as IPossiblyComponentElement).$component;

		if (component && receivers && receivers.length) {
			for (let i = 0; ; ) {
				let receiver = receivers[i];
				let attrValue = receiver.getAttribute(attrName)!;
				let handler: TEventHandler | undefined;

				if (attrValue.charAt(0) == ':') {
					let events: any = (component.constructor as typeof BaseComponent).domEvents;

					if (events) {
						events = events[attrValue.slice(1)];

						if (events) {
							handler = events[evt.type];
						}
					}
				} else {
					handler = component[attrValue];
				}

				if (handler) {
					if (handler.call(component, evt, receiver[KEY_CONTEXT], receiver) === false) {
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

		if (el == document.documentElement) {
			break;
		}
	}
}
