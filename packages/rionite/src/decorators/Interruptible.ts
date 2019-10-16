import { InterruptError } from '../lib/InterruptError';

export function Interruptible(
	target: Object,
	methodName: string,
	methodDesc?: PropertyDescriptor
): PropertyDescriptor {
	if (!methodDesc) {
		methodDesc = Object.getOwnPropertyDescriptor(target, methodName);
	}
	let method = methodDesc!.value;

	methodDesc!.value = function(...args: Array<any>) {
		let result: Promise<any> = method.call(this, ...args);

		result.catch(err => {
			if (!(err instanceof InterruptError)) {
				throw err;
			}
		});

		return result;
	};

	return methodDesc!;
}
