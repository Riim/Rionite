let dummyEl = document.createElement('div');

dummyEl.innerHTML = '<template>1</template>';
export let templateTag = !(dummyEl.firstChild as HTMLElement).firstChild;

let nativeCustomElementsFeature = false;

function TestNativeCustomElementsFeatureElement(self: any) {
	return HTMLElement.call(this, self);
}
Object.defineProperty(TestNativeCustomElementsFeatureElement, 'observedAttributes', {
	get() {
		return ['test'];
	}
});
TestNativeCustomElementsFeatureElement.prototype = Object.create(HTMLElement.prototype, {
	constructor: { value: TestNativeCustomElementsFeatureElement }
});
TestNativeCustomElementsFeatureElement.prototype.attributeChangedCallback = function() {
	nativeCustomElementsFeature = true;
};

(window as any).customElements.define(
	'test-native-custom-elements-feature-element',
	TestNativeCustomElementsFeatureElement
);

let testNCEFEl = document.createElement('test-native-custom-elements-feature-element');
testNCEFEl.setAttribute('test', '');

export let nativeCustomElements = nativeCustomElementsFeature;
