"use strict";
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
        throw new SyntaxError(msg +
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
