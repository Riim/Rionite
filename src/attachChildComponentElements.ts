import Component from './Component';

export default function attachChildComponentElements(childComponents: Array<Component>) {
	for (let childComponent of childComponents) {
		if (!childComponent.isElementAttached) {
			childComponent._parentComponent = undefined;
			childComponent.isElementAttached = true;
			childComponent._attachElement();
		}
	}
}
