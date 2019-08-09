(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory(require("cellx"));
	else if(typeof define === 'function' && define.amd)
		define(["cellx"], factory);
	else if(typeof exports === 'object')
		exports["rionite"] = factory(require("cellx"));
	else
		root["rionite"] = factory(root["cellx"]);
})(window, function(__WEBPACK_EXTERNAL_MODULE__6__) {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
__webpack_require__(1);
__webpack_require__(2);
var config_1 = __webpack_require__(17);
exports.configure = config_1.configure;
var formatters_1 = __webpack_require__(16);
exports.formatters = formatters_1.formatters;
var Component_1 = __webpack_require__(29);
exports.Component = Component_1.Component;
var Param_1 = __webpack_require__(40);
exports.Param = Param_1.Param;
var Constants_1 = __webpack_require__(15);
exports.KEY_PARAMS_CONFIG = Constants_1.KEY_PARAMS_CONFIG;
exports.KEY_PARAM_VALUES = Constants_1.KEY_PARAM_VALUES;
var BaseComponent_1 = __webpack_require__(41);
exports.BaseComponent = BaseComponent_1.BaseComponent;
var ElementProtoMixin_1 = __webpack_require__(35);
exports.KEY_ELEMENT_CONNECTED = ElementProtoMixin_1.KEY_ELEMENT_CONNECTED;
var ComponentParams_1 = __webpack_require__(33);
exports.ComponentParams = ComponentParams_1.ComponentParams;
var Template_1 = __webpack_require__(3);
exports.TemplateNodeType = Template_1.NodeType;
exports.KEY_CONTENT_TEMPLATE = Template_1.KEY_CONTENT_TEMPLATE;
exports.Template = Template_1.Template;
var registerComponent_1 = __webpack_require__(30);
exports.registerComponent = registerComponent_1.registerComponent;
var RnIfThen_1 = __webpack_require__(48);
exports.RnIfThen = RnIfThen_1.RnIfThen;
var RnIfElse_1 = __webpack_require__(53);
exports.RnIfElse = RnIfElse_1.RnIfElse;
var RnRepeat_1 = __webpack_require__(52);
exports.RnRepeat = RnRepeat_1.RnRepeat;
var RnSlot_1 = __webpack_require__(54);
exports.RnSlot = RnSlot_1.RnSlot;


/***/ }),
/* 1 */
/***/ (function(module, exports) {

if (!('firstElementChild' in DocumentFragment.prototype)) {
    Object.defineProperty(DocumentFragment.prototype, 'firstElementChild', {
        configurable: true,
        enumerable: false,
        get() {
            for (let child = this.firstChild; child; child = child.nextSibling) {
                if (child.nodeType == Node.ELEMENT_NODE) {
                    return child;
                }
            }
            return null;
        }
    });
}
if (!('nextElementSibling' in DocumentFragment.prototype)) {
    Object.defineProperty(DocumentFragment.prototype, 'nextElementSibling', {
        configurable: true,
        enumerable: false,
        get() {
            for (let child = this.nextSibling; child; child = child.nextSibling) {
                if (child.nodeType == Node.ELEMENT_NODE) {
                    return child;
                }
            }
            return null;
        }
    });
}


/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const Template_1 = __webpack_require__(3);
[['IfThen', 'rn-if-then'], ['IfElse', 'rn-if-else'], ['Repeat', 'rn-repeat']].forEach(([name, is]) => {
    Template_1.Template.elementTransformers[name] = el => {
        if (name != 'Repeat') {
            let list = el.attributes.list;
            if (list) {
                let index = list['length='] - 1;
                let foundIndex;
                for (; index >= 0; index--) {
                    if (list[index].value == '') {
                        foundIndex = index;
                    }
                    else if (list[index].name == 'if') {
                        break;
                    }
                }
                if (index == -1 && foundIndex !== undefined) {
                    let attr = list[foundIndex];
                    delete list[attr.name];
                    list['if'] = foundIndex;
                    list[foundIndex] = {
                        isTransformer: false,
                        name: 'if',
                        value: attr.name,
                        pos: -1
                    };
                }
            }
        }
        return [
            {
                nodeType: Template_1.NodeType.ELEMENT,
                isTransformer: false,
                tagName: 'template',
                is,
                names: el.names,
                attributes: el.attributes,
                $specifiedParams: null,
                events: null,
                domEvents: null,
                content: el.content,
                contentTemplateIndex: null
            }
        ];
    };
});
[['if', 'rn-if-then'], ['unless', 'rn-if-else'], ['for', 'rn-repeat']].forEach(([name, is]) => {
    Template_1.Template.attributeTransformers[name] = (el, attr) => {
        return {
            nodeType: Template_1.NodeType.ELEMENT,
            isTransformer: false,
            tagName: 'template',
            is,
            names: null,
            attributes: {
                attributeIsValue: is,
                list: {
                    0: {
                        isTransformer: false,
                        name: name == 'unless' ? 'if' : name,
                        value: attr.value,
                        pos: -1
                    },
                    'length=': 1
                }
            },
            $specifiedParams: null,
            events: null,
            domEvents: null,
            content: [el],
            contentTemplateIndex: null
        };
    };
});


/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const kebab_case_1 = __webpack_require__(4);
const rionite_snake_case_attribute_name_1 = __webpack_require__(5);
const cellx_1 = __webpack_require__(6);
const bindContent_1 = __webpack_require__(7);
const compileTemplateNodeValue_1 = __webpack_require__(8);
const componentConstructors_1 = __webpack_require__(26);
const Constants_1 = __webpack_require__(15);
const getTemplateNodeValueAST_1 = __webpack_require__(22);
const handleDOMEvent_1 = __webpack_require__(27);
const handleEvent_1 = __webpack_require__(28);
const compileKeypath_1 = __webpack_require__(23);
const setAttribute_1 = __webpack_require__(24);
const svgNamespaceURI_1 = __webpack_require__(25);
var NodeType;
(function (NodeType) {
    NodeType[NodeType["BLOCK"] = 1] = "BLOCK";
    NodeType[NodeType["ELEMENT_CALL"] = 2] = "ELEMENT_CALL";
    NodeType[NodeType["SUPER_CALL"] = 3] = "SUPER_CALL";
    NodeType[NodeType["DEBUGGER_CALL"] = 4] = "DEBUGGER_CALL";
    NodeType[NodeType["ELEMENT"] = 5] = "ELEMENT";
    NodeType[NodeType["TEXT"] = 6] = "TEXT";
})(NodeType = exports.NodeType || (exports.NodeType = {}));
exports.KEY_CONTENT_TEMPLATE = Symbol('contentTemplate');
const emptyObj = { __proto__: null };
const escapee = new Map([
    ['/', '/'],
    ['\\', '\\'],
    ['b', '\b'],
    ['f', '\f'],
    ['n', '\n'],
    ['r', '\r'],
    ['t', '\t']
]);
const reWhitespace = /\s/;
const reTagName = /[a-zA-Z][\-\w]*|/g;
const reElementName = /[a-zA-Z][\-\w]*|/g;
const reAttributeName = /[^\s'">/=,)]+|/g;
const reSuperCall = /super(?:\.([a-zA-Z][\-\w]*))?!|/g;
const reTrimStartLine = /^[ \t]+/gm;
const reTrimEndLine = /[ \t]+$/gm;
function normalizeMultilineText(text) {
    return text.replace(reTrimStartLine, '').replace(reTrimEndLine, '');
}
exports.ELEMENT_NAME_DELIMITER = '__';
class Template {
    constructor(template, options) {
        this.initialized = false;
        let embedded = (this._embedded = !!(options && options._embedded));
        let parent = (this.parent = (options && options.parent) || null);
        if (typeof template == 'string') {
            this.template = template;
            this.block = null;
        }
        else {
            this.block = template;
            this._elements = template.elements;
        }
        if (embedded) {
            this._elementNamesTemplate = parent._elementNamesTemplate;
        }
        else {
            let blockName = options && options.blockName;
            if (Array.isArray(blockName)) {
                this.setBlockName(blockName);
            }
            else if (parent) {
                this._elementNamesTemplate = blockName
                    ? [blockName + exports.ELEMENT_NAME_DELIMITER].concat(parent._elementNamesTemplate)
                    : parent._elementNamesTemplate.slice();
            }
            else if (blockName) {
                this._elementNamesTemplate = [blockName + exports.ELEMENT_NAME_DELIMITER, ''];
            }
            else {
                this._elementNamesTemplate = ['', ''];
            }
        }
    }
    initialize(component) {
        if (this.initialized) {
            return;
        }
        this.initialized = true;
        if (this.parent) {
            this.parent.parse(component);
        }
        let parent = this.parent;
        if (!this._embedded) {
            this._elements = parent
                ? { __proto__: parent._elements }
                : {
                    __proto__: null,
                    '@root': {
                        nodeType: NodeType.ELEMENT,
                        isTransformer: true,
                        tagName: 'section',
                        is: null,
                        names: ['root'],
                        attributes: null,
                        $specifiedParams: null,
                        events: null,
                        domEvents: null,
                        content: [],
                        contentTemplateIndex: null
                    }
                };
        }
        this._embeddedTemplates = this._embedded
            ? parent._embeddedTemplates
            : parent &&
                parent._embeddedTemplates &&
                parent._embeddedTemplates.map(template => new Template({
                    nodeType: NodeType.BLOCK,
                    content: template.block.content,
                    elements: this._elements
                }, {
                    _embedded: true,
                    parent: this
                }));
    }
    parse(component) {
        this.initialize(component);
        if (this.block) {
            return this.block;
        }
        this._pos = 0;
        this._chr = this.template.charAt(0);
        this._skipWhitespacesAndComments();
        let block = (this.block = {
            nodeType: NodeType.BLOCK,
            content: null,
            elements: this._elements
        });
        this._readContent(this.parent ? null : block.elements['@root'].content, null, false, component && component.constructor);
        return block;
    }
    _readContent(content, superElName, brackets, componentConstr) {
        if (brackets) {
            this._next('{');
            this._skipWhitespacesAndComments();
        }
        for (;;) {
            switch (this._chr) {
                case "'":
                case '"':
                case '`': {
                    (content || (content = [])).push({
                        nodeType: NodeType.TEXT,
                        value: this._readString()
                    });
                    break;
                }
                case '': {
                    if (brackets) {
                        this._throwError('Unexpected end of template. Expected "}" to close block.');
                    }
                    return content;
                }
                default: {
                    let chr = this._chr;
                    if (chr == 'd' && this.template.substr(this._pos, 9) == 'debugger!') {
                        this._chr = this.template.charAt((this._pos += 9));
                        (content || (content = [])).push({ nodeType: NodeType.DEBUGGER_CALL });
                        break;
                    }
                    if (brackets) {
                        if (chr == '}') {
                            this._next();
                            return content;
                        }
                        let superCall = this._readSuperCall(superElName);
                        if (superCall) {
                            (content || (content = [])).push(superCall);
                            break;
                        }
                    }
                    content = this._readElement(content, superElName, componentConstr);
                    break;
                }
            }
            this._skipWhitespacesAndComments();
        }
    }
    _readElement(targetContent, superElName, componentConstr) {
        let pos = this._pos;
        let isTransformer = this._chr == '@';
        if (isTransformer) {
            this._next();
        }
        let tagName = this._readName(reTagName);
        this._skipWhitespacesAndComments();
        let elNames;
        let elName;
        if (this._chr == ':') {
            this._next();
            let pos = this._pos;
            this._skipWhitespacesAndComments();
            if (this._chr == ':') {
                elNames = [null];
                this._next();
                this._skipWhitespacesAndComments();
            }
            for (let name; (name = this._readName(reElementName));) {
                (elNames || (elNames = [])).push(name);
                if (this._skipWhitespacesAndComments() != ':') {
                    break;
                }
                this._next();
                this._skipWhitespacesAndComments();
            }
            if (!elNames || (!elNames[0] && elNames.length == 1)) {
                this._throwError('Expected element name', pos);
            }
            elName = isTransformer ? elNames[0] && '@' + elNames[0] : elNames[0];
        }
        if (tagName) {
            if (!isTransformer) {
                tagName = kebab_case_1.kebabCase(tagName, true);
            }
        }
        else {
            if (!elName) {
                this._throwError('Expected element', pos);
            }
            if (!this.parent || !(tagName = (this.parent._elements[elName] || emptyObj).tagName)) {
                throw this._throwError('Element.tagName is required', isTransformer ? pos + 1 : pos);
            }
        }
        let elComponentConstr = componentConstructors_1.componentConstructors.get(tagName);
        let attrs;
        let $specifiedParams;
        if (elComponentConstr) {
            $specifiedParams = new Map();
        }
        if (this._chr == '(') {
            attrs = this._readAttributes(elName || superElName, elComponentConstr && elComponentConstr[Constants_1.KEY_PARAMS_CONFIG], $specifiedParams);
            this._skipWhitespaces();
        }
        let events;
        let domEvents;
        if (elNames && componentConstr) {
            let componentEvents = componentConstr.events;
            let componentDOMEvents = componentConstr.domEvents;
            if (componentEvents || componentDOMEvents) {
                for (let name of elNames) {
                    if (!name) {
                        continue;
                    }
                    let elEvents = componentEvents && componentEvents[name];
                    for (let type in elEvents) {
                        if (elEvents[type] !== Object.prototype[type]) {
                            (events || (events = new Map())).set(type, name);
                        }
                    }
                    while (elEvents) {
                        for (let type of Object.getOwnPropertySymbols(elEvents)) {
                            if (!events || !events.has(type)) {
                                (events || (events = new Map())).set(type, name);
                            }
                        }
                        elEvents = elEvents.__proto__;
                        if (elEvents == Object.prototype) {
                            break;
                        }
                    }
                    let elDOMEvents = componentDOMEvents && componentDOMEvents[name];
                    for (let type in elDOMEvents) {
                        if (elDOMEvents[type] !== Object.prototype[type]) {
                            (domEvents || (domEvents = new Map())).set(type, name);
                        }
                    }
                }
            }
        }
        let content;
        if (this._chr == '{') {
            content = this._readContent(null, elName || superElName, true, componentConstr);
        }
        let el = {
            nodeType: NodeType.ELEMENT,
            isTransformer,
            tagName,
            is: (attrs && attrs.attributeIsValue) || null,
            names: elNames || null,
            attributes: attrs || null,
            $specifiedParams: $specifiedParams || null,
            events: events || null,
            domEvents: domEvents || null,
            content: content || null,
            contentTemplateIndex: null
        };
        if (isTransformer) {
            let transformer = Template.elementTransformers[tagName];
            if (!transformer) {
                this._throwError(`Transformer "${tagName}" is not defined`, pos);
            }
            content = transformer(el);
            if (content && content.length) {
                el.content = content;
                for (let i = 0, l = content.length; i < l; i++) {
                    let node = content[i];
                    if (node.nodeType == NodeType.ELEMENT) {
                        if (node.content &&
                            (node.tagName == 'template' ||
                                node.tagName == 'rn-slot')) {
                            let contentEl = {
                                nodeType: NodeType.ELEMENT,
                                isTransformer: false,
                                tagName: node.tagName,
                                is: node.is,
                                names: node.names,
                                attributes: node.attributes,
                                $specifiedParams: node.$specifiedParams,
                                events: node.events,
                                domEvents: node.domEvents,
                                content: node.content,
                                contentTemplateIndex: (this._embeddedTemplates || (this._embeddedTemplates = [])).push(new Template({
                                    nodeType: NodeType.BLOCK,
                                    content: node.content,
                                    elements: this._elements
                                }, {
                                    _embedded: true,
                                    parent: this
                                })) - 1
                            };
                            let elName = contentEl.names && contentEl.names[0];
                            if (elName) {
                                this._elements[elName] = contentEl;
                                content[i] = {
                                    nodeType: NodeType.ELEMENT_CALL,
                                    name: elName
                                };
                            }
                            else {
                                content[i] = contentEl;
                            }
                        }
                        else {
                            let elName = node.names && node.names[0];
                            if (elName) {
                                this._elements[elName] = node;
                                content[i] = {
                                    nodeType: NodeType.ELEMENT_CALL,
                                    name: elName
                                };
                            }
                        }
                    }
                }
            }
            else {
                el.content = null;
            }
        }
        else {
            let attrList = attrs && attrs.list;
            if (attrList) {
                for (let i = 0, l = attrList['length=']; i < l; i++) {
                    let attr = attrList[i];
                    if (attr.isTransformer) {
                        let transformer = Template.attributeTransformers[attr.name];
                        if (!transformer) {
                            this._throwError(`Transformer "${attr.name}" is not defined`, attr.pos);
                        }
                        el = transformer(el, attr);
                        for (let i = 0, l = (el.content || []).length; i < l; i++) {
                            let node = el.content[i];
                            if (node.nodeType == NodeType.ELEMENT) {
                                if (node.content &&
                                    (node.tagName == 'template' ||
                                        node.tagName == 'rn-slot')) {
                                    let contentEl = {
                                        nodeType: NodeType.ELEMENT,
                                        isTransformer: false,
                                        tagName: node.tagName,
                                        is: node.is,
                                        names: node.names,
                                        attributes: node.attributes,
                                        $specifiedParams: node.$specifiedParams,
                                        events: node.events,
                                        domEvents: node.domEvents,
                                        content: node.content,
                                        contentTemplateIndex: (this._embeddedTemplates ||
                                            (this._embeddedTemplates = [])).push(new Template({
                                            nodeType: NodeType.BLOCK,
                                            content: node.content,
                                            elements: this._elements
                                        }, {
                                            _embedded: true,
                                            parent: this
                                        })) - 1
                                    };
                                    let elName = contentEl.names && contentEl.names[0];
                                    if (elName) {
                                        this._elements[elName] = contentEl;
                                        el.content[i] = {
                                            nodeType: NodeType.ELEMENT_CALL,
                                            name: elName
                                        };
                                    }
                                    else {
                                        el.content[i] = contentEl;
                                    }
                                }
                                else {
                                    let elName = node.names && node.names[0];
                                    if (elName) {
                                        this._elements[elName] = node;
                                        el.content[i] = {
                                            nodeType: NodeType.ELEMENT_CALL,
                                            name: elName
                                        };
                                    }
                                }
                            }
                        }
                    }
                }
            }
            if (el.content && (el.tagName == 'template' || el.tagName == 'rn-slot')) {
                el.contentTemplateIndex =
                    (this._embeddedTemplates || (this._embeddedTemplates = [])).push(new Template({
                        nodeType: NodeType.BLOCK,
                        content: el.content,
                        elements: this._elements
                    }, {
                        _embedded: true,
                        parent: this
                    })) - 1;
            }
            elName = el.names && el.names[0];
        }
        if (elName) {
            this._elements[elName] = el;
            (targetContent || (targetContent = [])).push({
                nodeType: NodeType.ELEMENT_CALL,
                name: elName
            });
        }
        else {
            (targetContent || (targetContent = [])).push(el);
        }
        return targetContent;
    }
    _readAttributes(superElName, $paramsConfig, $specifiedParams) {
        this._next('(');
        if (this._skipWhitespacesAndComments() == ')') {
            this._next();
            return null;
        }
        let superCall;
        let attrIsValue;
        let list;
        loop: for (let f = true;; f = false) {
            if (f && this._chr == 's' && (superCall = this._readSuperCall(superElName))) {
                let superElAttrs = superCall.element.attributes;
                if (superElAttrs) {
                    let superElAttrList = superElAttrs.list;
                    attrIsValue = superElAttrs.attributeIsValue;
                    list = { __proto__: superElAttrList };
                    if ($paramsConfig && superElAttrList) {
                        for (let i = 0, l = superElAttrList['length=']; i < l; i++) {
                            let attr = superElAttrList[i];
                            if (!attr.isTransformer && $paramsConfig.has(attr.name)) {
                                $specifiedParams.set($paramsConfig.get(attr.name).name, attr.value);
                            }
                        }
                    }
                }
                this._skipWhitespacesAndComments();
            }
            else {
                let pos = this._pos;
                let isTransformer = this._chr == '@';
                if (isTransformer) {
                    this._next();
                }
                let name = this._readName(reAttributeName);
                if (!name) {
                    throw this._throwError('Expected attribute name');
                }
                let fullName = (isTransformer ? '@' : '') + name;
                let value;
                if (this._skipWhitespacesAndComments() == '=') {
                    this._next();
                    let chr = this._skipWhitespaces();
                    if (chr == "'" || chr == '"' || chr == '`') {
                        value = this._readString();
                        if (fullName == 'is') {
                            attrIsValue = value;
                        }
                        else {
                            (list || (list = { __proto__: null, 'length=': 0 }))[list[fullName] === undefined
                                ? (list[fullName] = list['length=']++)
                                : list[fullName]] = {
                                isTransformer,
                                name,
                                value,
                                pos
                            };
                        }
                        this._skipWhitespacesAndComments();
                    }
                    else {
                        value = '';
                        for (;;) {
                            if (!chr) {
                                this._throwError('Unexpected end of template. Expected "," or ")" to finalize attribute value.');
                            }
                            if (chr == ',' || chr == ')' || chr == '\n' || chr == '\r') {
                                value = value.trim();
                                if (fullName == 'is') {
                                    attrIsValue = value;
                                }
                                else {
                                    (list || (list = { __proto__: null, 'length=': 0 }))[list[fullName] === undefined
                                        ? (list[fullName] = list['length=']++)
                                        : list[fullName]] = {
                                        isTransformer,
                                        name,
                                        value,
                                        pos
                                    };
                                }
                                if (chr == '\n' || chr == '\r') {
                                    this._skipWhitespacesAndComments();
                                }
                                break;
                            }
                            value += chr;
                            chr = this._next();
                        }
                    }
                }
                else {
                    value = '';
                    if (fullName == 'is') {
                        attrIsValue = value;
                    }
                    else {
                        (list || (list = { __proto__: null, 'length=': 0 }))[list[fullName] === undefined
                            ? (list[fullName] = list['length=']++)
                            : list[fullName]] = {
                            isTransformer,
                            name,
                            value,
                            pos
                        };
                    }
                }
                if ($paramsConfig && $paramsConfig.has(name)) {
                    $specifiedParams.set($paramsConfig.get(name).name, value);
                }
            }
            switch (this._chr) {
                case ')': {
                    this._next();
                    break loop;
                }
                case ',': {
                    this._next();
                    this._skipWhitespacesAndComments();
                    break;
                }
                default: {
                    this._throwError('Unexpected end of template. Expected "," or ")" to finalize attribute value.');
                }
            }
        }
        return attrIsValue == null && !list
            ? null
            : {
                attributeIsValue: attrIsValue || null,
                list: list || null
            };
    }
    _readSuperCall(defaultElName) {
        reSuperCall.lastIndex = this._pos;
        let match = reSuperCall.exec(this.template);
        if (match[0]) {
            if (!this.parent) {
                this._throwError('SuperCall is impossible if no parent is defined');
            }
            let elName = match[1] ||
                defaultElName ||
                this._throwError('SuperCall.elementName is required');
            let el = (elName.charAt(0) == '@' && this.parent._elements[elName.slice(1)]) ||
                this.parent._elements[elName];
            if (!el) {
                this._throwError(`Element "${elName}" is not defined`);
            }
            this._chr = this.template.charAt((this._pos = reSuperCall.lastIndex));
            return {
                nodeType: NodeType.SUPER_CALL,
                elementName: elName,
                element: el
            };
        }
        return null;
    }
    _readName(reName) {
        reName.lastIndex = this._pos;
        let name = reName.exec(this.template)[0];
        if (name) {
            this._chr = this.template.charAt((this._pos = reName.lastIndex));
            return name;
        }
        return null;
    }
    _readString() {
        let quoteChar = this._chr;
        // if (process.env.DEBUG && quoteChar != "'" && quoteChar != '"' && quoteChar != '`') {
        // 	this._throwError('Expected string');
        // }
        let str = '';
        for (let chr = this._next(); chr;) {
            if (chr == quoteChar) {
                this._next();
                return quoteChar == '`' ? normalizeMultilineText(str) : str;
            }
            if (chr == '\\') {
                chr = this._next();
                if (chr == 'x' || chr == 'u') {
                    let pos = this._pos + 1;
                    let hexadecimal = chr == 'x';
                    let code = parseInt(this.template.slice(pos, pos + (hexadecimal ? 2 : 4)), 16);
                    if (!isFinite(code)) {
                        this._throwError(`Invalid ${hexadecimal ? 'hexadecimal' : 'unicode'} escape sequence`, pos);
                    }
                    str += String.fromCharCode(code);
                    chr = this._chr = this.template.charAt((this._pos = pos + (hexadecimal ? 2 : 4)));
                }
                else if (escapee.has(chr)) {
                    str += escapee.get(chr);
                    chr = this._next();
                }
                else {
                    this._throwError('Invalid escape sequence', this._pos - 1);
                }
            }
            else {
                str += chr;
                chr = this._next();
            }
        }
        throw 1;
    }
    _skipWhitespaces() {
        let chr = this._chr;
        while (chr && reWhitespace.test(chr)) {
            chr = this._next();
        }
        return chr;
    }
    _skipWhitespacesAndComments() {
        let chr = this._chr;
        loop1: for (;;) {
            if (chr == '/') {
                switch (this.template.charAt(this._pos + 1)) {
                    case '/': {
                        this._next();
                        while ((chr = this._next()) && chr != '\n' && chr != '\r') { }
                        break;
                    }
                    case '*': {
                        let pos = this._pos;
                        this._next();
                        loop2: for (;;) {
                            switch (this._next()) {
                                case '*': {
                                    if (this._next() == '/') {
                                        chr = this._next();
                                        break loop2;
                                    }
                                    break;
                                }
                                case '': {
                                    this._throwError('Expected "*/" to close multiline comment', pos);
                                }
                            }
                        }
                        break;
                    }
                    default: {
                        break loop1;
                    }
                }
            }
            else if (chr && reWhitespace.test(chr)) {
                chr = this._next();
            }
            else {
                break;
            }
        }
        return chr;
    }
    _next(current) {
        if (current && current != this._chr) {
            this._throwError(`Expected "${current}" instead of "${this._chr}"`);
        }
        return (this._chr = this.template.charAt(++this._pos));
    }
    _throwError(msg, pos = this._pos) {
        let n = pos < 40 ? 40 - pos : 0;
        throw new SyntaxError(msg +
            '\n' +
            this.template
                .slice(pos < 40 ? 0 : pos - 40, pos + 20)
                .replace(/\t/g, ' ')
                .replace(/\n|\r\n?/g, match => {
                if (match.length == 2) {
                    n++;
                }
                return '↵';
            }) +
            '\n' +
            '----------------------------------------'.slice(n) +
            '↑');
    }
    extend(template, options) {
        return new Template(template, {
            __proto__: options,
            parent: this
        });
    }
    setBlockName(blockName) {
        if (Array.isArray(blockName)) {
            (this._elementNamesTemplate = blockName.map(blockName => blockName + exports.ELEMENT_NAME_DELIMITER)).push('');
        }
        else {
            this._elementNamesTemplate[0] = blockName + exports.ELEMENT_NAME_DELIMITER;
        }
        return this;
    }
    render(component, ownerComponent, context, result, parentComponent) {
        let block = this.parse(component);
        return renderContent(document.createDocumentFragment(), block.content || block.elements['@root'].content, this, false, ownerComponent, context, result, parentComponent);
    }
}
Template.elementTransformers = {
    section: el => el.content
};
Template.attributeTransformers = {};
exports.Template = Template;
function renderContent(targetNode, content, template, isSVG, ownerComponent, context, result, parentComponent) {
    if (content) {
        for (let node of content) {
            switch (node.nodeType) {
                case NodeType.ELEMENT_CALL: {
                    node = template._elements[node.name];
                    break;
                }
                case NodeType.SUPER_CALL: {
                    renderContent(targetNode, node.element.content, template, isSVG, ownerComponent, context, result, parentComponent);
                    continue;
                }
            }
            switch (node.nodeType) {
                case NodeType.ELEMENT: {
                    if (node.isTransformer) {
                        renderContent(targetNode, node.content, template, isSVG, ownerComponent, context, result, parentComponent);
                    }
                    else {
                        let tagName = node.tagName;
                        let isSVG_ = isSVG || tagName == 'svg';
                        let el;
                        if (isSVG_) {
                            el = document.createElementNS(svgNamespaceURI_1.svgNamespaceURI, tagName);
                        }
                        else if (node.is) {
                            el = window.innerHTML(document.createElement('div'), `<${tagName} is="${node.is}">`).firstChild;
                        }
                        else {
                            el = document.createElement(tagName);
                        }
                        let nodeComponent = result && el.rioniteComponent;
                        let className;
                        if (nodeComponent) {
                            className = nodeComponent.constructor
                                ._blockNamesString;
                        }
                        if (node.names) {
                            className =
                                (className || '') +
                                    renderElementClasses(template._elementNamesTemplate, node.names);
                        }
                        let attrList = node.attributes && node.attributes.list;
                        if (attrList) {
                            let $paramsConfig;
                            if (nodeComponent) {
                                $paramsConfig = nodeComponent.constructor[Constants_1.KEY_PARAMS_CONFIG];
                            }
                            for (let i = 0, l = attrList['length=']; i < l; i++) {
                                let attr = attrList[i];
                                if (attr.isTransformer) {
                                    continue;
                                }
                                let attrName = isSVG_
                                    ? attr.name
                                    : rionite_snake_case_attribute_name_1.snakeCaseAttributeName(attr.name, true);
                                let attrValue = attr.value;
                                if (attrName == 'class') {
                                    attrValue = (className || '') + attrValue;
                                    className = null;
                                }
                                if (result) {
                                    if (!attrName.lastIndexOf('oncomponent-', 0) ||
                                        !attrName.lastIndexOf('on-', 0)) {
                                        el[bindContent_1.KEY_CONTEXT] = context;
                                    }
                                    if (attrValue) {
                                        let attrValueAST = getTemplateNodeValueAST_1.getTemplateNodeValueAST(attrValue);
                                        if (attrValueAST) {
                                            let bindingPrefix = attrValueAST.length == 1
                                                ? attrValueAST[0]
                                                    .prefix
                                                : null;
                                            if (bindingPrefix === '=') {
                                                attrValue = compileTemplateNodeValue_1.compileTemplateNodeValue(attrValueAST, attrValue, true).call(context);
                                            }
                                            else {
                                                if (bindingPrefix !== '->') {
                                                    let cell = new cellx_1.Cell(compileTemplateNodeValue_1.compileTemplateNodeValue(attrValueAST, attrValue, attrValueAST.length == 1), {
                                                        context,
                                                        meta: {
                                                            element: el,
                                                            attributeName: attrName
                                                        },
                                                        onChange: bindContent_1.onAttributeBindingCellChange
                                                    });
                                                    attrValue = cell.get();
                                                    (result[1] || (result[1] = [])).push(cell);
                                                }
                                                let $paramConfig = $paramsConfig && $paramsConfig.get(attrName);
                                                if ($paramConfig &&
                                                    (bindingPrefix === '->' ||
                                                        bindingPrefix === '<->')) {
                                                    if (bindingPrefix == '->' &&
                                                        attrName.charAt(0) != '_') {
                                                        attrValue = null;
                                                    }
                                                    let keypath = attrValueAST[0].keypath.split('.');
                                                    (result[2] || (result[2] = [])).push(nodeComponent, $paramConfig.property, keypath.length == 1
                                                        ? (propertyName => function (evt) {
                                                            this.ownerComponent[propertyName] = evt.data.value;
                                                        })(keypath[0])
                                                        : ((propertyName, keypath) => {
                                                            let getPropertyHolder = compileKeypath_1.compileKeypath(keypath, keypath.join('.'));
                                                            return function (evt) {
                                                                let propertyHolder = getPropertyHolder.call(this.ownerComponent);
                                                                if (propertyHolder) {
                                                                    propertyHolder[propertyName] = evt.data.value;
                                                                }
                                                            };
                                                        })(keypath[keypath.length - 1], keypath.slice(0, -1)));
                                                }
                                            }
                                        }
                                    }
                                }
                                if (attrValue !== false && attrValue != null) {
                                    setAttribute_1.setAttribute(el, attrName, attrValue);
                                }
                            }
                        }
                        if (className) {
                            if (isSVG_) {
                                el.setAttribute('class', className);
                            }
                            else {
                                el.className = className;
                            }
                        }
                        if (node.events) {
                            el[handleEvent_1.KEY_EVENTS] = node.events;
                            el[bindContent_1.KEY_CONTEXT] = context;
                        }
                        if (node.domEvents) {
                            el[handleDOMEvent_1.KEY_DOM_EVENTS] = node.domEvents;
                            el[bindContent_1.KEY_CONTEXT] = context;
                        }
                        if (nodeComponent) {
                            nodeComponent._ownerComponent = ownerComponent;
                            nodeComponent.$context = context;
                            nodeComponent.$specifiedParams = node.$specifiedParams;
                            if (parentComponent) {
                                (parentComponent[Constants_1.KEY_CHILD_COMPONENTS] ||
                                    (parentComponent[Constants_1.KEY_CHILD_COMPONENTS] = [])).push(nodeComponent);
                            }
                            else {
                                (result[0] || (result[0] = [])).push(nodeComponent);
                            }
                        }
                        if (node.contentTemplateIndex !== null) {
                            el[exports.KEY_CONTENT_TEMPLATE] = template._embeddedTemplates[node.contentTemplateIndex];
                        }
                        else if (result &&
                            (!nodeComponent ||
                                !nodeComponent.constructor
                                    .bindsInputContent)) {
                            renderContent(el, node.content, template, isSVG_, ownerComponent, context, result, nodeComponent);
                        }
                        else {
                            renderContent(el, node.content, template, isSVG_);
                        }
                        targetNode.appendChild(el);
                    }
                    break;
                }
                case NodeType.TEXT: {
                    let nodeValue = node.value;
                    if (result) {
                        let nodeValueAST = getTemplateNodeValueAST_1.getTemplateNodeValueAST(nodeValue);
                        if (nodeValueAST) {
                            if (nodeValueAST.length == 1 &&
                                nodeValueAST[0].prefix === '=') {
                                targetNode.appendChild(document.createTextNode(compileTemplateNodeValue_1.compileTemplateNodeValue(nodeValueAST, nodeValue, false).call(context)));
                            }
                            else {
                                let meta = { textNode: null };
                                let cell = new cellx_1.Cell(compileTemplateNodeValue_1.compileTemplateNodeValue(nodeValueAST, nodeValue, false), {
                                    context,
                                    meta,
                                    onChange: bindContent_1.onTextNodeBindingCellChange
                                });
                                meta.textNode = targetNode.appendChild(document.createTextNode(cell.get()));
                                (result[1] || (result[1] = [])).push(cell);
                            }
                            break;
                        }
                    }
                    targetNode.appendChild(document.createTextNode(nodeValue));
                    break;
                }
            }
        }
    }
    return targetNode;
}
function renderElementClasses(elementNamesTemplate, elNames) {
    let elClasses = '';
    for (let i = elNames[0] ? 0 : 1, l = elNames.length; i < l; i++) {
        elClasses += elementNamesTemplate.join(elNames[i] + ' ');
    }
    return elClasses;
}


/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var reHeadTail = /-?([A-Z])([^A-Z])/g;
var reLongHead = /-?([A-Z]+)/g;
var reDash = /^-/;
var cache = Object.create(null);
function kebabCase(str, useCache) {
    str = String(str);
    var value;
    return ((useCache && cache[str]) ||
        ((value = str
            .replace(reHeadTail, function (match, head, tail) { return '-' + head.toLowerCase() + tail; })
            .replace(reLongHead, function (match, head) { return '-' + head.toLowerCase(); })
            .replace(reDash, '')),
            useCache ? (cache[str] = value) : value));
}
exports.kebabCase = kebabCase;


/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var reCamelCase = /^_?[a-z][0-9a-z]*$/i;
var reLetters = /[A-Z][^A-Z]/g;
var reLetters2 = /[A-Z]{2,}/g;
var cache = new Map();
function snakeCaseAttributeName(str, useCache) {
    var value;
    return ((useCache && cache.get(str)) ||
        ((value = reCamelCase.test(str)
            ? str
                .replace(reLetters, function (word) { return '_' + word; })
                .replace(reLetters2, function (word) { return '_' + word; })
                .toLowerCase()
            : str),
            useCache && cache.set(str, value),
            value));
}
exports.snakeCaseAttributeName = snakeCaseAttributeName;


/***/ }),
/* 6 */
/***/ (function(module, exports) {

module.exports = __WEBPACK_EXTERNAL_MODULE__6__;

/***/ }),
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const cellx_1 = __webpack_require__(6);
const compileTemplateNodeValue_1 = __webpack_require__(8);
const Constants_1 = __webpack_require__(15);
const getTemplateNodeValueAST_1 = __webpack_require__(22);
const compileKeypath_1 = __webpack_require__(23);
const setAttribute_1 = __webpack_require__(24);
exports.KEY_CONTEXT = Symbol('context');
exports.templateNodeValueASTCache = new Map();
function onAttributeBindingCellChange(evt) {
    setAttribute_1.setAttribute(evt.target.meta.element, evt.target.meta.attributeName, evt.data.value);
}
exports.onAttributeBindingCellChange = onAttributeBindingCellChange;
function onTextNodeBindingCellChange(evt) {
    evt.target.meta.textNode.nodeValue = evt.data.value;
}
exports.onTextNodeBindingCellChange = onTextNodeBindingCellChange;
function bindContent(node, ownerComponent, context, result, parentComponent) {
    for (let child = node.firstChild; child; child = child.nextSibling) {
        switch (child.nodeType) {
            case Node.ELEMENT_NODE: {
                let childComponent = child.rioniteComponent;
                let $paramsConfig;
                let $specifiedParams;
                if (childComponent) {
                    $paramsConfig = childComponent.constructor[Constants_1.KEY_PARAMS_CONFIG];
                    $specifiedParams = new Map();
                }
                let attrs = child.attributes;
                for (let i = attrs.length; i;) {
                    let attr = attrs[--i];
                    let attrName = attr.name;
                    let targetAttrName;
                    if (attrName.charAt(0) == '_') {
                        targetAttrName = attrName.slice(1);
                    }
                    else {
                        targetAttrName = attrName;
                        if (!attrName.lastIndexOf('oncomponent-', 0) ||
                            !attrName.lastIndexOf('on-', 0)) {
                            child[exports.KEY_CONTEXT] = context;
                        }
                    }
                    let $paramConfig = $paramsConfig && $paramsConfig.get(targetAttrName);
                    let attrValue = attr.value;
                    if ($paramConfig) {
                        $specifiedParams.set($paramConfig.name, attrValue);
                    }
                    if (!attrValue) {
                        continue;
                    }
                    let attrValueAST = getTemplateNodeValueAST_1.getTemplateNodeValueAST(attrValue);
                    if (!attrValueAST) {
                        continue;
                    }
                    let bindingPrefix = attrValueAST.length == 1
                        ? attrValueAST[0].prefix
                        : null;
                    if (bindingPrefix === '=') {
                        setAttribute_1.setAttribute(child, targetAttrName, compileTemplateNodeValue_1.compileTemplateNodeValue(attrValueAST, attrValue, true).call(context));
                    }
                    else {
                        if (bindingPrefix !== '->') {
                            let cell = new cellx_1.Cell(compileTemplateNodeValue_1.compileTemplateNodeValue(attrValueAST, attrValue, attrValueAST.length == 1), {
                                context,
                                meta: {
                                    element: child,
                                    attributeName: targetAttrName
                                },
                                onChange: onAttributeBindingCellChange
                            });
                            setAttribute_1.setAttribute(child, targetAttrName, cell.get());
                            (result[1] || (result[1] = [])).push(cell);
                        }
                        if ($paramConfig && (bindingPrefix === '->' || bindingPrefix === '<->')) {
                            if (bindingPrefix == '->' && attrName.charAt(0) != '_') {
                                child.removeAttribute(attrName);
                            }
                            let keypath = attrValueAST[0].keypath.split('.');
                            (result[2] || (result[2] = [])).push(childComponent, $paramConfig.property, keypath.length == 1
                                ? (propertyName => function (evt) {
                                    this.ownerComponent[propertyName] = evt.data.value;
                                })(keypath[0])
                                : ((propertyName, keypath) => {
                                    let getPropertyHolder = compileKeypath_1.compileKeypath(keypath, keypath.join('.'));
                                    return function (evt) {
                                        let propertyHolder = getPropertyHolder.call(this.ownerComponent);
                                        if (propertyHolder) {
                                            propertyHolder[propertyName] = evt.data.value;
                                        }
                                    };
                                })(keypath[keypath.length - 1], keypath.slice(0, -1)));
                        }
                    }
                }
                if (childComponent) {
                    childComponent._ownerComponent = ownerComponent;
                    childComponent.$context = context;
                    childComponent.$specifiedParams = $specifiedParams;
                    if (parentComponent) {
                        (parentComponent[Constants_1.KEY_CHILD_COMPONENTS] ||
                            (parentComponent[Constants_1.KEY_CHILD_COMPONENTS] = [])).push(childComponent);
                    }
                    else {
                        (result[0] || (result[0] = [])).push(childComponent);
                    }
                }
                if (child.firstChild &&
                    (!childComponent ||
                        !childComponent.constructor.bindsInputContent)) {
                    bindContent(child, ownerComponent, context, result, childComponent);
                }
                break;
            }
            case Node.TEXT_NODE: {
                let childValue = child.nodeValue;
                let childValueAST = getTemplateNodeValueAST_1.getTemplateNodeValueAST(childValue);
                if (!childValueAST) {
                    break;
                }
                if (childValueAST.length == 1 &&
                    childValueAST[0].prefix === '=') {
                    child.nodeValue = compileTemplateNodeValue_1.compileTemplateNodeValue(childValueAST, childValue, false).call(context);
                }
                else {
                    let cell = new cellx_1.Cell(compileTemplateNodeValue_1.compileTemplateNodeValue(childValueAST, childValue, false), {
                        context,
                        meta: { textNode: child },
                        onChange: onTextNodeBindingCellChange
                    });
                    child.nodeValue = cell.get();
                    (result[1] || (result[1] = [])).push(cell);
                }
                break;
            }
        }
    }
    return result;
}
exports.bindContent = bindContent;


/***/ }),
/* 8 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const escape_string_1 = __webpack_require__(9);
const bindingToJSExpression_1 = __webpack_require__(10);
const componentParamValueConverters_1 = __webpack_require__(11);
const Constants_1 = __webpack_require__(15);
const formatters_1 = __webpack_require__(16);
const TemplateNodeValueParser_1 = __webpack_require__(18);
const cache = new Map();
function compileTemplateNodeValue(templateNodeValueAST, templateNodeValueString, useComponentParamValues) {
    let cacheKey = templateNodeValueString + (useComponentParamValues ? ',' : '.');
    if (!cache.has(cacheKey)) {
        let inner;
        if (templateNodeValueAST.length == 1) {
            inner = Function('formatters, KEY_COMPONENT_SELF', `var tmp; return ${bindingToJSExpression_1.bindingToJSExpression(templateNodeValueAST[0])};`);
        }
        else {
            let fragments = [];
            for (let node of templateNodeValueAST) {
                fragments.push(node.nodeType == TemplateNodeValueParser_1.TemplateNodeValueNodeType.TEXT
                    ? `'${escape_string_1.escapeString(node.value)}'`
                    : bindingToJSExpression_1.bindingToJSExpression(node));
            }
            inner = Function('formatters, KEY_COMPONENT_SELF', `var tmp; return [${fragments.join(', ')}].join('');`);
        }
        cache.set(cacheKey, useComponentParamValues
            ? function (cell) {
                let value = inner.call(this, formatters_1.formatters, Constants_1.KEY_COMPONENT_SELF);
                if (value) {
                    if (typeof value == 'object' || typeof value == 'function') {
                        let meta = cell.meta;
                        (meta.element[componentParamValueConverters_1.KEY_COMPONENT_PARAM_VALUES] ||
                            (meta.element[componentParamValueConverters_1.KEY_COMPONENT_PARAM_VALUES] = new Map())).set(meta.attributeName, value);
                        return meta.attributeName;
                    }
                }
                return value;
            }
            : function () {
                let value = inner.call(this, formatters_1.formatters);
                return value == null ? '' : value + '';
            });
    }
    return cache.get(cacheKey);
}
exports.compileTemplateNodeValue = compileTemplateNodeValue;


/***/ }),
/* 9 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var reEscapableChars = /[\\'"\r\n]/g;
var charToEscapedMap = Object.create(null);
charToEscapedMap['\\'] = '\\\\';
charToEscapedMap['\''] = '\\\'';
charToEscapedMap['"'] = '\\"';
charToEscapedMap['\r'] = '\\r';
charToEscapedMap['\n'] = '\\n';
function escapeString(str) {
    return reEscapableChars.test(str) ? str.replace(reEscapableChars, function (chr) { return charToEscapedMap[chr]; }) : str;
}
exports.escapeString = escapeString;


/***/ }),
/* 10 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
function formattersReducer(jsExpr, formatter) {
    return `(this.${formatter.name} || formatters.${formatter.name}).call(this[KEY_COMPONENT_SELF], ${jsExpr}${formatter.arguments ? ', ' + formatter.arguments.join(', ') : ''})`;
}
function bindingToJSExpression(binding) {
    let formatters = binding.formatters;
    if (binding.keypath) {
        let keys = binding.keypath.split('.');
        let keyCount = keys.length;
        if (keyCount == 1) {
            return formatters
                ? formatters.reduce(formattersReducer, `this['${keys[0]}']`)
                : `this['${keys[0]}']`;
        }
        let index = keyCount - 2;
        let fragments = Array(index);
        while (index) {
            fragments[--index] = ` && (tmp = tmp['${keys[index + 1]}'])`;
        }
        let jsExpr = `(tmp = this['${keys[0]}'])${fragments.join('')} && tmp['${keys[keyCount - 1]}']`;
        return formatters ? formatters.reduce(formattersReducer, jsExpr) : jsExpr;
    }
    return formatters ? formatters.reduce(formattersReducer, binding.value) : binding.value;
}
exports.bindingToJSExpression = bindingToJSExpression;


/***/ }),
/* 11 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const escape_html_1 = __webpack_require__(12);
exports.KEY_COMPONENT_PARAM_VALUES = Symbol('componentParamValues');
exports.componentParamValueСonverters = new Map([
    [
        Boolean,
        {
            toData: (rawValue, defaultValue) => {
                return rawValue !== null ? rawValue != 'no' : !!defaultValue;
            },
            toString: (value, defaultValue) => {
                return value ? '' : defaultValue ? 'no' : null;
            }
        }
    ],
    [
        Number,
        {
            toData: (rawValue, defaultValue) => {
                return rawValue !== null
                    ? +rawValue
                    : defaultValue !== undefined
                        ? defaultValue
                        : null;
            },
            toString: (value) => {
                return value != null ? +value + '' : null;
            }
        }
    ],
    [
        String,
        {
            toData: (rawValue, defaultValue) => {
                return rawValue !== null
                    ? rawValue
                    : defaultValue !== undefined
                        ? defaultValue
                        : null;
            },
            toString: (value) => {
                return value != null ? value + '' : null;
            }
        }
    ],
    [
        Object,
        {
            toData: (rawValue, defaultValue, el) => {
                if (!rawValue) {
                    return defaultValue && defaultValue.clone
                        ? defaultValue.clone(true)
                        : defaultValue || null;
                }
                let value = el[exports.KEY_COMPONENT_PARAM_VALUES] && el[exports.KEY_COMPONENT_PARAM_VALUES].get(rawValue);
                if (!value) {
                    throw new TypeError('Value is not an object');
                }
                return value;
            },
            toString: null
        }
    ],
    [
        eval,
        {
            toData: (rawValue, defaultValue) => {
                return rawValue !== null
                    ? Function(`return ${escape_html_1.unescapeHTML(rawValue)};`)()
                    : defaultValue !== undefined
                        ? defaultValue
                        : null;
            },
            toString: null
        }
    ]
]);
exports.componentParamValueСonverters.set('boolean', exports.componentParamValueСonverters.get(Boolean));
exports.componentParamValueСonverters.set('number', exports.componentParamValueСonverters.get(Number));
exports.componentParamValueСonverters.set('string', exports.componentParamValueСonverters.get(String));
exports.componentParamValueСonverters.set('object', exports.componentParamValueСonverters.get(Object));
exports.componentParamValueСonverters.set('eval', exports.componentParamValueСonverters.get(eval));


/***/ }),
/* 12 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var escapeHTML_1 = __webpack_require__(13);
exports.escapeHTML = escapeHTML_1.escapeHTML;
var unescapeHTML_1 = __webpack_require__(14);
exports.unescapeHTML = unescapeHTML_1.unescapeHTML;


/***/ }),
/* 13 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var reEscapableChars = /[&<>"]/g;
var charToEscapedMap = Object.create(null);
charToEscapedMap['&'] = '&amp;';
charToEscapedMap['<'] = '&lt;';
charToEscapedMap['>'] = '&gt;';
charToEscapedMap['"'] = '&quot;';
function escapeHTML(str) {
    return (str
        ? reEscapableChars.test(str)
            ? str.replace(reEscapableChars, function (chr) { return charToEscapedMap[chr]; })
            : str
        : null);
}
exports.escapeHTML = escapeHTML;


/***/ }),
/* 14 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var reEscapableEntities = /&(?:amp|lt|gt|quot);/g;
var escapedToCharMap = Object.create(null);
escapedToCharMap['&amp;'] = '&';
escapedToCharMap['&lt;'] = '<';
escapedToCharMap['&gt;'] = '>';
escapedToCharMap['&quot;'] = '"';
function unescapeHTML(str) {
    return (str
        ? reEscapableEntities.test(str)
            ? str.replace(reEscapableEntities, function (entity) { return escapedToCharMap[entity]; })
            : str
        : null);
}
exports.unescapeHTML = unescapeHTML;


/***/ }),
/* 15 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
exports.KEY_COMPONENT_SELF = Symbol('componentSelf');
exports.KEY_PARAMS_CONFIG = Symbol('paramsConfig');
exports.KEY_PARAM_VALUES = Symbol('paramValues');
exports.KEY_CHILD_COMPONENTS = Symbol('childComponents');


/***/ }),
/* 16 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const cellx_1 = __webpack_require__(6);
const config_1 = __webpack_require__(17);
exports.formatters = {
    default(value, defaultValue) {
        return value === undefined ? defaultValue : value;
    },
    defaultFor(defaultValue, value) {
        return value === undefined ? defaultValue : value;
    },
    placeholder(value, placeholderValue) {
        return value === null ? placeholderValue : value;
    },
    and(value1, value2) {
        return value1 && value2;
    },
    or(value1, value2) {
        return value1 || value2;
    },
    cond(condition, value1, value2) {
        return condition ? value1 : value2;
    },
    not(value) {
        return !value;
    },
    bool(value) {
        return !!value;
    },
    eq(value1, value2) {
        return value1 == value2;
    },
    identical(value1, value2) {
        return value1 === value2;
    },
    lt(value1, value2) {
        return value1 < value2;
    },
    lte(value1, value2) {
        return value1 <= value2;
    },
    gt(value1, value2) {
        return value1 > value2;
    },
    gte(value1, value2) {
        return value1 >= value2;
    },
    has(target, key) {
        return !!target && target.has(key);
    },
    hasOwn(target, propertyName) {
        return !!target && target.hasOwnProperty(propertyName);
    },
    get(target, key) {
        return target && target.get(key);
    },
    key(target, key) {
        return (target &&
            (Array.isArray(target) || target instanceof cellx_1.ObservableList
                ? target.map(item => item[key])
                : target[key]));
    },
    contains(target, value) {
        return (!!target && (Array.isArray(target) ? target.includes(value) : target.contains(value)));
    },
    join(target, separator = ', ') {
        return target && target.join(separator);
    },
    dump(value) {
        return value == null ? value : JSON.stringify(value);
    },
    t(msgid, ...args) {
        return config_1.config.getText('', msgid, args);
    },
    pt(msgid, msgctxt, ...args) {
        return config_1.config.getText(msgctxt, msgid, args);
    }
};
exports.formatters.seq = exports.formatters.identical;


/***/ }),
/* 17 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
exports.config = {
    getText: ((_msgctxt, msgid) => msgid)
};
function configure(options) {
    Object.assign(exports.config, options);
    return exports.config;
}
exports.configure = configure;


/***/ }),
/* 18 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const keypathPattern_1 = __webpack_require__(19);
const keypathToJSExpression_1 = __webpack_require__(21);
const namePattern_1 = __webpack_require__(20);
var TemplateNodeValueNodeType;
(function (TemplateNodeValueNodeType) {
    TemplateNodeValueNodeType[TemplateNodeValueNodeType["TEXT"] = 1] = "TEXT";
    TemplateNodeValueNodeType[TemplateNodeValueNodeType["BINDING"] = 2] = "BINDING";
    TemplateNodeValueNodeType[TemplateNodeValueNodeType["BINDING_KEYPATH"] = 3] = "BINDING_KEYPATH";
    TemplateNodeValueNodeType[TemplateNodeValueNodeType["BINDING_FORMATTER"] = 4] = "BINDING_FORMATTER";
})(TemplateNodeValueNodeType = exports.TemplateNodeValueNodeType || (exports.TemplateNodeValueNodeType = {}));
const reWhitespace = /\s/;
const reName = RegExp(namePattern_1.namePattern + '|', 'g');
const reKeypath = RegExp(keypathPattern_1.keypathPattern + '|', 'g');
const reBoolean = /false|true|/g;
const reNumber = /(?:[+-]\s*)?(?:0b[01]+|0[0-7]+|0x[0-9a-fA-F]+|(?:(?:0|[1-9]\d*)(?:\.\d+)?|\.\d+)(?:[eE][+-]?\d+)?|Infinity|NaN)|/g;
const reVacuum = /null|undefined|void 0|/g;
class TemplateNodeValueParser {
    constructor(templateNodeValue) {
        this.templateNodeValue = templateNodeValue;
    }
    parse(index) {
        let templateNodeValue = this.templateNodeValue;
        this._pos = 0;
        let result = (this.result = []);
        do {
            this._pushText(templateNodeValue.slice(this._pos, index));
            this._pos = index;
            this._chr = templateNodeValue.charAt(index);
            let binding = this._readBinding();
            if (binding) {
                result.push(binding);
            }
            else {
                this._pushText(this._chr);
                this._next('{');
            }
            index = templateNodeValue.indexOf('{', this._pos);
        } while (index != -1);
        this._pushText(templateNodeValue.slice(this._pos));
        return result;
    }
    _pushText(value) {
        if (value) {
            let result = this.result;
            let resultLen = result.length;
            if (resultLen && result[resultLen - 1].nodeType == TemplateNodeValueNodeType.TEXT) {
                result[resultLen - 1].value += value;
            }
            else {
                result.push({
                    nodeType: TemplateNodeValueNodeType.TEXT,
                    value
                });
            }
        }
    }
    _readBinding() {
        let pos = this._pos;
        this._next('{');
        this._skipWhitespaces();
        let prefix = this._readPrefix();
        this._skipWhitespaces();
        let keypath = this._readKeypath();
        let value;
        if (!prefix && !keypath) {
            value = this._readValue();
        }
        if (keypath || value) {
            let formatters;
            for (let formatter; this._skipWhitespaces() == '|' && (formatter = this._readFormatter());) {
                (formatters || (formatters = [])).push(formatter);
            }
            if (this._chr == '}') {
                this._next();
                return {
                    nodeType: TemplateNodeValueNodeType.BINDING,
                    prefix,
                    keypath,
                    value: value || null,
                    formatters: formatters || null,
                    raw: this.templateNodeValue.slice(pos, this._pos)
                };
            }
        }
        this._pos = pos;
        this._chr = this.templateNodeValue.charAt(pos);
        return null;
    }
    _readPrefix() {
        let chr = this._chr;
        if (chr == '=') {
            this._next();
            return '=';
        }
        if (chr == '<') {
            let pos = this._pos;
            if (this.templateNodeValue.charAt(pos + 1) == '-') {
                if (this.templateNodeValue.charAt(pos + 2) == '>') {
                    this._chr = this.templateNodeValue.charAt((this._pos = pos + 3));
                    return '<->';
                }
                this._chr = this.templateNodeValue.charAt((this._pos = pos + 2));
                return '<-';
            }
        }
        else if (chr == '-' && this.templateNodeValue.charAt(this._pos + 1) == '>') {
            this._chr = this.templateNodeValue.charAt((this._pos += 2));
            return '->';
        }
        return null;
    }
    _readFormatter() {
        let pos = this._pos;
        this._next('|');
        this._skipWhitespaces();
        let name = this._readName();
        if (name) {
            return {
                nodeType: TemplateNodeValueNodeType.BINDING_FORMATTER,
                name,
                arguments: this._chr == '(' ? this._readFormatterArguments() : null
            };
        }
        this._pos = pos;
        this._chr = this.templateNodeValue.charAt(pos);
        return null;
    }
    _readFormatterArguments() {
        let pos = this._pos;
        this._next('(');
        let args;
        if (this._skipWhitespaces() != ')') {
            for (;;) {
                let arg = this._readValue() || this._readKeypath(true);
                if (!(arg && (this._skipWhitespaces() == ',' || this._chr == ')'))) {
                    this._pos = pos;
                    this._chr = this.templateNodeValue.charAt(pos);
                    return null;
                }
                (args || (args = [])).push(arg);
                if (this._chr == ')') {
                    break;
                }
                this._next();
                this._skipWhitespaces();
            }
        }
        this._next();
        return args || null;
    }
    _readValue() {
        switch (this._chr) {
            case '{': {
                return this._readObject();
            }
            case '[': {
                return this._readArray();
            }
            case "'":
            case '"': {
                return this._readString();
            }
        }
        let readers = ['_readBoolean', '_readNumber', '_readVacuum'];
        for (let reader of readers) {
            let value = this[reader]();
            if (value) {
                return value;
            }
        }
        return null;
    }
    _readObject() {
        let pos = this._pos;
        this._next('{');
        let obj = '{';
        while (this._skipWhitespaces() != '}') {
            let key = this._chr == "'" || this._chr == '"' ? this._readString() : this._readObjectKey();
            if (key && this._skipWhitespaces() == ':') {
                this._next();
                this._skipWhitespaces();
                let valueOrKeypath = this._readValue() || this._readKeypath(true);
                if (valueOrKeypath) {
                    if (this._skipWhitespaces() == ',') {
                        obj += key + ':' + valueOrKeypath + ',';
                        this._next();
                        continue;
                    }
                    else if (this._chr == '}') {
                        obj += key + ':' + valueOrKeypath + '}';
                        break;
                    }
                }
            }
            this._pos = pos;
            this._chr = this.templateNodeValue.charAt(pos);
            return null;
        }
        this._next();
        return obj;
    }
    _readObjectKey() {
        return this._readName();
    }
    _readArray() {
        let pos = this._pos;
        this._next('[');
        let arr = '[';
        while (this._skipWhitespaces() != ']') {
            if (this._chr == ',') {
                arr += ',';
                this._next();
            }
            else {
                let valueOrKeypath = this._readValue() || this._readKeypath(true);
                if (valueOrKeypath) {
                    arr += valueOrKeypath;
                }
                else {
                    this._pos = pos;
                    this._chr = this.templateNodeValue.charAt(pos);
                    return null;
                }
            }
        }
        this._next();
        return arr + ']';
    }
    _readBoolean() {
        reBoolean.lastIndex = this._pos;
        let bool = reBoolean.exec(this.templateNodeValue)[0];
        if (bool) {
            this._chr = this.templateNodeValue.charAt((this._pos = reBoolean.lastIndex));
            return bool;
        }
        return null;
    }
    _readNumber() {
        reNumber.lastIndex = this._pos;
        let num = reNumber.exec(this.templateNodeValue)[0];
        if (num) {
            this._chr = this.templateNodeValue.charAt((this._pos = reNumber.lastIndex));
            return num;
        }
        return null;
    }
    _readString() {
        let quoteChar = this._chr;
        if (quoteChar != "'" && quoteChar != '"') {
            throw {
                name: 'SyntaxError',
                message: `Expected "'" instead of "${this._chr}"`,
                pos: this._pos,
                templateNodeValue: this.templateNodeValue
            };
        }
        let pos = this._pos;
        let str = '';
        for (let next; (next = this._next());) {
            if (next == quoteChar) {
                this._next();
                return quoteChar + str + quoteChar;
            }
            if (next == '\\') {
                str += next + this._next();
            }
            else {
                if (next == '\n' || next == '\r') {
                    break;
                }
                str += next;
            }
        }
        this._pos = pos;
        this._chr = this.templateNodeValue.charAt(pos);
        return null;
    }
    _readVacuum() {
        reVacuum.lastIndex = this._pos;
        let vacuum = reVacuum.exec(this.templateNodeValue)[0];
        if (vacuum) {
            this._chr = this.templateNodeValue.charAt((this._pos = reVacuum.lastIndex));
            return vacuum;
        }
        return null;
    }
    _readKeypath(toJSExpression) {
        reKeypath.lastIndex = this._pos;
        let keypath = reKeypath.exec(this.templateNodeValue)[0];
        if (keypath) {
            this._chr = this.templateNodeValue.charAt((this._pos = reKeypath.lastIndex));
            return toJSExpression ? keypathToJSExpression_1.keypathToJSExpression(keypath) : keypath;
        }
        return null;
    }
    _readName() {
        reName.lastIndex = this._pos;
        let name = reName.exec(this.templateNodeValue)[0];
        if (name) {
            this._chr = this.templateNodeValue.charAt((this._pos = reName.lastIndex));
            return name;
        }
        return null;
    }
    _skipWhitespaces() {
        let chr = this._chr;
        while (chr && reWhitespace.test(chr)) {
            chr = this._next();
        }
        return chr;
    }
    _next(current) {
        if (current && current != this._chr) {
            throw {
                name: 'SyntaxError',
                message: `Expected "${current}" instead of "${this._chr}"`,
                pos: this._pos,
                templateNodeValue: this.templateNodeValue
            };
        }
        return (this._chr = this.templateNodeValue.charAt(++this._pos));
    }
}
exports.TemplateNodeValueParser = TemplateNodeValueParser;


/***/ }),
/* 19 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const namePattern_1 = __webpack_require__(20);
exports.keypathPattern = `(?:${namePattern_1.namePattern}|\\d+)(?:\\.(?:${namePattern_1.namePattern}|\\d+))*`;


/***/ }),
/* 20 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
exports.namePattern = '[$_a-zA-Z][$\\w]*';


/***/ }),
/* 21 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const cache = new Map();
function keypathToJSExpression(keypath, cacheKey = keypath) {
    if (!cache.has(cacheKey)) {
        let keys = typeof keypath == 'string' ? keypath.split('.') : keypath;
        let keyCount = keys.length;
        if (keyCount == 1) {
            cache.set(cacheKey, `this['${keypath}']`);
        }
        else {
            let index = keyCount - 2;
            let fragments = Array(index);
            while (index) {
                fragments[--index] = ` && (tmp = tmp['${keys[index + 1]}'])`;
            }
            cache.set(cacheKey, `(tmp = this['${keys[0]}'])${fragments.join('')} && tmp['${keys[keyCount - 1]}']`);
        }
    }
    return cache.get(cacheKey);
}
exports.keypathToJSExpression = keypathToJSExpression;


/***/ }),
/* 22 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const bindContent_1 = __webpack_require__(7);
const TemplateNodeValueParser_1 = __webpack_require__(18);
function getTemplateNodeValueAST(templateNodeValue) {
    if (!bindContent_1.templateNodeValueASTCache.has(templateNodeValue)) {
        let bracketIndex = templateNodeValue.indexOf('{');
        if (bracketIndex == -1) {
            bindContent_1.templateNodeValueASTCache.set(templateNodeValue, null);
        }
        else {
            let templateNodeValueAST = new TemplateNodeValueParser_1.TemplateNodeValueParser(templateNodeValue).parse(bracketIndex);
            if (templateNodeValueAST.length == 1 &&
                templateNodeValueAST[0].nodeType == TemplateNodeValueParser_1.TemplateNodeValueNodeType.TEXT) {
                templateNodeValueAST = null;
            }
            bindContent_1.templateNodeValueASTCache.set(templateNodeValue, templateNodeValueAST);
        }
    }
    return bindContent_1.templateNodeValueASTCache.get(templateNodeValue);
}
exports.getTemplateNodeValueAST = getTemplateNodeValueAST;


/***/ }),
/* 23 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const keypathToJSExpression_1 = __webpack_require__(21);
const cache = new Map();
function compileKeypath(keypath, cacheKey = keypath) {
    return (cache.get(cacheKey) ||
        cache
            .set(cacheKey, Function(`var tmp; return ${keypathToJSExpression_1.keypathToJSExpression(keypath, cacheKey)};`))
            .get(cacheKey));
}
exports.compileKeypath = compileKeypath;


/***/ }),
/* 24 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const svgNamespaceURI_1 = __webpack_require__(25);
function setAttribute(el, name, value) {
    if (value === true) {
        value = '';
    }
    if (el.namespaceURI == svgNamespaceURI_1.svgNamespaceURI) {
        if (name == 'xlink:href' || name == 'href' || name == 'xmlns') {
            let ns = name == 'xmlns' ? 'http://www.w3.org/2000/xmlns/' : 'http://www.w3.org/1999/xlink';
            if (value === false || value == null) {
                el.removeAttributeNS(ns, name);
            }
            else {
                el.setAttributeNS(ns, name, value);
            }
            return el;
        }
    }
    else if (name == 'class') {
        el.className = value;
        return el;
    }
    if (value === false || value == null) {
        el.removeAttribute(name);
    }
    else {
        el.setAttribute(name, value);
    }
    return el;
}
exports.setAttribute = setAttribute;


/***/ }),
/* 25 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
exports.svgNamespaceURI = 'http://www.w3.org/2000/svg';


/***/ }),
/* 26 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
exports.componentConstructors = new Map();


/***/ }),
/* 27 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const bindContent_1 = __webpack_require__(7);
exports.KEY_DOM_EVENTS = Symbol('domEvents');
function handleDOMEvent(evt) {
    let el = evt.target;
    if (el == document.body) {
        return;
    }
    let evtType = evt.type;
    let attrName = 'on-' + evtType;
    let parentEl = el.parentElement;
    let receivers;
    while (parentEl) {
        if (parentEl == document.body) {
            return;
        }
        if ((el[exports.KEY_DOM_EVENTS] && el[exports.KEY_DOM_EVENTS].has(evtType)) || el.hasAttribute(attrName)) {
            (receivers || (receivers = [])).push(el);
        }
        let component = parentEl.$component;
        if (component && receivers && receivers.length) {
            let i = 0;
            do {
                let receiver = receivers[i];
                let handler;
                if (receiver[exports.KEY_DOM_EVENTS]) {
                    let elName = receiver[exports.KEY_DOM_EVENTS].get(evtType);
                    if (elName) {
                        let events = component.constructor.domEvents;
                        if (events && events[elName]) {
                            handler = events[elName][evtType];
                            if (handler) {
                                if (handler.call(component, evt, receiver[bindContent_1.KEY_CONTEXT], receiver) === false) {
                                    return;
                                }
                                receivers.splice(i, 1);
                            }
                        }
                    }
                }
                handler = component[receiver.getAttribute(attrName)];
                if (handler) {
                    if (handler.call(component, evt, receiver[bindContent_1.KEY_CONTEXT], receiver) === false) {
                        return;
                    }
                    if (i != receivers.length && receivers[i] == receiver) {
                        receivers.splice(i, 1);
                    }
                }
                if (i != receivers.length && receivers[i] == receiver) {
                    i++;
                }
            } while (i < receivers.length);
        }
        el = parentEl;
        parentEl = el.parentElement;
    }
}
exports.handleDOMEvent = handleDOMEvent;


/***/ }),
/* 28 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const bindContent_1 = __webpack_require__(7);
exports.KEY_EVENTS = Symbol('events');
const componentStack = [];
function handleEvent(evt) {
    let target = evt.target;
    let ownerComponent = target.ownerComponent;
    if (target == ownerComponent) {
        return;
    }
    let targetEl = target.element;
    let el = targetEl;
    if (!el.parentElement) {
        return;
    }
    componentStack.length = 0;
    let evtType = evt.type;
    let attrName = typeof evtType == 'string' ? 'oncomponent-' + evtType : null;
    let receivers;
    for (;;) {
        if ((el[exports.KEY_EVENTS] && el[exports.KEY_EVENTS].has(evtType)) ||
            (attrName && el.hasAttribute(attrName))) {
            (receivers || (receivers = [])).push(el);
        }
        if (el.parentElement == ownerComponent.element) {
            if (receivers) {
                for (let receiver of receivers) {
                    if (receiver[exports.KEY_EVENTS]) {
                        let elName = receiver[exports.KEY_EVENTS].get(evtType);
                        if (elName) {
                            let events = ownerComponent.constructor
                                .events;
                            let handler = events[elName][evtType];
                            if (handler &&
                                handler.call(ownerComponent, evt, receiver[bindContent_1.KEY_CONTEXT], receiver) === false) {
                                return;
                            }
                        }
                    }
                    if (attrName) {
                        let handler = ownerComponent[receiver.getAttribute(attrName)];
                        if (handler &&
                            handler.call(ownerComponent, evt, receiver[bindContent_1.KEY_CONTEXT], receiver) ===
                                false) {
                            return;
                        }
                    }
                }
                receivers.length = 0;
            }
            if (!componentStack.length) {
                break;
            }
            el = el.parentElement;
            if (!el.parentElement) {
                break;
            }
            [ownerComponent, receivers] = componentStack.pop();
        }
        else {
            el = el.parentElement;
            if (!el.parentElement) {
                break;
            }
            let component = el.$component;
            if (component && component.ownerComponent != ownerComponent) {
                componentStack.push([ownerComponent, receivers || null]);
                ownerComponent = component.ownerComponent;
                receivers = null;
            }
        }
    }
}
exports.handleEvent = handleEvent;


/***/ }),
/* 29 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const registerComponent_1 = __webpack_require__(30);
function Component(config) {
    return (componentConstr) => {
        if (config) {
            if (config.elementIs !== undefined) {
                componentConstr.elementIs = config.elementIs;
            }
            if (config.elementExtends !== undefined) {
                componentConstr.elementExtends = config.elementExtends;
            }
            if (config.params !== undefined) {
                componentConstr.params = config.params;
            }
            if (config.i18n !== undefined) {
                componentConstr.i18n = config.i18n;
            }
            if (config.template !== undefined) {
                componentConstr.template = config.template;
            }
            if (config.events !== undefined) {
                componentConstr.events = config.events;
            }
            if (config.domEvents !== undefined) {
                componentConstr.domEvents = config.domEvents;
            }
        }
        registerComponent_1.registerComponent(componentConstr);
    };
}
exports.Component = Component;


/***/ }),
/* 30 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const kebab_case_1 = __webpack_require__(4);
const pascalize_1 = __webpack_require__(31);
const rionite_snake_case_attribute_name_1 = __webpack_require__(5);
const cellx_1 = __webpack_require__(6);
const componentConstructors_1 = __webpack_require__(26);
const ComponentParams_1 = __webpack_require__(33);
const Constants_1 = __webpack_require__(15);
const elementConstructors_1 = __webpack_require__(34);
const ElementProtoMixin_1 = __webpack_require__(35);
const Template_1 = __webpack_require__(3);
const hasOwn = Object.prototype.hasOwnProperty;
const push = Array.prototype.push;
function inheritProperty(target, source, name, depth) {
    let obj = target[name];
    let parentObj = source[name];
    if (obj && parentObj && obj != parentObj) {
        let inheritedObj = (target[name] = { __proto__: parentObj });
        for (let key in obj) {
            if (hasOwn.call(obj, key)) {
                inheritedObj[key] = obj[key];
                if (depth) {
                    inheritProperty(inheritedObj, parentObj, key, depth - 1);
                }
            }
        }
    }
}
function registerComponent(componentConstr) {
    let elIs = componentConstr.hasOwnProperty('elementIs')
        ? componentConstr.elementIs
        : (componentConstr.elementIs = componentConstr.name);
    if (!elIs) {
        throw new TypeError('Static property "elementIs" is required');
    }
    let kebabCaseElIs = kebab_case_1.kebabCase(elIs, true);
    if (componentConstructors_1.componentConstructors.has(kebabCaseElIs)) {
        throw new TypeError(`Component "${kebabCaseElIs}" already registered`);
    }
    let componentProto = componentConstr.prototype;
    let parentComponentConstr = Object.getPrototypeOf(componentProto)
        .constructor;
    inheritProperty(componentConstr, parentComponentConstr, 'params', 0);
    componentConstr[Constants_1.KEY_PARAMS_CONFIG] = null;
    let paramsConfig = componentConstr.params;
    for (let name in paramsConfig) {
        let paramConfig = paramsConfig[name];
        if (paramConfig === null || paramConfig === Object.prototype[name]) {
            continue;
        }
        let snakeCaseName = rionite_snake_case_attribute_name_1.snakeCaseAttributeName(name, true);
        let isObject = typeof paramConfig == 'object';
        let propertyName = (isObject && paramConfig.property) || name;
        let required;
        let readonly;
        if (isObject) {
            required = paramConfig.required || false;
            readonly = paramConfig.readonly || false;
        }
        else {
            required = readonly = false;
        }
        let $paramConfig = {
            name,
            property: propertyName,
            type: undefined,
            valueСonverters: undefined,
            default: undefined,
            required,
            readonly,
            paramConfig
        };
        (componentConstr[Constants_1.KEY_PARAMS_CONFIG] || (componentConstr[Constants_1.KEY_PARAMS_CONFIG] = new Map()))
            .set(name, $paramConfig)
            .set(snakeCaseName, $paramConfig);
        Object.defineProperty(componentProto, propertyName + 'Cell', {
            configurable: true,
            enumerable: false,
            writable: true,
            value: null
        });
        let descriptor = {
            configurable: true,
            enumerable: true,
            get() {
                let self = this[Constants_1.KEY_COMPONENT_SELF];
                let valueCell = self[propertyName + 'Cell'];
                if (valueCell) {
                    return valueCell.get();
                }
                let value = self[Constants_1.KEY_PARAM_VALUES].get(name);
                if (cellx_1.Cell.currentlyPulling || cellx_1.EventEmitter.currentlySubscribing) {
                    self[Constants_1.KEY_PARAM_VALUES].delete(name);
                    valueCell = new cellx_1.Cell(null, {
                        context: self,
                        value
                    });
                    Object.defineProperty(self, propertyName + 'Cell', {
                        configurable: true,
                        enumerable: false,
                        writable: true,
                        value: valueCell
                    });
                    if (cellx_1.Cell.currentlyPulling) {
                        return valueCell.get();
                    }
                }
                return value;
            },
            set(value) {
                let self = this[Constants_1.KEY_COMPONENT_SELF];
                let valueCell = self[propertyName + 'Cell'];
                if (self[ComponentParams_1.KEY_COMPONENT_PARAMS_INITED]) {
                    if (readonly) {
                        if (value !==
                            (valueCell ? valueCell.get() : self[Constants_1.KEY_PARAM_VALUES].get(name))) {
                            throw new TypeError(`Parameter "${name}" is readonly`);
                        }
                        return;
                    }
                    if ($paramConfig.valueСonverters.toString) {
                        let rawValue = $paramConfig.valueСonverters.toString(value, $paramConfig.default);
                        if (rawValue === null) {
                            self.element.removeAttribute(snakeCaseName);
                        }
                        else {
                            self.element.setAttribute(snakeCaseName, rawValue);
                        }
                    }
                }
                if (valueCell) {
                    valueCell.set(value);
                }
                else {
                    self[Constants_1.KEY_PARAM_VALUES].set(name, value);
                }
            }
        };
        Object.defineProperty(componentProto, propertyName, descriptor);
    }
    inheritProperty(componentConstr, parentComponentConstr, 'i18n', 0);
    componentConstr._blockNamesString =
        elIs + ' ' + (parentComponentConstr._blockNamesString || '');
    componentConstr._elementBlockNames = [elIs];
    if (parentComponentConstr._elementBlockNames) {
        push.apply(componentConstr._elementBlockNames, parentComponentConstr._elementBlockNames);
    }
    let template = componentConstr.template;
    if (template !== null) {
        if (template === parentComponentConstr.template) {
            componentConstr.template = template.extend('', {
                blockName: elIs
            });
        }
        else if (template instanceof Template_1.Template) {
            template.setBlockName(componentConstr._elementBlockNames);
        }
        else {
            componentConstr.template = parentComponentConstr.template
                ? parentComponentConstr.template.extend(template, {
                    blockName: elIs
                })
                : new Template_1.Template(template, { blockName: componentConstr._elementBlockNames });
        }
    }
    inheritProperty(componentConstr, parentComponentConstr, 'events', 1);
    inheritProperty(componentConstr, parentComponentConstr, 'domEvents', 1);
    let elExtends = componentConstr.elementExtends;
    let parentElConstr;
    if (elExtends) {
        parentElConstr =
            elementConstructors_1.elementConstructors.get(elExtends) || window[`HTML${pascalize_1.pascalize(elExtends)}Element`];
        if (!parentElConstr) {
            throw new TypeError(`Component "${elExtends}" is not registered`);
        }
    }
    else {
        parentElConstr = HTMLElement;
    }
    let elConstr = class extends parentElConstr {
    };
    elConstr._rioniteComponentConstructor = componentConstr;
    Object.defineProperty(elConstr, 'observedAttributes', {
        configurable: true,
        enumerable: true,
        get() {
            let paramsConfig = componentConstr.params;
            let attrs = [];
            for (let name in paramsConfig) {
                if (paramsConfig[name] !== null && paramsConfig[name] !== Object.prototype[name]) {
                    attrs.push(rionite_snake_case_attribute_name_1.snakeCaseAttributeName(name, true));
                }
            }
            return attrs;
        }
    });
    let elProto = elConstr.prototype;
    elProto.constructor = elConstr;
    let names = Object.getOwnPropertyNames(ElementProtoMixin_1.ElementProtoMixin);
    for (let name of names) {
        Object.defineProperty(elProto, name, Object.getOwnPropertyDescriptor(ElementProtoMixin_1.ElementProtoMixin, name));
    }
    names = Object.getOwnPropertySymbols(ElementProtoMixin_1.ElementProtoMixin);
    for (let name of names) {
        Object.defineProperty(elProto, name, Object.getOwnPropertyDescriptor(ElementProtoMixin_1.ElementProtoMixin, name));
    }
    window.customElements.define(kebabCaseElIs, elConstr, elExtends ? { extends: elExtends } : undefined);
    componentConstructors_1.componentConstructors.set(elIs, componentConstr).set(kebabCaseElIs, componentConstr);
    elementConstructors_1.elementConstructors.set(elIs, elConstr);
    return componentConstr;
}
exports.registerComponent = registerComponent;


/***/ }),
/* 31 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var camelize_1 = __webpack_require__(32);
var cache = Object.create(null);
function pascalize(str, useCache) {
    str = String(str);
    var value;
    return ((useCache && cache[str]) ||
        ((value = camelize_1.camelize(str)),
            (value = value.charAt(0).toUpperCase() + value.slice(1)),
            useCache ? (cache[str] = value) : value));
}
exports.pascalize = pascalize;


/***/ }),
/* 32 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var reHyphen = /[-_]+([a-z])/g;
var cache = Object.create(null);
function camelize(str, useCache) {
    str = String(str);
    var value;
    return ((useCache && cache[str]) ||
        ((value = str.replace(reHyphen, function (match, chr) { return chr.toUpperCase(); })),
            useCache ? (cache[str] = value) : value));
}
exports.camelize = camelize;


/***/ }),
/* 33 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const rionite_snake_case_attribute_name_1 = __webpack_require__(5);
const componentParamValueConverters_1 = __webpack_require__(11);
const Constants_1 = __webpack_require__(15);
exports.KEY_COMPONENT_PARAMS_INITED = Symbol('componentParamsInited');
function initParam(component, $paramConfig, name, _$specifiedParams) {
    if ($paramConfig === null) {
        return;
    }
    let valueСonverters = $paramConfig.valueСonverters;
    let defaultValue;
    if (valueСonverters) {
        defaultValue = $paramConfig.default;
    }
    else {
        let paramConfig = $paramConfig.paramConfig;
        let type = typeof paramConfig;
        defaultValue = component[$paramConfig.property];
        if (defaultValue === undefined) {
            if (type == 'object') {
                defaultValue = paramConfig.default;
            }
            else if (type != 'function') {
                defaultValue = paramConfig;
            }
        }
        type = type == 'object' ? paramConfig.type : paramConfig;
        if (defaultValue !== undefined && type !== eval) {
            type = typeof defaultValue;
            if (type == 'function') {
                type = 'object';
            }
        }
        valueСonverters = componentParamValueConverters_1.componentParamValueСonverters.get(type);
        if (!valueСonverters) {
            throw new TypeError('Unsupported parameter type');
        }
        $paramConfig.type = type;
        $paramConfig.valueСonverters = valueСonverters;
        $paramConfig.default = defaultValue;
    }
    let el = component.element;
    let snakeCaseName = rionite_snake_case_attribute_name_1.snakeCaseAttributeName(name, true);
    let rawValue;
    // if ($specifiedParams) {
    rawValue = el.getAttribute(snakeCaseName);
    // 	if (rawValue !== null) {
    // 		$specifiedParams.set(name, rawValue);
    // 	}
    // } else {
    // 	rawValue = component.$specifiedParams.get(name);
    // 	if (rawValue === undefined) {
    // 		rawValue = null;
    // 	}
    // }
    if (rawValue === null) {
        if ($paramConfig.required) {
            throw new TypeError(`Parameter "${name}" is required`);
        }
        if (defaultValue != null && defaultValue !== false && valueСonverters.toString) {
            el.setAttribute(snakeCaseName, valueСonverters.toString(defaultValue));
        }
    }
    let value = valueСonverters.toData(rawValue, defaultValue, el);
    if (component[$paramConfig.property + 'Cell']) {
        component[$paramConfig.property + 'Cell'].set(value);
    }
    else {
        component[Constants_1.KEY_PARAM_VALUES].set(name, value);
    }
}
exports.ComponentParams = {
    init(component) {
        if (component[exports.KEY_COMPONENT_PARAMS_INITED]) {
            return;
        }
        let $specifiedParams;
        if (component.$specifiedParams) {
            $specifiedParams = null;
        }
        else {
            $specifiedParams = component.$specifiedParams = new Map();
        }
        let paramsConfig = component.constructor.params;
        if (paramsConfig) {
            let $paramsConfig = component.constructor[Constants_1.KEY_PARAMS_CONFIG];
            for (let name in paramsConfig) {
                if (paramsConfig[name] !== null && paramsConfig[name] !== Object.prototype[name]) {
                    initParam(component, $paramsConfig.get(name), name, $specifiedParams);
                }
            }
        }
        component[exports.KEY_COMPONENT_PARAMS_INITED] = true;
    }
};


/***/ }),
/* 34 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
exports.elementConstructors = new Map([
    ['a', window.HTMLAnchorElement],
    ['blockquote', window.HTMLQuoteElement],
    ['br', window.HTMLBRElement],
    ['caption', window.HTMLTableCaptionElement],
    ['col', window.HTMLTableColElement],
    ['colgroup', window.HTMLTableColElement],
    ['datalist', window.HTMLDataListElement],
    ['del', window.HTMLModElement],
    ['dir', window.HTMLDirectoryElement],
    ['dl', window.HTMLDListElement],
    ['document', window.HTMLDocument],
    ['fieldset', window.HTMLFieldSetElement],
    ['frameset', window.HTMLFrameSetElement],
    ['h1', window.HTMLHeadingElement],
    ['h2', window.HTMLHeadingElement],
    ['h3', window.HTMLHeadingElement],
    ['h4', window.HTMLHeadingElement],
    ['h5', window.HTMLHeadingElement],
    ['h6', window.HTMLHeadingElement],
    ['hr', window.HTMLHRElement],
    ['iframe', window.HTMLIFrameElement],
    ['img', window.HTMLImageElement],
    ['ins', window.HTMLModElement],
    ['li', window.HTMLLIElement],
    ['menuitem', window.HTMLMenuItemElement],
    ['ol', window.HTMLOListElement],
    ['optgroup', window.HTMLOptGroupElement],
    ['p', window.HTMLParagraphElement],
    ['q', window.HTMLQuoteElement],
    ['tbody', window.HTMLTableSectionElement],
    ['td', window.HTMLTableCellElement],
    ['template', window.HTMLTemplateElement],
    ['textarea', window.HTMLTextAreaElement],
    ['tfoot', window.HTMLTableSectionElement],
    ['th', window.HTMLTableCellElement],
    ['thead', window.HTMLTableSectionElement],
    ['tr', window.HTMLTableRowElement],
    ['ul', window.HTMLUListElement],
    ['vhgroupv', window.HTMLUnknownElement],
    ['vkeygen', window.HTMLUnknownElement]
]);


/***/ }),
/* 35 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const defer_1 = __webpack_require__(36);
const ComponentParams_1 = __webpack_require__(33);
const Constants_1 = __webpack_require__(15);
const observedAttributesFeature_1 = __webpack_require__(39);
// export const KEY_IS_COMPONENT_ELEMENT = Symbol('isComponentElement');
exports.KEY_ELEMENT_CONNECTED = Symbol('elementConnected');
let connectionStatusCallbacksSuppressed = false;
function suppressConnectionStatusCallbacks() {
    connectionStatusCallbacksSuppressed = true;
}
exports.suppressConnectionStatusCallbacks = suppressConnectionStatusCallbacks;
function resumeConnectionStatusCallbacks() {
    connectionStatusCallbacksSuppressed = false;
}
exports.resumeConnectionStatusCallbacks = resumeConnectionStatusCallbacks;
exports.ElementProtoMixin = {
    // [KEY_IS_COMPONENT_ELEMENT]: true,
    $component: null,
    get rioniteComponent() {
        return this.$component || new this.constructor._rioniteComponentConstructor(this);
    },
    [exports.KEY_ELEMENT_CONNECTED]: false,
    connectedCallback() {
        this[exports.KEY_ELEMENT_CONNECTED] = true;
        if (connectionStatusCallbacksSuppressed) {
            return;
        }
        let component = this.$component;
        if (component) {
            ComponentParams_1.ComponentParams.init(component);
            component.elementConnected();
            if (component._attached) {
                if (component._parentComponent === null) {
                    component._parentComponent = undefined;
                    component.elementMoved();
                }
            }
            else {
                component._parentComponent = undefined;
                component._attach();
            }
        }
        else {
            defer_1.defer(() => {
                if (this[exports.KEY_ELEMENT_CONNECTED]) {
                    let component = this.rioniteComponent;
                    component._parentComponent = undefined;
                    if (!component.parentComponent && !component._attached) {
                        ComponentParams_1.ComponentParams.init(component);
                        component.elementConnected();
                        component._attach();
                    }
                }
            });
        }
    },
    disconnectedCallback() {
        this[exports.KEY_ELEMENT_CONNECTED] = false;
        if (connectionStatusCallbacksSuppressed) {
            return;
        }
        let component = this.$component;
        if (component && component._attached) {
            component._parentComponent = null;
            component.elementDisconnected();
            defer_1.defer(() => {
                if (component._parentComponent === null && component._attached) {
                    component._detach();
                }
            });
        }
    },
    attributeChangedCallback(name, _prevRawValue, rawValue) {
        let component = this.$component;
        if (component && component.isReady) {
            let $paramConfig = component.constructor[Constants_1.KEY_PARAMS_CONFIG].get(name);
            if ($paramConfig.readonly) {
                if (observedAttributesFeature_1.observedAttributesFeature) {
                    throw new TypeError(`Cannot write to readonly parameter "${$paramConfig.name}"`);
                }
            }
            else {
                let valueCell = component[$paramConfig.property + 'Cell'];
                let value = $paramConfig.valueСonverters.toData(rawValue, $paramConfig.default, this);
                if (valueCell) {
                    valueCell.set(value);
                }
                else {
                    component[Constants_1.KEY_PARAM_VALUES].set($paramConfig.name, value);
                }
            }
        }
    }
};


/***/ }),
/* 36 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const utils_1 = __webpack_require__(37);
var config_1 = __webpack_require__(38);
exports.configure = config_1.configure;
let queue;
function run() {
    let track = queue;
    queue = null;
    for (let callback of track) {
        try {
            callback();
        }
        catch (err) {
            utils_1.logError(err);
        }
    }
}
function defer(callback) {
    if (queue) {
        queue.push(callback);
    }
    else {
        queue = [callback];
        setTimeout(run, 1);
    }
}
exports.defer = defer;


/***/ }),
/* 37 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const config_1 = __webpack_require__(38);
function logError(...args) {
    config_1.config.logError(...args);
}
exports.logError = logError;


/***/ }),
/* 38 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
exports.config = {
    logError: (...args) => {
        console.error(...args);
    }
};
function configure(options) {
    Object.assign(exports.config, options);
    return exports.config;
}
exports.configure = configure;


/***/ }),
/* 39 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
let observedAttributesFeature_ = false;
window.customElements.define('test-observed-attributes-feature', class extends HTMLElement {
    static get observedAttributes() {
        return ['test'];
    }
    attributeChangedCallback() {
        observedAttributesFeature_ = true;
    }
});
document.createElement('test-observed-attributes-feature').setAttribute('test', '');
exports.observedAttributesFeature = observedAttributesFeature_;


/***/ }),
/* 40 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const types = new Set([Boolean, Number, String, Object]);
function Param(target, propertyName, _propertyDesc, name, config) {
    if (typeof propertyName != 'string') {
        if (target && typeof target != 'string') {
            config = target;
        }
        else {
            name = target;
            config = propertyName;
        }
        return (target, propertyName, propertyDesc) => Param(target, propertyName, propertyDesc, name, config);
    }
    if (!config) {
        config = {};
    }
    else if (typeof config == 'function') {
        config = { type: config };
    }
    config.property = propertyName;
    if (!config.type) {
        let type = Reflect.getMetadata('design:type', target, propertyName);
        config.type = types.has(type) ? type : Object;
    }
    let constr = target.constructor;
    ((constr.hasOwnProperty('params') && constr.params) || (constr.params = {}))[name || propertyName] = config;
}
exports.Param = Param;


/***/ }),
/* 41 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const kebab_case_1 = __webpack_require__(4);
const move_content_1 = __webpack_require__(42);
const next_uid_1 = __webpack_require__(43);
const cellx_1 = __webpack_require__(6);
const attachChildComponentElements_1 = __webpack_require__(44);
const bindContent_1 = __webpack_require__(7);
const componentBinding_1 = __webpack_require__(45);
const Constants_1 = __webpack_require__(15);
const elementConstructors_1 = __webpack_require__(34);
const ElementProtoMixin_1 = __webpack_require__(35);
const handleDOMEvent_1 = __webpack_require__(27);
const handleEvent_1 = __webpack_require__(28);
const findChildComponents_1 = __webpack_require__(46);
const normalizeTextNodes_1 = __webpack_require__(47);
const Template_1 = __webpack_require__(3);
const hasOwn = Object.prototype.hasOwnProperty;
const map = Array.prototype.map;
class BaseComponent extends cellx_1.EventEmitter {
    constructor(el) {
        super();
        this._disposables = new Map();
        this._parentComponent = null;
        this.$inputContent = null;
        this._attached = false;
        this.initialized = false;
        this.isReady = false;
        this[Constants_1.KEY_COMPONENT_SELF] = this;
        let constr = this.constructor;
        if (!elementConstructors_1.elementConstructors.has(constr.elementIs)) {
            throw new TypeError('Component must be registered');
        }
        if (!el) {
            el = document.createElement(kebab_case_1.kebabCase(constr.elementIs, true));
        }
        this.element = el;
        el.$component = this;
        this[Constants_1.KEY_PARAM_VALUES] = new Map();
    }
    static get bindsInputContent() {
        return this.template !== null;
    }
    get ownerComponent() {
        if (this._ownerComponent) {
            return this._ownerComponent;
        }
        let component = this.parentComponent;
        if (!component) {
            return (this._ownerComponent = this);
        }
        for (let parentComponent; (parentComponent = component.parentComponent);) {
            component = parentComponent;
        }
        return (this._ownerComponent = component);
    }
    set ownerComponent(ownerComponent) {
        this._ownerComponent = ownerComponent;
    }
    get parentComponent() {
        if (this._parentComponent !== undefined) {
            return this._parentComponent;
        }
        for (let node; (node = (node || this.element).parentNode);) {
            if (node.$component !== undefined) {
                return (this._parentComponent = node.$component || node.rioniteComponent);
            }
        }
        return (this._parentComponent = null);
    }
    onChange(listener, context) {
        return this.on(this.constructor.EVENT_CHANGE, listener, context);
    }
    offChange(listener, context) {
        return this.off(this.constructor.EVENT_CHANGE, listener, context);
    }
    handleEvent(evt) {
        super.handleEvent(evt);
        if (evt.bubbles !== false && !evt.propagationStopped) {
            let parentComponent = this.parentComponent;
            if (parentComponent) {
                parentComponent.handleEvent(evt);
                return;
            }
        }
        handleEvent_1.handleEvent(evt);
    }
    listenTo(target, type, listener, context, useCapture) {
        if (typeof target == 'string') {
            target = this.$(target);
        }
        let listenings;
        if (typeof type == 'object') {
            listenings = [];
            if (Array.isArray(type)) {
                for (let i = 0, l = type.length; i < l; i++) {
                    listenings.push(this.listenTo(target, type[i], listener, context, useCapture));
                }
            }
            else {
                for (let type_ in type) {
                    if (hasOwn.call(type, type_)) {
                        listenings.push(this.listenTo(target, type_, type[type_], listener, context));
                    }
                }
                for (let type_ of Object.getOwnPropertySymbols(type)) {
                    listenings.push(this.listenTo(target, type_, type[type_], listener, context));
                }
            }
        }
        else {
            if (Array.isArray(target) ||
                target instanceof NodeList ||
                target instanceof HTMLCollection) {
                listenings = [];
                for (let i = 0, l = target.length; i < l; i++) {
                    listenings.push(this.listenTo(target[i], type, listener, context, useCapture));
                }
            }
            else if (Array.isArray(listener)) {
                listenings = [];
                for (let i = 0, l = listener.length; i < l; i++) {
                    listenings.push(this.listenTo(target, type, listener[i], context, useCapture));
                }
            }
            else {
                return this._listenTo(target, type, listener, context !== undefined ? context : this, useCapture || false);
            }
        }
        let id = next_uid_1.nextUID();
        let stopListening = () => {
            for (let i = listenings.length; i;) {
                listenings[--i].stop();
            }
            this._disposables.delete(id);
        };
        let listening = {
            stop: stopListening,
            dispose: stopListening
        };
        this._disposables.set(id, listening);
        return listening;
    }
    _listenTo(target, type, listener, context, useCapture) {
        if (!target) {
            throw TypeError('"target" is required');
        }
        if (target instanceof cellx_1.EventEmitter) {
            target.on(type, listener, context);
        }
        else {
            if (target !== context) {
                listener = listener.bind(context);
            }
            target.addEventListener(type, listener, useCapture);
        }
        let id = next_uid_1.nextUID();
        let stopListening = () => {
            if (this._disposables.has(id)) {
                if (target instanceof cellx_1.EventEmitter) {
                    target.off(type, listener, context);
                }
                else {
                    target.removeEventListener(type, listener, useCapture);
                }
                this._disposables.delete(id);
            }
        };
        let listening = {
            stop: stopListening,
            dispose: stopListening
        };
        this._disposables.set(id, listening);
        return listening;
    }
    setTimeout(cb, delay) {
        let id = next_uid_1.nextUID();
        let timeoutId = setTimeout(() => {
            this._disposables.delete(id);
            cb.call(this);
        }, delay);
        let clearTimeout_ = () => {
            if (this._disposables.has(id)) {
                clearTimeout(timeoutId);
                this._disposables.delete(id);
            }
        };
        let timeout = {
            clear: clearTimeout_,
            dispose: clearTimeout_
        };
        this._disposables.set(id, timeout);
        return timeout;
    }
    setInterval(cb, delay) {
        let id = next_uid_1.nextUID();
        let intervalId = setInterval(() => {
            cb.call(this);
        }, delay);
        let clearInterval_ = () => {
            if (this._disposables.has(id)) {
                clearInterval(intervalId);
                this._disposables.delete(id);
            }
        };
        let interval = {
            clear: clearInterval_,
            dispose: clearInterval_
        };
        this._disposables.set(id, interval);
        return interval;
    }
    registerCallback(cb) {
        let id = next_uid_1.nextUID();
        let disposable = this;
        let cancelCallback = () => {
            this._disposables.delete(id);
        };
        let registeredCallback = function registeredCallback() {
            if (disposable._disposables.has(id)) {
                disposable._disposables.delete(id);
                return cb.apply(disposable, arguments);
            }
        };
        registeredCallback.cancel = cancelCallback;
        registeredCallback.dispose = cancelCallback;
        this._disposables.set(id, registeredCallback);
        return registeredCallback;
    }
    _attach() {
        this._attached = true;
        if (!this.initialized) {
            let initializationResult = this.initialize();
            if (initializationResult) {
                initializationResult.then(() => {
                    this.initialized = true;
                    this._attach();
                });
                return;
            }
            this.initialized = true;
        }
        let constr = this.constructor;
        if (this.isReady) {
            this._unfreezeBindings();
            let childComponents = findChildComponents_1.findChildComponents(this.element);
            if (childComponents) {
                attachChildComponentElements_1.attachChildComponentElements(childComponents);
            }
        }
        else {
            let el = this.element;
            if (el.className.lastIndexOf(constr._blockNamesString, 0)) {
                el.className = constr._blockNamesString + el.className;
            }
            if (constr.template === null) {
                if (this.ownerComponent == this) {
                    let contentBindingResult = [null, null, null];
                    bindContent_1.bindContent(el, this, this, contentBindingResult);
                    let childComponents = contentBindingResult[0];
                    let backBindings = contentBindingResult[2];
                    this._bindings = contentBindingResult[1];
                    if (childComponents) {
                        attachChildComponentElements_1.attachChildComponentElements(childComponents);
                    }
                    if (backBindings) {
                        for (let i = backBindings.length; i; i -= 3) {
                            backBindings[i - 3].on('change:' + backBindings[i - 2], backBindings[i - 1]);
                        }
                    }
                }
                else {
                    this._bindings = null;
                    if (this[Constants_1.KEY_CHILD_COMPONENTS]) {
                        attachChildComponentElements_1.attachChildComponentElements(this[Constants_1.KEY_CHILD_COMPONENTS]);
                    }
                }
            }
            else {
                if (el.firstChild) {
                    ElementProtoMixin_1.suppressConnectionStatusCallbacks();
                    move_content_1.moveContent(this.$inputContent ||
                        (this.$inputContent = document.createDocumentFragment()), normalizeTextNodes_1.normalizeTextNodes(el));
                    ElementProtoMixin_1.resumeConnectionStatusCallbacks();
                }
                let contentBindingResult = [null, null, null];
                let content = constr.template.render(this, this, this, contentBindingResult);
                let childComponents = contentBindingResult[0];
                let backBindings = contentBindingResult[2];
                this._bindings = contentBindingResult[1];
                if (childComponents) {
                    for (let i = childComponents.length; i;) {
                        let childComponent = childComponents[--i];
                        if (childComponent.element.firstChild &&
                            childComponent.constructor.bindsInputContent) {
                            childComponent.$inputContent = move_content_1.moveContent(document.createDocumentFragment(), childComponent.element);
                        }
                    }
                }
                ElementProtoMixin_1.suppressConnectionStatusCallbacks();
                this.element.appendChild(content);
                ElementProtoMixin_1.resumeConnectionStatusCallbacks();
                if (childComponents) {
                    attachChildComponentElements_1.attachChildComponentElements(childComponents);
                }
                if (backBindings) {
                    for (let i = backBindings.length; i; i -= 3) {
                        backBindings[i - 3].on('change:' + backBindings[i - 2], backBindings[i - 1]);
                    }
                }
            }
            this.ready();
            this.isReady = true;
        }
        this.elementAttached();
    }
    _detach() {
        this._attached = false;
        this.elementDetached();
        this.dispose();
    }
    dispose() {
        this._freezeBindings();
        for (let disposable of this._disposables) {
            disposable[1].dispose();
        }
        return this;
    }
    _freezeBindings() {
        if (this._bindings) {
            componentBinding_1.freezeBindings(this._bindings);
        }
    }
    _unfreezeBindings() {
        if (this._bindings) {
            componentBinding_1.unfreezeBindings(this._bindings);
        }
    }
    _destroyBindings() {
        let bindings = this._bindings;
        if (bindings) {
            for (let i = bindings.length; i;) {
                bindings[--i].off();
            }
            this._bindings = null;
        }
    }
    // Callbacks
    elementConnected() { }
    elementDisconnected() { }
    initialize() { }
    ready() { }
    elementAttached() { }
    elementDetached() { }
    elementMoved() { }
    // Utils
    $(name, container) {
        let elList = this._getElementList(name, container);
        return (elList && elList.length
            ? elList[0].$component || elList[0]
            : null);
    }
    $$(name, container) {
        let elList = this._getElementList(name, container);
        return elList
            ? map.call(elList, (el) => el.$component || el)
            : [];
    }
    _getElementList(name, container) {
        if (container) {
            if (typeof container == 'string') {
                container = this.$(container);
            }
            if (container instanceof BaseComponent) {
                container = container.element;
            }
        }
        else {
            container = this.element;
        }
        let elementBlockNames = this.constructor._elementBlockNames;
        return container.getElementsByClassName(elementBlockNames[elementBlockNames.length - 1] + '__' + name);
    }
}
BaseComponent.EVENT_CHANGE = 'change';
BaseComponent.elementExtends = null;
BaseComponent.params = null;
BaseComponent.i18n = null;
BaseComponent.template = null;
BaseComponent.events = null;
BaseComponent.domEvents = null;
exports.BaseComponent = BaseComponent;
const handledEvents = [
    'change',
    'click',
    'dblclick',
    'focusin',
    'focusout',
    'input',
    'mousedown',
    'mouseup',
    'submit'
];
document.addEventListener('DOMContentLoaded', function onDOMContentLoaded() {
    document.removeEventListener('DOMContentLoaded', onDOMContentLoaded);
    for (let type of handledEvents) {
        document.body.addEventListener(type, handleDOMEvent_1.handleDOMEvent);
    }
});


/***/ }),
/* 42 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
function moveContent(target, source) {
    for (var child = void 0; (child = source.firstChild);) {
        target.appendChild(child);
    }
    return target;
}
exports.moveContent = moveContent;


/***/ }),
/* 43 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var uidCounter = 0;
function nextUID() {
    return String(++uidCounter);
}
exports.nextUID = nextUID;


/***/ }),
/* 44 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const ComponentParams_1 = __webpack_require__(33);
function attachChildComponentElements(childComponents) {
    for (let childComponent of childComponents) {
        childComponent._parentComponent = undefined;
        ComponentParams_1.ComponentParams.init(childComponent);
        childComponent.elementConnected();
        childComponent._attach();
    }
}
exports.attachChildComponentElements = attachChildComponentElements;


/***/ }),
/* 45 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const cellx_1 = __webpack_require__(6);
const KEY_FROZEN_STATE = Symbol('frozenState');
function freezeBinding(binding) {
    let changeEvent = binding._events.get(cellx_1.Cell.EVENT_CHANGE);
    binding._events.delete(cellx_1.Cell.EVENT_CHANGE);
    binding[KEY_FROZEN_STATE] = {
        changeEventListener: changeEvent.listener,
        changeEventContext: changeEvent.context,
        value: binding._value
    };
}
function unfreezeBinding(binding) {
    let frozenState = binding[KEY_FROZEN_STATE];
    binding[KEY_FROZEN_STATE] = null;
    binding.onChange(frozenState.changeEventListener, frozenState.changeEventContext);
    if (frozenState.value !== binding._value) {
        binding.emit(cellx_1.Cell.EVENT_CHANGE, {
            prevValue: frozenState.value,
            value: binding._value
        });
    }
}
function freezeBindings(bindings) {
    cellx_1.Cell.release();
    for (let binding of bindings) {
        freezeBinding(binding);
    }
}
exports.freezeBindings = freezeBindings;
function unfreezeBindings(bindings) {
    for (let binding of bindings) {
        unfreezeBinding(binding);
    }
    cellx_1.Cell.release();
}
exports.unfreezeBindings = unfreezeBindings;


/***/ }),
/* 46 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
function findChildComponents(node, childComponents) {
    for (let child = node.firstChild; child; child = child.nextSibling) {
        if (child.nodeType == Node.ELEMENT_NODE) {
            let childComponent = child.$component;
            if (childComponent) {
                (childComponents || (childComponents = [])).push(childComponent);
            }
            if (child.firstChild &&
                !(childComponent &&
                    childComponent.constructor.bindsInputContent)) {
                childComponents = findChildComponents(child, childComponents);
            }
        }
    }
    return childComponents || null;
}
exports.findChildComponents = findChildComponents;


/***/ }),
/* 47 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
function normalizeTextNodes(node) {
    for (let child = node.firstChild; child;) {
        switch (child.nodeType) {
            case Node.ELEMENT_NODE: {
                normalizeTextNodes(child);
                child = child.nextSibling;
                break;
            }
            case Node.TEXT_NODE: {
                let nextChild = child.nextSibling;
                if (nextChild && nextChild.nodeType == Node.TEXT_NODE) {
                    do {
                        child.nodeValue += nextChild.nodeValue;
                        node.removeChild(nextChild);
                        nextChild = child.nextSibling;
                    } while (nextChild && nextChild.nodeType == Node.TEXT_NODE);
                }
                child = nextChild;
                break;
            }
        }
    }
    return node;
}
exports.normalizeTextNodes = normalizeTextNodes;


/***/ }),
/* 48 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var RnIfThen_1;
Object.defineProperty(exports, "__esModule", { value: true });
const next_tick_1 = __webpack_require__(49);
const cellx_1 = __webpack_require__(6);
const move_content_1 = __webpack_require__(42);
const attachChildComponentElements_1 = __webpack_require__(44);
const BaseComponent_1 = __webpack_require__(41);
const compileBinding_1 = __webpack_require__(50);
const Component_1 = __webpack_require__(29);
const ElementProtoMixin_1 = __webpack_require__(35);
const getTemplateNodeValueAST_1 = __webpack_require__(22);
const compileKeypath_1 = __webpack_require__(23);
const keypathPattern_1 = __webpack_require__(19);
const removeNodes_1 = __webpack_require__(51);
const Template_1 = __webpack_require__(3);
const RnRepeat_1 = __webpack_require__(52);
const slice = Array.prototype.slice;
const reKeypath = RegExp(`^${keypathPattern_1.keypathPattern}$`);
let RnIfThen = RnIfThen_1 = class RnIfThen extends BaseComponent_1.BaseComponent {
    constructor() {
        super(...arguments);
        this._elseMode = false;
        this._nodes = null;
        this._childComponents = null;
        this._active = false;
    }
    static get bindsInputContent() {
        return true;
    }
    elementConnected() {
        if (this._active) {
            return;
        }
        this._active = true;
        if (!this.initialized) {
            let if_ = this.paramIf.trim();
            let getIfValue;
            if (reKeypath.test(if_)) {
                getIfValue = compileKeypath_1.compileKeypath(if_);
            }
            else {
                let ifAST = getTemplateNodeValueAST_1.getTemplateNodeValueAST(`{${if_}}`);
                if (!ifAST || ifAST.length != 1) {
                    throw new SyntaxError(`Invalid value in parameter "if" (${if_})`);
                }
                getIfValue = compileBinding_1.compileBinding(ifAST, if_);
            }
            this._if = new cellx_1.Cell(function () {
                return !!getIfValue.call(this);
            }, { context: this.$context });
            this.initialized = true;
        }
        if (this.element[Template_1.KEY_CONTENT_TEMPLATE]) {
            this._if.onChange(this._onIfChange, this);
            this._render(false);
        }
    }
    elementDisconnected() {
        next_tick_1.nextTick(() => {
            if (!this.element[ElementProtoMixin_1.KEY_ELEMENT_CONNECTED]) {
                this._deactivate();
            }
        });
    }
    _onIfChange() {
        if (this.element.parentNode) {
            this._render(true);
        }
    }
    _attach() {
        this._attached = true;
    }
    _detach() {
        this._attached = false;
    }
    _render(changed) {
        if (this._elseMode
            ? !this._if.get() && (this._if.get() !== undefined || this.withUndefined)
            : this._if.get()) {
            let contentBindingResult = [null, null, null];
            let content = this.element[Template_1.KEY_CONTENT_TEMPLATE].render(null, this.ownerComponent, this.$context, contentBindingResult);
            let childComponents = contentBindingResult[0];
            let backBindings = contentBindingResult[2];
            this._nodes = slice.call(content.childNodes);
            this._childComponents = childComponents;
            this._bindings = contentBindingResult[1];
            if (childComponents) {
                for (let i = childComponents.length; i;) {
                    let childComponent = childComponents[--i];
                    if (childComponent.element.firstChild &&
                        childComponent.constructor.bindsInputContent) {
                        childComponent.$inputContent = move_content_1.moveContent(document.createDocumentFragment(), childComponent.element);
                    }
                }
            }
            ElementProtoMixin_1.suppressConnectionStatusCallbacks();
            this.element.parentNode.insertBefore(content, this.element);
            ElementProtoMixin_1.resumeConnectionStatusCallbacks();
            if (childComponents) {
                attachChildComponentElements_1.attachChildComponentElements(childComponents);
            }
            if (backBindings) {
                for (let i = backBindings.length; i; i -= 3) {
                    backBindings[i - 3].on('change:' + backBindings[i - 2], backBindings[i - 1]);
                }
            }
        }
        else {
            let nodes = this._nodes;
            if (nodes) {
                removeNodes_1.removeNodes(nodes);
                this._destroyBindings();
                this._nodes = null;
                this._deactivateChildComponents();
            }
        }
        if (changed) {
            cellx_1.Cell.release();
            this.emit(RnIfThen_1.EVENT_CHANGE);
        }
    }
    _deactivate() {
        if (!this._active) {
            return;
        }
        this._active = false;
        this._if.offChange(this._onIfChange, this);
        let nodes = this._nodes;
        if (nodes) {
            removeNodes_1.removeNodes(nodes);
            this._destroyBindings();
            this._nodes = null;
            this._deactivateChildComponents();
        }
    }
    _deactivateChildComponents() {
        let childComponents = this._childComponents;
        if (childComponents) {
            for (let i = childComponents.length; i;) {
                let childComponent = childComponents[--i];
                if (childComponent instanceof RnIfThen_1 || childComponent instanceof RnRepeat_1.RnRepeat) {
                    childComponent._deactivate();
                }
            }
        }
        this._childComponents = null;
    }
};
RnIfThen.EVENT_CHANGE = Symbol('change');
RnIfThen = RnIfThen_1 = __decorate([
    Component_1.Component({
        elementIs: 'RnIfThen',
        elementExtends: 'template',
        params: {
            if: {
                property: 'paramIf',
                type: String,
                required: true,
                readonly: true
            },
            withUndefined: {
                type: Boolean,
                readonly: true
            }
        }
    })
], RnIfThen);
exports.RnIfThen = RnIfThen;


/***/ }),
/* 49 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "nextTick", function() { return nextTick; });
const nextTick = (() => {
    const global = Function('return this;')();
    if (global.process &&
        global.process.toString() == '[object process]' &&
        global.process.nextTick) {
        return global.process.nextTick;
    }
    if (global.setImmediate && global.setImmediate.toString().indexOf('[native code]') != -1) {
        const setImmediate = global.setImmediate;
        return (cb) => {
            setImmediate(cb);
        };
    }
    const promise = Promise.resolve();
    return (cb) => {
        promise.then(cb);
    };
})();


/***/ }),
/* 50 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const bindingToJSExpression_1 = __webpack_require__(10);
const Constants_1 = __webpack_require__(15);
const formatters_1 = __webpack_require__(16);
const cache = new Map();
function compileBinding(binding, cacheKey) {
    if (!cache.has(cacheKey)) {
        let inner = Function('formatters, KEY_COMPONENT_SELF', `var tmp; return ${bindingToJSExpression_1.bindingToJSExpression(binding[0])};`);
        cache.set(cacheKey, function () {
            return inner.call(this, formatters_1.formatters, Constants_1.KEY_COMPONENT_SELF);
        });
    }
    return cache.get(cacheKey);
}
exports.compileBinding = compileBinding;


/***/ }),
/* 51 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
function removeNodes(nodes) {
    let nodeCount = nodes.length;
    if (nodeCount == 1) {
        let node = nodes[0];
        if (node.parentNode) {
            node.parentNode.removeChild(node);
        }
    }
    else {
        for (let i = 0; i < nodeCount; i++) {
            let node = nodes[i];
            if (node.parentNode) {
                node.parentNode.removeChild(node);
            }
        }
    }
}
exports.removeNodes = removeNodes;


/***/ }),
/* 52 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var RnRepeat_1;
Object.defineProperty(exports, "__esModule", { value: true });
const next_tick_1 = __webpack_require__(49);
const cellx_1 = __webpack_require__(6);
const move_content_1 = __webpack_require__(42);
const attachChildComponentElements_1 = __webpack_require__(44);
const BaseComponent_1 = __webpack_require__(41);
const compileBinding_1 = __webpack_require__(50);
const Component_1 = __webpack_require__(29);
const ElementProtoMixin_1 = __webpack_require__(35);
const getTemplateNodeValueAST_1 = __webpack_require__(22);
const compileKeypath_1 = __webpack_require__(23);
const keypathPattern_1 = __webpack_require__(19);
const namePattern_1 = __webpack_require__(20);
const removeNodes_1 = __webpack_require__(51);
const Template_1 = __webpack_require__(3);
const RnIfThen_1 = __webpack_require__(48);
const slice = Array.prototype.slice;
const reForAttrValue = RegExp(`^\\s*(${namePattern_1.namePattern})\\s+(?:in|of)\\s+(${keypathPattern_1.keypathPattern}(?:\\s*(.*\\S))?)\\s*$`);
function getItem(list, index) {
    return Array.isArray(list) ? list[index] : list.get(index);
}
function insertBefore(nodes, beforeNode) {
    let nodeCount = nodes.length;
    if (nodeCount == 1) {
        beforeNode.parentNode.insertBefore(nodes[0], beforeNode);
        return nodes[0];
    }
    let parent = beforeNode.parentNode;
    for (let i = 0; i < nodeCount; i++) {
        parent.insertBefore(nodes[i], beforeNode);
    }
    return nodes[nodeCount - 1];
}
function offBindings(bindings) {
    if (bindings) {
        for (let i = bindings.length; i;) {
            bindings[--i].off();
        }
    }
}
function deactivateChildComponents(childComponents) {
    if (childComponents) {
        for (let i = childComponents.length; i;) {
            let childComponent = childComponents[--i];
            if (childComponent instanceof RnIfThen_1.RnIfThen || childComponent instanceof RnRepeat) {
                childComponent._deactivate();
            }
        }
    }
}
let RnRepeat = RnRepeat_1 = class RnRepeat extends BaseComponent_1.BaseComponent {
    constructor() {
        super(...arguments);
        this._active = false;
    }
    static get bindsInputContent() {
        return true;
    }
    elementConnected() {
        if (this._active) {
            return;
        }
        this._active = true;
        if (!this.initialized) {
            let for_ = this.paramFor.match(reForAttrValue);
            if (!for_) {
                throw new SyntaxError(`Invalid value in parameter "for" (${this.paramFor})`);
            }
            let getList;
            if (for_[3]) {
                let inListAST = getTemplateNodeValueAST_1.getTemplateNodeValueAST(`{${for_[2]}}`);
                if (!inListAST || inListAST.length != 1) {
                    throw new SyntaxError(`Invalid value in parameter "for" (${this.paramFor})`);
                }
                getList = compileBinding_1.compileBinding(inListAST, for_[2]);
            }
            else {
                getList = compileKeypath_1.compileKeypath(for_[2]);
            }
            this._itemName = for_[1];
            this._prevList = [];
            this._list = new cellx_1.Cell(getList, { context: this.$context });
            this._$itemsMap = new Map();
            this.initialized = true;
        }
        if (this.element[Template_1.KEY_CONTENT_TEMPLATE]) {
            this._list.onChange(this._onListChange, this);
            this._render(false);
        }
    }
    elementDisconnected() {
        next_tick_1.nextTick(() => {
            if (!this.element[ElementProtoMixin_1.KEY_ELEMENT_CONNECTED]) {
                this._deactivate();
            }
        });
    }
    _onListChange() {
        if (this.element.parentNode) {
            this._render(true);
        }
    }
    _attach() {
        this._attached = true;
    }
    _detach() {
        this._attached = false;
    }
    _render(fromChangeEvent) {
        let prevList = this._prevList;
        let prevListLength = prevList.length;
        let list = this._list.get();
        let $itemsMap = this._$itemsMap;
        let trackBy = this.trackBy;
        let startIndex = 0;
        let changed = false;
        if (list) {
            let new$ItemsMap = new Map();
            let removedValues = new Map();
            let el = this.element;
            let lastNode = el;
            for (let i = 0, l = list.length; i < l;) {
                let item = getItem(list, i);
                let value = trackBy ? item[trackBy] : item;
                let $items = $itemsMap.get(value);
                if ($items) {
                    if (removedValues.has(value)) {
                        let $item = $items.shift();
                        if (new$ItemsMap.has(value)) {
                            new$ItemsMap.get(value).push($item);
                        }
                        else {
                            new$ItemsMap.set(value, [$item]);
                        }
                        if (!$items.length) {
                            $itemsMap.delete(value);
                        }
                        let removedCount = removedValues.get(value);
                        if (removedCount == 1) {
                            removedValues.delete(value);
                        }
                        else {
                            removedValues.set(value, removedCount - 1);
                        }
                        $item.item.set(item);
                        $item.index.set(i);
                        lastNode = insertBefore($item.nodes, lastNode == el && this.beforeTemplate ? el : lastNode.nextSibling);
                        i++;
                    }
                    else {
                        let foundIndex;
                        for (let j = startIndex;; j++) {
                            if (foundIndex === undefined) {
                                if (value === (trackBy ? prevList[j][trackBy] : prevList[j])) {
                                    let $item = $items.shift();
                                    if (new$ItemsMap.has(value)) {
                                        new$ItemsMap.get(value).push($item);
                                    }
                                    else {
                                        new$ItemsMap.set(value, [$item]);
                                    }
                                    if (!$items.length) {
                                        $itemsMap.delete(value);
                                    }
                                    if (j == startIndex) {
                                        lastNode = $item.nodes[$item.nodes.length - 1];
                                        startIndex++;
                                        i++;
                                        break;
                                    }
                                    foundIndex = j;
                                }
                            }
                            else {
                                let foundCount = j - foundIndex;
                                let ii = i + foundCount;
                                if (ii < l) {
                                    let iiValue;
                                    if (j < prevListLength &&
                                        (trackBy
                                            ? (iiValue = getItem(list, ii)[trackBy]) ===
                                                prevList[j][trackBy]
                                            : (iiValue = getItem(list, ii)) === prevList[j])) {
                                        let ii$Items = $itemsMap.get(iiValue);
                                        if (new$ItemsMap.has(iiValue)) {
                                            new$ItemsMap.get(iiValue).push(ii$Items.shift());
                                        }
                                        else {
                                            new$ItemsMap.set(iiValue, [ii$Items.shift()]);
                                        }
                                        if (!ii$Items.length) {
                                            $itemsMap.delete(iiValue);
                                        }
                                        continue;
                                    }
                                    if (foundCount < foundIndex - startIndex) {
                                        for (let k = foundIndex; k < j; k++) {
                                            let kValue = trackBy
                                                ? prevList[k][trackBy]
                                                : prevList[k];
                                            let k$Item = new$ItemsMap.get(kValue);
                                            k$Item[0].item.set(item);
                                            k$Item[0].index.set(i);
                                            lastNode = insertBefore(k$Item[0].nodes, lastNode == el && this.beforeTemplate
                                                ? el
                                                : lastNode.nextSibling);
                                        }
                                        prevList.splice(foundIndex, foundCount);
                                        prevListLength -= foundCount;
                                        i = ii;
                                        changed = true;
                                        break;
                                    }
                                }
                                for (let k = startIndex; k < foundIndex; k++) {
                                    let kValue = trackBy ? prevList[k][trackBy] : prevList[k];
                                    let index = removedValues.get(kValue) || 0;
                                    removeNodes_1.removeNodes($itemsMap.get(kValue)[index].nodes);
                                    removedValues.set(kValue, index + 1);
                                }
                                let lastFoundValue = trackBy
                                    ? prevList[j - 1][trackBy]
                                    : prevList[j - 1];
                                let nodes = new$ItemsMap.get(lastFoundValue)[removedValues.get(lastFoundValue) || 0].nodes;
                                lastNode = nodes[nodes.length - 1];
                                startIndex = j;
                                i = ii;
                                changed = true;
                                break;
                            }
                        }
                    }
                }
                else {
                    let itemCell = new cellx_1.Cell(null, { value: item });
                    let indexCell = new cellx_1.Cell(i);
                    let context = this.$context;
                    let contentBindingResult = [null, null, null];
                    let content = this.element[Template_1.KEY_CONTENT_TEMPLATE].render(null, this.ownerComponent, Object.create(context, {
                        [this._itemName]: {
                            configurable: true,
                            enumerable: true,
                            get: (itemCell => () => itemCell.get())(itemCell)
                        },
                        $index: {
                            configurable: true,
                            enumerable: true,
                            get: (indexCell => () => indexCell.get())(indexCell)
                        }
                    }), contentBindingResult);
                    let childComponents = contentBindingResult[0];
                    let backBindings = contentBindingResult[2];
                    let new$Item = {
                        item: itemCell,
                        index: indexCell,
                        nodes: slice.call(content.childNodes),
                        bindings: contentBindingResult[1],
                        childComponents
                    };
                    if (new$ItemsMap.has(value)) {
                        new$ItemsMap.get(value).push(new$Item);
                    }
                    else {
                        new$ItemsMap.set(value, [new$Item]);
                    }
                    if (childComponents) {
                        for (let i = childComponents.length; i;) {
                            let childComponent = childComponents[--i];
                            if (childComponent.element.firstChild &&
                                childComponent.constructor
                                    .bindsInputContent) {
                                childComponent.$inputContent = move_content_1.moveContent(document.createDocumentFragment(), childComponent.element);
                            }
                        }
                    }
                    let newLastNode = content.lastChild;
                    ElementProtoMixin_1.suppressConnectionStatusCallbacks();
                    lastNode.parentNode.insertBefore(content, lastNode == el && this.beforeTemplate ? el : lastNode.nextSibling);
                    ElementProtoMixin_1.resumeConnectionStatusCallbacks();
                    lastNode = newLastNode;
                    if (childComponents) {
                        attachChildComponentElements_1.attachChildComponentElements(childComponents);
                    }
                    if (backBindings) {
                        for (let i = backBindings.length; i; i -= 3) {
                            backBindings[i - 3].on('change:' + backBindings[i - 2], backBindings[i - 1]);
                        }
                    }
                    changed = true;
                    i++;
                }
            }
            if (removedValues.size) {
                ($itemsMap => {
                    removedValues.forEach((_removedCount, value) => {
                        for (let $item of $itemsMap.get(value)) {
                            offBindings($item.bindings);
                            deactivateChildComponents($item.childComponents);
                        }
                    });
                })($itemsMap);
            }
            this._$itemsMap = new$ItemsMap;
        }
        else {
            this._$itemsMap = new Map();
        }
        if (startIndex < prevListLength) {
            for (let i = startIndex; i < prevListLength; i++) {
                let value = trackBy ? prevList[i][trackBy] : prevList[i];
                for (let $item of $itemsMap.get(value)) {
                    removeNodes_1.removeNodes($item.nodes);
                    offBindings($item.bindings);
                    deactivateChildComponents($item.childComponents);
                }
            }
        }
        else if (!changed) {
            return;
        }
        this._prevList = list ? (Array.isArray(list) ? list.slice() : list.toArray()) : [];
        if (fromChangeEvent) {
            cellx_1.Cell.release();
            this.emit(RnRepeat_1.EVENT_CHANGE);
        }
    }
    _deactivate() {
        if (!this._active) {
            return;
        }
        this._active = false;
        this._list.offChange(this._onListChange, this);
        let prevList = this._prevList;
        let $itemsMap = this._$itemsMap;
        let trackBy = this.trackBy;
        for (let i = 0, l = prevList.length; i < l; i++) {
            let value = trackBy ? prevList[i][trackBy] : prevList[i];
            for (let $item of $itemsMap.get(value)) {
                removeNodes_1.removeNodes($item.nodes);
                offBindings($item.bindings);
                deactivateChildComponents($item.childComponents);
            }
        }
        $itemsMap.clear();
    }
};
RnRepeat.EVENT_CHANGE = Symbol('change');
RnRepeat = RnRepeat_1 = __decorate([
    Component_1.Component({
        elementIs: 'RnRepeat',
        elementExtends: 'template',
        params: {
            for: {
                property: 'paramFor',
                type: String,
                required: true,
                readonly: true
            },
            trackBy: {
                type: String,
                readonly: true
            },
            beforeTemplate: {
                type: Boolean,
                readonly: true
            }
        }
    })
], RnRepeat);
exports.RnRepeat = RnRepeat;


/***/ }),
/* 53 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
const Component_1 = __webpack_require__(29);
const RnIfThen_1 = __webpack_require__(48);
let RnIfElse = class RnIfElse extends RnIfThen_1.RnIfThen {
    constructor() {
        super(...arguments);
        this._elseMode = true;
    }
};
RnIfElse = __decorate([
    Component_1.Component({
        elementIs: 'RnIfElse',
        elementExtends: 'template'
    })
], RnIfElse);
exports.RnIfElse = RnIfElse;


/***/ }),
/* 54 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
const get_uid_1 = __webpack_require__(55);
const move_content_1 = __webpack_require__(42);
const attachChildComponentElements_1 = __webpack_require__(44);
const BaseComponent_1 = __webpack_require__(41);
const bindContent_1 = __webpack_require__(7);
const Component_1 = __webpack_require__(29);
const ElementProtoMixin_1 = __webpack_require__(35);
const cloneNode_1 = __webpack_require__(56);
const Template_1 = __webpack_require__(3);
const KEY_SLOTS_CONTENT = Symbol('slotsContent');
let RnSlot = class RnSlot extends BaseComponent_1.BaseComponent {
    static get bindsInputContent() {
        return true;
    }
    _attach() {
        this._attached = true;
        if (this.isReady) {
            this._unfreezeBindings();
            if (this._childComponents) {
                attachChildComponentElements_1.attachChildComponentElements(this._childComponents);
            }
            return;
        }
        let ownerComponent = this.ownerComponent;
        let contentOwnerComponent = ownerComponent.ownerComponent;
        let ownerComponentInputContent = ownerComponent.$inputContent;
        let el = this.element;
        let cloneContent = this.cloneContent;
        let content;
        let childComponents;
        let bindings;
        let backBindings;
        if (ownerComponentInputContent || !cloneContent) {
            let name = this.name;
            let forTag;
            let for_;
            if (!name) {
                forTag = this.forTag;
                if (forTag) {
                    forTag = forTag.toUpperCase();
                }
                else {
                    for_ = this.paramFor;
                }
            }
            let key = get_uid_1.getUID(ownerComponent) +
                '/' +
                (name ? 'slot:' + name : forTag ? 'tag:' + forTag : for_ || '');
            if (name || forTag || for_) {
                let slotsContent;
                if (!cloneContent &&
                    (slotsContent = contentOwnerComponent[KEY_SLOTS_CONTENT]) &&
                    slotsContent.has(key)) {
                    let container = slotsContent.get(key);
                    if (container.firstChild) {
                        content = move_content_1.moveContent(document.createDocumentFragment(), container);
                        slotsContent.set(key, el);
                        childComponents = container.$component._childComponents;
                        bindings = container.$component._bindings;
                    }
                }
                else if (ownerComponentInputContent) {
                    if (for_ && for_.indexOf('__') == -1) {
                        let elementBlockNames = ownerComponent.constructor
                            ._elementBlockNames;
                        for_ = elementBlockNames[elementBlockNames.length - 1] + '__' + for_;
                    }
                    let selectedElements = ownerComponentInputContent.querySelectorAll(for_ ? '.' + for_ : forTag || `[slot=${name}]`);
                    let selectedElementCount = selectedElements.length;
                    if (selectedElementCount) {
                        content = document.createDocumentFragment();
                        for (let i = 0; i < selectedElementCount; i++) {
                            content.appendChild(cloneContent ? cloneNode_1.cloneNode(selectedElements[i]) : selectedElements[i]);
                        }
                    }
                    if (!cloneContent) {
                        (slotsContent ||
                            contentOwnerComponent[KEY_SLOTS_CONTENT] ||
                            (contentOwnerComponent[KEY_SLOTS_CONTENT] = new Map())).set(key, el);
                    }
                }
            }
            else if (cloneContent) {
                content = cloneNode_1.cloneNode(ownerComponentInputContent);
            }
            else {
                let slotsContent = contentOwnerComponent[KEY_SLOTS_CONTENT];
                if (slotsContent && slotsContent.has(key)) {
                    let container = slotsContent.get(key);
                    content = move_content_1.moveContent(document.createDocumentFragment(), container);
                    slotsContent.set(key, el);
                    childComponents = container.$component._childComponents;
                    bindings = container.$component._bindings;
                }
                else if (ownerComponentInputContent) {
                    content = ownerComponentInputContent;
                    (slotsContent || (contentOwnerComponent[KEY_SLOTS_CONTENT] = new Map())).set(key, el);
                }
            }
        }
        if (bindings === undefined) {
            if (content || this.element[Template_1.KEY_CONTENT_TEMPLATE]) {
                let contentBindingResult = [null, null, null];
                if (content) {
                    bindContent_1.bindContent(content, contentOwnerComponent, this.getContext
                        ? this.getContext.call(ownerComponent, ownerComponent.$context, this)
                        : ownerComponent.$context, contentBindingResult);
                }
                else {
                    content = this.element[Template_1.KEY_CONTENT_TEMPLATE].render(null, ownerComponent, this.getContext
                        ? this.getContext.call(ownerComponent, this.$context, this)
                        : this.$context, contentBindingResult);
                }
                childComponents = this._childComponents = contentBindingResult[0];
                this._bindings = contentBindingResult[1];
                backBindings = contentBindingResult[2];
                if (childComponents) {
                    for (let i = childComponents.length; i;) {
                        let childComponent = childComponents[--i];
                        if (childComponent.element.firstChild &&
                            childComponent.constructor.bindsInputContent) {
                            childComponent.$inputContent = move_content_1.moveContent(document.createDocumentFragment(), childComponent.element);
                        }
                    }
                }
            }
            else {
                this._childComponents = null;
                this._bindings = null;
            }
        }
        else {
            this._childComponents = childComponents;
            this._bindings = bindings;
            this._unfreezeBindings();
        }
        if (content) {
            ElementProtoMixin_1.suppressConnectionStatusCallbacks();
            el.appendChild(content);
            ElementProtoMixin_1.resumeConnectionStatusCallbacks();
        }
        if (childComponents) {
            attachChildComponentElements_1.attachChildComponentElements(childComponents);
        }
        if (backBindings) {
            for (let i = backBindings.length; i; i -= 3) {
                backBindings[i - 3].on('change:' + backBindings[i - 2], backBindings[i - 1]);
            }
        }
        this.isReady = true;
    }
    _detach() {
        this._attached = false;
        this._freezeBindings();
    }
};
RnSlot = __decorate([
    Component_1.Component({
        elementIs: 'RnSlot',
        params: {
            name: {
                type: String,
                readonly: true
            },
            forTag: {
                type: String,
                readonly: true
            },
            for: {
                property: 'paramFor',
                type: String,
                readonly: true
            },
            cloneContent: {
                default: false,
                readonly: true
            },
            getContext: {
                type: Object,
                readonly: true
            }
        }
    })
], RnSlot);
exports.RnSlot = RnSlot;


/***/ }),
/* 55 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const next_uid_1 = __webpack_require__(43);
const hasOwn = Object.prototype.hasOwnProperty;
const KEY_UID = Symbol('uid');
exports.getUID = (obj) => hasOwn.call(obj, KEY_UID) ? obj[KEY_UID] : (obj[KEY_UID] = next_uid_1.nextUID());


/***/ }),
/* 56 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const handleDOMEvent_1 = __webpack_require__(27);
const handleEvent_1 = __webpack_require__(28);
const Template_1 = __webpack_require__(3);
const IE = !!document.documentMode || navigator.userAgent.indexOf('Edge/') != -1;
function cloneNode(node) {
    let copy;
    switch (node.nodeType) {
        case Node.DOCUMENT_FRAGMENT_NODE: {
            copy = document.createDocumentFragment();
            for (let child = node.firstChild; child; child = child.nextSibling) {
                copy.appendChild(cloneNode(child));
            }
            break;
        }
        case Node.ELEMENT_NODE: {
            let tagName = node.tagName.toLowerCase();
            let is = node.getAttribute('is');
            if (is) {
                copy = window.innerHTML(document.createElement('div'), `<${tagName} is="${is}">`).firstChild;
            }
            else if (IE) {
                copy = window.innerHTML(document.createElement('div'), `<${tagName}>`)
                    .firstChild;
            }
            else {
                copy = document.createElementNS(node.namespaceURI, tagName);
            }
            if ((tagName == 'template' || tagName == 'rn-slot') && node[Template_1.KEY_CONTENT_TEMPLATE]) {
                copy[Template_1.KEY_CONTENT_TEMPLATE] = node[Template_1.KEY_CONTENT_TEMPLATE];
            }
            if (node[handleEvent_1.KEY_EVENTS]) {
                copy[handleEvent_1.KEY_EVENTS] = node[handleEvent_1.KEY_EVENTS];
            }
            if (node[handleDOMEvent_1.KEY_DOM_EVENTS]) {
                copy[handleDOMEvent_1.KEY_DOM_EVENTS] = node[handleDOMEvent_1.KEY_DOM_EVENTS];
            }
            let attrs = node.attributes;
            for (let i = 0, l = attrs.length; i < l; i++) {
                let attr = attrs.item(i);
                if (!is || attr.name != 'is') {
                    copy.setAttributeNS(attr.namespaceURI, attr.name, attr.value);
                }
            }
            for (let child = node.firstChild; child; child = child.nextSibling) {
                copy.appendChild(cloneNode(child));
            }
            break;
        }
        case Node.TEXT_NODE: {
            copy = document.createTextNode(node.nodeValue);
            break;
        }
    }
    return copy;
}
exports.cloneNode = cloneNode;


/***/ })
/******/ ]);
});