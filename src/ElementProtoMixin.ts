import { JS } from 'cellx';
import { IComponentElement, default as Component } from './Component';
import defer from './Utils/defer';
import { nativeCustomElements as nativeCustomElementsFeature } from './Features';

let Symbol = JS.Symbol;

let KEY_CONNECTED = Symbol('Rionite.ElementProtoMixin.connected');

export let ElementsController = {
	skipConnectionStatusCallbacks: false
};

let ElementProtoMixin = {
	rioniteComponent: null,

	get $c(): Component {
		return new this.constructor._rioniteComponentConstructor(this);
	},

	[KEY_CONNECTED]: false,

	connectedCallback() {
		this[KEY_CONNECTED] = true;

		if (ElementsController.skipConnectionStatusCallbacks) {
			return;
		}

		let component = this.rioniteComponent as Component;

		if (component) {
			component.elementConnected();

			if (component._attached) {
				if (component._parentComponent === null) {
					component._parentComponent = undefined;
					component.elementMoved();
				}
			} else {
				component._parentComponent = undefined;
				component._attach();
			}
		} else {
			defer(function(this: IComponentElement) {
				if (this[KEY_CONNECTED]) {
					let component = this.$c;

					component._parentComponent = undefined;

					if (!component.parentComponent) {
						component.elementConnected();
						component._attach();
					}
				}
			}, this);
		}
	},

	disconnectedCallback() {
		this[KEY_CONNECTED] = false;

		if (ElementsController.skipConnectionStatusCallbacks) {
			return;
		}

		let component = this.rioniteComponent as Component;

		if (component && component._attached) {
			component._parentComponent = null;

			component.elementDisconnected();

			defer(() => {
				if (component._parentComponent === null && component._attached) {
					component._detach();
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
