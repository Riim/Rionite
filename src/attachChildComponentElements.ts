import { BaseComponent } from './BaseComponent';
import { ComponentParams, KEY_IS_COMPONENT_PARAMS_INITED } from './ComponentParams';

export function attachChildComponentElements(childComponents: Array<BaseComponent>) {
	for (let childComponent of childComponents) {
		if (!childComponent._attached) {
			childComponent._parentComponent = undefined;

			if (!(childComponent as any)[KEY_IS_COMPONENT_PARAMS_INITED]) {
				ComponentParams.init(childComponent);
			}

			childComponent.elementConnected();
			childComponent._attach();
		}
	}
}
