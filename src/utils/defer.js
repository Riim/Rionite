let { ErrorLogger } = require('cellx');

let queue;

function run(): void {
	let track = queue;

	queue = null;

	for (let i = 0, l = track.length; i < l; i++) {
		try {
			track[i]();
		} catch (err) {
			ErrorLogger.log(err);
		}
	}
}

function defer(cb: Function): void {
	if (queue) {
		queue.push(cb);
	} else {
		queue = [cb];
		setTimeout(run, 1);
	}
}

module.exports = defer;
