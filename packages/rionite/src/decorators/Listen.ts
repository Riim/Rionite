import {
	BaseComponent,
	TComponentListeningEventType,
	TComponentListeningTarget,
	TListeningTarget
	} from '../BaseComponent';

export function Listen<T = BaseComponent>(
	evtType: TComponentListeningEventType<T>,
	options?: {
		target?: TComponentListeningTarget<T>;
		useCapture?: boolean;
	}
): any;
export function Listen<T = BaseComponent>(
	evtType: TComponentListeningEventType<T>,
	target: TComponentListeningTarget<T>,
	useCapture?: boolean
): any;
export function Listen<T = BaseComponent>(
	evtType: TComponentListeningEventType<T>,
	optionsOrTarget?:
		| {
				target?: TComponentListeningTarget<T>;
				useCapture?: boolean;
		  }
		| TComponentListeningTarget<T>,
	useCapture?: boolean
) {
	return (target: BaseComponent, methodName: string, _methodDesc?: PropertyDescriptor): void => {
		let options =
			optionsOrTarget &&
			typeof optionsOrTarget == 'object' &&
			!Array.isArray(optionsOrTarget) &&
			Object.getPrototypeOf(optionsOrTarget) === Object.prototype
				? (optionsOrTarget as {
						target?: TComponentListeningTarget;
						useCapture?: boolean;
				  })
				: null;
		let listeningTarget = options
			? options.target
			: (optionsOrTarget as TComponentListeningTarget<T>);

		if (options) {
			useCapture = options.useCapture;
		}

		let lifecycleHooks = Object.prototype.hasOwnProperty.call(
			target.constructor,
			'_lifecycleHooks'
		)
			? (target.constructor as typeof BaseComponent)._lifecycleHooks
			: ((target.constructor as typeof BaseComponent)._lifecycleHooks = ({
					__proto__: (target.constructor as typeof BaseComponent)._lifecycleHooks
			  } as any) as typeof BaseComponent._lifecycleHooks);

		(Object.prototype.hasOwnProperty.call(lifecycleHooks, 'connected')
			? lifecycleHooks.connected
			: (lifecycleHooks.connected = lifecycleHooks.connected.slice())
		).push((component: BaseComponent) => {
			let target = listeningTarget;

			if (target) {
				if (typeof target == 'function') {
					target = target.call(component, component);
				}

				if (typeof target == 'string' && target.charAt(0) == '@') {
					target = Function(`return this.${target.slice(1)};`).call(component);
				}
			} else {
				target = component;
			}

			component.listenTo(
				target as TListeningTarget,
				typeof evtType == 'function'
					? evtType.call(component, component.constructor)
					: evtType,
				component[methodName],
				component,
				useCapture
			);
		});
	};
}
