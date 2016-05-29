let { js: { Symbol } } = require('cellx');
let morphElement = require('morph-element');
let renderInner = require('./renderInner');

let KEY_LAST_APPLIED_ATTRIBUTES = Symbol('lastAppliedAttributes');

function morphComponentElement(component, toEl) {
	morphElement(component.element, toEl, {
		contentOnly: true,

		getElementAttributes(el) {
			return el[KEY_LAST_APPLIED_ATTRIBUTES] || el.attributes;
		},

		onBeforeMorphElementContent(el, toEl) {
			let component = el.ristaComponent;

			if (component) {
				el[KEY_LAST_APPLIED_ATTRIBUTES] = toEl.attributes;

				if (component.template || component.renderInner !== renderInner) {
					component.props.contentSourceElement = toEl;
					return false;
				}
			}
		}
	});
}

module.exports = morphComponentElement;
