import { defer } from '@riim/defer';
import { Cell } from 'cellx';
import { BaseComponent, IComponentElement } from './BaseComponent';
import { ComponentParams } from './ComponentParams';
import { config } from './config';
import { KEY_PARAM_VALUES, KEY_PARAMS_CONFIG } from './Constants';
import { callWithInterruptionHandling } from './lib/callWithInterruptionHandling';
import { observedAttributesFeature } from './lib/observedAttributesFeature';

// export const KEY_IS_COMPONENT_ELEMENT = Symbol('isComponentElement');
export const KEY_ELEMENT_CONNECTED = Symbol('elementConnected');

let connectionStatusCallbacksSuppressed = false;

export function suppressConnectionStatusCallbacks() {
	connectionStatusCallbacksSuppressed = true;
}

export function resumeConnectionStatusCallbacks() {
	connectionStatusCallbacksSuppressed = false;
}

export const ElementProtoMixin = {
	// [KEY_IS_COMPONENT_ELEMENT]: true,

	$component: null,

	get rioniteComponent(): BaseComponent {
		return this.$component || new this.constructor._rioniteComponentConstructor(this);
	},

	[KEY_ELEMENT_CONNECTED]: false,

	connectedCallback(this: IComponentElement) {
		this[KEY_ELEMENT_CONNECTED] = true;

		if (connectionStatusCallbacksSuppressed) {
			return;
		}

		let component = this.$component;

		if (component) {
			if (component._attached) {
				if (component._parentComponent === null) {
					component._parentComponent = undefined;

					component.elementConnected();

					try {
						callWithInterruptionHandling(component.elementMoved, component);
					} catch (err) {
						config.logError(err);
					}

					if (component._elementMovedHooks) {
						for (let elementMovedHook of component._elementMovedHooks) {
							try {
								callWithInterruptionHandling(elementMovedHook, component);
							} catch (err) {
								config.logError(err);
							}
						}
					}
				} else {
					component.elementConnected();
				}
			} else {
				component._parentComponent = undefined;

				ComponentParams.init(component);

				component.elementConnected();
				component._attach();
			}

			return;
		} else {
			component = this.rioniteComponent;

			component._parentComponent = undefined;

			if (component.parentComponent && component._parentComponent!._isReady) {
				ComponentParams.init(component);

				component.elementConnected();
				component._attach();

				return;
			}
		}

		defer(() => {
			if (!this[KEY_ELEMENT_CONNECTED]) {
				return;
			}

			let component = this.rioniteComponent;

			component._parentComponent = undefined;

			if (!component._attached && !component.parentComponent) {
				ComponentParams.init(component);

				component.elementConnected();
				component._attach();
			}
		});
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

		if (component && component._isReady) {
			let $paramConfig = (component.constructor as typeof BaseComponent)[
				KEY_PARAMS_CONFIG
			]!.get(name)!;

			if ($paramConfig.readonly) {
				if (observedAttributesFeature) {
					throw new TypeError(
						`Cannot write to readonly parameter "${$paramConfig.name}"`
					);
				}
			} else {
				let valueCell: Cell | null = component[$paramConfig.property + 'Cell'];
				let value = $paramConfig.valueСonverters!.toData(
					rawValue,
					$paramConfig.default,
					this
				);

				if (valueCell) {
					valueCell.set(value);
				} else {
					component[KEY_PARAM_VALUES].set($paramConfig.name, value);
				}
			}
		}
	}
};
