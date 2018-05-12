import { IEvent } from 'cellx';
import { BaseComponent, IPossiblyComponentElement, TEventHandler } from './BaseComponent';
import { KEY_CONTEXT } from './bindContent';

const stack: Array<[BaseComponent, Array<Element> | undefined]> = [];

export function handleEvent(evt: IEvent<BaseComponent>) {
	let target = evt.target;
	let ownerComponent = target.ownerComponent;

	if (target == ownerComponent) {
		return;
	}

	let targetEl: Element = target.element;
	let el = targetEl;
	let parentEl = el.parentElement;

	if (!parentEl) {
		return;
	}

	stack.length = 0;

	let attrName = 'oncomponent-' + evt.type;
	let ownerComponentEl = ownerComponent.element;
	let receivers: Array<Element> | undefined;

	for (let component: BaseComponent | undefined; ; ) {
		if (el.hasAttribute(attrName)) {
			(receivers || (receivers = [])).push(el);
		}

		if (parentEl == ownerComponentEl) {
			if (receivers) {
				for (let i = 0, l = receivers.length; i < l; i++) {
					let receiver = receivers[i];
					let handlerName = receiver.getAttribute(attrName)!;
					let handler: TEventHandler | undefined;

					if (handlerName.charAt(0) == ':') {
						let events = (ownerComponent.constructor as typeof BaseComponent).events!;

						if (receiver == targetEl) {
							handler = events[handlerName.slice(1)][evt.type];
						} else {
							let elementBlockNames = (target.constructor as typeof BaseComponent)
								._elementBlockNames;

							for (let j = 0, m = elementBlockNames.length; j < m; j++) {
								let typedHandler =
									events[handlerName.slice(1)][
										`<${elementBlockNames[j]}>` + evt.type
									];

								if (
									typedHandler &&
									typedHandler.call(
										ownerComponent,
										evt,
										receiver[KEY_CONTEXT],
										receiver
									) === false
								) {
									return;
								}
							}

							handler = events[handlerName.slice(1)]['<*>' + evt.type];
						}
					} else {
						handler = ownerComponent[handlerName];
					}

					if (
						handler &&
						handler.call(ownerComponent, evt, receiver[KEY_CONTEXT], receiver) === false
					) {
						return;
					}
				}
			}

			if (!stack.length) {
				break;
			}

			el = parentEl;
			parentEl = el.parentElement;

			if (!parentEl) {
				break;
			}

			[ownerComponent, receivers] = stack.pop()!;
			ownerComponentEl = ownerComponent.element;
		} else {
			el = parentEl;
			parentEl = el.parentElement;

			if (!parentEl) {
				break;
			}

			component = (el as IPossiblyComponentElement).$component;

			if (component && component.ownerComponent != ownerComponent) {
				stack.push([ownerComponent, receivers]);
				ownerComponent = component.ownerComponent;
				ownerComponentEl = ownerComponent.element;
				receivers = undefined;
			}
		}
	}
}
