const dummyEl = document.createElement('div');

dummyEl.innerHTML = '<template>1</template>';
export const templateTag = !dummyEl.firstChild!.firstChild;

let nativeCustomElementsFeature = false;

function TestNativeCustomElementsFeature(self: any): HTMLElement {
	return HTMLElement.call(this, self);
}
Object.defineProperty(TestNativeCustomElementsFeature, 'observedAttributes', {
	get() {
		return ['test'];
	}
});
TestNativeCustomElementsFeature.prototype = Object.create(HTMLElement.prototype, {
	constructor: {
		configurable: true,
		enumerable: false,
		writable: true,
		value: TestNativeCustomElementsFeature
	}
});
TestNativeCustomElementsFeature.prototype.attributeChangedCallback = () => {
	nativeCustomElementsFeature = true;
};

(window as any).customElements.define(
	'test-native-custom-elements-feature',
	TestNativeCustomElementsFeature
);

const testNCEF = document.createElement('test-native-custom-elements-feature');
testNCEF.setAttribute('test', '');

export const nativeCustomElements = nativeCustomElementsFeature;
