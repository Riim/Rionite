"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var cellx_1 = require("cellx");
var escape_html_1 = require("@riim/escape-html");
var KEY_COMPONENT_PROPERTY_VALUES_1 = require("./KEY_COMPONENT_PROPERTY_VALUES");
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
                return value !== null ? +value : defaultValue;
            },
            function (value) {
                return value != null ? String(+value) : null;
            }
        ]],
    [String, [
            function (value, defaultValue) {
                return value !== null ? value : defaultValue;
            },
            function (value) {
                return value != null ? String(value) : null;
            }
        ]],
    [Object, [
            function (value, defaultValue, component) {
                if (value === null) {
                    return defaultValue;
                }
                var componentPropertyValues = component.ownerComponent &&
                    component.ownerComponent[KEY_COMPONENT_PROPERTY_VALUES_1.default];
                if (!componentPropertyValues || !componentPropertyValues.has(value)) {
                    throw new TypeError('Value is not an object');
                }
                var val = componentPropertyValues.get(value);
                componentPropertyValues.delete(value);
                return val;
            },
            function (value) {
                return value != null ? '' : null;
            }
        ]],
    [eval, [
            function (value, defaultValue) {
                return value !== null ? Function("return " + escape_html_1.unescapeHTML(value) + ";")() : defaultValue;
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
