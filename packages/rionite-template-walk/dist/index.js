"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.walkAttributes = exports.walkContent = exports.walk = void 0;
const rionite_template_parser_1 = require("@riim/rionite-template-parser");
function walk(node, callbacks) {
    if (Array.isArray(node)) {
        walkContent(node, callbacks);
    }
    else {
        if (node.nodeType == rionite_template_parser_1.NodeType.ELEMENT && node.attributes) {
            walkAttributes(node.attributes, callbacks);
        }
        if (node.content) {
            walkContent(node.content, callbacks);
        }
    }
}
exports.walk = walk;
function walkContent(content, callbacks) {
    for (let node of content) {
        if (callbacks[node.nodeType]) {
            callbacks[node.nodeType](node);
        }
        if (node.nodeType == rionite_template_parser_1.NodeType.ELEMENT) {
            if (node.attributes) {
                walkAttributes(node.attributes, callbacks);
            }
            if (node.content) {
                walkContent(node.content, callbacks);
            }
        }
    }
}
exports.walkContent = walkContent;
function walkAttributes(attrs, callbacks) {
    if (attrs.superCall && callbacks[rionite_template_parser_1.NodeType.SUPER_CALL]) {
        callbacks[rionite_template_parser_1.NodeType.ELEMENT_ATTRIBUTE](attrs.superCall);
    }
    if (callbacks[rionite_template_parser_1.NodeType.ELEMENT_ATTRIBUTE]) {
        for (let attr of attrs.list) {
            callbacks[rionite_template_parser_1.NodeType.ELEMENT_ATTRIBUTE](attr);
        }
    }
}
exports.walkAttributes = walkAttributes;
