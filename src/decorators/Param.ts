import { lowerCaseFirstWord } from '@riim/lower-case-first-word';
import { Set } from '@riim/map-set-polyfill';
import { BaseComponent, IComponentParamConfig } from '../BaseComponent';

const types = new Set([Boolean, Number, String, Object]);

const prefix = 'param';
const prefixLength = prefix.length;

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
	propertyDesc?: PropertyDescriptor,
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

	if (!config.type) {
		let type = (Reflect as any).getMetadata('design:type', target, propertyName);
		config.type = types.has(type) ? type : Object;
	}

	let constr = target!.constructor as typeof BaseComponent;

	((constr.hasOwnProperty('params') && constr.params) || (constr.params = {}))[
		(name ||
			(propertyName.length <= prefixLength || propertyName.lastIndexOf(prefix, 0)
				? propertyName
				: lowerCaseFirstWord(propertyName.slice(5)))) as string
	] = config;
}
