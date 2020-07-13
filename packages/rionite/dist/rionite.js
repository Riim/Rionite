(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('cellx'), require('@riim/next-uid')) :
	typeof define === 'function' && define.amd ? define(['exports', 'cellx', '@riim/next-uid'], factory) :
	(global = global || self, factory(global.rionite = {}, global.cellx, global['@riim/next-uid']));
}(this, (function (exports, cellx, nextUid) { 'use strict';

	if (!('firstElementChild' in DocumentFragment.prototype)) {
	    Object.defineProperty(DocumentFragment.prototype, 'firstElementChild', {
	        configurable: true,
	        enumerable: false,
	        get() {
	            for (let child = this.firstChild; child; child = child.nextSibling) {
	                if (child.nodeType == Node.ELEMENT_NODE) {
	                    return child;
	                }
	            }
	            return null;
	        }
	    });
	}
	if (!('nextElementSibling' in DocumentFragment.prototype)) {
	    Object.defineProperty(DocumentFragment.prototype, 'nextElementSibling', {
	        configurable: true,
	        enumerable: false,
	        get() {
	            for (let child = this.nextSibling; child; child = child.nextSibling) {
	                if (child.nodeType == Node.ELEMENT_NODE) {
	                    return child;
	                }
	            }
	            return null;
	        }
	    });
	}

	function unwrapExports (x) {
		return x && x.__esModule && Object.prototype.hasOwnProperty.call(x, 'default') ? x['default'] : x;
	}

	function createCommonjsModule(fn, module) {
		return module = { exports: {} }, fn(module, module.exports), module.exports;
	}

	var dist = createCommonjsModule(function (module, exports) {
	Object.defineProperty(exports, "__esModule", { value: true });
	var reHeadTail = /-?([A-Z])([^A-Z])/g;
	var reLongHead = /-?([A-Z]+)/g;
	var reDash = /^-/;
	var cache = Object.create(null);
	function kebabCase(str, useCache) {
	    str = String(str);
	    var value;
	    return ((useCache && cache[str]) ||
	        ((value = str
	            .replace(reHeadTail, function (match, head, tail) { return '-' + head.toLowerCase() + tail; })
	            .replace(reLongHead, function (match, head) { return '-' + head.toLowerCase(); })
	            .replace(reDash, '')),
	            useCache ? (cache[str] = value) : value));
	}
	exports.kebabCase = kebabCase;
	});

	unwrapExports(dist);
	var dist_1 = dist.kebabCase;

	var dist$1 = createCommonjsModule(function (module, exports) {
	Object.defineProperty(exports, "__esModule", { value: true });
	const reCamelCase = /^_?[a-z][0-9a-z]*$/i;
	const reLetters = /[A-Z][^A-Z]/g;
	const reLetters2 = /[A-Z]{2,}/g;
	const cache = new Map();
	function snakeCaseAttributeName(str, useCache) {
	    let value;
	    return ((useCache && cache.get(str)) ||
	        ((value = reCamelCase.test(str)
	            ? str
	                .replace(reLetters, word => '_' + word)
	                .replace(reLetters2, word => '_' + word)
	                .toLowerCase()
	            : str),
	            useCache && cache.set(str, value),
	            value));
	}
	exports.snakeCaseAttributeName = snakeCaseAttributeName;
	});

	unwrapExports(dist$1);
	var dist_1$1 = dist$1.snakeCaseAttributeName;

	var dist$2 = createCommonjsModule(function (module, exports) {
	Object.defineProperty(exports, "__esModule", { value: true });
	var NodeType;
	(function (NodeType) {
	    NodeType[NodeType["ELEMENT"] = 1] = "ELEMENT";
	    NodeType[NodeType["ELEMENT_ATTRIBUTE"] = 2] = "ELEMENT_ATTRIBUTE";
	    NodeType[NodeType["TEXT"] = 3] = "TEXT";
	    NodeType[NodeType["SUPER_CALL"] = 4] = "SUPER_CALL";
	    NodeType[NodeType["DEBUGGER_CALL"] = 5] = "DEBUGGER_CALL";
	})(NodeType = exports.NodeType || (exports.NodeType = {}));
	const escapee = new Map([
	    ['/', '/'],
	    ['\\', '\\'],
	    ['b', '\b'],
	    ['f', '\f'],
	    ['n', '\n'],
	    ['r', '\r'],
	    ['t', '\t']
	]);
	const reWhitespace = /\s/;
	const reLineBreak = /\n|\r\n?/g;
	const reTagName = /[a-zA-Z][\-\w]*/gy;
	const reElementName = /[a-zA-Z][\-\w]*/gy;
	const reAttributeName = /[^\s'">/=,)]+/gy;
	const reSuperCall = /super(?:\.([a-zA-Z][\-\w]*))?!/gy;
	const reTrimStartLine = /^[\x20\t]+/gm;
	const reTrimEndLine = /[\x20\t]+$/gm;
	function normalizeMultilineText(text) {
	    return text.replace(reTrimStartLine, '').replace(reTrimEndLine, '');
	}
	class TemplateParser {
	    constructor(template) {
	        this.template = template;
	    }
	    parse() {
	        this._pos = 0;
	        this._chr = this.template.charAt(0);
	        this._skipWhitespacesAndComments();
	        return this._readContent(false);
	    }
	    _readContent(brackets) {
	        if (brackets) {
	            this._next( /* '{' */);
	            this._skipWhitespacesAndComments();
	        }
	        let content = [];
	        for (;;) {
	            switch (this._chr) {
	                case "'":
	                case '"':
	                case '`': {
	                    content.push([NodeType.TEXT, this._readString()]);
	                    break;
	                }
	                case '': {
	                    if (brackets) {
	                        this._throwError('Unexpected end of template. Expected "}" to close block.');
	                    }
	                    return content;
	                }
	                default: {
	                    let chr = this._chr;
	                    if (chr == 'd' && this.template.substr(this._pos, 9) == 'debugger!') {
	                        this._chr = this.template.charAt((this._pos += 9));
	                        content.push([NodeType.DEBUGGER_CALL]);
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
	            this._skipWhitespacesAndComments();
	        }
	    }
	    _readElement(targetContent) {
	        let pos = this._pos;
	        let isTransformer = this._chr == '@';
	        if (isTransformer) {
	            this._next();
	        }
	        let tagName = this._readName(reTagName);
	        this._skipWhitespacesAndComments();
	        let elNames;
	        if (this._chr == ':') {
	            this._next();
	            let pos = this._pos;
	            this._skipWhitespacesAndComments();
	            if (this._chr == ':') {
	                elNames = [undefined];
	                this._next();
	                this._skipWhitespacesAndComments();
	            }
	            for (let name; (name = this._readName(reElementName));) {
	                (elNames || (elNames = [])).push(name);
	                if (this._skipWhitespacesAndComments() != ':') {
	                    break;
	                }
	                this._next();
	                this._skipWhitespacesAndComments();
	            }
	            if (!elNames || (!elNames[0] && elNames.length == 1)) {
	                this._throwError('Expected element name', pos);
	            }
	        }
	        if (!tagName && !(elNames && elNames[0])) {
	            this._throwError('Expected element', pos);
	        }
	        let attrs;
	        if (this._chr == '(') {
	            attrs = this._readAttributes();
	            this._skipWhitespacesAndComments();
	        }
	        let content;
	        if (this._chr == '{') {
	            content = this._readContent(true);
	        }
	        targetContent.push([
	            NodeType.ELEMENT,
	            isTransformer ? 1 : undefined,
	            tagName || undefined,
	            elNames,
	            attrs,
	            content
	        ]);
	    }
	    _readAttributes() {
	        this._next( /* '(' */);
	        if (this._skipWhitespacesAndComments() == ')') {
	            this._next();
	            return [undefined, undefined];
	        }
	        let superCall;
	        let list;
	        loop: for (let f = true;; f = false) {
	            if (f && this._chr == 's' && (superCall = this._readSuperCall())) {
	                this._skipWhitespacesAndComments();
	            }
	            else {
	                let isTransformer = this._chr == '@';
	                if (isTransformer) {
	                    this._next();
	                }
	                let name = this._readName(reAttributeName);
	                if (!name) {
	                    throw this._throwError('Expected attribute name');
	                }
	                if (this._skipWhitespacesAndComments() == '=') {
	                    this._next();
	                    let chr = this._skipWhitespaces();
	                    if (chr == "'" || chr == '"' || chr == '`') {
	                        (list || (list = [])).push([
	                            isTransformer ? 1 : undefined,
	                            name,
	                            this._readString()
	                        ]);
	                        this._skipWhitespacesAndComments();
	                    }
	                    else {
	                        let value = '';
	                        for (;;) {
	                            if (!chr) {
	                                this._throwError('Unexpected end of template. Expected "," or ")" to finalize attribute value.');
	                            }
	                            if (chr == ',' || chr == ')' || chr == '\n' || chr == '\r') {
	                                (list || (list = [])).push([
	                                    isTransformer ? 1 : undefined,
	                                    name,
	                                    value.trim()
	                                ]);
	                                if (chr == '\n' || chr == '\r') {
	                                    this._skipWhitespacesAndComments();
	                                }
	                                break;
	                            }
	                            value += chr;
	                            chr = this._next();
	                        }
	                    }
	                }
	                else {
	                    (list || (list = [])).push([isTransformer ? 1 : undefined, name, '']);
	                }
	            }
	            switch (this._chr) {
	                case ')': {
	                    this._next();
	                    break loop;
	                }
	                case ',': {
	                    this._next();
	                    this._skipWhitespacesAndComments();
	                    break;
	                }
	                default: {
	                    this._throwError('Unexpected end of template. Expected "," or ")" to finalize attribute value.');
	                }
	            }
	        }
	        return [superCall ? superCall[1] || 1 : undefined, list];
	    }
	    _readSuperCall() {
	        reSuperCall.lastIndex = this._pos;
	        let match = reSuperCall.exec(this.template);
	        if (match) {
	            this._chr = this.template.charAt((this._pos = reSuperCall.lastIndex));
	            return [NodeType.SUPER_CALL, match[1]];
	        }
	        return null;
	    }
	    _readName(reName) {
	        reName.lastIndex = this._pos;
	        let match = reName.exec(this.template);
	        if (match) {
	            this._chr = this.template.charAt((this._pos = reName.lastIndex));
	            return match[0];
	        }
	        return null;
	    }
	    _readString() {
	        let quoteChar = this._chr;
	        // if (quoteChar != "'" && quoteChar != '"' && quoteChar != '`') {
	        // 	this._throwError('Expected string');
	        // }
	        let str = '';
	        for (let chr = this._next(); chr;) {
	            if (chr == quoteChar) {
	                this._next();
	                return quoteChar == '`' ? normalizeMultilineText(str) : str;
	            }
	            if (chr == '\\') {
	                chr = this._next();
	                if (chr == 'x' || chr == 'u') {
	                    let pos = this._pos + 1;
	                    let code = parseInt(this.template.slice(pos, pos + (chr == 'x' ? 2 : 4)), 16);
	                    if (!isFinite(code)) {
	                        this._throwError(`Invalid ${chr == 'x' ? 'hexadecimal' : 'unicode'} escape sequence`, pos);
	                    }
	                    str += String.fromCharCode(code);
	                    chr = this._chr = this.template.charAt((this._pos = pos + (chr == 'x' ? 2 : 4)));
	                }
	                else if (escapee.has(chr)) {
	                    str += escapee.get(chr);
	                    chr = this._next();
	                }
	                else {
	                    this._throwError('Invalid escape sequence', this._pos - 1);
	                }
	            }
	            else {
	                str += chr;
	                chr = this._next();
	            }
	        }
	        throw 1;
	    }
	    _skipWhitespaces() {
	        let chr = this._chr;
	        while (chr && reWhitespace.test(chr)) {
	            chr = this._next();
	        }
	        return chr;
	    }
	    _skipWhitespacesAndComments() {
	        let chr = this._chr;
	        loop1: for (;;) {
	            if (chr == '/') {
	                switch (this.template.charAt(this._pos + 1)) {
	                    case '/': {
	                        this._next();
	                        while ((chr = this._next()) && chr != '\n' && chr != '\r') { }
	                        break;
	                    }
	                    case '*': {
	                        let pos = this._pos;
	                        this._next();
	                        loop2: for (;;) {
	                            switch (this._next()) {
	                                case '*': {
	                                    if (this._next() == '/') {
	                                        chr = this._next();
	                                        break loop2;
	                                    }
	                                    break;
	                                }
	                                case '': {
	                                    this._throwError('Expected "*/" to close multiline comment', pos);
	                                }
	                            }
	                        }
	                        break;
	                    }
	                    default: {
	                        break loop1;
	                    }
	                }
	            }
	            else if (chr && reWhitespace.test(chr)) {
	                chr = this._next();
	            }
	            else {
	                break;
	            }
	        }
	        return chr;
	    }
	    _next( /* current?: string */) {
	        // if (current && current != this._chr) {
	        // 	this._throwError(`Expected "${current}" instead of "${this._chr}"`);
	        // }
	        return (this._chr = this.template.charAt(++this._pos));
	    }
	    _throwError(msg, pos = this._pos) {
	        let n = pos < 40 ? 40 - pos : 0;
	        throw SyntaxError(msg +
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
	            '↑');
	    }
	}
	exports.TemplateParser = TemplateParser;
	});

	unwrapExports(dist$2);
	var dist_1$2 = dist$2.NodeType;
	var dist_2 = dist$2.TemplateParser;

	var dist$3 = createCommonjsModule(function (module, exports) {
	Object.defineProperty(exports, "__esModule", { value: true });
	var reEscapableChars = /[\\'"\r\n]/g;
	var charToEscapedMap = Object.create(null);
	charToEscapedMap['\\'] = '\\\\';
	charToEscapedMap['\''] = '\\\'';
	charToEscapedMap['"'] = '\\"';
	charToEscapedMap['\r'] = '\\r';
	charToEscapedMap['\n'] = '\\n';
	function escapeString(str) {
	    return reEscapableChars.test(str) ? str.replace(reEscapableChars, function (chr) { return charToEscapedMap[chr]; }) : str;
	}
	exports.escapeString = escapeString;
	});

	unwrapExports(dist$3);
	var dist_1$3 = dist$3.escapeString;

	function formattersReducer(jsExpr, formatter) {
	    return `(this.${formatter.name} || formatters.${formatter.name}).call(this[KEY_COMPONENT_SELF], ${jsExpr}${formatter.arguments ? ', ' + formatter.arguments.join(', ') : ''})`;
	}
	function bindingToJSExpression(binding) {
	    let formatters = binding.formatters;
	    if (binding.keypath) {
	        let keys = binding.keypath.split('.');
	        let keyCount = keys.length;
	        if (keyCount == 1) {
	            return formatters
	                ? formatters.reduce(formattersReducer, `this['${keys[0]}']`)
	                : `this['${keys[0]}']`;
	        }
	        let index = keyCount - 2;
	        let fragments = Array(index);
	        while (index) {
	            fragments[--index] = ` && (tmp = tmp['${keys[index + 1]}'])`;
	        }
	        let jsExpr = `(tmp = this['${keys[0]}'])${fragments.join('')} && tmp['${keys[keyCount - 1]}']`;
	        return formatters ? formatters.reduce(formattersReducer, jsExpr) : jsExpr;
	    }
	    return formatters ? formatters.reduce(formattersReducer, binding.value) : binding.value;
	}

	var escapeHTML_1 = createCommonjsModule(function (module, exports) {
	Object.defineProperty(exports, "__esModule", { value: true });
	var reEscapableChars = /[&<>"]/g;
	var charToEscapedMap = Object.create(null);
	charToEscapedMap['&'] = '&amp;';
	charToEscapedMap['<'] = '&lt;';
	charToEscapedMap['>'] = '&gt;';
	charToEscapedMap['"'] = '&quot;';
	function escapeHTML(str) {
	    return (str
	        ? reEscapableChars.test(str)
	            ? str.replace(reEscapableChars, function (chr) { return charToEscapedMap[chr]; })
	            : str
	        : null);
	}
	exports.escapeHTML = escapeHTML;
	});

	unwrapExports(escapeHTML_1);
	var escapeHTML_2 = escapeHTML_1.escapeHTML;

	var unescapeHTML_1 = createCommonjsModule(function (module, exports) {
	Object.defineProperty(exports, "__esModule", { value: true });
	var reEscapableEntities = /&(?:amp|lt|gt|quot);/g;
	var escapedToCharMap = Object.create(null);
	escapedToCharMap['&amp;'] = '&';
	escapedToCharMap['&lt;'] = '<';
	escapedToCharMap['&gt;'] = '>';
	escapedToCharMap['&quot;'] = '"';
	function unescapeHTML(str) {
	    return (str
	        ? reEscapableEntities.test(str)
	            ? str.replace(reEscapableEntities, function (entity) { return escapedToCharMap[entity]; })
	            : str
	        : null);
	}
	exports.unescapeHTML = unescapeHTML;
	});

	unwrapExports(unescapeHTML_1);
	var unescapeHTML_2 = unescapeHTML_1.unescapeHTML;

	var dist$4 = createCommonjsModule(function (module, exports) {
	Object.defineProperty(exports, "__esModule", { value: true });

	exports.escapeHTML = escapeHTML_1.escapeHTML;

	exports.unescapeHTML = unescapeHTML_1.unescapeHTML;
	});

	unwrapExports(dist$4);
	var dist_1$4 = dist$4.escapeHTML;
	var dist_2$1 = dist$4.unescapeHTML;

	const KEY_COMPONENT_PARAM_VALUES = Symbol('componentParamValues');
	const componentParamValueСonverters = new Map([
	    [
	        Boolean,
	        {
	            toData: (rawValue, defaultValue) => {
	                return rawValue !== null ? rawValue != 'no' : !!defaultValue;
	            },
	            toString: (value, defaultValue) => {
	                return value ? '' : defaultValue ? 'no' : null;
	            }
	        }
	    ],
	    [
	        Number,
	        {
	            toData: (rawValue, defaultValue) => {
	                return rawValue !== null
	                    ? +rawValue
	                    : defaultValue !== undefined
	                        ? defaultValue
	                        : null;
	            },
	            toString: (value) => {
	                return value != null ? +value + '' : null;
	            }
	        }
	    ],
	    [
	        String,
	        {
	            toData: (rawValue, defaultValue) => {
	                return rawValue !== null
	                    ? rawValue
	                    : defaultValue !== undefined
	                        ? defaultValue
	                        : null;
	            },
	            toString: (value) => {
	                return value != null ? value + '' : null;
	            }
	        }
	    ],
	    [
	        Object,
	        {
	            toData: (rawValue, defaultValue, el) => {
	                if (rawValue) {
	                    let value = el[KEY_COMPONENT_PARAM_VALUES] &&
	                        el[KEY_COMPONENT_PARAM_VALUES].get(rawValue);
	                    if (!value) {
	                        throw TypeError('Value is not an object');
	                    }
	                    return value;
	                }
	                if (defaultValue == null) {
	                    return null;
	                }
	                if (typeof defaultValue == 'object' && defaultValue.clone) {
	                    return defaultValue.clone.length
	                        ? defaultValue.clone(true)
	                        : defaultValue.clone();
	                }
	                return defaultValue;
	            },
	            toString: null
	        }
	    ],
	    [
	        eval,
	        {
	            toData: (rawValue, defaultValue) => {
	                if (rawValue !== null) {
	                    return Function(`return ${dist_2$1(rawValue)};`)();
	                }
	                if (defaultValue == null) {
	                    return null;
	                }
	                if (defaultValue &&
	                    typeof defaultValue == 'object' &&
	                    defaultValue.clone) {
	                    return defaultValue.clone.length
	                        ? defaultValue.clone(true)
	                        : defaultValue.clone();
	                }
	                return defaultValue;
	            },
	            toString: null
	        }
	    ]
	]);

	const KEY_COMPONENT_SELF = Symbol('componentSelf');
	const KEY_PARAMS_CONFIG = Symbol('paramsConfig');
	const KEY_PARAM_VALUES = Symbol('paramValues');
	const KEY_CHILD_COMPONENTS = Symbol('childComponents');

	const config = {
	    logError: (...args) => {
	        console.error(...args);
	    },
	    getText: ((_msgctxt, msgid) => msgid)
	};
	function configure(options) {
	    Object.assign(config, options);
	    return config;
	}

	const formatters = {
	    default(value, defaultValue) {
	        return value === undefined ? defaultValue : value;
	    },
	    defaultFor(defaultValue, value) {
	        return value === undefined ? defaultValue : value;
	    },
	    placeholder(value, placeholderValue) {
	        return value === null ? placeholderValue : value;
	    },
	    and(value1, ...values) {
	        return values.reduce((result, valueN) => result && valueN, value1);
	    },
	    or(value1, ...values) {
	        return values.reduce((result, valueN) => result || valueN, value1);
	    },
	    cond(condition, value1, value2) {
	        return condition ? value1 : value2;
	    },
	    not(value) {
	        return !value;
	    },
	    bool(value) {
	        return !!value;
	    },
	    eq(value1, value2) {
	        return value1 == value2;
	    },
	    seq(value1, value2) {
	        return value1 === value2;
	    },
	    lt(value1, value2) {
	        return value1 < value2;
	    },
	    lte(value1, value2) {
	        return value1 <= value2;
	    },
	    gt(value1, value2) {
	        return value1 > value2;
	    },
	    gte(value1, value2) {
	        return value1 >= value2;
	    },
	    startsWith(str, searchString, pos) {
	        return (str || '').startsWith(searchString, pos);
	    },
	    endsWith(str, searchString, pos) {
	        return (str || '').endsWith(searchString, pos);
	    },
	    padStart(str, maxLength, fillString) {
	        return str && str.padStart(maxLength, fillString);
	    },
	    padEnd(str, maxLength, fillString) {
	        return str && str.padEnd(maxLength, fillString);
	    },
	    replace(str, searchValue, replaceValue) {
	        return str && str.replace(searchValue, replaceValue);
	    },
	    trim(str) {
	        return str && str.trim();
	    },
	    uid(target) {
	        return target && nextUid.getUID(target);
	    },
	    has(target, key) {
	        return !!target && target.has(key);
	    },
	    hasOwn(target, propName) {
	        return !!target && target.hasOwnProperty(propName);
	    },
	    get(target, key) {
	        return target && target.get(key);
	    },
	    key(target, key) {
	        return target && target[key];
	    },
	    prop(target, name) {
	        return target && target.map(item => item[name]);
	    },
	    contains(target, value) {
	        return (!!target && (Array.isArray(target) ? target.includes(value) : target.contains(value)));
	    },
	    join(target, separator = ', ') {
	        return target && target.join(separator);
	    },
	    dump(value) {
	        return value == null ? value : JSON.stringify(value);
	    },
	    t(msgid, ...args) {
	        return msgid && config.getText('', msgid, args);
	    },
	    pt(msgid, msgctxt, ...args) {
	        return msgid && config.getText(msgctxt, msgid, args);
	    },
	    log(msg, ...optionalParams) {
	        console.log(msg, ...optionalParams);
	        return msg;
	    }
	};

	const namePattern = '[$_a-zA-Z][$\\w]*';

	const keypathPattern = `(?:${namePattern}|\\d+)(?:\\.(?:${namePattern}|\\d+))*`;

	const cache = new Map();
	function keypathToJSExpression(keypath, cacheKey = keypath) {
	    if (!cache.has(cacheKey)) {
	        let keys = typeof keypath == 'string' ? keypath.split('.') : keypath;
	        let keyCount = keys.length;
	        if (keyCount == 1) {
	            cache.set(cacheKey, `this['${keypath}']`);
	        }
	        else {
	            let index = keyCount - 2;
	            let fragments = Array(index);
	            while (index) {
	                fragments[--index] = ` && (tmp = tmp['${keys[index + 1]}'])`;
	            }
	            cache.set(cacheKey, `(tmp = this['${keys[0]}'])${fragments.join('')} && tmp['${keys[keyCount - 1]}']`);
	        }
	    }
	    return cache.get(cacheKey);
	}

	var TemplateNodeValueNodeType;
	(function (TemplateNodeValueNodeType) {
	    TemplateNodeValueNodeType[TemplateNodeValueNodeType["TEXT"] = 1] = "TEXT";
	    TemplateNodeValueNodeType[TemplateNodeValueNodeType["BINDING"] = 2] = "BINDING";
	    TemplateNodeValueNodeType[TemplateNodeValueNodeType["BINDING_KEYPATH"] = 3] = "BINDING_KEYPATH";
	    TemplateNodeValueNodeType[TemplateNodeValueNodeType["BINDING_FORMATTER"] = 4] = "BINDING_FORMATTER";
	})(TemplateNodeValueNodeType || (TemplateNodeValueNodeType = {}));
	const reWhitespace = /\s/;
	const reName = RegExp(namePattern, 'gy');
	const reKeypath = RegExp(keypathPattern, 'gy');
	const reBoolean = /false|true/gy;
	const reNumber = /(?:[+-]\s*)?(?:0b[01]+|0[0-7]+|0x[0-9a-fA-F]+|(?:(?:0|[1-9]\d*)(?:\.\d+)?|\.\d+)(?:[eE][+-]?\d+)?|Infinity|NaN)/gy;
	const reRegExpModifiers = /[gimyu]+/gy;
	const reVacuum = /null|undefined|void 0/gy;
	class TemplateNodeValueParser {
	    constructor(templateNodeValue) {
	        this.templateNodeValue = templateNodeValue;
	    }
	    parse(index) {
	        let templateNodeValue = this.templateNodeValue;
	        this._pos = 0;
	        let result = (this.result = []);
	        do {
	            this._pushText(templateNodeValue.slice(this._pos, index));
	            this._pos = index;
	            this._chr = templateNodeValue.charAt(index);
	            let binding = this._readBinding();
	            if (binding) {
	                result.push(binding);
	            }
	            else {
	                this._pushText(this._chr);
	                this._next();
	            }
	            index = templateNodeValue.indexOf('{', this._pos);
	        } while (index != -1);
	        this._pushText(templateNodeValue.slice(this._pos));
	        return result;
	    }
	    _pushText(value) {
	        if (value) {
	            let result = this.result;
	            let resultLen = result.length;
	            if (resultLen && result[resultLen - 1].nodeType == TemplateNodeValueNodeType.TEXT) {
	                result[resultLen - 1].value += value;
	            }
	            else {
	                result.push({
	                    nodeType: TemplateNodeValueNodeType.TEXT,
	                    value
	                });
	            }
	        }
	    }
	    _readBinding() {
	        let pos = this._pos;
	        this._next( /* '{' */);
	        this._skipWhitespaces();
	        let prefix = this._readPrefix();
	        this._skipWhitespaces();
	        let keypath = this._readKeypath();
	        let value;
	        if (!prefix && !keypath) {
	            value = this._readValue();
	        }
	        if (keypath || value) {
	            let formatters;
	            for (let formatter; this._skipWhitespaces() == '|' && (formatter = this._readFormatter());) {
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
	    _readPrefix() {
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
	        }
	        else if (chr == '-' && this.templateNodeValue.charAt(this._pos + 1) == '>') {
	            this._chr = this.templateNodeValue.charAt((this._pos += 2));
	            return '->';
	        }
	        return null;
	    }
	    _readFormatter() {
	        let pos = this._pos;
	        this._next( /* '|' */);
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
	    _readFormatterArguments() {
	        let pos = this._pos;
	        this._next( /* '(' */);
	        let args;
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
	    _readValue() {
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
	    _readObject() {
	        let pos = this._pos;
	        this._next( /* '{' */);
	        let obj = '{';
	        while (this._skipWhitespaces() != '}') {
	            let key = this._chr == "'" || this._chr == '"' ? this._readString() : this._readObjectKey();
	            if (key && this._skipWhitespaces() == ':') {
	                this._next();
	                this._skipWhitespaces();
	                let valueOrKeypath = this._readValue() || this._readKeypath(true);
	                if (valueOrKeypath) {
	                    if (this._skipWhitespaces() == ',') {
	                        obj += key + ':' + valueOrKeypath + ',';
	                        this._next();
	                        continue;
	                    }
	                    else if (this._chr == '}') {
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
	    _readObjectKey() {
	        return this._readName();
	    }
	    _readArray() {
	        let pos = this._pos;
	        this._next( /* '[' */);
	        let arr = '[';
	        while (this._skipWhitespaces() != ']') {
	            if (this._chr == ',') {
	                arr += ',';
	                this._next();
	            }
	            else {
	                let valueOrKeypath = this._readValue() || this._readKeypath(true);
	                if (valueOrKeypath) {
	                    arr += valueOrKeypath;
	                }
	                else {
	                    this._pos = pos;
	                    this._chr = this.templateNodeValue.charAt(pos);
	                    return null;
	                }
	            }
	        }
	        this._next();
	        return arr + ']';
	    }
	    _readBoolean() {
	        reBoolean.lastIndex = this._pos;
	        let match = reBoolean.exec(this.templateNodeValue);
	        if (match) {
	            this._chr = this.templateNodeValue.charAt((this._pos = reBoolean.lastIndex));
	            return match[0];
	        }
	        return null;
	    }
	    _readNumber() {
	        reNumber.lastIndex = this._pos;
	        let match = reNumber.exec(this.templateNodeValue);
	        if (match) {
	            this._chr = this.templateNodeValue.charAt((this._pos = reNumber.lastIndex));
	            return match[0];
	        }
	        return null;
	    }
	    _readString() {
	        let pos = this._pos;
	        let quoteChar = this._chr;
	        let str = '';
	        for (let next /* = this._next(quoteChar == '"' ? null : "'") */; (next = this._next());) {
	            if (next == quoteChar) {
	                this._next();
	                return quoteChar + str + quoteChar;
	            }
	            if (next == '\\') {
	                str += next + this._next();
	            }
	            else {
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
	    _readRegExp() {
	        let pos = this._pos;
	        let next = this._next( /* '/' */);
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
	                    this._chr = this.templateNodeValue.charAt((this._pos = reRegExpModifiers.lastIndex));
	                    return '/' + regex + '/' + match[0];
	                }
	                return '/' + regex + '/';
	            }
	            if (next == '\\') {
	                regex += next + this._next();
	            }
	            else {
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
	    _readVacuum() {
	        reVacuum.lastIndex = this._pos;
	        let match = reVacuum.exec(this.templateNodeValue);
	        if (match) {
	            this._chr = this.templateNodeValue.charAt((this._pos = reVacuum.lastIndex));
	            return match[0];
	        }
	        return null;
	    }
	    _readKeypath(toJSExpression) {
	        reKeypath.lastIndex = this._pos;
	        let match = reKeypath.exec(this.templateNodeValue);
	        if (match) {
	            this._chr = this.templateNodeValue.charAt((this._pos = reKeypath.lastIndex));
	            return toJSExpression ? keypathToJSExpression(match[0]) : match[0];
	        }
	        return null;
	    }
	    _readName() {
	        reName.lastIndex = this._pos;
	        let match = reName.exec(this.templateNodeValue);
	        if (match) {
	            this._chr = this.templateNodeValue.charAt((this._pos = reName.lastIndex));
	            return match[0];
	        }
	        return null;
	    }
	    _skipWhitespaces() {
	        let chr = this._chr;
	        while (chr && reWhitespace.test(chr)) {
	            chr = this._next();
	        }
	        return chr;
	    }
	    _next( /* current?: string | null */) {
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

	const cache$1 = new Map();
	function compileTemplateNodeValue(templateNodeValueAST, templateNodeValueString, useComponentParamValues) {
	    let cacheKey = templateNodeValueString + (useComponentParamValues ? ',' : '.');
	    if (!cache$1.has(cacheKey)) {
	        let inner;
	        if (templateNodeValueAST.length == 1) {
	            inner = Function('formatters, KEY_COMPONENT_SELF', `var tmp; return ${bindingToJSExpression(templateNodeValueAST[0])};`);
	        }
	        else {
	            let fragments = [];
	            for (let node of templateNodeValueAST) {
	                fragments.push(node.nodeType == TemplateNodeValueNodeType.TEXT
	                    ? `'${dist_1$3(node.value)}'`
	                    : bindingToJSExpression(node));
	            }
	            inner = Function('formatters, KEY_COMPONENT_SELF', `var tmp; return [${fragments.join(', ')}].join('');`);
	        }
	        cache$1.set(cacheKey, useComponentParamValues
	            ? function (cell) {
	                let value = inner.call(this, formatters, KEY_COMPONENT_SELF);
	                if (value && (typeof value == 'object' || typeof value == 'function')) {
	                    let meta = cell.meta;
	                    (meta.element[KEY_COMPONENT_PARAM_VALUES] ||
	                        (meta.element[KEY_COMPONENT_PARAM_VALUES] = new Map())).set(meta.attributeName, value);
	                    return meta.attributeName;
	                }
	                return value;
	            }
	            : function () {
	                let value = inner.call(this, formatters);
	                return value == null ? '' : value + '';
	            });
	    }
	    return cache$1.get(cacheKey);
	}

	const cache$2 = new Map();
	function compileKeypath(keypath, cacheKey = keypath) {
	    return (cache$2.get(cacheKey) ||
	        cache$2
	            .set(cacheKey, Function(`var tmp; return ${keypathToJSExpression(keypath, cacheKey)};`))
	            .get(cacheKey));
	}

	const svgNamespaceURI = 'http://www.w3.org/2000/svg';

	function setAttribute(el, name, value) {
	    if (value === true) {
	        value = '';
	    }
	    if (el.namespaceURI == svgNamespaceURI) {
	        if (name == 'xlink:href' || name == 'href' || name == 'xmlns') {
	            let ns = name == 'xmlns' ? 'http://www.w3.org/2000/xmlns/' : 'http://www.w3.org/1999/xlink';
	            if (value === false || value == null) {
	                el.removeAttributeNS(ns, name);
	            }
	            else {
	                el.setAttributeNS(ns, name, value);
	            }
	            return el;
	        }
	    }
	    else if (name == 'class') {
	        el.className = value;
	        return el;
	    }
	    if (value === false || value == null) {
	        el.removeAttribute(name);
	    }
	    else {
	        el.setAttribute(name, value);
	    }
	    return el;
	}

	function parseTemplateNodeValue(templateNodeValue) {
	    if (!templateNodeValueASTCache.has(templateNodeValue)) {
	        let bracketIndex = templateNodeValue.indexOf('{');
	        if (bracketIndex == -1) {
	            templateNodeValueASTCache.set(templateNodeValue, null);
	        }
	        else {
	            let templateNodeValueAST = new TemplateNodeValueParser(templateNodeValue).parse(bracketIndex);
	            if (templateNodeValueAST.length == 1 &&
	                templateNodeValueAST[0].nodeType == TemplateNodeValueNodeType.TEXT) {
	                templateNodeValueAST = null;
	            }
	            templateNodeValueASTCache.set(templateNodeValue, templateNodeValueAST);
	        }
	    }
	    return templateNodeValueASTCache.get(templateNodeValue);
	}

	const KEY_CONTEXT = Symbol('context');
	const templateNodeValueASTCache = new Map();
	function onAttributeBindingCellChange(evt) {
	    setAttribute(evt.target.meta.element, evt.target.meta.attributeName, evt.data.value);
	}
	function onTextNodeBindingCellChange(evt) {
	    evt.target.meta.textNode.nodeValue = evt.data.value;
	}
	function bindContent(node, ownerComponent, context, result, parentComponent) {
	    for (let child = node.firstChild; child; child = child.nextSibling) {
	        switch (child.nodeType) {
	            case Node.ELEMENT_NODE: {
	                let childComponent = child.rioniteComponent;
	                let $paramsConfig;
	                let $specifiedParams;
	                if (childComponent) {
	                    $paramsConfig = childComponent.constructor[KEY_PARAMS_CONFIG];
	                    $specifiedParams = new Set();
	                }
	                let attrs = child.attributes;
	                for (let i = attrs.length; i;) {
	                    let attr = attrs[--i];
	                    let attrName = attr.name;
	                    let targetAttrName;
	                    if (attrName.charAt(0) == '_') {
	                        targetAttrName = attrName.slice(1);
	                    }
	                    else {
	                        targetAttrName = attrName;
	                        if (!attrName.lastIndexOf('oncomponent-', 0) ||
	                            !attrName.lastIndexOf('on-', 0)) {
	                            child[KEY_CONTEXT] = context;
	                        }
	                    }
	                    let $paramConfig = $paramsConfig && $paramsConfig.get(targetAttrName);
	                    let attrValue = attr.value;
	                    if ($paramConfig) {
	                        $specifiedParams.add($paramConfig.name);
	                    }
	                    if (!attrValue) {
	                        continue;
	                    }
	                    let attrValueAST = parseTemplateNodeValue(attrValue);
	                    if (!attrValueAST) {
	                        continue;
	                    }
	                    let bindingPrefix = attrValueAST.length == 1
	                        ? attrValueAST[0].prefix
	                        : null;
	                    if (bindingPrefix === '=') {
	                        setAttribute(child, targetAttrName, compileTemplateNodeValue(attrValueAST, attrValue, true).call(context, {
	                            meta: {
	                                element: child,
	                                attributeName: targetAttrName
	                            }
	                        }));
	                    }
	                    else {
	                        if (bindingPrefix !== '->') {
	                            let cell = new cellx.Cell(compileTemplateNodeValue(attrValueAST, attrValue, attrValueAST.length == 1), {
	                                context,
	                                meta: {
	                                    element: child,
	                                    attributeName: targetAttrName
	                                },
	                                onChange: onAttributeBindingCellChange
	                            });
	                            setAttribute(child, targetAttrName, cell.get());
	                            (result[1] || (result[1] = [])).push(cell);
	                        }
	                        if ($paramConfig && (bindingPrefix === '->' || bindingPrefix === '<->')) {
	                            if (bindingPrefix == '->' && attrName.charAt(0) != '_') {
	                                child.removeAttribute(attrName);
	                            }
	                            let keypath = attrValueAST[0].keypath.split('.');
	                            (result[2] || (result[2] = [])).push(childComponent, $paramConfig.property, keypath.length == 1
	                                ? ((propName) => function (evt) {
	                                    this.ownerComponent[propName] = evt.data.value;
	                                })(keypath[0])
	                                : ((propName, keypath) => {
	                                    let getPropertyHolder = compileKeypath(keypath, keypath.join('.'));
	                                    return function (evt) {
	                                        let propHolder = getPropertyHolder.call(this.ownerComponent);
	                                        if (propHolder) {
	                                            propHolder[propName] = evt.data.value;
	                                        }
	                                    };
	                                })(keypath[keypath.length - 1], keypath.slice(0, -1)));
	                        }
	                    }
	                }
	                if (childComponent) {
	                    childComponent._ownerComponent = ownerComponent;
	                    childComponent.$context = context;
	                    childComponent.$specifiedParams = $specifiedParams;
	                    if (parentComponent) {
	                        (parentComponent[KEY_CHILD_COMPONENTS] ||
	                            (parentComponent[KEY_CHILD_COMPONENTS] = [])).push(childComponent);
	                    }
	                    else {
	                        (result[0] || (result[0] = [])).push(childComponent);
	                    }
	                }
	                if (child.firstChild &&
	                    (!childComponent ||
	                        !childComponent.constructor.bindsInputContent)) {
	                    bindContent(child, ownerComponent, context, result, childComponent);
	                }
	                break;
	            }
	            case Node.TEXT_NODE: {
	                let childValue = child.nodeValue;
	                let childValueAST = parseTemplateNodeValue(childValue);
	                if (!childValueAST) {
	                    break;
	                }
	                if (childValueAST.length == 1 &&
	                    childValueAST[0].prefix === '=') {
	                    child.nodeValue = compileTemplateNodeValue(childValueAST, childValue, false).call(context);
	                }
	                else {
	                    let cell = new cellx.Cell(compileTemplateNodeValue(childValueAST, childValue, false), {
	                        context,
	                        meta: { textNode: child },
	                        onChange: onTextNodeBindingCellChange
	                    });
	                    child.nodeValue = cell.get();
	                    (result[1] || (result[1] = [])).push(cell);
	                }
	                break;
	            }
	        }
	    }
	    return result;
	}

	const componentConstructors = new Map();

	function InterruptError() {
	    if (!(this instanceof InterruptError)) {
	        return new InterruptError();
	    }
	}
	InterruptError.prototype = {
	    __proto__: Error.prototype,
	    constructor: InterruptError
	};

	const KEY_DOM_EVENTS = Symbol('domEvents');
	function handleDOMEvent(evt) {
	    let el = evt.target;
	    if (el == document.body) {
	        return;
	    }
	    let evtType = evt.type;
	    let attrName = 'on-' + evtType;
	    let parentEl = el.parentElement;
	    let receivers;
	    while (parentEl) {
	        if (parentEl == document.body) {
	            return;
	        }
	        if ((el[KEY_DOM_EVENTS] && el[KEY_DOM_EVENTS].has(evtType)) || el.hasAttribute(attrName)) {
	            (receivers || (receivers = [])).push(el);
	        }
	        let component = parentEl.$component;
	        if (component && receivers && receivers.length) {
	            let i = 0;
	            do {
	                let receiver = receivers[i];
	                let handler;
	                if (receiver[KEY_DOM_EVENTS]) {
	                    let elName = receiver[KEY_DOM_EVENTS].get(evtType);
	                    if (elName) {
	                        let events = component.constructor.domEvents;
	                        if (events && events[elName]) {
	                            handler = events[elName][evtType];
	                            if (handler) {
	                                let result = handler.call(component, evt, receiver[KEY_CONTEXT], receiver);
	                                if (result === false) {
	                                    return;
	                                }
	                                if (result instanceof Promise) {
	                                    result.catch((err) => {
	                                        if (!(err instanceof InterruptError)) {
	                                            config.logError(err);
	                                        }
	                                    });
	                                }
	                                receivers.splice(i, 1);
	                            }
	                        }
	                    }
	                }
	                handler = component[receiver.getAttribute(attrName)];
	                if (handler) {
	                    let result = handler.call(component, evt, receiver[KEY_CONTEXT], receiver);
	                    if (result === false) {
	                        return;
	                    }
	                    if (result instanceof Promise) {
	                        result.catch((err) => {
	                            if (!(err instanceof InterruptError)) {
	                                config.logError(err);
	                            }
	                        });
	                    }
	                    if (i != receivers.length && receivers[i] == receiver) {
	                        receivers.splice(i, 1);
	                    }
	                }
	                if (i != receivers.length && receivers[i] == receiver) {
	                    i++;
	                }
	            } while (i < receivers.length);
	        }
	        el = parentEl;
	        parentEl = el.parentElement;
	    }
	}

	const KEY_EVENTS = Symbol('events');
	const componentStack = [];
	function handleEvent(evt) {
	    let target = evt.target;
	    let ownerComponent = target.ownerComponent;
	    if (target == ownerComponent) {
	        return;
	    }
	    let targetEl = target.element;
	    let el = targetEl;
	    if (!el.parentElement) {
	        return;
	    }
	    componentStack.length = 0;
	    let evtType = evt.type;
	    let attrName = typeof evtType == 'string' ? 'oncomponent-' + evtType : null;
	    let receivers;
	    for (;;) {
	        if ((el[KEY_EVENTS] && el[KEY_EVENTS].has(evtType)) ||
	            (attrName && el.hasAttribute(attrName))) {
	            (receivers || (receivers = [])).push(el);
	        }
	        if (el.parentElement == ownerComponent.element) {
	            if (receivers) {
	                for (let receiver of receivers) {
	                    if (receiver[KEY_EVENTS]) {
	                        let elName = receiver[KEY_EVENTS].get(evtType);
	                        if (elName) {
	                            let events = ownerComponent.constructor
	                                .events;
	                            let handler = events[elName][evtType];
	                            if (handler) {
	                                let result = handler.call(ownerComponent, evt, receiver[KEY_CONTEXT], receiver);
	                                if (result === false) {
	                                    return;
	                                }
	                                if (result instanceof Promise) {
	                                    result.catch((err) => {
	                                        if (!(err instanceof InterruptError)) {
	                                            config.logError(err);
	                                        }
	                                    });
	                                }
	                            }
	                        }
	                    }
	                    if (attrName) {
	                        let handler = ownerComponent[receiver.getAttribute(attrName)];
	                        if (handler) {
	                            let result = handler.call(ownerComponent, evt, receiver[KEY_CONTEXT], receiver);
	                            if (result === false) {
	                                return;
	                            }
	                            if (result instanceof Promise) {
	                                result.catch((err) => {
	                                    if (!(err instanceof InterruptError)) {
	                                        config.logError(err);
	                                    }
	                                });
	                            }
	                        }
	                    }
	                }
	                receivers.length = 0;
	            }
	            if (!componentStack.length) {
	                break;
	            }
	            el = el.parentElement;
	            if (!el.parentElement) {
	                break;
	            }
	            [ownerComponent, receivers] = componentStack.pop();
	        }
	        else {
	            el = el.parentElement;
	            if (!el.parentElement) {
	                break;
	            }
	            let component = el.$component;
	            if (component && component.ownerComponent != ownerComponent) {
	                componentStack.push([ownerComponent, receivers || null]);
	                ownerComponent = component.ownerComponent;
	                receivers = null;
	            }
	        }
	    }
	}

	(function (NodeType) {
	    NodeType[NodeType["BLOCK"] = 1] = "BLOCK";
	    NodeType[NodeType["ELEMENT"] = 2] = "ELEMENT";
	    NodeType[NodeType["TEXT"] = 3] = "TEXT";
	    NodeType[NodeType["ELEMENT_CALL"] = 4] = "ELEMENT_CALL";
	    NodeType[NodeType["SUPER_CALL"] = 5] = "SUPER_CALL";
	    NodeType[NodeType["DEBUGGER_CALL"] = 6] = "DEBUGGER_CALL";
	})(exports.TemplateNodeType || (exports.TemplateNodeType = {}));
	const KEY_CONTENT_TEMPLATE = Symbol('contentTemplate');
	const ELEMENT_NAME_DELIMITER = '__';
	class Template {
	    constructor(template, options) {
	        this.initialized = false;
	        let embedded = (this._embedded = !!(options && options._embedded));
	        let parent = (this.parent = (options && options.parent) || null);
	        if (typeof template == 'string') {
	            template = new dist_2(template).parse();
	        }
	        if (Array.isArray(template)) {
	            this.template = template;
	            this.block = null;
	        }
	        else {
	            this.template = null;
	            this.block = template;
	            if (this._embedded) {
	                this._elements = template.elements;
	            }
	        }
	        if (embedded) {
	            this._elementNamesTemplate = parent._elementNamesTemplate;
	        }
	        else {
	            let blockName = options && options.blockName;
	            if (Array.isArray(blockName)) {
	                this.setBlockName(blockName);
	            }
	            else if (parent) {
	                this._elementNamesTemplate = blockName
	                    ? [blockName + ELEMENT_NAME_DELIMITER].concat(parent._elementNamesTemplate)
	                    : parent._elementNamesTemplate.slice();
	            }
	            else if (blockName) {
	                this._elementNamesTemplate = [blockName + ELEMENT_NAME_DELIMITER, ''];
	            }
	            else {
	                this._elementNamesTemplate = ['', ''];
	            }
	        }
	    }
	    initialize(component) {
	        if (this.initialized) {
	            return;
	        }
	        this.initialized = true;
	        if (this.parent) {
	            this.parent.parse(component);
	        }
	        let parent = this.parent;
	        if (!this._embedded) {
	            this._elements = parent
	                ? { __proto__: parent._elements }
	                : {
	                    __proto__: null,
	                    '@root': {
	                        nodeType: exports.TemplateNodeType.ELEMENT,
	                        isTransformer: true,
	                        namespaceSVG: false,
	                        tagName: 'section',
	                        is: null,
	                        names: ['root'],
	                        attributes: null,
	                        $specifiedParams: null,
	                        events: null,
	                        domEvents: null,
	                        content: [],
	                        contentTemplateIndex: null
	                    }
	                };
	        }
	        this._embeddedTemplates = this._embedded
	            ? parent._embeddedTemplates
	            : parent &&
	                parent._embeddedTemplates &&
	                parent._embeddedTemplates.map((template) => new Template({
	                    nodeType: exports.TemplateNodeType.BLOCK,
	                    content: template.block.content,
	                    elements: this._elements
	                }, {
	                    _embedded: true,
	                    parent: this
	                }));
	    }
	    parse(component) {
	        this.initialize(component);
	        if (this.block) {
	            return this.block;
	        }
	        let block = (this.block = {
	            nodeType: exports.TemplateNodeType.BLOCK,
	            content: null,
	            elements: this._elements
	        });
	        this._readContent(this.parent ? null : block.elements['@root'].content, this.template, false, null, component && component.constructor);
	        return block;
	    }
	    _readContent(targetContent, content, namespaceSVG, superElName, componentCtor) {
	        for (let node of content) {
	            switch (node[0]) {
	                case dist_1$2.ELEMENT: {
	                    targetContent = this._readElement(targetContent, node, namespaceSVG, superElName, componentCtor);
	                    break;
	                }
	                case dist_1$2.TEXT: {
	                    (targetContent || (targetContent = [])).push({
	                        nodeType: exports.TemplateNodeType.TEXT,
	                        value: node[1]
	                    });
	                    break;
	                }
	                case dist_1$2.SUPER_CALL: {
	                    (targetContent || (targetContent = [])).push(this._readSuperCall(node, superElName));
	                    break;
	                }
	                case dist_1$2.DEBUGGER_CALL: {
	                    (targetContent || (targetContent = [])).push({
	                        nodeType: exports.TemplateNodeType.DEBUGGER_CALL
	                    });
	                    break;
	                }
	            }
	        }
	        return targetContent;
	    }
	    _readElement(targetContent, elNode, namespaceSVG, superElName, componentCtor) {
	        let isTransformer = !!elNode[1];
	        let tagName = elNode[2] || null;
	        let elNames = elNode[3];
	        if (elNames && !elNames[0]) {
	            elNames[0] = null;
	        }
	        let elName = elNames
	            ? isTransformer
	                ? elNames[0] && '@' + elNames[0]
	                : elNames[0]
	            : null;
	        if (tagName) {
	            if (!namespaceSVG) {
	                if (tagName.toLowerCase() == 'svg') {
	                    namespaceSVG = true;
	                    tagName = 'svg';
	                }
	                else if (elName) {
	                    let superEl;
	                    if (this.parent && (superEl = this.parent._elements[elName])) {
	                        namespaceSVG = superEl.namespaceSVG;
	                    }
	                }
	            }
	            if (!isTransformer && !namespaceSVG) {
	                tagName = dist_1(tagName, true);
	            }
	        }
	        else {
	            if (!elName) {
	                this._throwError('Expected element', elNode);
	            }
	            let superEl;
	            if (!this.parent || !(superEl = this.parent._elements[elName])) {
	                throw this._throwError('Element.tagName is required', elNode);
	            }
	            if (!namespaceSVG) {
	                namespaceSVG = superEl.namespaceSVG;
	            }
	            tagName = superEl.tagName;
	        }
	        let elComponentCtor = isTransformer || namespaceSVG ? null : componentConstructors.get(tagName);
	        let attrs;
	        let $specifiedParams;
	        if (elComponentCtor) {
	            $specifiedParams = new Set();
	        }
	        if (elNode[4]) {
	            attrs = this._readAttributes(elNode[4], namespaceSVG, elName || superElName, elComponentCtor && elComponentCtor[KEY_PARAMS_CONFIG], $specifiedParams);
	        }
	        let events;
	        let domEvents;
	        if (elNames && componentCtor) {
	            let componentEvents = componentCtor.events;
	            let componentDOMEvents = componentCtor.domEvents;
	            if (componentEvents || componentDOMEvents) {
	                for (let name of elNames) {
	                    if (!name) {
	                        continue;
	                    }
	                    let elEvents = componentEvents && componentEvents[name];
	                    for (let type in elEvents) {
	                        if (elEvents[type] !== Object.prototype[type]) {
	                            (events || (events = new Map())).set(type, name);
	                        }
	                    }
	                    while (elEvents) {
	                        for (let type of Object.getOwnPropertySymbols(elEvents)) {
	                            if (!events || !events.has(type)) {
	                                (events || (events = new Map())).set(type, name);
	                            }
	                        }
	                        elEvents = elEvents.__proto__;
	                        if (elEvents == Object.prototype) {
	                            break;
	                        }
	                    }
	                    let elDOMEvents = componentDOMEvents && componentDOMEvents[name];
	                    for (let type in elDOMEvents) {
	                        if (elDOMEvents[type] !== Object.prototype[type]) {
	                            (domEvents || (domEvents = new Map())).set(type, name);
	                        }
	                    }
	                }
	            }
	        }
	        let content;
	        if (elNode[5]) {
	            content = this._readContent(null, elNode[5], namespaceSVG, elName || superElName, componentCtor);
	        }
	        let el = {
	            nodeType: exports.TemplateNodeType.ELEMENT,
	            isTransformer,
	            namespaceSVG,
	            tagName,
	            is: (attrs && attrs.attributeIsValue) || null,
	            names: elNames || null,
	            attributes: attrs || null,
	            $specifiedParams: $specifiedParams || null,
	            events: events || null,
	            domEvents: domEvents || null,
	            content: content || null,
	            contentTemplateIndex: null
	        };
	        if (isTransformer) {
	            let transformer = Template.elementTransformers[tagName];
	            if (!transformer) {
	                this._throwError(`Transformer "${tagName}" is not defined`, elNode);
	            }
	            content = transformer(el);
	            if (content && content.length) {
	                el.content = content;
	                for (let i = 0, l = content.length; i < l; i++) {
	                    let node = content[i];
	                    if (node.nodeType == exports.TemplateNodeType.ELEMENT) {
	                        if (!namespaceSVG &&
	                            node.content &&
	                            (node.tagName == 'template' ||
	                                node.tagName == 'rn-slot')) {
	                            let contentEl = {
	                                nodeType: exports.TemplateNodeType.ELEMENT,
	                                isTransformer: false,
	                                namespaceSVG: node.namespaceSVG,
	                                tagName: node.tagName,
	                                is: node.is,
	                                names: node.names,
	                                attributes: node.attributes,
	                                $specifiedParams: node.$specifiedParams,
	                                events: node.events,
	                                domEvents: node.domEvents,
	                                content: node.content,
	                                contentTemplateIndex: (this._embeddedTemplates || (this._embeddedTemplates = [])).push(new Template({
	                                    nodeType: exports.TemplateNodeType.BLOCK,
	                                    content: node.content,
	                                    elements: this._elements
	                                }, {
	                                    _embedded: true,
	                                    parent: this
	                                })) - 1
	                            };
	                            let elName = contentEl.names && contentEl.names[0];
	                            if (elName) {
	                                this._elements[elName] = contentEl;
	                                content[i] = {
	                                    nodeType: exports.TemplateNodeType.ELEMENT_CALL,
	                                    name: elName
	                                };
	                            }
	                            else {
	                                content[i] = contentEl;
	                            }
	                        }
	                        else {
	                            let elName = node.names && node.names[0];
	                            if (elName) {
	                                this._elements[elName] = node;
	                                content[i] = {
	                                    nodeType: exports.TemplateNodeType.ELEMENT_CALL,
	                                    name: elName
	                                };
	                            }
	                        }
	                    }
	                }
	            }
	            else {
	                el.content = null;
	            }
	        }
	        else {
	            let attrList = attrs && attrs.list;
	            if (attrList) {
	                for (let i = 0, l = attrList['length=']; i < l; i++) {
	                    let attr = attrList[i];
	                    if (attr.isTransformer) {
	                        let transformer = Template.attributeTransformers[attr.name];
	                        if (!transformer) {
	                            this._throwError(`Transformer "${attr.name}" is not defined`, elNode);
	                        }
	                        el = transformer(el, attr);
	                        for (let i = 0, l = (el.content || []).length; i < l; i++) {
	                            let node = el.content[i];
	                            if (node.nodeType == exports.TemplateNodeType.ELEMENT) {
	                                if (!namespaceSVG &&
	                                    node.content &&
	                                    (node.tagName == 'template' ||
	                                        node.tagName == 'rn-slot')) {
	                                    let contentEl = {
	                                        nodeType: exports.TemplateNodeType.ELEMENT,
	                                        isTransformer: false,
	                                        namespaceSVG: node.namespaceSVG,
	                                        tagName: node.tagName,
	                                        is: node.is,
	                                        names: node.names,
	                                        attributes: node.attributes,
	                                        $specifiedParams: node.$specifiedParams,
	                                        events: node.events,
	                                        domEvents: node.domEvents,
	                                        content: node.content,
	                                        contentTemplateIndex: (this._embeddedTemplates ||
	                                            (this._embeddedTemplates = [])).push(new Template({
	                                            nodeType: exports.TemplateNodeType.BLOCK,
	                                            content: node.content,
	                                            elements: this._elements
	                                        }, {
	                                            _embedded: true,
	                                            parent: this
	                                        })) - 1
	                                    };
	                                    let elName = contentEl.names && contentEl.names[0];
	                                    if (elName) {
	                                        this._elements[elName] = contentEl;
	                                        el.content[i] = {
	                                            nodeType: exports.TemplateNodeType.ELEMENT_CALL,
	                                            name: elName
	                                        };
	                                    }
	                                    else {
	                                        el.content[i] = contentEl;
	                                    }
	                                }
	                                else {
	                                    let elName = node.names && node.names[0];
	                                    if (elName) {
	                                        this._elements[elName] = node;
	                                        el.content[i] = {
	                                            nodeType: exports.TemplateNodeType.ELEMENT_CALL,
	                                            name: elName
	                                        };
	                                    }
	                                }
	                            }
	                        }
	                    }
	                }
	            }
	            if (el.content && (el.tagName == 'template' || el.tagName == 'rn-slot')) {
	                el.contentTemplateIndex =
	                    (this._embeddedTemplates || (this._embeddedTemplates = [])).push(new Template({
	                        nodeType: exports.TemplateNodeType.BLOCK,
	                        content: el.content,
	                        elements: this._elements
	                    }, {
	                        _embedded: true,
	                        parent: this
	                    })) - 1;
	            }
	            elName = el.names && el.names[0];
	        }
	        if (elName) {
	            this._elements[elName] = el;
	            (targetContent || (targetContent = [])).push({
	                nodeType: exports.TemplateNodeType.ELEMENT_CALL,
	                name: elName
	            });
	        }
	        else {
	            (targetContent || (targetContent = [])).push(el);
	        }
	        return targetContent;
	    }
	    _readAttributes(elAttrs, namespaceSVG, superElName, $paramsConfig, $specifiedParams) {
	        let superCall = elAttrs[0] &&
	            this._readSuperCall([dist_1$2.SUPER_CALL, elAttrs[0] === 1 ? '' : elAttrs[0]], superElName);
	        let attrIsValue;
	        let list;
	        if (superCall) {
	            let superElAttrs = superCall.element.attributes;
	            if (superElAttrs) {
	                let superElAttrList = superElAttrs.list;
	                attrIsValue = superElAttrs.attributeIsValue;
	                list = { __proto__: superElAttrList };
	                if ($paramsConfig && superElAttrList) {
	                    for (let i = 0, l = superElAttrList['length=']; i < l; i++) {
	                        let attr = superElAttrList[i];
	                        if (!attr.isTransformer && $paramsConfig.has(attr.name)) {
	                            $specifiedParams.add($paramsConfig.get(attr.name).name);
	                        }
	                    }
	                }
	            }
	        }
	        if (elAttrs[1]) {
	            for (let elAttr of elAttrs[1]) {
	                let isTransformer = !!elAttr[0];
	                let name = elAttr[1];
	                if (!isTransformer && !namespaceSVG) {
	                    name = dist_1$1(name, true);
	                }
	                let fullName = (isTransformer ? '@' : '') + name;
	                let value = elAttr[2];
	                if (fullName == 'is') {
	                    attrIsValue = value;
	                }
	                else {
	                    (list || (list = { __proto__: null, 'length=': 0 }))[list[fullName] === undefined
	                        ? (list[fullName] = list['length=']++)
	                        : list[fullName]] = {
	                        isTransformer,
	                        name,
	                        value
	                    };
	                }
	                if ($paramsConfig && $paramsConfig.has(name)) {
	                    $specifiedParams.add($paramsConfig.get(name).name);
	                }
	            }
	        }
	        return attrIsValue == null && !list
	            ? null
	            : {
	                attributeIsValue: attrIsValue || null,
	                list: list || null
	            };
	    }
	    _readSuperCall(superCallNode, defaultElName) {
	        if (!this.parent) {
	            this._throwError('SuperCall is impossible if there is no parent', superCallNode);
	        }
	        let elName = superCallNode[1] ||
	            defaultElName ||
	            this._throwError('SuperCall.elementName is required', superCallNode);
	        let el = (elName.charAt(0) == '@' && this.parent._elements[elName.slice(1)]) ||
	            this.parent._elements[elName];
	        if (!el) {
	            this._throwError(`Element "${elName}" is not defined`, superCallNode);
	        }
	        return {
	            nodeType: exports.TemplateNodeType.SUPER_CALL,
	            elementName: elName,
	            element: el
	        };
	    }
	    _throwError(msg, node) {
	        throw {
	            type: TypeError,
	            message: msg,
	            node
	        };
	    }
	    extend(template, options) {
	        return new Template(template, {
	            __proto__: options,
	            parent: this
	        });
	    }
	    setBlockName(blockName) {
	        if (Array.isArray(blockName)) {
	            (this._elementNamesTemplate = blockName.map((blockName) => blockName + ELEMENT_NAME_DELIMITER)).push('');
	        }
	        else {
	            this._elementNamesTemplate[0] = blockName + ELEMENT_NAME_DELIMITER;
	        }
	        return this;
	    }
	    render(component, ownerComponent, context, result, parentComponent) {
	        let block = this.parse(component);
	        return renderContent(document.createDocumentFragment(), block.content || block.elements['@root'].content, this, ownerComponent, context, result, parentComponent);
	    }
	}
	Template.elementTransformers = {
	    section: (el) => el.content
	};
	Template.attributeTransformers = {};
	function renderContent(targetNode, content, template, ownerComponent, context, result, parentComponent) {
	    var _a;
	    if (content) {
	        for (let node of content) {
	            switch (node.nodeType) {
	                case exports.TemplateNodeType.ELEMENT_CALL: {
	                    node = template._elements[node.name];
	                    break;
	                }
	                case exports.TemplateNodeType.SUPER_CALL: {
	                    renderContent(targetNode, node.element.content, template, ownerComponent, context, result, parentComponent);
	                    continue;
	                }
	            }
	            switch (node.nodeType) {
	                case exports.TemplateNodeType.ELEMENT: {
	                    if (node.isTransformer) {
	                        renderContent(targetNode, node.content, template, ownerComponent, context, result, parentComponent);
	                    }
	                    else {
	                        let tagName = node.tagName;
	                        let el;
	                        if (node.namespaceSVG) {
	                            el = document.createElementNS(svgNamespaceURI, tagName);
	                        }
	                        else if (node.is) {
	                            el = window.innerHTML(document.createElement('div'), `<${tagName} is="${node.is}">`).firstChild;
	                        }
	                        else {
	                            el = document.createElement(tagName);
	                        }
	                        let nodeComponent = result && el.rioniteComponent;
	                        let className;
	                        if (nodeComponent) {
	                            className = nodeComponent.constructor
	                                ._blockNamesString;
	                        }
	                        if (node.names) {
	                            className =
	                                (className || '') +
	                                    renderElementClasses(template._elementNamesTemplate, node.names);
	                        }
	                        let attrList = node.attributes && node.attributes.list;
	                        if (attrList) {
	                            let $paramsConfig;
	                            if (nodeComponent) {
	                                $paramsConfig = nodeComponent.constructor[KEY_PARAMS_CONFIG];
	                            }
	                            for (let i = 0, l = attrList['length=']; i < l; i++) {
	                                let attr = attrList[i];
	                                if (attr.isTransformer) {
	                                    continue;
	                                }
	                                let attrName = attr.name;
	                                let attrValue = attr.value;
	                                if (attrName == 'class') {
	                                    attrValue = (className || '') + attrValue;
	                                    className = null;
	                                }
	                                if (result) {
	                                    if (!attrName.lastIndexOf('oncomponent-', 0) ||
	                                        !attrName.lastIndexOf('on-', 0)) {
	                                        el[KEY_CONTEXT] = context;
	                                    }
	                                    if (attrValue) {
	                                        let attrValueAST = parseTemplateNodeValue(attrValue);
	                                        if (attrValueAST) {
	                                            let bindingPrefix = attrValueAST.length == 1
	                                                ? attrValueAST[0]
	                                                    .prefix
	                                                : null;
	                                            if (bindingPrefix === '=' ||
	                                                (bindingPrefix === null && ((_a = ($paramsConfig && $paramsConfig.get(attrName))) === null || _a === void 0 ? void 0 : _a.readonly))) {
	                                                attrValue = compileTemplateNodeValue(attrValueAST, attrValue, true).call(context, {
	                                                    meta: {
	                                                        element: el,
	                                                        attributeName: attrName
	                                                    }
	                                                });
	                                            }
	                                            else {
	                                                if (bindingPrefix !== '->') {
	                                                    let cell = new cellx.Cell(compileTemplateNodeValue(attrValueAST, attrValue, attrValueAST.length == 1), {
	                                                        context,
	                                                        meta: {
	                                                            element: el,
	                                                            attributeName: attrName
	                                                        },
	                                                        onChange: onAttributeBindingCellChange
	                                                    });
	                                                    attrValue = cell.get();
	                                                    (result[1] || (result[1] = [])).push(cell);
	                                                }
	                                                let $paramConfig = $paramsConfig && $paramsConfig.get(attrName);
	                                                if ($paramConfig &&
	                                                    (bindingPrefix === '->' ||
	                                                        bindingPrefix === '<->')) {
	                                                    if (bindingPrefix == '->' &&
	                                                        attrName.charAt(0) != '_') {
	                                                        attrValue = null;
	                                                    }
	                                                    let keypath = attrValueAST[0].keypath.split('.');
	                                                    (result[2] || (result[2] = [])).push(nodeComponent, $paramConfig.property, keypath.length == 1
	                                                        ? ((propName) => function (evt) {
	                                                            this.ownerComponent[propName] = evt.data.value;
	                                                        })(keypath[0])
	                                                        : ((propName, keypath) => {
	                                                            let getPropertyHolder = compileKeypath(keypath, keypath.join('.'));
	                                                            return function (evt) {
	                                                                let propHolder = getPropertyHolder.call(this.ownerComponent);
	                                                                if (propHolder) {
	                                                                    propHolder[propName] =
	                                                                        evt.data.value;
	                                                                }
	                                                            };
	                                                        })(keypath[keypath.length - 1], keypath.slice(0, -1)));
	                                                }
	                                            }
	                                        }
	                                    }
	                                }
	                                if (attrValue !== false && attrValue != null) {
	                                    setAttribute(el, attrName, attrValue);
	                                }
	                            }
	                        }
	                        if (className) {
	                            if (node.namespaceSVG) {
	                                el.setAttribute('class', className);
	                            }
	                            else {
	                                el.className = className;
	                            }
	                        }
	                        if (node.events) {
	                            el[KEY_EVENTS] = node.events;
	                            el[KEY_CONTEXT] = context;
	                        }
	                        if (node.domEvents) {
	                            el[KEY_DOM_EVENTS] = node.domEvents;
	                            el[KEY_CONTEXT] = context;
	                        }
	                        if (nodeComponent) {
	                            nodeComponent._ownerComponent = ownerComponent;
	                            nodeComponent.$context = context;
	                            nodeComponent.$specifiedParams = node.$specifiedParams;
	                            if (parentComponent) {
	                                (parentComponent[KEY_CHILD_COMPONENTS] ||
	                                    (parentComponent[KEY_CHILD_COMPONENTS] = [])).push(nodeComponent);
	                            }
	                            else {
	                                (result[0] || (result[0] = [])).push(nodeComponent);
	                            }
	                        }
	                        if (node.contentTemplateIndex !== null) {
	                            el[KEY_CONTENT_TEMPLATE] = template._embeddedTemplates[node.contentTemplateIndex];
	                        }
	                        else if (result &&
	                            (!nodeComponent ||
	                                !nodeComponent.constructor
	                                    .bindsInputContent)) {
	                            renderContent(el, node.content, template, ownerComponent, context, result, nodeComponent);
	                        }
	                        else {
	                            renderContent(el, node.content, template);
	                        }
	                        targetNode.appendChild(el);
	                    }
	                    break;
	                }
	                case exports.TemplateNodeType.TEXT: {
	                    let nodeValue = node.value;
	                    if (result) {
	                        let nodeValueAST = parseTemplateNodeValue(nodeValue);
	                        if (nodeValueAST) {
	                            if (nodeValueAST.length == 1 &&
	                                nodeValueAST[0].prefix === '=') {
	                                targetNode.appendChild(document.createTextNode(compileTemplateNodeValue(nodeValueAST, nodeValue, false).call(context)));
	                            }
	                            else {
	                                let meta = { textNode: null };
	                                let cell = new cellx.Cell(compileTemplateNodeValue(nodeValueAST, nodeValue, false), {
	                                    context,
	                                    meta,
	                                    onChange: onTextNodeBindingCellChange
	                                });
	                                meta.textNode = targetNode.appendChild(document.createTextNode(cell.get()));
	                                (result[1] || (result[1] = [])).push(cell);
	                            }
	                            break;
	                        }
	                    }
	                    targetNode.appendChild(document.createTextNode(nodeValue));
	                    break;
	                }
	            }
	        }
	    }
	    return targetNode;
	}
	function renderElementClasses(elementNamesTemplate, elNames) {
	    let elClasses = '';
	    for (let i = elNames[0] ? 0 : 1, l = elNames.length; i < l; i++) {
	        elClasses += elementNamesTemplate.join(elNames[i] + ' ');
	    }
	    return elClasses;
	}

	[
	    ['IfThen', 'rn-if-then'],
	    ['IfElse', 'rn-if-else'],
	    ['Repeat', 'rn-repeat']
	].forEach(([name, is]) => {
	    Template.elementTransformers[name] = el => {
	        return [
	            {
	                nodeType: exports.TemplateNodeType.ELEMENT,
	                isTransformer: false,
	                namespaceSVG: el.namespaceSVG,
	                tagName: 'template',
	                is,
	                names: el.names,
	                attributes: el.attributes,
	                $specifiedParams: null,
	                events: null,
	                domEvents: null,
	                content: el.content,
	                contentTemplateIndex: null
	            }
	        ];
	    };
	});
	[
	    ['if', 'rn-if-then'],
	    ['unless', 'rn-if-else'],
	    ['for', 'rn-repeat']
	].forEach(([name, is]) => {
	    Template.attributeTransformers[name] = (el, attr) => {
	        return {
	            nodeType: exports.TemplateNodeType.ELEMENT,
	            isTransformer: false,
	            namespaceSVG: false,
	            tagName: 'template',
	            is,
	            names: null,
	            attributes: {
	                attributeIsValue: is,
	                list: {
	                    0: {
	                        isTransformer: false,
	                        name: name == 'unless' ? 'if' : name,
	                        value: attr.value,
	                        pos: -1
	                    },
	                    'length=': 1
	                }
	            },
	            $specifiedParams: null,
	            events: null,
	            domEvents: null,
	            content: [el],
	            contentTemplateIndex: null
	        };
	    };
	});

	var dist$5 = createCommonjsModule(function (module, exports) {
	Object.defineProperty(exports, "__esModule", { value: true });
	var reHyphen = /[-_]+([a-z])/g;
	var cache = Object.create(null);
	function camelize(str, useCache) {
	    str = String(str);
	    var value;
	    return ((useCache && cache[str]) ||
	        ((value = str.replace(reHyphen, function (match, chr) { return chr.toUpperCase(); })),
	            useCache ? (cache[str] = value) : value));
	}
	exports.camelize = camelize;
	});

	unwrapExports(dist$5);
	var dist_1$5 = dist$5.camelize;

	var dist$6 = createCommonjsModule(function (module, exports) {
	Object.defineProperty(exports, "__esModule", { value: true });

	var cache = Object.create(null);
	function pascalize(str, useCache) {
	    str = String(str);
	    var value;
	    return ((useCache && cache[str]) ||
	        ((value = dist$5.camelize(str)),
	            (value = value.charAt(0).toUpperCase() + value.slice(1)),
	            useCache ? (cache[str] = value) : value));
	}
	exports.pascalize = pascalize;
	});

	unwrapExports(dist$6);
	var dist_1$6 = dist$6.pascalize;

	const KEY_COMPONENT_PARAMS_INITED = Symbol('componentParamsInited');
	const ComponentParams = {
	    init(component) {
	        if (component[KEY_COMPONENT_PARAMS_INITED]) {
	            return;
	        }
	        let $specifiedParams;
	        if (component.$specifiedParams) {
	            $specifiedParams = null;
	        }
	        else {
	            $specifiedParams = component.$specifiedParams = new Set();
	        }
	        let $paramsConfig = component.constructor[KEY_PARAMS_CONFIG];
	        if ($paramsConfig) {
	            for (let [name, $paramConfig] of $paramsConfig) {
	                let valueСonverters = $paramConfig.valueСonverters;
	                let defaultValue = $paramConfig.default;
	                let el = component.element;
	                let snakeCaseName = dist_1$1(name, true);
	                let rawValue = el.getAttribute(snakeCaseName);
	                if (rawValue === null) {
	                    if ($paramConfig.required) {
	                        throw TypeError(`Parameter "${name}" is required`);
	                    }
	                    if (defaultValue != null &&
	                        defaultValue !== false &&
	                        valueСonverters.toString) {
	                        el.setAttribute(snakeCaseName, valueСonverters.toString(defaultValue));
	                    }
	                }
	                else {
	                    if ($specifiedParams) {
	                        $specifiedParams.add(name);
	                    }
	                }
	                let valueCell = (this[cellx.KEY_VALUE_CELLS] || (this[cellx.KEY_VALUE_CELLS] = new Map())).get($paramConfig.property);
	                let value = valueСonverters.toData(rawValue, defaultValue, el);
	                if (valueCell) {
	                    valueCell.set(value);
	                }
	                else {
	                    component[KEY_PARAM_VALUES].set(name, value);
	                }
	            }
	        }
	        component[KEY_COMPONENT_PARAMS_INITED] = true;
	    }
	};

	const elementConstructors = new Map([
	    ['a', window.HTMLAnchorElement],
	    ['blockquote', window.HTMLQuoteElement],
	    ['br', window.HTMLBRElement],
	    ['caption', window.HTMLTableCaptionElement],
	    ['col', window.HTMLTableColElement],
	    ['colgroup', window.HTMLTableColElement],
	    ['datalist', window.HTMLDataListElement],
	    ['del', window.HTMLModElement],
	    ['dir', window.HTMLDirectoryElement],
	    ['dl', window.HTMLDListElement],
	    ['document', window.HTMLDocument],
	    ['fieldset', window.HTMLFieldSetElement],
	    ['frameset', window.HTMLFrameSetElement],
	    ['h1', window.HTMLHeadingElement],
	    ['h2', window.HTMLHeadingElement],
	    ['h3', window.HTMLHeadingElement],
	    ['h4', window.HTMLHeadingElement],
	    ['h5', window.HTMLHeadingElement],
	    ['h6', window.HTMLHeadingElement],
	    ['hr', window.HTMLHRElement],
	    ['iframe', window.HTMLIFrameElement],
	    ['img', window.HTMLImageElement],
	    ['ins', window.HTMLModElement],
	    ['li', window.HTMLLIElement],
	    ['menuitem', window.HTMLMenuItemElement],
	    ['ol', window.HTMLOListElement],
	    ['optgroup', window.HTMLOptGroupElement],
	    ['p', window.HTMLParagraphElement],
	    ['q', window.HTMLQuoteElement],
	    ['tbody', window.HTMLTableSectionElement],
	    ['td', window.HTMLTableCellElement],
	    ['template', window.HTMLTemplateElement],
	    ['textarea', window.HTMLTextAreaElement],
	    ['tfoot', window.HTMLTableSectionElement],
	    ['th', window.HTMLTableCellElement],
	    ['thead', window.HTMLTableSectionElement],
	    ['tr', window.HTMLTableRowElement],
	    ['ul', window.HTMLUListElement],
	    ['vhgroupv', window.HTMLUnknownElement],
	    ['vkeygen', window.HTMLUnknownElement]
	]);

	var config$1 = createCommonjsModule(function (module, exports) {
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.config = {
	    logError: (...args) => {
	        console.error(...args);
	    }
	};
	function configure(options) {
	    Object.assign(exports.config, options);
	    return exports.config;
	}
	exports.configure = configure;
	});

	unwrapExports(config$1);
	var config_1 = config$1.config;
	var config_2 = config$1.configure;

	var utils = createCommonjsModule(function (module, exports) {
	Object.defineProperty(exports, "__esModule", { value: true });

	function logError(...args) {
	    config$1.config.logError(...args);
	}
	exports.logError = logError;
	});

	unwrapExports(utils);
	var utils_1 = utils.logError;

	var dist$7 = createCommonjsModule(function (module, exports) {
	Object.defineProperty(exports, "__esModule", { value: true });


	exports.configure = config$1.configure;
	let queue;
	function run() {
	    let track = queue;
	    queue = null;
	    for (let callback of track) {
	        try {
	            callback();
	        }
	        catch (err) {
	            utils.logError(err);
	        }
	    }
	}
	function defer(callback) {
	    if (queue) {
	        queue.push(callback);
	    }
	    else {
	        queue = [callback];
	        setTimeout(run, 1);
	    }
	}
	exports.defer = defer;
	});

	unwrapExports(dist$7);
	var dist_1$7 = dist$7.configure;
	var dist_2$2 = dist$7.defer;

	var dist$8 = createCommonjsModule(function (module, exports) {
	Object.defineProperty(exports, "__esModule", { value: true });
	function moveContent(target, source) {
	    for (var child = void 0; (child = source.firstChild);) {
	        target.appendChild(child);
	    }
	    return target;
	}
	exports.moveContent = moveContent;
	});

	unwrapExports(dist$8);
	var dist_1$8 = dist$8.moveContent;

	const KEY_FROZEN_STATE = Symbol('frozenState');
	function freezeBinding(binding) {
	    let changeEvent = binding._events.get(cellx.Cell.EVENT_CHANGE);
	    binding._events.delete(cellx.Cell.EVENT_CHANGE);
	    binding[KEY_FROZEN_STATE] = {
	        changeEventListener: changeEvent.listener,
	        changeEventContext: changeEvent.context,
	        value: binding._value
	    };
	}
	function unfreezeBinding(binding) {
	    let frozenState = binding[KEY_FROZEN_STATE];
	    binding[KEY_FROZEN_STATE] = null;
	    binding.onChange(frozenState.changeEventListener, frozenState.changeEventContext);
	    if (frozenState.value !== binding._value) {
	        binding.emit(cellx.Cell.EVENT_CHANGE, {
	            prevValue: frozenState.value,
	            value: binding._value
	        });
	    }
	}
	function freezeBindings(bindings) {
	    cellx.Cell.release();
	    for (let binding of bindings) {
	        freezeBinding(binding);
	    }
	}
	function unfreezeBindings(bindings) {
	    for (let binding of bindings) {
	        unfreezeBinding(binding);
	    }
	    cellx.Cell.release();
	}

	function connectChildComponentElements(childComponents) {
	    for (let component of childComponents) {
	        component._parentComponent = undefined;
	        ComponentParams.init(component);
	        callLifecycle([
	            component.elementConnected,
	            ...component.constructor._lifecycleHooks.elementConnected,
	            ...((component._lifecycleHooks && component._lifecycleHooks.elementConnected) || [])
	        ], component);
	        component._connect();
	    }
	}

	function findChildComponents(node, childComponents) {
	    for (let child = node.firstChild; child; child = child.nextSibling) {
	        if (child.nodeType == Node.ELEMENT_NODE) {
	            let childComponent = child.$component;
	            if (childComponent) {
	                (childComponents || (childComponents = [])).push(childComponent);
	            }
	            if (child.firstChild &&
	                !(childComponent &&
	                    childComponent.constructor.bindsInputContent)) {
	                childComponents = findChildComponents(child, childComponents);
	            }
	        }
	    }
	    return childComponents || null;
	}

	function normalizeTextNodes(node) {
	    for (let child = node.firstChild; child;) {
	        switch (child.nodeType) {
	            case Node.ELEMENT_NODE: {
	                normalizeTextNodes(child);
	                child = child.nextSibling;
	                break;
	            }
	            case Node.TEXT_NODE: {
	                let nextChild = child.nextSibling;
	                if (nextChild && nextChild.nodeType == Node.TEXT_NODE) {
	                    do {
	                        child.nodeValue += nextChild.nodeValue;
	                        node.removeChild(nextChild);
	                        nextChild = child.nextSibling;
	                    } while (nextChild && nextChild.nodeType == Node.TEXT_NODE);
	                }
	                child = nextChild;
	                break;
	            }
	        }
	    }
	    return node;
	}

	const hasOwn = Object.prototype.hasOwnProperty;
	const map = Array.prototype.map;
	function callLifecycle(lifecycle, context) {
	    for (let lifecycleFn of lifecycle) {
	        let result;
	        try {
	            result = lifecycleFn.length
	                ? lifecycleFn.call(context, context)
	                : lifecycleFn.call(context);
	        }
	        catch (err) {
	            config.logError(err);
	            return;
	        }
	        if (result instanceof Promise) {
	            result.catch((err) => {
	                if (!(err instanceof InterruptError)) {
	                    config.logError(err);
	                }
	            });
	        }
	    }
	}
	let currentComponent = null;
	function onReady(lifecycleHook) {
	    ((currentComponent._lifecycleHooks || (currentComponent._lifecycleHooks = {})).ready ||
	        (currentComponent._lifecycleHooks.ready = [])).push(lifecycleHook);
	}
	function onConnected(lifecycleHook) {
	    ((currentComponent._lifecycleHooks || (currentComponent._lifecycleHooks = {})).connected ||
	        (currentComponent._lifecycleHooks.connected = [])).push(lifecycleHook);
	}
	function onDisconnected(lifecycleHook) {
	    ((currentComponent._lifecycleHooks || (currentComponent._lifecycleHooks = {}))
	        .disconnected || (currentComponent._lifecycleHooks.disconnected = [])).push(lifecycleHook);
	}
	function onElementMoved(lifecycleHook) {
	    ((currentComponent._lifecycleHooks || (currentComponent._lifecycleHooks = {}))
	        .elementMoved || (currentComponent._lifecycleHooks.elementMoved = [])).push(lifecycleHook);
	}
	class BaseComponent extends cellx.EventEmitter {
	    constructor(el) {
	        super();
	        this._disposables = new Set();
	        this._parentComponent = null;
	        this.$inputContent = null;
	        this.initializationWait = null;
	        this._initialized = false;
	        this._isReady = false;
	        this._isConnected = false;
	        this._lifecycleHooks = null;
	        currentComponent = this;
	        this[KEY_COMPONENT_SELF] = this;
	        let ctor = this.constructor;
	        if (!elementConstructors.has(ctor.elementIs)) {
	            throw TypeError('Component must be registered');
	        }
	        if (!el) {
	            el = document.createElement(dist_1(ctor.elementIs, true));
	        }
	        this.element = el;
	        el.$component = this;
	        this[KEY_PARAM_VALUES] = new Map();
	    }
	    static get bindsInputContent() {
	        return this.template !== null;
	    }
	    get ownerComponent() {
	        if (this._ownerComponent) {
	            return this._ownerComponent;
	        }
	        let component = this.parentComponent;
	        if (!component) {
	            return (this._ownerComponent = this);
	        }
	        for (let parentComponent; (parentComponent = component.parentComponent);) {
	            component = parentComponent;
	        }
	        return (this._ownerComponent = component);
	    }
	    set ownerComponent(ownerComponent) {
	        this._ownerComponent = ownerComponent;
	    }
	    get parentComponent() {
	        if (this._parentComponent !== undefined) {
	            return this._parentComponent;
	        }
	        for (let node; (node = (node || this.element).parentNode);) {
	            if (node.$component !== undefined) {
	                return (this._parentComponent = node.$component || node.rioniteComponent);
	            }
	        }
	        return (this._parentComponent = null);
	    }
	    get initialized() {
	        return this._initialized;
	    }
	    get isReady() {
	        return this._isReady;
	    }
	    get isConnected() {
	        return this._isConnected;
	    }
	    onChange(listener, context) {
	        return this.on(this.constructor.EVENT_CHANGE, listener, context);
	    }
	    offChange(listener, context) {
	        return this.off(this.constructor.EVENT_CHANGE, listener, context);
	    }
	    handleEvent(evt) {
	        super.handleEvent(evt);
	        if (evt.bubbles !== false && !evt.propagationStopped) {
	            let parentComponent = this.parentComponent;
	            if (parentComponent) {
	                parentComponent.handleEvent(evt);
	                return;
	            }
	        }
	        handleEvent(evt);
	    }
	    listenTo(target, evtType, listener, context, useCapture) {
	        if (typeof target == 'string') {
	            target = this.$(target);
	        }
	        let listenings;
	        if (typeof evtType == 'object') {
	            listenings = [];
	            if (Array.isArray(evtType)) {
	                for (let i = 0, l = evtType.length; i < l; i++) {
	                    listenings.push(this.listenTo(target, evtType[i], listener, context, useCapture));
	                }
	            }
	            else {
	                for (let evtType_ in evtType) {
	                    if (hasOwn.call(evtType, evtType_)) {
	                        listenings.push(this.listenTo(target, evtType_, evtType[evtType_], listener, context));
	                    }
	                }
	                for (let evtType_ of Object.getOwnPropertySymbols(evtType)) {
	                    listenings.push(this.listenTo(target, evtType_, evtType[evtType_], listener, context));
	                }
	            }
	        }
	        else {
	            if (Array.isArray(target) ||
	                target instanceof NodeList ||
	                target instanceof HTMLCollection) {
	                listenings = [];
	                for (let i = 0, l = target.length; i < l; i++) {
	                    listenings.push(this.listenTo(target[i], evtType, listener, context, useCapture));
	                }
	            }
	            else {
	                if (Array.isArray(listener)) {
	                    listenings = [];
	                    for (let i = 0, l = listener.length; i < l; i++) {
	                        listenings.push(this.listenTo(target, evtType, listener[i], context, useCapture));
	                    }
	                }
	                else {
	                    return this._listenTo(target, evtType, listener, context !== undefined ? context : this, useCapture || false);
	                }
	            }
	        }
	        let listening;
	        let stop = () => {
	            for (let i = listenings.length; i;) {
	                listenings[--i].stop();
	            }
	            this._disposables.delete(listening);
	        };
	        listening = {
	            stop,
	            dispose: stop
	        };
	        this._disposables.add(listening);
	        return listening;
	    }
	    _listenTo(target, evtType, listener, context, useCapture) {
	        if (!target) {
	            throw TypeError('"target" is required');
	        }
	        if (target instanceof cellx.EventEmitter) {
	            target.on(evtType, listener, context);
	        }
	        else {
	            if (target !== context) {
	                listener = listener.bind(context);
	            }
	            target.addEventListener(evtType, listener, useCapture);
	        }
	        let listening;
	        let stop = () => {
	            if (this._disposables.has(listening)) {
	                if (target instanceof cellx.EventEmitter) {
	                    target.off(evtType, listener, context);
	                }
	                else {
	                    target.removeEventListener(evtType, listener, useCapture);
	                }
	                this._disposables.delete(listening);
	            }
	        };
	        listening = {
	            stop,
	            dispose: stop
	        };
	        this._disposables.add(listening);
	        return listening;
	    }
	    setTimeout(cb, delay) {
	        let timeout;
	        let timeoutId = setTimeout(() => {
	            this._disposables.delete(timeout);
	            cb.call(this);
	        }, delay);
	        let clear = () => {
	            if (this._disposables.has(timeout)) {
	                clearTimeout(timeoutId);
	                this._disposables.delete(timeout);
	            }
	        };
	        timeout = {
	            clear,
	            dispose: clear
	        };
	        this._disposables.add(timeout);
	        return timeout;
	    }
	    setInterval(cb, delay) {
	        let interval;
	        let intervalId = setInterval(() => {
	            cb.call(this);
	        }, delay);
	        let clear = () => {
	            if (this._disposables.has(interval)) {
	                clearInterval(intervalId);
	                this._disposables.delete(interval);
	            }
	        };
	        interval = {
	            clear,
	            dispose: clear
	        };
	        this._disposables.add(interval);
	        return interval;
	    }
	    registerCallback(cb) {
	        let registeredCallback;
	        let cancel = () => {
	            this._disposables.delete(registeredCallback);
	        };
	        registeredCallback = ((...args) => {
	            if (this._disposables.has(registeredCallback)) {
	                this._disposables.delete(registeredCallback);
	                return cb.apply(this, args);
	            }
	        });
	        registeredCallback.cancel = cancel;
	        registeredCallback.dispose = cancel;
	        this._disposables.add(registeredCallback);
	        return registeredCallback;
	    }
	    $interruptIfNotConnected(value) {
	        if (!this._isConnected) {
	            throw InterruptError();
	        }
	        return value;
	    }
	    _beforeInitializationWait() { }
	    _afterInitializationWait() { }
	    connect(ownerComponent) {
	        if (ownerComponent) {
	            this._ownerComponent = ownerComponent;
	        }
	        if (this._isConnected) {
	            return this.initializationWait;
	        }
	        this._parentComponent = undefined;
	        ComponentParams.init(this);
	        callLifecycle([
	            this.elementConnected,
	            ...this.constructor._lifecycleHooks.elementConnected,
	            ...((this._lifecycleHooks && this._lifecycleHooks.elementConnected) || [])
	        ], this);
	        return this._connect();
	    }
	    _connect() {
	        this._isConnected = true;
	        if (this._initialized) {
	            if (!this._isReady) {
	                this._afterInitializationWait();
	            }
	        }
	        else {
	            currentComponent = this;
	            let initializationWait;
	            try {
	                initializationWait = this.initialize();
	            }
	            catch (err) {
	                config.logError(err);
	                return null;
	            }
	            if (initializationWait) {
	                this._beforeInitializationWait();
	                return (this.initializationWait = initializationWait.then(() => {
	                    this._initialized = true;
	                    if (this._isConnected) {
	                        this._connect();
	                    }
	                }, (err) => {
	                    if (!(err instanceof InterruptError)) {
	                        config.logError(err);
	                    }
	                }));
	            }
	            this._initialized = true;
	        }
	        let ctor = this.constructor;
	        if (this._isReady) {
	            this._unfreezeBindings();
	            let childComponents = findChildComponents(this.element);
	            if (childComponents) {
	                connectChildComponentElements(childComponents);
	            }
	        }
	        else {
	            let el = this.element;
	            if (el.className.lastIndexOf(ctor._blockNamesString, 0)) {
	                el.className = ctor._blockNamesString + el.className;
	            }
	            if (ctor.template === null) {
	                if (this.ownerComponent == this) {
	                    let contentBindingResult = [null, null, null];
	                    bindContent(el, this, this, contentBindingResult);
	                    let childComponents = contentBindingResult[0];
	                    let backBindings = contentBindingResult[2];
	                    this._bindings = contentBindingResult[1];
	                    if (childComponents) {
	                        connectChildComponentElements(childComponents);
	                    }
	                    if (backBindings) {
	                        for (let i = backBindings.length; i; i -= 3) {
	                            backBindings[i - 3].on('change:' + backBindings[i - 2], backBindings[i - 1]);
	                        }
	                    }
	                }
	                else {
	                    this._bindings = null;
	                    if (this[KEY_CHILD_COMPONENTS]) {
	                        connectChildComponentElements(this[KEY_CHILD_COMPONENTS]);
	                    }
	                }
	            }
	            else {
	                if (el.firstChild) {
	                    suppressConnectionStatusCallbacks();
	                    dist_1$8(this.$inputContent ||
	                        (this.$inputContent = document.createDocumentFragment()), normalizeTextNodes(el));
	                    resumeConnectionStatusCallbacks();
	                }
	                let contentBindingResult = [null, null, null];
	                let content = ctor.template.render(this, this, this, contentBindingResult);
	                let childComponents = contentBindingResult[0];
	                let backBindings = contentBindingResult[2];
	                this._bindings = contentBindingResult[1];
	                if (childComponents) {
	                    for (let i = childComponents.length; i;) {
	                        let childComponent = childComponents[--i];
	                        if (childComponent.element.firstChild &&
	                            childComponent.constructor.bindsInputContent) {
	                            childComponent.$inputContent = dist_1$8(document.createDocumentFragment(), childComponent.element);
	                        }
	                    }
	                }
	                suppressConnectionStatusCallbacks();
	                this.element.appendChild(content);
	                resumeConnectionStatusCallbacks();
	                if (childComponents) {
	                    connectChildComponentElements(childComponents);
	                }
	                if (backBindings) {
	                    for (let i = backBindings.length; i; i -= 3) {
	                        backBindings[i - 3].on('change:' + backBindings[i - 2], backBindings[i - 1]);
	                    }
	                }
	            }
	            callLifecycle([
	                this.ready,
	                ...this.constructor._lifecycleHooks.ready,
	                ...((this._lifecycleHooks && this._lifecycleHooks.ready) || [])
	            ], this);
	            this._isReady = true;
	        }
	        callLifecycle([
	            this.connected,
	            ...this.constructor._lifecycleHooks.connected,
	            ...((this._lifecycleHooks && this._lifecycleHooks.connected) || [])
	        ], this);
	        return this.initializationWait;
	    }
	    _disconnect() {
	        this._isConnected = false;
	        callLifecycle([
	            this.disconnected,
	            ...this.constructor._lifecycleHooks.disconnected,
	            ...((this._lifecycleHooks && this._lifecycleHooks.disconnected) || [])
	        ], this);
	        this.dispose();
	    }
	    dispose() {
	        this._freezeBindings();
	        for (let disposable of this._disposables) {
	            disposable.dispose();
	        }
	        return this;
	    }
	    _freezeBindings() {
	        if (this._bindings) {
	            freezeBindings(this._bindings);
	        }
	    }
	    _unfreezeBindings() {
	        if (this._bindings) {
	            unfreezeBindings(this._bindings);
	        }
	    }
	    _destroyBindings() {
	        let bindings = this._bindings;
	        if (bindings) {
	            for (let i = bindings.length; i;) {
	                bindings[--i].off();
	            }
	            this._bindings = null;
	        }
	    }
	    // Callbacks
	    elementConnected() { }
	    elementDisconnected() { }
	    initialize() { }
	    ready() { }
	    connected() { }
	    disconnected() { }
	    elementMoved() { }
	    // Utils
	    $(name, container) {
	        let elList = this._getElementList(name, container);
	        return (elList && elList.length
	            ? elList[0].$component || elList[0]
	            : null);
	    }
	    $$(name, container) {
	        let elList = this._getElementList(name, container);
	        return elList
	            ? map.call(elList, (el) => el.$component || el)
	            : [];
	    }
	    _getElementList(name, container) {
	        if (container) {
	            if (typeof container == 'string') {
	                container = this.$(container);
	            }
	            if (container instanceof BaseComponent) {
	                container = container.element;
	            }
	        }
	        else {
	            container = this.element;
	        }
	        let elementBlockNames = this.constructor._elementBlockNames;
	        return container.getElementsByClassName(elementBlockNames[elementBlockNames.length - 1] + '__' + name);
	    }
	}
	BaseComponent.EVENT_CHANGE = 'change';
	BaseComponent.elementExtends = null;
	BaseComponent.params = null;
	BaseComponent.i18n = null;
	BaseComponent.template = null;
	BaseComponent._lifecycleHooks = {
	    elementConnected: [],
	    elementDisconnected: [],
	    ready: [],
	    connected: [],
	    disconnected: [],
	    elementMoved: []
	};
	BaseComponent.events = null;
	BaseComponent.domEvents = null;
	const handledEvents = [
	    'change',
	    'click',
	    'dblclick',
	    'focusin',
	    'focusout',
	    'input',
	    'mousedown',
	    'mouseup',
	    'submit'
	];
	document.addEventListener('DOMContentLoaded', function onDOMContentLoaded() {
	    document.removeEventListener('DOMContentLoaded', onDOMContentLoaded);
	    for (let type of handledEvents) {
	        document.body.addEventListener(type, handleDOMEvent);
	    }
	});

	let observedAttributesFeature_ = false;
	window.customElements.define('test-observed-attributes-feature', class extends HTMLElement {
	    static get observedAttributes() {
	        return ['test'];
	    }
	    attributeChangedCallback() {
	        observedAttributesFeature_ = true;
	    }
	});
	document.createElement('test-observed-attributes-feature').setAttribute('test', '');
	const observedAttributesFeature = observedAttributesFeature_;

	const KEY_RIONITE_COMPONENT_CONSTRUCTOR = Symbol('rioniteComponentConstructor');
	const KEY_ELEMENT_CONNECTED = Symbol('elementConnected');
	let connectionStatusCallbacksSuppressed = false;
	function suppressConnectionStatusCallbacks() {
	    connectionStatusCallbacksSuppressed = true;
	}
	function resumeConnectionStatusCallbacks() {
	    connectionStatusCallbacksSuppressed = false;
	}
	const ElementProtoMixin = {
	    $component: null,
	    get rioniteComponent() {
	        return this.$component || new this.constructor[KEY_RIONITE_COMPONENT_CONSTRUCTOR](this);
	    },
	    [KEY_ELEMENT_CONNECTED]: false,
	    connectedCallback() {
	        this[KEY_ELEMENT_CONNECTED] = true;
	        if (connectionStatusCallbacksSuppressed) {
	            return;
	        }
	        let component = this.$component;
	        if (component) {
	            if (component._isConnected) {
	                if (component._parentComponent === null) {
	                    component._parentComponent = undefined;
	                    callLifecycle([
	                        component.elementConnected,
	                        ...component.constructor._lifecycleHooks
	                            .elementConnected,
	                        ...((component._lifecycleHooks &&
	                            component._lifecycleHooks.elementConnected) ||
	                            []),
	                        component.elementMoved,
	                        ...component.constructor._lifecycleHooks
	                            .elementMoved,
	                        ...((component._lifecycleHooks &&
	                            component._lifecycleHooks.elementMoved) ||
	                            [])
	                    ], component);
	                }
	                else {
	                    callLifecycle([
	                        component.elementConnected,
	                        ...component.constructor._lifecycleHooks
	                            .elementConnected,
	                        ...((component._lifecycleHooks &&
	                            component._lifecycleHooks.elementConnected) ||
	                            [])
	                    ], component);
	                }
	            }
	            else {
	                component._parentComponent = undefined;
	                ComponentParams.init(component);
	                callLifecycle([
	                    component.elementConnected,
	                    ...component.constructor._lifecycleHooks
	                        .elementConnected,
	                    ...((component._lifecycleHooks &&
	                        component._lifecycleHooks.elementConnected) ||
	                        [])
	                ], component);
	                component._connect();
	            }
	            return;
	        }
	        else {
	            component = this.rioniteComponent;
	            component._parentComponent = undefined;
	            if (component.parentComponent && component._parentComponent._isReady) {
	                ComponentParams.init(component);
	                callLifecycle([
	                    component.elementConnected,
	                    ...component.constructor._lifecycleHooks
	                        .elementConnected,
	                    ...((component._lifecycleHooks &&
	                        component._lifecycleHooks.elementConnected) ||
	                        [])
	                ], component);
	                component._connect();
	                return;
	            }
	        }
	        dist_2$2(() => {
	            if (!this[KEY_ELEMENT_CONNECTED]) {
	                return;
	            }
	            let component = this.rioniteComponent;
	            component._parentComponent = undefined;
	            if (!component._isConnected && !component.parentComponent) {
	                ComponentParams.init(component);
	                callLifecycle([
	                    component.elementConnected,
	                    ...component.constructor._lifecycleHooks
	                        .elementConnected,
	                    ...((component._lifecycleHooks &&
	                        component._lifecycleHooks.elementConnected) ||
	                        [])
	                ], component);
	                component._connect();
	            }
	        });
	    },
	    disconnectedCallback() {
	        this[KEY_ELEMENT_CONNECTED] = false;
	        if (connectionStatusCallbacksSuppressed) {
	            return;
	        }
	        let component = this.$component;
	        if (component && component._isConnected) {
	            component._parentComponent = null;
	            callLifecycle([
	                component.elementDisconnected,
	                ...component.constructor._lifecycleHooks
	                    .elementDisconnected,
	                ...((component._lifecycleHooks &&
	                    component._lifecycleHooks.elementDisconnected) ||
	                    [])
	            ], component);
	            dist_2$2(() => {
	                if (component._parentComponent === null && component._isConnected) {
	                    component._disconnect();
	                }
	            });
	        }
	    },
	    attributeChangedCallback(name, _prevRawValue, rawValue) {
	        let component = this.$component;
	        if (component && component._isReady) {
	            let $paramConfig = component.constructor[KEY_PARAMS_CONFIG].get(name);
	            if ($paramConfig.readonly) {
	                if (observedAttributesFeature) {
	                    throw TypeError(`Cannot write to readonly parameter "${$paramConfig.name}"`);
	                }
	            }
	            else {
	                let valueCell = (component[cellx.KEY_VALUE_CELLS] || (component[cellx.KEY_VALUE_CELLS] = new Map())).get($paramConfig.property);
	                let value = $paramConfig.valueСonverters.toData(rawValue, $paramConfig.default, this);
	                if (valueCell) {
	                    valueCell.set(value);
	                }
	                else {
	                    component[KEY_PARAM_VALUES].set($paramConfig.name, value);
	                }
	            }
	        }
	    }
	};

	const hasOwn$1 = Object.prototype.hasOwnProperty;
	const push = Array.prototype.push;
	const componentParamTypeMap = new Map([
	    ['boolean', Boolean],
	    ['number', Number],
	    ['string', String]
	]);
	const componentParamTypeMap2 = new Map([
	    [Boolean, 'boolean'],
	    [Number, 'number'],
	    [String, 'string']
	]);
	function inheritProperty(target, source, name, depth) {
	    let obj = target[name];
	    let parentObj = source[name];
	    if (obj && parentObj && obj != parentObj) {
	        let inheritedObj = (target[name] = { __proto__: parentObj });
	        for (let key in obj) {
	            if (hasOwn$1.call(obj, key)) {
	                inheritedObj[key] = obj[key];
	                if (depth) {
	                    inheritProperty(inheritedObj, parentObj, key, depth - 1);
	                }
	            }
	        }
	    }
	}
	function registerComponent(componentCtor) {
	    var _a, _b;
	    let elIs = componentCtor.hasOwnProperty('elementIs')
	        ? componentCtor.elementIs
	        : (componentCtor.elementIs = componentCtor.name);
	    if (!elIs) {
	        throw TypeError('Static property "elementIs" is required');
	    }
	    let kebabCaseElIs = dist_1(elIs, true);
	    if (componentConstructors.has(kebabCaseElIs)) {
	        throw TypeError(`Component "${kebabCaseElIs}" already registered`);
	    }
	    let componentProto = componentCtor.prototype;
	    let parentComponentCtor = Object.getPrototypeOf(componentProto)
	        .constructor;
	    inheritProperty(componentCtor, parentComponentCtor, 'params', 0);
	    componentCtor[KEY_PARAMS_CONFIG] = null;
	    let paramsConfig = componentCtor.params;
	    for (let name in paramsConfig) {
	        let paramConfig = paramsConfig[name];
	        if (paramConfig === null || paramConfig === Object.prototype[name]) {
	            continue;
	        }
	        let snakeCaseName = dist_1$1(name, true);
	        let propName;
	        let type;
	        let valueСonverters;
	        let defaultValue;
	        let required;
	        let readonly;
	        if (typeof paramConfig == 'object') {
	            propName = paramConfig.property || name;
	            type = paramConfig.type;
	            defaultValue = paramConfig.default;
	            required = paramConfig.required || false;
	            readonly = paramConfig.readonly || false;
	        }
	        else {
	            propName = name;
	            type = paramConfig;
	            required = readonly = false;
	        }
	        if (!type) {
	            type =
	                (defaultValue !== undefined && componentParamTypeMap.get(typeof defaultValue)) ||
	                    Object;
	        }
	        valueСonverters = componentParamValueСonverters.get(type);
	        if (!valueСonverters) {
	            throw TypeError('Unsupported parameter type');
	        }
	        if (defaultValue !== undefined &&
	            type != Object &&
	            type != eval &&
	            componentParamTypeMap2.get(type) != typeof defaultValue) {
	            throw TypeError('Specified type does not match type of defaultValue');
	        }
	        let $paramConfig = {
	            name,
	            property: propName,
	            type,
	            valueСonverters,
	            default: defaultValue,
	            required,
	            readonly,
	            paramConfig
	        };
	        (componentCtor[KEY_PARAMS_CONFIG] || (componentCtor[KEY_PARAMS_CONFIG] = new Map()))
	            .set(name, $paramConfig)
	            .set(snakeCaseName, $paramConfig);
	        let descriptor = {
	            configurable: true,
	            enumerable: true,
	            get() {
	                let self = this[KEY_COMPONENT_SELF];
	                let valueCell = (self[cellx.KEY_VALUE_CELLS] || (self[cellx.KEY_VALUE_CELLS] = new Map())).get(propName);
	                if (valueCell) {
	                    return valueCell.get();
	                }
	                let value = self[KEY_PARAM_VALUES].get(name);
	                if (cellx.Cell.currentlyPulling || cellx.EventEmitter.currentlySubscribing) {
	                    self[KEY_PARAM_VALUES].delete(name);
	                    valueCell = new cellx.Cell(null, {
	                        context: self,
	                        value
	                    });
	                    self[cellx.KEY_VALUE_CELLS].set(propName, valueCell);
	                    if (cellx.Cell.currentlyPulling) {
	                        return valueCell.get();
	                    }
	                }
	                return value;
	            },
	            set(value) {
	                let self = this[KEY_COMPONENT_SELF];
	                let valueCell = (self[cellx.KEY_VALUE_CELLS] || (self[cellx.KEY_VALUE_CELLS] = new Map())).get(propName);
	                if (self[KEY_COMPONENT_PARAMS_INITED]) {
	                    if (readonly) {
	                        if (value !==
	                            (valueCell ? valueCell.get() : self[KEY_PARAM_VALUES].get(name))) {
	                            throw TypeError(`Parameter "${name}" is readonly`);
	                        }
	                        return;
	                    }
	                    if ($paramConfig.valueСonverters.toString) {
	                        let rawValue = $paramConfig.valueСonverters.toString(value, $paramConfig.default);
	                        if (rawValue === null) {
	                            self.element.removeAttribute(snakeCaseName);
	                        }
	                        else {
	                            self.element.setAttribute(snakeCaseName, rawValue);
	                        }
	                    }
	                }
	                if (valueCell) {
	                    valueCell.set(value);
	                }
	                else {
	                    self[KEY_PARAM_VALUES].set(name, value);
	                }
	            }
	        };
	        Object.defineProperty(componentProto, propName, descriptor);
	    }
	    inheritProperty(componentCtor, parentComponentCtor, 'i18n', 0);
	    componentCtor._blockNamesString = elIs + ' ' + (parentComponentCtor._blockNamesString || '');
	    componentCtor._elementBlockNames = [elIs];
	    if (parentComponentCtor._elementBlockNames) {
	        push.apply(componentCtor._elementBlockNames, parentComponentCtor._elementBlockNames);
	    }
	    let template = componentCtor.template;
	    if (template !== null) {
	        if (template === parentComponentCtor.template) {
	            componentCtor.template = template.extend('', {
	                blockName: elIs
	            });
	        }
	        else if (template instanceof Template) {
	            template.setBlockName(componentCtor._elementBlockNames);
	        }
	        else {
	            componentCtor.template = parentComponentCtor.template
	                ? parentComponentCtor.template.extend(template, {
	                    blockName: elIs
	                })
	                : new Template(template, { blockName: componentCtor._elementBlockNames });
	        }
	    }
	    inheritProperty(componentCtor, parentComponentCtor, 'events', 1);
	    inheritProperty(componentCtor, parentComponentCtor, 'domEvents', 1);
	    let elExtends = componentCtor.elementExtends;
	    let parentElCtor;
	    if (elExtends) {
	        parentElCtor =
	            elementConstructors.get(elExtends) || window[`HTML${dist_1$6(elExtends)}Element`];
	        if (!parentElCtor) {
	            throw TypeError(`Component "${elExtends}" is not registered`);
	        }
	    }
	    else {
	        parentElCtor = HTMLElement;
	    }
	    let elCtor = (_b = class extends parentElCtor {
	            static get observedAttributes() {
	                let paramsConfig = componentCtor.params;
	                let attrs = [];
	                for (let name in paramsConfig) {
	                    if (paramsConfig[name] !== null && paramsConfig[name] !== Object.prototype[name]) {
	                        attrs.push(dist_1$1(name, true));
	                    }
	                }
	                return attrs;
	            }
	        },
	        _a = KEY_RIONITE_COMPONENT_CONSTRUCTOR,
	        _b[_a] = componentCtor,
	        _b);
	    let elProto = elCtor.prototype;
	    elProto.constructor = elCtor;
	    let names = Object.getOwnPropertyNames(ElementProtoMixin);
	    for (let name of names) {
	        Object.defineProperty(elProto, name, Object.getOwnPropertyDescriptor(ElementProtoMixin, name));
	    }
	    names = Object.getOwnPropertySymbols(ElementProtoMixin);
	    for (let name of names) {
	        Object.defineProperty(elProto, name, Object.getOwnPropertyDescriptor(ElementProtoMixin, name));
	    }
	    componentConstructors.set(elIs, componentCtor).set(kebabCaseElIs, componentCtor);
	    elementConstructors.set(elIs, elCtor);
	    window.customElements.define(kebabCaseElIs, elCtor, elExtends ? { extends: elExtends } : undefined);
	    return componentCtor;
	}

	function Component(config) {
	    return (componentCtor) => {
	        if (config) {
	            if (config.elementIs !== undefined) {
	                componentCtor.elementIs = config.elementIs;
	            }
	            if (config.elementExtends !== undefined) {
	                componentCtor.elementExtends = config.elementExtends;
	            }
	            if (config.params !== undefined) {
	                componentCtor.params = config.params;
	            }
	            if (config.i18n !== undefined) {
	                componentCtor.i18n = config.i18n;
	            }
	            if (config.template !== undefined) {
	                componentCtor.template = config.template;
	            }
	            if (config.events !== undefined) {
	                componentCtor.events = config.events;
	            }
	            if (config.domEvents !== undefined) {
	                componentCtor.domEvents = config.domEvents;
	            }
	        }
	        registerComponent(componentCtor);
	    };
	}

	function Param(target, propName, _propDesc, name, config) {
	    if (typeof propName != 'string') {
	        if (target && typeof target != 'string') {
	            config = target;
	        }
	        else {
	            name = target;
	            config = propName;
	        }
	        return (target, propName, propDesc) => Param(target, propName, propDesc, name, config);
	    }
	    if (!config) {
	        config = {};
	    }
	    else if (typeof config == 'function') {
	        config = { type: config };
	    }
	    config.property = propName;
	    let ctor = target.constructor;
	    ((ctor.hasOwnProperty('params') && ctor.params) || (ctor.params = {}))[name || propName] = config;
	}

	const hasOwn$2 = Object.prototype.hasOwnProperty;
	function Listen(evtType, optionsOrTarget, useCapture) {
	    return (target, methodName, _methodDesc) => {
	        let options = optionsOrTarget &&
	            typeof optionsOrTarget == 'object' &&
	            !Array.isArray(optionsOrTarget) &&
	            Object.getPrototypeOf(optionsOrTarget) === Object.prototype
	            ? optionsOrTarget
	            : null;
	        let listeningTarget = options
	            ? options.target
	            : optionsOrTarget;
	        if (options) {
	            useCapture = options.useCapture;
	        }
	        let lifecycleHooks = hasOwn$2.call(target.constructor, '_lifecycleHooks')
	            ? target.constructor._lifecycleHooks
	            : (target.constructor._lifecycleHooks = {
	                __proto__: target.constructor._lifecycleHooks
	            });
	        (hasOwn$2.call(lifecycleHooks, 'connected')
	            ? lifecycleHooks.connected
	            : (lifecycleHooks.connected = lifecycleHooks.connected.slice())).push((component) => {
	            let target = listeningTarget;
	            if (target) {
	                if (typeof target == 'function') {
	                    target = target.call(component, component);
	                }
	                if (typeof target == 'string' && target.charAt(0) == '@') {
	                    target = Function(`return this.${target.slice(1)};`).call(component);
	                }
	            }
	            else {
	                target = component;
	            }
	            component.listenTo(target, typeof evtType == 'function'
	                ? evtType.call(component, component.constructor)
	                : evtType, component[methodName], component, useCapture);
	        });
	    };
	}

	function Callback(target, methodName, methodDesc) {
	    if (!methodDesc) {
	        methodDesc = Object.getOwnPropertyDescriptor(target, methodName);
	    }
	    let method = methodDesc.value;
	    methodDesc.value = function (...args) {
	        return this._isConnected ? method.call(this, ...args) : Promise.resolve();
	    };
	    return methodDesc;
	}

	function Interruptible(target, methodName, methodDesc) {
	    if (!methodDesc) {
	        methodDesc = Object.getOwnPropertyDescriptor(target, methodName);
	    }
	    let method = methodDesc.value;
	    methodDesc.value = function (...args) {
	        let result = method.call(this, ...args);
	        result.catch((err) => {
	            if (!(err instanceof InterruptError)) {
	                throw err;
	            }
	        });
	        return result;
	    };
	    return methodDesc;
	}

	/*! *****************************************************************************
	Copyright (c) Microsoft Corporation.

	Permission to use, copy, modify, and/or distribute this software for any
	purpose with or without fee is hereby granted.

	THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
	REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
	AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
	INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
	LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
	OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
	PERFORMANCE OF THIS SOFTWARE.
	***************************************************************************** */

	function __decorate(decorators, target, key, desc) {
	    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
	    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
	    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
	    return c > 3 && r && Object.defineProperty(target, key, r), r;
	}

	const nextTick = (() => {
	    const global = Function('return this;')();
	    if (global.process &&
	        global.process.toString() == '[object process]' &&
	        global.process.nextTick) {
	        return global.process.nextTick;
	    }
	    if (global.setImmediate && global.setImmediate.toString().indexOf('[native code]') != -1) {
	        const setImmediate = global.setImmediate;
	        return (cb) => {
	            setImmediate(cb);
	        };
	    }
	    const promise = Promise.resolve();
	    return (cb) => {
	        promise.then(cb);
	    };
	})();

	const cache$3 = new Map();
	function compileBinding(binding, cacheKey) {
	    if (!cache$3.has(cacheKey)) {
	        let inner = Function('formatters, KEY_COMPONENT_SELF', `var tmp; return ${bindingToJSExpression(binding[0])};`);
	        cache$3.set(cacheKey, function () {
	            return inner.call(this, formatters, KEY_COMPONENT_SELF);
	        });
	    }
	    return cache$3.get(cacheKey);
	}

	function removeNodes(nodes) {
	    let nodeCount = nodes.length;
	    if (nodeCount == 1) {
	        let node = nodes[0];
	        if (node.parentNode) {
	            node.parentNode.removeChild(node);
	        }
	    }
	    else {
	        for (let i = 0; i < nodeCount; i++) {
	            let node = nodes[i];
	            if (node.parentNode) {
	                node.parentNode.removeChild(node);
	            }
	        }
	    }
	}

	var RnRepeat_1;
	const slice = Array.prototype.slice;
	const reForAttrValue = RegExp(`^\\s*(${namePattern})\\s+in\\s+(${keypathPattern}(?:\\s*(.*\\S))?)\\s*$`);
	function getItem(list, index) {
	    return Array.isArray(list) ? list[index] : list.get(index);
	}
	function insertBefore(nodes, beforeNode, parentNode) {
	    let nodeCount = nodes.length;
	    if (nodeCount == 1) {
	        parentNode.insertBefore(nodes[0], beforeNode);
	        return nodes[0];
	    }
	    for (let i = 0; i < nodeCount; i++) {
	        parentNode.insertBefore(nodes[i], beforeNode);
	    }
	    return nodes[nodeCount - 1];
	}
	function offBindings(bindings) {
	    if (bindings) {
	        for (let i = bindings.length; i;) {
	            bindings[--i].off();
	        }
	    }
	}
	function deactivateChildComponents(childComponents) {
	    if (childComponents) {
	        for (let i = childComponents.length; i;) {
	            let childComponent = childComponents[--i];
	            if (childComponent instanceof exports.RnIfThen || childComponent instanceof exports.RnRepeat) {
	                childComponent._deactivate();
	            }
	        }
	    }
	}
	exports.RnRepeat = RnRepeat_1 = class RnRepeat extends BaseComponent {
	    constructor() {
	        super(...arguments);
	        this._active = false;
	    }
	    static get bindsInputContent() {
	        return true;
	    }
	    elementConnected() {
	        if (this._active) {
	            return;
	        }
	        this._active = true;
	        if (!this._initialized) {
	            this._prevList = [];
	            if (this.$specifiedParams.has('in')) {
	                this._itemName = this.paramFor;
	                this._list = this.paramIn;
	            }
	            else if (this.paramInKeypath) {
	                this._itemName = this.paramFor;
	                this._list = new cellx.Cell(compileKeypath(this.paramInKeypath), {
	                    context: this.$context
	                });
	            }
	            else {
	                let for_ = this.paramFor.match(reForAttrValue);
	                if (!for_) {
	                    throw SyntaxError(`Invalid value in parameter "for" (${this.paramFor})`);
	                }
	                let getList;
	                if (for_[3]) {
	                    let inListAST = parseTemplateNodeValue(`{${for_[2]}}`);
	                    if (!inListAST || inListAST.length != 1) {
	                        throw SyntaxError(`Invalid value in parameter "for" (${this.paramFor})`);
	                    }
	                    getList = compileBinding(inListAST, for_[2]);
	                }
	                else {
	                    getList = compileKeypath(for_[2]);
	                }
	                this._itemName = for_[1];
	                this._list = new cellx.Cell(getList, { context: this.$context });
	            }
	            this._$itemsMap = new Map();
	            this._initialized = true;
	        }
	        if (this.element[KEY_CONTENT_TEMPLATE]) {
	            let list = this._list;
	            if (list && (list instanceof cellx.Cell || list instanceof cellx.ObservableList)) {
	                list.onChange(this._onListChange, this);
	            }
	            this._render(false);
	        }
	    }
	    elementDisconnected() {
	        nextTick(() => {
	            if (!this.element[KEY_ELEMENT_CONNECTED]) {
	                this._deactivate();
	            }
	        });
	    }
	    _onListChange() {
	        if (this.element.parentNode) {
	            this._render(true);
	        }
	    }
	    _connect() {
	        this._isConnected = true;
	        return null;
	    }
	    _disconnect() {
	        this._isConnected = false;
	    }
	    _render(fromChangeEvent) {
	        let prevList = this._prevList;
	        let prevListLength = prevList.length;
	        let list = this._list instanceof cellx.Cell ? this._list.get() : this._list;
	        let $itemsMap = this._$itemsMap;
	        let trackBy = this.trackBy;
	        let startIndex = 0;
	        let changed = false;
	        if (list) {
	            let new$ItemsMap = new Map();
	            let removedValues = new Map();
	            let el = this.element;
	            let lastNode = el;
	            for (let i = 0, l = list.length; i < l;) {
	                let item = getItem(list, i);
	                let value = trackBy ? item[trackBy] : item;
	                let $items = $itemsMap.get(value);
	                if ($items) {
	                    if (removedValues.has(value)) {
	                        let $item = $items.shift();
	                        if (new$ItemsMap.has(value)) {
	                            new$ItemsMap.get(value).push($item);
	                        }
	                        else {
	                            new$ItemsMap.set(value, [$item]);
	                        }
	                        if (!$items.length) {
	                            $itemsMap.delete(value);
	                        }
	                        let removedCount = removedValues.get(value);
	                        if (removedCount == 1) {
	                            removedValues.delete(value);
	                        }
	                        else {
	                            removedValues.set(value, removedCount - 1);
	                        }
	                        $item.item.set(item);
	                        $item.index.set(i);
	                        lastNode = insertBefore($item.nodes, lastNode == el && this.beforeTemplate ? el : lastNode.nextSibling, el.parentNode);
	                        i++;
	                    }
	                    else {
	                        let foundIndex;
	                        for (let j = startIndex;; j++) {
	                            if (foundIndex === undefined) {
	                                if (value === (trackBy ? prevList[j][trackBy] : prevList[j])) {
	                                    let $item = $items.shift();
	                                    if (new$ItemsMap.has(value)) {
	                                        new$ItemsMap.get(value).push($item);
	                                    }
	                                    else {
	                                        new$ItemsMap.set(value, [$item]);
	                                    }
	                                    if (!$items.length) {
	                                        $itemsMap.delete(value);
	                                    }
	                                    if (j == startIndex) {
	                                        lastNode = $item.nodes[$item.nodes.length - 1];
	                                        startIndex++;
	                                        i++;
	                                        break;
	                                    }
	                                    foundIndex = j;
	                                }
	                            }
	                            else {
	                                let foundCount = j - foundIndex;
	                                let ii = i + foundCount;
	                                if (ii < l) {
	                                    let iiValue;
	                                    if (j < prevListLength &&
	                                        (trackBy
	                                            ? (iiValue = getItem(list, ii)[trackBy]) ===
	                                                prevList[j][trackBy]
	                                            : (iiValue = getItem(list, ii)) === prevList[j])) {
	                                        let ii$Items = $itemsMap.get(iiValue);
	                                        if (new$ItemsMap.has(iiValue)) {
	                                            new$ItemsMap.get(iiValue).push(ii$Items.shift());
	                                        }
	                                        else {
	                                            new$ItemsMap.set(iiValue, [ii$Items.shift()]);
	                                        }
	                                        if (!ii$Items.length) {
	                                            $itemsMap.delete(iiValue);
	                                        }
	                                        continue;
	                                    }
	                                    if (foundCount < foundIndex - startIndex) {
	                                        for (let k = foundIndex; k < j; k++) {
	                                            let kValue = trackBy
	                                                ? prevList[k][trackBy]
	                                                : prevList[k];
	                                            let k$Item = new$ItemsMap.get(kValue);
	                                            k$Item[0].item.set(item);
	                                            k$Item[0].index.set(i);
	                                            lastNode = insertBefore(k$Item[0].nodes, lastNode == el && this.beforeTemplate
	                                                ? el
	                                                : lastNode.nextSibling, el.parentNode);
	                                        }
	                                        prevList.splice(foundIndex, foundCount);
	                                        prevListLength -= foundCount;
	                                        i = ii;
	                                        changed = true;
	                                        break;
	                                    }
	                                }
	                                for (let k = startIndex; k < foundIndex; k++) {
	                                    let kValue = trackBy ? prevList[k][trackBy] : prevList[k];
	                                    let index = removedValues.get(kValue) || 0;
	                                    removeNodes($itemsMap.get(kValue)[index].nodes);
	                                    removedValues.set(kValue, index + 1);
	                                }
	                                let lastFoundValue = trackBy
	                                    ? prevList[j - 1][trackBy]
	                                    : prevList[j - 1];
	                                let nodes = new$ItemsMap.get(lastFoundValue)[removedValues.get(lastFoundValue) || 0].nodes;
	                                lastNode = nodes[nodes.length - 1];
	                                startIndex = j;
	                                i = ii;
	                                changed = true;
	                                break;
	                            }
	                        }
	                    }
	                }
	                else {
	                    let itemCell = new cellx.Cell(null, { value: item });
	                    let indexCell = new cellx.Cell(i);
	                    let contentBindingResult = [null, null, null];
	                    let content = this.element[KEY_CONTENT_TEMPLATE].render(null, this.ownerComponent, Object.create(this.$context, {
	                        [this._itemName]: {
	                            configurable: true,
	                            enumerable: true,
	                            get: ((itemCell) => () => itemCell.get())(itemCell)
	                        },
	                        $index: {
	                            configurable: true,
	                            enumerable: true,
	                            get: ((indexCell) => () => indexCell.get())(indexCell)
	                        }
	                    }), contentBindingResult);
	                    let childComponents = contentBindingResult[0];
	                    let backBindings = contentBindingResult[2];
	                    let new$Item = {
	                        item: itemCell,
	                        index: indexCell,
	                        nodes: slice.call(content.childNodes),
	                        bindings: contentBindingResult[1],
	                        childComponents
	                    };
	                    if (new$ItemsMap.has(value)) {
	                        new$ItemsMap.get(value).push(new$Item);
	                    }
	                    else {
	                        new$ItemsMap.set(value, [new$Item]);
	                    }
	                    if (childComponents) {
	                        for (let i = childComponents.length; i;) {
	                            let childComponent = childComponents[--i];
	                            if (childComponent.element.firstChild &&
	                                childComponent.constructor
	                                    .bindsInputContent) {
	                                childComponent.$inputContent = dist_1$8(document.createDocumentFragment(), childComponent.element);
	                            }
	                        }
	                    }
	                    let newLastNode = content.lastChild;
	                    suppressConnectionStatusCallbacks();
	                    lastNode.parentNode.insertBefore(content, lastNode == el && this.beforeTemplate ? el : lastNode.nextSibling);
	                    resumeConnectionStatusCallbacks();
	                    lastNode = newLastNode;
	                    if (childComponents) {
	                        connectChildComponentElements(childComponents);
	                    }
	                    if (backBindings) {
	                        for (let i = backBindings.length; i; i -= 3) {
	                            backBindings[i - 3].on('change:' + backBindings[i - 2], backBindings[i - 1]);
	                        }
	                    }
	                    changed = true;
	                    i++;
	                }
	            }
	            if (removedValues.size) {
	                (($itemsMap) => {
	                    removedValues.forEach((_removedCount, value) => {
	                        for (let $item of $itemsMap.get(value)) {
	                            offBindings($item.bindings);
	                            deactivateChildComponents($item.childComponents);
	                        }
	                    });
	                })($itemsMap);
	            }
	            this._$itemsMap = new$ItemsMap;
	        }
	        else {
	            this._$itemsMap = new Map();
	        }
	        if (startIndex < prevListLength) {
	            for (let i = startIndex; i < prevListLength; i++) {
	                let value = trackBy ? prevList[i][trackBy] : prevList[i];
	                for (let $item of $itemsMap.get(value)) {
	                    removeNodes($item.nodes);
	                    offBindings($item.bindings);
	                    deactivateChildComponents($item.childComponents);
	                }
	            }
	        }
	        else if (!changed) {
	            return;
	        }
	        this._prevList = list ? (Array.isArray(list) ? list.slice() : list.toArray()) : [];
	        if (fromChangeEvent) {
	            cellx.Cell.release();
	            this.emit(RnRepeat_1.EVENT_CHANGE);
	        }
	    }
	    _deactivate() {
	        if (!this._active) {
	            return;
	        }
	        this._active = false;
	        let list = this._list;
	        if (list && (list instanceof cellx.Cell || list instanceof cellx.ObservableList)) {
	            list.offChange(this._onListChange, this);
	        }
	        let prevList = this._prevList;
	        let $itemsMap = this._$itemsMap;
	        let trackBy = this.trackBy;
	        for (let i = 0, l = prevList.length; i < l; i++) {
	            let value = trackBy ? prevList[i][trackBy] : prevList[i];
	            for (let $item of $itemsMap.get(value)) {
	                removeNodes($item.nodes);
	                offBindings($item.bindings);
	                deactivateChildComponents($item.childComponents);
	            }
	        }
	        $itemsMap.clear();
	    }
	};
	exports.RnRepeat.EVENT_CHANGE = Symbol('change');
	exports.RnRepeat = RnRepeat_1 = __decorate([
	    Component({
	        elementIs: 'RnRepeat',
	        elementExtends: 'template',
	        params: {
	            for: { property: 'paramFor', type: String, required: true, readonly: true },
	            in: { property: 'paramIn', readonly: true },
	            inKeypath: { property: 'paramInKeypath', type: String, readonly: true },
	            trackBy: { type: String, readonly: true },
	            beforeTemplate: { type: Boolean, readonly: true }
	        }
	    })
	], exports.RnRepeat);

	var RnIfThen_1;
	const slice$1 = Array.prototype.slice;
	const reKeypath$1 = RegExp(`^${keypathPattern}$`);
	exports.RnIfThen = RnIfThen_1 = class RnIfThen extends BaseComponent {
	    constructor() {
	        super(...arguments);
	        this._elseMode = false;
	        this._nodes = null;
	        this._childComponents = null;
	        this._active = false;
	    }
	    static get bindsInputContent() {
	        return true;
	    }
	    elementConnected() {
	        if (this._active) {
	            return;
	        }
	        this._active = true;
	        if (!this._initialized) {
	            let if_ = this.paramIf.trim();
	            let getIfValue;
	            if (reKeypath$1.test(if_)) {
	                getIfValue = compileKeypath(if_);
	            }
	            else {
	                let ifAST = parseTemplateNodeValue(`{${if_}}`);
	                if (!ifAST || ifAST.length != 1) {
	                    throw SyntaxError(`Invalid value in parameter "if" (${if_})`);
	                }
	                getIfValue = compileBinding(ifAST, if_);
	            }
	            this._if = new cellx.Cell(function () {
	                return !!getIfValue.call(this);
	            }, { context: this.$context });
	            this._initialized = true;
	        }
	        if (this.element[KEY_CONTENT_TEMPLATE]) {
	            this._if.onChange(this._onIfChange, this);
	            this._render(false);
	        }
	    }
	    elementDisconnected() {
	        nextTick(() => {
	            if (!this.element[KEY_ELEMENT_CONNECTED]) {
	                this._deactivate();
	            }
	        });
	    }
	    _onIfChange() {
	        if (this.element.parentNode) {
	            this._render(true);
	        }
	    }
	    _connect() {
	        this._isConnected = true;
	        return null;
	    }
	    _disconnect() {
	        this._isConnected = false;
	    }
	    _render(changed) {
	        if (this._elseMode
	            ? !this._if.get() && (this._if.get() !== undefined || this.withUndefined)
	            : this._if.get()) {
	            let contentBindingResult = [null, null, null];
	            let content = this.element[KEY_CONTENT_TEMPLATE].render(null, this.ownerComponent, this.$context, contentBindingResult);
	            let childComponents = contentBindingResult[0];
	            let backBindings = contentBindingResult[2];
	            this._nodes = slice$1.call(content.childNodes);
	            this._childComponents = childComponents;
	            this._bindings = contentBindingResult[1];
	            if (childComponents) {
	                for (let i = childComponents.length; i;) {
	                    let childComponent = childComponents[--i];
	                    if (childComponent.element.firstChild &&
	                        childComponent.constructor.bindsInputContent) {
	                        childComponent.$inputContent = dist_1$8(document.createDocumentFragment(), childComponent.element);
	                    }
	                }
	            }
	            suppressConnectionStatusCallbacks();
	            this.element.parentNode.insertBefore(content, this.element);
	            resumeConnectionStatusCallbacks();
	            if (childComponents) {
	                connectChildComponentElements(childComponents);
	            }
	            if (backBindings) {
	                for (let i = backBindings.length; i; i -= 3) {
	                    backBindings[i - 3].on('change:' + backBindings[i - 2], backBindings[i - 1]);
	                }
	            }
	        }
	        else {
	            let nodes = this._nodes;
	            if (nodes) {
	                removeNodes(nodes);
	                this._destroyBindings();
	                this._nodes = null;
	                this._deactivateChildComponents();
	            }
	        }
	        if (changed) {
	            cellx.Cell.release();
	            this.emit(RnIfThen_1.EVENT_CHANGE);
	        }
	    }
	    _deactivate() {
	        if (!this._active) {
	            return;
	        }
	        this._active = false;
	        this._if.offChange(this._onIfChange, this);
	        let nodes = this._nodes;
	        if (nodes) {
	            removeNodes(nodes);
	            this._destroyBindings();
	            this._nodes = null;
	            this._deactivateChildComponents();
	        }
	    }
	    _deactivateChildComponents() {
	        let childComponents = this._childComponents;
	        if (childComponents) {
	            for (let i = childComponents.length; i;) {
	                let childComponent = childComponents[--i];
	                if (childComponent instanceof RnIfThen_1 || childComponent instanceof exports.RnRepeat) {
	                    childComponent._deactivate();
	                }
	            }
	        }
	        this._childComponents = null;
	    }
	};
	exports.RnIfThen.EVENT_CHANGE = Symbol('change');
	exports.RnIfThen = RnIfThen_1 = __decorate([
	    Component({
	        elementIs: 'RnIfThen',
	        elementExtends: 'template',
	        params: {
	            if: { property: 'paramIf', type: String, required: true, readonly: true },
	            withUndefined: { type: Boolean, readonly: true }
	        }
	    })
	], exports.RnIfThen);

	exports.RnIfElse = class RnIfElse extends exports.RnIfThen {
	    constructor() {
	        super(...arguments);
	        this._elseMode = true;
	    }
	};
	exports.RnIfElse = __decorate([
	    Component({
	        elementIs: 'RnIfElse',
	        elementExtends: 'template'
	    })
	], exports.RnIfElse);

	const IE = !!document.documentMode || navigator.userAgent.indexOf('Edge/') != -1;
	function cloneNode(node) {
	    let copy;
	    switch (node.nodeType) {
	        case Node.DOCUMENT_FRAGMENT_NODE: {
	            copy = document.createDocumentFragment();
	            for (let child = node.firstChild; child; child = child.nextSibling) {
	                copy.appendChild(cloneNode(child));
	            }
	            break;
	        }
	        case Node.ELEMENT_NODE: {
	            let tagName = node.tagName.toLowerCase();
	            let is = node.getAttribute('is');
	            if (is) {
	                copy = window.innerHTML(document.createElement('div'), `<${tagName} is="${is}">`).firstChild;
	            }
	            else if (IE) {
	                copy = window.innerHTML(document.createElement('div'), `<${tagName}>`)
	                    .firstChild;
	            }
	            else {
	                copy = document.createElementNS(node.namespaceURI, tagName);
	            }
	            if ((tagName == 'template' || tagName == 'rn-slot') && node[KEY_CONTENT_TEMPLATE]) {
	                copy[KEY_CONTENT_TEMPLATE] = node[KEY_CONTENT_TEMPLATE];
	            }
	            if (node[KEY_EVENTS]) {
	                copy[KEY_EVENTS] = node[KEY_EVENTS];
	            }
	            if (node[KEY_DOM_EVENTS]) {
	                copy[KEY_DOM_EVENTS] = node[KEY_DOM_EVENTS];
	            }
	            let attrs = node.attributes;
	            for (let i = 0, l = attrs.length; i < l; i++) {
	                let attr = attrs.item(i);
	                if (!is || attr.name != 'is') {
	                    copy.setAttributeNS(attr.namespaceURI, attr.name, attr.value);
	                }
	            }
	            for (let child = node.firstChild; child; child = child.nextSibling) {
	                copy.appendChild(cloneNode(child));
	            }
	            break;
	        }
	        case Node.TEXT_NODE: {
	            copy = document.createTextNode(node.nodeValue);
	            break;
	        }
	    }
	    return copy;
	}

	const KEY_SLOTS_CONTENT = Symbol('slotsContent');
	exports.RnSlot = class RnSlot extends BaseComponent {
	    static get bindsInputContent() {
	        return true;
	    }
	    _connect() {
	        this._isConnected = true;
	        if (this._isReady) {
	            this._unfreezeBindings();
	            if (this._childComponents) {
	                connectChildComponentElements(this._childComponents);
	            }
	            return null;
	        }
	        let ownerComponent = this.ownerComponent;
	        let contentOwnerComponent = ownerComponent.ownerComponent;
	        let ownerComponentInputContent = ownerComponent.$inputContent;
	        let el = this.element;
	        let cloneContent = this.cloneContent;
	        let content;
	        let childComponents;
	        let bindings;
	        let backBindings;
	        if (ownerComponentInputContent || !cloneContent) {
	            let name = this.name;
	            let forTag;
	            let for_;
	            if (!name) {
	                forTag = this.forTag;
	                if (forTag) {
	                    forTag = forTag.toUpperCase();
	                }
	                else {
	                    for_ = this.paramFor;
	                }
	            }
	            let key = nextUid.getUID(ownerComponent) +
	                '/' +
	                (name ? 'slot:' + name : forTag ? 'tag:' + forTag : for_ || '');
	            if (name || forTag || for_) {
	                let slotsContent;
	                if (!cloneContent &&
	                    (slotsContent = contentOwnerComponent[KEY_SLOTS_CONTENT]) &&
	                    slotsContent.has(key)) {
	                    let container = slotsContent.get(key);
	                    if (container.firstChild) {
	                        content = dist_1$8(document.createDocumentFragment(), container);
	                        slotsContent.set(key, el);
	                        childComponents = container.$component._childComponents;
	                        bindings = container.$component._bindings;
	                    }
	                }
	                else if (ownerComponentInputContent) {
	                    if (for_ && for_.indexOf('__') == -1) {
	                        let elementBlockNames = ownerComponent.constructor
	                            ._elementBlockNames;
	                        for_ = elementBlockNames[elementBlockNames.length - 1] + '__' + for_;
	                    }
	                    let selectedElements = ownerComponentInputContent.querySelectorAll(for_ ? '.' + for_ : forTag || `[slot=${name}]`);
	                    let selectedElementCount = selectedElements.length;
	                    if (selectedElementCount) {
	                        content = document.createDocumentFragment();
	                        for (let i = 0; i < selectedElementCount; i++) {
	                            content.appendChild(cloneContent ? cloneNode(selectedElements[i]) : selectedElements[i]);
	                        }
	                    }
	                    if (!cloneContent) {
	                        (slotsContent ||
	                            contentOwnerComponent[KEY_SLOTS_CONTENT] ||
	                            (contentOwnerComponent[KEY_SLOTS_CONTENT] = new Map())).set(key, el);
	                    }
	                }
	            }
	            else if (cloneContent) {
	                content = cloneNode(ownerComponentInputContent);
	            }
	            else {
	                let slotsContent = contentOwnerComponent[KEY_SLOTS_CONTENT];
	                if (slotsContent && slotsContent.has(key)) {
	                    let container = slotsContent.get(key);
	                    content = dist_1$8(document.createDocumentFragment(), container);
	                    slotsContent.set(key, el);
	                    childComponents = container.$component._childComponents;
	                    bindings = container.$component._bindings;
	                }
	                else if (ownerComponentInputContent) {
	                    content = ownerComponentInputContent;
	                    (slotsContent || (contentOwnerComponent[KEY_SLOTS_CONTENT] = new Map())).set(key, el);
	                }
	            }
	        }
	        if (bindings === undefined) {
	            if (content || this.element[KEY_CONTENT_TEMPLATE]) {
	                let contentBindingResult = [null, null, null];
	                if (content) {
	                    bindContent(content, contentOwnerComponent, this.getContext
	                        ? this.getContext.call(ownerComponent, ownerComponent.$context, this)
	                        : ownerComponent.$context, contentBindingResult);
	                }
	                else {
	                    content = this.element[KEY_CONTENT_TEMPLATE].render(null, ownerComponent, this.getContext
	                        ? this.getContext.call(ownerComponent, this.$context, this)
	                        : this.$context, contentBindingResult);
	                }
	                childComponents = this._childComponents = contentBindingResult[0];
	                this._bindings = contentBindingResult[1];
	                backBindings = contentBindingResult[2];
	                if (childComponents) {
	                    for (let i = childComponents.length; i;) {
	                        let childComponent = childComponents[--i];
	                        if (childComponent.element.firstChild &&
	                            childComponent.constructor.bindsInputContent) {
	                            childComponent.$inputContent = dist_1$8(document.createDocumentFragment(), childComponent.element);
	                        }
	                    }
	                }
	            }
	            else {
	                this._childComponents = null;
	                this._bindings = null;
	            }
	        }
	        else {
	            this._childComponents = childComponents;
	            this._bindings = bindings;
	            this._unfreezeBindings();
	        }
	        if (content) {
	            suppressConnectionStatusCallbacks();
	            el.appendChild(content);
	            resumeConnectionStatusCallbacks();
	        }
	        if (childComponents) {
	            connectChildComponentElements(childComponents);
	        }
	        if (backBindings) {
	            for (let i = backBindings.length; i; i -= 3) {
	                backBindings[i - 3].on('change:' + backBindings[i - 2], backBindings[i - 1]);
	            }
	        }
	        this._isReady = true;
	        return null;
	    }
	    _disconnect() {
	        this._isConnected = false;
	        this._freezeBindings();
	    }
	};
	exports.RnSlot = __decorate([
	    Component({
	        elementIs: 'RnSlot',
	        params: {
	            name: { type: String, readonly: true },
	            forTag: { type: String, readonly: true },
	            for: { property: 'paramFor', type: String, readonly: true },
	            cloneContent: { type: Boolean, readonly: true },
	            getContext: { readonly: true }
	        }
	    })
	], exports.RnSlot);

	exports.RnHtml = class RnHtml extends BaseComponent {
	    ready() {
	        this._setHtml();
	    }
	    connected() {
	        this.listenTo(this, 'change:html', this._onHtmlChange);
	    }
	    _onHtmlChange() {
	        this._setHtml();
	    }
	    _setHtml() {
	        this.element.innerHTML = this.html || '';
	    }
	};
	exports.RnHtml = __decorate([
	    Component({
	        elementIs: 'RnHtml',
	        params: {
	            html: { type: String }
	        }
	    })
	], exports.RnHtml);

	exports.BaseComponent = BaseComponent;
	exports.Callback = Callback;
	exports.Component = Component;
	exports.ComponentParams = ComponentParams;
	exports.InterruptError = InterruptError;
	exports.Interruptible = Interruptible;
	exports.KEY_CONTENT_TEMPLATE = KEY_CONTENT_TEMPLATE;
	exports.KEY_ELEMENT_CONNECTED = KEY_ELEMENT_CONNECTED;
	exports.KEY_PARAMS_CONFIG = KEY_PARAMS_CONFIG;
	exports.KEY_PARAM_VALUES = KEY_PARAM_VALUES;
	exports.Listen = Listen;
	exports.Param = Param;
	exports.Template = Template;
	exports.configure = configure;
	exports.formatters = formatters;
	exports.onConnected = onConnected;
	exports.onDisconnected = onDisconnected;
	exports.onElementMoved = onElementMoved;
	exports.onReady = onReady;
	exports.registerComponent = registerComponent;

	Object.defineProperty(exports, '__esModule', { value: true });

})));
