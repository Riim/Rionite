import { BaseComponent } from './BaseComponent';
import { ComponentParams } from './ComponentParams';
// import { KEY_ELEMENT_CONNECTED } from './ElementProtoMixin';

export function attachChildComponentElements(childComponents: Array<BaseComponent>) {
	for (let childComponent of childComponents) {
		// if (childComponent.element[KEY_ELEMENT_CONNECTED]) {
		childComponent._parentComponent = undefined;

		ComponentParams.init(childComponent);

		childComponent.elementConnected();
		childComponent._attach();
		// }
	}
}
