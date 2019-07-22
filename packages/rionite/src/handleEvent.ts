import { IEvent } from 'cellx';
import { BaseComponent, IPossiblyComponentElement, TEventHandler } from './BaseComponent';
import { KEY_CONTEXT } from './bindContent';

export const KEY_EVENTS = Symbol('events');

const componentStack: Array<[BaseComponent, Array<Element> | null]> = [];

export function handleEvent(evt: IEvent<BaseComponent>) {
	let target = evt.target;
	let ownerComponent = target.ownerComponent;

	if (target == ownerComponent) {
		return;
	}

	let targetEl: Element = target.element;
	let el = targetEl;

	if (!el.parentElement) {
		return;
	}

	componentStack.length = 0;

	let evtType = evt.type;
	let attrName = typeof evtType == 'string' ? 'oncomponent-' + (evtType as string) : null;
	let receivers: Array<Element> | null | undefined;

	for (;;) {
		if (
			(el[KEY_EVENTS] && el[KEY_EVENTS].has(evtType)) ||
			(attrName && el.hasAttribute(attrName))
		) {
			(receivers || (receivers = [])).push(el);
		}

		if (el.parentElement == ownerComponent.element) {
			if (receivers) {
				for (let receiver of receivers) {
					let handler: TEventHandler | undefined;

					if (receiver[KEY_EVENTS]) {
						let elName = receiver[KEY_EVENTS].get(evtType);

						if (elName) {
							let events = (ownerComponent.constructor as typeof BaseComponent)
								.events!;

							if (!attrName || receiver == targetEl) {
								handler = events[elName][evtType as any];
							} else {
								let elementBlockNames = (target.constructor as typeof BaseComponent)
									._elementBlockNames;

								for (let elementBlockName of elementBlockNames) {
									let handler =
										events[elName][
											`<${elementBlockName}>` + (evtType as string)
										];

									if (
										handler &&
										handler.call(
											ownerComponent,
											evt,
											receiver[KEY_CONTEXT],
											receiver
										) === false
									) {
										return;
									}
								}

								handler = events[elName]['<*>' + (evtType as string)];
							}

							if (
								handler &&
								handler.call(
									ownerComponent,
									evt,
									receiver[KEY_CONTEXT],
									receiver
								) === false
							) {
								return;
							}
						}
					}

					if (attrName) {
						handler = ownerComponent[receiver.getAttribute(attrName)!];

						if (
							handler &&
							handler.call(ownerComponent, evt, receiver[KEY_CONTEXT], receiver) ===
								false
						) {
							return;
						}
					}
				}

				receivers.length = 0;
			}

			if (!componentStack.length) {
				break;
			}

			el = el.parentElement;

			if (!el.parentElement) {
				break;
			}

			[ownerComponent, receivers] = componentStack.pop()!;
		} else {
			el = el.parentElement;

			if (!el.parentElement) {
				break;
			}

			let component = (el as IPossiblyComponentElement).$component;

			if (component && component.ownerComponent != ownerComponent) {
				componentStack.push([ownerComponent, receivers || null]);
				ownerComponent = component.ownerComponent;
				receivers = null;
			}
		}
	}
}
