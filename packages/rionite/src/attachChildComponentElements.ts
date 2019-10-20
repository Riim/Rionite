import { BaseComponent } from './BaseComponent';
import { ComponentParams } from './ComponentParams';

export function attachChildComponentElements(childComponents: Array<BaseComponent>) {
	for (let component of childComponents) {
		component._parentComponent = undefined;

		ComponentParams.init(component);

		component.elementConnected();
		component._attach();
	}
}
