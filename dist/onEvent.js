"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function onEvent(evt) {
    var isNativeEvent = evt instanceof Event;
    var node = isNativeEvent ? evt.target : evt.target.element;
    var attrName = (isNativeEvent ? 'rt-' : 'rt-component-') + evt.type;
    var targetEls;
    for (;;) {
        if (node.hasAttribute(attrName)) {
            (targetEls || (targetEls = [])).push(node);
        }
        node = node.parentNode;
        if (!node || node == document) {
            break;
        }
        var component = node.$component;
        if (component && targetEls) {
            for (var i = 0, l = targetEls.length; i < l;) {
                var targetEl = targetEls[i];
                var handler = component[targetEl.getAttribute(attrName)];
                if (typeof handler == 'function') {
                    if (handler.call(component, evt, targetEl) === false) {
                        if (!isNativeEvent) {
                            evt.isPropagationStopped = true;
                        }
                        return;
                    }
                    if (!isNativeEvent && evt.isPropagationStopped) {
                        return;
                    }
                    targetEls.splice(i, 1);
                    l--;
                    continue;
                }
                i++;
            }
        }
    }
}
exports.default = onEvent;
