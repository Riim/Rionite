import { defer } from '@riim/defer';
import { KEY_VALUE_CELLS } from 'cellx';
import { BaseComponent, callHooks, IComponentElement } from './BaseComponent';
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
			if (component._attached) {
				if (component._parentComponent === null) {
					component._parentComponent = undefined;

					callHooks(
						[
							component.elementConnected,
							...((component.constructor as typeof BaseComponent)
								.elementConnectedHooks || []),
							...(component._elementConnectedHooks || []),
							component.elementMoved,
							...((component.constructor as typeof BaseComponent).elementMovedHooks ||
								[]),
							...(component._elementMovedHooks || [])
						],
						component
					);
				} else {
					callHooks(
						[
							component.elementConnected,
							...((component.constructor as typeof BaseComponent)
								.elementConnectedHooks || []),
							...(component._elementConnectedHooks || [])
						],
						component
					);
				}
			} else {
				component._parentComponent = undefined;

				ComponentParams.init(component);

				callHooks(
					[
						component.elementConnected,
						...((component.constructor as typeof BaseComponent).elementConnectedHooks ||
							[]),
						...(component._elementConnectedHooks || [])
					],
					component
				);

				component._attach();
			}

			return;
		} else {
			component = this.rioniteComponent;

			component._parentComponent = undefined;

			if (component.parentComponent && component._parentComponent!._isReady) {
				ComponentParams.init(component);

				callHooks(
					[
						component.elementConnected,
						...((component.constructor as typeof BaseComponent).elementConnectedHooks ||
							[]),
						...(component._elementConnectedHooks || [])
					],
					component
				);

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

				callHooks(
					[
						component.elementConnected,
						...((component.constructor as typeof BaseComponent).elementConnectedHooks ||
							[]),
						...(component._elementConnectedHooks || [])
					],
					component
				);

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

			callHooks(
				[
					component.elementDisconnected,
					...((component.constructor as typeof BaseComponent).elementDisconnectedHooks ||
						[]),
					...(component._elementDisconnectedHooks || [])
				],
				component
			);

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
