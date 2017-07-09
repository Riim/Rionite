import { getText } from '@riim/gettext';

export let formatters = {
	or: function or(value: any, arg: any): any {
		return value || arg;
	},
	default: function default_(value: any, arg: any): any {
		return value === undefined ? arg : value;
	},

	not: function not(value: any): boolean {
		return !value;
	},

	eq: function eq(value: any, arg: any): boolean {
		return value == arg;
	},
	identical: function identical(value: any, arg: any): boolean {
		return value === arg;
	},

	lt: function lt(value: number, arg: number): boolean {
		return value < arg;
	},
	lte: function lte(value: number, arg: number): boolean {
		return value <= arg;
	},
	gt: function gt(value: number, arg: number): boolean {
		return value > arg;
	},
	gte: function gte(value: number, arg: number): boolean {
		return value >= arg;
	},

	join: function join(arr: Array<any> | null | undefined, separator = ', '): string | null | undefined {
		return arr && arr.join(separator);
	},

	t: getText.t,
	pt: getText.pt,

	nt: function nt(count: number, key: string, ...args: Array<any>): string {
		args.unshift(count);
		return getText('', key, true, args);
	},
	npt: function npt(count: number, key: string, context: string, ...args: Array<any>): string {
		args.unshift(count);
		return getText(context, key, true, args);
	},

	// Safary: "Cannot declare a parameter named 'key' as it shadows the name of a strict mode function."
	key: function key_(obj: { [name: string]: any }, key: string): any {
		return obj && obj[key];
	},

	json: function json(value: any): string {
		return JSON.stringify(value);
	}
};
