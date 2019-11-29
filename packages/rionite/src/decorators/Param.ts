import { BaseComponent, IComponentParamConfig } from '../BaseComponent';

export function Param(
	target: Object,
	propertyName: string,
	propertyDesc?: PropertyDescriptor
): void;
export function Param(
	name?: string,
	config?: IComponentParamConfig | Function
): (target: Object, propertyName: string, propertyDesc?: PropertyDescriptor) => void;
export function Param(
	config?: IComponentParamConfig | Function
): (target: Object, propertyName: string, propertyDesc?: PropertyDescriptor) => void;
export function Param(
	target?: Object | string | IComponentParamConfig | Function,
	propertyName?: string | IComponentParamConfig | Function,
	_propertyDesc?: PropertyDescriptor,
	name?: string,
	config?: IComponentParamConfig | Function
): any {
	if (typeof propertyName != 'string') {
		if (target && typeof target != 'string') {
			config = target;
		} else {
			name = target;
			config = propertyName;
		}

		return (target: Object, propertyName: string, propertyDesc?: PropertyDescriptor): void =>
			(Param as any)(target, propertyName, propertyDesc, name, config);
	}

	if (!config) {
		config = {};
	} else if (typeof config == 'function') {
		config = { type: config };
	}

	config.property = propertyName;

	let ctor = target!.constructor as typeof BaseComponent;

	((ctor.hasOwnProperty('params') && ctor.params) || (ctor.params = {}))[
		name || propertyName
	] = config;
}
