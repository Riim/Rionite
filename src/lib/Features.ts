export const reflectConstruct =
	Reflect &&
	typeof Reflect == 'object' &&
	Reflect.construct &&
	Reflect.construct.toString().indexOf('[native code]') != -1;

const templateTagContainer = document.createElement('div');
templateTagContainer.innerHTML = '<template>1</template>';

export const templateTag = !templateTagContainer.firstChild!.firstChild;

let nativeCustomElementsFeature = false;

const TestNativeCustomElementsFeature = reflectConstruct
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
	nativeCustomElementsFeature = true;
};

window.customElements.define(
	'test-native-custom-elements-feature',
	TestNativeCustomElementsFeature
);

document.createElement('test-native-custom-elements-feature').setAttribute('test', '');

export const nativeCustomElements = nativeCustomElementsFeature;
