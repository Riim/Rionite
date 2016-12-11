import { Cell } from 'cellx';
import { IComponentElement, default as Component } from './Component';
import ContentParser from './ContentParser';
import compileContent from './compileContent';
import setAttribute from './Utils/setAttribute';

let ContentNodeType = ContentParser.ContentNodeType;

let reBinding = /{[^}]+}/;

export default function bindContent(
	content: Node,
	ownerComponent: Component,
	context?: Object
): { bindings: Array<Cell<any>> | null, childComponents: Array<Component> | null } {
	if (!context) {
		context = ownerComponent;
	}

	let bindings: Array<Cell<any>> | undefined;
	let childComponents: Array<Component> | undefined;

	function bind_(content: Node) {
		for (let child = content.firstChild; child; child = child.nextSibling) {
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
										setAttribute(child as HTMLElement, name, evt['value']);
									}
								});

								setAttribute(child as HTMLElement, name, cell.get());

								(bindings || (bindings = [])).push(cell);
							}
						}
					}

					let childComponent = (child as IComponentElement).$c;

					if (childComponent) {
						childComponent.ownerComponent = ownerComponent;
						childComponent.props.context = context as Object;

						(childComponents || (childComponents = [])).push(childComponent);
					}

					if (
						child.firstChild &&
							(!childComponent || (childComponent.constructor as typeof Component).template == null)
					) {
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
									(child as Node).textContent = evt['value'];
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

	bind_(content);

	return {
		bindings: bindings || null,
		childComponents: childComponents || null
	};
}
