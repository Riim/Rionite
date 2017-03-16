"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var cellx_1 = require("cellx");
var componentPropertyTypeMap_1 = require("./componentPropertyTypeMap");
var componentPropertyTypeHandlersMap_1 = require("./componentPropertyTypeHandlersMap");
var camelize_1 = require("./Utils/camelize");
var hyphenize_1 = require("./Utils/hyphenize");
function initProperty(props, name, el) {
    var component = el.$c;
    var propConfig = component.constructor.props[name];
    var type = typeof propConfig;
    var defaultValue;
    var required;
    var readonly;
    if (type == 'function') {
        type = propConfig;
        required = readonly = false;
    }
    else if (type == 'object' && (propConfig.type !== undefined || propConfig.default !== undefined)) {
        type = propConfig.type;
        defaultValue = propConfig.default;
        if (type === undefined) {
            type = typeof defaultValue;
        }
        else if (defaultValue !== undefined && componentPropertyTypeMap_1.default.has(type) &&
            componentPropertyTypeMap_1.default.get(type) != (defaultValue === null ? 'null' : typeof defaultValue)) {
            throw new TypeError('Specified type does not match type of defaultValue');
        }
        required = propConfig.required;
        readonly = propConfig.readonly;
    }
    else {
        defaultValue = propConfig;
        required = readonly = false;
    }
    var handlers = componentPropertyTypeHandlersMap_1.default.get(type);
    if (!handlers) {
        throw new TypeError('Unsupported attribute type');
    }
    var camelizedName = camelize_1.default(name);
    var hyphenizedName = hyphenize_1.default(name);
    if (required && !el.hasAttribute(hyphenizedName)) {
        throw new TypeError("Property \"" + name + "\" is required");
    }
    var descriptor;
    if (readonly) {
        var value_1 = handlers[0](el.getAttribute(hyphenizedName), defaultValue, component);
        descriptor = {
            configurable: true,
            enumerable: true,
            get: function () {
                return value_1;
            },
            set: function (v) {
                if (v !== value_1) {
                    throw new TypeError("Property \"" + name + "\" is readonly");
                }
            }
        };
    }
    else {
        var oldValue_1;
        var value_2;
        var needHandling_1 = false;
        var rawValue_1 = props['_' + camelizedName] = props['_' + hyphenizedName] = new cellx_1.Cell(el.getAttribute(hyphenizedName), {
            merge: function (v, ov) {
                if (v !== ov) {
                    var newValue = handlers[0](v, defaultValue, component);
                    if (newValue === value_2) {
                        return ov;
                    }
                    oldValue_1 = value_2;
                    value_2 = newValue;
                    needHandling_1 = component.isReady;
                }
                return v;
            },
            onChange: function () {
                if (needHandling_1) {
                    needHandling_1 = false;
                    component.propertyChanged(camelizedName, value_2, oldValue_1);
                    component.emit({
                        type: "property-" + hyphenizedName + "-change",
                        oldValue: oldValue_1,
                        value: value_2
                    });
                }
            }
        });
        descriptor = {
            configurable: true,
            enumerable: true,
            get: function () {
                rawValue_1.get();
                return value_2;
            },
            set: function (v) {
                v = handlers[1](v, defaultValue, component);
                if (v === null) {
                    el.removeAttribute(hyphenizedName);
                }
                else {
                    el.setAttribute(hyphenizedName, v);
                }
                rawValue_1.set(v);
            }
        };
    }
    Object.defineProperty(props, camelizedName, descriptor);
    if (hyphenizedName != camelizedName) {
        Object.defineProperty(props, hyphenizedName, descriptor);
    }
}
var ComponentProperties = {
    create: function (el) {
        var propsConfig = el.$c.constructor.props;
        var props = { content: null, context: null };
        if (propsConfig) {
            for (var name_1 in propsConfig) {
                initProperty(props, name_1, el);
            }
        }
        return props;
    }
};
exports.default = ComponentProperties;
