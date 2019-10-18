import { Cell, IEvent, TListener } from 'cellx';
import { BaseComponent, I$ComponentParamConfig, IPossiblyComponentElement } from './BaseComponent';
import { compileTemplateNodeValue } from './compileTemplateNodeValue';
import { IBinding } from './componentBinding';
import { KEY_CHILD_COMPONENTS, KEY_PARAMS_CONFIG } from './Constants';
import { getTemplateNodeValueAST } from './getTemplateNodeValueAST';
import { compileKeypath } from './lib/compileKeypath';
import { setAttribute } from './lib/setAttribute';
import { ITemplateNodeValueBinding, TTemplateNodeValueAST } from './TemplateNodeValueParser';

export type TContentBindingResult = [
	Array<BaseComponent> | null,
	Array<IBinding> | null,
	Array<BaseComponent | string | TListener> | null
];

export const KEY_CONTEXT = Symbol('context');

export const templateNodeValueASTCache = new Map<string, TTemplateNodeValueAST | null>();

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
				let $paramsConfig: Map<string, I$ComponentParamConfig> | null | undefined;
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

					let $paramConfig = $paramsConfig && $paramsConfig.get(targetAttrName);
					let attrValue = attr.value;

					if ($paramConfig) {
						$specifiedParams!.add($paramConfig.name);
					}

					if (!attrValue) {
						continue;
					}

					let attrValueAST = getTemplateNodeValueAST(attrValue);

					if (!attrValueAST) {
						continue;
					}

					let bindingPrefix =
						attrValueAST.length == 1
							? (attrValueAST[0] as ITemplateNodeValueBinding).prefix
							: null;

					if (bindingPrefix === '=') {
						setAttribute(
							child as Element,
							targetAttrName,
							compileTemplateNodeValue(attrValueAST, attrValue, true).call(context, {
								meta: {
									element: child,
									attributeName: targetAttrName
								}
							})
						);
					} else {
						if (bindingPrefix !== '->') {
							let cell = new Cell<any, IAttributeBindingCellMeta>(
								compileTemplateNodeValue(
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

							(result[1] || (result[1] = [])).push(cell as IBinding);
						}

						if ($paramConfig && (bindingPrefix === '->' || bindingPrefix === '<->')) {
							if (bindingPrefix == '->' && attrName.charAt(0) != '_') {
								(child as Element).removeAttribute(attrName);
							}

							let keypath = (attrValueAST[0] as ITemplateNodeValueBinding).keypath!.split(
								'.'
							);

							(result[2] || (result[2] = [])).push(
								childComponent!,
								$paramConfig.property,
								keypath.length == 1
									? (propertyName =>
											function(evt: IEvent) {
												this.ownerComponent[propertyName] = evt.data.value;
											})(keypath[0])
									: ((propertyName, keypath) => {
											let getPropertyHolder = compileKeypath(
												keypath,
												keypath.join('.')
											);

											return function(evt: IEvent) {
												let propertyHolder = getPropertyHolder.call(
													this.ownerComponent
												);

												if (propertyHolder) {
													propertyHolder[propertyName] = evt.data.value;
												}
											};
									  })(keypath[keypath.length - 1], keypath.slice(0, -1))
							);
						}
					}
				}

				if (childComponent) {
					childComponent._ownerComponent = ownerComponent;
					childComponent.$context = context;
					childComponent.$specifiedParams = $specifiedParams!;

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
				let childValueAST = getTemplateNodeValueAST(childValue);

				if (!childValueAST) {
					break;
				}

				if (
					childValueAST.length == 1 &&
					(childValueAST[0] as ITemplateNodeValueBinding).prefix === '='
				) {
					child.nodeValue = compileTemplateNodeValue(
						childValueAST,
						childValue,
						false
					).call(context);
				} else {
					let cell = new Cell<string, { textNode: Text }>(
						compileTemplateNodeValue(childValueAST, childValue, false),
						{
							context,
							meta: { textNode: child as Text },
							onChange: onTextNodeBindingCellChange
						}
					);

					child.nodeValue = cell.get();

					(result[1] || (result[1] = [])).push(cell as IBinding);
				}

				break;
			}
		}
	}

	return result;
}
