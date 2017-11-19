import { IEvent } from 'cellx';
import { Component, IPossiblyComponentElement, TEventHandler } from './Component';

let ownerComponentStack: Array<[Component, Array<Element> | undefined]> = [];

export function handleEvent(evt: IEvent<Component>) {
	let target = evt.target;
	let ownerComponent = target.ownerComponent;

	if (target == ownerComponent) {
		return;
	}

	let el: Element = target.element;

	if (!el.parentNode) {
		return;
	}

	ownerComponentStack.length = 0;

	let attrName = 'oncomponent-' + evt.type;
	let ownerComponentElement = ownerComponent.element;
	let receivers: Array<Element> | undefined;

	for (let component: Component | undefined; ; ) {
		if (el.hasAttribute(attrName)) {
			(receivers || (receivers = [])).push(el);
		}

		el = el.parentNode as Element;

		if (el == ownerComponentElement) {
			if (receivers) {
				for (let i = 0, l = receivers.length; i < l; i++) {
					let attrValue = receivers[i].getAttribute(attrName)!;
					let handler: TEventHandler | undefined;

					if (attrValue.charAt(0) == '/') {
						let events: any = (ownerComponent.constructor as typeof Component).events;

						if (events) {
							events = events[attrValue.slice(1)];

							if (events) {
								handler = events[evt.type];
							}
						}
					} else {
						handler = (ownerComponent as any)[attrValue];
					}

					if (handler && handler.call(ownerComponent, evt, receivers[i]) === false) {
						return;
					}
				}
			}

			if (ownerComponentStack.length) {
				if (!el.parentNode) {
					break;
				}

				[ownerComponent, receivers] = ownerComponentStack.pop()!;
				ownerComponentElement = ownerComponent.element;

				continue;
			} else {
				break;
			}
		}

		if (!el.parentNode) {
			break;
		}

		component = (el as IPossiblyComponentElement).$component;

		if (component && component.ownerComponent != ownerComponent) {
			ownerComponentStack.push([ownerComponent, receivers]);
			ownerComponent = component.ownerComponent;
			ownerComponentElement = ownerComponent.element;
			receivers = undefined;
		}
	}
}
