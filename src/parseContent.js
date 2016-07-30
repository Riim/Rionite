let namePattern = require('./namePattern');
let keypathPattern = require('./keypathPattern');
let ContentNodeType = require('./ContentNodeType');

let reNameOrEmpty = RegExp(namePattern + '|', 'g');
let reKeypathOrEmpty = RegExp(keypathPattern + '|', 'g');
let reBooleanOrEmpty = /false|true|/g;
let reDecimalOrEmpty = /-?(?:\s*(?:(?:0|[1-9]\d*)(?:\.\d+)?|\.\d+)(?:[eE][+-]?\d+)?|Infinity|NaN)|/g;
let reVacuumOrEmpty = /null|undefined|void 0|/g;

let NOT_VALUE = {};

function parseContent(content: string): Array<Object> {
	let at = 0;
	let chr = content[0];

	let result = [];

	for (let index; (index = content.indexOf('{', at)) > -1;) {
		pushText(content.slice(at, index));
		at = index;
		chr = content[at];

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

		chr = content[++at];
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

		let keypath = readKeypath();

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
		chr = content[at];

		return null;
	}

	function readKeypath() {
		reKeypathOrEmpty.lastIndex = at;
		let keypath = reKeypathOrEmpty.exec(content)[0];

		if (keypath) {
			let keypathAt = at;

			at += keypath.length;
			chr = content[at];

			return {
				type: ContentNodeType.KEYPATH,
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
			chr = content[at];

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
		chr = content[at];

		return null;
	}

	function readFormatterArguments() {
		let formatterArgumentsAt = at;

		next('(');
		skipWhitespaces();

		let args = [];

		if (chr != ')') {
			for (;;) {
				let arg = readValue();

				if (arg !== NOT_VALUE) {
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
				chr = content[at];
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

		let readers = [readBoolean, readDecimal, readVacuum];

		for (let i = 0, l = readers.length; i < l; i++) {
			let value = readers[i]();

			if (value !== NOT_VALUE) {
				return value;
			}
		}

		return NOT_VALUE;
	}

	function readObject() {
		let objectAt = at;

		next('{');
		skipWhitespaces();

		let obj = {};

		if (chr != '}') {
			for (;;) {
				let key = chr == "'" || chr == '"' ? readString() : readObjectKey();

				if (key !== null && key !== NOT_VALUE) {
					skipWhitespaces();

					if (chr == ':') {
						next();
						skipWhitespaces();

						let value = readValue();

						if (value !== NOT_VALUE) {
							skipWhitespaces();

							if (chr == ',' || chr == '}') {
								obj[key] = value;

								if (chr == ',') {
									next();
									skipWhitespaces();
									continue;
								}

								break;
							}
						}
					}
				}

				at = objectAt;
				chr = content[at];
				return NOT_VALUE;
			}
		}

		next();

		return obj;
	}

	function readObjectKey() {
		reNameOrEmpty.lastIndex = at;
		let key = reNameOrEmpty.exec(content)[0];

		if (key != '') {
			at += key.length;
			chr = content[at];
			return key;
		}

		return null;
	}

	function readArray() {
		let arrayAt = at;

		next('[');
		skipWhitespaces();

		let arr = [];

		if (chr != ']') {
			for (;;) {
				let value = readValue();

				if (value !== NOT_VALUE) {
					skipWhitespaces();

					if (chr == ',' || chr == ']') {
						arr.push(value);

						if (chr == ',') {
							next();
							skipWhitespaces();
							continue;
						}

						break;
					}
				}

				at = arrayAt;
				chr = content[at];
				return NOT_VALUE;
			}
		}

		next();

		return arr;
	}

	function readBoolean() {
		reBooleanOrEmpty.lastIndex = at;
		let bool = reBooleanOrEmpty.exec(content)[0];

		if (bool != '') {
			at += bool.length;
			chr = content[at];
			return bool == 'true';
		}

		return NOT_VALUE;
	}

	function readDecimal() {
		reDecimalOrEmpty.lastIndex = at;
		let decimal = reDecimalOrEmpty.exec(content)[0];

		if (decimal != '') {
			at += decimal.length;
			chr = content[at];
			return +decimal;
		}

		return NOT_VALUE;
	}

	function readString() {
		if (chr != "'" && chr != '"') {
			next("'");
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
					chr = content[at];
					return NOT_VALUE;
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
			chr = content[at];
			return vacuum == 'null' ? null : void 0;
		}

		return NOT_VALUE;
	}

	function skipWhitespaces() {
		while (chr && chr <= ' ') {
			next();
		}
	}
}

module.exports = parseContent;
