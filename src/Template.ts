import {
	NodeType,
	INode,
	TContent,
	IBlock,
	IElement as INelmElement,
	ITextNode,
	ISuperCall,
	Parser
} from 'nelm-parser';
import escapeString from 'escape-string';
import escapeHTML from '@riim/escape-html';
import { map as selfClosingTags } from '@riim/self-closing-tags';

let join = Array.prototype.join;

export interface IElement {
	name: string | null;
	superCall: boolean;
	source: Array<string> | null;
	innerSource: Array<string>;
}

export interface IRenderer {
	(this: IElementRendererMap): string;
}

export interface IElementRenderer {
	(this: IElementRendererMap, $super?: IElementRendererMap): string;
}

export interface IElementRendererMap {
	[elName: string]: IElementRenderer;
}

let elNameDelimiter = '__';

export default class Template {
	static helpers: { [name: string]: (el: INelmElement) => TContent | null } = {
		section: el => el.content
	};

	parent: Template | null;
	nelm: IBlock;

	_elementClassesTemplate: Array<string>;

	_tagNameMap: { [elName: string]: string };

	_attributeListMap: { [elName: string]: Object };
	_attributeCountMap: { [elName: string]: number };

	_currentElement: IElement;
	_elements: Array<IElement>;
	_elementMap: { [elName: string]: IElement };

	_renderer: IRenderer;
	_elementRendererMap: IElementRendererMap;

	constructor(nelm: string | IBlock, opts?: { parent?: Template, blockName?: string }) {
		this.parent = opts && opts.parent || null;
		this.nelm = typeof nelm == 'string' ? new Parser(nelm).parse() : nelm;

		let blockName = opts && opts.blockName || this.nelm.name;

		this._elementClassesTemplate = this.parent ?
			[blockName ? blockName + elNameDelimiter : ''].concat(this.parent._elementClassesTemplate) :
			[blockName ? blockName + elNameDelimiter : '', ''];
	}

	extend(nelm: string | IBlock, opts?: { blockName?: string }): Template {
		return new Template(nelm, { __proto__: opts || null, parent: this } as any);
	}

	setBlockName(blockName: string | null): Template {
		this._elementClassesTemplate[0] = blockName ? blockName + elNameDelimiter : '';
		return this;
	}

	render(): string {
		return (this._renderer || this._compileRenderers()).call(this._elementRendererMap);
	}

	_compileRenderers(): IRenderer {
		let parent = this.parent;

		this._elements = [(this._currentElement = { name: null, superCall: false, source: null, innerSource: [] })];
		let elMap = this._elementMap = {} as { [elName: string]: IElement };

		if (parent) {
			this._renderer = parent._renderer || parent._compileRenderers();
		}

		for (let node of this.nelm.content) {
			this._compileNode(node);
		}

		if (!parent) {
			this._renderer = Function(`return ${ this._currentElement.innerSource.join(' + ') };`) as IRenderer;
		}

		Object.keys(elMap).forEach(function(this: IElementRendererMap, name: string) {
			let el = elMap[name];

			this[name] = Function(`return ${ (el.source as Array<string>).join(' + ') };`) as IElementRenderer;

			if (el.superCall) {
				let inner = Function('$super', `return ${ el.innerSource.join(' + ') || "''" };`) as IElementRenderer;
				let parentElementRendererMap = parent && parent._elementRendererMap;
				this[name + '@content'] = function() { return inner.call(this, parentElementRendererMap); };
			} else {
				this[name + '@content'] = Function(`return ${ el.innerSource.join(' + ') || "''" };`) as
					IElementRenderer;
			}
		}, (this._elementRendererMap = { __proto__: parent && parent._elementRendererMap } as any));

		return this._renderer;
	}

	_compileNode(node: INode, parentElName?: string) {
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

				if (elNames) {
					if (elName) {
						if (tagName) {
							(this._tagNameMap || (
								this._tagNameMap = { __proto__: parent && parent._tagNameMap || null } as any
							))[elName] = tagName;
						} else {
							// Не надо добавлять в конец ` || 'div'`, тк. ниже tagName используется как имя хелпера.
							tagName = parent && parent._tagNameMap && parent._tagNameMap[elName];
						}

						let renderedAttrs: string | undefined;

						if (elAttrs && (elAttrs.list.length || elAttrs.superCall)) {
							let attrListMap = this._attributeListMap || (
								this._attributeListMap = { __proto__: parent && parent._attributeListMap || null } as
									any
							);
							let attrCountMap = this._attributeCountMap || (
								this._attributeCountMap = {
									__proto__: parent && parent._attributeCountMap || null
								} as any
							);

							let elAttrsSuperCall = elAttrs.superCall;
							let attrList: Object;
							let attrCount: number;

							if (elAttrsSuperCall) {
								if (!parent) {
									throw new TypeError('Parent template is required when using super');
								}

								attrList = attrListMap[elName] = {
									__proto__: parent._attributeListMap[elAttrsSuperCall.elementName || elName] || null
								};
								attrCount = attrCountMap[elName] =
									parent._attributeCountMap[elAttrsSuperCall.elementName || elName] || 0;
							} else {
								attrList = attrListMap[elName] = { __proto__: null };
								attrCount = attrCountMap[elName] = 0;
							}

							for (let attr of elAttrs.list) {
								let name = attr.name;
								let value = attr.value;
								let index = attrList[name];

								if (index === undefined) {
									attrList[attrCount] = ` ${ name }="${ value && escapeHTML(escapeString(value)) }"`;
									attrList[name] = attrCount;
									attrCountMap[elName] = ++attrCount;
								} else {
									attrList[index] = ` ${ name }="${ value && escapeHTML(escapeString(value)) }"`;
								}
							}

							if (!isHelper) {
								attrList = {
									__proto__: attrList,
									length: attrCount
								};

								if (attrList['class'] !== undefined) {
									attrList[attrList['class']] = ' class="' + this._renderElementClasses(elNames) +
										attrList[attrList['class']].slice(' class="'.length);

									renderedAttrs = join.call(attrList, '');
								} else {
									renderedAttrs = ` class="${ this._renderElementClasses(elNames).slice(0, -1) }"` +
										join.call(attrList, '');
								}
							}
						} else if (!isHelper) {
							renderedAttrs = ` class="${ this._renderElementClasses(elNames).slice(0, -1) }"`;
						}

						let currentEl = {
							name: elName,
							superCall: false,
							source: isHelper ? [`this['${ elName }@content']()`] : [
								`'<${ tagName || 'div' }${ renderedAttrs }>'`,
								content && content.length ?
									`this['${ elName }@content']() + '</${ tagName || 'div' }>'` :
									(
										!content && tagName && tagName in selfClosingTags ?
											"''" :
											`'</${ tagName || 'div' }>'`
									)
							],
							innerSource: []
						};

						els.push((this._currentElement = currentEl));
						this._elementMap[elName] = currentEl;
					} else if (!isHelper) {
						if (elAttrs && elAttrs.list.length) {
							let renderedClasses;
							let attrs = '';

							for (let attr of elAttrs.list) {
								let value = attr.value;

								if (attr.name == 'class') {
									renderedClasses = this._renderElementClasses(elNames);
									attrs += ` class="${
										value ?
											renderedClasses + escapeHTML(escapeString(value)) :
											renderedClasses.slice(0, -1)
									}"`;
								} else {
									attrs += ` ${ attr.name }="${ value && escapeHTML(escapeString(value)) }"`;
								}
							}

							this._currentElement.innerSource.push(
								`'<${ tagName || 'div' }${
									renderedClasses ?
										attrs :
										` class="${ this._renderElementClasses(elNames).slice(0, -1) }"` + attrs
								}>'`
							);
						} else {
							this._currentElement.innerSource.push(
								`'<${ tagName || 'div' } class="${
									this._renderElementClasses(elNames).slice(0, -1)
								}">'`
							);
						}
					}
				} else if (!isHelper) {
					this._currentElement.innerSource.push(`'<${ tagName || 'div' }${
						elAttrs ?
							elAttrs.list.map(
								attr => ` ${ attr.name }="${ attr.value && escapeHTML(escapeString(attr.value)) }"`
							).join('') :
							''
					}>'`);
				}

				if (isHelper) {
					if (!tagName) {
						throw new TypeError('tagName is required');
					}

					let helper = Template.helpers[tagName];

					if (!helper) {
						throw new TypeError(`Helper "${ tagName }" is not defined`);
					}

					let content = helper(el);

					if (content) {
						for (let contentNode of content) {
							this._compileNode(contentNode, elName || parentElName);
						}
					}
				} else if (content) {
					for (let contentNode of content) {
						this._compileNode(contentNode, elName || parentElName);
					}
				}

				if (elName) {
					els.pop();
					this._currentElement = els[els.length - 1];
					this._currentElement.innerSource.push(`this['${ elName }']()`);
				} else if (!isHelper && (content || !tagName || !(tagName in selfClosingTags))) {
					this._currentElement.innerSource.push(`'</${ tagName || 'div' }>'`);
				}

				break;
			}
			case NodeType.TEXT: {
				this._currentElement.innerSource.push(`'${ escapeString((node as ITextNode).value) }'`);
				break;
			}
			case NodeType.SUPER_CALL: {
				this._currentElement.innerSource
					.push(`$super['${ (node as ISuperCall).elementName || parentElName }@content'].call(this)`);
				this._currentElement.superCall = true;
				break;
			}
		}
	}

	_renderElementClasses(elNames: Array<string | null>): string {
		let elClasses = elNames[0] ? this._elementClassesTemplate.join(elNames[0] + ' ') : '';
		let elNameCount = elNames.length;

		if (elNameCount > 1) {
			let i = 1;

			do {
				elClasses += this._elementClassesTemplate.join(elNames[i] + ' ');
			} while (++i < elNameCount);
		}

		return elClasses;
	}
}
