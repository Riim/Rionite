let { EventEmitter, map, list, cellx } = require('cellx');
let KeyedList = require('./KeyedList');
let Attributes = require('./Attributes');
let Properties = require('./Properties');
let Component = require('./Component');
let registerComponent = require('./registerComponent');
let morphComponentElement = require('./morphComponentElement');
let RtContent = require('./components/rt-content');
let camelize = require('./utils/camelize');
let hyphenize = require('./utils/hyphenize');
let escapeHTML = require('./utils/escapeHTML');
let unescapeHTML = require('./utils/unescapeHTML');

let Rista = module.exports = {
	EventEmitter,
	map,
	list,
	cellx,
	KeyedList,
	Attributes,
	Properties,
	Component,
	registerComponent,
	morphComponentElement,

	components: {
		RtContent
	},

	utils: {
		camelize,
		hyphenize,
		escapeHTML,
		unescapeHTML
	}
};
Rista.Rista = Rista; // for destructuring
