"use strict";
var keypathToJSExpression_1 = require('./keypathToJSExpression');
var namePattern_1 = require('./namePattern');
var keypathPattern_1 = require('./keypathPattern');
var reNameOrNothing = RegExp(namePattern_1.default + '|', 'g');
var reKeypathOrNothing = RegExp(keypathPattern_1.default + '|', 'g');
var reBooleanOrNothing = /false|true|/g;
var reNumberOrNothing = /(?:[+-]\s*)?(?:0b[01]+|0[0-7]+|0x[0-9a-fA-F]+|(?:(?:0|[1-9]\d*)(?:\.\d+)?|\.\d+)(?:[eE][+-]?\d+)?|Infinity|NaN)|/g;
var reVacuumOrNothing = /null|undefined|void 0|/g;
var NOT_VALUE_AND_NOT_KEYPATH = {};
var ContentNodeType = {
    TEXT: 0,
    BINDING: 1,
    BINDING_KEYPATH: 2,
    BINDING_FORMATTER: 3,
    BINDING_FORMATTER_ARGUMENTS: 4
};
var ContentParser = (function () {
    function ContentParser(content) {
        this.content = content;
    }
    ContentParser.prototype.parse = function () {
        var content = this.content;
        if (!content) {
            return [];
        }
        this.at = 0;
        var result = this.result = [];
        for (var index = void 0; (index = content.indexOf('{', this.at)) > -1;) {
            this.pushText(content.slice(this.at, index));
            this.at = index;
            this.chr = content.charAt(index);
            var binding = this.readBinding();
            if (binding) {
                result.push(binding);
            }
            else {
                this.pushText(this.chr);
                this.next('{');
            }
        }
        this.pushText(content.slice(this.at));
        return result;
    };
    ContentParser.prototype.pushText = function (value) {
        if (value) {
            var result = this.result;
            var resultLen = result.length;
            if (resultLen && result[resultLen - 1].type == ContentNodeType.TEXT) {
                result[resultLen - 1].value = result[resultLen - 1].raw += value;
            }
            else {
                result.push({
                    type: ContentNodeType.TEXT,
                    at: this.at,
                    raw: value,
                    value: value
                });
            }
        }
    };
    ContentParser.prototype.readBinding = function () {
        var bindingAt = this.at;
        this.next('{');
        this.skipWhitespaces();
        var keypath = this.readBindingKeypath();
        if (keypath) {
            var formatters = [];
            for (var formatter = void 0; this.skipWhitespaces() == '|' && (formatter = this.readFormatter());) {
                formatters.push(formatter);
            }
            if (this.chr == '}') {
                this.next();
                return {
                    type: ContentNodeType.BINDING,
                    at: bindingAt,
                    raw: this.content.slice(bindingAt, this.at),
                    keypath: keypath,
                    formatters: formatters
                };
            }
        }
        this.at = bindingAt;
        this.chr = this.content.charAt(bindingAt);
        return null;
    };
    ContentParser.prototype.readBindingKeypath = function () {
        var content = this.content;
        reKeypathOrNothing.lastIndex = this.at;
        var keypath = reKeypathOrNothing.exec(content)[0];
        if (keypath) {
            var keypathAt = this.at;
            this.chr = content.charAt((this.at += keypath.length));
            return {
                type: ContentNodeType.BINDING_KEYPATH,
                at: keypathAt,
                raw: content.slice(keypathAt, this.at),
                value: keypath
            };
        }
        return null;
    };
    ContentParser.prototype.readFormatter = function () {
        var formatterAt = this.at;
        this.next('|');
        this.skipWhitespaces();
        var content = this.content;
        reNameOrNothing.lastIndex = this.at;
        var name = reNameOrNothing.exec(content)[0];
        if (name) {
            var args = (this.chr = content.charAt((this.at += name.length))) == '(' ?
                this.readFormatterArguments() :
                null;
            return {
                type: ContentNodeType.BINDING_FORMATTER,
                at: formatterAt,
                raw: content.slice(formatterAt, this.at),
                name: name,
                arguments: args
            };
        }
        this.at = formatterAt;
        this.chr = content.charAt(formatterAt);
        return null;
    };
    ContentParser.prototype.readFormatterArguments = function () {
        var formatterArgumentsAt = this.at;
        var args = [];
        this.next('(');
        if (this.skipWhitespaces() != ')') {
            for (;;) {
                var arg = this.readValueOrValueKeypath();
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
    };
    ContentParser.prototype.readValueOrValueKeypath = function () {
        var value = this.readValue();
        return value === NOT_VALUE_AND_NOT_KEYPATH ? this.readValueKeypath() : value;
    };
    ContentParser.prototype.readValue = function () {
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
        var readers = ['readBoolean', 'readNumber', 'readVacuum'];
        for (var _i = 0, readers_1 = readers; _i < readers_1.length; _i++) {
            var reader = readers_1[_i];
            var value = this[reader]();
            if (value !== NOT_VALUE_AND_NOT_KEYPATH) {
                return value;
            }
        }
        return NOT_VALUE_AND_NOT_KEYPATH;
    };
    ContentParser.prototype.readObject = function () {
        var objectAt = this.at;
        this.next('{');
        var obj = '{';
        while (this.skipWhitespaces() != '}') {
            var key = this.chr == "'" || this.chr == '"' ? this.readString() : this.readObjectKey();
            if (key !== NOT_VALUE_AND_NOT_KEYPATH && key !== null && this.skipWhitespaces() == ':') {
                this.next();
                this.skipWhitespaces();
                var v = this.readValueOrValueKeypath();
                if (v !== NOT_VALUE_AND_NOT_KEYPATH) {
                    if (this.skipWhitespaces() == ',') {
                        obj += key + ':' + v + ',';
                        this.next();
                        continue;
                    }
                    else if (this.chr == '}') {
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
    };
    ContentParser.prototype.readObjectKey = function () {
        reNameOrNothing.lastIndex = this.at;
        var key = reNameOrNothing.exec(this.content)[0];
        if (key) {
            this.chr = this.content.charAt((this.at += key.length));
            return key;
        }
        return null;
    };
    ContentParser.prototype.readArray = function () {
        var arrayAt = this.at;
        this.next('[');
        var arr = '[';
        while (this.skipWhitespaces() != ']') {
            if (this.chr == ',') {
                arr += ',';
                this.next();
            }
            else {
                var v = this.readValueOrValueKeypath();
                if (v === NOT_VALUE_AND_NOT_KEYPATH) {
                    this.at = arrayAt;
                    this.chr = this.content.charAt(arrayAt);
                    return NOT_VALUE_AND_NOT_KEYPATH;
                }
                else {
                    arr += v;
                }
            }
        }
        this.next();
        return arr + ']';
    };
    ContentParser.prototype.readBoolean = function () {
        reBooleanOrNothing.lastIndex = this.at;
        var bool = reBooleanOrNothing.exec(this.content)[0];
        if (bool) {
            this.chr = this.content.charAt((this.at += bool.length));
            return bool;
        }
        return NOT_VALUE_AND_NOT_KEYPATH;
    };
    ContentParser.prototype.readNumber = function () {
        reNumberOrNothing.lastIndex = this.at;
        var num = reNumberOrNothing.exec(this.content)[0];
        if (num) {
            this.chr = this.content.charAt((this.at += num.length));
            return num;
        }
        return NOT_VALUE_AND_NOT_KEYPATH;
    };
    ContentParser.prototype.readString = function () {
        if (this.chr != "'" && this.chr != '"') {
            throw {
                name: 'SyntaxError',
                message: "Expected \"'\" or '\"' instead of \"" + this.chr + "\"",
                at: this.at,
                content: this.content
            };
        }
        var stringAt = this.at;
        var quote = this.chr;
        var str = '';
        while (this.next()) {
            if (this.chr == quote) {
                this.next();
                return quote + str + quote;
            }
            if (this.chr == '\\') {
                str += this.chr + this.next();
            }
            else {
                if (this.chr == '\r' || this.chr == '\n') {
                    break;
                }
                str += this.chr;
            }
        }
        this.at = stringAt;
        this.chr = this.content.charAt(stringAt);
        return NOT_VALUE_AND_NOT_KEYPATH;
    };
    ContentParser.prototype.readVacuum = function () {
        reVacuumOrNothing.lastIndex = this.at;
        var vacuum = reVacuumOrNothing.exec(this.content)[0];
        if (vacuum) {
            this.chr = this.content.charAt((this.at += vacuum.length));
            return vacuum;
        }
        return NOT_VALUE_AND_NOT_KEYPATH;
    };
    ContentParser.prototype.readValueKeypath = function () {
        reKeypathOrNothing.lastIndex = this.at;
        var keypath = reKeypathOrNothing.exec(this.content)[0];
        if (keypath) {
            this.chr = this.content.charAt((this.at += keypath.length));
            return keypathToJSExpression_1.default(keypath);
        }
        return NOT_VALUE_AND_NOT_KEYPATH;
    };
    ContentParser.prototype.next = function (c) {
        if (c && c != this.chr) {
            throw {
                name: 'SyntaxError',
                message: "Expected \"" + c + "\" instead of \"" + this.chr + "\"",
                at: this.at,
                content: this.content
            };
        }
        return (this.chr = this.content.charAt(++this.at));
    };
    ContentParser.prototype.skipWhitespaces = function () {
        var chr = this.chr;
        while (chr && chr <= ' ') {
            chr = this.next();
        }
        return chr;
    };
    ContentParser.ContentNodeType = ContentNodeType;
    return ContentParser;
}());
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = ContentParser;
