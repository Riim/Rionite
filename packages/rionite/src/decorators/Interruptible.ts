import { InterruptError } from '../lib/InterruptError';

export function Interruptible(
	target: Object,
	propertyName: string,
	propertyDesc?: PropertyDescriptor
): PropertyDescriptor {
	if (!propertyDesc) {
		propertyDesc = Object.getOwnPropertyDescriptor(target, propertyName);
	}
	let method = propertyDesc!.value;

	propertyDesc!.value = function(...args: Array<any>) {
		try {
			return method.call(this, ...args);
		} catch (err) {
			if (!(err instanceof InterruptError)) {
				throw err;
			}
		}
	};

	return propertyDesc!;
}
