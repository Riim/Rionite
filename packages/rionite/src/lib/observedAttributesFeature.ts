let observedAttributesFeature_ = false;

window.customElements.define(
	'test-observed-attributes-feature',
	class extends HTMLElement {
		static get observedAttributes() {
			return ['test'];
		}

		attributeChangedCallback() {
			observedAttributesFeature_ = true;
		}
	}
);

document.createElement('test-observed-attributes-feature').setAttribute('test', '');

export const observedAttributesFeature = observedAttributesFeature_;
