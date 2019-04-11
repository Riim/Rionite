import { getText } from '@riim/gettext';
import { ObservableList, ObservableMap } from 'cellx';

export const formatters: Record<string, Function> = {
	default(value: any, defaultValue: any): any {
		return value === undefined ? defaultValue : value;
	},

	defaultFor(defaultValue: any, value: any): any {
		return value === undefined ? defaultValue : value;
	},

	placeholder(value: any, placeholderValue: any): any {
		return value === null ? placeholderValue : value;
	},

	or(value: any, orValue: any): any {
		return value || orValue;
	},

	cond(condition: any, value1: any, value2: any): any {
		return condition ? value1 : value2;
	},

	not(value: any): boolean {
		return !value;
	},

	bool(value: any): boolean {
		return !!value;
	},

	eq(value1: any, value2: any): boolean {
		return value1 == value2;
	},

	identical(value1: any, value2: any): boolean {
		return value1 === value2;
	},

	lt(value1: number, value2: number): boolean {
		return value1 < value2;
	},

	lte(value1: number, value2: number): boolean {
		return value1 <= value2;
	},

	gt(value1: number, value2: number): boolean {
		return value1 > value2;
	},

	gte(value1: number, value2: number): boolean {
		return value1 >= value2;
	},

	has(target: ObservableMap | null | undefined, key: any): boolean {
		return !!target && target.has(key);
	},

	hasOwn(target: Object | null | undefined, propertyName: string | number): boolean {
		return !!target && target.hasOwnProperty(propertyName);
	},

	get(target: ObservableMap | ObservableList | null | undefined, key: any): any {
		return target && target.get(key);
	},

	key(target: object | null | undefined, key: any): any {
		return target && target[key];
	},

	contains(target: Array<any> | ObservableList | null | undefined, value: any): boolean {
		return (
			!!target &&
			(Array.isArray(target) ? target.indexOf(value) != -1 : target.contains(value))
		);
	},

	join(
		target: Array<any> | ObservableList | null | undefined,
		separator = ', '
	): string | null | undefined {
		return target && target.join(separator);
	},

	dump(value: any): string | null | undefined {
		return value == null ? value : JSON.stringify(value);
	},

	t(msgid: string, ...args: Array<any>): string {
		return getText('', msgid, args);
	},

	pt(msgid: string, msgctxt: string, ...args: Array<any>): string {
		return getText(msgctxt, msgid, args);
	}
};

formatters.seq = formatters.identical;
