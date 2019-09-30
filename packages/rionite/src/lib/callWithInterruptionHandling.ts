import { config } from '../config';
import { InterruptError } from './InterruptError';

export function callWithInterruptionHandling(fn: Function, context: object) {
	let result: Promise<any> | void;

	try {
		result = fn.call(context);
	} catch (err) {
		config.logError(err);
	}

	if (result instanceof Promise) {
		result.catch(err => {
			if (!(err instanceof InterruptError)) {
				config.logError(err);
			}
		});
	}
}
