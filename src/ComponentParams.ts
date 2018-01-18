import { Symbol } from '@riim/symbol-polyfill';
import { Cell, EventEmitter } from 'cellx';
import { BaseComponent } from './BaseComponent';
import { componentParamTypeSerializerMap } from './componentParamTypeSerializerMap';

export interface IComponentParamConfig {
	property?: string;
	type?: Function;
	default?: any;
	required?: boolean;
	readonly?: boolean;
}

let KEY_IS_COMPONENT_PARAMS_INITED = Symbol('Rionite.isComponentParamsInited');

function initParam(
	component: BaseComponent,
	config: IComponentParamConfig | Function | null,
	name: string
) {
	if (config == null) {
		return;
	}

	let propertyName: string;
	let type: any = typeof config;
	let defaultValue: any;
	let required: boolean;
	let readonly: boolean;

	let isObject =
		type == 'object' &&
		((config as IComponentParamConfig).type !== undefined ||
			(config as IComponentParamConfig).default !== undefined);

	propertyName = (isObject && (config as IComponentParamConfig).property) || name;
	defaultValue = component[propertyName];

	if (defaultValue === undefined) {
		if (isObject) {
			defaultValue = (config as IComponentParamConfig).default;
		} else if (type != 'function') {
			defaultValue = config;
		}
	}

	type = isObject ? (config as IComponentParamConfig).type : config;

	if (defaultValue !== undefined && type !== eval) {
		type = typeof defaultValue;
	}

	if (isObject) {
		required = (config as IComponentParamConfig).required || false;
		readonly = (config as IComponentParamConfig).readonly || false;
	} else {
		required = readonly = false;
	}

	let typeSerializer = componentParamTypeSerializerMap.get(type);

	if (!typeSerializer) {
		throw new TypeError('Unsupported parameter type');
	}

	let el = component.element;
	let rawValue = el.getAttribute(name);

	if (rawValue === null) {
		if (required) {
			throw new TypeError(`Parameter "${name}" is required`);
		}

		if (defaultValue != null && defaultValue !== false) {
			el.setAttribute(name, typeSerializer.write(defaultValue)!);
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

		component['__setParam_' + name] = (rawValue: string | null) => {
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

					Object.defineProperty(component, propertyName + 'Cell', {
						configurable: true,
						enumerable: false,
						writable: true,
						value: valueCell
					});

					if (currentlyPulling) {
						return valueCell.get();
					}
				}

				return value;
			},

			set(val: any) {
				let rawValue = typeSerializer!.write(val, defaultValue);

				if (rawValue === null) {
					el.removeAttribute(name);
				} else {
					el.setAttribute(name, rawValue);
				}

				if (valueCell) {
					valueCell.set(val);
				} else {
					value = val;
				}
			}
		};
	}

	Object.defineProperty(component, propertyName, descriptor);
}

export let ComponentParams = {
	init(component: BaseComponent) {
		if (component[KEY_IS_COMPONENT_PARAMS_INITED]) {
			return;
		}

		component[KEY_IS_COMPONENT_PARAMS_INITED] = true;

		let config = (component.constructor as typeof BaseComponent).params;

		if (config) {
			for (let name in config) {
				initParam(component, config[name], name);
			}
		}
	}
};
