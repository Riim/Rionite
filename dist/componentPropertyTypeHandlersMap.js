"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var cellx_1 = require("cellx");
var escape_html_1 = require("@riim/escape-html");
var componentPropertyValuesKey_1 = require("./componentPropertyValuesKey");
var isRegExp_1 = require("./Utils/isRegExp");
var componentPropertyTypeHandlersMap = new cellx_1.JS.Map([
    [Boolean, [
            function (value, defaultValue) {
                return value !== null ? value != 'no' : !!defaultValue;
            },
            function (value, defaultValue) {
                return value ? '' : (defaultValue ? 'no' : null);
            }
        ]],
    [Number, [
            function (value, defaultValue) {
                return value !== null ? +value : (defaultValue !== undefined ? defaultValue : null);
            },
            function (value) {
                return value != null ? String(+value) : null;
            }
        ]],
    [String, [
            function (value, defaultValue) {
                return value !== null ? value : (defaultValue !== undefined ? defaultValue : null);
            },
            function (value) {
                return value != null ? String(value) : null;
            }
        ]],
    [Object, [
            function (value, defaultValue, component) {
                if (value === null) {
                    return defaultValue || null;
                }
                var componentPropertyValues = component.ownerComponent &&
                    component.ownerComponent[componentPropertyValuesKey_1.default];
                if (!componentPropertyValues || !componentPropertyValues.has(value)) {
                    throw new TypeError('Using a nonexistent key');
                }
                var result = componentPropertyValues.get(value);
                componentPropertyValues.delete(value);
                return result;
            },
            function (value) {
                return value != null ? '' : null;
            }
        ]],
    ['any', [
            function (value, defaultValue) {
                return value !== null ?
                    Function("return " + escape_html_1.unescapeHTML(value) + ";")() :
                    (defaultValue !== undefined ? defaultValue : null);
            },
            function (value) {
                return value != null ? escape_html_1.escapeHTML(isRegExp_1.default(value) ? value.toString() : JSON.stringify(value)) : null;
            }
        ]]
]);
componentPropertyTypeHandlersMap.set('boolean', componentPropertyTypeHandlersMap.get(Boolean));
componentPropertyTypeHandlersMap.set('number', componentPropertyTypeHandlersMap.get(Number));
componentPropertyTypeHandlersMap.set('string', componentPropertyTypeHandlersMap.get(String));
componentPropertyTypeHandlersMap.set('object', componentPropertyTypeHandlersMap.get(Object));
exports.default = componentPropertyTypeHandlersMap;
