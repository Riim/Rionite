import { escapeHTML } from '@riim/escape-html';
import { snakeCaseAttributeName } from '@riim/rionite-snake-case-attribute-name';
import { map as selfClosingTagMap } from '@riim/self-closing-tags';
import { escapeString } from 'escape-string';
import {
	IBlock,
	IElement as INelmElement,
	INode,
	ISuperCall,
	ITextNode,
	NodeType,
	Parser,
	TContent
	} from 'nelm-parser';

const join = Array.prototype.join;

export interface IElement {
	name: string | null;
	superCall: boolean;
	source: Array<string> | null;
	innerSource: Array<string>;
}

export type TRenderer = (this: Template) => string;

export type TElementRenderer = (this: Template, $super?: IElementRendererMap) => string;

export interface IElementRendererMap {
	[elName: string]: TElementRenderer;
}

export const ELEMENT_NAME_DELIMITER = '__';

export class Template {
	static helpers: { [name: string]: (el: INelmElement) => TContent | null } = {
		section: el => el.content
	};

	parent: Template | null;
	nelm: IBlock;

	_elementNamesTemplate: Array<string>;

	onBeforeNamedElementOpeningTagClosing: (elNames: Array<string>) => string;

	_tagNameMap: { [elName: string]: string };

	_attributeListMap: { [elName: string]: Object };
	_attributeCountMap: { [elName: string]: number };

	_currentElement: IElement;
	_elements: Array<IElement>;
	_elementMap: { [elName: string]: IElement };

	_renderer: TRenderer;
	_elementRendererMap: IElementRendererMap;

	constructor(
		nelm: IBlock | string,
		opts?: {
			parent?: Template;
			blockName?: string | Array<string>;
			onBeforeNamedElementOpeningTagClosing?: (elNames: Array<string>) => string;
		}
	) {
		if (typeof nelm == 'string') {
			nelm = new Parser(nelm).parse();
		}

		let parent = (this.parent = (opts && opts.parent) || null);

		if (!parent) {
			nelm.content = [
				{
					nodeType: NodeType.ELEMENT,
					tagName: 'section',
					isHelper: true,
					names: ['root'],
					attributes: null,
					content: nelm.content
				} as INelmElement
			];
		}

		this.nelm = nelm;

		let blockName = (opts && opts.blockName) || this.nelm.name;

		if (parent) {
			this._elementNamesTemplate = [
				blockName ? (blockName as string) + ELEMENT_NAME_DELIMITER : ''
			].concat(parent._elementNamesTemplate);
		} else if (blockName) {
			if (Array.isArray(blockName)) {
				this.setBlockName(blockName);
			} else {
				this._elementNamesTemplate = [blockName + ELEMENT_NAME_DELIMITER, ''];
			}
		} else {
			this._elementNamesTemplate = ['', ''];
		}

		this.onBeforeNamedElementOpeningTagClosing =
			(opts && opts.onBeforeNamedElementOpeningTagClosing) || (() => '');

		this._tagNameMap = { __proto__: parent && parent._tagNameMap } as any;

		this._attributeListMap = { __proto__: parent && parent._attributeListMap } as any;
		this._attributeCountMap = { __proto__: parent && parent._attributeCountMap } as any;
	}

	extend(nelm: string | IBlock, opts?: { blockName?: string }): Template {
		return new Template(nelm, { __proto__: opts || null, parent: this } as any);
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

	render(): string {
		return (this._renderer || this._compileRenderers()).call(this);
	}

	_compileRenderers(): TRenderer {
		let parent = this.parent;

		this._elements = [
			(this._currentElement = {
				name: null,
				superCall: false,
				source: null,
				innerSource: []
			})
		];
		let elMap = (this._elementMap = {} as { [elName: string]: IElement });

		if (parent) {
			this._renderer = parent._renderer || parent._compileRenderers();
		}

		this._elementRendererMap = { __proto__: parent && parent._elementRendererMap } as any;

		let content = this.nelm.content;
		let contentLength = content.length;

		if (contentLength) {
			for (let i = 0; i < contentLength; i++) {
				let node = content[i];
				this._compileNode(
					node,
					node.nodeType == NodeType.ELEMENT
						? (node as INelmElement).tagName == 'svg'
						: false
				);
			}

			Object.keys(elMap).forEach(function(this: IElementRendererMap, name: string) {
				let el = elMap[name];

				this[name] = Function(`return ${el.source!.join(' + ')};`) as any;

				if (el.superCall) {
					let inner = Function(
						'$super',
						`return ${el.innerSource.join(' + ')};`
					) as TElementRenderer;
					let parentElRendererMap = parent && parent._elementRendererMap;

					this[name + '/content'] = function() {
						return inner.call(this, parentElRendererMap);
					};
				} else {
					this[name + '/content'] = Function(
						`return ${el.innerSource.join(' + ') || "''"};`
					) as any;
				}
			}, this._elementRendererMap);

			if (!parent) {
				return (this._renderer = Function(
					`return ${this._currentElement.innerSource.join(' + ') || "''"};`
				) as any);
			}
		} else if (!parent) {
			return (this._renderer = () => '');
		}

		return this._renderer;
	}

	_compileNode(node: INode, isSVG: boolean, parentElName?: string) {
		switch (node.nodeType) {
			case NodeType.ELEMENT: {
				let parent = this.parent;
				let els = this._elements;
				let el = node as INelmElement;
				let tagName = el.tagName;
				let isHelper = el.isHelper;
				let elNames = el.names;
				let elName = elNames && (isHelper ? '@' + elNames[0] : elNames[0]);
				let elAttrs = el.attributes;
				let content = el.content;

				if (elNames) {
					if (elName) {
						if (tagName) {
							this._tagNameMap[elName] = tagName;
						} else {
							// Не надо добавлять ` || 'div'`,
							// тк. ниже tagName используется как имя хелпера.
							tagName = parent && parent._tagNameMap[elName];
						}

						let renderedAttrs!: string;

						if (elAttrs && (elAttrs.list.length || elAttrs.superCall)) {
							let attrListMap =
								this._attributeListMap ||
								(this._attributeListMap = {
									__proto__: (parent && parent._attributeListMap) || null
								} as any);
							let attrCountMap =
								this._attributeCountMap ||
								(this._attributeCountMap = {
									__proto__: (parent && parent._attributeCountMap) || null
								} as any);

							let elAttrsSuperCall = elAttrs.superCall;
							let attrList: { [key: string]: any };
							let attrCount: number;

							if (elAttrsSuperCall) {
								if (!parent) {
									throw new TypeError(
										'Parent template is required when using super'
									);
								}

								attrList = attrListMap[elName] = {
									__proto__:
										parent._attributeListMap[
											elAttrsSuperCall.elementName || elName
										] || null
								};
								attrCount = attrCountMap[elName] =
									parent._attributeCountMap[
										elAttrsSuperCall.elementName || elName
									] || 0;
							} else {
								attrList = attrListMap[elName] = { __proto__: null };
								attrCount = attrCountMap[elName] = 0;
							}

							for (let attr of elAttrs.list) {
								let name = isSVG
									? attr.name
									: snakeCaseAttributeName(attr.name, true);
								let value = attr.value;
								let index = attrList[name];

								attrList[
									index === undefined ? attrCount : index
								] = ` ${name}="${value && escapeString(escapeHTML(value))}"`;

								if (index === undefined) {
									attrList[name] = attrCount;
									attrCountMap[elName] = ++attrCount;
								}
							}

							if (!isHelper) {
								attrList = {
									__proto__: attrList,
									length: attrCount
								};

								if (attrList['class'] !== undefined) {
									attrList[attrList['class']] =
										` class="' + this._renderElementClasses(['${elNames.join(
											"','"
										)}']) + ' ` +
										attrList[attrList['class']].slice(' class="'.length);
									renderedAttrs = join.call(attrList, '');
								} else {
									renderedAttrs =
										` class="' + this._renderElementClasses(['${elNames.join(
											"','"
										)}']) + '"` + join.call(attrList, '');
								}
							}
						} else if (!isHelper) {
							renderedAttrs = ` class="' + this._renderElementClasses(['${elNames.join(
								"','"
							)}']) + '"`;
						}

						let currentEl = {
							name: elName,
							superCall: false,
							source: isHelper
								? [`this._elementRendererMap['${elName}/content'].call(this)`]
								: [
										`'<${tagName ||
											'div'}${renderedAttrs}' + this.onBeforeNamedElementOpeningTagClosing(['${elNames.join(
											"','"
										)}']) + '>'`,
										content && content.length
											? `this._elementRendererMap['${elName}/content'].call(this) + '</${tagName ||
													'div'}>'`
											: !content && tagName && selfClosingTagMap.has(tagName)
												? "''"
												: `'</${tagName || 'div'}>'`
								  ],
							innerSource: []
						};

						els.push((this._currentElement = currentEl));
						this._elementMap[elName] = currentEl;
					} else if (!isHelper) {
						if (elAttrs && elAttrs.list.length) {
							let hasClassAttr = false;
							let attrs = '';

							for (let attr of elAttrs.list) {
								let value = attr.value;

								if (attr.name == 'class') {
									hasClassAttr = true;
									attrs += ` class="' + this._renderElementClasses(['${elNames
										.slice(1)
										.join("','")}']) + '${
										value ? ' ' + escapeString(escapeHTML(value)) : ''
									}"`;
								} else {
									attrs += ` ${
										isSVG ? attr.name : snakeCaseAttributeName(attr.name, true)
									}="${value && escapeString(escapeHTML(value))}"`;
								}
							}

							this._currentElement.innerSource.push(
								`'<${tagName || 'div'}${
									hasClassAttr
										? attrs
										: ` class="' + this._renderElementClasses(['${elNames
												.slice(1)
												.join("','")}']) + '"` + attrs
								}' + this.onBeforeNamedElementOpeningTagClosing(['${elNames
									.slice(1)
									.join("','")}']) + '>'`
							);
						} else {
							this._currentElement.innerSource.push(
								`'<${tagName ||
									'div'} class="' + this._renderElementClasses(['${elNames
									.slice(1)
									.join(
										"','"
									)}']) + '"' + this.onBeforeNamedElementOpeningTagClosing(['${elNames
									.slice(1)
									.join("','")}']) + '>'`
							);
						}
					}
				} else if (!isHelper) {
					this._currentElement.innerSource.push(
						`'<${tagName || 'div'}${
							elAttrs
								? elAttrs.list
										.map(
											attr =>
												` ${
													isSVG
														? attr.name
														: snakeCaseAttributeName(attr.name, true)
												}="${attr.value &&
													escapeString(escapeHTML(attr.value))}"`
										)
										.join('')
								: ''
						}>'`
					);
				}

				if (isHelper) {
					if (!tagName) {
						throw new TypeError('"tagName" is required');
					}

					let helper = Template.helpers[tagName];

					if (!helper) {
						throw new TypeError(`Helper "${tagName}" is not defined`);
					}

					content = helper(el);
				}

				if (content) {
					for (let node of content) {
						this._compileNode(
							node,
							isSVG ||
								(node.nodeType == NodeType.ELEMENT
									? (node as INelmElement).tagName == 'svg'
									: false),
							elName || parentElName
						);
					}
				}

				if (elName) {
					els.pop();
					this._currentElement = els[els.length - 1];
					this._currentElement.innerSource.push(
						`this._elementRendererMap['${elName}'].call(this)`
					);
				} else if (!isHelper && (content || !tagName || !selfClosingTagMap.has(tagName))) {
					this._currentElement.innerSource.push(`'</${tagName || 'div'}>'`);
				}

				break;
			}
			case NodeType.TEXT: {
				this._currentElement.innerSource.push(
					`'${(node as ITextNode).value && escapeString((node as ITextNode).value)}'`
				);

				break;
			}
			case NodeType.SUPER_CALL: {
				this._currentElement.superCall = true;
				this._currentElement.innerSource.push(
					`$super['${(node as ISuperCall).elementName ||
						parentElName}/content'].call(this)`
				);

				break;
			}
		}
	}

	_renderElementClasses(elNames: Array<string>): string {
		let elClasses = '';

		for (let i = 0, l = elNames.length; i < l; i++) {
			elClasses += this._elementNamesTemplate.join(elNames[i] + ' ');
		}

		return elClasses.slice(0, -1);
	}
}
