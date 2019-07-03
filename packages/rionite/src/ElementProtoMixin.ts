import { defer } from '@riim/defer';
import { Cell } from 'cellx';
import { BaseComponent, IComponentElement } from './BaseComponent';
import { ComponentParams } from './ComponentParams';
import { KEY_PARAM_VALUES, KEY_PARAMS_CONFIG } from './Constants';

// export const KEY_IS_COMPONENT_ELEMENT = Symbol('Rionite/ElementProtoMixin[isComponentElement]');
export const KEY_ELEMENT_CONNECTED = Symbol('Rionite/ElementProtoMixin[elementConnected]');

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
			let $paramConfig = (component.constructor as typeof BaseComponent)[
				KEY_PARAMS_CONFIG
			]!.get(name)!;

			if ($paramConfig.readonly) {
				throw new TypeError(`Cannot write to readonly parameter "${$paramConfig.name}"`);
			}

			let valueCell: Cell | null = component[$paramConfig.property + 'Cell'];
			let value = $paramConfig.valueСonverters!.toData(rawValue, $paramConfig.default, this);

			if (valueCell) {
				valueCell.set(value);
			} else {
				component[KEY_PARAM_VALUES].set($paramConfig.name, value);
			}
		}
	}
};
