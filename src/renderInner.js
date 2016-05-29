/**
 * @typesign () -> string;
 */
function renderInner() {
	let template = this.template;

	if (template) {
		return template.render ? template.render(this) : template.call(this, this);
	}

	return '';
}

module.exports = renderInner;
