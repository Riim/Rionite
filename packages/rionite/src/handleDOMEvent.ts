import { BaseComponent, IPossiblyComponentElement, TEventHandler } from './BaseComponent';
import { KEY_CONTEXT } from './bindContent';

export const KEY_DOM_EVENTS = Symbol('domEvents');

export function handleDOMEvent(evt: Event) {
	if (evt.target == document.body) {
		return;
	}

	let evtType = evt.type;
	let attrName = 'on-' + evtType;
	let el = evt.target as Element;
	let parentEl = el.parentElement;
	let receivers: Array<Element> | undefined;

	while (parentEl) {
		if (parentEl == document.body) {
			return;
		}

		if ((el[KEY_DOM_EVENTS] && el[KEY_DOM_EVENTS].has(evtType)) || el.hasAttribute(attrName)) {
			(receivers || (receivers = [])).push(el);
		}

		let component = (parentEl as IPossiblyComponentElement).$component;

		if (component && receivers && receivers.length) {
			let i = 0;

			do {
				let receiver = receivers[i];
				let elName = receiver[KEY_DOM_EVENTS] && receiver[KEY_DOM_EVENTS].get(evtType);
				let events: any;
				let handler: TEventHandler | undefined;

				if (
					elName &&
					(events = (component.constructor as typeof BaseComponent).domEvents) &&
					events[elName]
				) {
					handler = events[elName][evtType];
				}

				if (!handler) {
					handler = component[receiver.getAttribute(attrName)!];
				}

				if (handler) {
					if (handler.call(component, evt, receiver[KEY_CONTEXT], receiver) === false) {
						return;
					}

					receivers.splice(i, 1);
				} else {
					i++;
				}
			} while (i < receivers.length);
		}

		el = parentEl;
		parentEl = el.parentElement;
	}
}
