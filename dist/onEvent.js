"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function onEvent(evt) {
    var isNativeEvent = evt instanceof Event;
    var node;
    var attrName;
    var targetEls;
    if (isNativeEvent) {
        node = evt.target;
        attrName = 'rt-' + evt.type;
    }
    else {
        node = evt.target.element;
        attrName = 'rt-component-' + evt.type;
    }
    for (;;) {
        if (node.nodeType == Node.ELEMENT_NODE && node.hasAttribute(attrName)) {
            (targetEls || (targetEls = [])).push(node);
        }
        node = node.parentNode;
        if (!node) {
            break;
        }
        var component = node.$component;
        if (component && targetEls) {
            for (var _i = 0, targetEls_1 = targetEls; _i < targetEls_1.length; _i++) {
                var targetEl = targetEls_1[_i];
                var handler = component[targetEl.getAttribute(attrName)];
                if (typeof handler == 'function') {
                    if (isNativeEvent) {
                        handler.call(component, evt, targetEl);
                    }
                    else {
                        if (handler.call(component, evt, targetEl) === false) {
                            evt.isPropagationStopped = true;
                            return;
                        }
                        if (evt.isPropagationStopped) {
                            return;
                        }
                    }
                }
            }
        }
    }
}
exports.default = onEvent;
