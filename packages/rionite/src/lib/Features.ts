export const reflectConstructFeature =
	typeof Reflect == 'object' &&
	Reflect.construct &&
	Reflect.construct.toString().indexOf('[native code]') != -1;

let nativeCustomElementsFeature_ = false;

const TestNativeCustomElementsFeature = reflectConstructFeature
	? function TestNativeCustomElementsFeature(self: HTMLElement | undefined): HTMLElement {
			return Reflect.construct(HTMLElement, [self], TestNativeCustomElementsFeature);
	  }
	: function TestNativeCustomElementsFeature(self: HTMLElement | undefined): HTMLElement {
			return HTMLElement.call(this, self);
	  };

Object.defineProperty(TestNativeCustomElementsFeature, 'observedAttributes', {
	get() {
		return ['test'];
	}
});

TestNativeCustomElementsFeature.prototype = Object.create(HTMLElement.prototype);
TestNativeCustomElementsFeature.prototype.constructor = TestNativeCustomElementsFeature;

TestNativeCustomElementsFeature.prototype.attributeChangedCallback = () => {
	nativeCustomElementsFeature_ = true;
};

window.customElements.define(
	'test-native-custom-elements-feature',
	TestNativeCustomElementsFeature
);

document.createElement('test-native-custom-elements-feature').setAttribute('test', '');

export const nativeCustomElementsFeature = nativeCustomElementsFeature_;
