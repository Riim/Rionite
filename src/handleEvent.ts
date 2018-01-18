import { IEvent } from 'cellx';
import { BaseComponent, IPossiblyComponentElement, TEventHandler } from './BaseComponent';

let ownerComponentStack: Array<[BaseComponent, Array<Element> | undefined]> = [];

export function handleEvent(evt: IEvent<BaseComponent>) {
	let target = evt.target;
	let ownerComponent = target.ownerComponent;

	if (target == ownerComponent) {
		return;
	}

	let targetEl: Element = target.element;

	if (!targetEl.parentNode) {
		return;
	}

	ownerComponentStack.length = 0;

	let attrName = 'oncomponent-' + evt.type;
	let el = targetEl;
	let ownerComponentEl = ownerComponent.element;
	let receivers: Array<Element> | undefined;

	for (let component: BaseComponent | undefined; ; ) {
		if (el.hasAttribute(attrName)) {
			(receivers || (receivers = [])).push(el);
		}

		el = el.parentNode as Element;

		if (el == ownerComponentEl) {
			if (receivers) {
				for (let i = 0, l = receivers.length; i < l; i++) {
					let receiver = receivers[i];
					let attrValue = receiver.getAttribute(attrName)!;
					let handler: TEventHandler | undefined;

					if (attrValue.charAt(0) == '/') {
						if (receiver != targetEl) {
							let elementBlockNames = (target.constructor as typeof BaseComponent)
								._elementBlockNames;

							for (let i = 0, l = elementBlockNames.length; i < l; i++) {
								let typedHandler = (ownerComponent.constructor as typeof BaseComponent)
									.events![attrValue.slice(1)][
									`<${elementBlockNames[i]}>` + evt.type
								];

								if (typedHandler) {
									if (
										typedHandler &&
										typedHandler.call(ownerComponent, evt, receiver) === false
									) {
										return;
									}

									break;
								}
							}
						}

						handler = (ownerComponent.constructor as typeof BaseComponent).events![
							attrValue.slice(1)
						][(receiver == targetEl ? '' : '<*>') + evt.type];
					} else {
						handler = ownerComponent[attrValue];
					}

					if (handler && handler.call(ownerComponent, evt, receiver) === false) {
						return;
					}
				}
			}

			if (ownerComponentStack.length) {
				if (!el.parentNode) {
					break;
				}

				[ownerComponent, receivers] = ownerComponentStack.pop()!;
				ownerComponentEl = ownerComponent.element;

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
			ownerComponentEl = ownerComponent.element;
			receivers = undefined;
		}
	}
}
