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

	and(value1: any, value2: any): any {
		return value1 && value2;
	},

	or(value1: any, value2: any): any {
		return value1 || value2;
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

	hasOwn(target: Object | null | undefined, propertyName: string | number): boolean {
		return !!target && target.hasOwnProperty(propertyName);
	},

	get(target: { get(key: any): any } | null | undefined, key: any): any {
		return target && target.get(key);
	},

	key(target: object | null | undefined, key: any): any {
		return target && target[key];
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

	t(msgid: string, ...args: Array<any>): string {
		return config.getText('', msgid, args);
	},

	pt(msgid: string, msgctxt: string, ...args: Array<any>): string {
		return config.getText(msgctxt, msgid, args);
	},

	log(msg: any, ...optionalParams: Array<any>) {
		console.log(msg, ...optionalParams);
		return msg;
	}
};
