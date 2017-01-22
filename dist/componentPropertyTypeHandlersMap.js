"use strict";
var cellx_1 = require("cellx");
var escape_html_1 = require("@riim/escape-html");
var isRegExp_1 = require("./Utils/isRegExp");
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = new cellx_1.JS.Map([
    [Boolean, [
            function (value) {
                return value !== null && value != 'no';
            },
            function (value) {
                return value ? '' : null;
            }
        ]],
    ['boolean', [
            function (value, defaultValue) {
                return value !== null ? value != 'no' : !!defaultValue;
            },
            function (value, defaultValue) {
                return value ? '' : (defaultValue ? 'no' : null);
            }
        ]],
    [Number, [
            function (value) {
                return value !== null ? +value : null;
            },
            function (value) {
                return value != null ? String(+value) : null;
            }
        ]],
    ['number', [
            function (value, defaultValue) {
                return value !== null ? +value : (defaultValue !== undefined ? defaultValue : null);
            },
            function (value) {
                return value != null ? String(+value) : null;
            }
        ]],
    [String, [
            function (value) {
                return value !== null ? value : null;
            },
            function (value) {
                return value != null ? String(value) : null;
            }
        ]],
    ['string', [
            function (value, defaultValue) {
                return value !== null ? value : (defaultValue !== undefined ? defaultValue : null);
            },
            function (value) {
                return value != null ? String(value) : null;
            }
        ]],
    [Object, [
            function (value) {
                return value !== null ? Object(Function("return " + escape_html_1.unescapeHTML(value) + ";")()) : null;
            },
            function (value) {
                return value != null ? escape_html_1.escapeHTML(isRegExp_1.default(value) ? value.toString() : JSON.stringify(value)) : null;
            }
        ]],
    ['object', [
            function (value, defaultValue) {
                return value !== null ?
                    Object(Function("return " + escape_html_1.unescapeHTML(value) + ";")()) :
                    (defaultValue !== undefined ? defaultValue : null);
            },
            function (value) {
                return value != null ? escape_html_1.escapeHTML(isRegExp_1.default(value) ? value.toString() : JSON.stringify(value)) : null;
            }
        ]]
]);
