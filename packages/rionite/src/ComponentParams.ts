import { snakeCaseAttributeName } from '@riim/rionite-snake-case-attribute-name';
import { BaseComponent, I$ComponentParamConfig, IComponentParamConfig } from './BaseComponent';
import { componentParamValueСonverters } from './componentParamValueConverters';
import { KEY_PARAM_VALUES, KEY_PARAMS_CONFIG } from './Constants';

const componentParamTypeMap = new Map<string, Function>([
	['boolean', Boolean],
	['number', Number],
	['string', String]
]);

const componentParamTypeMap2 = new Map<Function, string>([
	[Boolean, 'boolean'],
	[Number, 'number'],
	[String, 'string']
]);

export const KEY_COMPONENT_PARAMS_INITED = Symbol('componentParamsInited');

function initParam(
	component: BaseComponent,
	$paramConfig: I$ComponentParamConfig | null,
	name: string,
	$specifiedParams: Set<string> | null
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
		let type: Function | undefined;

		if (typeof paramConfig == 'object') {
			type = (paramConfig as IComponentParamConfig).type;
			defaultValue = (paramConfig as IComponentParamConfig).default;
		} else {
			type = paramConfig;
		}

		if (!type) {
			type =
				(defaultValue !== undefined && componentParamTypeMap.get(typeof defaultValue)) ||
				Object;
		}

		valueСonverters = componentParamValueСonverters.get(type);

		if (!valueСonverters) {
			throw new TypeError('Unsupported parameter type');
		}

		if (
			defaultValue !== undefined &&
			type != Object &&
			type != eval &&
			componentParamTypeMap2.get(type) != typeof defaultValue
		) {
			throw TypeError('Specified type does not match type of defaultValue');
		}

		$paramConfig.type = type;
		$paramConfig.valueСonverters = valueСonverters;
		$paramConfig.default = defaultValue;
	}

	let el = component.element;
	let snakeCaseName = snakeCaseAttributeName(name, true);
	let rawValue = el.getAttribute(snakeCaseName);

	if (rawValue === null) {
		if ($paramConfig.required) {
			throw new TypeError(`Parameter "${name}" is required`);
		}

		if (defaultValue != null && defaultValue !== false && valueСonverters.toString) {
			el.setAttribute(snakeCaseName, valueСonverters.toString(defaultValue)!);
		}
	} else if ($specifiedParams) {
		$specifiedParams.add(name);
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

		let $specifiedParams: Set<string> | null;

		if (component.$specifiedParams) {
			$specifiedParams = null;
		} else {
			$specifiedParams = component.$specifiedParams = new Set();
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
