import { camelize } from '@riim/camelize';
import { Set } from '@riim/map-set-polyfill';
import { setAttribute } from '@riim/set-attribute';
import {
	Cell,
	ICellOptions,
	ICellPull,
	IEvent
	} from 'cellx';
import { compileContentTextFragment } from './compileContentTextFragment';
import { Component, IPossiblyComponentElement } from './Component';
import { IFreezableCell } from './componentBinding';
import { ContentTextFragmentParser } from './ContentTextFragmentParser';

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

function onAttributeBindingCellChange(evt: IEvent<AttributeBindingCell>) {
	setAttribute(evt.target.element, evt.target.attributeName, evt.data.value);
}

function onTextNodeBindingCellChange(evt: IEvent<TextNodeBindingCell>) {
	evt.target.textNode.nodeValue = evt.data.value;
}

let ContentTextFragmentNodeType = ContentTextFragmentParser.ContentTextFragmentNodeType;

export function bindContent(
	node: Element | DocumentFragment,
	ownerComponent: Component,
	context: object,
	result: [Array<IFreezableCell> | null, Array<Component> | null]
): [Array<IFreezableCell> | null, Array<Component> | null] {
	for (let child = node.firstChild; child; child = child.nextSibling) {
		switch (child.nodeType) {
			case Node.ELEMENT_NODE: {
				let childComponent = (child as IPossiblyComponentElement).$component;
				let $specified;

				if (childComponent) {
					$specified = new Set<string>();
				}

				let attrs = child.attributes;

				for (let i = attrs.length; i; ) {
					let attr = attrs.item(--i);

					if ($specified) {
						$specified.add(camelize(attr.name, true));
					}

					let value = attr.value;

					if (value.indexOf('{') != -1) {
						let contentTextFragment = (new ContentTextFragmentParser(value)).parse();

						if (
							contentTextFragment.length > 1 ||
								contentTextFragment[0].nodeType == ContentTextFragmentNodeType.BINDING
						) {
							let name = attr.name;

							if (name.charAt(0) == '_') {
								name = name.slice(1);
							}

							let cell = new AttributeBindingCell(
								compileContentTextFragment(contentTextFragment, value, contentTextFragment.length == 1),
								child as Element,
								name,
								{
									context,
									onChange: onAttributeBindingCellChange
								}
							);

							setAttribute(child as Element, name, cell.get());

							(result[0] || (result[0] = [])).push((cell as any) as IFreezableCell);
						}
					}
				}

				if (childComponent) {
					childComponent.ownerComponent = ownerComponent;
					childComponent.input.$context = context;
					childComponent.input.$specified = $specified as Set<string>;

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
					let contentTextFragment = (new ContentTextFragmentParser(value)).parse();

					if (
						contentTextFragment.length > 1 ||
							contentTextFragment[0].nodeType == ContentTextFragmentNodeType.BINDING
					) {
						let cell = new TextNodeBindingCell(
							compileContentTextFragment(contentTextFragment, value, false),
							child as Text,
							{
								context,
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
