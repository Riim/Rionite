import { Set } from '@riim/map-set-polyfill';
import { Component } from './Component';
import { TComponentParamConfig } from './ComponentParams';
import { toLowerCase } from './lib/toLowerCase';

let types = new Set([Boolean, Number, String, Object]);

let reFirstWord = /^[0-9A-Z]+?(?=[0-9A-Z]?[a-z])/;

export function ComponentParamDecorator(
	target: Object,
	propertyName: string,
	propertyDesc?: PropertyDescriptor
): void;
export function ComponentParamDecorator(
	name?: string,
	config?: TComponentParamConfig
): (target: Object, propertyName: string, propertyDesc?: PropertyDescriptor) => void;
export function ComponentParamDecorator(
	config?: TComponentParamConfig
): (target: Object, propertyName: string, propertyDesc?: PropertyDescriptor) => void;
export function ComponentParamDecorator(
	target?: Object | string | TComponentParamConfig,
	propertyName?: string | TComponentParamConfig,
	propertyDesc?: PropertyDescriptor,
	name?: string,
	config?: TComponentParamConfig
): any {
	if (typeof propertyName != 'string') {
		if (target && typeof target != 'string') {
			config = target;
		} else {
			name = target;
			config = propertyName;
		}

		return (target: Object, propertyName: string, propertyDesc?: PropertyDescriptor): void =>
			(ComponentParamDecorator as any)(target, propertyName, propertyDesc, name, config);
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

	let constr = target!.constructor as typeof Component;

	(constr.hasOwnProperty('params') ? constr.params! : (constr.params = {}))[
		(name ||
			(propertyName.length <= 5 || propertyName.lastIndexOf('param', 0)
				? propertyName
				: propertyName.slice(5).replace(reFirstWord, toLowerCase))) as string
	] = config;
}
