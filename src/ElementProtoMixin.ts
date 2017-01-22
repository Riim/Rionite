import { JS } from 'cellx';
import Component from './Component';
import defer from './Utils/defer';
import { nativeCustomElements as nativeCustomElementsFeature } from './Features';

let Symbol = JS.Symbol;

let KEY_ATTACHED = Symbol('Rionite.ElementProtoMixin.attached');

export let ElementsController = {
	skipConnectionStatusCallbacks: false
};

let ElementProtoMixin = {
	rioniteComponent: null,

	get $c(): Component {
		return new this._rioniteComponentConstructor(this);
	},

	[KEY_ATTACHED]: false,

	connectedCallback() {
		this[KEY_ATTACHED] = true;

		if (ElementsController.skipConnectionStatusCallbacks) {
			return;
		}

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
				if (this[KEY_ATTACHED]) {
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
		this[KEY_ATTACHED] = false;

		if (ElementsController.skipConnectionStatusCallbacks) {
			return;
		}

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
			let props = component.props;
			let privateName = '_' + name;

			if (props[privateName]) {
				props[privateName].set(value);
			} else if (nativeCustomElementsFeature) {
				throw new TypeError(`Cannot write to readonly property "${ privateName.slice(1) }"`);
			}
		}
	}
};

export default ElementProtoMixin;
