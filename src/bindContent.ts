import { Cell } from 'cellx';
import { IComponentElement, default as Component } from './Component';
import ContentParser from './ContentParser';
import compileContent from './compileContent';
import { IFreezableCell } from './componentBinding';
import setAttribute from './Utils/setAttribute';

let ContentNodeType = ContentParser.ContentNodeType;

let reBinding = /{[^}]+}/;

export default function bindContent(
	content: Node,
	ownerComponent: Component,
	context?: Object
): { bindings: Array<IFreezableCell> | null; childComponents: Array<Component> | null } {
	if (!context) {
		context = ownerComponent;
	}

	let bindings: Array<IFreezableCell> | undefined;
	let childComponents: Array<Component> | undefined;

	function bind(content: Node) {
		for (let child = content.firstChild; child; child = child.nextSibling) {
			switch (child.nodeType) {
				case Node.ELEMENT_NODE: {
					let attrs = child.attributes;

					for (let i = attrs.length; i;) {
						let attr = attrs.item(--i);
						let value = attr.value;

						if (reBinding.test(value)) {
							let parsedValue = (new ContentParser(value)).parse();

							if (parsedValue.length > 1 || parsedValue[0].nodeType == ContentNodeType.BINDING) {
								let name = attr.name;

								if (name.charAt(0) == '_') {
									name = name.slice(1);
								}

								let cell = new Cell<any>(compileContent(parsedValue, value, ownerComponent), {
									owner: context,
									onChange(evt) {
										setAttribute(child as HTMLElement, name, evt['value']);
									}
								});

								setAttribute(child as HTMLElement, name, cell.get());

								(bindings || (bindings = [])).push(cell as IFreezableCell);
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
						bind(child);
					}

					break;
				}
				case Node.TEXT_NODE: {
					let content = child.textContent as string;

					if (reBinding.test(content)) {
						let parsedContent = (new ContentParser(content)).parse();

						if (parsedContent.length > 1 || parsedContent[0].nodeType == ContentNodeType.BINDING) {
							let cell = new Cell<any>(compileContent(parsedContent, content), {
								owner: context,
								onChange(evt) {
									(child as Node).textContent = evt['value'];
								}
							});

							child.textContent = cell.get();

							(bindings || (bindings = [])).push(cell as IFreezableCell);
						}
					}

					break;
				}
			}
		}
	}

	bind(content);

	return {
		bindings: bindings || null,
		childComponents: childComponents || null
	};
}
