import { ErrorLogger } from 'cellx';

type TQueue = Array<{ callback: () => void; context: any }>;

let queue: TQueue | null;

function run() {
	let track = queue!;

	queue = null;

	for (let item of track) {
		try {
			item.callback.call(item.context);
		} catch (err) {
			ErrorLogger.log(err);
		}
	}
}

export function defer(callback: () => void, context?: any) {
	if (queue) {
		queue.push({ callback, context });
	} else {
		queue = [{ callback, context }];
		setTimeout(run, 1);
	}
}
