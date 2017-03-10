"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var cellx_1 = require("cellx");
var escape_html_1 = require("@riim/escape-html");
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
            function (value, defaultValue) {
                return value !== null ?
                    Object(Function("return " + escape_html_1.unescapeHTML(value) + ";")()) :
                    (defaultValue !== undefined ? defaultValue : null);
            },
            function (value) {
                return value != null ? escape_html_1.escapeHTML(isRegExp_1.default(value) ? value.toString() : JSON.stringify(value)) : null;
            }
        ]],
    ['ref', [
            function (value, defaultValue, component) {
                if (value === null) {
                    return (defaultValue !== undefined ? defaultValue : null);
                }
                var propertyValuesByReference = component.ownerComponent &&
                    component.ownerComponent._propertyValuesByReference;
                if (!propertyValuesByReference || !propertyValuesByReference.has(value)) {
                    return (defaultValue !== undefined ? defaultValue : null);
                }
                var result = propertyValuesByReference.get(value);
                propertyValuesByReference.delete(value);
                return result;
            },
            function (value) {
                return value != null ? '' : null;
            }
        ]]
]);
componentPropertyTypeHandlersMap.set('boolean', componentPropertyTypeHandlersMap.get(Boolean));
componentPropertyTypeHandlersMap.set('number', componentPropertyTypeHandlersMap.get(Number));
componentPropertyTypeHandlersMap.set('string', componentPropertyTypeHandlersMap.get(String));
componentPropertyTypeHandlersMap.set('object', componentPropertyTypeHandlersMap.get(Object));
exports.default = componentPropertyTypeHandlersMap;
