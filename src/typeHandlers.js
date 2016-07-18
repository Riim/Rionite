let { js: { Map } } = require('cellx');
let escapeHTML = require('./utils/escapeHTML');
let unescapeHTML = require('./utils/unescapeHTML');
let isRegExp = require('./utils/isRegExp');

module.exports = new Map([
	[Boolean, [value => {
		return value !== null ? value != 'no' : false;
	}, value => {
		return value ? '' : null;
	}]],

	['boolean', [(value, defaultValue) => {
		return value !== null ? value != 'no' : defaultValue;
	}, (value, defaultValue) => {
		return value ? '' : (defaultValue ? 'no' : null);
	}]],

	[Number, [value => {
		return value !== null ? +value : void 0;
	}, value => {
		return value !== void 0 ? String(+value) : null;
	}]],

	['number', [(value, defaultValue) => {
		return value !== null ? +value : defaultValue;
	}, value => {
		return value !== void 0 ? String(+value) : null;
	}]],

	[String, [value => {
		return value !== null ? value : void 0;
	}, value => {
		return value !== void 0 ? String(value) : null;
	}]],

	['string', [(value, defaultValue) => {
		return value !== null ? value : defaultValue;
	}, value => {
		return value !== void 0 ? String(value) : null;
	}]],

	[Object, [(value, defaultValue, component) => {
		return value !== null ? Object(Function(`return ${ unescapeHTML(value) };`).call(component)) : void 0;
	}, value => {
		return value != null ? escapeHTML(isRegExp(value) ? value.toString() : JSON.stringify(value)) : null;
	}]],

	['object', [(value, defaultValue, component) => {
		return value !== null ? Object(Function(`return ${ unescapeHTML(value) };`).call(component)) : defaultValue;
	}, value => {
		return value != null ? escapeHTML(isRegExp(value) ? value.toString() : JSON.stringify(value)) : null;
	}]]
]);
