import { snakeCaseAttributeName } from '@riim/rionite-snake-case-attribute-name';
import { Symbol } from '@riim/symbol-polyfill';
import {
	BaseComponent,
	I$ComponentParamConfig,
	IComponentParamConfig,
	KEY_PARAMS,
	KEY_PARAMS_CONFIG
	} from './BaseComponent';
import { componentParamTypeSerializerMap } from './componentParamTypeSerializerMap';

export const KEY_IS_COMPONENT_PARAMS_INITED = Symbol(
	'Rionite/ComponentParams[isComponentParamsInited]'
);

function initParam(
	component: BaseComponent,
	$paramConfig: I$ComponentParamConfig | null,
	name: string
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
			((paramConfig as IComponentParamConfig).type !== undefined ||
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
		}

		typeSerializer = componentParamTypeSerializerMap.get(type);

		if (!typeSerializer) {
			throw new TypeError('Unsupported parameter type');
		}

		$paramConfig.type = type;
		$paramConfig.typeSerializer = typeSerializer;
		$paramConfig.default = defaultValue;
	}

	let snakeCaseName = snakeCaseAttributeName(name, true);
	let rawValue = component.element.getAttribute(snakeCaseName);

	if (rawValue === null) {
		if ($paramConfig.required) {
			throw new TypeError(`Parameter "${name}" is required`);
		}

		if (defaultValue != null && defaultValue !== false) {
			component.element.setAttribute(snakeCaseName, typeSerializer.write(defaultValue)!);
		}
	}

	component[KEY_PARAMS].set(name, typeSerializer.read(rawValue, defaultValue));
}

export const ComponentParams = {
	init(component: BaseComponent) {
		if (component[KEY_IS_COMPONENT_PARAMS_INITED]) {
			return;
		}

		let paramsConfig = (component.constructor as typeof BaseComponent).params;

		if (paramsConfig) {
			let $paramsConfig = component.constructor[KEY_PARAMS_CONFIG];

			for (let name in paramsConfig) {
				initParam(component, $paramsConfig[name], name);
			}
		}

		component[KEY_IS_COMPONENT_PARAMS_INITED] = true;
	}
};
