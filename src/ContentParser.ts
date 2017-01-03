import keypathToJSExpression from './keypathToJSExpression';
import namePattern from './namePattern';
import keypathPattern from './keypathPattern';

export enum ContentNodeType {
	TEXT = 1,
	BINDING,
	BINDING_KEYPATH,
	BINDING_FORMATTER,
	BINDING_FORMATTER_ARGUMENTS
};

export interface IContentNode {
	nodeType: ContentNodeType;
	at: number;
	raw: string;
}

export interface IContentTextNode extends IContentNode {
	nodeType: ContentNodeType.TEXT;
	value: string;
}

export interface IContentBindingKeypath extends IContentNode {
	nodeType: ContentNodeType.BINDING_KEYPATH;
	value: string;
}

export interface IContentBindingFormatterArguments extends IContentNode {
	nodeType: ContentNodeType.BINDING_FORMATTER_ARGUMENTS;
	value: Array<string>;
}

export interface IContentBindingFormatter extends IContentNode {
	nodeType: ContentNodeType.BINDING_FORMATTER;
	name: string;
	arguments: IContentBindingFormatterArguments | null;
}

export interface IContentBinding extends IContentNode {
	nodeType: ContentNodeType.BINDING;
	keypath: IContentBindingKeypath;
	formatters: Array<IContentBindingFormatter>;
}

export type TContent = Array<IContentTextNode | IContentBinding>;

let reNameOrNothing = RegExp(namePattern + '|', 'g');
let reKeypathOrNothing = RegExp(keypathPattern + '|', 'g');
let reBooleanOrNothing = /false|true|/g;
let reNumberOrNothing =
	/(?:[+-]\s*)?(?:0b[01]+|0[0-7]+|0x[0-9a-fA-F]+|(?:(?:0|[1-9]\d*)(?:\.\d+)?|\.\d+)(?:[eE][+-]?\d+)?|Infinity|NaN)|/g;
let reVacuumOrNothing = /null|undefined|void 0|/g;

let NOT_VALUE_AND_NOT_KEYPATH = {};

export default class ContentParser {
	static ContentNodeType = ContentNodeType;

	content: string;
	at: number;
	chr: string;
	result: TContent;

	constructor(content: string) {
		this.content = content;
	}

	parse(): TContent {
		let content = this.content;

		if (!content) {
			return [];
		}

		this.at = 0;

		let result: TContent = this.result = [];

		for (let index: number; (index = content.indexOf('{', this.at)) > -1;) {
			this._pushText(content.slice(this.at, index));

			this.at = index;
			this.chr = content.charAt(index);

			let binding = this._readBinding();

			if (binding) {
				result.push(binding);
			} else {
				this._pushText(this.chr);
				this._next('{');
			}
		}

		this._pushText(content.slice(this.at));

		return result;
	}

	_pushText(value: string) {
		if (value) {
			let result = this.result;
			let resultLen = result.length;

			if (resultLen && result[resultLen - 1].nodeType == ContentNodeType.TEXT) {
				(result[resultLen - 1] as IContentTextNode).value = result[resultLen - 1].raw += value;
			} else {
				result.push({
					nodeType: ContentNodeType.TEXT,
					value,
					at: this.at,
					raw: value
				});
			}
		}
	}

	_readBinding(): IContentBinding | null {
		let at = this.at;

		this._next('{');
		this._skipWhitespaces();

		let keypath = this._readBindingKeypath();

		if (keypath) {
			let formatters: Array<IContentBindingFormatter> = [];

			for (
				let formatter: IContentBindingFormatter | null;
				this._skipWhitespaces() == '|' && (formatter = this._readFormatter());
			) {
				formatters.push(formatter);
			}

			if (this.chr == '}') {
				this._next();

				return {
					nodeType: ContentNodeType.BINDING,
					keypath,
					formatters,
					at,
					raw: this.content.slice(at, this.at)
				};
			}
		}

		this.at = at;
		this.chr = this.content.charAt(at);

		return null;
	}

	_readBindingKeypath(): IContentBindingKeypath | null {
		let content = this.content;

		reKeypathOrNothing.lastIndex = this.at;
		let keypath = (reKeypathOrNothing.exec(content) as RegExpExecArray)[0];

		if (keypath) {
			let at = this.at;

			this.chr = content.charAt((this.at += keypath.length));

			return {
				nodeType: ContentNodeType.BINDING_KEYPATH,
				value: keypath,
				at,
				raw: content.slice(at, this.at)
			};
		}

		return null;
	}

	_readFormatter(): IContentBindingFormatter | null {
		let at = this.at;

		this._next('|');
		this._skipWhitespaces();

		let name = this._readName();

		if (name) {
			let args = this.chr == '(' ? this._readFormatterArguments() : null;

			return {
				nodeType: ContentNodeType.BINDING_FORMATTER,
				name,
				arguments: args,
				at,
				raw: this.content.slice(at, this.at)
			};
		}

		this.at = at;
		this.chr = this.content.charAt(at);

		return null;
	}

	_readFormatterArguments(): IContentBindingFormatterArguments | null {
		let at = this.at;

		this._next('(');

		let args: Array<string> = [];

		if (this._skipWhitespaces() != ')') {
			for (;;) {
				let arg = this._readValueOrValueKeypath();

				if (arg !== NOT_VALUE_AND_NOT_KEYPATH) {
					if (this._skipWhitespaces() == ',' || this.chr == ')') {
						args.push(arg as string);

						if (this.chr == ',') {
							this._next();
							this._skipWhitespaces();
							continue;
						}

						break;
					}
				}

				this.at = at;
				this.chr = this.content.charAt(at);

				return null;
			}
		}

		this._next();

		return {
			nodeType: ContentNodeType.BINDING_FORMATTER_ARGUMENTS,
			value: args,
			at,
			raw: this.content.slice(at, this.at)
		};
	}

	_readValueOrValueKeypath(): string | Object {
		let value = this._readValue();
		return value === NOT_VALUE_AND_NOT_KEYPATH ? this._readValueKeypath() : value;
	}

	_readValue(): string | Object {
		switch (this.chr) {
			case '{': {
				return this._readObject();
			}
			case '[': {
				return this._readArray();
			}
			case "'":
			case '"': {
				return this._readString();
			}
		}

		let readers = ['_readBoolean', '_readNumber', '_readVacuum'];

		for (let reader of readers) {
			let value = this[reader]();

			if (value !== NOT_VALUE_AND_NOT_KEYPATH) {
				return value;
			}
		}

		return NOT_VALUE_AND_NOT_KEYPATH;
	}

	_readObject(): string | Object {
		let at = this.at;

		this._next('{');

		let obj = '{';

		while (this._skipWhitespaces() != '}') {
			let key = this.chr == "'" || this.chr == '"' ? this._readString() : this._readObjectKey();

			if (key !== NOT_VALUE_AND_NOT_KEYPATH && key !== null && this._skipWhitespaces() == ':') {
				this._next();
				this._skipWhitespaces();

				let v = this._readValueOrValueKeypath();

				if (v !== NOT_VALUE_AND_NOT_KEYPATH) {
					if (this._skipWhitespaces() == ',') {
						obj += key + ':' + v + ',';
						this._next();
						continue;
					} else if (this.chr == '}') {
						obj += key + ':' + v + '}';
						break;
					}
				}
			}

			this.at = at;
			this.chr = this.content.charAt(at);

			return NOT_VALUE_AND_NOT_KEYPATH;
		}

		this._next();

		return obj;
	}

	_readObjectKey(): string | null {
		return this._readName();
	}

	_readArray(): string | Object {
		let at = this.at;

		this._next('[');

		let arr = '[';

		while (this._skipWhitespaces() != ']') {
			if (this.chr == ',') {
				arr += ',';
				this._next();
			} else {
				let v = this._readValueOrValueKeypath();

				if (v === NOT_VALUE_AND_NOT_KEYPATH) {
					this.at = at;
					this.chr = this.content.charAt(at);

					return NOT_VALUE_AND_NOT_KEYPATH;
				} else {
					arr += v;
				}
			}
		}

		this._next();

		return arr + ']';
	}

	_readBoolean(): string | Object {
		reBooleanOrNothing.lastIndex = this.at;
		let bool = (reBooleanOrNothing.exec(this.content) as RegExpExecArray)[0];

		if (bool) {
			this.chr = this.content.charAt((this.at += bool.length));
			return bool;
		}

		return NOT_VALUE_AND_NOT_KEYPATH;
	}

	_readNumber(): string | Object {
		reNumberOrNothing.lastIndex = this.at;
		let num = (reNumberOrNothing.exec(this.content) as RegExpExecArray)[0];

		if (num) {
			this.chr = this.content.charAt((this.at += num.length));
			return num;
		}

		return NOT_VALUE_AND_NOT_KEYPATH;
	}

	_readString(): string | Object {
		let quoteChar = this.chr;

		if (quoteChar != "'" && quoteChar != '"') {
			throw {
				name: 'SyntaxError',
				message: `Expected "'" instead of "${ this.chr }"`,
				at: this.at,
				content: this.content
			};
		}

		let at = this.at;
		let str = '';

		for (let next; (next = this._next());) {
			if (next == quoteChar) {
				this._next();
				return quoteChar + str + quoteChar;
			}

			if (next == '\\') {
				str += next + this._next();
			} else {
				if (next == '\r' || next == '\n') {
					break;
				}

				str += next;
			}
		}

		this.at = at;
		this.chr = this.content.charAt(at);

		return NOT_VALUE_AND_NOT_KEYPATH;
	}

	_readVacuum(): string | Object {
		reVacuumOrNothing.lastIndex = this.at;
		let vacuum = (reVacuumOrNothing.exec(this.content) as RegExpExecArray)[0];

		if (vacuum) {
			this.chr = this.content.charAt((this.at += vacuum.length));
			return vacuum;
		}

		return NOT_VALUE_AND_NOT_KEYPATH;
	}

	_readValueKeypath(): string | Object {
		reKeypathOrNothing.lastIndex = this.at;
		let keypath = (reKeypathOrNothing.exec(this.content) as RegExpExecArray)[0];

		if (keypath) {
			this.chr = this.content.charAt((this.at += keypath.length));
			return keypathToJSExpression(keypath);
		}

		return NOT_VALUE_AND_NOT_KEYPATH;
	}

	_readName(): string | null {
		reNameOrNothing.lastIndex = this.at;
		let name = (reNameOrNothing.exec(this.content) as RegExpExecArray)[0];

		if (name) {
			this.chr = this.content.charAt((this.at += name.length));
			return name;
		}

		return null;
	}

	_skipWhitespaces(): string {
		let chr = this.chr;

		while (chr && chr <= ' ') {
			chr = this._next();
		}

		return chr;
	}

	_next(current?: string): string {
		if (current && current != this.chr) {
			throw {
				name: 'SyntaxError',
				message: `Expected "${ current }" instead of "${ this.chr }"`,
				at: this.at,
				content: this.content
			};
		}

		return (this.chr = this.content.charAt(++this.at));
	}
}
