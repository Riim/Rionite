let DisposableMixin = require('./DisposableMixin');
let ElementAttributes = require('./ElementAttributes');
let Component = require('./Component');
let registerComponent = require('./registerComponent');
let RtContent = require('./components/rt-content');
let RtIfThen = require('./components/rt-if-then');
let RtIfElse = require('./components/rt-if-else');
let RtRepeat = require('./components/rt-repeat');
let camelize = require('./utils/camelize');
let hyphenize = require('./utils/hyphenize');
let escapeHTML = require('./utils/escapeHTML');
let unescapeHTML = require('./utils/unescapeHTML');
let isRegExp = require('./utils/isRegExp');
let pathToJSExpression = require('./utils/pathToJSExpression');
let compilePath = require('./utils/compilePath');
let compileContent = require('./utils/compileContent');
let defer = require('./utils/defer');
let htmlToFragment = require('./utils/htmlToFragment');

let Rionite = module.exports = {
	DisposableMixin,
	ElementAttributes,
	Component,
	registerComponent,

	components: {
		RtContent,
		RtIfThen,
		RtIfElse,
		RtRepeat
	},

	utils: {
		camelize,
		hyphenize,
		escapeHTML,
		unescapeHTML,
		isRegExp,
		pathToJSExpression,
		compilePath,
		compileContent,
		defer,
		htmlToFragment
	}
};
Rionite.Rionite = Rionite; // for destructuring
