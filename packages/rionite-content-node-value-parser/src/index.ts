const namePattern = '[$_a-zA-Z][$\\w]*';
const keypathPattern = `(?:${namePattern}|\\d+)(?:\\.(?:${namePattern}|\\d+))*`;

const cache = Object.create(null);

export function keypathToJSExpression(keypath: string, cacheKey?: string): string;
export function keypathToJSExpression(keypath: string | Array<string>, cacheKey: string): string;
export function keypathToJSExpression(
	keypath: string | Array<string>,
	cacheKey: string = keypath as any
): string {
	if (cache[cacheKey]) {
		return cache[cacheKey];
	}

	let keys = typeof keypath == 'string' ? keypath.split('.') : keypath;
	let keyCount = keys.length;

	if (keyCount == 1) {
		return (cache[cacheKey] = `this['${keypath}']`);
	}

	let index = keyCount - 2;
	let jsExpr = Array(index);

	while (index) {
		jsExpr[--index] = ` && (tmp = tmp['${keys[index + 1]}'])`;
	}

	return (cache[cacheKey] = `(tmp = this['${keys[0]}'])${jsExpr.join('')} && tmp['${
		keys[keyCount - 1]
	}']`);
}

export enum ContentNodeValueNodeType {
	TEXT = 1,
	BINDING,
	BINDING_KEYPATH,
	BINDING_FORMATTER,
	BINDING_FORMATTER_ARGUMENTS
}

export interface IContentNodeValueNode {
	nodeType: ContentNodeValueNodeType;
}

export interface IContentNodeValueText extends IContentNodeValueNode {
	nodeType: ContentNodeValueNodeType.TEXT;
	value: string;
}

export interface IContentNodeValueBindingFormatterArguments extends IContentNodeValueNode {
	nodeType: ContentNodeValueNodeType.BINDING_FORMATTER_ARGUMENTS;
	value: Array<string>;
}

export interface IContentNodeValueBindingFormatter extends IContentNodeValueNode {
	nodeType: ContentNodeValueNodeType.BINDING_FORMATTER;
	name: string;
	arguments: IContentNodeValueBindingFormatterArguments | null;
}

export interface IContentNodeValueBinding extends IContentNodeValueNode {
	nodeType: ContentNodeValueNodeType.BINDING;
	prefix: string | null;
	keypath: string | null;
	value: string | null;
	formatters: Array<IContentNodeValueBindingFormatter> | null;
	raw: string;
}

export type TContentNodeValue = Array<IContentNodeValueText | IContentNodeValueBinding>;

const reWhitespace = /\s/;

const reNameOrNothing = RegExp(namePattern + '|', 'g');
const reKeypathOrNothing = RegExp(keypathPattern + '|', 'g');
const reBooleanOrNothing = /false|true|/g;
const reNumberOrNothing = /(?:[+-]\s*)?(?:0b[01]+|0[0-7]+|0x[0-9a-fA-F]+|(?:(?:0|[1-9]\d*)(?:\.\d+)?|\.\d+)(?:[eE][+-]?\d+)?|Infinity|NaN)|/g;
const reVacuumOrNothing = /null|undefined|void 0|/g;

export class ContentNodeValueParser {
	contentNodeValue: string;
	at: number;
	chr: string;
	result: TContentNodeValue;

	constructor(contentNodeValue: string) {
		this.contentNodeValue = contentNodeValue;
	}

	parse(index: number): TContentNodeValue {
		let contentNodeValue = this.contentNodeValue;

		this.at = 0;

		let result: TContentNodeValue = (this.result = []);

		do {
			this._pushText(contentNodeValue.slice(this.at, index));

			this.at = index;
			this.chr = contentNodeValue.charAt(index);

			let binding = this._readBinding();

			if (binding) {
				result.push(binding);
			} else {
				this._pushText(this.chr);
				this._next('{');
			}

			index = contentNodeValue.indexOf('{', this.at);
		} while (index != -1);

		this._pushText(contentNodeValue.slice(this.at));

		return result;
	}

	_pushText(value: string) {
		if (value) {
			let result = this.result;
			let resultLen = result.length;

			if (resultLen && result[resultLen - 1].nodeType == ContentNodeValueNodeType.TEXT) {
				(result[resultLen - 1] as IContentNodeValueText).value += value;
			} else {
				result.push({
					nodeType: ContentNodeValueNodeType.TEXT,
					value
				});
			}
		}
	}

	_readBinding(): IContentNodeValueBinding | null {
		let at = this.at;

		this._next('{');
		this._skipWhitespaces();

		let prefix = this._readPrefix();

		this._skipWhitespaces();

		let keypath = this._readKeypath();
		let value: string | null | undefined;

		if (!prefix && !keypath) {
			value = this._readValue();
		}

		if (keypath || value) {
			let formatters: Array<IContentNodeValueBindingFormatter> | undefined;

			for (
				let formatter: IContentNodeValueBindingFormatter | null;
				this._skipWhitespaces() == '|' && (formatter = this._readFormatter());

			) {
				(formatters || (formatters = [])).push(formatter);
			}

			if (this.chr == '}') {
				this._next();

				return {
					nodeType: ContentNodeValueNodeType.BINDING,
					prefix,
					keypath,
					value: value || null,
					formatters: formatters || null,
					raw: this.contentNodeValue.slice(at, this.at)
				};
			}
		}

		this.at = at;
		this.chr = this.contentNodeValue.charAt(at);

		return null;
	}

	_readPrefix(): string | null {
		let chr = this.chr;

		if (chr == '=') {
			this._next();
			return '=';
		}

		if (chr == '<') {
			let at = this.at;

			if (this.contentNodeValue.charAt(at + 1) == '-') {
				if (this.contentNodeValue.charAt(at + 2) == '>') {
					this.chr = this.contentNodeValue.charAt((this.at = at + 3));
					return '<->';
				}

				this.chr = this.contentNodeValue.charAt((this.at = at + 2));
				return '<-';
			}
		} else if (chr == '-' && this.contentNodeValue.charAt(this.at + 1) == '>') {
			this.chr = this.contentNodeValue.charAt((this.at += 2));
			return '->';
		}

		return null;
	}

	_readFormatter(): IContentNodeValueBindingFormatter | null {
		let at = this.at;

		this._next('|');
		this._skipWhitespaces();

		let name = this._readName();

		if (name) {
			let args = this.chr == '(' ? this._readFormatterArguments() : null;

			return {
				nodeType: ContentNodeValueNodeType.BINDING_FORMATTER,
				name,
				arguments: args
			};
		}

		this.at = at;
		this.chr = this.contentNodeValue.charAt(at);

		return null;
	}

	_readFormatterArguments(): IContentNodeValueBindingFormatterArguments | null {
		let at = this.at;

		this._next('(');

		let args: Array<string> = [];

		if (this._skipWhitespaces() != ')') {
			for (;;) {
				let arg = this._readValue() || this._readKeypath(true);

				if (arg) {
					if (this._skipWhitespaces() == ',' || this.chr == ')') {
						args.push(arg);

						if (this.chr == ',') {
							this._next();
							this._skipWhitespaces();
							continue;
						}

						break;
					}
				}

				this.at = at;
				this.chr = this.contentNodeValue.charAt(at);

				return null;
			}
		}

		this._next();

		return {
			nodeType: ContentNodeValueNodeType.BINDING_FORMATTER_ARGUMENTS,
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
			let value = this[reader]();

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
			this.chr = this.contentNodeValue.charAt(at);

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
					this.chr = this.contentNodeValue.charAt(at);

					return null;
				}
			}
		}

		this._next();

		return arr + ']';
	}

	_readBoolean(): string | null {
		reBooleanOrNothing.lastIndex = this.at;
		let bool = reBooleanOrNothing.exec(this.contentNodeValue)![0];

		if (bool) {
			this.chr = this.contentNodeValue.charAt((this.at = reBooleanOrNothing.lastIndex));
			return bool;
		}

		return null;
	}

	_readNumber(): string | null {
		reNumberOrNothing.lastIndex = this.at;
		let num = reNumberOrNothing.exec(this.contentNodeValue)![0];

		if (num) {
			this.chr = this.contentNodeValue.charAt((this.at = reNumberOrNothing.lastIndex));
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
				contentNodeValue: this.contentNodeValue
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
				if (next == '\n' || next == '\r') {
					break;
				}

				str += next;
			}
		}

		this.at = at;
		this.chr = this.contentNodeValue.charAt(at);

		return null;
	}

	_readVacuum(): string | null {
		reVacuumOrNothing.lastIndex = this.at;
		let vacuum = reVacuumOrNothing.exec(this.contentNodeValue)![0];

		if (vacuum) {
			this.chr = this.contentNodeValue.charAt((this.at = reVacuumOrNothing.lastIndex));
			return vacuum;
		}

		return null;
	}

	_readKeypath(toJSExpression?: boolean): string | null {
		reKeypathOrNothing.lastIndex = this.at;
		let keypath = reKeypathOrNothing.exec(this.contentNodeValue)![0];

		if (keypath) {
			this.chr = this.contentNodeValue.charAt((this.at = reKeypathOrNothing.lastIndex));
			return toJSExpression ? keypathToJSExpression(keypath) : keypath;
		}

		return null;
	}

	_readName(): string | null {
		reNameOrNothing.lastIndex = this.at;
		let name = reNameOrNothing.exec(this.contentNodeValue)![0];

		if (name) {
			this.chr = this.contentNodeValue.charAt((this.at = reNameOrNothing.lastIndex));
			return name;
		}

		return null;
	}

	_skipWhitespaces(): string {
		let chr = this.chr;

		while (chr && reWhitespace.test(chr)) {
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
				contentNodeValue: this.contentNodeValue
			};
		}

		return (this.chr = this.contentNodeValue.charAt(++this.at));
	}
}
