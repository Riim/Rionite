import { Utils } from 'cellx';
import namePattern from './namePattern';
import keypathPattern from './keypathPattern';
import keypathToJSExpression from './keypathToJSExpression';
import ContentNodeType from './ContentNodeType';

let reNameOrNothing = RegExp(namePattern + '|', 'g');
let reKeypathOrNothing = RegExp(keypathPattern + '|', 'g');
let reBooleanOrNothing = /false|true|/g;
let reNumberOrNothing =
	/(?:[+-]\s*)?(?:0b[01]+|0[0-7]+|0x[0-9a-fA-F]+|(?:(?:0|[1-9]\d*)(?:\.\d+)?|\.\d+)(?:[eE][+-]?\d+)?|Infinity|NaN)|/g;
let reVacuumOrNothing = /null|undefined|void 0|/g;

let NOT_VALUE_AND_NOT_KEYPATH = {};

export default Utils.createClass({
	constructor: function ContentParser(content: string) {
		this.content = content;
	},

	parse(): Array<Object> {
		this.at = 0;

		let result = this.result = [];

		for (let index; (index = this.content.indexOf('{', this.at)) > -1;) {
			this.pushText(this.content.slice(this.at, index));

			this.at = index;
			this.chr = this.content.charAt(index);

			let binding = this.readBinding();

			if (binding) {
				result.push(binding);
			} else {
				this.pushText(this.chr);
				this.next('{');
			}
		}

		this.pushText(this.content.slice(this.at));

		return result;
	},

	pushText(value: string): void {
		if (value.length) {
			let result = this.result;
			let resultLen = result.length;

			if (resultLen && result[resultLen - 1].type == ContentNodeType.TEXT) {
				result[resultLen - 1].value = result[resultLen - 1].raw += value;
			} else {
				result.push({
					type: ContentNodeType.TEXT,
					at: this.at,
					raw: value,
					value
				});
			}
		}
	},

	readBinding() {
		let bindingAt = this.at;

		this.next('{');
		this.skipWhitespaces();

		let keypath = this.readBindingKeypath();

		if (keypath) {
			let formatters = [];

			for (let formatter; this.skipWhitespaces() == '|' && (formatter = this.readFormatter());) {
				formatters.push(formatter);
			}

			if (this.chr == '}') {
				this.next();

				return {
					type: ContentNodeType.BINDING,
					at: bindingAt,
					raw: this.content.slice(bindingAt, this.at),
					keypath,
					formatters
				};
			}
		}

		this.at = bindingAt;
		this.chr = this.content.charAt(bindingAt);

		return null;
	},

	readBindingKeypath() {
		reKeypathOrNothing.lastIndex = this.at;
		let keypath = reKeypathOrNothing.exec(this.content)[0];

		if (keypath) {
			let keypathAt = this.at;

			this.chr = this.content.charAt((this.at += keypath.length));

			return {
				type: ContentNodeType.BINDING_KEYPATH,
				at: keypathAt,
				raw: this.content.slice(keypathAt, this.at),
				value: keypath
			};
		}

		return null;
	},

	readFormatter() {
		let formatterAt = this.at;

		this.next('|');
		this.skipWhitespaces();

		reNameOrNothing.lastIndex = this.at;
		let name = reNameOrNothing.exec(this.content)[0];

		if (name) {
			let args = (this.chr = this.content.charAt((this.at += name.length))) == '(' ?
				this.readFormatterArguments() :
				null;

			return {
				type: ContentNodeType.BINDING_FORMATTER,
				at: formatterAt,
				raw: this.content.slice(formatterAt, this.at),
				name,
				arguments: args
			};
		}

		this.at = formatterAt;
		this.chr = this.content.charAt(formatterAt);

		return null;
	},

	readFormatterArguments() {
		let formatterArgumentsAt = this.at;
		let args = [];

		this.next('(');

		if (this.skipWhitespaces() != ')') {
			for (;;) {
				let arg = this.readValueOrValueKeypath();

				if (arg !== NOT_VALUE_AND_NOT_KEYPATH) {
					if (this.skipWhitespaces() == ',' || this.chr == ')') {
						args.push(arg);

						if (this.chr == ',') {
							this.next();
							this.skipWhitespaces();
							continue;
						}

						break;
					}
				}

				this.at = formatterArgumentsAt;
				this.chr = this.content.charAt(formatterArgumentsAt);

				return null;
			}
		}

		this.next();

		return {
			type: ContentNodeType.BINDING_FORMATTER_ARGUMENTS,
			at: formatterArgumentsAt,
			raw: this.content.slice(formatterArgumentsAt, this.at),
			value: args
		};
	},

	readValueOrValueKeypath() {
		let value = this.readValue();
		return value === NOT_VALUE_AND_NOT_KEYPATH ? this.readValueKeypath() : value;
	},

	readValue() {
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

		for (let i = 0, l = readers.length; i < l; i++) {
			let value = this[readers[i]]();

			if (value !== NOT_VALUE_AND_NOT_KEYPATH) {
				return value;
			}
		}

		return NOT_VALUE_AND_NOT_KEYPATH;
	},

	readObject() {
		let objectAt = this.at;

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

			this.at = objectAt;
			this.chr = this.content.charAt(objectAt);

			return NOT_VALUE_AND_NOT_KEYPATH;
		}

		this.next();

		return obj;
	},

	readObjectKey() {
		reNameOrNothing.lastIndex = this.at;
		let key = reNameOrNothing.exec(this.content)[0];

		if (key) {
			this.chr = this.content.charAt((this.at += key.length));
			return key;
		}

		return null;
	},

	readArray() {
		let arrayAt = this.at;

		this.next('[');

		let arr = '[';

		while (this.skipWhitespaces() != ']') {
			if (this.chr == ',') {
				arr += ',';
				this.next();
			} else {
				let v = this.readValueOrValueKeypath();

				if (v === NOT_VALUE_AND_NOT_KEYPATH) {
					this.at = arrayAt;
					this.chr = this.content.charAt(arrayAt);

					return NOT_VALUE_AND_NOT_KEYPATH;
				} else {
					arr += v;
				}
			}
		}

		this.next();

		return arr + ']';
	},

	readBoolean() {
		reBooleanOrNothing.lastIndex = this.at;
		let bool = reBooleanOrNothing.exec(this.content)[0];

		if (bool) {
			this.chr = this.content.charAt((this.at += bool.length));
			return bool;
		}

		return NOT_VALUE_AND_NOT_KEYPATH;
	},

	readNumber() {
		reNumberOrNothing.lastIndex = this.at;
		let num = reNumberOrNothing.exec(this.content)[0];

		if (num) {
			this.chr = this.content.charAt((this.at += num.length));
			return num;
		}

		return NOT_VALUE_AND_NOT_KEYPATH;
	},

	readString() {
		if (this.chr != "'" && this.chr != '"') {
			throw {
				name: 'SyntaxError',
				message: `Expected "'" or '"' instead of "${ this.chr }"`,
				at: this.at,
				content: this.content
			};
		}

		let stringAt = this.at;

		let quote = this.chr;
		let str = '';

		while (this.next()) {
			if (this.chr == quote) {
				this.next();
				return quote + str + quote;
			}

			if (this.chr == '\\') {
				str += this.chr + this.next();
			} else {
				if (this.chr == '\r' || this.chr == '\n') {
					break;
				}

				str += this.chr;
			}
		}

		this.at = stringAt;
		this.chr = this.content.charAt(stringAt);

		return NOT_VALUE_AND_NOT_KEYPATH;
	},

	readVacuum() {
		reVacuumOrNothing.lastIndex = this.at;
		let vacuum = reVacuumOrNothing.exec(this.content)[0];

		if (vacuum) {
			this.chr = this.content.charAt((this.at += vacuum.length));
			return vacuum;
		}

		return NOT_VALUE_AND_NOT_KEYPATH;
	},

	readValueKeypath() {
		reKeypathOrNothing.lastIndex = this.at;
		let keypath = reKeypathOrNothing.exec(this.content)[0];

		if (keypath) {
			this.chr = this.content.charAt((this.at += keypath.length));
			return keypathToJSExpression(keypath);
		}

		return NOT_VALUE_AND_NOT_KEYPATH;
	},

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
	},

	skipWhitespaces() {
		let chr = this.chr;

		while (chr && chr <= ' ') {
			chr = this.next();
		}

		return chr;
	}
});
