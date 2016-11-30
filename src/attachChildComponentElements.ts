import Component from './Component';

export default function attachChildComponentElements(childComponents: Array<Component>): void {
	for (let childComponent of childComponents) {
		if (!childComponent.isElementAttached) {
			childComponent.isElementAttached = true;
			childComponent._attachElement();
		}
	}
}
