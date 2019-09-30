import { BaseComponent } from '../BaseComponent';

export function Callback(
	target: BaseComponent,
	propertyName: string,
	propertyDesc?: PropertyDescriptor
): PropertyDescriptor {
	if (!propertyDesc) {
		propertyDesc = Object.getOwnPropertyDescriptor(target, propertyName);
	}
	let method = propertyDesc!.value;

	propertyDesc!.value = function(this: BaseComponent, ...args: Array<any>) {
		return this._attached ? method.call(this, ...args) : Promise.resolve();
	};

	return propertyDesc!;
}
