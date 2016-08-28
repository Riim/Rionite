import namePattern from './namePattern';
import keypathPattern from './keypathPattern';
import ContentNodeType from './ContentNodeType';

let reNameOrEmpty = RegExp(namePattern + '|', 'g');
let reKeypathOrEmpty = RegExp(keypathPattern + '|', 'g');
let reBooleanOrEmpty = /false|true|/g;
let reNumberOrEmpty =
	/(?:[+-]\s*)?(?:0b[01]+|0[0-7]+|0x[0-9a-fA-F]+|(?:(?:0|[1-9]\d*)(?:\.\d+)?|\.\d+)(?:[eE][+-]?\d+)?|Infinity|NaN)|/g;
let reVacuumOrEmpty = /null|undefined|void 0|/g;

let NOT_VALUE_AND_NOT_KEYPATH = {};

export default function parseContent(content: string): Array<Object> {
	let at = 0;
	let chr;

	let result = [];

	for (let index; (index = content.indexOf('{', at)) > -1;) {
		pushText(content.slice(at, index));
		at = index;
		chr = content.charAt(at);

		let binding = readBinding();

		if (binding) {
			result.push(binding);
		} else {
			pushText(chr);
			next('{');
		}
	}

	pushText(content.slice(at));

	return result;

	function next(c) {
		if (c && c != chr) {
			throw {
				name: 'SyntaxError',
				message: `Expected "${ c }" instead of "${ chr }"`,
				at,
				content
			};
		}

		at++;
		chr = content.charAt(at);

		return chr;
	}

	function pushText(value) {
		if (value.length) {
			let resultLength = result.length;

			if (resultLength && result[resultLength - 1].type == ContentNodeType.TEXT) {
				result[resultLength - 1].value = result[resultLength - 1].raw += value;
			} else {
				result.push({
					type: ContentNodeType.TEXT,
					at,
					raw: value,
					value
				});
			}
		}
	}

	function readBinding() {
		let bindingAt = at;

		next('{');
		skipWhitespaces();

		let keypath = readBindingKeypath();

		if (keypath) {
			skipWhitespaces();

			let formatters = [];

			for (let formatter; chr == '|' && (formatter = readFormatter());) {
				formatters.push(formatter);
				skipWhitespaces();
			}

			if (chr == '}') {
				next();

				return {
					type: ContentNodeType.BINDING,
					at: bindingAt,
					raw: content.slice(bindingAt, at),
					keypath,
					formatters
				};
			}
		}

		at = bindingAt;
		chr = content.charAt(at);

		return null;
	}

	function readBindingKeypath() {
		reKeypathOrEmpty.lastIndex = at;
		let keypath = reKeypathOrEmpty.exec(content)[0];

		if (keypath) {
			let keypathAt = at;

			at += keypath.length;
			chr = content.charAt(at);

			return {
				type: ContentNodeType.BINDING_KEYPATH,
				at: keypathAt,
				raw: content.slice(keypathAt, at),
				value: keypath
			};
		}

		return null;
	}

	function readFormatter() {
		let formatterAt = at;

		next('|');
		skipWhitespaces();

		reNameOrEmpty.lastIndex = at;
		let name = reNameOrEmpty.exec(content)[0];

		if (name) {
			at += name.length;
			chr = content.charAt(at);

			let args = chr == '(' ? readFormatterArguments() : null;

			return {
				type: ContentNodeType.BINDING_FORMATTER,
				at: formatterAt,
				raw: content.slice(formatterAt, at),
				name,
				arguments: args
			};
		}

		at = formatterAt;
		chr = content.charAt(at);

		return null;
	}

	function readFormatterArguments() {
		let formatterArgumentsAt = at;

		next('(');
		skipWhitespaces();

		let args = [];

		if (chr != ')') {
			for (;;) {
				let arg = readValueOrValueKeypath();

				if (arg !== NOT_VALUE_AND_NOT_KEYPATH) {
					skipWhitespaces();

					if (chr == ',' || chr == ')') {
						args.push(arg);

						if (chr == ',') {
							next();
							skipWhitespaces();
							continue;
						}

						break;
					}
				}

				at = formatterArgumentsAt;
				chr = content.charAt(at);

				return null;
			}
		}

		next();

		return {
			type: ContentNodeType.BINDING_FORMATTER_ARGUMENTS,
			at: formatterArgumentsAt,
			raw: content.slice(formatterArgumentsAt, at),
			value: args
		};
	}

	function readValueOrValueKeypath() {
		let value = readValue();
		return value === NOT_VALUE_AND_NOT_KEYPATH ? readValueKeypath() : value;
	}

	function readValue() {
		switch (chr) {
			case '{': {
				return readObject();
			}
			case '[': {
				return readArray();
			}
			case "'":
			case '"': {
				return readString();
			}
		}

		let readers = [readBoolean, readNumber, readVacuum];

		for (let i = 0, l = readers.length; i < l; i++) {
			let value = readers[i]();

			if (value !== NOT_VALUE_AND_NOT_KEYPATH) {
				return value;
			}
		}

		return NOT_VALUE_AND_NOT_KEYPATH;
	}

	function readObject() {
		let objectAt = at;

		next('{');
		skipWhitespaces();

		for (; chr != '}';) {
			if (chr == "'" || chr == '"' ? readString() !== NOT_VALUE_AND_NOT_KEYPATH : readObjectKey() !== null) {
				skipWhitespaces();

				if (chr == ':') {
					next();
					skipWhitespaces();

					if (readValueOrValueKeypath() !== NOT_VALUE_AND_NOT_KEYPATH) {
						skipWhitespaces();

						if (chr == ',') {
							next();
							skipWhitespaces();
							continue;
						} else if (chr == '}') {
							break;
						}
					}
				}
			}

			at = objectAt;
			chr = content.charAt(at);

			return NOT_VALUE_AND_NOT_KEYPATH;
		}

		next();

		return content.slice(objectAt, at);
	}

	function readObjectKey() {
		reNameOrEmpty.lastIndex = at;
		let key = reNameOrEmpty.exec(content)[0];

		if (key != '') {
			at += key.length;
			chr = content.charAt(at);
			return key;
		}

		return null;
	}

	function readArray() {
		let arrayAt = at;

		next('[');
		skipWhitespaces();

		for (; chr != ']';) {
			if (chr == ',') {
				next();
			} else if (readValueOrValueKeypath() === NOT_VALUE_AND_NOT_KEYPATH) {
				at = arrayAt;
				chr = content.charAt(at);

				return NOT_VALUE_AND_NOT_KEYPATH;
			}

			skipWhitespaces();
		}

		next();

		return content.slice(arrayAt, at);
	}

	function readBoolean() {
		reBooleanOrEmpty.lastIndex = at;
		let bool = reBooleanOrEmpty.exec(content)[0];

		if (bool != '') {
			at += bool.length;
			chr = content.charAt(at);
			return bool;
		}

		return NOT_VALUE_AND_NOT_KEYPATH;
	}

	function readNumber() {
		reNumberOrEmpty.lastIndex = at;
		let num = reNumberOrEmpty.exec(content)[0];

		if (num != '') {
			at += num.length;
			chr = content.charAt(at);
			return num;
		}

		return NOT_VALUE_AND_NOT_KEYPATH;
	}

	function readString() {
		if (chr != "'" && chr != '"') {
			throw {
				name: 'SyntaxError',
				message: `Expected "'" or '"' instead of "${ chr }"`,
				at,
				content
			};
		}

		let stringAt = at;
		let quote = chr;
		let str = '';

		while (next()) {
			if (chr == quote) {
				next();
				return str;
			}

			if (chr == '\\') {
				str += chr + (next() || '');
			} else {
				if (chr == '\r' || chr == '\n') {
					at = stringAt;
					chr = content.charAt(at);
					return NOT_VALUE_AND_NOT_KEYPATH;
				}

				str += chr;
			}
		}
	}

	function readVacuum() {
		reVacuumOrEmpty.lastIndex = at;
		let vacuum = reVacuumOrEmpty.exec(content)[0];

		if (vacuum != '') {
			at += vacuum.length;
			chr = content.charAt(at);
			return vacuum == 'null' ? null : void 0;
		}

		return NOT_VALUE_AND_NOT_KEYPATH;
	}

	function readValueKeypath() {
		let keypathAt = at;

		if (content.slice(at, at + 4) != 'this') {
			return NOT_VALUE_AND_NOT_KEYPATH;
		}

		at += 4;
		chr = content.charAt(at);

		for (;;) {
			if (chr == '.') {
				next();

				reNameOrEmpty.lastIndex = at;
				let name = reNameOrEmpty.exec(content)[0];

				if (!name) {
					break;
				}

				at += name.length;
				chr = content.charAt(at);
			} else if (chr == '[') {
				next();

				if (
					(
						(chr == "'" || chr == '"') ? readString() === NOT_VALUE_AND_NOT_KEYPATH :
							readNumber() === NOT_VALUE_AND_NOT_KEYPATH &&
							readValueKeypath() === NOT_VALUE_AND_NOT_KEYPATH
					) || chr != ']'
				) {
					break;
				}

				next();
			} else {
				return content.slice(keypathAt, at);
			}
		}

		at = keypathAt;
		chr = content.charAt(at);

		return NOT_VALUE_AND_NOT_KEYPATH;
	}

	function skipWhitespaces() {
		while (chr && chr <= ' ') {
			next();
		}
	}
}
