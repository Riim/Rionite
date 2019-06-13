import { kebabCase } from '@riim/kebab-case';

export enum NodeType {
	BLOCK = 1,
	SUPER_CALL,
	DEBUGGER_CALL,
	ELEMENT,
	ELEMENT_ATTRIBUTE,
	TEXT,
	COMMENT
}

export interface INode {
	nodeType: NodeType;
	pos: number;
	line: number;
}

export type TContent = Array<INode>;

export interface ISuperCall extends INode {
	nodeType: NodeType.SUPER_CALL;
	elementName: string | null;
}

export interface IDebuggerCall extends INode {
	nodeType: NodeType.DEBUGGER_CALL;
}

export interface IElementAttribute extends INode {
	nodeType: NodeType.ELEMENT_ATTRIBUTE;
	name: string;
	value: string;
}

export type TElementAttributeList = Array<IElementAttribute>;

export interface IElementAttributes {
	superCall: ISuperCall | null;
	list: TElementAttributeList;
}

export interface IElement extends INode {
	nodeType: NodeType.ELEMENT;
	isTransformer: boolean;
	tagName: string | null;
	names: Array<string | null> | null;
	attributes: IElementAttributes | null;
	content: TContent | null;
}

export interface ITextNode extends INode {
	nodeType: NodeType.TEXT;
	value: string;
}

export interface IComment extends INode {
	nodeType: NodeType.COMMENT;
	value: string;
	multiline: boolean;
}

export interface IBlock extends INode {
	nodeType: NodeType.BLOCK;
	content: TContent;
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
const reLineBreak = /\n|\r\n?/g;

const reWhitespaces = /\s+|/g;
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

export class TemplateParser {
	template: string;

	_pos: number;
	_line = 1;

	_chr: string;

	constructor(template: string) {
		this.template = template;
	}

	parse(): IBlock {
		this._pos = 0;
		this._chr = this.template.charAt(0);

		this._skipWhitespaces();

		let pos = this._pos;
		let line = this._line;

		return {
			nodeType: NodeType.BLOCK,
			content: this._readContent(false),
			pos,
			line
		};
	}

	_readContent(brackets: boolean): TContent {
		if (brackets) {
			this._next('{');
			this._skipWhitespaces();
		}

		let content: TContent = [];

		for (;;) {
			switch (this._chr) {
				case "'":
				case '"':
				case '`': {
					let pos = this._pos;
					let line = this._line;

					content.push({
						nodeType: NodeType.TEXT,
						value: this._readString(),
						pos,
						line
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

					if (chr == '/') {
						let nextChr = this.template.charAt(this._pos + 1);

						if (nextChr == '/' || nextChr == '*') {
							this._readComment(content);
							break;
						}
					} else if (chr == 'd' && this.template.substr(this._pos, 9) == 'debugger!') {
						let pos = this._pos;

						this._chr = this.template.charAt((this._pos += 9));

						content.push({
							nodeType: NodeType.DEBUGGER_CALL,
							pos,
							line: this._line
						});

						break;
					}

					if (brackets) {
						if (chr == '}') {
							this._next();
							return content;
						}

						let superCall = this._readSuperCall();

						if (superCall) {
							content.push(superCall);
							break;
						}
					}

					this._readElement(content);

					break;
				}
			}

			this._skipWhitespaces();
		}
	}

	_readElement(targetContent: TContent) {
		let pos = this._pos;
		let line = this._line;
		let isTransformer = this._chr == '@';

		if (isTransformer) {
			this._next();
		}

		let tagName = this._readName(reTagName);

		this._skipWhitespacesAndReadComments(targetContent);

		let elNames: Array<string | null> | undefined;

		if (this._chr == ':') {
			this._next();

			let pos = this._pos;

			this._skipWhitespacesAndReadComments(targetContent);

			if (this._chr == ':') {
				elNames = [null];
				this._next();
				this._skipWhitespacesAndReadComments(targetContent);
			}

			for (let name; (name = this._readName(reElementName)); ) {
				(elNames || (elNames = [])).push(name);

				if (this._skipWhitespacesAndReadComments(targetContent) != ':') {
					break;
				}

				this._next();
				this._skipWhitespacesAndReadComments(targetContent);
			}

			if (!elNames || (!elNames[0] && elNames.length == 1)) {
				this._throwError('Expected element name', pos);
			}
		}

		if (!tagName && !elNames) {
			this._throwError('Expected element', pos);
		}

		let attrs: IElementAttributes | undefined;

		if (this._chr == '(') {
			attrs = this._readAttributes(targetContent);
			this._skipWhitespaces();
		}

		let content: TContent | undefined;

		if (this._chr == '{') {
			content = this._readContent(true);
		}

		targetContent.push({
			nodeType: NodeType.ELEMENT,
			isTransformer,
			tagName: tagName && (isTransformer ? tagName : kebabCase(tagName, true)),
			names: elNames || null,
			attributes: attrs || null,
			content: content || null,
			pos,
			line
		} as IElement);
	}

	_readAttributes(targetContent: TContent): IElementAttributes {
		this._next('(');

		if (this._skipWhitespacesAndReadComments(targetContent) == ')') {
			this._next();

			return {
				superCall: null,
				list: []
			};
		}

		let superCall: ISuperCall | null | undefined;
		let list: TElementAttributeList = [];

		loop: for (;;) {
			if (this._chr == 's' && (superCall = this._readSuperCall())) {
				this._skipWhitespacesAndReadComments(targetContent);
			} else {
				let pos = this._pos;
				let line = this._line;
				let name = this._readName(reAttributeName);

				if (!name) {
					throw this._throwError('Expected attribute name');
				}

				if (this._skipWhitespacesAndReadComments(targetContent) == '=') {
					this._next();

					let chr = this._skipWhitespaces();

					if (chr == "'" || chr == '"' || chr == '`') {
						list.push({
							nodeType: NodeType.ELEMENT_ATTRIBUTE,
							name,
							value: this._readString(),
							pos,
							line
						});

						this._skipWhitespacesAndReadComments(targetContent);
					} else {
						let value = '';

						for (;;) {
							if (!chr) {
								this._throwError(
									'Unexpected end of template. Expected "," or ")" to finalize attribute value.'
								);
							}

							if (chr == ',' || chr == ')' || chr == '\n' || chr == '\r') {
								list.push({
									nodeType: NodeType.ELEMENT_ATTRIBUTE,
									name,
									value: value.trim(),
									pos,
									line
								});

								if (chr == '\n' || chr == '\r') {
									this._skipWhitespacesAndReadComments(targetContent);
								}

								break;
							}

							value += chr;
							chr = this._next();
						}
					}
				} else {
					list.push({
						nodeType: NodeType.ELEMENT_ATTRIBUTE,
						name,
						value: '',
						pos,
						line
					});
				}
			}

			switch (this._chr) {
				case ')': {
					this._next();
					break loop;
				}
				case ',': {
					this._next();
					this._skipWhitespacesAndReadComments(targetContent);
					break;
				}
				default: {
					this._throwError(
						'Unexpected end of template. Expected "," or ")" to finalize attribute value.'
					);
				}
			}
		}

		return {
			superCall: superCall || null,
			list
		};
	}

	_readSuperCall(): ISuperCall | null {
		let pos = this._pos;

		reSuperCall.lastIndex = pos;
		let match = reSuperCall.exec(this.template)!;

		if (match[0]) {
			this._chr = this.template.charAt((this._pos = reSuperCall.lastIndex));

			return {
				nodeType: NodeType.SUPER_CALL,
				elementName: match[1] || null,
				pos,
				line: this._line
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

		if (quoteChar != "'" && quoteChar != '"' && quoteChar != '`') {
			this._throwError('Expected string');
		}

		let str = '';

		for (let chr = this._next(); chr; ) {
			if (chr == quoteChar) {
				this._next();

				if (quoteChar == '`') {
					this._line += str.split(reLineBreak).length - 1;
					return normalizeMultilineText(str);
				}

				return str;
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

	_readComment(targetContent: TContent) {
		let pos = this._pos;
		let value = '';
		let multiline: boolean;

		switch (this._next('/')) {
			case '/': {
				for (let chr; (chr = this._next()) && chr != '\n' && chr != '\r'; ) {
					value += chr;
				}

				multiline = false;

				break;
			}
			case '*': {
				loop: for (;;) {
					switch (this._next()) {
						case '*': {
							if (this._next() == '/') {
								this._next();
								break loop;
							}

							value += '*' + this._chr;

							break;
						}
						case '': {
							this._throwError('Expected "*/" to close multiline comment', pos + 2);
						}
						default: {
							value += this._chr;
						}
					}
				}

				multiline = true;

				break;
			}
			default: {
				throw this._throwError('Expected comment');
			}
		}

		let line = this._line;

		if (multiline) {
			this._line = line + value.split(reWhitespace).length - 1;
		}

		targetContent.push({
			nodeType: NodeType.COMMENT,
			value,
			multiline,
			pos,
			line
		} as IComment);
	}

	_skipWhitespaces(): string {
		reWhitespaces.lastIndex = this._pos;
		let whitespaces = reWhitespaces.exec(this.template)![0];

		if (whitespaces) {
			this._line += whitespaces.split(reLineBreak).length - 1;

			return (this._chr = this.template.charAt((this._pos = reWhitespaces.lastIndex)));
		}

		return this._chr;
	}

	_skipWhitespacesAndReadComments(targetContent: TContent): string {
		for (let nextChr; ; ) {
			if (
				this._skipWhitespaces() == '/' &&
				((nextChr = this.template.charAt(this._pos + 1)) == '/' || nextChr == '*')
			) {
				this._readComment(targetContent);
			} else {
				break;
			}
		}

		return this._chr;
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
					.replace(reLineBreak, match => {
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
}
