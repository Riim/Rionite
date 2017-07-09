import { Component, IComponentElement } from './Component';
import { nativeCustomElements as nativeCustomElementsFeature } from './Features';
import { KEY_ELEMENT_CONNECTED } from './KEY_ELEMENT_CONNECTED';
import { defer } from './Utils/defer';

let isConnectionStatusCallbacksSuppressed = false;

export function suppressConnectionStatusCallbacks() {
	isConnectionStatusCallbacksSuppressed = true;
}

export function resumeConnectionStatusCallbacks() {
	isConnectionStatusCallbacksSuppressed = false;
}

export let ElementProtoMixin = {
	rioniteComponent: null,

	get $component(): Component {
		return this.rioniteComponent || new this.constructor._rioniteComponentConstructor(this);
	},

	[KEY_ELEMENT_CONNECTED]: false,

	connectedCallback(this: IComponentElement) {
		this[KEY_ELEMENT_CONNECTED] = true;

		if (isConnectionStatusCallbacksSuppressed) {
			return;
		}

		let component = this.rioniteComponent;

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
				if (this[KEY_ELEMENT_CONNECTED]) {
					let component = this.$component;

					component._parentComponent = undefined;

					if (!component.parentComponent && !component._attached) {
						component.elementConnected();
						component._attach();
					}
				}
			}, this);
		}
	},

	disconnectedCallback(this: IComponentElement) {
		this[KEY_ELEMENT_CONNECTED] = false;

		if (isConnectionStatusCallbacksSuppressed) {
			return;
		}

		let component = this.rioniteComponent;

		if (component && component._attached) {
			component._parentComponent = null;

			component.elementDisconnected();

			defer(() => {
				if ((component as Component)._parentComponent === null && (component as Component)._attached) {
					(component as Component)._detach();
				}
			});
		}
	},

	attributeChangedCallback(this: IComponentElement, name: string, oldValue: string | null, value: string | null) {
		let component = this.rioniteComponent;

		if (component && component.isReady) {
			let input = component.input;
			let privateName = '_' + name;

			if (input[privateName]) {
				input[privateName](value);
			} else if (nativeCustomElementsFeature) {
				throw new TypeError(`Cannot write to readonly input property "${ name }"`);
			}
		}
	}
};
