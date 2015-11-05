let { Map, utils: { createClass } } = require('cellx');

let Set = window.Set;

if (!Set || Set.toString().indexOf('[native code]') == -1) {
	Set = createClass({
		constructor() {
			this._entries = new Map();
			this.size = 0;
		},

		has(value) {
			return this._entries.has(value);
		},

		add(value) {
			this._entries.set(value, value);
			this.size = this._entries.size;
			return this;
		},

		delete(value) {
			if (this._entries.delete(value)) {
				this.size--;
				return true;
			}

			return false;
		},

		clear() {
			this._entries.clear();
			this.size = 0;
		},

		forEach(cb, context) {
			if (context == null) {
				context = window;
			}

			this._entries.forEach(value => {
				cb.call(context, value, value, this);
			});
		}
	});
}

module.exports = Set;
