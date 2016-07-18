let RtIfThen = require('./rt-if-then');

module.exports = RtIfThen.extend('rt-if-else', {
	Static: {
		elementExtends: 'template'
	},

	_elseMode: true
});
