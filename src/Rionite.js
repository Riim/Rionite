let KeyedList = require('./KeyedList');
let DisposableMixin = require('./DisposableMixin');
let ElementAttributes = require('./ElementAttributes');
let Component = require('./Component');
let registerComponent = require('./registerComponent');
let Template = require('./Template');
let formatters = require('./formatters');
let RtContent = require('./components/rt-content');
let RtIfThen = require('./components/rt-if-then');
let RtIfElse = require('./components/rt-if-else');
let RtRepeat = require('./components/rt-repeat');
let camelize = require('./utils/camelize');
let hyphenize = require('./utils/hyphenize');
let escapeString = require('./utils/escapeString');
let escapeHTML = require('./utils/escapeHTML');
let unescapeHTML = require('./utils/unescapeHTML');
let isRegExp = require('./utils/isRegExp');
let defer = require('./utils/defer');
let htmlToFragment = require('./utils/htmlToFragment');

let Rionite = module.exports = {
	KeyedList,
	DisposableMixin,
	ElementAttributes,
	Component,
	registerComponent,

	Template,
	t(tmpl) {
		return new Template(tmpl);
	},

	formatters,

	components: {
		RtContent,
		RtIfThen,
		RtIfElse,
		RtRepeat
	},

	utils: {
		camelize,
		hyphenize,
		escapeString,
		escapeHTML,
		unescapeHTML,
		isRegExp,
		defer,
		htmlToFragment
	}
};
Rionite.Rionite = Rionite; // for destructuring
