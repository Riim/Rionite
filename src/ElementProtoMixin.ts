import KEY_ELEMENT_CONNECTED from './KEY_ELEMENT_CONNECTED';
import { IComponentElement, default as Component } from './Component';
import defer from './Utils/defer';
import { nativeCustomElements as nativeCustomElementsFeature } from './Features';

export let ElementsController = {
	skipConnectionStatusCallbacks: false
};

let ElementProtoMixin = {
	rioniteComponent: null,

	get $component(): Component {
		return new this.constructor._rioniteComponentConstructor(this);
	},

	[KEY_ELEMENT_CONNECTED]: false,

	connectedCallback(this: IComponentElement) {
		this[KEY_ELEMENT_CONNECTED] = true;

		if (ElementsController.skipConnectionStatusCallbacks) {
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

		if (ElementsController.skipConnectionStatusCallbacks) {
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
			let props = component.props;
			let privateName = '_' + name;

			if (props[privateName]) {
				props[privateName](value);
			} else if (nativeCustomElementsFeature) {
				throw new TypeError(`Cannot write to readonly property "${ name }"`);
			}
		}
	}
};

export default ElementProtoMixin;
