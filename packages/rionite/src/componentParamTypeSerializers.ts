import { unescapeHTML } from '@riim/escape-html';

export interface IComponentParamTypeSerializer {
	read: (value: string | null, defaultValue: any, el?: Element) => any;
	write: (value: any, defaultValue?: any) => string | null;
}

export const KEY_COMPONENT_PARAM_VALUES = Symbol(
	'Rionite/componentParamTypeSerializerMap[componentParamValueMap]'
);

export const componentParamTypeSerializers = new Map<any, IComponentParamTypeSerializer>([
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

				let value =
					el[KEY_COMPONENT_PARAM_VALUES] && el[KEY_COMPONENT_PARAM_VALUES].get(rawValue);

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
				return value != null ? '' : null;
			}
		}
	]
]);

componentParamTypeSerializers.set('boolean', componentParamTypeSerializers.get(Boolean)!);
componentParamTypeSerializers.set('number', componentParamTypeSerializers.get(Number)!);
componentParamTypeSerializers.set('string', componentParamTypeSerializers.get(String)!);
componentParamTypeSerializers.set('object', componentParamTypeSerializers.get(Object)!);
componentParamTypeSerializers.set('eval', componentParamTypeSerializers.get(eval)!);
