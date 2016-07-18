let { utils: { nextTick } } = require('cellx');
let defer = require('./utils/defer');

let hasOwn = Object.prototype.hasOwnProperty;

let ElementProtoMixin = {
	get rioniteComponent() {
		return this.$c;
	},

	get $c() {
		return new this._rioniteComponentConstructor(this);
	},

	attachedCallback() {
		let component = this.$c;

		if (component._elementAttached.get()) {
			if (component._parentComponent === null) {
				component._parentComponent = void 0;
				component.elementMoved();
			} else {
				component._parentComponent = void 0;
			}
		} else {
			component._parentComponent = void 0;

			if (component.parentComponent) {
				if (component.ownerComponent) {
					component._elementAttached.set(true);
				}
			} else {
				nextTick(() => {
					component._parentComponent = void 0;

					if (!component.parentComponent) {
						component._elementAttached.set(true);
					}
				});
			}
		}
	},

	detachedCallback() {
		let component = this.$c;

		component._parentComponent = null;

		defer(() => {
			if (component._parentComponent === null) {
				component._elementAttached.set(false);
			}
		});
	},

	attributeChangedCallback(name, oldValue, value) {
		if (this.$c.isReady) {
			let attrs = this.$c.elementAttributes;
			let privateName = '_' + name;

			if (hasOwn.call(attrs, privateName)) {
				attrs[privateName].set(value);
			}
		}
	}
};

module.exports = ElementProtoMixin;
