import { getText } from '@riim/gettext';

export const formatters: { [name: string]: Function } = {
	or(value: any, arg: any): any {
		return value || arg;
	},
	default(value: any, arg: any): any {
		return value === undefined ? arg : value;
	},

	not(value: any): boolean {
		return !value;
	},
	is(value: any): boolean {
		return !!value;
	},

	eq(value: any, arg: any): boolean {
		return value == arg;
	},
	identical(value: any, arg: any): boolean {
		return value === arg;
	},

	lt(value: number, arg: number): boolean {
		return value < arg;
	},
	lte(value: number, arg: number): boolean {
		return value <= arg;
	},
	gt(value: number, arg: number): boolean {
		return value > arg;
	},
	gte(value: number, arg: number): boolean {
		return value >= arg;
	},

	has(obj: { [name: string]: any }, key: string): boolean {
		return !!obj && (typeof obj.has == 'function' ? obj.has(key) : obj.hasOwnProperty(key));
	},

	get(obj: { [name: string]: any }, key: string): any {
		return obj && (typeof obj.get == 'function' ? obj.get(key) : obj[key]);
	},

	key(obj: { [name: string]: any }, key: string): any {
		return obj && obj[key];
	},

	join(arr: Array<any> | null | undefined, separator = ', '): string | null | undefined {
		return arr && arr.join(separator);
	},

	t: getText.t,
	pt: getText.pt,

	nt(count: number, key: string, ...args: Array<any>): string {
		args.unshift(count);
		return getText('', key, true, args);
	},
	npt(count: number, key: string, context: string, ...args: Array<any>): string {
		args.unshift(count);
		return getText(context, key, true, args);
	},

	dump(value: any): string {
		return JSON.stringify(value);
	}
};

formatters.seq = formatters.identical;
