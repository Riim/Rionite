"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var cellx_1 = require("cellx");
var KEY_COMPONENT_PROPERTY_VALUES_1 = require("./KEY_COMPONENT_PROPERTY_VALUES");
var ContentParser_1 = require("./ContentParser");
var compileContent_1 = require("./compileContent");
var setAttribute_1 = require("./Utils/setAttribute");
var ContentNodeType = ContentParser_1.default.ContentNodeType;
function readValue(obj, keypath) {
    var index = keypath.indexOf('.', 1);
    var key = index == -1 ? keypath : keypath.slice(0, index);
    if ('_' + key in obj) {
        return null;
    }
    var value = obj[key];
    return index == -1 ?
        { value: value } :
        (value == null ? null : readValue(value, keypath.slice(index + 1)));
}
function bindContent(content, ownerComponent, context) {
    if (!context) {
        context = ownerComponent;
    }
    var bindings;
    var childComponents;
    function bind(content) {
        var _loop_1 = function (child) {
            switch (child.nodeType) {
                case Node.ELEMENT_NODE: {
                    var attrs = child.attributes;
                    var _loop_2 = function (i) {
                        var attr = attrs.item(--i);
                        var value = attr.value;
                        if (value.indexOf('{') != -1) {
                            var parsedValue = (new ContentParser_1.default(value)).parse();
                            if (parsedValue.length > 1 || parsedValue[0].nodeType == ContentNodeType.BINDING) {
                                var name_1 = attr.name;
                                if (name_1.charAt(0) == '_') {
                                    name_1 = name_1.slice(1);
                                }
                                var readedValue = void 0;
                                if (parsedValue.length == 1 &&
                                    !parsedValue[0].formatters &&
                                    (readedValue = readValue(context, parsedValue[0].keypath))) {
                                    var value_1 = readedValue.value;
                                    if (value_1 && typeof value_1 == 'object') {
                                        var key = compileContent_1.nextComponentPropertyValueKey();
                                        (ownerComponent[KEY_COMPONENT_PROPERTY_VALUES_1.default] ||
                                            (ownerComponent[KEY_COMPONENT_PROPERTY_VALUES_1.default] = new Map())).set(key, value_1);
                                        setAttribute_1.default(child, name_1, key);
                                    }
                                    else {
                                        setAttribute_1.default(child, name_1, value_1);
                                    }
                                }
                                else {
                                    var cell = new cellx_1.Cell(compileContent_1.default(parsedValue, value, ownerComponent), {
                                        owner: context,
                                        onChange: function (evt) {
                                            setAttribute_1.default(child, name_1, evt.value);
                                        }
                                    });
                                    setAttribute_1.default(child, name_1, cell.get());
                                    (bindings || (bindings = [])).push(cell);
                                }
                            }
                        }
                        out_i_1 = i;
                    };
                    var out_i_1;
                    for (var i = attrs.length; i;) {
                        _loop_2(i);
                        i = out_i_1;
                    }
                    var childComponent = child.$component;
                    if (childComponent) {
                        childComponent.ownerComponent = ownerComponent;
                        childComponent.props.context = context;
                        (childComponents || (childComponents = [])).push(childComponent);
                    }
                    if (child.firstChild &&
                        (!childComponent || childComponent.constructor.template == null)) {
                        bind(child);
                    }
                    break;
                }
                case Node.TEXT_NODE: {
                    var content_1 = child.textContent;
                    if (content_1.indexOf('{') != -1) {
                        var parsedContent = (new ContentParser_1.default(content_1)).parse();
                        if (parsedContent.length > 1 || parsedContent[0].nodeType == ContentNodeType.BINDING) {
                            var readedValue = void 0;
                            if (parsedContent.length == 1 &&
                                !parsedContent[0].formatters &&
                                (readedValue = readValue(context, parsedContent[0].keypath))) {
                                child.textContent = readedValue.value;
                            }
                            else {
                                var cell = new cellx_1.Cell(compileContent_1.default(parsedContent, content_1), {
                                    owner: context,
                                    onChange: function (evt) {
                                        child.textContent = evt.value;
                                    }
                                });
                                child.textContent = cell.get();
                                (bindings || (bindings = [])).push(cell);
                            }
                        }
                    }
                    break;
                }
            }
        };
        for (var child = content.firstChild; child; child = child.nextSibling) {
            _loop_1(child);
        }
    }
    bind(content);
    return [bindings || null, childComponents || null];
}
exports.default = bindContent;
