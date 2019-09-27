import { BaseComponent, TComponentListeningTarget, TComponentListeningType } from '../BaseComponent';

const hasOwn = Object.prototype.hasOwnProperty;

export function Listen<T = BaseComponent>(
	evtType: TComponentListeningType<T>,
	options?: {
		target?: TComponentListeningTarget<T>;
		useCapture?: boolean;
	}
): any;
export function Listen<T = BaseComponent>(
	evtType: TComponentListeningType<T>,
	target: TComponentListeningTarget<T>,
	useCapture?: boolean
): any;
export function Listen<T = BaseComponent>(
	evtType: TComponentListeningType<T>,
	optionsOrTarget?:
		| {
				target?: TComponentListeningTarget<T>;
				useCapture?: boolean;
		  }
		| TComponentListeningTarget<T>,
	useCapture?: boolean
) {
	return (
		target: BaseComponent,
		propertyName: string,
		_propertyDesc?: PropertyDescriptor
	): void => {
		let options: {
			target?: TComponentListeningTarget;
			useCapture?: boolean;
		} | null =
			optionsOrTarget &&
			typeof optionsOrTarget == 'object' &&
			!Array.isArray(optionsOrTarget) &&
			Object.getPrototypeOf(optionsOrTarget) === Object.prototype
				? (optionsOrTarget as any)
				: null;

		(hasOwn.call(target.constructor, 'listenings')
			? (target.constructor as typeof BaseComponent).listenings ||
			  ((target.constructor as typeof BaseComponent).listenings = [])
			: ((target.constructor as typeof BaseComponent).listenings = (
					(target.constructor as typeof BaseComponent).listenings || []
			  ).slice())
		).push({
			target: options ? options.target : (optionsOrTarget as any),
			type: evtType as TComponentListeningType,
			listener: propertyName,
			useCapture: options ? options.useCapture : useCapture
		});
	};
}
