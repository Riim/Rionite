import { config } from '../config';
import { InterruptError } from './InterruptError';

export function callWithInterruptionHandling(fn: Function, context: object) {
	let result: Promise<any> | void = fn.call(context);

	if (result instanceof Promise) {
		result.catch(err => {
			if (!(err instanceof InterruptError)) {
				config.logError(err);
			}
		});
	}
}
