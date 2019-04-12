import { Set } from '@riim/map-set-polyfill';
import { setAttribute } from '@riim/set-attribute';
import { Cell, IEvent, TListener } from 'cellx';
import {
	BaseComponent,
	I$ComponentParamConfig,
	IComponentParamConfig,
	IPossiblyComponentElement
	} from './BaseComponent';
import { compileContentNodeValue } from './compileContentNodeValue';
import { IFreezableCell } from './componentBinding';
import { KEY_CHILD_COMPONENTS, KEY_PARAMS_CONFIG } from './Constants';
import {
	ContentNodeValueNodeType,
	ContentNodeValueParser,
	IContentNodeValueBinding,
	TContentNodeValue
	} from './ContentNodeValueParser';
import { compileKeypath } from './lib/compileKeypath';

export type TContentBindingResult = [
	Array<BaseComponent> | null,
	Array<IFreezableCell> | null,
	Array<BaseComponent | string | TListener> | null
];

export const KEY_CONTEXT = Symbol('Rionite/bindContent[context]');

export const contentNodeValueASTCache: Record<string, TContentNodeValue | null> = Object.create(
	null
);

export interface IAttributeBindingCellMeta {
	element: Element;
	attributeName: string;
}

export function onAttributeBindingCellChange(evt: IEvent<Cell<any, IAttributeBindingCellMeta>>) {
	setAttribute(evt.target.meta!.element, evt.target.meta!.attributeName, evt.data.value);
}

export function onTextNodeBindingCellChange(evt: IEvent<Cell<string, { textNode: Text }>>) {
	evt.target.meta!.textNode.nodeValue = evt.data.value;
}

export function bindContent(
	node: Element | DocumentFragment,
	ownerComponent: BaseComponent,
	context: object,
	result: TContentBindingResult,
	parentComponent?: BaseComponent
): TContentBindingResult {
	for (let child: Node | null = node.firstChild; child; child = child.nextSibling) {
		switch (child.nodeType) {
			case Node.ELEMENT_NODE: {
				let childComponent = (child as IPossiblyComponentElement).rioniteComponent;
				let $paramsConfig: Record<string, I$ComponentParamConfig> | undefined;
				let $specifiedParams: Set<string> | undefined;

				if (childComponent) {
					$paramsConfig = childComponent.constructor[KEY_PARAMS_CONFIG];
					$specifiedParams = new Set();
				}

				let attrs = (child as Element).attributes;

				for (let i = attrs.length; i; ) {
					let attr = attrs[--i];
					let attrName = attr.name;
					let targetAttrName: string;

					if (attrName.charAt(0) == '_') {
						targetAttrName = attrName.slice(1);
					} else {
						targetAttrName = attrName;

						if (
							!attrName.lastIndexOf('oncomponent-', 0) ||
							!attrName.lastIndexOf('on-', 0)
						) {
							child[KEY_CONTEXT] = context;
						}
					}

					let $paramConfig = $paramsConfig && $paramsConfig[targetAttrName];

					if ($paramConfig) {
						$specifiedParams!.add($paramConfig.name);
					}

					let attrValue = attr.value;

					if (!attrValue) {
						continue;
					}

					let attrValueAST = contentNodeValueASTCache[attrValue];

					if (!attrValueAST) {
						if (attrValueAST === null) {
							continue;
						}

						let bracketIndex = attrValue.indexOf('{');

						if (bracketIndex == -1) {
							contentNodeValueASTCache[attrValue] = null;
							continue;
						}

						attrValueAST = new ContentNodeValueParser(attrValue).parse(bracketIndex);

						if (
							attrValueAST.length == 1 &&
							attrValueAST[0].nodeType == ContentNodeValueNodeType.TEXT
						) {
							contentNodeValueASTCache[attrValue] = null;
							continue;
						}

						contentNodeValueASTCache[attrValue] = attrValueAST;
					}

					let bindingPrefix =
						attrValueAST.length == 1
							? (attrValueAST[0] as IContentNodeValueBinding).prefix
							: null;

					if (bindingPrefix === '=') {
						setAttribute(
							child as Element,
							targetAttrName,
							compileContentNodeValue(attrValueAST, attrValue, true).call(context)
						);
					} else {
						if (bindingPrefix !== '->') {
							let cell = new Cell<any, IAttributeBindingCellMeta>(
								compileContentNodeValue(
									attrValueAST,
									attrValue,
									attrValueAST.length == 1
								),
								{
									context,
									meta: {
										element: child as Element,
										attributeName: targetAttrName
									},
									onChange: onAttributeBindingCellChange
								}
							);

							setAttribute(child as Element, targetAttrName, cell.get());

							(result[1] || (result[1] = [])).push(cell as IFreezableCell);
						}

						let paramConfig: IComponentParamConfig | Function | undefined;

						if ($paramConfig) {
							paramConfig = $paramConfig.paramConfig;
						}

						if (
							paramConfig !== undefined &&
							(bindingPrefix === '->' || bindingPrefix === '<->')
						) {
							if (bindingPrefix == '->' && attrName.charAt(0) != '_') {
								(child as Element).removeAttribute(attrName);
							}

							let keypath = (attrValueAST[0] as IContentNodeValueBinding).keypath!;
							let keys = keypath.split('.');
							let handler: TListener;

							if (keys.length == 1) {
								handler = (propertyName =>
									function(evt: IEvent) {
										this.ownerComponent[propertyName] = evt.data.value;
									})(keys[0]);
							} else {
								handler = ((propertyName, keys) => {
									let getPropertyHolder = compileKeypath(keys, keys.join('.'));

									return function(evt: IEvent) {
										let propertyHolder = getPropertyHolder.call(
											this.ownerComponent
										);

										if (propertyHolder) {
											propertyHolder[propertyName] = evt.data.value;
										}
									};
								})(keys[keys.length - 1], keys.slice(0, -1));
							}

							(result[2] || (result[2] = [])).push(
								childComponent!,
								(typeof paramConfig == 'object' &&
									(paramConfig.type || paramConfig.default !== undefined) &&
									paramConfig.property) ||
									$paramConfig!.name,
								handler
							);
						}
					}
				}

				if (childComponent) {
					childComponent._ownerComponent = ownerComponent;
					childComponent.$context = context;
					childComponent.$specifiedParams = $specifiedParams;

					if (parentComponent) {
						(
							parentComponent[KEY_CHILD_COMPONENTS] ||
							(parentComponent[KEY_CHILD_COMPONENTS] = [])
						).push(childComponent);
					} else {
						(result[0] || (result[0] = [])).push(childComponent);
					}
				}

				if (
					child.firstChild &&
					(!childComponent ||
						!(childComponent.constructor as typeof BaseComponent).bindsInputContent)
				) {
					bindContent(child as Element, ownerComponent, context, result, childComponent);
				}

				break;
			}
			case Node.TEXT_NODE: {
				let childValue = child.nodeValue!;
				let childValueAST = contentNodeValueASTCache[childValue];

				if (!childValueAST) {
					if (childValueAST === null) {
						continue;
					}

					let bracketIndex = childValue.indexOf('{');

					if (bracketIndex == -1) {
						contentNodeValueASTCache[childValue] = null;
						continue;
					}

					childValueAST = new ContentNodeValueParser(childValue).parse(bracketIndex);

					if (
						childValueAST.length == 1 &&
						childValueAST[0].nodeType == ContentNodeValueNodeType.TEXT
					) {
						contentNodeValueASTCache[childValue] = null;
						continue;
					}

					contentNodeValueASTCache[childValue] = childValueAST;
				}

				if (
					childValueAST.length == 1 &&
					(childValueAST[0] as IContentNodeValueBinding).prefix === '='
				) {
					child.nodeValue = compileContentNodeValue(
						childValueAST,
						childValue,
						false
					).call(context);
				} else {
					let cell = new Cell<string, { textNode: Text }>(
						compileContentNodeValue(childValueAST, childValue, false),
						{
							context,
							meta: { textNode: child as Text },
							onChange: onTextNodeBindingCellChange
						}
					);

					child.nodeValue = cell.get();

					(result[1] || (result[1] = [])).push(cell as IFreezableCell);
				}

				break;
			}
		}
	}

	return result;
}
