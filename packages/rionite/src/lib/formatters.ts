import { getUID } from '@riim/next-uid';
import { ObservableList } from 'cellx';
import { config } from '../config';

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

	and(value1: any, ...values: Array<any>): any {
		return value1 && values.every((valueN) => valueN);
	},

	andNot(value1: any, ...values: Array<any>): any {
		return value1 && !values.every((valueN) => valueN);
	},

	or(value1: any, ...values: Array<any>): any {
		return value1 || values.some((valueN) => valueN);
	},

	orNot(value1: any, ...values: Array<any>): any {
		return value1 || !values.some((valueN) => valueN);
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

	seq(value1: any, value2: any): boolean {
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

	startsWith(str: string | null | undefined, searchString: string, pos?: number): boolean {
		return (str || '').startsWith(searchString, pos);
	},

	endsWith(str: string | null | undefined, searchString: string, pos?: number): boolean {
		return (str || '').endsWith(searchString, pos);
	},

	padStart(
		str: string | null | undefined,
		maxLength: number,
		fillString?: string
	): string | null | undefined {
		return str && str.padStart(maxLength, fillString);
	},

	padEnd(
		str: string | null | undefined,
		maxLength: number,
		fillString?: string
	): string | null | undefined {
		return str && str.padEnd(maxLength, fillString);
	},

	replace(
		str: string | null | undefined,
		searchValue: string | RegExp,
		replaceValue: string
	): string | null | undefined {
		return str && str.replace(searchValue, replaceValue);
	},

	trim(str: string | null | undefined): string | null | undefined {
		return str && str.trim();
	},

	uid(target: object | null | undefined): string | null | undefined {
		return target && getUID(target);
	},

	has(target: { has(key: any): boolean } | null | undefined, key: any): boolean {
		return !!target && target.has(key);
	},

	hasOwn(target: Object | null | undefined, propName: string | number): boolean {
		return !!target && target.hasOwnProperty(propName);
	},

	get(target: { get(key: any): any } | null | undefined, key: any): any {
		return target && target.get(key);
	},

	key(target: object | null | undefined, key: any): any {
		return target && target[key];
	},

	prop(target: Array<object> | ObservableList<object> | null | undefined, name: any): any {
		return target && (target as Array<object>).map((item) => item[name]);
	},

	contains(target: Array<any> | ObservableList | null | undefined, value: any): boolean {
		return (
			!!target && (Array.isArray(target) ? target.includes(value) : target.contains(value))
		);
	},

	join(
		target: { join(separator?: string): string } | null | undefined,
		separator = ', '
	): string | null | undefined {
		return target && target.join(separator);
	},

	dump(value: any): string | null | undefined {
		return value == null ? value : JSON.stringify(value);
	},

	t(msgid: string | null | false, ...args: Array<any>): string | null | false {
		return msgid && config.getText('', msgid, args);
	},

	pt(msgid: string | null | false, msgctxt: string, ...args: Array<any>): string | null | false {
		return msgid && config.getText(msgctxt, msgid, args);
	},

	log(msg: any, ...optionalParams: Array<any>) {
		console.log(msg, ...optionalParams);
		return msg;
	}
};
