let { utils: { nextTick } } = require('cellx');

let hasOwn = Object.prototype.hasOwnProperty;

let ElementProtoMixin = {
	get ristaComponent() {
		return new this._ristaComponentConstr(this);
	},

	get $c() {
		return this.ristaComponent;
	},

	attachedCallback() {
		let component = this.ristaComponent;

		component._parentComponent = void 0;

		if (component.parentComponent) {
			component._elementAttached.set(true);
		} else {
			nextTick(() => {
				component._elementAttached.set(true);
			});
		}
	},

	detachedCallback() {
		let component = this.ristaComponent;
		component._parentComponent = null;
		component._elementAttached.set(false);
	},

	attributeChangedCallback(name, oldValue, value) {
		var component = this.ristaComponent;

		if (component.isReady) {
			let attrs = component.elementAttributes;
			let privateName = '_' + name;

			if (hasOwn.call(attrs, privateName)) {
				attrs[privateName].set(value);
			}
		}
	}
};

module.exports = ElementProtoMixin;
