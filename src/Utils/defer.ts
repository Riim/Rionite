import { ErrorLogger } from 'cellx';

type TQueue = Array<{ callback: () => void; context: any }>;

let queue: TQueue | null;

function run() {
	let track = queue as TQueue;

	queue = null;

	for (let item of track) {
		try {
			item.callback.call(item.context);
		} catch (err) {
			ErrorLogger.log(err);
		}
	}
}

export function defer(cb: () => void, context?: any) {
	if (queue) {
		queue.push({ callback: cb, context });
	} else {
		queue = [{ callback: cb, context }];
		setTimeout(run, 1);
	}
}
