import { unescapeHTML } from '@riim/escape-html';

export interface IComponentParamValueСonverters {
	toData: (value: string | null, defaultValue: any, el?: Element) => any;
	toString: ((value: any, defaultValue?: any) => string | null) | null;
}

export const KEY_COMPONENT_PARAM_VALUES = Symbol('componentParamValues');

export const componentParamValueСonverters = new Map<any, IComponentParamValueСonverters>([
	[
		Boolean,
		{
			toData: (rawValue: string | null, defaultValue: boolean | undefined): boolean => {
				return rawValue !== null ? rawValue != 'no' : !!defaultValue;
			},

			toString: (value: any, defaultValue: boolean | undefined): string | null => {
				return value ? '' : defaultValue ? 'no' : null;
			}
		}
	],

	[
		Number,
		{
			toData: (rawValue: string | null, defaultValue: number | undefined): number | null => {
				return rawValue !== null
					? +rawValue
					: defaultValue !== undefined
					? defaultValue
					: null;
			},

			toString: (value: any): string | null => {
				return value != null ? +value + '' : null;
			}
		}
	],

	[
		String,
		{
			toData: (rawValue: string | null, defaultValue: string | undefined): string | null => {
				return rawValue !== null
					? rawValue
					: defaultValue !== undefined
					? defaultValue
					: null;
			},

			toString: (value: any): string | null => {
				return value != null ? value + '' : null;
			}
		}
	],

	[
		Object,
		{
			toData: (
				rawValue: string | null,
				defaultValue: object | null | undefined,
				el: Element
			): object | null => {
				if (!rawValue) {
					return defaultValue || null;
				}

				let value =
					el[KEY_COMPONENT_PARAM_VALUES] && el[KEY_COMPONENT_PARAM_VALUES].get(rawValue);

				if (!value) {
					throw new TypeError('Value is not an object');
				}

				return value;
			},

			toString: null
		}
	],

	[
		eval,
		{
			toData: (rawValue: string | null, defaultValue: any): any => {
				return rawValue !== null
					? Function(`return ${unescapeHTML(rawValue)};`)()
					: defaultValue !== undefined
					? defaultValue
					: null;
			},

			toString: null
		}
	]
]);

componentParamValueСonverters.set('boolean', componentParamValueСonverters.get(Boolean)!);
componentParamValueСonverters.set('number', componentParamValueСonverters.get(Number)!);
componentParamValueСonverters.set('string', componentParamValueСonverters.get(String)!);
componentParamValueСonverters.set('object', componentParamValueСonverters.get(Object)!);
componentParamValueСonverters.set('eval', componentParamValueСonverters.get(eval)!);
