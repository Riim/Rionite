import getText from './getText';

let formatters = Object.create(null);

formatters.not = function not(value) {
	return !value;
};

formatters.or = function key(value, arg) {
	return value || arg;
};
formatters.default = function key(value, arg) {
	return value == null ? arg : value;
};

formatters.eq = function eq(value, arg) {
	return value == arg;
};
formatters.identical = function identical(value, arg) {
	return value === arg;
};

formatters.lt = function lt(value, arg) {
	return value < arg;
};
formatters.lte = function lte(value, arg) {
	return value <= arg;
};
formatters.gt = function gt(value, arg) {
	return value > arg;
};
formatters.gte = function gte(value, arg) {
	return value >= arg;
};

formatters.join = function join(arr, separator = ', ') {
	return arr.join(separator);
};

formatters.t = getText.t;
formatters.pt = getText.pt;
formatters.nt = function nt(count, key, ...args) {
	args.unshift(count);
	return getText('', key, true, args);
};
formatters.npt = function npt(count, key, context, ...args) {
	args.unshift(count);
	return getText(context, key, true, args);
};

formatters.key = function key(obj, key) {
	return obj && obj[key];
};

formatters.json = function json(value) {
	return JSON.stringify(value);
};

export default formatters;
