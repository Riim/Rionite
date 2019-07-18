import { IEvent } from 'cellx';
import { BaseComponent, IPossiblyComponentElement, TEventHandler } from './BaseComponent';
import { KEY_CONTEXT } from './bindContent';

// export const KEY_EVENTS = Symbol('events');

const componentStack: Array<[BaseComponent, Array<Element> | null]> = [];

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

	componentStack.length = 0;

	let attrName = 'oncomponent-' + (evt.type as string);
	let receivers: Array<Element> | null | undefined;

	for (let component: BaseComponent | null | undefined; ; ) {
		if (el.hasAttribute(attrName)) {
			(receivers || (receivers = [])).push(el);
		}

		if (parentEl == ownerComponent.element) {
			if (receivers) {
				for (let receiver of receivers) {
					let handlerName = receiver.getAttribute(attrName)!;
					let handler: TEventHandler | undefined;

					if (handlerName.charAt(0) == ':') {
						let events = (ownerComponent.constructor as typeof BaseComponent).events!;

						if (receiver == targetEl) {
							handler = events[handlerName.slice(1)][evt.type as string];
						} else {
							let elementBlockNames = (target.constructor as typeof BaseComponent)
								._elementBlockNames;

							for (let j = 0, m = elementBlockNames.length; j < m; j++) {
								let typedHandler =
									events[handlerName.slice(1)][
										`<${elementBlockNames[j]}>` + (evt.type as string)
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

							handler = events[handlerName.slice(1)]['<*>' + (evt.type as string)];
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

			if (!componentStack.length) {
				break;
			}

			el = parentEl;
			parentEl = el.parentElement;

			if (!parentEl) {
				break;
			}

			[ownerComponent, receivers] = componentStack.pop()!;
		} else {
			el = parentEl;
			parentEl = el.parentElement;

			if (!parentEl) {
				break;
			}

			component = (el as IPossiblyComponentElement).$component;

			if (component && component.ownerComponent != ownerComponent) {
				componentStack.push([ownerComponent, receivers || null]);
				ownerComponent = component.ownerComponent;
				receivers = null;
			}
		}
	}
}
