import { Cell } from 'cellx';
import { IPossiblyComponentElement, default as Component } from './Component';
import ContentTextParser from './ContentTextParser';
import compileContentText from './compileContentText';
import { IFreezableCell } from './componentBinding';
import setAttribute from './Utils/setAttribute';

let ContentTextNodeType = ContentTextParser.ContentTextNodeType;

export default function bindContent(
	node: Element | DocumentFragment,
	ownerComponent: Component,
	context: Object,
	result: [Array<IFreezableCell> | null, Array<Component> | null]
): [Array<IFreezableCell> | null, Array<Component> | null] {
	for (let child = node.firstChild; child; child = child.nextSibling) {
		switch (child.nodeType) {
			case Node.ELEMENT_NODE: {
				let attrs = child.attributes;

				for (let i = attrs.length; i;) {
					let attr = attrs.item(--i);
					let value = attr.value;

					if (value.indexOf('{') != -1) {
						let contentText = (new ContentTextParser(value)).parse();

						if (contentText.length > 1 || contentText[0].nodeType == ContentTextNodeType.BINDING) {
							let name = attr.name;

							if (name.charAt(0) == '_') {
								name = name.slice(1);
							}

							let cell = new Cell<any>(
								compileContentText(contentText, value, contentText.length == 1),
								{
									owner: context as Object,
									onChange(evt) {
										setAttribute(child as Element, name, evt.value);
									}
								}
							);

							setAttribute(child as Element, name, cell.get());

							(result[0] || (result[0] = [])).push(cell as IFreezableCell);
						}
					}
				}

				let childComponent = (child as IPossiblyComponentElement).$component;

				if (childComponent) {
					childComponent.ownerComponent = ownerComponent;
					childComponent.input.$context = context as Object;

					(result[1] || (result[1] = [])).push(childComponent);
				}

				if (
					child.firstChild &&
						(!childComponent || (childComponent.constructor as typeof Component).template == null)
				) {
					bindContent(child as Element, ownerComponent, context, result);
				}

				break;
			}
			case Node.TEXT_NODE: {
				for (let nextChild; (nextChild = child.nextSibling) && nextChild.nodeType == Node.TEXT_NODE;) {
					child.nodeValue += nextChild.nodeValue as string;
					node.removeChild(nextChild);
				}

				let value = child.nodeValue as string;

				if (value.indexOf('{') != -1) {
					let contentText = (new ContentTextParser(value)).parse();

					if (contentText.length > 1 || contentText[0].nodeType == ContentTextNodeType.BINDING) {
						let cell = new Cell<any>(compileContentText(contentText, value, false), {
							owner: context as Object,
							onChange(evt) {
								(child as Node).nodeValue = evt.value;
							}
						});

						child.nodeValue = cell.get();

						(result[0] || (result[0] = [])).push(cell as IFreezableCell);
					}
				}

				break;
			}
		}
	}

	return result;
}
