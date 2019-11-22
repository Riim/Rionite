const { TemplateParser } = require('@riim/rionite-template-parser-2');

module.exports = function(content) {
	return `const template = ${JSON.stringify(
		new TemplateParser(content).parse()
	)};\nexport default template;`;
};
