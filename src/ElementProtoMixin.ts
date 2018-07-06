import { defer } from '@riim/defer';
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
import { Container } from './DI';
import { nativeCustomElementsFeature } from './lib/Features';

export const KEY_ELEMENT_CONNECTED = Symbol('Rionite/ElementProtoMixin[elementConnected]');

let connectionStatusCallbacksSuppressed = false;

export function suppressConnectionStatusCallbacks() {
	connectionStatusCallbacksSuppressed = true;
}

export function resumeConnectionStatusCallbacks() {
	connectionStatusCallbacksSuppressed = false;
}

export const ElementProtoMixin = {
	$component: null,

	get rioniteComponent(): BaseComponent {
		return (
			this.$component || Container.get(this.constructor._rioniteComponentConstructor, [this])
		);
	},

	[KEY_ELEMENT_CONNECTED]: false,

	connectedCallback(this: IComponentElement) {
		this[KEY_ELEMENT_CONNECTED] = true;

		if (connectionStatusCallbacksSuppressed) {
			return;
		}

		let component = this.$component;

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
				if (this[KEY_ELEMENT_CONNECTED]) {
					let component = this.rioniteComponent;

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
		this[KEY_ELEMENT_CONNECTED] = false;

		if (connectionStatusCallbacksSuppressed) {
			return;
		}

		let component = this.$component;

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
		_prevRawValue: string | null,
		rawValue: string | null
	) {
		let component = this.$component;

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
				let value = $paramConfig.typeSerializer!.read(rawValue, $paramConfig.default, this);

				if (valueCell) {
					valueCell.set(value);
				} else {
					component[KEY_PARAMS].set($paramConfig.name, value);
				}
			}
		}
	}
};
