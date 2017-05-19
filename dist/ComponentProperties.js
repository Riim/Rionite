"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var cellx_1 = require("cellx");
var componentPropertyTypeMap_1 = require("./componentPropertyTypeMap");
var componentPropertyTypeHandlersMap_1 = require("./componentPropertyTypeHandlersMap");
var hyphenize_1 = require("./Utils/hyphenize");
function initProperty(props, name, el) {
    var component = el.$component;
    var propConfig = component.constructor.props[name];
    if (propConfig == null) {
        return;
    }
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
            componentPropertyTypeMap_1.default.get(type) != typeof defaultValue) {
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
    var hyphenizedName = hyphenize_1.default(name);
    var rawValue = el.getAttribute(hyphenizedName);
    if (required && rawValue === null) {
        throw new TypeError("Property \"" + name + "\" is required");
    }
    var descriptor;
    if (readonly) {
        var value_1 = handlers[0](rawValue, defaultValue, component);
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
        var value_2 = handlers[0](rawValue, defaultValue, component);
        var valueCell_1;
        if (rawValue === null && defaultValue != null && defaultValue !== false) {
            props['_initialize_' + name] = function () {
                el.setAttribute(hyphenizedName, handlers[1](defaultValue));
            };
        }
        var setRawValue = function (rawValue) {
            var v = handlers[0](rawValue, defaultValue, component);
            if (valueCell_1) {
                valueCell_1.set(v);
            }
            else {
                value_2 = v;
            }
        };
        props['_' + name] = setRawValue;
        if (name != hyphenizedName) {
            props['_' + hyphenizedName] = setRawValue;
        }
        descriptor = {
            configurable: true,
            enumerable: true,
            get: function () {
                if (valueCell_1) {
                    return valueCell_1.get();
                }
                var currentlyPulling = cellx_1.Cell.currentlyPulling;
                if (currentlyPulling || cellx_1.EventEmitter.currentlySubscribing) {
                    valueCell_1 = new cellx_1.Cell(value_2, {
                        onChange: function (evt) {
                            component.emit({
                                type: "property-" + hyphenizedName + "-change",
                                oldValue: evt.oldValue,
                                value: evt.value
                            });
                        }
                    });
                    if (currentlyPulling) {
                        return valueCell_1.get();
                    }
                }
                return value_2;
            },
            set: function (v) {
                var rawValue = handlers[1](v, defaultValue);
                if (rawValue === null) {
                    el.removeAttribute(hyphenizedName);
                }
                else {
                    el.setAttribute(hyphenizedName, rawValue);
                }
                if (valueCell_1) {
                    valueCell_1.set(v);
                }
                else {
                    value_2 = v;
                }
            }
        };
    }
    Object.defineProperty(props, name, descriptor);
}
var ComponentProperties = {
    init: function (component) {
        var propsConfig = component.constructor.props;
        var el = component.element;
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
