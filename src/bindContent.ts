import { Set } from '@riim/map-set-polyfill';
import { setAttribute } from '@riim/set-attribute';
import { Cell, IEvent, TListener } from 'cellx';
import {
	BaseComponent,
	I$ComponentParamConfig,
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

export const KEY_CHILD_COMPONENTS = Symbol('Rionite/bindContent[childComponents]');
export const KEY_CONTEXT = Symbol('Rionite/bindContent[context]');

const contentNodeValueCache: { [nodeValue: string]: TContentNodeValue | null } = Object.create(
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

export function bindContent(
	node: Element | DocumentFragment,
	ownerComponent: BaseComponent,
	context: object,
	result: [
		Array<IFreezableCell> | null,
		Array<[BaseComponent, string, (evt: any) => void]> | null,
		Array<BaseComponent> | null
	],
	parentComponent?: BaseComponent
) {
	for (let child = node.firstChild; child; child = child.nextSibling) {
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

				for (let i = attrs.length; i; ) {
					let attr = attrs[--i];
					let name = attr.name;

					if (name.charAt(0) == '_') {
						name = name.slice(1);
					} else if (
						!name.lastIndexOf('oncomponent-', 0) ||
						!name.lastIndexOf('on-', 0)
					) {
						child[KEY_CONTEXT] = context;
					}

					let $paramConfig = $paramsConfig && $paramsConfig[name];

					let paramName: string | undefined;
					let paramConfig: IComponentParamConfig | Function | undefined;

					if ($paramConfig) {
						paramName = $paramConfig.name;
						paramConfig = $paramConfig.paramConfig;

						$specifiedParams!.add(paramName!);
					}

					let value = attr.value;

					if (!value) {
						continue;
					}

					let contentNodeValue = contentNodeValueCache[value];

					if (!contentNodeValue) {
						if (contentNodeValue === null) {
							continue;
						}

						let bracketIndex = value.indexOf('{');

						if (bracketIndex == -1) {
							contentNodeValueCache[value] = null;
							continue;
						}

						contentNodeValue = contentNodeValueCache[
							value
						] = new ContentNodeValueParser(value).parse(bracketIndex);
					}

					let contentNodeValueLength = contentNodeValue.length;

					if (
						contentNodeValueLength > 1 ||
						contentNodeValue[0].nodeType == ContentNodeValueNodeType.BINDING
					) {
						let prefix =
							contentNodeValueLength == 1
								? (contentNodeValue[0] as IContentNodeValueBinding).prefix
								: null;

						if (prefix !== '->') {
							let cell = new Cell<any, IAttributeBindingCellMeta>(
								compileContentNodeValue(
									contentNodeValue,
									value,
									contentNodeValueLength == 1
								),
								{
									context,
									meta: {
										element: child as any,
										attributeName: name
									},
									onChange: onAttributeBindingCellChange
								}
							);

							setAttribute(child as any, name, cell.get());

							(result[0] || (result[0] = [])).push(cell as any);
						}

						if (paramConfig !== undefined && (prefix === '->' || prefix === '<->')) {
							if (prefix == '->' && attr.name.charAt(0) != '_') {
								(child as Element).removeAttribute(name);
							}

							let keypath = (contentNodeValue[0] as IContentNodeValueBinding)
								.keypath!;
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
										let propertyHolder = getPropertyHolder.call(
											this.ownerComponent
										);

										if (propertyHolder) {
											propertyHolder[propertyName] = evt.data.value;
										}
									};
								})(keys[keys.length - 1], keys.slice(0, -1));
							}

							(result[1] || (result[1] = [])).push([
								childComponent!,
								(typeof paramConfig == 'object' &&
									(paramConfig.type !== undefined ||
										paramConfig.default !== undefined) &&
									paramConfig.property) ||
									paramName!,
								handler
							]);
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
						(result[2] || (result[2] = [])).push(childComponent);
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
				let nextChild = child.nextSibling;

				if (nextChild && nextChild.nodeType == Node.TEXT_NODE) {
					do {
						child.nodeValue += nextChild.nodeValue!;
						node.removeChild(nextChild);
						nextChild = child.nextSibling;
					} while (nextChild && nextChild.nodeType == Node.TEXT_NODE);
				}

				let value = child.nodeValue!;
				let contentNodeValue = contentNodeValueCache[value];

				if (!contentNodeValue) {
					if (contentNodeValue === null) {
						continue;
					}

					let bracketIndex = value.indexOf('{');

					if (bracketIndex == -1) {
						contentNodeValueCache[value] = null;
						continue;
					}

					contentNodeValue = contentNodeValueCache[value] = new ContentNodeValueParser(
						value
					).parse(bracketIndex);
				}

				if (
					contentNodeValue.length > 1 ||
					contentNodeValue[0].nodeType == ContentNodeValueNodeType.BINDING
				) {
					let cell = new Cell<string, { textNode: Text }>(
						compileContentNodeValue(contentNodeValue, value, false),
						{
							context,
							meta: {
								textNode: child as any
							},
							onChange: onTextNodeBindingCellChange
						}
					);

					child.nodeValue = cell.get();

					(result[0] || (result[0] = [])).push(cell as any);
				}

				break;
			}
		}
	}

	return result;
}
