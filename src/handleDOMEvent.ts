import { BaseComponent, IPossiblyComponentElement, TEventHandler } from './BaseComponent';
import { KEY_CONTEXT } from './bindContent';

export function handleDOMEvent(evt: Event) {
	let attrName = 'on-' + evt.type;
	let el = evt.target as Element;
	let parentEl = el.parentElement;
	let receivers: Array<Element> | undefined;

	while (parentEl) {
		if (el.hasAttribute(attrName)) {
			(receivers || (receivers = [])).push(el);
		}

		let component = (parentEl as IPossiblyComponentElement).$component;

		if (component && receivers && receivers.length) {
			for (let i = 0; ; ) {
				let receiver = receivers[i];
				let handlerName = receiver.getAttribute(attrName)!;
				let handler: TEventHandler | undefined =
					handlerName.charAt(0) == ':'
						? (component.constructor as typeof BaseComponent).domEvents![
								handlerName.slice(1)
						  ][evt.type]
						: component[handlerName];

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

		if (parentEl == document.body) {
			break;
		}

		el = parentEl;
		parentEl = el.parentElement;
	}
}
