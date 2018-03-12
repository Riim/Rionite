import { escapeHTML, unescapeHTML } from '@riim/escape-html';
import { isRegExp } from '@riim/is-regexp';
import { Map } from '@riim/map-set-polyfill';
import { componentParamValueMap } from './componentParamValueMap';

export interface IComponentParamTypeSerializer {
	read: (value: string | null, defaultValue: any) => any;
	write: (value: any, defaultValue?: any) => string | null;
}

export let componentParamTypeSerializerMap = new Map<any, IComponentParamTypeSerializer>([
	[
		Boolean,
		{
			read: (value: string | null, defaultValue: boolean | undefined): boolean => {
				return value !== null ? value != 'no' : !!defaultValue;
			},

			write: (value: any, defaultValue: boolean | undefined): string | null => {
				return value ? '' : defaultValue ? 'no' : null;
			}
		}
	],

	[
		Number,
		{
			read: (value: string | null, defaultValue: number | undefined): number | null => {
				return value !== null ? +value : defaultValue !== undefined ? defaultValue : null;
			},

			write: (value: any): string | null => {
				return value != null ? +value + '' : null;
			}
		}
	],

	[
		String,
		{
			read: (value: string | null, defaultValue: string | undefined): string | null => {
				return value !== null ? value : defaultValue !== undefined ? defaultValue : null;
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
				value: string | null,
				defaultValue: object | null | undefined
			): object | null => {
				if (value === null) {
					return defaultValue || null;
				}

				if (!componentParamValueMap.has(value)) {
					throw new TypeError('Value is not an object');
				}

				let val = componentParamValueMap.get(value)!;
				componentParamValueMap.delete(value);
				return val;
			},

			write: (value: any): string | null => {
				return value != null ? '' : null;
			}
		}
	],

	[
		eval,
		{
			read: (value: string | null, defaultValue: any): any => {
				return value !== null
					? Function(`return ${unescapeHTML(value)};`)()
					: defaultValue !== undefined ? defaultValue : null;
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
