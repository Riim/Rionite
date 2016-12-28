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
			this.pushText(content.slice(this.at, index));

			this.at = index;
			this.chr = content.charAt(index);

			let binding = this.readBinding();

			if (binding) {
				result.push(binding);
			} else {
				this.pushText(this.chr);
				this.next('{');
			}
		}

		this.pushText(content.slice(this.at));

		return result;
	}

	pushText(value: string) {
		if (value) {
			let result = this.result;
			let resultLen = result.length;

			if (resultLen && result[resultLen - 1].nodeType == ContentNodeType.TEXT) {
				(result[resultLen - 1] as IContentTextNode).value = result[resultLen - 1].raw += value;
			} else {
				result.push({
					nodeType: ContentNodeType.TEXT,
					at: this.at,
					raw: value,
					value
				});
			}
		}
	}

	readBinding(): IContentBinding | null {
		let at = this.at;

		this.next('{');
		this.skipWhitespaces();

		let keypath = this.readBindingKeypath();

		if (keypath) {
			let formatters: Array<IContentBindingFormatter> = [];

			for (
				let formatter: IContentBindingFormatter | null;
				this.skipWhitespaces() == '|' && (formatter = this.readFormatter());
			) {
				formatters.push(formatter);
			}

			if (this.chr == '}') {
				this.next();

				return {
					nodeType: ContentNodeType.BINDING,
					at,
					raw: this.content.slice(at, this.at),
					keypath,
					formatters
				};
			}
		}

		this.at = at;
		this.chr = this.content.charAt(at);

		return null;
	}

	readBindingKeypath(): IContentBindingKeypath | null {
		let content = this.content;

		reKeypathOrNothing.lastIndex = this.at;
		let keypath = (reKeypathOrNothing.exec(content) as RegExpExecArray)[0];

		if (keypath) {
			let at = this.at;

			this.chr = content.charAt((this.at += keypath.length));

			return {
				nodeType: ContentNodeType.BINDING_KEYPATH,
				at,
				raw: content.slice(at, this.at),
				value: keypath
			};
		}

		return null;
	}

	readFormatter(): IContentBindingFormatter | null {
		let at = this.at;

		this.next('|');
		this.skipWhitespaces();

		let content = this.content;

		reNameOrNothing.lastIndex = this.at;
		let name = (reNameOrNothing.exec(content) as RegExpExecArray)[0];

		if (name) {
			let args = (this.chr = content.charAt((this.at += name.length))) == '(' ?
				this.readFormatterArguments() :
				null;

			return {
				nodeType: ContentNodeType.BINDING_FORMATTER,
				at,
				raw: content.slice(at, this.at),
				name,
				arguments: args
			};
		}

		this.at = at;
		this.chr = content.charAt(at);

		return null;
	}

	readFormatterArguments(): IContentBindingFormatterArguments | null {
		let at = this.at;

		this.next('(');

		let args: Array<string> = [];

		if (this.skipWhitespaces() != ')') {
			for (;;) {
				let arg = this.readValueOrValueKeypath();

				if (arg !== NOT_VALUE_AND_NOT_KEYPATH) {
					if (this.skipWhitespaces() == ',' || this.chr == ')') {
						args.push(arg as string);

						if (this.chr == ',') {
							this.next();
							this.skipWhitespaces();
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

		this.next();

		return {
			nodeType: ContentNodeType.BINDING_FORMATTER_ARGUMENTS,
			at,
			raw: this.content.slice(at, this.at),
			value: args
		};
	}

	readValueOrValueKeypath(): string | Object {
		let value = this.readValue();
		return value === NOT_VALUE_AND_NOT_KEYPATH ? this.readValueKeypath() : value;
	}

	readValue(): string | Object {
		switch (this.chr) {
			case '{': {
				return this.readObject();
			}
			case '[': {
				return this.readArray();
			}
			case "'":
			case '"': {
				return this.readString();
			}
		}

		let readers = ['readBoolean', 'readNumber', 'readVacuum'];

		for (let reader of readers) {
			let value = this[reader]();

			if (value !== NOT_VALUE_AND_NOT_KEYPATH) {
				return value;
			}
		}

		return NOT_VALUE_AND_NOT_KEYPATH;
	}

	readObject(): string | Object {
		let at = this.at;

		this.next('{');

		let obj = '{';

		while (this.skipWhitespaces() != '}') {
			let key = this.chr == "'" || this.chr == '"' ? this.readString() : this.readObjectKey();

			if (key !== NOT_VALUE_AND_NOT_KEYPATH && key !== null && this.skipWhitespaces() == ':') {
				this.next();
				this.skipWhitespaces();

				let v = this.readValueOrValueKeypath();

				if (v !== NOT_VALUE_AND_NOT_KEYPATH) {
					if (this.skipWhitespaces() == ',') {
						obj += key + ':' + v + ',';
						this.next();
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

		this.next();

		return obj;
	}

	readObjectKey(): string | null {
		reNameOrNothing.lastIndex = this.at;
		let key = (reNameOrNothing.exec(this.content) as RegExpExecArray)[0];

		if (key) {
			this.chr = this.content.charAt((this.at += key.length));
			return key;
		}

		return null;
	}

	readArray(): string | Object {
		let at = this.at;

		this.next('[');

		let arr = '[';

		while (this.skipWhitespaces() != ']') {
			if (this.chr == ',') {
				arr += ',';
				this.next();
			} else {
				let v = this.readValueOrValueKeypath();

				if (v === NOT_VALUE_AND_NOT_KEYPATH) {
					this.at = at;
					this.chr = this.content.charAt(at);

					return NOT_VALUE_AND_NOT_KEYPATH;
				} else {
					arr += v;
				}
			}
		}

		this.next();

		return arr + ']';
	}

	readBoolean(): string | Object {
		reBooleanOrNothing.lastIndex = this.at;
		let bool = (reBooleanOrNothing.exec(this.content) as RegExpExecArray)[0];

		if (bool) {
			this.chr = this.content.charAt((this.at += bool.length));
			return bool;
		}

		return NOT_VALUE_AND_NOT_KEYPATH;
	}

	readNumber(): string | Object {
		reNumberOrNothing.lastIndex = this.at;
		let num = (reNumberOrNothing.exec(this.content) as RegExpExecArray)[0];

		if (num) {
			this.chr = this.content.charAt((this.at += num.length));
			return num;
		}

		return NOT_VALUE_AND_NOT_KEYPATH;
	}

	readString(): string | Object {
		if (this.chr != "'" && this.chr != '"') {
			throw {
				name: 'SyntaxError',
				message: `Expected "'" or '"' instead of "${ this.chr }"`,
				at: this.at,
				content: this.content
			};
		}

		let at = this.at;

		let quoteChar = this.chr;
		let str = '';

		while (this.next()) {
			if (this.chr == quoteChar) {
				this.next();
				return quoteChar + str + quoteChar;
			}

			if ((this.chr as string) == '\\') {
				str += this.chr + this.next();
			} else {
				if ((this.chr as string) == '\r' || (this.chr as string) == '\n') {
					break;
				}

				str += this.chr;
			}
		}

		this.at = at;
		this.chr = this.content.charAt(at);

		return NOT_VALUE_AND_NOT_KEYPATH;
	}

	readVacuum(): string | Object {
		reVacuumOrNothing.lastIndex = this.at;
		let vacuum = (reVacuumOrNothing.exec(this.content) as RegExpExecArray)[0];

		if (vacuum) {
			this.chr = this.content.charAt((this.at += vacuum.length));
			return vacuum;
		}

		return NOT_VALUE_AND_NOT_KEYPATH;
	}

	readValueKeypath(): string | Object {
		reKeypathOrNothing.lastIndex = this.at;
		let keypath = (reKeypathOrNothing.exec(this.content) as RegExpExecArray)[0];

		if (keypath) {
			this.chr = this.content.charAt((this.at += keypath.length));
			return keypathToJSExpression(keypath);
		}

		return NOT_VALUE_AND_NOT_KEYPATH;
	}

	next(c?: string): string {
		if (c && c != this.chr) {
			throw {
				name: 'SyntaxError',
				message: `Expected "${ c }" instead of "${ this.chr }"`,
				at: this.at,
				content: this.content
			};
		}

		return (this.chr = this.content.charAt(++this.at));
	}

	skipWhitespaces(): string {
		let chr = this.chr;

		while (chr && chr <= ' ') {
			chr = this.next();
		}

		return chr;
	}
}
