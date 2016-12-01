import { ErrorLogger } from 'cellx';

let queue: Array<{ callback: () => void, context: any }> | null;

function run() {
	let track = queue as Array<{ callback: () => void, context: any }>;

	queue = null;

	for (let item of track) {
		try {
			item.callback.call(item.context);
		} catch (err) {
			ErrorLogger.log(err);
		}
	}
}

export default function defer(cb: () => void, context?: any) {
	if (queue) {
		queue.push({ callback: cb, context });
	} else {
		queue = [{ callback: cb, context }];
		setTimeout(run, 1);
	}
}
