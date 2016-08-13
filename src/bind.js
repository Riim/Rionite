let { Cell } = require('cellx');
let ContentNodeType = require('./ContentNodeType');
let parseContent = require('./parseContent');
let compileContent = require('./compileContent');
let setAttribute = require('./utils/setAttribute');

let reBinding = /{[^}]+}/;

function bind(node, component, context) {
	if (!context) {
		context = component;
	}

	let bindings = null;
	let childComponents = null;

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
									onChange(evt) {
										setAttribute(child, name, evt.value);
									}
								});

								setAttribute(child, name, cell.get());

								(bindings || (bindings = [])).push(cell);
							}
						}
					}

					let childComponent = child.$c;

					if (childComponent) {
						childComponent.ownerComponent = component;
						childComponent.props.context = context;

						(childComponents || (childComponents = [])).push(childComponent);
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

							(bindings || (bindings = [])).push(cell);
						}
					}

					break;
				}
			}
		}
	}

	bind_(node);

	return { bindings, childComponents };
}

module.exports = bind;
