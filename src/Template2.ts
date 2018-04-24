import { escapeHTML } from '@riim/escape-html';
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

export type TRenderer = (this: IElementRendererMap) => DocumentFragment;

export type TElementRenderer = (this: IElementRendererMap, $super?: IElementRendererMap) => string;

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

	_blockNamesTemplate: Array<string>;

	_tagNameMap: { [elName: string]: string };
	_attributeListMap: { [elName: string]: Object };
	_attributeCountMap: { [elName: string]: number };

	_currentElement: IElement;
	_elements: Array<IElement>;
	_elementMap: { [elName: string]: IElement };

	_renderer: TRenderer;
	_elementRendererMap: IElementRendererMap;

	constructor(
		nelm: string | IBlock,
		opts?: {
			parent?: Template;
			blockName?: string | Array<string>;
		}
	) {
		let parent = (this.parent = (opts && opts.parent) || null);
		this.nelm = typeof nelm == 'string' ? new Parser(nelm).parse() : nelm;

		let blockName = (opts && opts.blockName) || this.nelm.name;

		if (parent) {
			this._blockNamesTemplate = [
				blockName ? (blockName as string) + ELEMENT_NAME_DELIMITER : ''
			].concat(parent._blockNamesTemplate);
		} else if (blockName) {
			if (Array.isArray(blockName)) {
				this.setBlockName(blockName);
			} else {
				this._blockNamesTemplate = [blockName + ELEMENT_NAME_DELIMITER, ''];
			}
		} else {
			this._blockNamesTemplate = ['', ''];
		}

		this._tagNameMap = { __proto__: parent && parent._tagNameMap } as any;
		this._attributeListMap = { __proto__: parent && parent._attributeListMap } as any;
		this._attributeCountMap = { __proto__: parent && parent._attributeCountMap } as any;
	}

	extend(nelm: string | IBlock, opts?: { blockName?: string }): Template {
		return new Template(nelm, { __proto__: opts || null, parent: this } as any);
	}

	setBlockName(blockName: string | Array<string>): Template {
		if (Array.isArray(blockName)) {
			(this._blockNamesTemplate = blockName.map(
				blockName => blockName + ELEMENT_NAME_DELIMITER
			)).push('');
		} else {
			this._blockNamesTemplate[0] = blockName + ELEMENT_NAME_DELIMITER;
		}

		return this;
	}

	render(): DocumentFragment {
		return (this._renderer || this._compileRenderers()).call({
			__proto__: this._elementRendererMap,
			'@': this,
			'@c': this._renderElementClasses
		});
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
				this._compileNode(content[i], 'n', i);
			}

			Object.keys(elMap).forEach(function(this: IElementRendererMap, name: string) {
				let el = elMap[name];

				console.log(`[el(${el.name})]`, el.source!.join('\n'));
				this[name] = Function('n', el.source!.join('\n')) as any;

				console.log(
					`[el(${el.name})@content]`,
					el.innerSource.length ? el.innerSource.join('\n') + '\nreturn n;' : 'return n;'
				);
				if (el.superCall) {
					let inner = Function(
						'n',
						'$super',
						el.innerSource.join('\n') + '\nreturn n;'
					) as TElementRenderer;
					let parentElementRendererMap = parent && parent._elementRendererMap;

					this[name + '@content'] = function(n) {
						return inner.call(this, n, parentElementRendererMap);
					};
				} else {
					this[name + '@content'] = Function(
						'n',
						el.innerSource.length
							? el.innerSource.join('\n') + '\nreturn n;'
							: 'return n;'
					) as any;
				}
			}, this._elementRendererMap);

			if (!parent) {
				console.log(
					'[root]',
					`var n = document.createDocumentFragment();\n${this._currentElement.innerSource.join(
						'\n'
					) || ''}\nreturn n;`
				);
				return (this._renderer = Function(
					`var n = document.createDocumentFragment();\n${this._currentElement.innerSource.join(
						'\n'
					) || ''}\nreturn n;`
				) as any);
			}
		} else if (!parent) {
			return (this._renderer = () => document.createDocumentFragment());
		}

		return this._renderer;
	}

	_compileNode(node: INode, parentElVarName: string, nodeIndex: number, superElName?: string) {
		switch (node.nodeType) {
			case NodeType.ELEMENT: {
				let parent = this.parent;
				let els = this._elements;
				let el = node as INelmElement;
				let tagName = el.tagName;
				let isHelper = el.isHelper;
				let elNames = el.names;
				let elName = elNames && elNames[0];
				let elAttrs = el.attributes;
				let content = el.content;
				let elVarName = isHelper ? parentElVarName : parentElVarName + '$' + nodeIndex;

				if (elNames) {
					if (elName) {
						if (tagName) {
							this._tagNameMap[elName] = tagName;
						} else {
							// Не надо добавлять в конец ` || 'div'`,
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
								let name = attr.name;
								let value = attr.value;
								let index = attrList[name];

								attrList[index === undefined ? attrCount : index] =
									name == 'class'
										? `\ne.className = '${escapeString(value)}';`
										: `\ne.setAttribute('${escapeString(
												name
										  )}', '${escapeString(value)}');`;

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
										`\ne.className = this['@c'].call(this['@'], ['${elNames.join(
											"','"
										)}']) + ' ` +
										attrList[attrList['class']].slice(
											"\ne.className = '".length
										);
									renderedAttrs = join.call(attrList, '');
								} else {
									renderedAttrs =
										`\ne.className = this['@c'].call(this['@'], ['${elNames.join(
											"','"
										)}']);` + join.call(attrList, '');
								}
							}
						} else if (!isHelper) {
							renderedAttrs = `\ne.className = this['@c'].call(this['@'], ['${elNames.join(
								"','"
							)}']);`;
						}

						let currentEl = {
							name: elName,
							superCall: false,
							source: isHelper
								? [`this['${elName}@content'](n);`]
								: [
										`var e = n.appendChild(${
											content && content.length
												? `this['${elName}@content'](document.createElement('${tagName ||
														'div'}'))`
												: `document.createElement('${tagName || 'div'}')`
										});` + renderedAttrs,
										'return e;'
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
									attrs += `\n${elVarName}.className = this['@c'].call(this['@'], ['${elNames
										.join("','")
										.slice(3)}']) + '${
										value ? ' ' + escapeHTML(escapeString(value)) : ''
									}';`;
								} else {
									attrs += `\n${elVarName}.setAttribute('${escapeString(
										attr.name
									)}', '${escapeString(value)}');`;
								}
							}

							this._currentElement.innerSource.push(
								`var ${elVarName} = ${parentElVarName}.appendChild(document.createElement('${tagName ||
									'div'}'));` +
									(hasClassAttr
										? attrs
										: `\n${elVarName}.className = this['@c'].call(this['@'], ['${elNames
												.join("','")
												.slice(3)}']);` + attrs)
							);
						} else {
							this._currentElement.innerSource.push(
								`var ${elVarName} = ${parentElVarName}.appendChild(document.createElement('${tagName ||
									'div'}'));`,
								`${elVarName}.className = this['@c'].call(this['@'], ['${elNames
									.join("','")
									.slice(3)}']);`
							);
						}
					}
				} else if (!isHelper) {
					this._currentElement.innerSource.push(
						`var ${elVarName} = ${parentElVarName}.appendChild(document.createElement('${tagName ||
							'div'}'));` +
							(elAttrs
								? elAttrs.list
										.map(
											attr =>
												`\n${elVarName}.setAttribute('${escapeString(
													attr.name
												)}', '${escapeString(attr.value)}');`
										)
										.join('')
								: '')
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
					for (let i = 0, l = content.length; i < l; i++) {
						this._compileNode(
							content[i],
							elName ? 'n' : elVarName,
							i,
							elName || superElName
						);
					}
				}

				if (elName) {
					els.pop();
					this._currentElement = els[els.length - 1];
					this._currentElement.innerSource.push(`this['${elName}'](${parentElVarName});`);
				}

				break;
			}
			case NodeType.TEXT: {
				this._currentElement.innerSource.push(
					`${parentElVarName}.appendChild(document.createTextNode('${escapeString(
						(node as ITextNode).value
					)}'));`
				);

				break;
			}
			case NodeType.SUPER_CALL: {
				this._currentElement.superCall = true;
				this._currentElement.innerSource.push(
					`$super['${(node as ISuperCall).elementName ||
						superElName}@content'].call(this, ${parentElVarName});`
				);

				break;
			}
		}
	}

	_renderElementClasses(elNames: Array<string | null>): string {
		let elClasses = '';

		for (let i = 0, l = elNames.length; i < l; i++) {
			elClasses += this._blockNamesTemplate.join(elNames[i] + ' ');
		}

		return elClasses.slice(0, -1);
	}
}
