import { snakeCaseAttributeName } from '@riim/rionite-snake-case-attribute-name';
import { KEY_VALUE_CELLS } from 'cellx';
import { BaseComponent } from './BaseComponent';
import { KEY_PARAM_VALUES, KEY_PARAMS_CONFIG } from './Constants';

export const KEY_COMPONENT_PARAMS_INITED = Symbol('componentParamsInited');

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

		let $paramsConfig = (component.constructor as typeof BaseComponent)[KEY_PARAMS_CONFIG];

		if ($paramsConfig) {
			for (let [name, $paramConfig] of $paramsConfig) {
				let valueСonverters = $paramConfig.valueСonverters;
				let defaultValue = $paramConfig.default;

				let el = component.element;
				let snakeCaseName = snakeCaseAttributeName(name, true);
				let rawValue = el.getAttribute(snakeCaseName);

				if (rawValue === null) {
					if ($paramConfig.required) {
						throw TypeError(`Parameter "${name}" is required`);
					}

					if (
						defaultValue != null &&
						defaultValue !== false &&
						valueСonverters.toString
					) {
						el.setAttribute(snakeCaseName, valueСonverters.toString(defaultValue)!);
					}
				} else {
					if ($specifiedParams) {
						$specifiedParams.add(name);
					}
				}

				let valueCell = (this[KEY_VALUE_CELLS] || (this[KEY_VALUE_CELLS] = new Map())).get(
					$paramConfig.property
				);
				let value = valueСonverters.toData(rawValue, defaultValue, el);

				if (valueCell) {
					valueCell.set(value);
				} else {
					component[KEY_PARAM_VALUES].set(name, value);
				}
			}
		}

		component[KEY_COMPONENT_PARAMS_INITED] = true;
	}
};
