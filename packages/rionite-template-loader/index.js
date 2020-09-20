const { TemplateParser } = require('@riim/rionite-template-parser-2');

function stringify(value) {
	if (value === undefined) {
		return '';
	}

	if (Array.isArray(value)) {
		let source = '';

		for (let i = 0, l = value.length; i < l; ++i) {
			source += (i ? ',' : '') + stringify(value[i]);
		}

		return `[${source}]`;
	}

	return JSON.stringify(value);
}

module.exports = function (content) {
	return `const template = ${stringify(
		new TemplateParser(content).parse()
	)};\nexport default template;`;
};
