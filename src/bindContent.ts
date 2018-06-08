import { Set } from '@riim/map-set-polyfill';
import { nextUID } from '@riim/next-uid';
import { setAttribute } from '@riim/set-attribute';
import { Cell, IEvent, TListener } from 'cellx';
import {
	BaseComponent,
	I$ComponentParamConfig,
	IComponentElement,
	IComponentParamConfig,
	IPossiblyComponentElement,
	KEY_PARAMS_CONFIG
	} from './BaseComponent';
import { compileContentNodeValue } from './compileContentNodeValue';
import { IFreezableCell } from './componentBinding';
import {
	ContentNodeValueNodeType,
	ContentNodeValueParser,
	IContentNodeValueBinding,
	TContentNodeValue
	} from './ContentNodeValueParser';
import { compileKeypath } from './lib/compileKeypath';

export interface INodeBindingSchema {
	index: number;
	specifiedParams: Set<string> | null;
	childComponents: Array<number> | null;
	attributes: Array<string> | null;
	textChildren: Array<number> | null;
	context: Array<number> | null;
	childSchemas: Array<INodeBindingSchema> | null;
}

export const KEY_NODE_BINDING_SCHEMA = Symbol('Rionite/bindContent[nodeBindingSchema]');
export const KEY_CHILD_COMPONENTS = Symbol('Rionite/bindContent[childComponents]');
export const KEY_CONTEXT = Symbol('Rionite/bindContent[context]');

const contentNodeValueASTCache: { [nodeValue: string]: TContentNodeValue | null } = Object.create(
	null
);

export interface IAttributeBindingCellMeta {
	element: Element;
	attributeName: string;
}

function onAttributeBindingCellChange(evt: IEvent<Cell<any, IAttributeBindingCellMeta>>) {
	setAttribute(evt.target.meta!.element, evt.target.meta!.attributeName, evt.data.value);
}

function onTextNodeBindingCellChange(evt: IEvent<Cell<string, { textNode: Text }>>) {
	evt.target.meta!.textNode.nodeValue = evt.data.value;
}

export function prepareContent<T extends Node = DocumentFragment | Element>(node: T): T {
	for (let child = node.firstChild; child; child = child.nextSibling) {
		if (child.nodeType == Node.ELEMENT_NODE) {
			if (child.firstChild) {
				if (child instanceof HTMLTemplateElement) {
					child.setAttribute('pid', nextUID());
				}

				prepareContent(child);
			} else if (child instanceof HTMLTemplateElement) {
				child.setAttribute('pid', nextUID());
				prepareContent(child.content);
			}
		}
	}

	return node;
}

export function bindContent(
	component: BaseComponent | null,
	node: Element | DocumentFragment,
	ownerComponent: BaseComponent,
	context: object,
	result: [
		Array<BaseComponent> | null,
		Array<IFreezableCell> | null,
		Array<BaseComponent | string | TListener> | null
	],
	parentComponent?: BaseComponent
): INodeBindingSchema | null {
	let schema: INodeBindingSchema | null | undefined;

	if (component) {
		schema = (component.constructor as typeof BaseComponent)[KEY_NODE_BINDING_SCHEMA];

		if (schema !== undefined) {
			if (schema) {
				bindContentBySchema(node, schema, ownerComponent, context, result, parentComponent);
			}

			return null;
		}
	}

	schema = bindContent$(node, -1, ownerComponent, context, result);

	if (component) {
		(component.constructor as typeof BaseComponent).template![KEY_NODE_BINDING_SCHEMA] =
			schema || null;
	}

	return schema || null;
}

function bindContent$(
	node: Element | DocumentFragment,
	index: number,
	ownerComponent: BaseComponent,
	context: object,
	result: [
		Array<BaseComponent> | null,
		Array<IFreezableCell> | null,
		Array<BaseComponent | string | TListener> | null
	],
	schema?: INodeBindingSchema | null,
	parentComponent?: BaseComponent
) {
	let children = node.childNodes;

	for (let i = 0, l = children.length; i < l; i++) {
		let child = children[i];
		let childSchema: INodeBindingSchema | null | undefined;

		switch (child.nodeType) {
			case Node.ELEMENT_NODE: {
				let childComponent = (child as IPossiblyComponentElement).$component;
				let $paramsConfig: { [name: string]: I$ComponentParamConfig } | undefined;
				let $specifiedParams: Set<string> | undefined;

				if (childComponent) {
					$paramsConfig = childComponent.constructor[KEY_PARAMS_CONFIG];
					$specifiedParams = new Set();
				}

				let attrs = (child as Element).attributes;

				for (let j = attrs.length; j; ) {
					let attr = attrs[--j];
					let name = attr.name;
					let targetName: string;

					if (name.charAt(0) == '_') {
						targetName = name.slice(1);
					} else {
						targetName = name;

						if (!name.lastIndexOf('oncomponent-', 0) || !name.lastIndexOf('on-', 0)) {
							child[KEY_CONTEXT] = context;

							if (
								!(
									(
										schema ||
										(schema = {
											index,
											specifiedParams: null,
											childComponents: null,
											attributes: null,
											textChildren: null,
											context: [],
											childSchemas: null
										})
									).context || (schema.context = [])
								).length ||
								schema.context![schema.context!.length - 1] != i
							) {
								schema.context!.push(i);
							}
						}
					}

					let $paramConfig = $paramsConfig && $paramsConfig[targetName];

					if ($paramConfig) {
						$specifiedParams!.add($paramConfig.name);
					}

					let value = attr.value;

					if (!value) {
						continue;
					}

					let valueAST = contentNodeValueASTCache[value];

					if (!valueAST) {
						if (valueAST === null) {
							continue;
						}

						let bracketIndex = value.indexOf('{');

						if (bracketIndex == -1) {
							contentNodeValueASTCache[value] = null;
							continue;
						}

						valueAST = contentNodeValueASTCache[value] = new ContentNodeValueParser(
							value
						).parse(bracketIndex);
					}

					let valueASTLength = valueAST.length;

					if (
						valueASTLength > 1 ||
						valueAST[0].nodeType == ContentNodeValueNodeType.BINDING
					) {
						bindAttribute(
							child as Element,
							name,
							targetName,
							value,
							valueAST,
							$paramConfig,
							context,
							result
						);

						if (
							!(
								(
									childSchema ||
									(childSchema = {
										index: i,
										specifiedParams: null,
										childComponents: null,
										attributes: [],
										textChildren: null,
										context: null,
										childSchemas: null
									})
								).attributes || (childSchema.attributes = [])
							).length ||
							childSchema.attributes![childSchema.attributes!.length - 1] != name
						) {
							childSchema.attributes!.push(name);
						}
					}
				}

				if (childComponent) {
					childComponent._ownerComponent = ownerComponent;
					childComponent.$context = context;
					childComponent.$specifiedParams = $specifiedParams;

					if (childSchema) {
						childSchema.specifiedParams = $specifiedParams!;
					} else {
						childSchema = {
							index: i,
							specifiedParams: $specifiedParams!,
							childComponents: null,
							attributes: null,
							textChildren: null,
							context: null,
							childSchemas: null
						};
					}

					if (parentComponent) {
						(
							parentComponent[KEY_CHILD_COMPONENTS] ||
							(parentComponent[KEY_CHILD_COMPONENTS] = [])
						).push(childComponent);
					} else {
						(result[0] || (result[0] = [])).push(childComponent);
					}

					(
						(
							schema ||
							(schema = {
								index,
								specifiedParams: null,
								childComponents: [],
								attributes: null,
								textChildren: null,
								context: null,
								childSchemas: null
							})
						).childComponents || (schema.childComponents = [])
					).push(i);
				}

				if (
					child.firstChild &&
					(!childComponent ||
						!(childComponent.constructor as typeof BaseComponent).bindsInputContent)
				) {
					childSchema = bindContent$(
						child as Element,
						i,
						ownerComponent,
						context,
						result,
						childSchema,
						childComponent
					);
				}

				break;
			}
			case Node.TEXT_NODE: {
				let nextChild = child.nextSibling;

				if (nextChild && nextChild.nodeType == Node.TEXT_NODE) {
					do {
						child.nodeValue += nextChild.nodeValue!;
						node.removeChild(nextChild);
						nextChild = child.nextSibling;
						l--;
					} while (nextChild && nextChild.nodeType == Node.TEXT_NODE);
				}

				let value = child.nodeValue!;
				let valueAST = contentNodeValueASTCache[value];

				if (!valueAST) {
					if (valueAST === null) {
						continue;
					}

					let bracketIndex = value.indexOf('{');

					if (bracketIndex == -1) {
						contentNodeValueASTCache[value] = null;
						continue;
					}

					valueAST = contentNodeValueASTCache[value] = new ContentNodeValueParser(
						value
					).parse(bracketIndex);
				}

				if (
					valueAST.length > 1 ||
					valueAST[0].nodeType == ContentNodeValueNodeType.BINDING
				) {
					bindTextNode(child as Text, valueAST, context, result);

					(
						(
							schema ||
							(schema = {
								index,
								specifiedParams: null,
								childComponents: null,
								attributes: null,
								textChildren: [],
								context: null,
								childSchemas: null
							})
						).textChildren || (schema.textChildren = [])
					).push(i);
				}

				break;
			}
		}

		if (childSchema) {
			(
				(
					schema ||
					(schema = {
						index,
						specifiedParams: null,
						childComponents: null,
						attributes: null,
						textChildren: null,
						context: null,
						childSchemas: []
					})
				).childSchemas || (schema.childSchemas = [])
			).push(childSchema);
		}
	}

	return schema || null;
}

function bindContentBySchema(
	node: Element | DocumentFragment,
	schema: INodeBindingSchema,
	ownerComponent: BaseComponent,
	context: object,
	result: [
		Array<BaseComponent> | null,
		Array<IFreezableCell> | null,
		Array<BaseComponent | string | TListener> | null
	],
	parentComponent?: BaseComponent
) {
	let component = (node as IPossiblyComponentElement).$component;
	let $paramsConfig: { [name: string]: I$ComponentParamConfig } | undefined;

	if (component) {
		$paramsConfig = component.constructor[KEY_PARAMS_CONFIG];
	}

	let children = node.childNodes;

	if (schema.textChildren) {
		for (let index of schema.textChildren) {
			let child = children[index];
			let nextChild = child.nextSibling;

			if (nextChild && nextChild.nodeType == Node.TEXT_NODE) {
				do {
					child.nodeValue += nextChild.nodeValue!;
					node.removeChild(nextChild);
					nextChild = child.nextSibling;
				} while (nextChild && nextChild.nodeType == Node.TEXT_NODE);
			}

			bindTextNode(
				child as Text,
				contentNodeValueASTCache[child.nodeValue!]!,
				context,
				result
			);
		}
	}

	if (schema.specifiedParams) {
		(node as IComponentElement).$component.$specifiedParams = schema.specifiedParams;
	}

	if (schema.childComponents) {
		for (let index of schema.childComponents) {
			let childComponent = (children[index] as IComponentElement).$component;
			childComponent._ownerComponent = ownerComponent;
			childComponent.$context = context;

			if (parentComponent) {
				(
					parentComponent[KEY_CHILD_COMPONENTS] ||
					(parentComponent[KEY_CHILD_COMPONENTS] = [])
				).push(childComponent);
			} else {
				(result[0] || (result[0] = [])).push(childComponent);
			}
		}
	}

	if (schema.attributes) {
		for (let name of schema.attributes) {
			let targetName = name.charAt(0) == '_' ? name.slice(1) : name;
			let value = (node as Element).getAttribute(name)!;

			bindAttribute(
				node as Element,
				name,
				targetName,
				value,
				contentNodeValueASTCache[value]!,
				$paramsConfig && $paramsConfig[targetName],
				context,
				result
			);
		}
	}

	if (schema.context) {
		for (let index of schema.context) {
			children[index][KEY_CONTEXT] = context;
		}
	}

	if (schema.childSchemas) {
		for (let childSchema of schema.childSchemas) {
			bindContentBySchema(
				children[childSchema.index] as Element,
				childSchema,
				ownerComponent,
				context,
				result,
				component
			);
		}
	}
}

function bindAttribute(
	el: Element,
	name: string,
	targetName: string,
	value: string,
	valueAST: TContentNodeValue,
	$paramConfig: I$ComponentParamConfig | undefined,
	context: object,
	result: [
		Array<BaseComponent> | null,
		Array<IFreezableCell> | null,
		Array<BaseComponent | string | TListener> | null
	]
) {
	let prefix = valueAST.length == 1 ? (valueAST[0] as IContentNodeValueBinding).prefix : null;

	if (prefix !== '->') {
		let cell = new Cell<any, IAttributeBindingCellMeta>(
			compileContentNodeValue(valueAST, value, valueAST.length == 1),
			{
				context,
				meta: {
					element: el,
					attributeName: targetName
				},
				onChange: onAttributeBindingCellChange
			}
		);

		setAttribute(el, targetName, cell.get());

		(result[1] || (result[1] = [])).push(cell as IFreezableCell);
	}

	let paramConfig: IComponentParamConfig | Function | undefined;

	if ($paramConfig) {
		paramConfig = $paramConfig.paramConfig;
	}

	if (paramConfig !== undefined && (prefix === '->' || prefix === '<->')) {
		if (prefix == '->' && name.charAt(0) != '_') {
			el.removeAttribute(name);
		}

		let keypath = (valueAST[0] as IContentNodeValueBinding).keypath!;
		let keys = keypath.split('.');
		let handler: TListener;

		if (keys.length == 1) {
			handler = (propertyName => {
				return function(evt: IEvent) {
					this.ownerComponent[propertyName] = evt.data.value;
				};
			})(keys[0]);
		} else {
			handler = ((propertyName, keys) => {
				let getPropertyHolder = compileKeypath(keys, keys.join('.'));

				return function(evt: IEvent) {
					let propertyHolder = getPropertyHolder.call(this.ownerComponent);

					if (propertyHolder) {
						propertyHolder[propertyName] = evt.data.value;
					}
				};
			})(keys[keys.length - 1], keys.slice(0, -1));
		}

		(result[2] || (result[2] = [])).push(
			(el as IComponentElement).$component,
			(typeof paramConfig == 'object' &&
				(paramConfig.type !== undefined || paramConfig.default !== undefined) &&
				paramConfig.property) ||
				$paramConfig!.name,
			handler
		);
	}
}

function bindTextNode(
	textNode: Text,
	valueAST: TContentNodeValue,
	context: object,
	result: [
		Array<BaseComponent> | null,
		Array<IFreezableCell> | null,
		Array<BaseComponent | string | TListener> | null
	]
) {
	let cell = new Cell<string, { textNode: Text }>(
		compileContentNodeValue(valueAST, textNode.nodeValue!, false),
		{
			context,
			meta: { textNode },
			onChange: onTextNodeBindingCellChange
		}
	);

	textNode.nodeValue = cell.get();

	(result[1] || (result[1] = [])).push(cell as IFreezableCell);
}
