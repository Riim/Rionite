import { kebabCase } from '@riim/kebab-case';
import { snakeCaseAttributeName } from '@riim/rionite-snake-case-attribute-name';
import { BaseComponent } from './BaseComponent';

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
	name: string;
	value: string;
}

export interface IElementAttributeList {
	[attrIndex: number]: IElementAttribute;
	'length=': number;
}

export interface IElementAttributes {
	isAttributeValue: string | null;
	list: IElementAttributeList | null;
}

export interface IElement extends INode {
	nodeType: NodeType.ELEMENT;
	isHelper: boolean;
	tagName: string;
	is: string | null;
	names: Array<string | null> | null;
	attributes: IElementAttributes | null;
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
	elements: { [name: string]: IElement };
}

const escapee: { [char: string]: string } = {
	__proto__: null,

	'/': '/',
	'\\': '\\',
	b: '\b',
	f: '\f',
	n: '\n',
	r: '\r',
	t: '\t'
} as any;

const reWhitespace = /\s/;

const reTagNameOrNothing = /[a-zA-Z][\-\w]*(?::[a-zA-Z][\-\w]*)?|/g;
const reElementNameOrNothing = /[a-zA-Z][\-\w]*|/g;
const reAttributeNameOrNothing = /[^\s'">/=,)]+|/g;
const reSuperCallOrNothing = /super(?:\.([a-zA-Z][\-\w]*))?!|/g;

function normalizeMultilineText(text: string): string {
	return text
		.trim()
		.replace(/[ \t]*(?:\n|\r\n?)/g, '\n')
		.replace(/\n[ \t]+/g, '\n');
}

export const ELEMENT_NAME_DELIMITER = '__';

export class Template {
	static helpers: { [name: string]: (el: IElement) => TContent | null } = {
		section: el => el.content
	};

	_isEmbedded: boolean;

	parent: Template | null;
	template: string;

	_elementNamesTemplate: Array<string>;

	initialized = false;

	_elements: { [name: string]: IElement };

	_pos: number;
	_chr: string;

	block: IBlock | null;
	_embeddedTemplates: Array<Template> | null;

	constructor(
		template: string | IBlock,
		options?: {
			_isEmbedded?: boolean;
			parent?: Template;
			blockName?: string | Array<string>;
		}
	) {
		let isEmbedded = (this._isEmbedded = !!(options && options._isEmbedded));
		let parent = (this.parent = (options && options.parent) || null);

		if (typeof template == 'string') {
			this.template = template;
			this.block = null;
		} else {
			this.block = template;
			this._elements = template.elements;
		}

		if (isEmbedded) {
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

	initialize(component?: BaseComponent) {
		if (this.initialized) {
			return;
		}

		this.initialized = true;

		if (this.parent) {
			this.parent.parse(component);
		}

		let parent = this.parent;

		if (!this._isEmbedded) {
			this._elements = parent
				? ({ __proto__: parent._elements } as any)
				: ({
						__proto__: null,
						'@root': {
							nodeType: NodeType.ELEMENT,
							isHelper: true,
							tagName: 'section',
							is: null,
							names: ['root'],
							attributes: null,
							content: [],
							contentTemplateIndex: null
						}
				  } as any);
		}

		this._embeddedTemplates = this._isEmbedded
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
								_isEmbedded: true,
								parent: this
							}
						)
			  );
	}

	parse(component?: BaseComponent): IBlock {
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
		componentConstr?: typeof BaseComponent
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
		componentConstr?: typeof BaseComponent
	): TContent | null {
		let pos = this._pos;
		let isHelper = this._chr == '@';

		if (isHelper) {
			this._next();
		}

		let tagName = this._readName(reTagNameOrNothing);
		let elNames: Array<string | null> | undefined;
		let elName: string | null | undefined;

		if (this._chr == '/') {
			this._next();

			let pos = this._pos;

			this._skipWhitespaces();

			if ((this._chr as any) == ',') {
				this._next();
				this._skipWhitespaces();
				elNames = [null];
			}

			for (let name; (name = this._readName(reElementNameOrNothing)); ) {
				(elNames || (elNames = [])).push(name);

				if (this._skipWhitespaces() != ',') {
					break;
				}

				this._next();
				this._skipWhitespaces();
			}

			if (!elNames || (!elNames[0] && elNames.length == 1)) {
				this._throwError('Expected element name', pos);
			}

			elName = isHelper ? elNames![0] && '@' + elNames![0] : elNames![0];
		} else {
			this._skipWhitespacesAndComments();
		}

		if (tagName) {
			tagName = kebabCase(tagName, true);
		} else {
			if (!elName) {
				this._throwError('Expected element', pos);
			}

			if (
				!this.parent ||
				!(tagName = (this.parent._elements[elName!] || { __proto__: null }).tagName)
			) {
				this._throwError('Element.tagName is required', isHelper ? pos + 1 : pos);
				throw 1;
			}
		}

		let attrs: IElementAttributes | null | undefined;

		if (this._chr == '(') {
			attrs = this._readAttributes(elName || superElName, isHelper);
			this._skipWhitespaces();
		}

		if (elNames && componentConstr) {
			let events = componentConstr.events;
			let domEvents = componentConstr.domEvents;

			if (events || domEvents) {
				for (let name of elNames) {
					if (!name) {
						continue;
					}

					if (events && events[name]) {
						let attrList = (
							attrs ||
							(attrs = {
								isAttributeValue: null,
								list: { __proto__: null, 'length=': 0 } as any
							})
						).list;

						for (let type in events[name]) {
							let attrName =
								'oncomponent-' +
								(type.charAt(0) == '<'
									? type.slice(type.indexOf('>', 2) + 1)
									: type);

							attrList[
								attrList[attrName] === undefined
									? (attrList[attrName] = attrList['length=']++)
									: attrList[attrName]
							] = {
								name: attrName,
								value: ':' + name
							};
						}
					}

					if (domEvents && domEvents[name]) {
						let attrList = (
							attrs ||
							(attrs = {
								isAttributeValue: null,
								list: { __proto__: null, 'length=': 0 } as any
							})
						).list;

						for (let type in domEvents[name]) {
							let attrName = 'on-' + type;

							attrList[
								attrList[attrName] === undefined
									? (attrList[attrName] = attrList['length=']++)
									: attrList[attrName]
							] = {
								name: attrName,
								value: ':' + name
							};
						}
					}
				}
			}
		}

		let content: TContent | null | undefined;

		if (this._chr == '{') {
			content = this._readContent(null, elName || superElName, true, componentConstr);
		}

		let el: IElement;

		if (isHelper) {
			let helper = Template.helpers[tagName];

			if (!helper) {
				this._throwError(`Helper "${tagName}" is not defined`, pos);
			}

			el = {
				nodeType: NodeType.ELEMENT,
				isHelper: true,
				tagName,
				is: (attrs && attrs.isAttributeValue) || null,
				names: elNames || null,
				attributes: attrs || null,
				content: content || null,
				contentTemplateIndex: null
			};

			content = helper(el);

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
							let el: IElement = {
								nodeType: NodeType.ELEMENT,
								isHelper: false,
								tagName: (node as IElement).tagName,
								is: (node as IElement).is,
								names: (node as IElement).names,
								attributes: (node as IElement).attributes,
								content: (node as IElement).content,
								contentTemplateIndex:
									(
										this._embeddedTemplates || (this._embeddedTemplates = [])
									).push(
										new Template(
											{
												nodeType: NodeType.BLOCK,
												content: (node as IElement).content!,
												elements: this._elements
											},
											{
												_isEmbedded: true,
												parent: this
											}
										)
									) - 1
							};

							let elName = el.names && el.names![0];

							if (elName) {
								this._elements[elName] = el;
								content[i] = {
									nodeType: NodeType.ELEMENT_CALL,
									name: elName
								} as IElementCall;
							} else {
								content[i] = el;
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
			el = {
				nodeType: NodeType.ELEMENT,
				isHelper: false,
				tagName,
				is: (attrs && attrs.isAttributeValue) || null,
				names: elNames || null,
				attributes: attrs || null,
				content: content || null,
				contentTemplateIndex:
					content && (tagName == 'template' || tagName == 'rn-slot')
						? (this._embeddedTemplates || (this._embeddedTemplates = [])).push(
								new Template(
									{
										nodeType: NodeType.BLOCK,
										content,
										elements: this._elements
									},
									{
										_isEmbedded: true,
										parent: this
									}
								)
						  ) - 1
						: null
			};
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
		isElementHelper: boolean
	): IElementAttributes | null {
		this._next('(');

		if (this._skipWhitespacesAndComments() == ')') {
			this._next();
			return null;
		}

		let superCall: ISuperCall | null | undefined;

		let isAttrValue: string | null | undefined;
		let list: IElementAttributeList | undefined;

		loop: for (let f = true; ; ) {
			if (f && this._chr == 's' && (superCall = this._readSuperCall(superElName))) {
				let superElAttrs = superCall.element.attributes;

				if (superElAttrs) {
					isAttrValue = superElAttrs.isAttributeValue;
					list = { __proto__: superElAttrs.list } as any;
				}

				this._skipWhitespacesAndComments();
			} else {
				let name = this._readName(reAttributeNameOrNothing);

				if (!name) {
					this._throwError('Expected attribute name');
					throw 1;
				}

				if (this._skipWhitespacesAndComments() == '=') {
					this._next();

					let chr = this._skipWhitespaces();

					if (chr == "'" || chr == '"' || chr == '`') {
						if (name == 'is') {
							isAttrValue = this._readString();
						} else {
							(list || (list = { __proto__: null, 'length=': 0 } as any))[
								list![name] === undefined
									? (list![name] = list!['length=']++)
									: list![name]
							] = {
								name,
								value: this._readString()
							};
						}

						this._skipWhitespacesAndComments();
					} else {
						let value = '';

						for (;;) {
							if (!chr) {
								this._throwError(
									'Unexpected end of template. Expected "," or ")" to finalize attribute value.'
								);
							}

							if (chr == ',' || chr == ')' || chr == '\n' || chr == '\r') {
								if (name == 'is') {
									isAttrValue = value.trim();
								} else {
									(list || (list = { __proto__: null, 'length=': 0 } as any))[
										list![name] === undefined
											? (list![name] = list!['length=']++)
											: list![name]
									] = {
										name,
										value: value.trim()
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
				} else if (name == 'is') {
					isAttrValue = '';
				} else {
					(list || (list = { __proto__: null, 'length=': 0 } as any))[
						list![name] === undefined ? (list![name] = list!['length=']++) : list![name]
					] = {
						name,
						value: ''
					};
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

			if (f) {
				f = false;
			}
		}

		return isAttrValue == null && !list
			? null
			: {
					isAttributeValue: isAttrValue || null,
					list: list || null
			  };
	}

	_readSuperCall(defaultElName: string | null): ISuperCall | null {
		reSuperCallOrNothing.lastIndex = this._pos;
		let match = reSuperCallOrNothing.exec(this.template)!;

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

			this._chr = this.template.charAt((this._pos = reSuperCallOrNothing.lastIndex));

			return {
				nodeType: NodeType.SUPER_CALL,
				elementName: elName,
				element: el
			};
		}

		return null;
	}

	_readName(reNameOrNothing: RegExp): string | null {
		reNameOrNothing.lastIndex = this._pos;
		let name = reNameOrNothing.exec(this.template)![0];

		if (name) {
			this._chr = this.template.charAt((this._pos = reNameOrNothing.lastIndex));
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
				} else if (chr in escapee) {
					str += escapee[chr];
					chr = this._next();
				} else {
					this._throwError('Invalid escape sequence', this._pos - 1);
				}
			} else {
				if (quoteChar != '`' && (chr == '\n' || chr == '\r')) {
					this._throwError('Unexpected line break in string literal');
				}

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
			_isEmbedded?: boolean;
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

	render(component?: BaseComponent): DocumentFragment {
		let block = this.parse(component);

		return renderContent(
			document.createDocumentFragment(),
			this,
			block.content || block.elements['@root'].content
		);
	}
}

function renderContent<T extends Node = Element>(
	targetNode: T,
	template: Template,
	content: TContent | null,
	isSVG?: boolean
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
						template,
						(node as ISuperCall).element.content,
						isSVG
					);

					continue;
				}
			}

			switch (node.nodeType) {
				case NodeType.ELEMENT: {
					if ((node as IElement).isHelper) {
						renderContent(targetNode, template, (node as IElement).content, isSVG);
					} else {
						let isSVG_ = (node as IElement).tagName == 'svg' || isSVG;
						let el: Element;

						if (isSVG_) {
							el = document.createElementNS(
								'http://www.w3.org/2000/svg',
								(node as IElement).tagName
							);
						} else if ((node as IElement).is) {
							el = (window as any).innerHTML(
								document.createElement('div'),
								`<${(node as IElement).tagName} is="${(node as IElement).is}">`
							).firstChild as Element;
						} else {
							el = document.createElement((node as IElement).tagName);
						}

						if ((node as IElement).names) {
							if (isSVG_) {
								el.setAttribute(
									'class',
									renderElementClasses(
										template._elementNamesTemplate,
										(node as IElement).names!
									)
								);
							} else {
								el.className = renderElementClasses(
									template._elementNamesTemplate,
									(node as IElement).names!
								);
							}
						}

						let attrList =
							(node as IElement).attributes && (node as IElement).attributes!.list;

						if (attrList) {
							for (let i = 0, l = attrList['length=']; i < l; i++) {
								let attr = attrList[i];
								let attrName = attr.name;

								if (isSVG_) {
									if (
										attrName == 'xlink:href' ||
										attrName == 'href' ||
										attrName == 'xmlns'
									) {
										el.setAttributeNS(
											attrName == 'xmlns'
												? 'http://www.w3.org/2000/xmlns/'
												: 'http://www.w3.org/1999/xlink',
											attrName,
											attr.value
										);
									} else if (attrName == 'class') {
										el.setAttribute(
											attrName,
											(el.getAttribute('class') || '') + attr.value
										);
									} else {
										el.setAttribute(attrName, attr.value);
									}
								} else if (attrName == 'class') {
									el.className += attr.value;
								} else {
									el.setAttribute(
										snakeCaseAttributeName(attrName, true),
										attr.value
									);
								}
							}
						}

						if ((node as IElement).contentTemplateIndex !== null) {
							(el as any).contentTemplate = template._embeddedTemplates![
								(node as IElement).contentTemplateIndex!
							];
						} else {
							renderContent(el, template, (node as IElement).content, isSVG_);
						}

						targetNode.appendChild(el);
					}

					break;
				}
				case NodeType.TEXT: {
					targetNode.appendChild(document.createTextNode((node as ITextNode).value));
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
