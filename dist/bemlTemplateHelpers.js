"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var beml_1 = require("@riim/beml");
beml_1.Template.helpers['if-then'] = beml_1.Template.helpers['if-else'] = beml_1.Template.helpers['repeat'] = function (el) {
    var origAttrs = el.attributes;
    var attrs = {
        superCall: origAttrs && origAttrs.superCall,
        list: origAttrs ? origAttrs.list.slice() : []
    };
    attrs.list.push({
        name: 'is',
        value: 'rt-' + el.tagName
    });
    return [{
            nodeType: beml_1.NodeType.ELEMENT,
            isHelper: false,
            tagName: 'template',
            names: el.names,
            attributes: attrs,
            content: el.content
        }];
};
