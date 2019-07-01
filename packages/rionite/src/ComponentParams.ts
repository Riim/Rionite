import { snakeCaseAttributeName } from '@riim/rionite-snake-case-attribute-name';
import { BaseComponent, I$ComponentParamConfig, IComponentParamConfig } from './BaseComponent';
import { componentParamTypeSerializers } from './componentParamTypeSerializers';
import { KEY_PARAM_VALUES, KEY_PARAMS_CONFIG } from './Constants';

export const KEY_COMPONENT_PARAMS_INITED = Symbol('Rionite/ComponentParams[componentParamsInited]');

function initParam(
	component: BaseComponent,
	$paramConfig: I$ComponentParamConfig | null,
	name: string,
	_$specifiedParams: Map<string, string> | null
) {
	if ($paramConfig === null) {
		return;
	}

	let typeSerializer = $paramConfig.typeSerializer;
	let defaultValue: any;

	if (typeSerializer) {
		defaultValue = $paramConfig.default;
	} else {
		let paramConfig = $paramConfig.paramConfig;
		let type: any = typeof paramConfig;

		defaultValue = component[$paramConfig.property];

		let isObject =
			type == 'object' &&
			(!!(paramConfig as IComponentParamConfig).type ||
				(paramConfig as IComponentParamConfig).default !== undefined);

		if (defaultValue === undefined) {
			if (isObject) {
				defaultValue = (paramConfig as IComponentParamConfig).default;
			} else if (type != 'function') {
				defaultValue = paramConfig;
			}
		}

		type = isObject ? (paramConfig as IComponentParamConfig).type : paramConfig;

		if (defaultValue !== undefined && type !== eval) {
			type = typeof defaultValue;

			if (type == 'function') {
				type = 'object';
			}
		}

		typeSerializer = componentParamTypeSerializers.get(type);

		if (!typeSerializer) {
			throw new TypeError('Unsupported parameter type');
		}

		$paramConfig.type = type;
		$paramConfig.typeSerializer = typeSerializer;
		$paramConfig.default = defaultValue;
	}

	let el = component.element;
	let snakeCaseName = snakeCaseAttributeName(name, true);
	let rawValue: string | null | undefined;

	// if ($specifiedParams) {
	rawValue = el.getAttribute(snakeCaseName);

	// 	if (rawValue !== null) {
	// 		$specifiedParams.set(name, rawValue);
	// 	}
	// } else {
	// 	rawValue = component.$specifiedParams.get(name);

	// 	if (rawValue === undefined) {
	// 		rawValue = null;
	// 	}
	// }

	if (rawValue === null) {
		if ($paramConfig.required) {
			throw new TypeError(`Parameter "${name}" is required`);
		}

		if (defaultValue != null && defaultValue !== false) {
			el.setAttribute(snakeCaseName, typeSerializer.write(defaultValue)!);
		}
	}

	let value = typeSerializer.read(rawValue, defaultValue, el);

	if (component[$paramConfig.property + 'Cell']) {
		component[$paramConfig.property + 'Cell'].set(value);
	} else {
		component[KEY_PARAM_VALUES].set(name, value);
	}
}

export const ComponentParams = {
	init(component: BaseComponent) {
		if (component[KEY_COMPONENT_PARAMS_INITED]) {
			return;
		}

		let $specifiedParams: Map<string, string> | null;

		if (component.$specifiedParams) {
			$specifiedParams = null;
		} else {
			$specifiedParams = component.$specifiedParams = new Map();
		}

		let paramsConfig = (component.constructor as typeof BaseComponent).params;

		if (paramsConfig) {
			let $paramsConfig = (component.constructor as typeof BaseComponent)[KEY_PARAMS_CONFIG];

			for (let name in paramsConfig) {
				if (paramsConfig[name] !== null && paramsConfig[name] !== Object.prototype[name]) {
					initParam(component, $paramsConfig!.get(name)!, name, $specifiedParams);
				}
			}
		}

		component[KEY_COMPONENT_PARAMS_INITED] = true;
	}
};
