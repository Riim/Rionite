import { Set } from '@riim/map-set-polyfill';
import { Component } from './Component';
import { TComponentParamConfig } from './ComponentParams';
import { toLowerCase } from './lib/toLowerCase';

let types = new Set([Boolean, Number, String, Object]);

let reFirstWord = /^[0-9A-Z]+?(?=[0-9A-Z]?[a-z])/;

export function ComponentParamDecorator(
	name?: string,
	config?: TComponentParamConfig
): (target: Object, propertyName: string, propertyDesc?: PropertyDescriptor) => void;
export function ComponentParamDecorator(
	config?: TComponentParamConfig
): (target: Object, propertyName: string, propertyDesc?: PropertyDescriptor) => void;
export function ComponentParamDecorator(
	name?: string | TComponentParamConfig,
	config?: TComponentParamConfig
) {
	if (name && typeof name != 'string') {
		config = name;
		name = undefined;
	}

	if (!config) {
		config = {};
	} else if (typeof config == 'function') {
		config = { type: config };
	}

	return (target: Object, propertyName: string, propertyDesc?: PropertyDescriptor) => {
		(config as any).property = propertyName;

		if (!(config as any).type) {
			let type = (Reflect as any).getMetadata('design:type', target, propertyName);
			(config as any).type = types.has(type) ? type : Object;
		}

		let constr = target.constructor as typeof Component;

		(constr.hasOwnProperty('params') ? constr.params! : (constr.params = {}))[
			(name ||
				(propertyName.length <= 5 || propertyName.lastIndexOf('param', 0)
					? propertyName
					: propertyName.slice(5).replace(reFirstWord, toLowerCase))) as string
		] = config as any;
	};
}
