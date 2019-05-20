import { kebabCase } from '@riim/kebab-case';
import { snakeCaseAttributeName } from '@riim/rionite-snake-case-attribute-name';
import { Cell, IEvent, TListener } from 'cellx';
import {
	BaseComponent,
	I$ComponentParamConfig,
	IComponentParamConfig,
	IPossiblyComponentElement
	} from './BaseComponent';
import {
	IAttributeBindingCellMeta,
	KEY_CONTEXT,
	onAttributeBindingCellChange,
	onTextNodeBindingCellChange,
	TContentBindingResult
	} from './bindContent';
import { compileTemplateNodeValue } from './compileTemplateNodeValue';
import { IFreezableCell } from './componentBinding';
import { componentConstructorMap } from './componentConstructorMap';
import { KEY_CHILD_COMPONENTS, KEY_PARAMS_CONFIG } from './Constants';
import { getTemplateNodeValueAST } from './getTemplateNodeValueAST';
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
	$specifiedParams: Set<string> | null;
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

const escapee: Record<string, string> = {
	__proto__: null as any,

	'/': '/',
	'\\': '\\',
	b: '\b',
	f: '\f',
	n: '\n',
	r: '\r',
	t: '\t'
};

const reWhitespace = /\s/;

const reTagName = /[a-zA-Z][\-\w]*|/g;
const reElementName = /[a-zA-Z][\-\w]*|/g;
const reAttributeName = /[^\s'">/=,)]+|/g;
const reSuperCall = /super(?:\.([a-zA-Z][\-\w]*))?!|/g;

function normalizeMultilineText(text: string): string {
	return text
		.trim()
		.replace(/[ \t]*(?:\n|\r\n?)/g, '\n')
		.replace(/\n[ \t]+/g, '\n');
}

export const ELEMENT_NAME_DELIMITER = '__';

export class Template {
	static helpers: Record<string, (el: IElement) => TContent | null> = {
		section: el => el.content
	};

	_isEmbedded: boolean;

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

	initialize(component?: BaseComponent | null) {
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
				? { __proto__: parent._elements as any }
				: {
						__proto__: null as any,
						'@root': {
							nodeType: NodeType.ELEMENT,
							isHelper: true,
							tagName: 'section',
							is: null,
							names: ['root'],
							attributes: null,
							$specifiedParams: null,
							content: [],
							contentTemplateIndex: null
						}
				  };
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
		let isHelper = this._chr == '@';

		if (isHelper) {
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

			elName = isHelper ? elNames![0] && '@' + elNames![0] : elNames![0];
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

		let elComponentConstr = componentConstructorMap.get(tagName);

		let attrs: IElementAttributes | null | undefined;
		let $specifiedParams: Set<string> | undefined;

		if (elComponentConstr) {
			$specifiedParams = new Set();
		}

		if (this._chr == '(') {
			attrs = this._readAttributes(
				elName || superElName,
				elComponentConstr &&
					elComponentConstr.params &&
					elComponentConstr[KEY_PARAMS_CONFIG],
				$specifiedParams
			);

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
							if (events[name][type] !== Object.prototype[type]) {
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
							if (domEvents[name][type] !== Object.prototype[type]) {
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
				$specifiedParams: $specifiedParams || null,
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
								$specifiedParams: $specifiedParams || null,
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
				$specifiedParams: $specifiedParams || null,
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
		$paramsConfig?: Record<string, I$ComponentParamConfig> | null,
		$specifiedParams?: Set<string>
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
				let name = this._readName(reAttributeName);

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

				if ($paramsConfig && $paramsConfig[name]) {
					$specifiedParams!.add($paramsConfig[name].name);
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
				} else if (escapee[chr]) {
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
					if ((node as IElement).isHelper) {
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
							let $paramsConfig: Record<string, I$ComponentParamConfig> | undefined;

							if (nodeComponent) {
								$paramsConfig = nodeComponent.constructor[KEY_PARAMS_CONFIG];
							}

							for (let i = 0, l = attrList['length=']; i < l; i++) {
								let attr = attrList[i];
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
														cell as IFreezableCell
													);
												}

												let $paramConfig =
													$paramsConfig && $paramsConfig[attrName];
												let paramConfig:
													| IComponentParamConfig
													| Function
													| undefined;

												if ($paramConfig) {
													paramConfig = $paramConfig.paramConfig;
												}

												if (
													paramConfig !== undefined &&
													(bindingPrefix === '->' ||
														bindingPrefix === '<->')
												) {
													let keypath = (attrValueAST[0] as ITemplateNodeValueBinding)
														.keypath!;
													let keys = keypath.split('.');
													let handler: TListener;

													if (keys.length == 1) {
														handler = (propertyName =>
															function(evt: IEvent) {
																this.ownerComponent[propertyName] =
																	evt.data.value;
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
																	propertyHolder[propertyName] =
																		evt.data.value;
																}
															};
														})(
															keys[keys.length - 1],
															keys.slice(0, -1)
														);
													}

													(result[2] || (result[2] = [])).push(
														nodeComponent!,
														(typeof paramConfig == 'object' &&
															(paramConfig.type ||
																paramConfig.default !==
																	undefined) &&
															paramConfig.property) ||
															$paramConfig!.name,
														handler
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
							(el as any).contentTemplate = template._embeddedTemplates![
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

								(result[1] || (result[1] = [])).push(cell as IFreezableCell);
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
