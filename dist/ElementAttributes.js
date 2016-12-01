"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var cellx = require('cellx');
var attributeTypeHandlerMap_1 = require('./attributeTypeHandlerMap');
var camelize_1 = require('./Utils/camelize');
var hyphenize_1 = require('./Utils/hyphenize');
var Cell = cellx.Cell;
var Map = cellx.JS.Map;
var typeMap = new Map([
    [Boolean, 'boolean'],
    ['boolean', 'boolean'],
    [Number, 'number'],
    ['number', 'number'],
    [String, 'string'],
    ['string', 'string']
]);
var ElementAttributes = (function (_super) {
    __extends(ElementAttributes, _super);
    function ElementAttributes(el) {
        _super.call(this);
        var component = el.$c;
        var elAttrsConfig = component.constructor.elementAttributes;
        if (elAttrsConfig) {
            var _loop_1 = function(name_1) {
                var elAttrConfig = elAttrsConfig[name_1];
                var type = typeof elAttrConfig;
                var defaultValue;
                var required = void 0;
                var readonly = void 0;
                if (type == 'function') {
                    type = elAttrConfig;
                    required = readonly = false;
                }
                else if (type == 'object' && (elAttrConfig.type !== undefined || elAttrConfig.default !== undefined)) {
                    type = elAttrConfig.type;
                    defaultValue = elAttrConfig.default;
                    if (type === undefined) {
                        type = typeof defaultValue;
                    }
                    else if (defaultValue !== undefined && typeMap.get(type) !== typeof defaultValue) {
                        throw new TypeError('Specified type does not match type of defaultValue');
                    }
                    required = elAttrConfig.required;
                    readonly = elAttrConfig.readonly;
                }
                else {
                    defaultValue = elAttrConfig;
                    required = readonly = false;
                }
                var handlers = attributeTypeHandlerMap_1.default.get(type);
                if (!handlers) {
                    throw new TypeError('Unsupported attribute type');
                }
                var camelizedName = camelize_1.default(name_1);
                var hyphenizedName = hyphenize_1.default(name_1);
                if (required && !el.hasAttribute(hyphenizedName)) {
                    throw new TypeError("Property \"" + name_1 + "\" is required");
                }
                var descriptor = void 0;
                if (readonly) {
                    var value_1 = handlers[0](el.getAttribute(hyphenizedName), defaultValue);
                    descriptor = {
                        configurable: true,
                        enumerable: true,
                        get: function () {
                            return value_1;
                        },
                        set: function (v) {
                            if (v !== value_1) {
                                throw new TypeError("Property \"" + name_1 + "\" is readonly");
                            }
                        }
                    };
                }
                else {
                    var oldValue_1;
                    var value_2;
                    var isReady_1;
                    var rawValue_1 = this_1['_' + camelizedName] = this_1['_' + hyphenizedName] = new Cell(el.getAttribute(hyphenizedName), {
                        merge: function (v, ov) {
                            if (v !== ov) {
                                oldValue_1 = value_2;
                                value_2 = handlers[0](v, defaultValue);
                            }
                            isReady_1 = component.isReady;
                            return v;
                        },
                        onChange: function (evt) {
                            evt['oldValue'] = oldValue_1;
                            evt['value'] = value_2;
                            if (isReady_1) {
                                component.elementAttributeChanged(hyphenizedName, oldValue_1, value_2);
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
                            v = handlers[1](v, defaultValue);
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
                Object.defineProperty(this_1, camelizedName, descriptor);
                if (hyphenizedName != camelizedName) {
                    Object.defineProperty(this_1, hyphenizedName, descriptor);
                }
            };
            var this_1 = this;
            for (var name_1 in elAttrsConfig) {
                _loop_1(name_1);
            }
        }
    }
    return ElementAttributes;
}(cellx.EventEmitter));
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = ElementAttributes;
