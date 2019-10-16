import { BaseComponent } from '../BaseComponent';

export function Callback(
	target: BaseComponent,
	methodName: string,
	methodDesc?: PropertyDescriptor
): PropertyDescriptor {
	if (!methodDesc) {
		methodDesc = Object.getOwnPropertyDescriptor(target, methodName);
	}
	let method = methodDesc!.value;

	methodDesc!.value = function(this: BaseComponent, ...args: Array<any>) {
		return this._attached ? method.call(this, ...args) : Promise.resolve();
	};

	return methodDesc!;
}
