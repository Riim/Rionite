import { BaseComponent, IPossiblyComponentElement, TEventHandler } from './BaseComponent';
import { KEY_CONTEXT } from './bindContent';

export const KEY_DOM_EVENTS = Symbol('domEvents');

export function handleDOMEvent(evt: Event) {
	let el = evt.target as Element;

	if (el == document.body) {
		return;
	}

	let evtType = evt.type;
	let attrName = 'on-' + evtType;
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
				let handler: TEventHandler | undefined;

				if (receiver[KEY_DOM_EVENTS]) {
					let elName = receiver[KEY_DOM_EVENTS].get(evtType);

					if (elName) {
						let events = (component.constructor as typeof BaseComponent).domEvents;

						if (events && events[elName]) {
							handler = events[elName][evtType];

							if (handler) {
								if (
									handler.call(
										component,
										evt,
										receiver[KEY_CONTEXT],
										receiver
									) === false
								) {
									return;
								}

								receivers.splice(i, 1);
							}
						}
					}
				}

				handler = component[receiver.getAttribute(attrName)!];

				if (handler) {
					if (handler.call(component, evt, receiver[KEY_CONTEXT], receiver) === false) {
						return;
					}

					if (i != receivers.length && receivers[i] == receiver) {
						receivers.splice(i, 1);
					}
				}

				if (i != receivers.length && receivers[i] == receiver) {
					i++;
				}
			} while (i < receivers.length);
		}

		el = parentEl;
		parentEl = el.parentElement;
	}
}
