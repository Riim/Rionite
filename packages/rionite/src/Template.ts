import { kebabCase } from '@riim/kebab-case';
import { snakeCaseAttributeName } from '@riim/rionite-snake-case-attribute-name';
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
import { KEY_CHILD_COMPONENTS, KEY_PARAMS_CONFIG } from './Constants';
import { getTemplateNodeValueAST } from './getTemplateNodeValueAST';
import { KEY_DOM_EVENTS } from './handleDOMEvent';
import { KEY_EVENTS } from './handleEvent';
import { compileKeypath } from './lib/compileKeypath';
import { setAttribute } from './lib/setAttribute';
import { svgNamespaceURI } from './lib/svgNamespaceURI';
import { ITemplateNodeValueBinding } from './TemplateNodeValueParser';

export enum NodeType {
	BLOCK = 1,
	ELEMENT_CALL,
	SUPER_CALL,
	DEBUGGER_CALL,
	ELEMENT,
	TEXT
}

export interface INode {
	nodeType: NodeType;
}

export type TContent = Array<INode>;

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

export interface IElementAttribute {
	isTransformer: boolean;
	name: string;
	value: string;
	pos: number;
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
	isTransformer: boolean;
	tagName: string;
	is: string | null;
	names: Array<string | null> | null;
	attributes: IElementAttributes | null;
	$specifiedParams: Map<string, string> | null;
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

export const KEY_CONTENT_TEMPLATE = Symbol('contentTemplate');

const emptyObj = { __proto__: null };

const escapee = new Map([
	['/', '/'],
	['\\', '\\'],
	['b', '\b'],
	['f', '\f'],
	['n', '\n'],
	['r', '\r'],
	['t', '\t']
]);

const reWhitespace = /\s/;

const reTagName = /[a-zA-Z][\-\w]*|/g;
const reElementName = /[a-zA-Z][\-\w]*|/g;
const reAttributeName = /[^\s'">/=,)]+|/g;
const reSuperCall = /super(?:\.([a-zA-Z][\-\w]*))?!|/g;

const reTrimStartLine = /^[ \t]+/gm;
const reTrimEndLine = /[ \t]+$/gm;

function normalizeMultilineText(text: string): string {
	return text.replace(reTrimStartLine, '').replace(reTrimEndLine, '');
}

export const ELEMENT_NAME_DELIMITER = '__';

export class Template {
	static elementTransformers: Record<string, (el: IElement) => TContent | null> = {
		section: el => el.content
	};

	static attributeTransformers: Record<
		string,
		(el: IElement, attr: IElementAttribute) => IElement
	> = {};

	_embedded: boolean;

	parent: Template | null;
	template: string;

	_elementNamesTemplate: Array<string>;

	initialized = false;

	_elements: Record<string, IElement>;

	_pos: number;
	_chr: string;

	block: IBlock | null;
	_embeddedTemplates: Array<Template> | null;

	constructor(
		template: string | IBlock,
		options?: {
			_embedded?: boolean;
			parent?: Template;
			blockName?: string | Array<string>;
		}
	) {
		let embedded = (this._embedded = !!(options && options._embedded));
		let parent = (this.parent = (options && options.parent) || null);

		if (typeof template == 'string') {
			this.template = template;
			this.block = null;
		} else {
			this.block = template;
			this._elements = template.elements;
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
							isTransformer: true,
							tagName: 'section',
							is: null,
							names: ['root'],
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
					template =>
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

		this._pos = 0;
		this._chr = this.template.charAt(0);

		this._skipWhitespacesAndComments();

		let block: IBlock = (this.block = {
			nodeType: NodeType.BLOCK,
			content: null,
			elements: this._elements
		});

		this._readContent(
			this.parent ? null : block.elements['@root'].content,
			null,
			false,
			component && (component.constructor as typeof BaseComponent)
		);

		return block;
	}

	_readContent(
		content: TContent | null,
		superElName: string | null,
		brackets: boolean,
		componentConstr?: typeof BaseComponent | null
	): TContent | null {
		if (brackets) {
			this._next('{');
			this._skipWhitespacesAndComments();
		}

		for (;;) {
			switch (this._chr) {
				case "'":
				case '"':
				case '`': {
					(content || (content = [])).push({
						nodeType: NodeType.TEXT,
						value: this._readString()
					} as ITextNode);

					break;
				}
				case '': {
					if (brackets) {
						this._throwError(
							'Unexpected end of template. Expected "}" to close block.'
						);
					}

					return content;
				}
				default: {
					let chr = this._chr;

					if (chr == 'd' && this.template.substr(this._pos, 9) == 'debugger!') {
						this._chr = this.template.charAt((this._pos += 9));
						(content || (content = [])).push({ nodeType: NodeType.DEBUGGER_CALL });
						break;
					}

					if (brackets) {
						if (chr == '}') {
							this._next();
							return content;
						}

						let superCall = this._readSuperCall(superElName);

						if (superCall) {
							(content || (content = [])).push(superCall);
							break;
						}
					}

					content = this._readElement(content, superElName, componentConstr);

					break;
				}
			}

			this._skipWhitespacesAndComments();
		}
	}

	_readElement(
		targetContent: TContent | null,
		superElName: string | null,
		componentConstr?: typeof BaseComponent | null
	): TContent | null {
		let pos = this._pos;
		let isTransformer = this._chr == '@';

		if (isTransformer) {
			this._next();
		}

		let tagName = this._readName(reTagName);

		this._skipWhitespacesAndComments();

		let elNames: Array<string | null> | undefined;
		let elName: string | null | undefined;

		if (this._chr == ':') {
			this._next();

			let pos = this._pos;

			this._skipWhitespacesAndComments();

			if (this._chr == ':') {
				elNames = [null];
				this._next();
				this._skipWhitespacesAndComments();
			}

			for (let name; (name = this._readName(reElementName)); ) {
				(elNames || (elNames = [])).push(name);

				if (this._skipWhitespacesAndComments() != ':') {
					break;
				}

				this._next();
				this._skipWhitespacesAndComments();
			}

			if (!elNames || (!elNames[0] && elNames.length == 1)) {
				this._throwError('Expected element name', pos);
			}

			elName = isTransformer ? elNames![0] && '@' + elNames![0] : elNames![0];
		}

		if (tagName) {
			if (!isTransformer) {
				tagName = kebabCase(tagName, true);
			}
		} else {
			if (!elName) {
				this._throwError('Expected element', pos);
			}

			if (!this.parent || !(tagName = (this.parent._elements[elName!] || emptyObj).tagName)) {
				throw this._throwError(
					'Element.tagName is required',
					isTransformer ? pos + 1 : pos
				);
			}
		}

		let elComponentConstr = componentConstructors.get(tagName);

		let attrs: IElementAttributes | null | undefined;
		let $specifiedParams: Map<string, string> | undefined;

		if (elComponentConstr) {
			$specifiedParams = new Map();
		}

		if (this._chr == '(') {
			attrs = this._readAttributes(
				elName || superElName,
				elComponentConstr && elComponentConstr[KEY_PARAMS_CONFIG],
				$specifiedParams
			);

			this._skipWhitespaces();
		}

		let events: Map<string | symbol, string> | undefined;
		let domEvents: Map<string, string> | undefined;

		if (elNames && componentConstr) {
			let componentEvents = componentConstr.events;
			let componentDOMEvents = componentConstr.domEvents;

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

		if (this._chr == '{') {
			content = this._readContent(null, elName || superElName, true, componentConstr);
		}

		let el: IElement = {
			nodeType: NodeType.ELEMENT,
			isTransformer,
			tagName,
			is: (attrs && attrs.attributeIsValue) || null,
			names: elNames || null,
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
				this._throwError(`Transformer "${tagName}" is not defined`, pos);
			}

			content = transformer(el);

			if (content && content.length) {
				el.content = content;

				for (let i = 0, l = content.length; i < l; i++) {
					let node = content[i];

					if (node.nodeType == NodeType.ELEMENT) {
						if (
							(node as IElement).content &&
							((node as IElement).tagName == 'template' ||
								(node as IElement).tagName == 'rn-slot')
						) {
							let contentEl: IElement = {
								nodeType: NodeType.ELEMENT,
								isTransformer: false,
								tagName: (node as IElement).tagName,
								is: (node as IElement).is,
								names: (node as IElement).names,
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
								this._elements[elName] = contentEl;
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
								this._elements[elName] = node as IElement;
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
							this._throwError(`Transformer "${attr.name}" is not defined`, attr.pos);
						}

						el = transformer(el, attr);

						for (let i = 0, l = (el.content || []).length; i < l; i++) {
							let node = el.content![i];

							if (node.nodeType == NodeType.ELEMENT) {
								if (
									(node as IElement).content &&
									((node as IElement).tagName == 'template' ||
										(node as IElement).tagName == 'rn-slot')
								) {
									let contentEl: IElement = {
										nodeType: NodeType.ELEMENT,
										isTransformer: false,
										tagName: (node as IElement).tagName,
										is: (node as IElement).is,
										names: (node as IElement).names,
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
										this._elements[elName] = contentEl;
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
										this._elements[elName] = node as IElement;
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

			elName = el.names && el.names[0];
		}

		if (elName) {
			this._elements[elName] = el;
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
		superElName: string | null,
		$paramsConfig?: Map<string, I$ComponentParamConfig> | null,
		$specifiedParams?: Map<string, string>
	): IElementAttributes | null {
		this._next('(');

		if (this._skipWhitespacesAndComments() == ')') {
			this._next();
			return null;
		}

		let superCall: ISuperCall | null | undefined;

		let attrIsValue: string | null | undefined;
		let list: IElementAttributeList | undefined;

		loop: for (let f = true; ; f = false) {
			if (f && this._chr == 's' && (superCall = this._readSuperCall(superElName))) {
				let superElAttrs = superCall.element.attributes;

				if (superElAttrs) {
					let superElAttrList = superElAttrs.list;

					attrIsValue = superElAttrs.attributeIsValue;
					list = { __proto__: superElAttrList } as any;

					if ($paramsConfig && superElAttrList) {
						for (let i = 0, l = superElAttrList['length=']; i < l; i++) {
							let attr = superElAttrList[i];

							if (!attr.isTransformer && $paramsConfig.has(attr.name)) {
								$specifiedParams!.set(
									$paramsConfig.get(attr.name)!.name,
									attr.value
								);
							}
						}
					}
				}

				this._skipWhitespacesAndComments();
			} else {
				let pos = this._pos;
				let isTransformer = this._chr == '@';

				if (isTransformer) {
					this._next();
				}

				let name = this._readName(reAttributeName);

				if (!name) {
					throw this._throwError('Expected attribute name');
				}

				let fullName = (isTransformer ? '@' : '') + name;
				let value: string;

				if (this._skipWhitespacesAndComments() == '=') {
					this._next();

					let chr = this._skipWhitespaces();

					if (chr == "'" || chr == '"' || chr == '`') {
						value = this._readString();

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
								value,
								pos
							};
						}

						this._skipWhitespacesAndComments();
					} else {
						value = '';

						for (;;) {
							if (!chr) {
								this._throwError(
									'Unexpected end of template. Expected "," or ")" to finalize attribute value.'
								);
							}

							if (chr == ',' || chr == ')' || chr == '\n' || chr == '\r') {
								value = value.trim();

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
										value,
										pos
									};
								}

								if (chr == '\n' || chr == '\r') {
									this._skipWhitespacesAndComments();
								}

								break;
							}

							value += chr;
							chr = this._next();
						}
					}
				} else {
					value = '';

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
							value,
							pos
						};
					}
				}

				if ($paramsConfig && $paramsConfig.has(name)) {
					$specifiedParams!.set($paramsConfig.get(name)!.name, value);
				}
			}

			switch (this._chr) {
				case ')': {
					this._next();
					break loop;
				}
				case ',': {
					this._next();
					this._skipWhitespacesAndComments();
					break;
				}
				default: {
					this._throwError(
						'Unexpected end of template. Expected "," or ")" to finalize attribute value.'
					);
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

	_readSuperCall(defaultElName: string | null): ISuperCall | null {
		reSuperCall.lastIndex = this._pos;
		let match = reSuperCall.exec(this.template)!;

		if (match[0]) {
			if (!this.parent) {
				this._throwError('SuperCall is impossible if no parent is defined');
			}

			let elName =
				match[1] ||
				defaultElName ||
				(this._throwError('SuperCall.elementName is required') as any);
			let el =
				(elName.charAt(0) == '@' && this.parent!._elements[elName.slice(1)]) ||
				this.parent!._elements[elName];

			if (!el) {
				this._throwError(`Element "${elName}" is not defined`);
			}

			this._chr = this.template.charAt((this._pos = reSuperCall.lastIndex));

			return {
				nodeType: NodeType.SUPER_CALL,
				elementName: elName,
				element: el
			};
		}

		return null;
	}

	_readName(reName: RegExp): string | null {
		reName.lastIndex = this._pos;
		let name = reName.exec(this.template)![0];

		if (name) {
			this._chr = this.template.charAt((this._pos = reName.lastIndex));
			return name;
		}

		return null;
	}

	_readString(): string {
		let quoteChar = this._chr;

		// if (process.env.DEBUG && quoteChar != "'" && quoteChar != '"' && quoteChar != '`') {
		// 	this._throwError('Expected string');
		// }

		let str = '';

		for (let chr = this._next(); chr; ) {
			if (chr == quoteChar) {
				this._next();
				return quoteChar == '`' ? normalizeMultilineText(str) : str;
			}

			if (chr == '\\') {
				chr = this._next();

				if (chr == 'x' || chr == 'u') {
					let pos = this._pos + 1;

					let hexadecimal = chr == 'x';
					let code = parseInt(this.template.slice(pos, pos + (hexadecimal ? 2 : 4)), 16);

					if (!isFinite(code)) {
						this._throwError(
							`Invalid ${hexadecimal ? 'hexadecimal' : 'unicode'} escape sequence`,
							pos
						);
					}

					str += String.fromCharCode(code);
					chr = this._chr = this.template.charAt(
						(this._pos = pos + (hexadecimal ? 2 : 4))
					);
				} else if (escapee.has(chr)) {
					str += escapee.get(chr);
					chr = this._next();
				} else {
					this._throwError('Invalid escape sequence', this._pos - 1);
				}
			} else {
				str += chr;
				chr = this._next();
			}
		}

		throw 1;
	}

	_skipWhitespaces(): string {
		let chr = this._chr;

		while (chr && reWhitespace.test(chr)) {
			chr = this._next();
		}

		return chr;
	}

	_skipWhitespacesAndComments(): string {
		let chr = this._chr;

		loop1: for (;;) {
			if (chr == '/') {
				switch (this.template.charAt(this._pos + 1)) {
					case '/': {
						this._next();
						while ((chr = this._next()) && chr != '\n' && chr != '\r') {}
						break;
					}
					case '*': {
						let pos = this._pos;

						this._next();

						loop2: for (;;) {
							switch (this._next()) {
								case '*': {
									if (this._next() == '/') {
										chr = this._next();
										break loop2;
									}

									break;
								}
								case '': {
									this._throwError(
										'Expected "*/" to close multiline comment',
										pos
									);
								}
							}
						}

						break;
					}
					default: {
						break loop1;
					}
				}
			} else if (chr && reWhitespace.test(chr)) {
				chr = this._next();
			} else {
				break;
			}
		}

		return chr;
	}

	_next(current?: string): string {
		if (current && current != this._chr) {
			this._throwError(`Expected "${current}" instead of "${this._chr}"`);
		}

		return (this._chr = this.template.charAt(++this._pos));
	}

	_throwError(msg: string, pos = this._pos) {
		let n = pos < 40 ? 40 - pos : 0;

		throw new SyntaxError(
			msg +
				'\n' +
				this.template
					.slice(pos < 40 ? 0 : pos - 40, pos + 20)
					.replace(/\t/g, ' ')
					.replace(/\n|\r\n?/g, match => {
						if (match.length == 2) {
							n++;
						}

						return '↵';
					}) +
				'\n' +
				'----------------------------------------'.slice(n) +
				'↑'
		);
	}

	extend(
		template: string | IBlock,
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
				blockName => blockName + ELEMENT_NAME_DELIMITER
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
			false,
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
	isSVG: boolean,
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
						isSVG,
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
							isSVG,
							ownerComponent,
							context,
							result,
							parentComponent
						);
					} else {
						let tagName = (node as IElement).tagName;
						let isSVG_ = isSVG || tagName == 'svg';
						let el: Element;

						if (isSVG_) {
							el = document.createElementNS(svgNamespaceURI, tagName);
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

								let attrName = isSVG_
									? attr.name
									: snakeCaseAttributeName(attr.name, true);
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
										let attrValueAST = getTemplateNodeValueAST(attrValue);

										if (attrValueAST) {
											let bindingPrefix =
												attrValueAST.length == 1
													? (attrValueAST[0] as ITemplateNodeValueBinding)
															.prefix
													: null;

											if (bindingPrefix === '=') {
												attrValue = compileTemplateNodeValue(
													attrValueAST,
													attrValue,
													true
												).call(context);
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
															? (propertyName =>
																	function(evt: IEvent) {
																		this.ownerComponent[
																			propertyName
																		] = evt.data.value;
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
																			propertyHolder[
																				propertyName
																			] = evt.data.value;
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
							if (isSVG_) {
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
								isSVG_,
								ownerComponent,
								context,
								result,
								nodeComponent
							);
						} else {
							renderContent(el, (node as IElement).content, template, isSVG_);
						}

						targetNode.appendChild(el);
					}

					break;
				}
				case NodeType.TEXT: {
					let nodeValue = (node as ITextNode).value;

					if (result) {
						let nodeValueAST = getTemplateNodeValueAST(nodeValue);

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
