"use strict";
var dummyEl = document.createElement('div');
dummyEl.innerHTML = '<template>1</template>';
exports.templateTag = !dummyEl.firstChild.firstChild;
var nativeCustomElementsFeature = false;
function TestNativeCustomElementsFeatureElement(self) {
    return HTMLElement.call(this, self);
}
Object.defineProperty(TestNativeCustomElementsFeatureElement, 'observedAttributes', {
    get: function () {
        return ['test'];
    }
});
TestNativeCustomElementsFeatureElement.prototype = Object.create(HTMLElement.prototype, {
    constructor: { value: TestNativeCustomElementsFeatureElement }
});
TestNativeCustomElementsFeatureElement.prototype.attributeChangedCallback = function () {
    nativeCustomElementsFeature = true;
};
window.customElements.define('test-native-custom-elements-feature-element', TestNativeCustomElementsFeatureElement);
var testNCEFEl = document.createElement('test-native-custom-elements-feature-element');
testNCEFEl.setAttribute('test', '');
exports.nativeCustomElements = nativeCustomElementsFeature;
