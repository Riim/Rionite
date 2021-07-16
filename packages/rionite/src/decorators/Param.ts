import { BaseComponent, IComponentParamConfig } from '../BaseComponent';

export function Param(target: BaseComponent, propName: string, propDesc?: PropertyDescriptor): void;
export function Param(
	name?: string,
	config?: IComponentParamConfig | Function
): (target: BaseComponent, propName: string, propDesc?: PropertyDescriptor) => void;
export function Param(
	config?: IComponentParamConfig | Function
): (target: BaseComponent, propName: string, propDesc?: PropertyDescriptor) => void;
export function Param(
	target?: BaseComponent | string | IComponentParamConfig | Function,
	propName?: string | IComponentParamConfig | Function,
	propDesc?: PropertyDescriptor,
	name?: string,
	config?: IComponentParamConfig | Function
): any {
	if (typeof propName != 'string') {
		if (target && typeof target != 'string') {
			config = target as IComponentParamConfig | Function;
		} else {
			name = target;
			config = propName;
		}

		return (target: BaseComponent, propName: string, propDesc?: PropertyDescriptor): void =>
			(Param as any)(target, propName, propDesc, name, config);
	}

	if (!config) {
		config = {};
	} else if (typeof config == 'function') {
		config = { type: config };
	}

	config.property = propName;

	let ctor = (target as BaseComponent).constructor;

	((Object.prototype.hasOwnProperty.call(ctor, 'params') && ctor.params) || (ctor.params = {}))[
		name ?? propName
	] = config;
}
