let { Cell } = require('cellx');
let ContentNodeType = require('./ContentNodeType');
let parseContent = require('./parseContent');
let compileContent = require('./compileContent');

let reBinding = /{[^}]+}/;

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

						if (reBinding.test(value)) {
							let parsedValue = parseContent(value);

							if (parsedValue.length > 1 || parsedValue[0].type == ContentNodeType.BINDING) {
								let name = attr.name;
								let cell = new Cell(compileContent(parsedValue, value), {
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

					if (reBinding.test(content)) {
						let parsedContent = parseContent(content);

						if (parsedContent.length > 1 || parsedContent[0].type == ContentNodeType.BINDING) {
							let cell = new Cell(compileContent(parsedContent, content), {
								owner: context,
								onChange(evt) {
									child.textContent = evt.value;
								}
							});

							child.textContent = cell.get();

							bindings.push(cell);
						}
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
