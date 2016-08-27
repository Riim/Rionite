let { js: { Symbol } } = require('cellx');
let defer = require('./utils/defer');

let hasOwn = Object.prototype.hasOwnProperty;

let attached = Symbol('attached');

let ElementProtoMixin = {
	rioniteComponent: null,

	get $c() {
		return new this._rioniteComponentConstructor(this);
	},

	[attached]: false,

	connectedCallback() {
		this[attached] = true;

		let component = this.rioniteComponent;

		if (component) {
			if (component.isElementAttached) {
				if (component._parentComponent === null) {
					component._parentComponent = void 0;
					component.elementMoved();
				}
			} else {
				component._parentComponent = void 0;
				component.isElementAttached = true;
				component._attachElement();
			}
		} else {
			defer(function() {
				if (this[attached]) {
					let component = this.$c;

					component._parentComponent = void 0;

					if (!component.parentComponent) {
						component.isElementAttached = true;
						component._attachElement();
					}
				} 
			}, this);
		}
	},

	disconnectedCallback() {
		this[attached] = false;

		let component = this.rioniteComponent;

		if (component && component.isElementAttached) {
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
