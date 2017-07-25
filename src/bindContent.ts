import {
	Cell,
	ICellOptions,
	ICellPull,
	IEvent
	} from 'cellx';
import { compileContentText } from './compileContentText';
import { Component, IPossiblyComponentElement } from './Component';
import { IFreezableCell } from './componentBinding';
import { ContentTextParser } from './ContentTextParser';
import { setAttribute } from './Utils/setAttribute';

class AttributeBindingCell extends Cell {
	element: Element;
	attributeName: string;

	constructor(pull: ICellPull<any>, el: Element, attrName: string, opts?: ICellOptions<any>) {
		super(pull, opts);
		this.element = el;
		this.attributeName = attrName;
	}
}

class TextNodeBindingCell extends Cell {
	textNode: Text;

	constructor(pull: ICellPull<any>, textNode: Text, opts?: ICellOptions<any>) {
		super(pull, opts);
		this.textNode = textNode;
	}
}

function onAttributeBindingCellChange(evt: IEvent) {
	setAttribute(
		(evt.target as AttributeBindingCell).element,
		(evt.target as AttributeBindingCell).attributeName,
		evt.value
	);
}

function onTextNodeBindingCellChange(evt: IEvent) {
	(evt.target as TextNodeBindingCell).textNode.nodeValue = evt.value;
}

let ContentTextNodeType = ContentTextParser.ContentTextNodeType;

export function bindContent(
	node: Element | DocumentFragment,
	ownerComponent: Component,
	context: object,
	result: [Array<IFreezableCell> | null, Array<Component> | null]
): [Array<IFreezableCell> | null, Array<Component> | null] {
	for (let child = node.firstChild; child; child = child.nextSibling) {
		switch (child.nodeType) {
			case Node.ELEMENT_NODE: {
				let attrs = child.attributes;

				for (let i = attrs.length; i; ) {
					let attr = attrs.item(--i);
					let value = attr.value;

					if (value.indexOf('{') != -1) {
						let contentText = (new ContentTextParser(value)).parse();

						if (contentText.length > 1 || contentText[0].nodeType == ContentTextNodeType.BINDING) {
							let name = attr.name;

							if (name.charAt(0) == '_') {
								name = name.slice(1);
							}

							let cell = new AttributeBindingCell(
								compileContentText(contentText, value, contentText.length == 1),
								child as Element,
								name,
								{
									owner: context,
									onChange: onAttributeBindingCellChange
								}
							);

							setAttribute(child as Element, name, cell.get());

							(result[0] || (result[0] = [])).push((cell as any) as IFreezableCell);
						}
					}
				}

				let childComponent = (child as IPossiblyComponentElement).$component;

				if (childComponent) {
					childComponent.ownerComponent = ownerComponent;
					childComponent.input.$context = context;

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
				for (let nextChild; (nextChild = child.nextSibling) && nextChild.nodeType == Node.TEXT_NODE; ) {
					child.nodeValue += nextChild.nodeValue!;
					node.removeChild(nextChild);
				}

				let value = child.nodeValue!;

				if (value.indexOf('{') != -1) {
					let contentText = (new ContentTextParser(value)).parse();

					if (contentText.length > 1 || contentText[0].nodeType == ContentTextNodeType.BINDING) {
						let cell = new TextNodeBindingCell(
							compileContentText(contentText, value, false),
							child as Text,
							{
								owner: context,
								onChange: onTextNodeBindingCellChange
							}
						);

						child.nodeValue = cell.get();

						(result[0] || (result[0] = [])).push((cell as any) as IFreezableCell);
					}
				}

				break;
			}
		}
	}

	return result;
}
