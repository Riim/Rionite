import { IPossiblyComponentElement, TEventHandler } from './Component';

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
				let attrValue = receivers[i].getAttribute(attrName)!;
				let handler: TEventHandler | undefined;

				if (attrValue.charAt(0) == '/') {
					let events = (component.constructor as any).domEvents;

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

		if (el == document.documentElement) {
			break;
		}
	}
}
