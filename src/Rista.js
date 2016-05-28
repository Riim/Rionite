let { EventEmitter, map, list, cellx } = require('cellx');
let camelize = require('./utils/camelize');
let hyphenize = require('./utils/hyphenize');
let escapeHTML = require('./utils/escapeHTML');
let unescapeHTML = require('./utils/unescapeHTML');
let Attributes = require('./Attributes');
let Properties = require('./Properties');
let Component = require('./Component');

let Rista = module.exports = {
	EventEmitter,
	map,
	list,
	cellx,
	Component,
	Attributes,
	Properties,

	utils: {
		camelize,
		hyphenize,
		escapeHTML,
		unescapeHTML
	}
};
Rista.Rista = Rista; // for destructuring
