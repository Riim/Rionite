"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const namePattern = '[$_a-zA-Z][$\\w]*';
const keypathPattern = `(?:${namePattern}|\\d+)(?:\\.(?:${namePattern}|\\d+))*`;
const cache = Object.create(null);
function keypathToJSExpression(keypath, cacheKey = keypath) {
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
    return (cache[cacheKey] = `(tmp = this['${keys[0]}'])${jsExpr.join('')} && tmp['${keys[keyCount - 1]}']`);
}
exports.keypathToJSExpression = keypathToJSExpression;
var ContentNodeValueNodeType;
(function (ContentNodeValueNodeType) {
    ContentNodeValueNodeType[ContentNodeValueNodeType["TEXT"] = 1] = "TEXT";
    ContentNodeValueNodeType[ContentNodeValueNodeType["BINDING"] = 2] = "BINDING";
    ContentNodeValueNodeType[ContentNodeValueNodeType["BINDING_KEYPATH"] = 3] = "BINDING_KEYPATH";
    ContentNodeValueNodeType[ContentNodeValueNodeType["BINDING_FORMATTER"] = 4] = "BINDING_FORMATTER";
    ContentNodeValueNodeType[ContentNodeValueNodeType["BINDING_FORMATTER_ARGUMENTS"] = 5] = "BINDING_FORMATTER_ARGUMENTS";
})(ContentNodeValueNodeType = exports.ContentNodeValueNodeType || (exports.ContentNodeValueNodeType = {}));
const reWhitespace = /\s/;
const reNameOrNothing = RegExp(namePattern + '|', 'g');
const reKeypathOrNothing = RegExp(keypathPattern + '|', 'g');
const reBooleanOrNothing = /false|true|/g;
const reNumberOrNothing = /(?:[+-]\s*)?(?:0b[01]+|0[0-7]+|0x[0-9a-fA-F]+|(?:(?:0|[1-9]\d*)(?:\.\d+)?|\.\d+)(?:[eE][+-]?\d+)?|Infinity|NaN)|/g;
const reVacuumOrNothing = /null|undefined|void 0|/g;
class ContentNodeValueParser {
    constructor(contentNodeValue) {
        this.contentNodeValue = contentNodeValue;
    }
    parse(index) {
        let contentNodeValue = this.contentNodeValue;
        this.at = 0;
        let result = (this.result = []);
        do {
            this._pushText(contentNodeValue.slice(this.at, index));
            this.at = index;
            this.chr = contentNodeValue.charAt(index);
            let binding = this._readBinding();
            if (binding) {
                result.push(binding);
            }
            else {
                this._pushText(this.chr);
                this._next('{');
            }
            index = contentNodeValue.indexOf('{', this.at);
        } while (index != -1);
        this._pushText(contentNodeValue.slice(this.at));
        return result;
    }
    _pushText(value) {
        if (value) {
            let result = this.result;
            let resultLen = result.length;
            if (resultLen && result[resultLen - 1].nodeType == ContentNodeValueNodeType.TEXT) {
                result[resultLen - 1].value += value;
            }
            else {
                result.push({
                    nodeType: ContentNodeValueNodeType.TEXT,
                    value
                });
            }
        }
    }
    _readBinding() {
        let at = this.at;
        this._next('{');
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
    _readPrefix() {
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
        }
        else if (chr == '-' && this.contentNodeValue.charAt(this.at + 1) == '>') {
            this.chr = this.contentNodeValue.charAt((this.at += 2));
            return '->';
        }
        return null;
    }
    _readFormatter() {
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
    _readFormatterArguments() {
        let at = this.at;
        this._next('(');
        let args = [];
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
    _readValue() {
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
    _readObject() {
        let at = this.at;
        this._next('{');
        let obj = '{';
        while (this._skipWhitespaces() != '}') {
            let key = this.chr == "'" || this.chr == '"' ? this._readString() : this._readObjectKey();
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
                    else if (this.chr == '}') {
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
    _readObjectKey() {
        return this._readName();
    }
    _readArray() {
        let at = this.at;
        this._next('[');
        let arr = '[';
        while (this._skipWhitespaces() != ']') {
            if (this.chr == ',') {
                arr += ',';
                this._next();
            }
            else {
                let valueOrKeypath = this._readValue() || this._readKeypath(true);
                if (valueOrKeypath) {
                    arr += valueOrKeypath;
                }
                else {
                    this.at = at;
                    this.chr = this.contentNodeValue.charAt(at);
                    return null;
                }
            }
        }
        this._next();
        return arr + ']';
    }
    _readBoolean() {
        reBooleanOrNothing.lastIndex = this.at;
        let bool = reBooleanOrNothing.exec(this.contentNodeValue)[0];
        if (bool) {
            this.chr = this.contentNodeValue.charAt((this.at = reBooleanOrNothing.lastIndex));
            return bool;
        }
        return null;
    }
    _readNumber() {
        reNumberOrNothing.lastIndex = this.at;
        let num = reNumberOrNothing.exec(this.contentNodeValue)[0];
        if (num) {
            this.chr = this.contentNodeValue.charAt((this.at = reNumberOrNothing.lastIndex));
            return num;
        }
        return null;
    }
    _readString() {
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
        for (let next; (next = this._next());) {
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
        this.at = at;
        this.chr = this.contentNodeValue.charAt(at);
        return null;
    }
    _readVacuum() {
        reVacuumOrNothing.lastIndex = this.at;
        let vacuum = reVacuumOrNothing.exec(this.contentNodeValue)[0];
        if (vacuum) {
            this.chr = this.contentNodeValue.charAt((this.at = reVacuumOrNothing.lastIndex));
            return vacuum;
        }
        return null;
    }
    _readKeypath(toJSExpression) {
        reKeypathOrNothing.lastIndex = this.at;
        let keypath = reKeypathOrNothing.exec(this.contentNodeValue)[0];
        if (keypath) {
            this.chr = this.contentNodeValue.charAt((this.at = reKeypathOrNothing.lastIndex));
            return toJSExpression ? keypathToJSExpression(keypath) : keypath;
        }
        return null;
    }
    _readName() {
        reNameOrNothing.lastIndex = this.at;
        let name = reNameOrNothing.exec(this.contentNodeValue)[0];
        if (name) {
            this.chr = this.contentNodeValue.charAt((this.at = reNameOrNothing.lastIndex));
            return name;
        }
        return null;
    }
    _skipWhitespaces() {
        let chr = this.chr;
        while (chr && reWhitespace.test(chr)) {
            chr = this._next();
        }
        return chr;
    }
    _next(current) {
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
exports.ContentNodeValueParser = ContentNodeValueParser;
