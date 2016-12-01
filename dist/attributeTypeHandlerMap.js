"use strict";
var cellx = require("cellx");
var isRegExp_1 = require("./Utils/isRegExp");
var escapeHTML_1 = require("./Utils/escapeHTML");
var unescapeHTML_1 = require("./Utils/unescapeHTML");
var Map = cellx.JS.Map;
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
                return value !== null ? Object(Function("return " + unescapeHTML_1.default(value) + ";")()) : undefined;
            }, function (value) {
                return value != null ? escapeHTML_1.default(isRegExp_1.default(value) ? value.toString() : JSON.stringify(value)) : null;
            }]],
    ['object', [function (value, defaultValue) {
                return value !== null ? Object(Function("return " + unescapeHTML_1.default(value) + ";")()) : defaultValue;
            }, function (value) {
                return value != null ? escapeHTML_1.default(isRegExp_1.default(value) ? value.toString() : JSON.stringify(value)) : null;
            }]]
]);
