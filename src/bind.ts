import cellx = require('cellx');
import Component from './Component';
import ContentParser from './ContentParser';
import compileContent from './compileContent';
import setAttribute from './Utils/setAttribute';

let Cell = cellx.Cell;
let ContentNodeType = ContentParser.ContentNodeType;

let reBinding = /{[^}]+}/;

export default function bind(
	node: Node,
	component: Component,
	context?: Component
): { bindings: Array<cellx.Cell<any>> | null, childComponents: Array<Component> | null } {
	if (!context) {
		context = component;
	}

	let bindings: Array<cellx.Cell<any>> | null = null;
	let childComponents: Array<Component> | null = null;

	function bind_(node: Node) {
		for (let child = node.firstChild; child; child = child.nextSibling) {
			switch (child.nodeType) {
				case 1: {
					let attrs = child.attributes;

					for (let i = attrs.length; i;) {
						let attr = attrs.item(--i);
						let value = attr.value;

						if (reBinding.test(value)) {
							let parsedValue = (new ContentParser(value)).parse();

							if (parsedValue.length > 1 || parsedValue[0].type == ContentNodeType.BINDING) {
								let name = attr.name;
								let cell = new Cell<any>(compileContent(parsedValue, value), {
									owner: context,
									onChange(evt) {
										setAttribute(child as Element, name, evt['value']);
									}
								});

								setAttribute(child as Element, name, cell.get());

								(bindings || (bindings = [])).push(cell);
							}
						}
					}

					let childComponent = (child as any).$c;

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
					let content = child.textContent as string;

					if (reBinding.test(content)) {
						let parsedContent = (new ContentParser(content)).parse();

						if (parsedContent.length > 1 || parsedContent[0].type == ContentNodeType.BINDING) {
							let cell = new Cell<any>(compileContent(parsedContent, content), {
								owner: context,
								onChange(evt) {
									child.textContent = evt['value'];
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
