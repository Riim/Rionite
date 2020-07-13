import { IEvent } from 'cellx';
import { BaseComponent, IPossiblyComponentElement, TEventHandler } from './BaseComponent';
import { KEY_CONTEXT } from './bindContent';
import { config } from './config';
import { InterruptError } from './lib/InterruptError';

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
					if (receiver[KEY_EVENTS]) {
						let elName = receiver[KEY_EVENTS].get(evtType);

						if (elName) {
							let events = (ownerComponent.constructor as typeof BaseComponent)
								.events!;
							let handler = events[elName][evtType as any];

							if (handler) {
								let result = handler.call(
									ownerComponent,
									evt,
									receiver[KEY_CONTEXT],
									receiver
								);

								if (result === false) {
									return;
								}

								if (result instanceof Promise) {
									result.catch((err) => {
										if (!(err instanceof InterruptError)) {
											config.logError(err);
										}
									});
								}
							}
						}
					}

					if (attrName) {
						let handler: TEventHandler | undefined =
							ownerComponent[receiver.getAttribute(attrName)!];

						if (handler) {
							let result = handler.call(
								ownerComponent,
								evt,
								receiver[KEY_CONTEXT],
								receiver
							);

							if (result === false) {
								return;
							}

							if (result instanceof Promise) {
								result.catch((err) => {
									if (!(err instanceof InterruptError)) {
										config.logError(err);
									}
								});
							}
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
