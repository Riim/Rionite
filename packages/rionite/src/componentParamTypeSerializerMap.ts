import { escapeHTML, unescapeHTML } from '@riim/escape-html';
import { isRegExp } from '@riim/is-regexp';

export interface IComponentParamTypeSerializer {
	read: (value: string | null, defaultValue: any, el?: Element) => any;
	write: (value: any, defaultValue?: any) => string | null;
}

export const KEY_COMPONENT_PARAM_VALUE_MAP = Symbol(
	'Rionite/componentParamTypeSerializerMap[componentParamValueMap]'
);

export const componentParamTypeSerializerMap = new Map<any, IComponentParamTypeSerializer>([
	[
		Boolean,
		{
			read: (rawValue: string | null, defaultValue: boolean | undefined): boolean => {
				return rawValue !== null ? rawValue != 'no' : !!defaultValue;
			},

			write: (value: any, defaultValue: boolean | undefined): string | null => {
				return value ? '' : defaultValue ? 'no' : null;
			}
		}
	],

	[
		Number,
		{
			read: (rawValue: string | null, defaultValue: number | undefined): number | null => {
				return rawValue !== null
					? +rawValue
					: defaultValue !== undefined
					? defaultValue
					: null;
			},

			write: (value: any): string | null => {
				return value != null ? +value + '' : null;
			}
		}
	],

	[
		String,
		{
			read: (rawValue: string | null, defaultValue: string | undefined): string | null => {
				return rawValue !== null
					? rawValue
					: defaultValue !== undefined
					? defaultValue
					: null;
			},

			write: (value: any): string | null => {
				return value != null ? value + '' : null;
			}
		}
	],

	[
		Object,
		{
			read: (
				rawValue: string | null,
				defaultValue: object | null | undefined,
				el: Element
			): object | null => {
				if (!rawValue) {
					return defaultValue || null;
				}

				let value = (el[KEY_COMPONENT_PARAM_VALUE_MAP] || { __proto__: null })[rawValue];

				if (!value) {
					throw new TypeError('Value is not an object');
				}

				return value;
			},

			write: (value: any): string | null => {
				return value != null ? '' : null;
			}
		}
	],

	[
		eval,
		{
			read: (rawValue: string | null, defaultValue: any): any => {
				return rawValue !== null
					? Function(`return ${unescapeHTML(rawValue)};`)()
					: defaultValue !== undefined
					? defaultValue
					: null;
			},

			write: (value: any): string | null => {
				return value != null
					? escapeHTML(isRegExp(value) ? value.toString() : JSON.stringify(value))
					: null;
			}
		}
	]
]);

componentParamTypeSerializerMap.set('boolean', componentParamTypeSerializerMap.get(Boolean)!);
componentParamTypeSerializerMap.set('number', componentParamTypeSerializerMap.get(Number)!);
componentParamTypeSerializerMap.set('string', componentParamTypeSerializerMap.get(String)!);
componentParamTypeSerializerMap.set('object', componentParamTypeSerializerMap.get(Object)!);
componentParamTypeSerializerMap.set('eval', componentParamTypeSerializerMap.get(eval)!);
