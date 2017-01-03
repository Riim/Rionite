"use strict";
var cellx_1 = require("cellx");
var escape_html_1 = require("@riim/escape-html");
var isRegExp_1 = require("./Utils/isRegExp");
var Map = cellx_1.JS.Map;
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = new Map([
    [Boolean, [function (value) {
                return value !== null ? value != 'no' : false;
            }, function (value) {
                return value ? '' : null;
            }]],
    ['boolean', [function (value, defaultValue) {
                return value !== null ? value != 'no' : defaultValue;
            }, function (value, defaultValue) {
                return value ? '' : (defaultValue ? 'no' : null);
            }]],
    [Number, [function (value) {
                return value !== null ? +value : undefined;
            }, function (value) {
                return value !== undefined ? String(+value) : null;
            }]],
    ['number', [function (value, defaultValue) {
                return value !== null ? +value : defaultValue;
            }, function (value) {
                return value !== undefined ? String(+value) : null;
            }]],
    [String, [function (value) {
                return value !== null ? value : undefined;
            }, function (value) {
                return value !== undefined ? String(value) : null;
            }]],
    ['string', [function (value, defaultValue) {
                return value !== null ? value : defaultValue;
            }, function (value) {
                return value !== undefined ? String(value) : null;
            }]],
    [Object, [function (value) {
                return value !== null ? Object(Function("return " + escape_html_1.unescapeHTML(value) + ";")()) : undefined;
            }, function (value) {
                return value != null ? escape_html_1.escapeHTML(isRegExp_1.default(value) ? value.toString() : JSON.stringify(value)) : null;
            }]],
    ['object', [function (value, defaultValue) {
                return value !== null ? Object(Function("return " + escape_html_1.unescapeHTML(value) + ";")()) : defaultValue;
            }, function (value) {
                return value != null ? escape_html_1.escapeHTML(isRegExp_1.default(value) ? value.toString() : JSON.stringify(value)) : null;
            }]]
]);
