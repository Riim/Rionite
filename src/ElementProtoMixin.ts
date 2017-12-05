import { defer } from '@riim/defer';
import { Container } from '@riim/di';
import { Symbol } from '@riim/symbol-polyfill';
import { BaseComponent, IComponentElement } from './BaseComponent';
import { ComponentParams, KEY_IS_COMPONENT_PARAMS_INITED } from './ComponentParams';
import { nativeCustomElements as nativeCustomElementsFeature } from './lib/Features';

export let KEY_IS_ELEMENT_CONNECTED = Symbol('Rionite.isElementConnected');

let isConnectionStatusCallbacksSuppressed = false;

export function suppressConnectionStatusCallbacks() {
	isConnectionStatusCallbacksSuppressed = true;
}

export function resumeConnectionStatusCallbacks() {
	isConnectionStatusCallbacksSuppressed = false;
}

export let ElementProtoMixin = {
	rioniteComponent: null,

	get $component(): BaseComponent {
		return (
			this.rioniteComponent ||
			Container.get(this.constructor._rioniteComponentConstructor, [this])
		);
	},

	[KEY_IS_ELEMENT_CONNECTED]: false,

	connectedCallback(this: IComponentElement) {
		(this as any)[KEY_IS_ELEMENT_CONNECTED] = true;

		if (isConnectionStatusCallbacksSuppressed) {
			return;
		}

		let component = this.rioniteComponent;

		if (component) {
			if (!(component as any)[KEY_IS_COMPONENT_PARAMS_INITED]) {
				ComponentParams.init(component);
			}

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
				if ((this as any)[KEY_IS_ELEMENT_CONNECTED]) {
					let component = this.$component;

					component._parentComponent = undefined;

					if (!component.parentComponent && !component._attached) {
						if (!(component as any)[KEY_IS_COMPONENT_PARAMS_INITED]) {
							ComponentParams.init(component);
						}

						component.elementConnected();
						component._attach();
					}
				}
			});
		}
	},

	disconnectedCallback(this: IComponentElement) {
		(this as any)[KEY_IS_ELEMENT_CONNECTED] = false;

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
			let methodName = '__setParam_' + name;

			if ((component as any)[methodName]) {
				(component as any)[methodName](value);
			} else if (nativeCustomElementsFeature) {
				throw new TypeError(`Cannot write to readonly parameter "${name}"`);
			}
		}
	}
};
