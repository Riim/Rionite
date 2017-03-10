import { JS } from 'cellx';
import { escapeHTML, unescapeHTML } from '@riim/escape-html';
import Component from './Component';
import isRegExp from './Utils/isRegExp';

let componentPropertyTypeHandlersMap = new JS.Map<any, [
	(value: string | null, defaultValue: any, component: Component) => any,
	(value: any, defaultValue: any, component: Component) => string | null
]>([
	[Boolean, [
		(value: string | null, defaultValue: boolean | undefined): boolean => {
			return value !== null ? value != 'no' : !!defaultValue;
		},
		(value: any, defaultValue: boolean | undefined): string | null => {
			return value ? '' : (defaultValue ? 'no' : null);
		}
	]],

	[Number, [
		(value: string | null, defaultValue: number | undefined): number | null => {
			return value !== null ? +value : (defaultValue !== undefined ? defaultValue : null);
		},
		(value: any): string | null => {
			return value != null ? String(+value) : null;
		}
	]],

	[String, [
		(value: string | null, defaultValue: string | undefined): string | null => {
			return value !== null ? value : (defaultValue !== undefined ? defaultValue : null);
		},
		(value: any): string | null => {
			return value != null ? String(value) : null;
		}
	]],

	[Object, [
		(value: string | null, defaultValue: Object | undefined): Object => {
			return value !== null ?
				Object(Function(`return ${ unescapeHTML(value) };`)()) :
				(defaultValue !== undefined ? defaultValue : null);
		},
		(value: any): string | null => {
			return value != null ? escapeHTML(isRegExp(value) ? value.toString() : JSON.stringify(value)) : null;
		}
	]],

	['ref', [
		(value: string | null, defaultValue: any, component: Component): any => {
			if (value === null) {
				return (defaultValue !== undefined ? defaultValue : null);
			}

			let propertyValuesByReference = component.ownerComponent &&
				component.ownerComponent._propertyValuesByReference as Map<string, any>;

			if (!propertyValuesByReference || !propertyValuesByReference.has(value)) {
				return (defaultValue !== undefined ? defaultValue : null);
			}

			let result = propertyValuesByReference.get(value);

			propertyValuesByReference.delete(value);

			return result;
		},
		(value: any): string | null => {
			return value != null ? '' : null;
		}
	]]
]);

componentPropertyTypeHandlersMap.set('boolean', componentPropertyTypeHandlersMap.get(Boolean));
componentPropertyTypeHandlersMap.set('number', componentPropertyTypeHandlersMap.get(Number));
componentPropertyTypeHandlersMap.set('string', componentPropertyTypeHandlersMap.get(String));
componentPropertyTypeHandlersMap.set('object', componentPropertyTypeHandlersMap.get(Object));

export default componentPropertyTypeHandlersMap;
