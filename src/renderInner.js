function renderInner(): string {
	let template = this.constructor.template;

	if (template) {
		return template.render ? template.render(this) : template.call(this, this);
	}

	return '';
}

module.exports = renderInner;
