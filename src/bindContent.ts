import { Cell } from 'cellx';
import { IPossiblyComponentElement, default as Component } from './Component';
import KEY_COMPONENT_PROPERTY_VALUES from './KEY_COMPONENT_PROPERTY_VALUES';
import { IContentBinding, default as ContentParser } from './ContentParser';
import { nextComponentPropertyValueKey, default as compileContent } from './compileContent';
import { IFreezableCell } from './componentBinding';
import setAttribute from './Utils/setAttribute';

let ContentNodeType = ContentParser.ContentNodeType;

function readValue(obj: Object, keypath: string): { value: any } | null {
	let index = keypath.indexOf('.', 1);
	let key = index == -1 ? keypath : keypath.slice(0, index);

	if ('_' + key in obj) {
		return null;
	}

	let value = obj[key];

	return index == -1 ?
		{ value } :
		(value == null ? null : readValue(value, keypath.slice(index + 1)));
}

export default function bindContent(content: Node, ownerComponent: Component, context?: Object): [
	Array<IFreezableCell> | null,
	Array<Component> | null
] {
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

						if (value.indexOf('{') != -1) {
							let parsedValue = (new ContentParser(value)).parse();

							if (parsedValue.length > 1 || parsedValue[0].nodeType == ContentNodeType.BINDING) {
								let name = attr.name;

								if (name.charAt(0) == '_') {
									name = name.slice(1);
								}

								let readedValue;

								if (
									parsedValue.length == 1 &&
										!(parsedValue[0] as IContentBinding).formatters &&
										(
											readedValue = readValue(
												context as Object,
												(parsedValue[0] as IContentBinding).keypath
											)
										)
								) {
									let value = readedValue.value;

									if (value && typeof value == 'object') {
										let key = nextComponentPropertyValueKey();

										(
											ownerComponent[KEY_COMPONENT_PROPERTY_VALUES] ||
												(ownerComponent[KEY_COMPONENT_PROPERTY_VALUES] = new Map())
										).set(key, value);

										setAttribute(child as Element, name, key);
									} else {
										setAttribute(child as Element, name, value);
									}
								} else {
									let cell = new Cell<any>(compileContent(parsedValue, value, ownerComponent), {
										owner: context,
										onChange(evt) {
											setAttribute(child as Element, name, evt.value);
										}
									});

									setAttribute(child as Element, name, cell.get());

									(bindings || (bindings = [])).push(cell as IFreezableCell);
								}
							}
						}
					}

					let childComponent = (child as IPossiblyComponentElement).$component;

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

					if (content.indexOf('{') != -1) {
						let parsedContent = (new ContentParser(content)).parse();

						if (parsedContent.length > 1 || parsedContent[0].nodeType == ContentNodeType.BINDING) {
							let readedValue;

							if (
								parsedContent.length == 1 &&
									!(parsedContent[0] as IContentBinding).formatters &&
									(
										readedValue = readValue(
											context as Object,
											(parsedContent[0] as IContentBinding).keypath
										)
									)
							) {
								child.textContent = readedValue.value;
							} else {
								let cell = new Cell<any>(compileContent(parsedContent, content), {
									owner: context,
									onChange(evt) {
										(child as Node).textContent = evt.value;
									}
								});

								child.textContent = cell.get();

								(bindings || (bindings = [])).push(cell as IFreezableCell);
							}
						}
					}

					break;
				}
			}
		}
	}

	bind(content);

	return [bindings || null, childComponents || null];
}
