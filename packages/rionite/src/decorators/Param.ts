import { BaseComponent, IComponentParamConfig } from '../BaseComponent';

export function Param(target: any, propName: string, propDesc?: PropertyDescriptor): void;
export function Param(
	name?: string,
	config?: IComponentParamConfig | Function
): (target: Object, propName: string, propDesc?: PropertyDescriptor) => void;
export function Param(
	config?: IComponentParamConfig | Function
): (target: Object, propName: string, propDesc?: PropertyDescriptor) => void;
export function Param(
	target?: Object | string | IComponentParamConfig | Function,
	propName?: string | IComponentParamConfig | Function,
	_propDesc?: PropertyDescriptor,
	name?: string,
	config?: IComponentParamConfig | Function
): any {
	if (typeof propName != 'string') {
		if (target && typeof target != 'string') {
			config = target;
		} else {
			name = target;
			config = propName;
		}

		return (target: Object, propName: string, propDesc?: PropertyDescriptor): void =>
			(Param as any)(target, propName, propDesc, name, config);
	}

	if (!config) {
		config = {};
	} else if (typeof config == 'function') {
		config = { type: config };
	}

	config.property = propName;

	let ctor = target!.constructor as typeof BaseComponent;

	((ctor.hasOwnProperty('params') && ctor.params) || (ctor.params = {}))[
		name || propName
	] = config;
}
