import { JS } from 'cellx';
import Component from './Component';
import defer from './Utils/defer';

let Symbol = JS.Symbol;

let attached = Symbol('Rionite.ElementProtoMixin.attached');

let ElementProtoMixin = {
	rioniteComponent: null,

	get $c(): Component {
		return new this._rioniteComponentConstructor(this);
	},

	[attached]: false,

	connectedCallback() {
		this[attached] = true;

		let component = this.rioniteComponent as Component;

		if (component) {
			if (component.isElementAttached) {
				if (component._parentComponent === null) {
					component._parentComponent = undefined;
					component.elementMoved();
				}
			} else {
				component._parentComponent = undefined;
				component.isElementAttached = true;
				component._attachElement();
			}
		} else {
			defer(function() {
				if (this[attached]) {
					let component = this.$c;

					component._parentComponent = undefined;

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

		let component = this.rioniteComponent as Component;

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

	attributeChangedCallback(name: string, oldValue: string | null, value: string | null) {
		let component = this.rioniteComponent as Component;

		if (component && component.isReady) {
			component.elementAttributes['_' + name].set(value);
		}
	}
};

export default ElementProtoMixin;
