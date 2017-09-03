import { escapeHTML, unescapeHTML } from '@riim/escape-html';
import { Map } from '@riim/map-set-polyfill';
import { componentInputValueMap } from './componentInputValueMap';
import { isRegExp } from './utils/isRegExp';

export let componentInputTypeSerializerMap = new Map<any, {
	read: (value: string | null, defaultValue: any) => any;
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
		read: (value: string | null, defaultValue: object | null | undefined): object | null => {
			if (value === null) {
				return defaultValue || null;
			}

			if (!componentInputValueMap.has(value)) {
				throw new TypeError('Value is not an object');
			}

			let val = componentInputValueMap.get(value) as object;
			componentInputValueMap.delete(value);
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

componentInputTypeSerializerMap.set('boolean', componentInputTypeSerializerMap.get(Boolean)!);
componentInputTypeSerializerMap.set('number', componentInputTypeSerializerMap.get(Number)!);
componentInputTypeSerializerMap.set('string', componentInputTypeSerializerMap.get(String)!);
componentInputTypeSerializerMap.set('object', componentInputTypeSerializerMap.get(Object)!);
