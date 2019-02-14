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

export type TResult = [
	Array<BaseComponent> | null,
	Array<IFreezableCell> | null,
	Array<BaseComponent | string | TListener> | null
];

export const KEY_CONTEXT = Symbol('Rionite/bindContent[context]');

const contentNodeValueASTCache: { [nodeValue: string]: TContentNodeValue | null } = {
	__proto__: null
};

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

export function bindContent(
	node: Element | DocumentFragment,
	ownerComponent: BaseComponent,
	context: object,
	result: TResult,
	parentComponent?: BaseComponent
): TResult {
	for (let child: Node | null = node.firstChild; child; child = child.nextSibling) {
		switch (child.nodeType) {
			case Node.ELEMENT_NODE: {
				let childComponent = (child as IPossiblyComponentElement).rioniteComponent;
				let $paramsConfig: { [name: string]: I$ComponentParamConfig } | undefined;
				let $specifiedParams: Set<string> | undefined;

				if (childComponent) {
					$paramsConfig = childComponent.constructor[KEY_PARAMS_CONFIG];
					$specifiedParams = new Set();
				}

				let attrs = (child as Element).attributes;

				for (let i = attrs.length; i; ) {
					let attr = attrs[--i];
					let name = attr.name;
					let targetName: string;

					if (name.charAt(0) == '_') {
						targetName = name.slice(1);
					} else {
						targetName = name;

						if (!name.lastIndexOf('oncomponent-', 0) || !name.lastIndexOf('on-', 0)) {
							child[KEY_CONTEXT] = context;
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
						let prefix =
							valueAST.length == 1
								? (valueAST[0] as IContentNodeValueBinding).prefix
								: null;

						if (prefix === '=') {
							setAttribute(
								child as Element,
								targetName,
								compileContentNodeValue(valueAST, value, true).call(context)
							);
						} else {
							if (prefix !== '->') {
								let cell = new Cell<any, IAttributeBindingCellMeta>(
									compileContentNodeValue(valueAST, value, valueAST.length == 1),
									{
										context,
										meta: {
											element: child as Element,
											attributeName: targetName
										},
										onChange: onAttributeBindingCellChange
									}
								);

								setAttribute(child as Element, targetName, cell.get());

								(result[1] || (result[1] = [])).push(cell as IFreezableCell);
							}

							let paramConfig: IComponentParamConfig | Function | undefined;

							if ($paramConfig) {
								paramConfig = $paramConfig.paramConfig;
							}

							if (
								paramConfig !== undefined &&
								(prefix === '->' || prefix === '<->')
							) {
								if (prefix == '->' && name.charAt(0) != '_') {
									(child as Element).removeAttribute(name);
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
										let getPropertyHolder = compileKeypath(
											keys,
											keys.join('.')
										);

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
					if (
						valueAST.length == 1 &&
						(valueAST[0] as IContentNodeValueBinding).prefix === '='
					) {
						child.nodeValue = compileContentNodeValue(valueAST, value, false).call(
							context
						);
					} else {
						let cell = new Cell<string, { textNode: Text }>(
							compileContentNodeValue(valueAST, value, false),
							{
								context,
								meta: { textNode: child as Text },
								onChange: onTextNodeBindingCellChange
							}
						);

						child.nodeValue = cell.get();

						(result[1] || (result[1] = [])).push(cell as IFreezableCell);
					}
				}

				break;
			}
		}
	}

	return result;
}
