import { JS } from 'cellx';
import { escapeHTML, unescapeHTML } from '@riim/escape-html';
import Component from './Component';
import KEY_COMPONENT_INPUT_VALUES from './KEY_COMPONENT_INPUT_VALUES';
import isRegExp from './Utils/isRegExp';

let componentInputTypeSerializerMap = new JS.Map<any, {
	read: (value: string | null, defaultValue: any, component: Component) => any;
	write: (value: any, defaultValue?: any) => string | null;
}>([
	[Boolean, {
		read: (value: string | null, defaultValue: boolean | undefined): boolean => {
			return value !== null ? value != 'no' : !!defaultValue;
		},
		write: (value: any, defaultValue: boolean | undefined): string | null => {
			return value ? '' : (defaultValue ? 'no' : null);
		}
	}],

	[Number, {
		read: (value: string | null, defaultValue: number | undefined): number | null => {
			return value !== null ? +value : (defaultValue !== undefined ? defaultValue : null);
		},
		write: (value: any): string | null => {
			return value != null ? String(+value) : null;
		}
	}],

	[String, {
		read: (value: string | null, defaultValue: string | undefined): string | null => {
			return value !== null ? value : (defaultValue !== undefined ? defaultValue : null);
		},
		write: (value: any): string | null => {
			return value != null ? String(value) : null;
		}
	}],

	[Object, {
		read: (value: string | null, defaultValue: Object | null | undefined, component: Component): Object | null => {
			if (value === null) {
				return defaultValue || null;
			}

			let componentInputValues = component.ownerComponent &&
				component.ownerComponent[KEY_COMPONENT_INPUT_VALUES] as Map<string, Object> | undefined;

			if (!componentInputValues || !componentInputValues.has(value)) {
				throw new TypeError('Value is not an object');
			}

			let val = componentInputValues.get(value);
			componentInputValues.delete(value);
			return val;
		},
		write: (value: any): string | null => {
			return value != null ? '' : null;
		}
	}],

	[eval, {
		read: (value: string | null, defaultValue: any): any => {
			return value !== null ?
				Function(`return ${ unescapeHTML(value) };`)() :
				(defaultValue !== undefined ? defaultValue : null);
		},
		write: (value: any): string | null => {
			return value != null ? escapeHTML(isRegExp(value) ? value.toString() : JSON.stringify(value)) : null;
		}
	}]
]);

componentInputTypeSerializerMap.set('boolean', componentInputTypeSerializerMap.get(Boolean));
componentInputTypeSerializerMap.set('number', componentInputTypeSerializerMap.get(Number));
componentInputTypeSerializerMap.set('string', componentInputTypeSerializerMap.get(String));
componentInputTypeSerializerMap.set('object', componentInputTypeSerializerMap.get(Object));

export default componentInputTypeSerializerMap;
