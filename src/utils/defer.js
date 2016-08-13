let { ErrorLogger } = require('cellx');

let queue;

function run(): void {
	let track = queue;

	queue = null;

	for (let i = 0, l = track.length; i < l; i++) {
		let item = track[i];

		try {
			item.callback.call(item.context);
		} catch (err) {
			ErrorLogger.log(err);
		}
	}
}

function defer(cb: Function, context?): void {
	if (queue) {
		queue.push({ callback: cb, context });
	} else {
		queue = [{ callback: cb, context }];
		setTimeout(run, 1);
	}
}

module.exports = defer;
