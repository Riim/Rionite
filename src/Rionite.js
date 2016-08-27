import DisposableMixin from './DisposableMixin';
import ElementAttributes from './ElementAttributes';
import Component from './Component';
import registerComponent from './registerComponent';
import formatters from './formatters';
import getText from './getText';
import Template from './Template';
import RtContent from './Components/rt-content';
import RtIfThen from './Components/rt-if-then';
import RtIfElse from './Components/rt-if-else';
import RtRepeat from './Components/rt-repeat';
import camelize from './Utils/camelize';
import hyphenize from './Utils/hyphenize';
import escapeString from './Utils/escapeString';
import escapeHTML from './Utils/escapeHTML';
import unescapeHTML from './Utils/unescapeHTML';
import isRegExp from './Utils/isRegExp';
import defer from './Utils/defer';
import htmlToFragment from './Utils/htmlToFragment';

let Rionite = {
	DisposableMixin,
	ElementAttributes,
	Component,
	registerComponent,

	formatters,

	getText,

	Template,
	template(tmpl) {
		return new Template(tmpl);
	},

	Components: {
		RtContent,
		RtIfThen,
		RtIfElse,
		RtRepeat
	},

	Utils: {
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

export default Rionite;
