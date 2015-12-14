let raf = window.requestAnimationFrame;

if (!raf) {
	let vendors = ['webkit', 'moz', 'ms', 'o'];

	for (let i = 0, l = vendors.length; i < l; i++) {
		raf = window[vendors[i] + 'RequestAnimationFrame'];

		if (raf) {
			break;
		}
	}

	if (!raf) {
		let targetTime = 0;

		raf = cb => {
			let currentTime = Date.now();
			let timeToCall = Math.max(1, 16 - (currentTime - targetTime));

			setTimeout(() => {
				cb(currentTime + timeToCall);
			}, timeToCall);

			targetTime = currentTime + timeToCall;
		};
	}
}

module.exports = raf;
