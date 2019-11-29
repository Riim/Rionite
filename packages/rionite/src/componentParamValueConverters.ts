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
			toData: (rawValue: string | null, defaultValue: any, el: Element): object | null => {
				if (rawValue) {
					let value =
						el[KEY_COMPONENT_PARAM_VALUES] &&
						el[KEY_COMPONENT_PARAM_VALUES].get(rawValue);

					if (!value) {
						throw new TypeError('Value is not an object');
					}

					return value;
				}

				if (defaultValue == null) {
					return null;
				}

				if (typeof defaultValue == 'object' && (defaultValue as any).clone) {
					return (defaultValue as any).clone.length
						? (defaultValue as any).clone(true)
						: (defaultValue as any).clone();
				}

				return defaultValue;
			},

			toString: null
		}
	],

	[
		eval,
		{
			toData: (rawValue: string | null, defaultValue: any): any => {
				if (rawValue !== null) {
					return Function(`return ${unescapeHTML(rawValue)};`)();
				}

				if (defaultValue == null) {
					return null;
				}

				if (
					defaultValue &&
					typeof defaultValue == 'object' &&
					(defaultValue as any).clone
				) {
					return (defaultValue as any).clone.length
						? (defaultValue as any).clone(true)
						: (defaultValue as any).clone();
				}

				return defaultValue;
			},

			toString: null
		}
	]
]);
