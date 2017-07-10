import { escapeHTML, unescapeHTML } from '@riim/escape-html';
import { JS } from 'cellx';
import { componentInputValueMap } from './componentInputValueMap';
import { isRegExp } from './Utils/isRegExp';

export interface IComponentInputTypeSerializer {
	read: (value: string | null, defaultValue: any) => any;
	write: (value: any, defaultValue?: any) => string | null;
}

export let componentInputTypeSerializerMap = new JS.Map<any, IComponentInputTypeSerializer>([
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

componentInputTypeSerializerMap.set(
	'boolean',
	componentInputTypeSerializerMap.get(Boolean) as IComponentInputTypeSerializer
);
componentInputTypeSerializerMap.set(
	'number',
	componentInputTypeSerializerMap.get(Number) as IComponentInputTypeSerializer
);
componentInputTypeSerializerMap.set(
	'string',
	componentInputTypeSerializerMap.get(String) as IComponentInputTypeSerializer
);
componentInputTypeSerializerMap.set(
	'object',
	componentInputTypeSerializerMap.get(Object) as IComponentInputTypeSerializer
);
