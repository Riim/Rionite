import { BaseComponent, callHooks } from './BaseComponent';
import { ComponentParams } from './ComponentParams';

export function attachChildComponentElements(childComponents: Array<BaseComponent>) {
	for (let component of childComponents) {
		component._parentComponent = undefined;

		ComponentParams.init(component);

		callHooks(
			[
				component.elementConnected,
				...((component.constructor as typeof BaseComponent).elementConnectedHooks || []),
				...(component._elementConnectedHooks || [])
			],
			component
		);

		component._attach();
	}
}
