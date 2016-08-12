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

		if (component.isElementAttached) {
			if (component._parentComponent === null) {
				component._parentComponent = void 0;
				component.elementMoved();
			}
		} else {
			component._parentComponent = void 0;

			if (component.parentComponent) {
				if (component.ownerComponent) {
					component._attachElement();
				}
			} else {
				defer(() => {
					component._parentComponent = void 0;

					if (!component.parentComponent) {
						component._attachElement();
					}
				});
			}
		}
	},

	detachedCallback() {
		let component = this.$c;

		if (component.isElementAttached) {
			component._parentComponent = null;

			defer(() => {
				if (component._parentComponent === null && component.isElementAttached) {
					component.isElementAttached = false;
					component._detachElement();
				}
			});
		}
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
