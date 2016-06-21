let { js: { Symbol } } = require('cellx');
let morphElement = require('morph-element');

let KEY_PREV_APPLIED_ATTRIBUTES = Symbol('prevAppliedAttributes');

function morphComponentElement(component, toEl, ownerComponent) {
	if (!ownerComponent) {
		ownerComponent = component;
	}

	morphElement(component.element, toEl, {
		contentOnly: true,

		getElementAttributes(el) {
			return el[KEY_PREV_APPLIED_ATTRIBUTES] || el.attributes;
		},

		onBeforeMorphElementContent(el, toEl) {
			let component = el.ristaComponent;

			if (component) {
				el[KEY_PREV_APPLIED_ATTRIBUTES] = toEl.attributes;

				component.ownerComponent = ownerComponent;

				if (component.shouldElementUpdate()) {
					component.props.contentSourceElement = toEl;
					return false;
				}
			}
		}
	});
}

module.exports = morphComponentElement;
