import { BaseComponent, TListeningTarget } from '../BaseComponent';

const hasOwn = Object.prototype.hasOwnProperty;

export function Listen(
	evtType: string | symbol,
	options?: {
		target: TListeningTarget | string | Array<TListeningTarget>;
		useCapture?: boolean;
	}
) {
	return (
		target: BaseComponent,
		propertyName: string,
		propertyDesc?: PropertyDescriptor
	): void => {
		(hasOwn.call(target.constructor, 'listenings')
			? (target.constructor as typeof BaseComponent).listenings ||
			  ((target.constructor as typeof BaseComponent).listenings = [])
			: ((target.constructor as typeof BaseComponent).listenings = (
					(target.constructor as typeof BaseComponent).listenings || []
			  ).slice())
		).push({
			target: (options && options.target) || target,
			type: evtType,
			listener: (propertyDesc || Object.getOwnPropertyDescriptor(target, propertyName)!)
				.value,
			useCapture: options && options.useCapture
		});
	};
}
