import { defer } from '@riim/defer';
import { Container } from '@riim/di';
import { Symbol } from '@riim/symbol-polyfill';
import { Cell } from 'cellx';
import {
	BaseComponent,
	I$ComponentParamConfig,
	IComponentElement,
	KEY_PARAMS,
	KEY_PARAMS_CONFIG
	} from './BaseComponent';
import { ComponentParams } from './ComponentParams';
import { nativeCustomElements as nativeCustomElementsFeature } from './lib/Features';

export const KEY_IS_ELEMENT_CONNECTED = Symbol('Rionite.isElementConnected');

let isConnectionStatusCallbacksSuppressed = false;

export function suppressConnectionStatusCallbacks() {
	isConnectionStatusCallbacksSuppressed = true;
}

export function resumeConnectionStatusCallbacks() {
	isConnectionStatusCallbacksSuppressed = false;
}

export const ElementProtoMixin = {
	rioniteComponent: null,

	get $component(): BaseComponent {
		return (
			this.rioniteComponent ||
			Container.get(this.constructor._rioniteComponentConstructor, [this])
		);
	},

	[KEY_IS_ELEMENT_CONNECTED]: false,

	connectedCallback(this: IComponentElement) {
		this[KEY_IS_ELEMENT_CONNECTED] = true;

		if (isConnectionStatusCallbacksSuppressed) {
			return;
		}

		let component = this.rioniteComponent;

		if (component) {
			ComponentParams.init(component);

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
				if (this[KEY_IS_ELEMENT_CONNECTED]) {
					let component = this.$component;

					component._parentComponent = undefined;

					if (!component.parentComponent && !component._attached) {
						ComponentParams.init(component);

						component.elementConnected();
						component._attach();
					}
				}
			});
		}
	},

	disconnectedCallback(this: IComponentElement) {
		this[KEY_IS_ELEMENT_CONNECTED] = false;

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
		prevRawValue: string | null,
		rawValue: string | null
	) {
		let component = this.rioniteComponent;

		if (component && component.isReady) {
			let $paramConfig: I$ComponentParamConfig =
				component.constructor[KEY_PARAMS_CONFIG][name];

			if ($paramConfig.readonly) {
				if (nativeCustomElementsFeature) {
					throw new TypeError(
						`Cannot write to readonly parameter "${$paramConfig.name}"`
					);
				}
			} else {
				let valueCell: Cell | undefined = component[$paramConfig.property + 'Cell'];
				let value = $paramConfig.typeSerializer!.read(rawValue, $paramConfig.default);

				if (valueCell) {
					valueCell.set(value);
				} else {
					component[KEY_PARAMS].set($paramConfig.name, value);
				}
			}
		}
	}
};
