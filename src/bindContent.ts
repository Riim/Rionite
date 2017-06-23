import { Cell } from 'cellx';
import { IPossiblyComponentElement, default as Component } from './Component';
import ContentParser from './ContentParser';
import compileContent from './compileContent';
import { IFreezableCell } from './componentBinding';
import setAttribute from './Utils/setAttribute';

let ContentNodeType = ContentParser.ContentNodeType;

export default function bindContent(
	content: HTMLElement | DocumentFragment,
	ownerComponent: Component,
	context?: Object | null
): [
	Array<IFreezableCell> | null,
	Array<Component> | null
] {
	if (!context) {
		context = ownerComponent;
	}

	let bindings: Array<IFreezableCell> | undefined;
	let childComponents: Array<Component> | undefined;

	function bind(node: Element | DocumentFragment) {
		for (let child = node.firstChild; child; child = child.nextSibling) {
			switch (child.nodeType) {
				case Node.ELEMENT_NODE: {
					let attrs = child.attributes;

					for (let i = attrs.length; i;) {
						let attr = attrs.item(--i);
						let value = attr.value;

						if (value.indexOf('{') != -1) {
							let content = (new ContentParser(value)).parse();

							if (content.length > 1 || content[0].nodeType == ContentNodeType.BINDING) {
								let name = attr.name;

								if (name.charAt(0) == '_') {
									name = name.slice(1);
								}

								let cell = new Cell<any>(compileContent(content, value, ownerComponent), {
									owner: context as Object,
									onChange(evt) {
										setAttribute(child as Element, name, evt.value);
									}
								});

								setAttribute(child as Element, name, cell.get());

								(bindings || (bindings = [])).push(cell as IFreezableCell);
							}
						}
					}

					let childComponent = (child as IPossiblyComponentElement).$component;

					if (childComponent) {
						childComponent.ownerComponent = ownerComponent;
						childComponent.input.$context = context as Object;

						(childComponents || (childComponents = [])).push(childComponent);
					}

					if (
						child.firstChild &&
							(!childComponent || (childComponent.constructor as typeof Component).template == null)
					) {
						bind(child as Element);
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
						let content = (new ContentParser(value)).parse();

						if (content.length > 1 || content[0].nodeType == ContentNodeType.BINDING) {
							let cell = new Cell<any>(compileContent(content, value), {
								owner: context as Object,
								onChange(evt) {
									(child as Node).nodeValue = evt.value;
								}
							});

							child.nodeValue = cell.get();

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
		0: bindings || null,
		1: childComponents || null
	} as any;
}
