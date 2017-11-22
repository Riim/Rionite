import { hyphenize } from '@riim/hyphenize';
import { Symbol } from '@riim/symbol-polyfill';
import { Cell, EventEmitter } from 'cellx';
import { Component } from './Component';
import { componentParamTypeMap } from './componentParamTypeMap';
import { componentParamTypeSerializerMap } from './componentParamTypeSerializerMap';

export let KEY_IS_COMPONENT_PARAMS_INITED = Symbol('Rionite.isComponentParamsInited');

function initParam(component: Component, config: any, name: string) {
	if (config == null) {
		return;
	}

	let propertyName: string | undefined;
	let type: any = typeof config;
	let defaultValue: any;
	let required: boolean;
	let readonly: boolean;

	if (type == 'function') {
		type = config;
		required = readonly = false;
	} else if (type == 'object' && (config.type !== undefined || config.default !== undefined)) {
		propertyName = config.property;
		type = config.type;
		defaultValue = config.default;

		if (type === undefined) {
			type = typeof defaultValue;
		} else if (
			defaultValue !== undefined &&
			componentParamTypeMap.has(type) &&
			componentParamTypeMap.get(type) != typeof defaultValue
		) {
			throw new TypeError('Specified type does not match defaultValue type');
		}

		required = config.required;
		readonly = config.readonly;
	} else {
		defaultValue = config;
		required = readonly = false;
	}

	let typeSerializer = componentParamTypeSerializerMap.get(type);

	if (!typeSerializer) {
		throw new TypeError('Unsupported parameter type');
	}

	let el = component.element;
	let hyphenizedName = hyphenize(name, true);
	let rawValue = el.getAttribute(hyphenizedName);

	if (rawValue === null) {
		if (required) {
			throw new TypeError(`Parameter "${name}" is required`);
		}

		if (defaultValue != null && defaultValue !== false) {
			el.setAttribute(hyphenizedName, typeSerializer.write(defaultValue)!);
		}
	}

	let value = typeSerializer.read(rawValue, defaultValue);
	let descriptor: PropertyDescriptor;

	if (readonly) {
		descriptor = {
			configurable: true,
			enumerable: true,

			get() {
				return value;
			},

			set(val: any) {
				if (val !== value) {
					throw new TypeError(`Parameter "${name}" is readonly`);
				}
			}
		};
	} else {
		let valueCell: Cell | undefined;

		(component as any)['_setParam_' + hyphenizedName] = (rawValue: string | null) => {
			let val = typeSerializer!.read(rawValue, defaultValue);

			if (valueCell) {
				valueCell.set(val);
			} else {
				value = val;
			}
		};

		descriptor = {
			configurable: true,
			enumerable: true,

			get() {
				if (valueCell) {
					return valueCell.get();
				}

				let currentlyPulling = Cell.currentlyPulling;

				if (currentlyPulling || EventEmitter.currentlySubscribing) {
					valueCell = new Cell(value, { context: component });

					if (currentlyPulling) {
						return valueCell.get();
					}
				}

				return value;
			},

			set(val: any) {
				let rawValue = typeSerializer!.write(val, defaultValue);

				if (rawValue === null) {
					el.removeAttribute(hyphenizedName);
				} else {
					el.setAttribute(hyphenizedName, rawValue);
				}

				if (valueCell) {
					valueCell.set(val);
				} else {
					value = val;
				}
			}
		};
	}

	Object.defineProperty(component, propertyName || name, descriptor);
}

export let ComponentParams = {
	init(component: Component) {
		let config = (component.constructor as typeof Component).params;

		if (config) {
			for (let name in config) {
				initParam(component, config[name], name);
			}
		}
	}
};
