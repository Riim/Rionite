import { BaseComponent, TListeningTarget } from '../BaseComponent';

const hasOwn = Object.prototype.hasOwnProperty;

export function Listen(
	evtType: string | symbol,
	options?: {
		target?: TListeningTarget | string | Array<TListeningTarget>;
		useCapture?: boolean;
	}
): any;
export function Listen(
	evtType: string | symbol,
	target: TListeningTarget | string | Array<TListeningTarget>,
	useCapture?: boolean
): any;
export function Listen(
	evtType: string | symbol,
	optionsOrTarget?:
		| {
				target?: TListeningTarget | string | Array<TListeningTarget>;
				useCapture?: boolean;
		  }
		| TListeningTarget
		| string
		| Array<TListeningTarget>,
	useCapture?: boolean
) {
	return (
		target: BaseComponent,
		propertyName: string,
		_propertyDesc?: PropertyDescriptor
	): void => {
		let options: {
			target?: TListeningTarget | string | Array<TListeningTarget>;
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
			type: evtType,
			listener: propertyName,
			useCapture: options ? options.useCapture : useCapture
		});
	};
}
