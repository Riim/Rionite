import { kebabCase } from '@riim/kebab-case';
import { snakeCaseAttributeName } from '@riim/rionite-snake-case-attribute-name';
import {
	NodeType as ParserNodeType,
	TContent as TParserContent,
	TElement as TParserElement,
	TElementAttributes as TParserElementAttributes,
	TemplateParser,
	TNode as TParserNode,
	TSuperCall as TParserSuperCall
	} from '@riim/rionite-template-parser-2';
import { Cell, IEvent } from 'cellx';
import { BaseComponent, I$ComponentParamConfig, IPossiblyComponentElement } from './BaseComponent';
import {
	IAttributeBindingCellMeta,
	KEY_CONTEXT,
	onAttributeBindingCellChange,
	onTextNodeBindingCellChange,
	TContentBindingResult
	} from './bindContent';
import { compileTemplateNodeValue } from './compileTemplateNodeValue';
import { IBinding } from './componentBinding';
import { componentConstructors } from './componentConstructors';
import { config } from './config';
import { KEY_CHILD_COMPONENTS, KEY_PARAMS_CONFIG } from './Constants';
import { KEY_DOM_EVENTS } from './handleDOMEvent';
import { KEY_EVENTS } from './handleEvent';
import { compileKeypath } from './lib/compileKeypath';
import { setAttribute } from './lib/setAttribute';
import { SVG_NAMESPACE_URI } from './lib/SVG_NAMESPACE_URI';
import { parseTemplateNodeValue } from './parseTemplateNodeValue';
import { ITemplateNodeValueBinding } from './TemplateNodeValueParser';

export enum NodeType {
	BLOCK = 1,
	ELEMENT,
	TEXT,
	ELEMENT_CALL,
	SUPER_CALL,
	DEBUGGER_CALL
}

export interface INode {
	nodeType: NodeType;
}

export type TContent = Array<INode>;

export interface IElementAttribute {
	isTransformer: boolean;
	name: string;
	value: string;
}

export interface IElementAttributeList {
	[attrIndex: number]: IElementAttribute;
	'length=': number;
}

export interface IElementAttributes {
	attributeIsValue: string | null;
	list: IElementAttributeList | null;
}

export interface IElement extends INode {
	nodeType: NodeType.ELEMENT;
	names: Array<string | null> | null;
	isTransformer: boolean;
	namespaceSVG: boolean;
	tagName: string;
	is: string | null;
	attributes: IElementAttributes | null;
	$specifiedParams: Set<string> | null;
	events: Map<string | symbol, string> | null;
	domEvents: Map<string, string> | null;
	content: TContent | null;
	contentTemplateIndex: number | null;
}

export interface ITextNode extends INode {
	nodeType: NodeType.TEXT;
	value: string;
}

export interface IBlock extends INode {
	nodeType: NodeType.BLOCK;
	content: TContent | null;
	elements: Record<string, IElement>;
}

export interface IElementCall extends INode {
	nodeType: NodeType.ELEMENT_CALL;
	name: string;
}

export interface ISuperCall extends INode {
	nodeType: NodeType.SUPER_CALL;
	elementName: string;
	element: IElement;
}

export interface IDebuggerCall extends INode {
	nodeType: NodeType.DEBUGGER_CALL;
}

export const KEY_CONTENT_TEMPLATE = Symbol('contentTemplate');

export const ELEMENT_NAME_DELIMITER = '__';

export class Template {
	static elementTransformers: Record<string, (el: IElement) => TContent | null> = {
		section: (el) => el.content
	};

	static attributeTransformers: Record<
		string,
		(el: IElement, attr: IElementAttribute) => IElement
	> = {};

	_embedded: boolean;

	parent: Template | null;
	template: TParserContent | null;

	initialized = false;
	block: IBlock | null;
	_elements: Record<string, IElement>;
	_elementNamesTemplate: Array<string>;
	_embeddedTemplates: Array<Template> | null;

	constructor(
		template: string | TParserContent | IBlock,
		options?: {
			_embedded?: boolean;
			parent?: Template;
			blockName?: string | Array<string>;
		}
	) {
		let embedded = (this._embedded = !!(options && options._embedded));
		let parent = (this.parent = (options && options.parent) || null);

		if (typeof template == 'string') {
			template = new TemplateParser(template).parse();
		}

		if (Array.isArray(template)) {
			this.template = template;
			this.block = null;
		} else {
			this.template = null;
			this.block = template;

			if (this._embedded) {
				this._elements = template.elements;
			}
		}

		if (embedded) {
			this._elementNamesTemplate = parent!._elementNamesTemplate;
		} else {
			let blockName = options && options.blockName;

			if (Array.isArray(blockName)) {
				this.setBlockName(blockName);
			} else if (parent) {
				this._elementNamesTemplate = blockName
					? [blockName + ELEMENT_NAME_DELIMITER].concat(parent._elementNamesTemplate)
					: parent._elementNamesTemplate.slice();
			} else if (blockName) {
				this._elementNamesTemplate = [blockName + ELEMENT_NAME_DELIMITER, ''];
			} else {
				this._elementNamesTemplate = ['', ''];
			}
		}
	}

	initialize(component?: BaseComponent | null) {
		if (this.initialized) {
			return;
		}

		this.initialized = true;

		if (this.parent) {
			this.parent.parse(component);
		}

		let parent = this.parent;

		if (!this._embedded) {
			this._elements = parent
				? { __proto__: parent._elements as any }
				: {
						__proto__: null as any,
						'@root': {
							nodeType: NodeType.ELEMENT,
							names: ['root'],
							isTransformer: true,
							namespaceSVG: false,
							tagName: 'section',
							is: null,
							attributes: null,
							$specifiedParams: null,
							events: null,
							domEvents: null,
							content: [],
							contentTemplateIndex: null
						}
				  };
		}

		this._embeddedTemplates = this._embedded
			? parent!._embeddedTemplates
			: parent &&
			  parent._embeddedTemplates &&
			  parent._embeddedTemplates.map(
					(template) =>
						new Template(
							{
								nodeType: NodeType.BLOCK,
								content: template.block!.content,
								elements: this._elements
							},
							{
								_embedded: true,
								parent: this
							}
						)
			  );
	}

	parse(component?: BaseComponent | null): IBlock {
		this.initialize(component);

		if (this.block) {
			return this.block;
		}

		let block = (this.block = {
			nodeType: NodeType.BLOCK,
			content: null,
			elements: this._elements
		});

		this._readContent(
			this.parent ? null : block.elements['@root'].content,
			this.template!,
			false,
			null,
			component && (component.constructor as typeof BaseComponent)
		);

		return block;
	}

	_setElement(name: string, override: boolean, el: IElement) {
		if (this._elements[name]) {
			if (override) {
				config.logError(`Explicit overriding non-existing element "${name}"`);
			}
		} else {
			if (!override) {
				config.logError(`Implicit overriding of element "${name}"`);
			}
		}

		this._elements[name] = el;
	}

	_readContent(
		targetContent: TContent | null,
		content: TParserContent,
		namespaceSVG: boolean,
		superElName: string | null,
		componentCtor?: typeof BaseComponent | null
	): TContent | null {
		for (let node of content) {
			switch (node[0]) {
				case ParserNodeType.ELEMENT: {
					targetContent = this._readElement(
						targetContent,
						node as TParserElement,
						namespaceSVG,
						superElName,
						componentCtor
					);

					break;
				}
				case ParserNodeType.TEXT: {
					(targetContent || (targetContent = [])).push({
						nodeType: NodeType.TEXT,
						value: node[1]
					} as ITextNode);

					break;
				}
				case ParserNodeType.SUPER_CALL: {
					(targetContent || (targetContent = [])).push(
						this._readSuperCall(node as TParserSuperCall, superElName)
					);

					break;
				}
				case ParserNodeType.DEBUGGER_CALL: {
					(targetContent || (targetContent = [])).push({
						nodeType: NodeType.DEBUGGER_CALL
					} as IDebuggerCall);

					break;
				}
			}
		}

		return targetContent;
	}

	_readElement(
		targetContent: TContent | null,
		elNode: TParserElement,
		namespaceSVG: boolean,
		superElName: string | null,
		componentCtor?: typeof BaseComponent | null
	): TContent | null {
		let elNames = elNode[1] as Array<string | null> | undefined;
		let override = elNode[2] == 1;
		let isTransformer = !!elNode[3];
		let tagName = elNode[4] || null;

		if (elNames && !elNames[0]) {
			elNames[0] = null;
		}

		let elName: string | null = elNames
			? isTransformer
				? elNames[0] && '@' + elNames[0]
				: elNames[0]
			: null;

		if (tagName) {
			if (!namespaceSVG) {
				if (tagName.toLowerCase() == 'svg') {
					namespaceSVG = true;
					tagName = 'svg';
				} else if (elName) {
					let superEl: IElement | undefined;

					if (this.parent && (superEl = this.parent._elements[elName])) {
						namespaceSVG = superEl.namespaceSVG;
					}
				}
			}

			if (!isTransformer && !namespaceSVG) {
				tagName = kebabCase(tagName, true);
			}
		} else {
			if (!elName) {
				this._throwError('Expected element', elNode);
			}

			let superEl: IElement | undefined;

			if (!this.parent || !(superEl = this.parent._elements[elName!])) {
				throw this._throwError('Element.tagName is required', elNode);
			}

			if (!namespaceSVG) {
				namespaceSVG = superEl.namespaceSVG;
			}
			tagName = superEl.tagName;
		}

		let elComponentCtor =
			isTransformer || namespaceSVG ? null : componentConstructors.get(tagName);

		let attrs: IElementAttributes | null | undefined;
		let $specifiedParams: Set<string> | undefined;

		if (elComponentCtor) {
			$specifiedParams = new Set();
		}

		if (elNode[5]) {
			attrs = this._readAttributes(
				elNode[5],
				namespaceSVG,
				elName || superElName,
				elComponentCtor && elComponentCtor[KEY_PARAMS_CONFIG],
				$specifiedParams
			);
		}

		let events: Map<string | symbol, string> | undefined;
		let domEvents: Map<string, string> | undefined;

		if (elNames && componentCtor) {
			let componentEvents = componentCtor.events;
			let componentDOMEvents = componentCtor.domEvents;

			if (componentEvents || componentDOMEvents) {
				for (let name of elNames) {
					if (!name) {
						continue;
					}

					let elEvents = componentEvents && componentEvents[name];

					for (let type in elEvents) {
						if (elEvents[type] !== Object.prototype[type]) {
							(events || (events = new Map())).set(type, name);
						}
					}

					while (elEvents) {
						for (let type of Object.getOwnPropertySymbols(elEvents)) {
							if (!events || !events.has(type)) {
								(events || (events = new Map())).set(type, name);
							}
						}

						elEvents = elEvents.__proto__ as any;

						if (elEvents == Object.prototype) {
							break;
						}
					}

					let elDOMEvents = componentDOMEvents && componentDOMEvents[name];

					for (let type in elDOMEvents) {
						if (elDOMEvents[type] !== Object.prototype[type]) {
							(domEvents || (domEvents = new Map())).set(type, name);
						}
					}
				}
			}
		}

		let content: TContent | null | undefined;

		if (elNode[6]) {
			content = this._readContent(
				null,
				elNode[6],
				namespaceSVG,
				elName || superElName,
				componentCtor
			);
		}

		let el: IElement = {
			nodeType: NodeType.ELEMENT,
			names: elNames || null,
			isTransformer,
			namespaceSVG,
			tagName,
			is: (attrs && attrs.attributeIsValue) || null,
			attributes: attrs || null,
			$specifiedParams: $specifiedParams || null,
			events: events || null,
			domEvents: domEvents || null,
			content: content || null,
			contentTemplateIndex: null
		};

		if (isTransformer) {
			let transformer = Template.elementTransformers[tagName];

			if (!transformer) {
				this._throwError(`Transformer "${tagName}" is not defined`, elNode);
			}

			content = transformer(el);

			if (content && content.length) {
				el.content = content;

				for (let i = 0, l = content.length; i < l; i++) {
					let node = content[i];

					if (node.nodeType == NodeType.ELEMENT) {
						if (
							!namespaceSVG &&
							(node as IElement).content &&
							((node as IElement).tagName == 'template' ||
								(node as IElement).tagName == 'rn-slot')
						) {
							let contentEl: IElement = {
								nodeType: NodeType.ELEMENT,
								names: (node as IElement).names,
								isTransformer: false,
								namespaceSVG: (node as IElement).namespaceSVG,
								tagName: (node as IElement).tagName,
								is: (node as IElement).is,
								attributes: (node as IElement).attributes,
								$specifiedParams: (node as IElement).$specifiedParams,
								events: (node as IElement).events,
								domEvents: (node as IElement).domEvents,
								content: (node as IElement).content,
								contentTemplateIndex:
									(
										this._embeddedTemplates || (this._embeddedTemplates = [])
									).push(
										new Template(
											{
												nodeType: NodeType.BLOCK,
												content: (node as IElement).content,
												elements: this._elements
											},
											{
												_embedded: true,
												parent: this
											}
										)
									) - 1
							};

							let elName = contentEl.names && contentEl.names[0];

							if (elName) {
								this._setElement(elName, override, contentEl);
								content[i] = {
									nodeType: NodeType.ELEMENT_CALL,
									name: elName
								} as IElementCall;
							} else {
								content[i] = contentEl;
							}
						} else {
							let elName = (node as IElement).names && (node as IElement).names![0];

							if (elName) {
								this._setElement(elName, override, node as IElement);
								content[i] = {
									nodeType: NodeType.ELEMENT_CALL,
									name: elName
								} as IElementCall;
							}
						}
					}
				}
			} else {
				el.content = null;
			}
		} else {
			let attrList = attrs && attrs.list;

			if (attrList) {
				for (let i = 0, l = attrList['length=']; i < l; i++) {
					let attr = attrList[i];

					if (attr.isTransformer) {
						let transformer = Template.attributeTransformers[attr.name];

						if (!transformer) {
							this._throwError(`Transformer "${attr.name}" is not defined`, elNode);
						}

						el = transformer(el, attr);

						for (let i = 0, l = (el.content || []).length; i < l; i++) {
							let node = el.content![i];

							if (node.nodeType == NodeType.ELEMENT) {
								if (
									!namespaceSVG &&
									(node as IElement).content &&
									((node as IElement).tagName == 'template' ||
										(node as IElement).tagName == 'rn-slot')
								) {
									let contentEl: IElement = {
										nodeType: NodeType.ELEMENT,
										names: (node as IElement).names,
										isTransformer: false,
										namespaceSVG: (node as IElement).namespaceSVG,
										tagName: (node as IElement).tagName,
										is: (node as IElement).is,
										attributes: (node as IElement).attributes,
										$specifiedParams: (node as IElement).$specifiedParams,
										events: (node as IElement).events,
										domEvents: (node as IElement).domEvents,
										content: (node as IElement).content,
										contentTemplateIndex:
											(
												this._embeddedTemplates ||
												(this._embeddedTemplates = [])
											).push(
												new Template(
													{
														nodeType: NodeType.BLOCK,
														content: (node as IElement).content,
														elements: this._elements
													},
													{
														_embedded: true,
														parent: this
													}
												)
											) - 1
									};

									let elName = contentEl.names && contentEl.names[0];

									if (elName) {
										this._setElement(elName, override, contentEl);
										el.content![i] = {
											nodeType: NodeType.ELEMENT_CALL,
											name: elName
										} as IElementCall;
									} else {
										el.content![i] = contentEl;
									}
								} else {
									let elName =
										(node as IElement).names && (node as IElement).names![0];

									if (elName) {
										this._setElement(elName, override, node as IElement);
										el.content![i] = {
											nodeType: NodeType.ELEMENT_CALL,
											name: elName
										} as IElementCall;
									}
								}
							}
						}
					}
				}

				elName = el.names && el.names[0];
			}

			if (el.content && (el.tagName == 'template' || el.tagName == 'rn-slot')) {
				el.contentTemplateIndex =
					(this._embeddedTemplates || (this._embeddedTemplates = [])).push(
						new Template(
							{
								nodeType: NodeType.BLOCK,
								content: el.content,
								elements: this._elements
							},
							{
								_embedded: true,
								parent: this
							}
						)
					) - 1;
			}
		}

		if (elName) {
			this._setElement(elName, override, el);
			(targetContent || (targetContent = [])).push({
				nodeType: NodeType.ELEMENT_CALL,
				name: elName
			} as IElementCall);
		} else {
			(targetContent || (targetContent = [])).push(el);
		}

		return targetContent;
	}

	_readAttributes(
		elAttrs: TParserElementAttributes,
		namespaceSVG: boolean,
		superElName: string | null,
		$paramsConfig?: Map<string, I$ComponentParamConfig> | null,
		$specifiedParams?: Set<string>
	): IElementAttributes | null {
		let superCall =
			elAttrs[0] &&
			this._readSuperCall(
				[ParserNodeType.SUPER_CALL, elAttrs[0] === 1 ? '' : elAttrs[0]],
				superElName
			);

		let attrIsValue: string | null | undefined;
		let list: IElementAttributeList | undefined;

		if (superCall) {
			let superElAttrs = superCall.element.attributes;

			if (superElAttrs) {
				let superElAttrList = superElAttrs.list;

				attrIsValue = superElAttrs.attributeIsValue;
				list = { __proto__: superElAttrList } as any;

				if ($paramsConfig && superElAttrList) {
					for (let i = 0, l = superElAttrList['length=']; i < l; i++) {
						let attr = superElAttrList[i];

						if (!attr.isTransformer && $paramsConfig.has(attr.name)) {
							$specifiedParams!.add($paramsConfig.get(attr.name)!.name);
						}
					}
				}
			}
		}

		if (elAttrs[1]) {
			for (let elAttr of elAttrs[1]) {
				let isTransformer = !!elAttr[0];
				let name = elAttr[1];

				if (!isTransformer && !namespaceSVG) {
					name = snakeCaseAttributeName(name, true);
				}

				let fullName = (isTransformer ? '@' : '') + name;
				let value = elAttr[2];

				if (fullName == 'is') {
					attrIsValue = value;
				} else {
					(list || (list = { __proto__: null, 'length=': 0 } as any))[
						list![fullName] === undefined
							? (list![fullName] = list!['length=']++)
							: list![fullName]
					] = {
						isTransformer,
						name,
						value
					} as IElementAttribute;
				}

				if ($paramsConfig && $paramsConfig.has(name)) {
					$specifiedParams!.add($paramsConfig.get(name)!.name);
				}
			}
		}

		return attrIsValue == null && !list
			? null
			: {
					attributeIsValue: attrIsValue || null,
					list: list || null
			  };
	}

	_readSuperCall(superCallNode: TParserSuperCall, defaultElName: string | null): ISuperCall {
		if (!this.parent) {
			this._throwError('SuperCall is impossible if there is no parent', superCallNode);
		}

		let elName: string =
			superCallNode[1] ||
			defaultElName ||
			(this._throwError('SuperCall.elementName is required', superCallNode) as any);
		let el =
			(elName.charAt(0) == '@' && this.parent!._elements[elName.slice(1)]) ||
			this.parent!._elements[elName];

		if (!el) {
			this._throwError(`Element "${elName}" is not defined`, superCallNode);
		}

		return {
			nodeType: NodeType.SUPER_CALL,
			elementName: elName,
			element: el
		};
	}

	_throwError(msg: string, node: TParserNode) {
		throw {
			type: TypeError,
			message: msg,
			node
		};
	}

	extend(
		template: string | TParserContent | IBlock,
		options?: {
			blockName?: string;
			_embedded?: boolean;
		}
	): Template {
		return new Template(template, {
			__proto__: options,
			parent: this
		} as any);
	}

	setBlockName(blockName: string | Array<string>): Template {
		if (Array.isArray(blockName)) {
			(this._elementNamesTemplate = blockName.map(
				(blockName) => blockName + ELEMENT_NAME_DELIMITER
			)).push('');
		} else {
			this._elementNamesTemplate[0] = blockName + ELEMENT_NAME_DELIMITER;
		}

		return this;
	}

	render(
		component?: BaseComponent | null,
		ownerComponent?: BaseComponent,
		context?: object,
		result?: TContentBindingResult,
		parentComponent?: BaseComponent
	): DocumentFragment {
		let block = this.parse(component);

		return renderContent(
			document.createDocumentFragment(),
			block.content || block.elements['@root'].content,
			this,
			ownerComponent,
			context,
			result,
			parentComponent
		);
	}
}

function renderContent<T extends Node = Element>(
	targetNode: T,
	content: TContent | null,
	template: Template,
	ownerComponent?: BaseComponent,
	context?: object,
	result?: TContentBindingResult,
	parentComponent?: BaseComponent
): T {
	if (content) {
		for (let node of content) {
			switch (node.nodeType) {
				case NodeType.ELEMENT_CALL: {
					node = template._elements[(node as IElementCall).name];
					break;
				}
				case NodeType.SUPER_CALL: {
					renderContent(
						targetNode,
						(node as ISuperCall).element.content,
						template,
						ownerComponent,
						context,
						result,
						parentComponent
					);

					continue;
				}
			}

			switch (node.nodeType) {
				case NodeType.ELEMENT: {
					if ((node as IElement).isTransformer) {
						renderContent(
							targetNode,
							(node as IElement).content,
							template,
							ownerComponent,
							context,
							result,
							parentComponent
						);
					} else {
						let tagName = (node as IElement).tagName;
						let el: Element;

						if ((node as IElement).namespaceSVG) {
							el = document.createElementNS(SVG_NAMESPACE_URI, tagName);
						} else if ((node as IElement).is) {
							el = (window as any).innerHTML(
								document.createElement('div'),
								`<${tagName} is="${(node as IElement).is}">`
							).firstChild as Element;
						} else {
							el = document.createElement(tagName);
						}

						let nodeComponent =
							result && (el as IPossiblyComponentElement).rioniteComponent;

						let className: string | null | undefined;

						if (nodeComponent) {
							className = (nodeComponent.constructor as typeof BaseComponent)
								._blockNamesString;
						}

						if ((node as IElement).names) {
							className =
								(className || '') +
								renderElementClasses(
									template._elementNamesTemplate,
									(node as IElement).names!
								);
						}

						let attrList =
							(node as IElement).attributes && (node as IElement).attributes!.list;

						if (attrList) {
							let $paramsConfig:
								| Map<string, I$ComponentParamConfig>
								| null
								| undefined;

							if (nodeComponent) {
								$paramsConfig = nodeComponent.constructor[KEY_PARAMS_CONFIG];
							}

							for (let i = 0, l = attrList['length=']; i < l; i++) {
								let attr = attrList[i];

								if (attr.isTransformer) {
									continue;
								}

								let attrName = attr.name;
								let attrValue: any = attr.value;

								if (attrName == 'class') {
									attrValue = (className || '') + attrValue;
									className = null;
								}

								if (result) {
									if (
										!attrName.lastIndexOf('oncomponent-', 0) ||
										!attrName.lastIndexOf('on-', 0)
									) {
										el[KEY_CONTEXT] = context;
									}

									if (attrValue) {
										let attrValueAST = parseTemplateNodeValue(attrValue);

										if (attrValueAST) {
											let bindingPrefix =
												attrValueAST.length == 1
													? (attrValueAST[0] as ITemplateNodeValueBinding)
															.prefix
													: null;

											if (
												bindingPrefix === '=' ||
												(bindingPrefix === null &&
													($paramsConfig && $paramsConfig.get(attrName))
														?.readonly)
											) {
												attrValue = compileTemplateNodeValue(
													attrValueAST,
													attrValue,
													true
												).call(context, {
													meta: {
														element: el,
														attributeName: attrName
													}
												});
											} else {
												if (bindingPrefix !== '->') {
													let cell = new Cell<
														any,
														IAttributeBindingCellMeta
													>(
														compileTemplateNodeValue(
															attrValueAST,
															attrValue,
															attrValueAST.length == 1
														),
														{
															context,
															meta: {
																element: el,
																attributeName: attrName
															},
															onChange: onAttributeBindingCellChange
														}
													);

													attrValue = cell.get();

													(result[1] || (result[1] = [])).push(
														cell as IBinding
													);
												}

												let $paramConfig =
													$paramsConfig && $paramsConfig.get(attrName);

												if (
													$paramConfig &&
													(bindingPrefix === '->' ||
														bindingPrefix === '<->')
												) {
													if (
														bindingPrefix == '->' &&
														attrName.charAt(0) != '_'
													) {
														attrValue = null;
													}

													let keypath = (attrValueAST[0] as ITemplateNodeValueBinding).keypath!.split(
														'.'
													);

													(result[2] || (result[2] = [])).push(
														nodeComponent!,
														$paramConfig.property,
														keypath.length == 1
															? ((propName) =>
																	function (evt: IEvent) {
																		this.ownerComponent[
																			propName
																		] = evt.data.value;
																	})(keypath[0])
															: ((propName, keypath) => {
																	let getPropertyHolder = compileKeypath(
																		keypath,
																		keypath.join('.')
																	);

																	return function (evt: IEvent) {
																		let propHolder = getPropertyHolder.call(
																			this.ownerComponent
																		);

																		if (propHolder) {
																			propHolder[propName] =
																				evt.data.value;
																		}
																	};
															  })(
																	keypath[keypath.length - 1],
																	keypath.slice(0, -1)
															  )
													);
												}
											}
										}
									}
								}

								if (attrValue !== false && attrValue != null) {
									setAttribute(el, attrName, attrValue);
								}
							}
						}

						if (className) {
							if ((node as IElement).namespaceSVG) {
								el.setAttribute('class', className);
							} else {
								el.className = className;
							}
						}

						if ((node as IElement).events) {
							el[KEY_EVENTS] = (node as IElement).events;
							el[KEY_CONTEXT] = context;
						}
						if ((node as IElement).domEvents) {
							el[KEY_DOM_EVENTS] = (node as IElement).domEvents;
							el[KEY_CONTEXT] = context;
						}

						if (nodeComponent) {
							nodeComponent._ownerComponent = ownerComponent;
							nodeComponent.$context = context;
							nodeComponent.$specifiedParams = (node as IElement).$specifiedParams!;

							if (parentComponent) {
								(
									parentComponent[KEY_CHILD_COMPONENTS] ||
									(parentComponent[KEY_CHILD_COMPONENTS] = [])
								).push(nodeComponent);
							} else {
								(result![0] || (result![0] = [])).push(nodeComponent);
							}
						}

						if ((node as IElement).contentTemplateIndex !== null) {
							el[KEY_CONTENT_TEMPLATE] = template._embeddedTemplates![
								(node as IElement).contentTemplateIndex!
							];
						} else if (
							result &&
							(!nodeComponent ||
								!(nodeComponent.constructor as typeof BaseComponent)
									.bindsInputContent)
						) {
							renderContent(
								el,
								(node as IElement).content,
								template,
								ownerComponent,
								context,
								result,
								nodeComponent
							);
						} else {
							renderContent(el, (node as IElement).content, template);
						}

						targetNode.appendChild(el);
					}

					break;
				}
				case NodeType.TEXT: {
					let nodeValue = (node as ITextNode).value;

					if (result) {
						let nodeValueAST = parseTemplateNodeValue(nodeValue);

						if (nodeValueAST) {
							if (
								nodeValueAST.length == 1 &&
								(nodeValueAST[0] as ITemplateNodeValueBinding).prefix === '='
							) {
								targetNode.appendChild(
									document.createTextNode(
										compileTemplateNodeValue(
											nodeValueAST,
											nodeValue,
											false
										).call(context)
									)
								);
							} else {
								let meta = { textNode: null as any };
								let cell = new Cell<string, { textNode: Text }>(
									compileTemplateNodeValue(nodeValueAST, nodeValue, false),
									{
										context,
										meta,
										onChange: onTextNodeBindingCellChange
									}
								);

								meta.textNode = targetNode.appendChild(
									document.createTextNode(cell.get())
								);

								(result[1] || (result[1] = [])).push(cell as IBinding);
							}

							break;
						}
					}

					targetNode.appendChild(document.createTextNode(nodeValue));

					break;
				}
			}
		}
	}

	return targetNode;
}

function renderElementClasses(
	elementNamesTemplate: Array<string>,
	elNames: Array<string | null>
): string {
	let elClasses = '';

	for (let i = elNames[0] ? 0 : 1, l = elNames.length; i < l; i++) {
		elClasses += elementNamesTemplate.join(elNames[i] + ' ');
	}

	return elClasses;
}
