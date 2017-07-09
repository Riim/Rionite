import { Component } from './Component';

export function attachChildComponentElements(childComponents: Array<Component>) {
	for (let childComponent of childComponents) {
		if (!childComponent._attached) {
			childComponent._parentComponent = undefined;
			childComponent.elementConnected();
			childComponent._attach();
		}
	}
}
