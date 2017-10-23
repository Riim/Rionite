import { keypathPattern } from './keypathPattern';
import { keypathToJSExpression } from './keypathToJSExpression';
import { namePattern } from './namePattern';

export enum ContentTextFragmentNodeType {
	TEXT = 1,
	BINDING,
	BINDING_KEYPATH,
	BINDING_FORMATTER,
	BINDING_FORMATTER_ARGUMENTS
}

export interface IContentTextFragmentNode {
	nodeType: ContentTextFragmentNodeType;
}

export interface IContentTextFragmentTextNode extends IContentTextFragmentNode {
	nodeType: ContentTextFragmentNodeType.TEXT;
	value: string;
}

export interface IContentTextFragmentBindingFormatterArguments extends IContentTextFragmentNode {
	nodeType: ContentTextFragmentNodeType.BINDING_FORMATTER_ARGUMENTS;
	value: Array<string>;
}

export interface IContentTextFragmentBindingFormatter extends IContentTextFragmentNode {
	nodeType: ContentTextFragmentNodeType.BINDING_FORMATTER;
	name: string;
	arguments: IContentTextFragmentBindingFormatterArguments | null;
}

export interface IContentTextFragmentBinding extends IContentTextFragmentNode {
	nodeType: ContentTextFragmentNodeType.BINDING;
	argument: string;
	isArgumentKeypath: boolean;
	formatters: Array<IContentTextFragmentBindingFormatter> | null;
	raw: string;
}

export type TContentTextFragment = Array<
	IContentTextFragmentTextNode | IContentTextFragmentBinding
>;

export type TNotValueAndNotKeypath = Object;

let reNameOrNothing = RegExp(namePattern + '|', 'g');
let reKeypathOrNothing = RegExp(keypathPattern + '|', 'g');
let reBooleanOrNothing = /false|true|/g;
let reNumberOrNothing = /(?:[+-]\s*)?(?:0b[01]+|0[0-7]+|0x[0-9a-fA-F]+|(?:(?:0|[1-9]\d*)(?:\.\d+)?|\.\d+)(?:[eE][+-]?\d+)?|Infinity|NaN)|/g;
let reVacuumOrNothing = /null|undefined|void 0|/g;

export class ContentTextFragmentParser {
	static ContentTextFragmentNodeType = ContentTextFragmentNodeType;

	contentTextFragment: string;
	at: number;
	chr: string;
	result: TContentTextFragment;

	constructor(contentTextFragment: string) {
		this.contentTextFragment = contentTextFragment;
	}

	parse(): TContentTextFragment {
		let contentTextFragment = this.contentTextFragment;

		if (!contentTextFragment) {
			return [];
		}

		this.at = 0;

		let result: TContentTextFragment = (this.result = []);

		for (let index: number; (index = contentTextFragment.indexOf('{', this.at)) != -1; ) {
			this._pushText(contentTextFragment.slice(this.at, index));

			this.at = index;
			this.chr = contentTextFragment.charAt(index);

			let binding = this._readBinding();

			if (binding) {
				result.push(binding);
			} else {
				this._pushText(this.chr);
				this._next('{');
			}
		}

		this._pushText(contentTextFragment.slice(this.at));

		return result;
	}

	_pushText(value: string) {
		if (value) {
			let result = this.result;
			let resultLen = result.length;

			if (resultLen && result[resultLen - 1].nodeType == ContentTextFragmentNodeType.TEXT) {
				(result[resultLen - 1] as IContentTextFragmentTextNode).value = value;
			} else {
				result.push({
					nodeType: ContentTextFragmentNodeType.TEXT,
					value
				});
			}
		}
	}

	_readBinding(): IContentTextFragmentBinding | null {
		let at = this.at;

		this._next('{');
		this._skipWhitespaces();

		let argument = this._readValue();
		let isArgumentKeypath;

		if (!argument) {
			argument = this._readKeypath();
			isArgumentKeypath = true;
		}

		if (argument) {
			let formatters: Array<IContentTextFragmentBindingFormatter> | undefined;

			for (
				let formatter: IContentTextFragmentBindingFormatter | null;
				this._skipWhitespaces() == '|' && (formatter = this._readFormatter());

			) {
				(formatters || (formatters = [])).push(formatter);
			}

			if (this.chr == '}') {
				this._next();

				return {
					nodeType: ContentTextFragmentNodeType.BINDING,
					argument,
					isArgumentKeypath: isArgumentKeypath || false,
					formatters: formatters || null,
					raw: this.contentTextFragment.slice(at, this.at)
				};
			}
		}

		this.at = at;
		this.chr = this.contentTextFragment.charAt(at);

		return null;
	}

	_readFormatter(): IContentTextFragmentBindingFormatter | null {
		let at = this.at;

		this._next('|');
		this._skipWhitespaces();

		let name = this._readName();

		if (name) {
			let args = this.chr == '(' ? this._readFormatterArguments() : null;

			return {
				nodeType: ContentTextFragmentNodeType.BINDING_FORMATTER,
				name,
				arguments: args
			};
		}

		this.at = at;
		this.chr = this.contentTextFragment.charAt(at);

		return null;
	}

	_readFormatterArguments(): IContentTextFragmentBindingFormatterArguments | null {
		let at = this.at;

		this._next('(');

		let args: Array<string> = [];

		if (this._skipWhitespaces() != ')') {
			for (;;) {
				let arg = this._readValue() || this._readKeypath(true);

				if (arg) {
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
				this.chr = this.contentTextFragment.charAt(at);

				return null;
			}
		}

		this._next();

		return {
			nodeType: ContentTextFragmentNodeType.BINDING_FORMATTER_ARGUMENTS,
			value: args
		};
	}

	_readValue(): string | null {
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
			let value = (this as any)[reader]();

			if (value) {
				return value;
			}
		}

		return null;
	}

	_readObject(): string | null {
		let at = this.at;

		this._next('{');

		let obj = '{';

		while (this._skipWhitespaces() != '}') {
			let key =
				this.chr == "'" || this.chr == '"' ? this._readString() : this._readObjectKey();

			if (key && this._skipWhitespaces() == ':') {
				this._next();
				this._skipWhitespaces();

				let valueOrKeypath = this._readValue() || this._readKeypath(true);

				if (valueOrKeypath) {
					if (this._skipWhitespaces() == ',') {
						obj += key + ':' + valueOrKeypath + ',';
						this._next();
						continue;
					} else if (this.chr == '}') {
						obj += key + ':' + valueOrKeypath + '}';
						break;
					}
				}
			}

			this.at = at;
			this.chr = this.contentTextFragment.charAt(at);

			return null;
		}

		this._next();

		return obj;
	}

	_readObjectKey(): string | null {
		return this._readName();
	}

	_readArray(): string | null {
		let at = this.at;

		this._next('[');

		let arr = '[';

		while (this._skipWhitespaces() != ']') {
			if (this.chr == ',') {
				arr += ',';
				this._next();
			} else {
				let valueOrKeypath = this._readValue() || this._readKeypath(true);

				if (valueOrKeypath) {
					arr += valueOrKeypath;
				} else {
					this.at = at;
					this.chr = this.contentTextFragment.charAt(at);

					return null;
				}
			}
		}

		this._next();

		return arr + ']';
	}

	_readBoolean(): string | null {
		reBooleanOrNothing.lastIndex = this.at;
		let bool = reBooleanOrNothing.exec(this.contentTextFragment)![0];

		if (bool) {
			this.chr = this.contentTextFragment.charAt((this.at += bool.length));
			return bool;
		}

		return null;
	}

	_readNumber(): string | null {
		reNumberOrNothing.lastIndex = this.at;
		let num = reNumberOrNothing.exec(this.contentTextFragment)![0];

		if (num) {
			this.chr = this.contentTextFragment.charAt((this.at += num.length));
			return num;
		}

		return null;
	}

	_readString(): string | null {
		let quoteChar = this.chr;

		if (quoteChar != "'" && quoteChar != '"') {
			throw {
				name: 'SyntaxError',
				message: `Expected "'" instead of "${this.chr}"`,
				at: this.at,
				contentTextFragment: this.contentTextFragment
			};
		}

		let at = this.at;
		let str = '';

		for (let next; (next = this._next()); ) {
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
		this.chr = this.contentTextFragment.charAt(at);

		return null;
	}

	_readVacuum(): string | null {
		reVacuumOrNothing.lastIndex = this.at;
		let vacuum = reVacuumOrNothing.exec(this.contentTextFragment)![0];

		if (vacuum) {
			this.chr = this.contentTextFragment.charAt((this.at += vacuum.length));
			return vacuum;
		}

		return null;
	}

	_readKeypath(toJSExpression?: boolean): string | null {
		reKeypathOrNothing.lastIndex = this.at;
		let keypath = reKeypathOrNothing.exec(this.contentTextFragment)![0];

		if (keypath) {
			this.chr = this.contentTextFragment.charAt((this.at += keypath.length));
			return toJSExpression ? keypathToJSExpression(keypath) : keypath;
		}

		return null;
	}

	_readName(): string | null {
		reNameOrNothing.lastIndex = this.at;
		let name = reNameOrNothing.exec(this.contentTextFragment)![0];

		if (name) {
			this.chr = this.contentTextFragment.charAt((this.at += name.length));
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
				message: `Expected "${current}" instead of "${this.chr}"`,
				at: this.at,
				contentTextFragment: this.contentTextFragment
			};
		}

		return (this.chr = this.contentTextFragment.charAt(++this.at));
	}
}
