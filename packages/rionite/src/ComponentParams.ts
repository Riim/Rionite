import { snakeCaseAttributeName } from '@riim/rionite-snake-case-attribute-name';
import { BaseComponent, I$ComponentParamConfig, IComponentParamConfig } from './BaseComponent';
import { componentParamValueСonverters } from './componentParamValueConverters';
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

	let valueСonverters = $paramConfig.valueСonverters;
	let defaultValue: any;

	if (valueСonverters) {
		defaultValue = $paramConfig.default;
	} else {
		let paramConfig = $paramConfig.paramConfig;
		let type: any = typeof paramConfig;

		defaultValue = component[$paramConfig.property];

		if (defaultValue === undefined) {
			if (type == 'object') {
				defaultValue = (paramConfig as IComponentParamConfig).default;
			} else if (type != 'function') {
				defaultValue = paramConfig;
			}
		}

		type = type == 'object' ? (paramConfig as IComponentParamConfig).type : paramConfig;

		if (defaultValue !== undefined && type !== eval) {
			type = typeof defaultValue;

			if (type == 'function') {
				type = 'object';
			}
		}

		valueСonverters = componentParamValueСonverters.get(type);

		if (!valueСonverters) {
			throw new TypeError('Unsupported parameter type');
		}

		$paramConfig.type = type;
		$paramConfig.valueСonverters = valueСonverters;
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

		if (defaultValue != null && defaultValue !== false && valueСonverters.toString) {
			el.setAttribute(snakeCaseName, valueСonverters.toString(defaultValue)!);
		}
	}

	let value = valueСonverters.toData(rawValue, defaultValue, el);

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
