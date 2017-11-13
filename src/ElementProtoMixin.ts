import { defer } from '@riim/defer';
import { Container } from '@riim/di';
import { Component, IComponentElement } from './Component';
import { nativeCustomElements as nativeCustomElementsFeature } from './Features';
import { KEY_ELEMENT_CONNECTED } from './KEY_ELEMENT_CONNECTED';

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
		return (
			this.rioniteComponent ||
			Container.get(this.constructor._rioniteComponentConstructor, [this])
		);
	},

	[KEY_ELEMENT_CONNECTED]: false,

	connectedCallback(this: IComponentElement) {
		(this as any)[KEY_ELEMENT_CONNECTED] = true;

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
			defer(() => {
				if ((this as any)[KEY_ELEMENT_CONNECTED]) {
					let component = this.$component;

					component._parentComponent = undefined;

					if (!component.parentComponent && !component._attached) {
						component.elementConnected();
						component._attach();
					}
				}
			});
		}
	},

	disconnectedCallback(this: IComponentElement) {
		(this as any)[KEY_ELEMENT_CONNECTED] = false;

		if (isConnectionStatusCallbacksSuppressed) {
			return;
		}

		let component = this.rioniteComponent;

		if (component && component._attached) {
			component._parentComponent = null;

			component.elementDisconnected();

			defer(() => {
				if (component!._parentComponent === null && component!._attached) {
					component!._detach();
				}
			});
		}
	},

	attributeChangedCallback(
		this: IComponentElement,
		name: string,
		prev: string | null,
		value: string | null
	) {
		let component = this.rioniteComponent;

		if (component && component.isReady) {
			let inputs = component.inputs;
			let privateName = '_' + name;

			if (inputs[privateName]) {
				inputs[privateName](value);
			} else if (nativeCustomElementsFeature) {
				throw new TypeError(`Cannot write to readonly input property "${name}"`);
			}
		}
	}
};
