let { Cell } = require('cellx');
let pathPattern = require('./pathPattern');
let compileContent = require('./utils/compileContent');

let reBinding = RegExp(`\\{\\s*(${ pathPattern })\\s*\\}`, 'g');

function bind(content, component, context) {
	if (!context) {
		context = component;
	}

	let bindings = [];

	function bind_(node) {
		for (let child = node.firstChild; child; child = child.nextSibling) {
			switch (child.nodeType) {
				case 1: {
					let attributes = child.attributes;

					for (let i = attributes.length; i;) {
						let attr = attributes.item(--i);
						let value = attr.value;
						let splitValue = value.split(reBinding);

						if (splitValue.length > 1) {
							let name = attr.name;
							let cell = new Cell(compileContent(splitValue, value), {
								owner: context,
								onChange({ value }) {
									if (value === false || value == null) {
										child.removeAttribute(name);
									} else {
										child.setAttribute(name, value === true ? '' : value);
									}
								}
							});

							value = cell.get();

							if (value === false || value == null) {
								child.removeAttribute(name);
							} else {
								child.setAttribute(name, value === true ? '' : value);
							}

							bindings.push(cell);
						}
					}

					let childComponent = child.$c;

					if (childComponent) {
						childComponent.ownerComponent = component;
						childComponent._parentComponent = void 0;
						childComponent.props.context = context;
						childComponent._elementAttached.set(true);
					} else {
						bind_(child);
					}

					break;
				}
				case 3: {
					let content = child.textContent;
					let splitContent = content.split(reBinding);

					if (splitContent.length > 1) {
						let cell = new Cell(compileContent(splitContent, content), {
							owner: context,
							onChange(evt) {
								child.textContent = evt.value;
							}
						});

						child.textContent = cell.get();

						bindings.push(cell);
					}

					break;
				}
			}
		}
	}

	bind_(content);

	return bindings.length ? bindings : null;
}

module.exports = bind;
