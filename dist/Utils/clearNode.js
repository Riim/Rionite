"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function clearNode(node) {
    for (var child = void 0; (child = node.firstChild);) {
        node.removeChild(child);
    }
    return node;
}
exports.default = clearNode;
