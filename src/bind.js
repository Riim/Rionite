let { Cell } = require('cellx');
let pathPattern = require('./pathPattern');
let compileString = require('./utils/compileString');

let reBinding = RegExp(`\\{\\s*(${ pathPattern })\\s*\\}`, 'g');

function bind(node, component, context) {
	if (!context) {
		context = component;
	}

	let bindings = [];

	function bind_(node) {
		for (let child = node.firstChild; child; child = child.nextSibling) {
			switch (child.nodeType) {
				case 1: {
					let attrs = child.attributes;

					for (let i = attrs.length; i;) {
						let attr = attrs.item(--i);
						let value = attr.value;
						let splitValue = value.split(reBinding);

						if (splitValue.length > 1) {
							let name = attr.name;
							let cell = new Cell(compileString(splitValue, value), {
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
					}

					if (child.firstChild && (!childComponent || childComponent.constructor.template == null)) {
						bind_(child);
					}

					break;
				}
				case 3: {
					let content = child.textContent;
					let splitContent = content.split(reBinding);

					if (splitContent.length > 1) {
						let cell = new Cell(compileString(splitContent, content), {
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

	bind_(node);

	return bindings.length ? bindings : null;
}

module.exports = bind;
