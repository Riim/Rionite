"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TemplateParser = exports.NodeType = void 0;
var NodeType;
(function (NodeType) {
    NodeType[NodeType["BLOCK"] = 1] = "BLOCK";
    NodeType[NodeType["ELEMENT"] = 2] = "ELEMENT";
    NodeType[NodeType["ELEMENT_ATTRIBUTE"] = 3] = "ELEMENT_ATTRIBUTE";
    NodeType[NodeType["TEXT"] = 4] = "TEXT";
    NodeType[NodeType["COMMENT"] = 5] = "COMMENT";
    NodeType[NodeType["SUPER_CALL"] = 6] = "SUPER_CALL";
    NodeType[NodeType["DEBUGGER_CALL"] = 7] = "DEBUGGER_CALL";
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
const reWhitespaces = /\s+/gy;
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
        this._line = 1;
        this.template = template;
    }
    parse() {
        this._pos = 0;
        this._chr = this.template.charAt(0);
        this._skipWhitespaces();
        let pos = this._pos;
        let line = this._line;
        return {
            nodeType: NodeType.BLOCK,
            content: this._readContent(false),
            pos,
            line
        };
    }
    _readContent(brackets) {
        if (brackets) {
            this._next( /* '{' */);
            this._skipWhitespaces();
        }
        let content = [];
        for (;;) {
            switch (this._chr) {
                case "'":
                case '"':
                case '`': {
                    let pos = this._pos;
                    let line = this._line;
                    content.push({
                        nodeType: NodeType.TEXT,
                        value: this._readString(),
                        pos,
                        line
                    });
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
                    if (chr == '/') {
                        let nextChr = this.template.charAt(this._pos + 1);
                        if (nextChr == '/' || nextChr == '*') {
                            this._readComment(content);
                            break;
                        }
                    }
                    else if (chr == 'd' && this.template.substr(this._pos, 9) == 'debugger!') {
                        let pos = this._pos;
                        this._chr = this.template.charAt((this._pos += 9));
                        content.push({
                            nodeType: NodeType.DEBUGGER_CALL,
                            pos,
                            line: this._line
                        });
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
            this._skipWhitespaces();
        }
    }
    _readElement(targetContent) {
        let pos = this._pos;
        let line = this._line;
        let isTransformer = this._chr == '@';
        if (isTransformer) {
            this._next();
        }
        let tagName = this._readName(reTagName);
        this._skipWhitespacesAndReadComments(targetContent);
        let elNames;
        let override;
        if (this._chr == ':') {
            this._next();
            let pos = this._pos;
            this._skipWhitespacesAndReadComments(targetContent);
            if (this._chr == ':') {
                elNames = [null];
                this._next();
                this._skipWhitespacesAndReadComments(targetContent);
            }
            for (let name; (name = this._readName(reElementName));) {
                if (!elNames) {
                    elNames = [];
                    if (this._chr == '!') {
                        override = true;
                        this._next();
                    }
                }
                elNames.push(name);
                if (this._skipWhitespacesAndReadComments(targetContent) != ':') {
                    break;
                }
                this._next();
                this._skipWhitespacesAndReadComments(targetContent);
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
            attrs = this._readAttributes(targetContent);
            this._skipWhitespacesAndReadComments(targetContent);
        }
        let content;
        if (this._chr == '{') {
            content = this._readContent(true);
        }
        targetContent.push({
            nodeType: NodeType.ELEMENT,
            names: elNames || null,
            override: override || false,
            isTransformer,
            tagName,
            attributes: attrs || null,
            content: content || null,
            pos,
            line
        });
    }
    _readAttributes(targetContent) {
        this._next( /* '(' */);
        if (this._skipWhitespacesAndReadComments(targetContent) == ')') {
            this._next();
            return {
                superCall: null,
                list: []
            };
        }
        let superCall;
        let list = [];
        loop: for (let f = true;; f = false) {
            if (f && this._chr == 's' && (superCall = this._readSuperCall())) {
                this._skipWhitespacesAndReadComments(targetContent);
            }
            else {
                let pos = this._pos;
                let line = this._line;
                let isTransformer = this._chr == '@';
                if (isTransformer) {
                    this._next();
                }
                let name = this._readName(reAttributeName);
                if (!name) {
                    throw this._throwError('Expected attribute name');
                }
                if (this._skipWhitespacesAndReadComments(targetContent) == '=') {
                    this._next();
                    let chr = this._skipWhitespaces();
                    if (chr == "'" || chr == '"' || chr == '`') {
                        list.push({
                            nodeType: NodeType.ELEMENT_ATTRIBUTE,
                            isTransformer,
                            name,
                            value: this._readString(),
                            pos,
                            line
                        });
                        this._skipWhitespacesAndReadComments(targetContent);
                    }
                    else {
                        let value = '';
                        for (;;) {
                            if (!chr) {
                                this._throwError('Unexpected end of template. Expected "," or ")" to finalize attribute value.');
                            }
                            if (chr == ',' || chr == ')' || chr == '\n' || chr == '\r') {
                                list.push({
                                    nodeType: NodeType.ELEMENT_ATTRIBUTE,
                                    isTransformer,
                                    name,
                                    value: value.trim(),
                                    pos,
                                    line
                                });
                                if (chr == '\n' || chr == '\r') {
                                    this._skipWhitespacesAndReadComments(targetContent);
                                }
                                break;
                            }
                            value += chr;
                            chr = this._next();
                        }
                    }
                }
                else {
                    list.push({
                        nodeType: NodeType.ELEMENT_ATTRIBUTE,
                        isTransformer,
                        name,
                        value: '',
                        pos,
                        line
                    });
                }
            }
            switch (this._chr) {
                case ')': {
                    this._next();
                    break loop;
                }
                case ',': {
                    this._next();
                    this._skipWhitespacesAndReadComments(targetContent);
                    break;
                }
                default: {
                    this._throwError('Unexpected end of template. Expected "," or ")" to finalize attribute value.');
                }
            }
        }
        return {
            superCall: superCall || null,
            list
        };
    }
    _readSuperCall() {
        let pos = this._pos;
        reSuperCall.lastIndex = pos;
        let match = reSuperCall.exec(this.template);
        if (match) {
            this._chr = this.template.charAt((this._pos = reSuperCall.lastIndex));
            return {
                nodeType: NodeType.SUPER_CALL,
                elementName: match[1] || null,
                pos,
                line: this._line
            };
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
                if (quoteChar == '`') {
                    this._line += str.split(reLineBreak).length - 1;
                    return normalizeMultilineText(str);
                }
                return str;
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
    _readComment(targetContent) {
        let pos = this._pos;
        let value = '';
        let multiline;
        switch (this._next( /* '/' */)) {
            case '/': {
                for (let chr; (chr = this._next()) && chr != '\n' && chr != '\r';) {
                    value += chr;
                }
                multiline = false;
                break;
            }
            case '*': {
                loop: for (;;) {
                    switch (this._next()) {
                        case '*': {
                            if (this._next() == '/') {
                                this._next();
                                break loop;
                            }
                            value += '*' + this._chr;
                            break;
                        }
                        case '': {
                            this._throwError('Expected "*/" to close multiline comment', pos + 2);
                        }
                        default: {
                            value += this._chr;
                        }
                    }
                }
                multiline = true;
                break;
            }
            default: {
                throw this._throwError('Expected comment');
            }
        }
        let line = this._line;
        if (multiline) {
            this._line = line + value.split(reWhitespace).length - 1;
        }
        targetContent.push({
            nodeType: NodeType.COMMENT,
            value,
            multiline,
            pos,
            line
        });
    }
    _skipWhitespaces() {
        reWhitespaces.lastIndex = this._pos;
        let match = reWhitespaces.exec(this.template);
        if (match) {
            this._line += match[0].split(reLineBreak).length - 1;
            return (this._chr = this.template.charAt((this._pos = reWhitespaces.lastIndex)));
        }
        return this._chr;
    }
    _skipWhitespacesAndReadComments(targetContent) {
        for (let nextChr;;) {
            if (this._skipWhitespaces() == '/' &&
                ((nextChr = this.template.charAt(this._pos + 1)) == '/' || nextChr == '*')) {
                this._readComment(targetContent);
            }
            else {
                break;
            }
        }
        return this._chr;
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
                .replace(reLineBreak, (match) => {
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
