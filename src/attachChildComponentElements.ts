import { BaseComponent } from './BaseComponent';
import { ComponentParams } from './ComponentParams';

export function attachChildComponentElements(childComponents: Array<BaseComponent>) {
	for (let childComponent of childComponents) {
		if (!childComponent._attached) {
			childComponent._parentComponent = undefined;

			ComponentParams.init(childComponent);

			childComponent.elementConnected();
			childComponent._attach();
		}
	}
}
