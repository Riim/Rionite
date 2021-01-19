import { defer } from '@riim/defer';
import { KEY_VALUE_CELLS } from 'cellx';
import { BaseComponent, callLifecycle, IComponentElement } from './BaseComponent';
import { ComponentParams } from './ComponentParams';
import { KEY_PARAM_VALUES, KEY_PARAMS_CONFIG } from './Constants';
import { observedAttributesFeature } from './lib/observedAttributesFeature';

export const KEY_RIONITE_COMPONENT_CONSTRUCTOR = Symbol('rioniteComponentConstructor');
export const KEY_ELEMENT_CONNECTED = Symbol('elementConnected');

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
		return this.$component || new this.constructor[KEY_RIONITE_COMPONENT_CONSTRUCTOR](this);
	},

	[KEY_ELEMENT_CONNECTED]: false,

	connectedCallback(this: IComponentElement) {
		this[KEY_ELEMENT_CONNECTED] = true;

		if (connectionStatusCallbacksSuppressed) {
			return;
		}

		let component = this.$component;

		if (component) {
			if (component._isConnected) {
				if (component._parentComponent === null) {
					component._parentComponent = undefined;

					callLifecycle(
						[
							...(component.constructor as typeof BaseComponent)._lifecycleHooks
								.elementConnected,
							...((component._lifecycleHooks &&
								component._lifecycleHooks.elementConnected) ||
								[]),
							component.elementConnected,

							...(component.constructor as typeof BaseComponent)._lifecycleHooks
								.elementMoved,
							...((component._lifecycleHooks &&
								component._lifecycleHooks.elementMoved) ||
								[]),
							component.elementMoved
						],
						component
					);
				} else {
					callLifecycle(
						[
							...(component.constructor as typeof BaseComponent)._lifecycleHooks
								.elementConnected,
							...((component._lifecycleHooks &&
								component._lifecycleHooks.elementConnected) ||
								[]),
							component.elementConnected
						],
						component
					);
				}
			} else {
				component._parentComponent = undefined;

				ComponentParams.init(component);

				callLifecycle(
					[
						...(component.constructor as typeof BaseComponent)._lifecycleHooks
							.elementConnected,
						...((component._lifecycleHooks &&
							component._lifecycleHooks.elementConnected) ||
							[]),
						component.elementConnected
					],
					component
				);

				component._connect();
			}

			return;
		}

		component = this.rioniteComponent;

		component._parentComponent = undefined;

		if (component.parentComponent && component._parentComponent!._isReady) {
			ComponentParams.init(component);

			callLifecycle(
				[
					...(component.constructor as typeof BaseComponent)._lifecycleHooks
						.elementConnected,
					...((component._lifecycleHooks && component._lifecycleHooks.elementConnected) ||
						[]),
					component.elementConnected
				],
				component
			);

			component._connect();

			return;
		}

		defer(() => {
			if (!this[KEY_ELEMENT_CONNECTED]) {
				return;
			}

			let component = this.rioniteComponent;

			component._parentComponent = undefined;

			if (!component._isConnected && !component.parentComponent) {
				ComponentParams.init(component);

				callLifecycle(
					[
						...(component.constructor as typeof BaseComponent)._lifecycleHooks
							.elementConnected,
						...((component._lifecycleHooks &&
							component._lifecycleHooks.elementConnected) ||
							[]),
						component.elementConnected
					],
					component
				);

				component._connect();
			}
		});
	},

	disconnectedCallback(this: IComponentElement) {
		this[KEY_ELEMENT_CONNECTED] = false;

		if (connectionStatusCallbacksSuppressed) {
			return;
		}

		let component = this.$component;

		if (component && component._isConnected) {
			component._parentComponent = null;

			callLifecycle(
				[
					...(component.constructor as typeof BaseComponent)._lifecycleHooks
						.elementDisconnected,
					...((component._lifecycleHooks &&
						component._lifecycleHooks.elementDisconnected) ||
						[]),
					component.elementDisconnected
				],
				component
			);

			defer(() => {
				if (component!._parentComponent === null && component!._isConnected) {
					component!._disconnect();
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
					throw TypeError(`Cannot write to readonly parameter "${$paramConfig.name}"`);
				}
			} else {
				let valueCell = (
					component[KEY_VALUE_CELLS] || (component[KEY_VALUE_CELLS] = new Map())
				).get($paramConfig.property);
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
