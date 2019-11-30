const namePattern = '[$_a-zA-Z][$\\w]*';
const keypathPattern = `(?:${namePattern}|\\d+)(?:\\.(?:${namePattern}|\\d+))*`;

const cache = new Map<string, string>();

export function keypathToJSExpression(keypath: string, cacheKey?: string): string;
export function keypathToJSExpression(keypath: string | Array<string>, cacheKey: string): string;
export function keypathToJSExpression(
	keypath: string | Array<string>,
	cacheKey: string = keypath as any
): string {
	if (!cache.has(cacheKey)) {
		let keys = typeof keypath == 'string' ? keypath.split('.') : keypath;
		let keyCount = keys.length;

		if (keyCount == 1) {
			cache.set(cacheKey, `this['${keypath}']`);
		} else {
			let index = keyCount - 2;
			let fragments = Array(index);

			while (index) {
				fragments[--index] = ` && (tmp = tmp['${keys[index + 1]}'])`;
			}

			cache.set(
				cacheKey,
				`(tmp = this['${keys[0]}'])${fragments.join('')} && tmp['${keys[keyCount - 1]}']`
			);
		}
	}

	return cache.get(cacheKey)!;
}

export enum TemplateNodeValueNodeType {
	TEXT = 1,
	BINDING,
	BINDING_KEYPATH,
	BINDING_FORMATTER
}

export interface ITemplateNodeValueNode {
	nodeType: TemplateNodeValueNodeType;
}

export interface ITemplateNodeValueText extends ITemplateNodeValueNode {
	nodeType: TemplateNodeValueNodeType.TEXT;
	value: string;
}

export interface ITemplateNodeValueBindingFormatter extends ITemplateNodeValueNode {
	nodeType: TemplateNodeValueNodeType.BINDING_FORMATTER;
	name: string;
	arguments: Array<string> | null;
}

export interface ITemplateNodeValueBinding extends ITemplateNodeValueNode {
	nodeType: TemplateNodeValueNodeType.BINDING;
	prefix: string | null;
	keypath: string | null;
	value: string | null;
	formatters: Array<ITemplateNodeValueBindingFormatter> | null;
	raw: string;
}

export type TTemplateNodeValue = Array<ITemplateNodeValueText | ITemplateNodeValueBinding>;

const reWhitespace = /\s/;

const reName = RegExp(namePattern, 'gy');
const reKeypath = RegExp(keypathPattern, 'gy');
const reBoolean = /false|true/gy;
const reNumber = /(?:[+-]\s*)?(?:0b[01]+|0[0-7]+|0x[0-9a-fA-F]+|(?:(?:0|[1-9]\d*)(?:\.\d+)?|\.\d+)(?:[eE][+-]?\d+)?|Infinity|NaN)/gy;
const reRegExpModifiers = /[gimyu]+/gy;
const reVacuum = /null|undefined|void 0/gy;

export class TemplateNodeValueParser {
	templateNodeValue: string;

	_pos: number;
	_chr: string;

	result: TTemplateNodeValue;

	constructor(templateNodeValue: string) {
		this.templateNodeValue = templateNodeValue;
	}

	parse(index: number): TTemplateNodeValue {
		let templateNodeValue = this.templateNodeValue;

		this._pos = 0;

		let result: TTemplateNodeValue = (this.result = []);

		do {
			this._pushText(templateNodeValue.slice(this._pos, index));

			this._pos = index;
			this._chr = templateNodeValue.charAt(index);

			let binding = this._readBinding();

			if (binding) {
				result.push(binding);
			} else {
				this._pushText(this._chr);
				this._next();
			}

			index = templateNodeValue.indexOf('{', this._pos);
		} while (index != -1);

		this._pushText(templateNodeValue.slice(this._pos));

		return result;
	}

	_pushText(value: string) {
		if (value) {
			let result = this.result;
			let resultLen = result.length;

			if (resultLen && result[resultLen - 1].nodeType == TemplateNodeValueNodeType.TEXT) {
				(result[resultLen - 1] as ITemplateNodeValueText).value += value;
			} else {
				result.push({
					nodeType: TemplateNodeValueNodeType.TEXT,
					value
				});
			}
		}
	}

	_readBinding(): ITemplateNodeValueBinding | null {
		let pos = this._pos;

		this._next(/* '{' */);
		this._skipWhitespaces();

		let prefix = this._readPrefix();

		this._skipWhitespaces();

		let keypath = this._readKeypath();
		let value: string | null | undefined;

		if (!prefix && !keypath) {
			value = this._readValue();
		}

		if (keypath || value) {
			let formatters: Array<ITemplateNodeValueBindingFormatter> | undefined;

			for (
				let formatter: ITemplateNodeValueBindingFormatter | null;
				this._skipWhitespaces() == '|' && (formatter = this._readFormatter());

			) {
				(formatters || (formatters = [])).push(formatter);
			}

			if (this._chr == '}') {
				this._next();

				return {
					nodeType: TemplateNodeValueNodeType.BINDING,
					prefix,
					keypath,
					value: value || null,
					formatters: formatters || null,
					raw: this.templateNodeValue.slice(pos, this._pos)
				};
			}
		}

		this._pos = pos;
		this._chr = this.templateNodeValue.charAt(pos);

		return null;
	}

	_readPrefix(): string | null {
		let chr = this._chr;

		if (chr == '=') {
			this._next();
			return '=';
		}

		if (chr == '<') {
			let pos = this._pos;

			if (this.templateNodeValue.charAt(pos + 1) == '-') {
				if (this.templateNodeValue.charAt(pos + 2) == '>') {
					this._chr = this.templateNodeValue.charAt((this._pos = pos + 3));
					return '<->';
				}

				this._chr = this.templateNodeValue.charAt((this._pos = pos + 2));
				return '<-';
			}
		} else if (chr == '-' && this.templateNodeValue.charAt(this._pos + 1) == '>') {
			this._chr = this.templateNodeValue.charAt((this._pos += 2));
			return '->';
		}

		return null;
	}

	_readFormatter(): ITemplateNodeValueBindingFormatter | null {
		let pos = this._pos;

		this._next(/* '|' */);
		this._skipWhitespaces();

		let name = this._readName();

		if (name) {
			return {
				nodeType: TemplateNodeValueNodeType.BINDING_FORMATTER,
				name,
				arguments: this._chr == '(' ? this._readFormatterArguments() : null
			};
		}

		this._pos = pos;
		this._chr = this.templateNodeValue.charAt(pos);

		return null;
	}

	_readFormatterArguments(): Array<string> | null {
		let pos = this._pos;

		this._next(/* '(' */);

		let args: Array<string> | undefined;

		if (this._skipWhitespaces() != ')') {
			for (;;) {
				let arg = this._readValue() || this._readKeypath(true);

				if (!(arg && (this._skipWhitespaces() == ',' || this._chr == ')'))) {
					this._pos = pos;
					this._chr = this.templateNodeValue.charAt(pos);

					return null;
				}

				(args || (args = [])).push(arg);

				if (this._chr == ')') {
					break;
				}

				this._next();
				this._skipWhitespaces();
			}
		}

		this._next();

		return args || null;
	}

	_readValue(): string | null {
		switch (this._chr) {
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
			case '/': {
				return this._readRegExp();
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
		let pos = this._pos;

		this._next(/* '{' */);

		let obj = '{';

		while (this._skipWhitespaces() != '}') {
			let key =
				this._chr == "'" || this._chr == '"' ? this._readString() : this._readObjectKey();

			if (key && this._skipWhitespaces() == ':') {
				this._next();
				this._skipWhitespaces();

				let valueOrKeypath = this._readValue() || this._readKeypath(true);

				if (valueOrKeypath) {
					if (this._skipWhitespaces() == ',') {
						obj += key + ':' + valueOrKeypath + ',';
						this._next();
						continue;
					} else if (this._chr == '}') {
						obj += key + ':' + valueOrKeypath + '}';
						break;
					}
				}
			}

			this._pos = pos;
			this._chr = this.templateNodeValue.charAt(pos);

			return null;
		}

		this._next();

		return obj;
	}

	_readObjectKey(): string | null {
		return this._readName();
	}

	_readArray(): string | null {
		let pos = this._pos;

		this._next(/* '[' */);

		let arr = '[';

		while (this._skipWhitespaces() != ']') {
			if (this._chr == ',') {
				arr += ',';
				this._next();
			} else {
				let valueOrKeypath = this._readValue() || this._readKeypath(true);

				if (valueOrKeypath) {
					arr += valueOrKeypath;
				} else {
					this._pos = pos;
					this._chr = this.templateNodeValue.charAt(pos);

					return null;
				}
			}
		}

		this._next();

		return arr + ']';
	}

	_readBoolean(): string | null {
		reBoolean.lastIndex = this._pos;
		let match = reBoolean.exec(this.templateNodeValue);

		if (match) {
			this._chr = this.templateNodeValue.charAt((this._pos = reBoolean.lastIndex));
			return match[0];
		}

		return null;
	}

	_readNumber(): string | null {
		reNumber.lastIndex = this._pos;
		let match = reNumber.exec(this.templateNodeValue);

		if (match) {
			this._chr = this.templateNodeValue.charAt((this._pos = reNumber.lastIndex));
			return match[0];
		}

		return null;
	}

	_readString(): string | null {
		let pos = this._pos;
		let quoteChar = this._chr;
		let str = '';

		for (let next /* = this._next(quoteChar == '"' ? null : "'") */; (next = this._next()); ) {
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

		this._pos = pos;
		this._chr = this.templateNodeValue.charAt(pos);

		return null;
	}

	_readRegExp(): string | null {
		let pos = this._pos;
		let next = this._next(/* '/' */);
		let regex = '';

		while (next) {
			if (next == '/') {
				if (!regex) {
					break;
				}

				this._next();

				reRegExpModifiers.lastIndex = this._pos;
				let match = reRegExpModifiers.exec(this.templateNodeValue);

				if (match) {
					this._chr = this.templateNodeValue.charAt(
						(this._pos = reRegExpModifiers.lastIndex)
					);
					return '/' + regex + '/' + match[0];
				}

				return '/' + regex + '/';
			}

			if (next == '\\') {
				regex += next + this._next();
			} else {
				if (next == '\n' || next == '\r') {
					break;
				}

				regex += next;
			}

			next = this._next();
		}

		this._pos = pos;
		this._chr = this.templateNodeValue.charAt(pos);

		return null;
	}

	_readVacuum(): string | null {
		reVacuum.lastIndex = this._pos;
		let match = reVacuum.exec(this.templateNodeValue);

		if (match) {
			this._chr = this.templateNodeValue.charAt((this._pos = reVacuum.lastIndex));
			return match[0];
		}

		return null;
	}

	_readKeypath(toJSExpression?: boolean): string | null {
		reKeypath.lastIndex = this._pos;
		let match = reKeypath.exec(this.templateNodeValue);

		if (match) {
			this._chr = this.templateNodeValue.charAt((this._pos = reKeypath.lastIndex));
			return toJSExpression ? keypathToJSExpression(match[0]) : match[0];
		}

		return null;
	}

	_readName(): string | null {
		reName.lastIndex = this._pos;
		let match = reName.exec(this.templateNodeValue);

		if (match) {
			this._chr = this.templateNodeValue.charAt((this._pos = reName.lastIndex));
			return match[0];
		}

		return null;
	}

	_skipWhitespaces(): string {
		let chr = this._chr;

		while (chr && reWhitespace.test(chr)) {
			chr = this._next();
		}

		return chr;
	}

	_next(/* current?: string | null */): string {
		// if (current != null && current != this._chr) {
		// 	throw {
		// 		name: 'SyntaxError',
		// 		message: `Expected "${current}" instead of "${this._chr}"`,
		// 		pos: this._pos,
		// 		templateNodeValue: this.templateNodeValue
		// 	};
		// }

		return (this._chr = this.templateNodeValue.charAt(++this._pos));
	}
}
