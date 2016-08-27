export default function attachChildComponentElements(childComponents) {
	for (let i = 0, l = childComponents.length; i < l; i++) {
		let childComponent = childComponents[i];

		if (!childComponent.isElementAttached) {
			childComponent.isElementAttached = true;
			childComponent._attachElement();
		}
	}
}
