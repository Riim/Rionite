(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory(require("@riim/di"), require("@riim/logger"), require("nelm-parser"), require("@riim/escape-html"), require("@riim/rionite-snake-case-attribute-name"), require("@riim/map-set-polyfill"), require("escape-string"), require("@riim/next-uid"), require("cellx"), require("@riim/gettext"), require("@riim/kebab-case"), require("@riim/mixin"), require("@riim/get-uid"), require("@riim/move-content"), require("@riim/symbol-polyfill"), require("html-to-fragment"), require("@riim/is-regexp"), require("@riim/set-attribute"), require("@riim/defer"), require("@riim/lower-case-first-word"), require("@riim/next-tick"));
	else if(typeof define === 'function' && define.amd)
		define(["@riim/di", "@riim/logger", "nelm-parser", "@riim/escape-html", "@riim/rionite-snake-case-attribute-name", "@riim/map-set-polyfill", "escape-string", "@riim/next-uid", "cellx", "@riim/gettext", "@riim/kebab-case", "@riim/mixin", "@riim/get-uid", "@riim/move-content", "@riim/symbol-polyfill", "html-to-fragment", "@riim/is-regexp", "@riim/set-attribute", "@riim/defer", "@riim/lower-case-first-word", "@riim/next-tick"], factory);
	else if(typeof exports === 'object')
		exports["rionite"] = factory(require("@riim/di"), require("@riim/logger"), require("nelm-parser"), require("@riim/escape-html"), require("@riim/rionite-snake-case-attribute-name"), require("@riim/map-set-polyfill"), require("escape-string"), require("@riim/next-uid"), require("cellx"), require("@riim/gettext"), require("@riim/kebab-case"), require("@riim/mixin"), require("@riim/get-uid"), require("@riim/move-content"), require("@riim/symbol-polyfill"), require("html-to-fragment"), require("@riim/is-regexp"), require("@riim/set-attribute"), require("@riim/defer"), require("@riim/lower-case-first-word"), require("@riim/next-tick"));
	else
		root["rionite"] = factory(root["@riim/di"], root["@riim/logger"], root["nelm-parser"], root["@riim/escape-html"], root["@riim/rionite-snake-case-attribute-name"], root["@riim/map-set-polyfill"], root["escape-string"], root["@riim/next-uid"], root["cellx"], root["@riim/gettext"], root["@riim/kebab-case"], root["@riim/mixin"], root["@riim/get-uid"], root["@riim/move-content"], root["@riim/symbol-polyfill"], root["html-to-fragment"], root["@riim/is-regexp"], root["@riim/set-attribute"], root["@riim/defer"], root["@riim/lower-case-first-word"], root["@riim/next-tick"]);
})(window, function(__WEBPACK_EXTERNAL_MODULE__1__, __WEBPACK_EXTERNAL_MODULE__2__, __WEBPACK_EXTERNAL_MODULE__5__, __WEBPACK_EXTERNAL_MODULE__7__, __WEBPACK_EXTERNAL_MODULE__8__, __WEBPACK_EXTERNAL_MODULE__10__, __WEBPACK_EXTERNAL_MODULE__11__, __WEBPACK_EXTERNAL_MODULE__13__, __WEBPACK_EXTERNAL_MODULE__14__, __WEBPACK_EXTERNAL_MODULE__16__, __WEBPACK_EXTERNAL_MODULE__19__, __WEBPACK_EXTERNAL_MODULE__20__, __WEBPACK_EXTERNAL_MODULE__24__, __WEBPACK_EXTERNAL_MODULE__25__, __WEBPACK_EXTERNAL_MODULE__26__, __WEBPACK_EXTERNAL_MODULE__27__, __WEBPACK_EXTERNAL_MODULE__31__, __WEBPACK_EXTERNAL_MODULE__33__, __WEBPACK_EXTERNAL_MODULE__45__, __WEBPACK_EXTERNAL_MODULE__51__, __WEBPACK_EXTERNAL_MODULE__53__) {
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
const di_1 = __webpack_require__(1);
const logger_1 = __webpack_require__(2);
__webpack_require__(3);
__webpack_require__(4);
var nelm_parser_1 = __webpack_require__(5);
exports.NelmNodeType = nelm_parser_1.NodeType;
exports.NelmParser = nelm_parser_1.Parser;
var DisposableMixin_1 = __webpack_require__(12);
exports.DisposableMixin = DisposableMixin_1.DisposableMixin;
var formatters_1 = __webpack_require__(15);
exports.formatters = formatters_1.formatters;
var Component_1 = __webpack_require__(17);
exports.Component = Component_1.Component;
var Param_1 = __webpack_require__(50);
exports.Param = Param_1.Param;
var BaseComponent_1 = __webpack_require__(23);
exports.KEY_PARAMS_CONFIG = BaseComponent_1.KEY_PARAMS_CONFIG;
exports.KEY_PARAMS = BaseComponent_1.KEY_PARAMS;
exports.BaseComponent = BaseComponent_1.BaseComponent;
var ElementProtoMixin_1 = __webpack_require__(44);
exports.KEY_ELEMENT_CONNECTED = ElementProtoMixin_1.KEY_ELEMENT_CONNECTED;
var ComponentParams_1 = __webpack_require__(29);
exports.ComponentParams = ComponentParams_1.ComponentParams;
var Template_1 = __webpack_require__(6);
exports.Template = Template_1.Template;
var registerComponent_1 = __webpack_require__(18);
exports.registerComponent = registerComponent_1.registerComponent;
var RnIfThen_1 = __webpack_require__(52);
exports.RnIfThen = RnIfThen_1.RnIfThen;
var RnIfElse_1 = __webpack_require__(57);
exports.RnIfElse = RnIfElse_1.RnIfElse;
var RnRepeat_1 = __webpack_require__(56);
exports.RnRepeat = RnRepeat_1.RnRepeat;
var RnSlot_1 = __webpack_require__(58);
exports.RnSlot = RnSlot_1.RnSlot;
di_1.Container.registerService('logger', logger_1.logger);


/***/ }),
/* 1 */
/***/ (function(module, exports) {

module.exports = __WEBPACK_EXTERNAL_MODULE__1__;

/***/ }),
/* 2 */
/***/ (function(module, exports) {

module.exports = __WEBPACK_EXTERNAL_MODULE__2__;

/***/ }),
/* 3 */
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
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const nelm_parser_1 = __webpack_require__(5);
const Template_1 = __webpack_require__(6);
['if-then', 'if-else', 'repeat'].forEach(name => {
    Template_1.Template.helpers[name] = el => {
        let attrs = el.attributes;
        // проверка на attrs для `@div/name // ...`
        if (attrs && name != 'repeat') {
            let list = attrs.list;
            let index = list.length - 1;
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
                list[foundIndex] = {
                    name: 'if',
                    value: list[foundIndex].name
                };
            }
        }
        attrs = {
            superCall: attrs && attrs.superCall,
            list: attrs ? attrs.list.slice() : []
        };
        attrs.list.push({
            name: 'is',
            value: 'rn-' + name
        });
        return [
            {
                nodeType: nelm_parser_1.NodeType.ELEMENT,
                tagName: 'template',
                isHelper: false,
                names: el.names,
                attributes: attrs,
                content: el.content
            }
        ];
    };
});
Template_1.Template.helpers.slot = el => {
    return [
        {
            nodeType: nelm_parser_1.NodeType.ELEMENT,
            tagName: 'rn-slot',
            isHelper: false,
            names: el.names,
            attributes: el.attributes,
            content: el.content && [
                {
                    nodeType: nelm_parser_1.NodeType.ELEMENT,
                    tagName: 'template',
                    isHelper: false,
                    names: null,
                    attributes: null,
                    content: el.content
                }
            ]
        }
    ];
};


/***/ }),
/* 5 */
/***/ (function(module, exports) {

module.exports = __WEBPACK_EXTERNAL_MODULE__5__;

/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const escape_html_1 = __webpack_require__(7);
const rionite_snake_case_attribute_name_1 = __webpack_require__(8);
const self_closing_tags_1 = __webpack_require__(9);
const escape_string_1 = __webpack_require__(11);
const nelm_parser_1 = __webpack_require__(5);
const join = Array.prototype.join;
exports.ELEMENT_NAME_DELIMITER = '__';
class Template {
    constructor(nelm, opts) {
        if (typeof nelm == 'string') {
            nelm = new nelm_parser_1.Parser(nelm).parse();
        }
        let parent = (this.parent = (opts && opts.parent) || null);
        if (!parent) {
            nelm.content = [
                {
                    nodeType: nelm_parser_1.NodeType.ELEMENT,
                    tagName: 'section',
                    isHelper: true,
                    names: ['root'],
                    attributes: null,
                    content: nelm.content
                }
            ];
        }
        this.nelm = nelm;
        let blockName = (opts && opts.blockName) || this.nelm.name;
        if (parent) {
            this._elementNamesTemplate = [
                blockName ? blockName + exports.ELEMENT_NAME_DELIMITER : ''
            ].concat(parent._elementNamesTemplate);
        }
        else if (blockName) {
            if (Array.isArray(blockName)) {
                this.setBlockName(blockName);
            }
            else {
                this._elementNamesTemplate = [blockName + exports.ELEMENT_NAME_DELIMITER, ''];
            }
        }
        else {
            this._elementNamesTemplate = ['', ''];
        }
        this.onBeforeNamedElementOpeningTagClosing =
            (opts && opts.onBeforeNamedElementOpeningTagClosing) || (() => '');
        this._tagNameMap = { __proto__: parent && parent._tagNameMap };
        this._attributeListMap = { __proto__: parent && parent._attributeListMap };
        this._attributeCountMap = { __proto__: parent && parent._attributeCountMap };
    }
    extend(nelm, opts) {
        return new Template(nelm, { __proto__: opts || null, parent: this });
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
    render() {
        return (this._renderer || this._compileRenderers()).call(this);
    }
    _compileRenderers() {
        let parent = this.parent;
        this._elements = [
            (this._currentElement = {
                name: null,
                superCall: false,
                source: null,
                innerSource: []
            })
        ];
        let elMap = (this._elementMap = {});
        if (parent) {
            this._renderer = parent._renderer || parent._compileRenderers();
        }
        this._elementRendererMap = { __proto__: parent && parent._elementRendererMap };
        let content = this.nelm.content;
        let contentLength = content.length;
        if (contentLength) {
            for (let i = 0; i < contentLength; i++) {
                let node = content[i];
                this._compileNode(node, node.nodeType == nelm_parser_1.NodeType.ELEMENT
                    ? node.tagName == 'svg'
                    : false);
            }
            Object.keys(elMap).forEach(function (name) {
                let el = elMap[name];
                this[name] = Function(`return ${el.source.join(' + ')};`);
                if (el.superCall) {
                    let inner = Function('$super', `return ${el.innerSource.join(' + ')};`);
                    let parentElRendererMap = parent && parent._elementRendererMap;
                    this[name + '/content'] = function () {
                        return inner.call(this, parentElRendererMap);
                    };
                }
                else {
                    this[name + '/content'] = Function(`return ${el.innerSource.join(' + ') || "''"};`);
                }
            }, this._elementRendererMap);
            if (!parent) {
                return (this._renderer = Function(`return ${this._currentElement.innerSource.join(' + ') || "''"};`));
            }
        }
        else if (!parent) {
            return (this._renderer = () => '');
        }
        return this._renderer;
    }
    _compileNode(node, isSVG, parentElName) {
        switch (node.nodeType) {
            case nelm_parser_1.NodeType.ELEMENT: {
                let parent = this.parent;
                let els = this._elements;
                let el = node;
                let tagName = el.tagName;
                let isHelper = el.isHelper;
                let elNames = el.names;
                let elName = elNames && (isHelper ? '@' + elNames[0] : elNames[0]);
                let elAttrs = el.attributes;
                let content = el.content;
                if (elNames) {
                    if (elName) {
                        if (tagName) {
                            this._tagNameMap[elName] = tagName;
                        }
                        else {
                            // Не надо добавлять ` || 'div'`,
                            // тк. ниже tagName используется как имя хелпера.
                            tagName = parent && parent._tagNameMap[elName];
                        }
                        let renderedAttrs;
                        if (elAttrs && (elAttrs.list.length || elAttrs.superCall)) {
                            let attrListMap = this._attributeListMap ||
                                (this._attributeListMap = {
                                    __proto__: (parent && parent._attributeListMap) || null
                                });
                            let attrCountMap = this._attributeCountMap ||
                                (this._attributeCountMap = {
                                    __proto__: (parent && parent._attributeCountMap) || null
                                });
                            let elAttrsSuperCall = elAttrs.superCall;
                            let attrList;
                            let attrCount;
                            if (elAttrsSuperCall) {
                                if (!parent) {
                                    throw new TypeError('Parent template is required when using super');
                                }
                                attrList = attrListMap[elName] = {
                                    __proto__: parent._attributeListMap[elAttrsSuperCall.elementName || elName] || null
                                };
                                attrCount = attrCountMap[elName] =
                                    parent._attributeCountMap[elAttrsSuperCall.elementName || elName] || 0;
                            }
                            else {
                                attrList = attrListMap[elName] = { __proto__: null };
                                attrCount = attrCountMap[elName] = 0;
                            }
                            for (let attr of elAttrs.list) {
                                let name = isSVG
                                    ? attr.name
                                    : rionite_snake_case_attribute_name_1.snakeCaseAttributeName(attr.name, true);
                                let value = attr.value;
                                let index = attrList[name];
                                attrList[index === undefined ? attrCount : index] = ` ${name}="${value && escape_string_1.escapeString(escape_html_1.escapeHTML(value))}"`;
                                if (index === undefined) {
                                    attrList[name] = attrCount;
                                    attrCountMap[elName] = ++attrCount;
                                }
                            }
                            if (!isHelper) {
                                attrList = {
                                    __proto__: attrList,
                                    length: attrCount
                                };
                                if (attrList['class'] !== undefined) {
                                    attrList[attrList['class']] =
                                        ` class="' + this._renderElementClasses(['${elNames.join("','")}']) + ' ` +
                                            attrList[attrList['class']].slice(' class="'.length);
                                    renderedAttrs = join.call(attrList, '');
                                }
                                else {
                                    renderedAttrs =
                                        ` class="' + this._renderElementClasses(['${elNames.join("','")}']) + '"` + join.call(attrList, '');
                                }
                            }
                        }
                        else if (!isHelper) {
                            renderedAttrs = ` class="' + this._renderElementClasses(['${elNames.join("','")}']) + '"`;
                        }
                        let currentEl = {
                            name: elName,
                            superCall: false,
                            source: isHelper
                                ? [`this._elementRendererMap['${elName}/content'].call(this)`]
                                : [
                                    `'<${tagName ||
                                        'div'}${renderedAttrs}' + this.onBeforeNamedElementOpeningTagClosing(['${elNames.join("','")}']) + '>'`,
                                    content && content.length
                                        ? `this._elementRendererMap['${elName}/content'].call(this) + '</${tagName ||
                                            'div'}>'`
                                        : !content && tagName && self_closing_tags_1.map.has(tagName)
                                            ? "''"
                                            : `'</${tagName || 'div'}>'`
                                ],
                            innerSource: []
                        };
                        els.push((this._currentElement = currentEl));
                        this._elementMap[elName] = currentEl;
                    }
                    else if (!isHelper) {
                        if (elAttrs && elAttrs.list.length) {
                            let hasClassAttr = false;
                            let attrs = '';
                            for (let attr of elAttrs.list) {
                                let value = attr.value;
                                if (attr.name == 'class') {
                                    hasClassAttr = true;
                                    attrs += ` class="' + this._renderElementClasses(['${elNames
                                        .slice(1)
                                        .join("','")}']) + '${value ? ' ' + escape_string_1.escapeString(escape_html_1.escapeHTML(value)) : ''}"`;
                                }
                                else {
                                    attrs += ` ${isSVG ? attr.name : rionite_snake_case_attribute_name_1.snakeCaseAttributeName(attr.name, true)}="${value && escape_string_1.escapeString(escape_html_1.escapeHTML(value))}"`;
                                }
                            }
                            this._currentElement.innerSource.push(`'<${tagName || 'div'}${hasClassAttr
                                ? attrs
                                : ` class="' + this._renderElementClasses(['${elNames
                                    .slice(1)
                                    .join("','")}']) + '"` + attrs}' + this.onBeforeNamedElementOpeningTagClosing(['${elNames
                                .slice(1)
                                .join("','")}']) + '>'`);
                        }
                        else {
                            this._currentElement.innerSource.push(`'<${tagName ||
                                'div'} class="' + this._renderElementClasses(['${elNames
                                .slice(1)
                                .join("','")}']) + '"' + this.onBeforeNamedElementOpeningTagClosing(['${elNames
                                .slice(1)
                                .join("','")}']) + '>'`);
                        }
                    }
                }
                else if (!isHelper) {
                    this._currentElement.innerSource.push(`'<${tagName || 'div'}${elAttrs
                        ? elAttrs.list
                            .map(attr => ` ${isSVG
                            ? attr.name
                            : rionite_snake_case_attribute_name_1.snakeCaseAttributeName(attr.name, true)}="${attr.value &&
                            escape_string_1.escapeString(escape_html_1.escapeHTML(attr.value))}"`)
                            .join('')
                        : ''}>'`);
                }
                if (isHelper) {
                    if (!tagName) {
                        throw new TypeError('"tagName" is required');
                    }
                    let helper = Template.helpers[tagName];
                    if (!helper) {
                        throw new TypeError(`Helper "${tagName}" is not defined`);
                    }
                    content = helper(el);
                }
                if (content) {
                    for (let node of content) {
                        this._compileNode(node, isSVG ||
                            (node.nodeType == nelm_parser_1.NodeType.ELEMENT
                                ? node.tagName == 'svg'
                                : false), elName || parentElName);
                    }
                }
                if (elName) {
                    els.pop();
                    this._currentElement = els[els.length - 1];
                    this._currentElement.innerSource.push(`this._elementRendererMap['${elName}'].call(this)`);
                }
                else if (!isHelper && (content || !tagName || !self_closing_tags_1.map.has(tagName))) {
                    this._currentElement.innerSource.push(`'</${tagName || 'div'}>'`);
                }
                break;
            }
            case nelm_parser_1.NodeType.TEXT: {
                this._currentElement.innerSource.push(`'${node.value && escape_string_1.escapeString(node.value)}'`);
                break;
            }
            case nelm_parser_1.NodeType.SUPER_CALL: {
                this._currentElement.superCall = true;
                this._currentElement.innerSource.push(`$super['${node.elementName ||
                    parentElName}/content'].call(this)`);
                break;
            }
        }
    }
    _renderElementClasses(elNames) {
        let elClasses = '';
        for (let i = 0, l = elNames.length; i < l; i++) {
            elClasses += this._elementNamesTemplate.join(elNames[i] + ' ');
        }
        return elClasses.slice(0, -1);
    }
}
Template.helpers = {
    section: el => el.content
};
exports.Template = Template;


/***/ }),
/* 7 */
/***/ (function(module, exports) {

module.exports = __WEBPACK_EXTERNAL_MODULE__7__;

/***/ }),
/* 8 */
/***/ (function(module, exports) {

module.exports = __WEBPACK_EXTERNAL_MODULE__8__;

/***/ }),
/* 9 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var map_set_polyfill_1 = __webpack_require__(10);
exports.list = [
    'area',
    'base',
    'basefont',
    'br',
    'col',
    'command',
    'embed',
    'frame',
    'hr',
    'img',
    'input',
    'isindex',
    'keygen',
    'link',
    'meta',
    'param',
    'source',
    'track',
    'wbr',
    // svg tags
    'circle',
    'ellipse',
    'line',
    'path',
    'polygone',
    'polyline',
    'rect',
    'stop',
    'use'
];
exports.map = exports.list.reduce(function (map, name) { return map.set(name, true); }, new map_set_polyfill_1.Map());


/***/ }),
/* 10 */
/***/ (function(module, exports) {

module.exports = __WEBPACK_EXTERNAL_MODULE__10__;

/***/ }),
/* 11 */
/***/ (function(module, exports) {

module.exports = __WEBPACK_EXTERNAL_MODULE__11__;

/***/ }),
/* 12 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const next_uid_1 = __webpack_require__(13);
const cellx_1 = __webpack_require__(14);
class DisposableMixin {
    constructor() {
        this._disposables = {};
    }
    listenTo(target, type, listener, context, useCapture) {
        let listenings;
        if (typeof type == 'object') {
            listenings = [];
            if (Array.isArray(type)) {
                for (let i = 0, l = type.length; i < l; i++) {
                    listenings.push(this.listenTo(target, type[i], listener, context, useCapture));
                }
            }
            else {
                for (let name in type) {
                    listenings.push(this.listenTo(target, name, type[name], listener, context));
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
            delete this._disposables[id];
        };
        let listening = (this._disposables[id] = {
            stop: stopListening,
            dispose: stopListening
        });
        return listening;
    }
    _listenTo(target, type, listener, context, useCapture) {
        if (target instanceof cellx_1.EventEmitter) {
            target.on(type, listener, context);
        }
        else if (target.addEventListener) {
            if (target !== context) {
                listener = listener.bind(context);
            }
            target.addEventListener(type, listener, useCapture);
        }
        else {
            throw new TypeError('Unable to add a listener');
        }
        let id = next_uid_1.nextUID();
        let stopListening = () => {
            if (this._disposables[id]) {
                if (target instanceof cellx_1.EventEmitter) {
                    target.off(type, listener, context);
                }
                else {
                    target.removeEventListener(type, listener, useCapture);
                }
                delete this._disposables[id];
            }
        };
        let listening = (this._disposables[id] = {
            stop: stopListening,
            dispose: stopListening
        });
        return listening;
    }
    setTimeout(callback, delay) {
        let id = next_uid_1.nextUID();
        let timeoutId = setTimeout(() => {
            delete this._disposables[id];
            callback.call(this);
        }, delay);
        let clearTimeout_ = () => {
            if (this._disposables[id]) {
                clearTimeout(timeoutId);
                delete this._disposables[id];
            }
        };
        let timeout = (this._disposables[id] = {
            clear: clearTimeout_,
            dispose: clearTimeout_
        });
        return timeout;
    }
    setInterval(callback, delay) {
        let id = next_uid_1.nextUID();
        let intervalId = setInterval(() => {
            callback.call(this);
        }, delay);
        let clearInterval_ = () => {
            if (this._disposables[id]) {
                clearInterval(intervalId);
                delete this._disposables[id];
            }
        };
        let interval = (this._disposables[id] = {
            clear: clearInterval_,
            dispose: clearInterval_
        });
        return interval;
    }
    registerCallback(callback) {
        let id = next_uid_1.nextUID();
        let disposable = this;
        let cancelCallback = () => {
            delete this._disposables[id];
        };
        let registeredCallback = function registeredCallback() {
            if (disposable._disposables[id]) {
                delete disposable._disposables[id];
                return callback.apply(disposable, arguments);
            }
        };
        registeredCallback.cancel = cancelCallback;
        registeredCallback.dispose = cancelCallback;
        this._disposables[id] = registeredCallback;
        return registeredCallback;
    }
    dispose() {
        let disposables = this._disposables;
        for (let id in disposables) {
            disposables[id].dispose();
        }
        return this;
    }
}
exports.DisposableMixin = DisposableMixin;


/***/ }),
/* 13 */
/***/ (function(module, exports) {

module.exports = __WEBPACK_EXTERNAL_MODULE__13__;

/***/ }),
/* 14 */
/***/ (function(module, exports) {

module.exports = __WEBPACK_EXTERNAL_MODULE__14__;

/***/ }),
/* 15 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const gettext_1 = __webpack_require__(16);
exports.formatters = {
    or(value, arg) {
        return value || arg;
    },
    default(value, arg) {
        return value === undefined ? arg : value;
    },
    not(value) {
        return !value;
    },
    notnot(value) {
        return !!value;
    },
    eq(value, arg) {
        return value == arg;
    },
    identical(value, arg) {
        return value === arg;
    },
    lt(value, arg) {
        return value < arg;
    },
    lte(value, arg) {
        return value <= arg;
    },
    gt(value, arg) {
        return value > arg;
    },
    gte(value, arg) {
        return value >= arg;
    },
    has(obj, key) {
        return !!obj && (typeof obj.has == 'function' ? obj.has(key) : obj.hasOwnProperty(key));
    },
    get(obj, key) {
        return obj && (typeof obj.get == 'function' ? obj.get(key) : obj[key]);
    },
    key(obj, key) {
        return obj && obj[key];
    },
    join(arr, separator = ', ') {
        return arr && arr.join(separator);
    },
    dump(value) {
        return value == null ? value : JSON.stringify(value);
    },
    t: gettext_1.getText.t,
    pt: gettext_1.getText.pt,
    nt(count, key, ...args) {
        args.unshift(count);
        return gettext_1.getText('', key, true, args);
    },
    npt(count, key, context, ...args) {
        args.unshift(count);
        return gettext_1.getText(context, key, true, args);
    }
};
exports.formatters.seq = exports.formatters.identical;


/***/ }),
/* 16 */
/***/ (function(module, exports) {

module.exports = __WEBPACK_EXTERNAL_MODULE__16__;

/***/ }),
/* 17 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const registerComponent_1 = __webpack_require__(18);
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
/* 18 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const kebab_case_1 = __webpack_require__(19);
const mixin_1 = __webpack_require__(20);
const pascalize_1 = __webpack_require__(21);
const rionite_snake_case_attribute_name_1 = __webpack_require__(8);
const cellx_1 = __webpack_require__(14);
const BaseComponent_1 = __webpack_require__(23);
const componentConstructorMap_1 = __webpack_require__(42);
const ComponentParams_1 = __webpack_require__(29);
const elementConstructorMap_1 = __webpack_require__(43);
const ElementProtoMixin_1 = __webpack_require__(44);
const Features_1 = __webpack_require__(46);
const Template_1 = __webpack_require__(6);
const push = Array.prototype.push;
function inheritProperty(target, source, name, depth) {
    let obj = target[name];
    let parentObj = source[name];
    if (obj && parentObj && obj != parentObj) {
        let o = (target[name] = { __proto__: parentObj });
        for (let key in obj) {
            o[key] = obj[key];
            if (depth) {
                inheritProperty(o, parentObj, key, depth - 1);
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
    if (componentConstructorMap_1.componentConstructorMap.has(kebabCaseElIs)) {
        throw new TypeError(`Component "${kebabCaseElIs}" already registered`);
    }
    let componentProto = componentConstr.prototype;
    let parentComponentConstr = Object.getPrototypeOf(componentProto)
        .constructor;
    inheritProperty(componentConstr, parentComponentConstr, 'params', 0);
    let paramsConfig = componentConstr.params;
    if (paramsConfig) {
        for (let name in paramsConfig) {
            let paramConfig = paramsConfig[name];
            if (paramConfig === null) {
                let parentParamConfig = parentComponentConstr.params && parentComponentConstr.params[name];
                if (parentParamConfig != null) {
                    Object.defineProperty(componentProto, (typeof parentParamConfig == 'object' &&
                        (parentParamConfig.type !== undefined ||
                            parentParamConfig.default !== undefined) &&
                        parentParamConfig.property) ||
                        name, {
                        configurable: true,
                        enumerable: true,
                        writable: true,
                        value: null
                    });
                }
            }
            else {
                let snakeCaseName = rionite_snake_case_attribute_name_1.snakeCaseAttributeName(name, true);
                let isObject = typeof paramConfig == 'object' &&
                    (paramConfig.type !== undefined || paramConfig.default !== undefined);
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
                let $paramConfig = ((componentConstr.hasOwnProperty(BaseComponent_1.KEY_PARAMS_CONFIG)
                    ? componentConstr[BaseComponent_1.KEY_PARAMS_CONFIG]
                    : (componentConstr[BaseComponent_1.KEY_PARAMS_CONFIG] = Object.create(null)))[name] = componentConstr[BaseComponent_1.KEY_PARAMS_CONFIG][snakeCaseName] = {
                    name,
                    property: propertyName,
                    type: undefined,
                    typeSerializer: undefined,
                    default: undefined,
                    required,
                    readonly,
                    paramConfig: paramsConfig[name]
                });
                let descriptor;
                if (readonly) {
                    descriptor = {
                        configurable: true,
                        enumerable: true,
                        get() {
                            return this[BaseComponent_1.KEY_PARAMS].get(name);
                        },
                        set(value) {
                            if (this[ComponentParams_1.KEY_COMPONENT_PARAMS_INITED]) {
                                if (value !== this[BaseComponent_1.KEY_PARAMS].get(name)) {
                                    throw new TypeError(`Parameter "${name}" is readonly`);
                                }
                            }
                            else {
                                this[BaseComponent_1.KEY_PARAMS].set(name, value);
                            }
                        }
                    };
                }
                else {
                    Object.defineProperty(componentProto, propertyName + 'Cell', {
                        configurable: true,
                        enumerable: false,
                        writable: true,
                        value: undefined
                    });
                    descriptor = {
                        configurable: true,
                        enumerable: true,
                        get() {
                            let valueCell = this[propertyName + 'Cell'];
                            if (valueCell) {
                                return valueCell.get();
                            }
                            let currentlyPulling = cellx_1.Cell.currentlyPulling;
                            let value = this[BaseComponent_1.KEY_PARAMS].get(name);
                            if (currentlyPulling || cellx_1.EventEmitter.currentlySubscribing) {
                                valueCell = new cellx_1.Cell(value, { context: this });
                                Object.defineProperty(this, propertyName + 'Cell', {
                                    configurable: true,
                                    enumerable: false,
                                    writable: true,
                                    value: valueCell
                                });
                                if (currentlyPulling) {
                                    return valueCell.get();
                                }
                            }
                            return value;
                        },
                        set(value) {
                            if (this[ComponentParams_1.KEY_COMPONENT_PARAMS_INITED]) {
                                let rawValue = $paramConfig.typeSerializer.write(value, $paramConfig.default);
                                if (rawValue === null) {
                                    this.element.removeAttribute(snakeCaseName);
                                }
                                else {
                                    this.element.setAttribute(snakeCaseName, rawValue);
                                }
                                let valueCell = this[propertyName + 'Cell'];
                                if (valueCell) {
                                    valueCell.set(value);
                                }
                                else {
                                    this[BaseComponent_1.KEY_PARAMS].set(name, value);
                                }
                            }
                            else {
                                this[BaseComponent_1.KEY_PARAMS].set(name, value);
                            }
                        }
                    };
                }
                Object.defineProperty(componentProto, propertyName, descriptor);
            }
        }
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
    componentConstr._rawContent = undefined;
    inheritProperty(componentConstr, parentComponentConstr, 'events', 1);
    inheritProperty(componentConstr, parentComponentConstr, 'domEvents', 1);
    if (template !== null) {
        let events = componentConstr.events;
        let domEvents = componentConstr.domEvents;
        if (events || domEvents) {
            componentConstr.template.onBeforeNamedElementOpeningTagClosing = elNames => {
                let attrs = '';
                for (let name of elNames) {
                    if (events && events[name]) {
                        for (let type in events[name]) {
                            attrs += ` oncomponent-${type.charAt(0) == '<' ? type.slice(type.indexOf('>', 2) + 1) : type}=":${name}"`;
                        }
                    }
                    if (domEvents && domEvents[name]) {
                        for (let type in domEvents[name]) {
                            attrs += ` on-${type}=":${name}"`;
                        }
                    }
                }
                return attrs;
            };
        }
    }
    let elExtends = componentConstr.elementExtends;
    let parentElConstr;
    if (elExtends) {
        parentElConstr =
            elementConstructorMap_1.elementConstructorMap.get(elExtends) || window[`HTML${pascalize_1.pascalize(elExtends)}Element`];
        if (!parentElConstr) {
            throw new TypeError(`Component "${elExtends}" is not registered`);
        }
    }
    else {
        parentElConstr = HTMLElement;
    }
    let elConstr = Features_1.reflectConstruct
        ? function _(self) {
            return Reflect.construct(parentElConstr, [self], _);
        }
        : function (self) {
            return parentElConstr.call(this, self);
        };
    elConstr._rioniteComponentConstructor = componentConstr;
    Object.defineProperty(elConstr, 'observedAttributes', {
        configurable: true,
        enumerable: true,
        get() {
            let paramsConfig = componentConstr.params;
            if (!paramsConfig) {
                return [];
            }
            let attrs = [];
            for (let name in paramsConfig) {
                attrs.push(rionite_snake_case_attribute_name_1.snakeCaseAttributeName(name, true));
            }
            return attrs;
        }
    });
    let elProto = (elConstr.prototype = Object.create(parentElConstr.prototype));
    elProto.constructor = elConstr;
    mixin_1.mixin(elProto, ElementProtoMixin_1.ElementProtoMixin);
    window.customElements.define(kebabCaseElIs, elConstr, elExtends ? { extends: elExtends } : undefined);
    componentConstructorMap_1.componentConstructorMap.set(elIs, componentConstr).set(kebabCaseElIs, componentConstr);
    elementConstructorMap_1.elementConstructorMap.set(elIs, elConstr);
    return componentConstr;
}
exports.registerComponent = registerComponent;


/***/ }),
/* 19 */
/***/ (function(module, exports) {

module.exports = __WEBPACK_EXTERNAL_MODULE__19__;

/***/ }),
/* 20 */
/***/ (function(module, exports) {

module.exports = __WEBPACK_EXTERNAL_MODULE__20__;

/***/ }),
/* 21 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var camelize_1 = __webpack_require__(22);
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
/* 22 */
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
/* 23 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
const di_1 = __webpack_require__(1);
const get_uid_1 = __webpack_require__(24);
const kebab_case_1 = __webpack_require__(19);
const logger_1 = __webpack_require__(2);
const map_set_polyfill_1 = __webpack_require__(10);
const move_content_1 = __webpack_require__(25);
const symbol_polyfill_1 = __webpack_require__(26);
const cellx_1 = __webpack_require__(14);
const html_to_fragment_1 = __webpack_require__(27);
const attachChildComponentElements_1 = __webpack_require__(28);
const bindContent_1 = __webpack_require__(32);
const componentBinding_1 = __webpack_require__(41);
const componentConstructorMap_1 = __webpack_require__(42);
const DisposableMixin_1 = __webpack_require__(12);
const elementConstructorMap_1 = __webpack_require__(43);
const ElementProtoMixin_1 = __webpack_require__(44);
const handledEvents_1 = __webpack_require__(47);
const handleDOMEvent_1 = __webpack_require__(48);
const handleEvent_1 = __webpack_require__(49);
const Features_1 = __webpack_require__(46);
const map = Array.prototype.map;
exports.KEY_PARAMS_CONFIG = symbol_polyfill_1.Symbol('Rionite/BaseComponent[paramsConfig]');
exports.KEY_PARAMS = symbol_polyfill_1.Symbol('Rionite/BaseComponent[params]');
class BaseComponent extends cellx_1.EventEmitter {
    constructor(el) {
        super();
        this._parentComponent = null;
        this.$inputContent = null;
        this._attached = false;
        this.initialized = false;
        this.isReady = false;
        DisposableMixin_1.DisposableMixin.call(this);
        let constr = this.constructor;
        if (!elementConstructorMap_1.elementConstructorMap.has(constr.elementIs)) {
            throw new TypeError('Component must be registered');
        }
        if (!el) {
            el = document.createElement(kebab_case_1.kebabCase(constr.elementIs, true));
        }
        this.element = el;
        el.$component = this;
        this[exports.KEY_PARAMS] = new map_set_polyfill_1.Map();
        this.created();
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
        return DisposableMixin_1.DisposableMixin.prototype.listenTo.call(this, typeof target == 'string' ? this.$(target) : target, type, listener, context, useCapture);
    }
    _listenTo(target, type, listener, context, useCapture) {
        if (target instanceof BaseComponent) {
            if (type.charAt(0) == '<') {
                let index = type.indexOf('>', 2);
                let targetType = type.slice(1, index);
                if (targetType != '*') {
                    let targetConstr = elementConstructorMap_1.elementConstructorMap.has(targetType) &&
                        componentConstructorMap_1.componentConstructorMap.get(targetType);
                    if (!targetConstr) {
                        throw new TypeError(`Component "${targetType}" is not defined`);
                    }
                    let inner = listener;
                    listener = function (evt) {
                        if (evt.target instanceof targetConstr) {
                            return inner.call(this, evt);
                        }
                    };
                }
                type = type.slice(index + 1);
            }
            else if (type.indexOf(':') == -1) {
                let inner = listener;
                listener = function (evt) {
                    if (evt.target == target) {
                        return inner.call(this, evt);
                    }
                };
            }
        }
        return DisposableMixin_1.DisposableMixin.prototype._listenTo.call(this, target, type, listener, context, useCapture);
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
        }
        else {
            let el = this.element;
            el.className = constr._blockNamesString + el.className;
            if (constr.template === null) {
                if (this.ownerComponent == this) {
                    let contentBindingResult = [null, null, null];
                    bindContent_1.bindContent(el, -1, this, this, contentBindingResult);
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
                    if (this[bindContent_1.KEY_CHILD_COMPONENTS]) {
                        attachChildComponentElements_1.attachChildComponentElements(this[bindContent_1.KEY_CHILD_COMPONENTS]);
                    }
                }
            }
            else {
                if (el.firstChild) {
                    ElementProtoMixin_1.suppressConnectionStatusCallbacks();
                    move_content_1.moveContent(this.$inputContent ||
                        (this.$inputContent = document.createDocumentFragment()), el);
                    ElementProtoMixin_1.resumeConnectionStatusCallbacks();
                }
                let rawContent = constr._rawContent ||
                    (constr._rawContent = bindContent_1.prepareContent(html_to_fragment_1.htmlToFragment(constr.template.render())));
                let content = rawContent.cloneNode(true);
                if (!Features_1.templateTag) {
                    let templates = content.querySelectorAll('template');
                    for (let i = 0, l = templates.length; i < l;) {
                        i += templates[i].content.querySelectorAll('template').length + 1;
                    }
                }
                let contentBindingResult = [null, null, null];
                bindContent_1.bindComponentContent(this, content, this, this, contentBindingResult);
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
        return DisposableMixin_1.DisposableMixin.prototype.dispose.call(this);
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
    created() { }
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
        let elListMap = this._elementListMap || (this._elementListMap = new map_set_polyfill_1.Map());
        let containerEl;
        if (container) {
            if (typeof container == 'string') {
                container = this.$(container);
            }
            containerEl = container instanceof BaseComponent ? container.element : container;
        }
        else {
            containerEl = this.element;
        }
        let key = container ? get_uid_1.getUID(containerEl) + '/' + name : name;
        let elList = elListMap.get(key);
        if (!elList) {
            let elementBlockNames = this.constructor._elementBlockNames;
            elList = containerEl.getElementsByClassName(elementBlockNames[elementBlockNames.length - 1] + '__' + name);
            elListMap.set(key, elList);
        }
        return elList;
    }
}
BaseComponent.elementExtends = null;
BaseComponent.params = null;
BaseComponent.i18n = null;
BaseComponent.template = null;
BaseComponent.events = null;
BaseComponent.domEvents = null;
__decorate([
    di_1.Inject('logger'),
    __metadata("design:type", logger_1.Logger)
], BaseComponent.prototype, "logger", void 0);
exports.BaseComponent = BaseComponent;
let disposableMixinProto = DisposableMixin_1.DisposableMixin.prototype;
let baseComponentProto = BaseComponent.prototype;
Object.getOwnPropertyNames(disposableMixinProto).forEach(name => {
    if (!(name in baseComponentProto)) {
        Object.defineProperty(baseComponentProto, name, Object.getOwnPropertyDescriptor(disposableMixinProto, name));
    }
});
document.addEventListener('DOMContentLoaded', function onDOMContentLoaded() {
    document.removeEventListener('DOMContentLoaded', onDOMContentLoaded);
    handledEvents_1.handledEvents.forEach(type => {
        document.body.addEventListener(type, evt => {
            if (evt.target != document.body) {
                handleDOMEvent_1.handleDOMEvent(evt);
            }
        });
    });
});


/***/ }),
/* 24 */
/***/ (function(module, exports) {

module.exports = __WEBPACK_EXTERNAL_MODULE__24__;

/***/ }),
/* 25 */
/***/ (function(module, exports) {

module.exports = __WEBPACK_EXTERNAL_MODULE__25__;

/***/ }),
/* 26 */
/***/ (function(module, exports) {

module.exports = __WEBPACK_EXTERNAL_MODULE__26__;

/***/ }),
/* 27 */
/***/ (function(module, exports) {

module.exports = __WEBPACK_EXTERNAL_MODULE__27__;

/***/ }),
/* 28 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const ComponentParams_1 = __webpack_require__(29);
// import { KEY_ELEMENT_CONNECTED } from './ElementProtoMixin';
function attachChildComponentElements(childComponents) {
    for (let childComponent of childComponents) {
        // if (childComponent.element[KEY_ELEMENT_CONNECTED]) {
        childComponent._parentComponent = undefined;
        ComponentParams_1.ComponentParams.init(childComponent);
        childComponent.elementConnected();
        childComponent._attach();
        // }
    }
}
exports.attachChildComponentElements = attachChildComponentElements;


/***/ }),
/* 29 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const rionite_snake_case_attribute_name_1 = __webpack_require__(8);
const symbol_polyfill_1 = __webpack_require__(26);
const BaseComponent_1 = __webpack_require__(23);
const componentParamTypeSerializerMap_1 = __webpack_require__(30);
exports.KEY_COMPONENT_PARAMS_INITED = symbol_polyfill_1.Symbol('Rionite/ComponentParams[componentParamsInited]');
function initParam(component, $paramConfig, name) {
    if ($paramConfig === null) {
        return;
    }
    let typeSerializer = $paramConfig.typeSerializer;
    let defaultValue;
    if (typeSerializer) {
        defaultValue = $paramConfig.default;
    }
    else {
        let paramConfig = $paramConfig.paramConfig;
        let type = typeof paramConfig;
        defaultValue = component[$paramConfig.property];
        let isObject = type == 'object' &&
            (paramConfig.type !== undefined ||
                paramConfig.default !== undefined);
        if (defaultValue === undefined) {
            if (isObject) {
                defaultValue = paramConfig.default;
            }
            else if (type != 'function') {
                defaultValue = paramConfig;
            }
        }
        type = isObject ? paramConfig.type : paramConfig;
        if (defaultValue !== undefined && type !== eval) {
            type = typeof defaultValue;
        }
        typeSerializer = componentParamTypeSerializerMap_1.componentParamTypeSerializerMap.get(type);
        if (!typeSerializer) {
            throw new TypeError('Unsupported parameter type');
        }
        $paramConfig.type = type;
        $paramConfig.typeSerializer = typeSerializer;
        $paramConfig.default = defaultValue;
    }
    let el = component.element;
    let snakeCaseName = rionite_snake_case_attribute_name_1.snakeCaseAttributeName(name, true);
    let rawValue = el.getAttribute(snakeCaseName);
    if (rawValue === null) {
        if ($paramConfig.required) {
            throw new TypeError(`Parameter "${name}" is required`);
        }
        if (defaultValue != null && defaultValue !== false) {
            el.setAttribute(snakeCaseName, typeSerializer.write(defaultValue));
        }
    }
    component[BaseComponent_1.KEY_PARAMS].set(name, typeSerializer.read(rawValue, defaultValue, el));
}
exports.ComponentParams = {
    init(component) {
        if (component[exports.KEY_COMPONENT_PARAMS_INITED]) {
            return;
        }
        let paramsConfig = component.constructor.params;
        if (paramsConfig) {
            let $paramsConfig = component.constructor[BaseComponent_1.KEY_PARAMS_CONFIG];
            for (let name in paramsConfig) {
                initParam(component, $paramsConfig[name], name);
            }
        }
        component[exports.KEY_COMPONENT_PARAMS_INITED] = true;
    }
};


/***/ }),
/* 30 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const escape_html_1 = __webpack_require__(7);
const is_regexp_1 = __webpack_require__(31);
const map_set_polyfill_1 = __webpack_require__(10);
const symbol_polyfill_1 = __webpack_require__(26);
exports.KEY_COMPONENT_PARAM_VALUE_MAP = symbol_polyfill_1.Symbol('Rionite/componentParamTypeSerializerMap[componentParamValueMap]');
exports.componentParamTypeSerializerMap = new map_set_polyfill_1.Map([
    [
        Boolean,
        {
            read: (rawValue, defaultValue) => {
                return rawValue !== null ? rawValue != 'no' : !!defaultValue;
            },
            write: (value, defaultValue) => {
                return value ? '' : defaultValue ? 'no' : null;
            }
        }
    ],
    [
        Number,
        {
            read: (rawValue, defaultValue) => {
                return rawValue !== null
                    ? +rawValue
                    : defaultValue !== undefined
                        ? defaultValue
                        : null;
            },
            write: (value) => {
                return value != null ? +value + '' : null;
            }
        }
    ],
    [
        String,
        {
            read: (rawValue, defaultValue) => {
                return rawValue !== null
                    ? rawValue
                    : defaultValue !== undefined
                        ? defaultValue
                        : null;
            },
            write: (value) => {
                return value != null ? value + '' : null;
            }
        }
    ],
    [
        Object,
        {
            read: (rawValue, defaultValue, el) => {
                if (!rawValue) {
                    return defaultValue || null;
                }
                let value = (el[exports.KEY_COMPONENT_PARAM_VALUE_MAP] || Object.create(null))[rawValue];
                if (!value) {
                    throw new TypeError('Value is not an object');
                }
                return value;
            },
            write: (value) => {
                return value != null ? '' : null;
            }
        }
    ],
    [
        eval,
        {
            read: (rawValue, defaultValue) => {
                return rawValue !== null
                    ? Function(`return ${escape_html_1.unescapeHTML(rawValue)};`)()
                    : defaultValue !== undefined
                        ? defaultValue
                        : null;
            },
            write: (value) => {
                return value != null
                    ? escape_html_1.escapeHTML(is_regexp_1.isRegExp(value) ? value.toString() : JSON.stringify(value))
                    : null;
            }
        }
    ]
]);
exports.componentParamTypeSerializerMap.set('boolean', exports.componentParamTypeSerializerMap.get(Boolean));
exports.componentParamTypeSerializerMap.set('number', exports.componentParamTypeSerializerMap.get(Number));
exports.componentParamTypeSerializerMap.set('string', exports.componentParamTypeSerializerMap.get(String));
exports.componentParamTypeSerializerMap.set('object', exports.componentParamTypeSerializerMap.get(Object));


/***/ }),
/* 31 */
/***/ (function(module, exports) {

module.exports = __WEBPACK_EXTERNAL_MODULE__31__;

/***/ }),
/* 32 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const map_set_polyfill_1 = __webpack_require__(10);
const next_uid_1 = __webpack_require__(13);
const set_attribute_1 = __webpack_require__(33);
const cellx_1 = __webpack_require__(14);
const BaseComponent_1 = __webpack_require__(23);
const compileContentNodeValue_1 = __webpack_require__(34);
const ContentNodeValueParser_1 = __webpack_require__(36);
const compileKeypath_1 = __webpack_require__(40);
exports.KEY_NODE_BINDING_SCHEMA = Symbol('Rionite/bindContent[nodeBindingSchema]');
exports.KEY_NODE_BINDING_SCHEMAS = Symbol('Rionite/bindContent[nodeBindingSchemas]');
exports.KEY_CHILD_COMPONENTS = Symbol('Rionite/bindContent[childComponents]');
exports.KEY_CONTEXT = Symbol('Rionite/bindContent[context]');
const contentNodeValueASTCache = Object.create(null);
function onAttributeBindingCellChange(evt) {
    set_attribute_1.setAttribute(evt.target.meta.element, evt.target.meta.attributeName, evt.data.value);
}
function onTextNodeBindingCellChange(evt) {
    evt.target.meta.textNode.nodeValue = evt.data.value;
}
function prepareContent(node) {
    for (let child = node.firstChild; child;) {
        switch (child.nodeType) {
            case Node.ELEMENT_NODE: {
                if (child instanceof HTMLTemplateElement) {
                    child.setAttribute('pid', next_uid_1.nextUID());
                    if (!child.firstChild) {
                        prepareContent(child.content);
                        child = child.nextSibling;
                        continue;
                    }
                }
                prepareContent(child);
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
exports.prepareContent = prepareContent;
function bindComponentContent(component, node, ownerComponent, context, result) {
    let schema = component.constructor.template[exports.KEY_NODE_BINDING_SCHEMA];
    if (schema === undefined) {
        component.constructor.template[exports.KEY_NODE_BINDING_SCHEMA] = bindContent(node, -1, ownerComponent, context, result);
    }
    else if (schema) {
        bindContentBySchema(node, schema, ownerComponent, context, result);
    }
    return result;
}
exports.bindComponentContent = bindComponentContent;
function bindComponentContent2(ownerComponentTemplate, pid, node, ownerComponent, context, result) {
    if (pid) {
        let schema = (ownerComponentTemplate[exports.KEY_NODE_BINDING_SCHEMAS] ||
            (ownerComponentTemplate[exports.KEY_NODE_BINDING_SCHEMAS] = {}))[pid];
        if (schema === undefined) {
            ownerComponentTemplate[exports.KEY_NODE_BINDING_SCHEMAS][pid] = bindContent(node, -1, ownerComponent, context, result);
        }
        else if (schema) {
            bindContentBySchema(node, schema, ownerComponent, context, result);
        }
    }
    else {
        bindContent(node, -1, ownerComponent, context, result);
    }
    return result;
}
exports.bindComponentContent2 = bindComponentContent2;
function bindContent(node, index, ownerComponent, context, result, schema, parentComponent) {
    let children = node.childNodes;
    for (let i = 0, l = children.length; i < l; i++) {
        let child = children[i];
        let childSchema;
        switch (child.nodeType) {
            case Node.ELEMENT_NODE: {
                let childComponent = child.rioniteComponent;
                let $paramsConfig;
                let $specifiedParams;
                if (childComponent) {
                    $paramsConfig = childComponent.constructor[BaseComponent_1.KEY_PARAMS_CONFIG];
                    $specifiedParams = new map_set_polyfill_1.Set();
                }
                let attrs = child.attributes;
                for (let j = attrs.length; j;) {
                    let attr = attrs[--j];
                    let name = attr.name;
                    let targetName;
                    if (name.charAt(0) == '_') {
                        targetName = name.slice(1);
                    }
                    else {
                        targetName = name;
                        if (!name.lastIndexOf('oncomponent-', 0) || !name.lastIndexOf('on-', 0)) {
                            child[exports.KEY_CONTEXT] = context;
                            if (!((schema ||
                                (schema = {
                                    index,
                                    specifiedParams: null,
                                    childComponents: null,
                                    attributes: null,
                                    textChildren: null,
                                    context: [],
                                    childSchemas: null
                                })).context || (schema.context = [])).length ||
                                schema.context[schema.context.length - 1] != i) {
                                schema.context.push(i);
                            }
                        }
                    }
                    let $paramConfig = $paramsConfig && $paramsConfig[targetName];
                    if ($paramConfig) {
                        $specifiedParams.add($paramConfig.name);
                    }
                    let value = attr.value;
                    if (!value) {
                        continue;
                    }
                    let valueAST = contentNodeValueASTCache[value];
                    if (!valueAST) {
                        if (valueAST === null) {
                            continue;
                        }
                        let bracketIndex = value.indexOf('{');
                        if (bracketIndex == -1) {
                            contentNodeValueASTCache[value] = null;
                            continue;
                        }
                        valueAST = contentNodeValueASTCache[value] = new ContentNodeValueParser_1.ContentNodeValueParser(value).parse(bracketIndex);
                    }
                    let valueASTLength = valueAST.length;
                    if (valueASTLength > 1 ||
                        valueAST[0].nodeType == ContentNodeValueParser_1.ContentNodeValueNodeType.BINDING) {
                        bindAttribute(child, name, targetName, value, valueAST, $paramConfig, context, result);
                        if (!((childSchema ||
                            (childSchema = {
                                index: i,
                                specifiedParams: null,
                                childComponents: null,
                                attributes: [],
                                textChildren: null,
                                context: null,
                                childSchemas: null
                            })).attributes || (childSchema.attributes = [])).length ||
                            childSchema.attributes[childSchema.attributes.length - 1] != name) {
                            childSchema.attributes.push(name);
                        }
                    }
                }
                if (childComponent) {
                    childComponent._ownerComponent = ownerComponent;
                    childComponent.$context = context;
                    childComponent.$specifiedParams = $specifiedParams;
                    if (childSchema) {
                        childSchema.specifiedParams = $specifiedParams;
                    }
                    else {
                        childSchema = {
                            index: i,
                            specifiedParams: $specifiedParams,
                            childComponents: null,
                            attributes: null,
                            textChildren: null,
                            context: null,
                            childSchemas: null
                        };
                    }
                    if (parentComponent) {
                        (parentComponent[exports.KEY_CHILD_COMPONENTS] ||
                            (parentComponent[exports.KEY_CHILD_COMPONENTS] = [])).push(childComponent);
                    }
                    else {
                        (result[0] || (result[0] = [])).push(childComponent);
                    }
                    ((schema ||
                        (schema = {
                            index,
                            specifiedParams: null,
                            childComponents: [],
                            attributes: null,
                            textChildren: null,
                            context: null,
                            childSchemas: null
                        })).childComponents || (schema.childComponents = [])).push(i);
                }
                if (child.firstChild &&
                    (!childComponent ||
                        !childComponent.constructor.bindsInputContent)) {
                    childSchema = bindContent(child, i, ownerComponent, context, result, childSchema, childComponent);
                }
                break;
            }
            case Node.TEXT_NODE: {
                let nextChild = child.nextSibling;
                if (nextChild && nextChild.nodeType == Node.TEXT_NODE) {
                    do {
                        child.nodeValue += nextChild.nodeValue;
                        node.removeChild(nextChild);
                        nextChild = child.nextSibling;
                        l--;
                    } while (nextChild && nextChild.nodeType == Node.TEXT_NODE);
                }
                let value = child.nodeValue;
                let valueAST = contentNodeValueASTCache[value];
                if (!valueAST) {
                    if (valueAST === null) {
                        continue;
                    }
                    let bracketIndex = value.indexOf('{');
                    if (bracketIndex == -1) {
                        contentNodeValueASTCache[value] = null;
                        continue;
                    }
                    valueAST = contentNodeValueASTCache[value] = new ContentNodeValueParser_1.ContentNodeValueParser(value).parse(bracketIndex);
                }
                if (valueAST.length > 1 ||
                    valueAST[0].nodeType == ContentNodeValueParser_1.ContentNodeValueNodeType.BINDING) {
                    bindTextNode(child, valueAST, context, result);
                    ((schema ||
                        (schema = {
                            index,
                            specifiedParams: null,
                            childComponents: null,
                            attributes: null,
                            textChildren: [],
                            context: null,
                            childSchemas: null
                        })).textChildren || (schema.textChildren = [])).push(i);
                }
                break;
            }
        }
        if (childSchema) {
            ((schema ||
                (schema = {
                    index,
                    specifiedParams: null,
                    childComponents: null,
                    attributes: null,
                    textChildren: null,
                    context: null,
                    childSchemas: []
                })).childSchemas || (schema.childSchemas = [])).push(childSchema);
        }
    }
    return schema || null;
}
exports.bindContent = bindContent;
function bindContentBySchema(node, schema, ownerComponent, context, result, parentComponent) {
    let children = node.childNodes;
    if (schema.specifiedParams) {
        node.$component.$specifiedParams = schema.specifiedParams;
    }
    if (schema.childComponents) {
        for (let index of schema.childComponents) {
            let childComponent = children[index].rioniteComponent;
            childComponent._ownerComponent = ownerComponent;
            childComponent.$context = context;
            if (parentComponent) {
                (parentComponent[exports.KEY_CHILD_COMPONENTS] ||
                    (parentComponent[exports.KEY_CHILD_COMPONENTS] = [])).push(childComponent);
            }
            else {
                (result[0] || (result[0] = [])).push(childComponent);
            }
        }
    }
    if (schema.attributes) {
        let $paramsConfig;
        if (node.$component) {
            $paramsConfig = node.$component.constructor[BaseComponent_1.KEY_PARAMS_CONFIG];
        }
        for (let name of schema.attributes) {
            let targetName = name.charAt(0) == '_' ? name.slice(1) : name;
            let value = node.getAttribute(name);
            bindAttribute(node, name, targetName, value, contentNodeValueASTCache[value], $paramsConfig && $paramsConfig[targetName], context, result);
        }
    }
    if (schema.textChildren) {
        for (let index of schema.textChildren) {
            bindTextNode(children[index], contentNodeValueASTCache[children[index].nodeValue], context, result);
        }
    }
    if (schema.context) {
        for (let index of schema.context) {
            children[index][exports.KEY_CONTEXT] = context;
        }
    }
    if (schema.childSchemas) {
        for (let childSchema of schema.childSchemas) {
            let child = children[childSchema.index];
            bindContentBySchema(child, childSchema, ownerComponent, context, result, child.$component);
        }
    }
}
function bindAttribute(el, name, targetName, value, valueAST, $paramConfig, context, result) {
    let prefix = valueAST.length == 1 ? valueAST[0].prefix : null;
    if (prefix === '=') {
        set_attribute_1.setAttribute(el, targetName, compileContentNodeValue_1.compileContentNodeValue(valueAST, value, true).call(context));
        return;
    }
    if (prefix !== '->') {
        let cell = new cellx_1.Cell(compileContentNodeValue_1.compileContentNodeValue(valueAST, value, valueAST.length == 1), {
            context,
            meta: {
                element: el,
                attributeName: targetName
            },
            onChange: onAttributeBindingCellChange
        });
        set_attribute_1.setAttribute(el, targetName, cell.get());
        (result[1] || (result[1] = [])).push(cell);
    }
    let paramConfig;
    if ($paramConfig) {
        paramConfig = $paramConfig.paramConfig;
    }
    if (paramConfig !== undefined && (prefix === '->' || prefix === '<->')) {
        if (prefix == '->' && name.charAt(0) != '_') {
            el.removeAttribute(name);
        }
        let keypath = valueAST[0].keypath;
        let keys = keypath.split('.');
        let handler;
        if (keys.length == 1) {
            let propertyName = keys[0];
            handler = function (evt) {
                this.ownerComponent[propertyName] = evt.data.value;
            };
        }
        else {
            let propertyName = keys[keys.length - 1];
            let getPropertyHolder = compileKeypath_1.compileKeypath((keys = keys.slice(0, -1)), keys.join('.'));
            handler = function (evt) {
                let propertyHolder = getPropertyHolder.call(this.ownerComponent);
                if (propertyHolder) {
                    propertyHolder[propertyName] = evt.data.value;
                }
            };
        }
        (result[2] || (result[2] = [])).push(el.$component, (typeof paramConfig == 'object' &&
            (paramConfig.type !== undefined || paramConfig.default !== undefined) &&
            paramConfig.property) ||
            $paramConfig.name, handler);
    }
}
function bindTextNode(textNode, valueAST, context, result) {
    if (valueAST.length == 1 && valueAST[0].prefix === '=') {
        textNode.nodeValue = compileContentNodeValue_1.compileContentNodeValue(valueAST, textNode.nodeValue, false).call(context);
    }
    else {
        let cell = new cellx_1.Cell(compileContentNodeValue_1.compileContentNodeValue(valueAST, textNode.nodeValue, false), {
            context,
            meta: { textNode },
            onChange: onTextNodeBindingCellChange
        });
        textNode.nodeValue = cell.get();
        (result[1] || (result[1] = [])).push(cell);
    }
}


/***/ }),
/* 33 */
/***/ (function(module, exports) {

module.exports = __WEBPACK_EXTERNAL_MODULE__33__;

/***/ }),
/* 34 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const escape_string_1 = __webpack_require__(11);
const bindingToJSExpression_1 = __webpack_require__(35);
const componentParamTypeSerializerMap_1 = __webpack_require__(30);
const ContentNodeValueParser_1 = __webpack_require__(36);
const formatters_1 = __webpack_require__(15);
const cache = Object.create(null);
function compileContentNodeValue(contentNodeValueAST, contentNodeValueString, useComponentParamValueMap) {
    let cacheKey = contentNodeValueString + (useComponentParamValueMap ? ',' : '.');
    if (cache[cacheKey]) {
        return cache[cacheKey];
    }
    let inner;
    if (contentNodeValueAST.length == 1) {
        inner = Function('formatters', `var temp; return ${bindingToJSExpression_1.bindingToJSExpression(contentNodeValueAST[0])};`);
    }
    else {
        let jsExpr = [];
        for (let node of contentNodeValueAST) {
            jsExpr.push(node.nodeType == ContentNodeValueParser_1.ContentNodeValueNodeType.TEXT
                ? `'${escape_string_1.escapeString(node.value)}'`
                : bindingToJSExpression_1.bindingToJSExpression(node));
        }
        inner = Function('formatters', `var temp; return [${jsExpr.join(', ')}].join('');`);
    }
    return (cache[cacheKey] = useComponentParamValueMap
        ? function (cell) {
            let value = inner.call(this, formatters_1.formatters);
            if (value) {
                let valueType = typeof value;
                if (valueType == 'object' || valueType == 'function') {
                    let meta = cell.meta;
                    (meta.element[componentParamTypeSerializerMap_1.KEY_COMPONENT_PARAM_VALUE_MAP] ||
                        (meta.element[componentParamTypeSerializerMap_1.KEY_COMPONENT_PARAM_VALUE_MAP] = Object.create(null)))[meta.attributeName] = value;
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
exports.compileContentNodeValue = compileContentNodeValue;


/***/ }),
/* 35 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
function formattersReducer(jsExpr, formatter) {
    let args = formatter.arguments;
    return `(this.${formatter.name} || formatters.${formatter.name}).call(this['$/'], ${jsExpr}${args && args.value.length ? ', ' + args.value.join(', ') : ''})`;
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
        let jsExprArr = Array(index);
        while (index) {
            jsExprArr[--index] = ` && (temp = temp['${keys[index + 1]}'])`;
        }
        let jsExpr = `(temp = this['${keys[0]}'])${jsExprArr.join('')} && temp['${keys[keyCount - 1]}']`;
        return formatters ? formatters.reduce(formattersReducer, jsExpr) : jsExpr;
    }
    return formatters ? formatters.reduce(formattersReducer, binding.value) : binding.value;
}
exports.bindingToJSExpression = bindingToJSExpression;


/***/ }),
/* 36 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const keypathPattern_1 = __webpack_require__(37);
const keypathToJSExpression_1 = __webpack_require__(39);
const namePattern_1 = __webpack_require__(38);
var ContentNodeValueNodeType;
(function (ContentNodeValueNodeType) {
    ContentNodeValueNodeType[ContentNodeValueNodeType["TEXT"] = 1] = "TEXT";
    ContentNodeValueNodeType[ContentNodeValueNodeType["BINDING"] = 2] = "BINDING";
    ContentNodeValueNodeType[ContentNodeValueNodeType["BINDING_KEYPATH"] = 3] = "BINDING_KEYPATH";
    ContentNodeValueNodeType[ContentNodeValueNodeType["BINDING_FORMATTER"] = 4] = "BINDING_FORMATTER";
    ContentNodeValueNodeType[ContentNodeValueNodeType["BINDING_FORMATTER_ARGUMENTS"] = 5] = "BINDING_FORMATTER_ARGUMENTS";
})(ContentNodeValueNodeType = exports.ContentNodeValueNodeType || (exports.ContentNodeValueNodeType = {}));
const reWhitespace = /\s/;
const reNameOrNothing = RegExp(namePattern_1.namePattern + '|', 'g');
const reKeypathOrNothing = RegExp(keypathPattern_1.keypathPattern + '|', 'g');
const reBooleanOrNothing = /false|true|/g;
const reNumberOrNothing = /(?:[+-]\s*)?(?:0b[01]+|0[0-7]+|0x[0-9a-fA-F]+|(?:(?:0|[1-9]\d*)(?:\.\d+)?|\.\d+)(?:[eE][+-]?\d+)?|Infinity|NaN)|/g;
const reVacuumOrNothing = /null|undefined|void 0|/g;
class ContentNodeValueParser {
    constructor(contentNodeValue) {
        this.contentNodeValue = contentNodeValue;
    }
    parse(index) {
        let contentNodeValue = this.contentNodeValue;
        this.at = 0;
        let result = (this.result = []);
        do {
            this._pushText(contentNodeValue.slice(this.at, index));
            this.at = index;
            this.chr = contentNodeValue.charAt(index);
            let binding = this._readBinding();
            if (binding) {
                result.push(binding);
            }
            else {
                this._pushText(this.chr);
                this._next('{');
            }
            index = contentNodeValue.indexOf('{', this.at);
        } while (index != -1);
        this._pushText(contentNodeValue.slice(this.at));
        return result;
    }
    _pushText(value) {
        if (value) {
            let result = this.result;
            let resultLen = result.length;
            if (resultLen && result[resultLen - 1].nodeType == ContentNodeValueNodeType.TEXT) {
                result[resultLen - 1].value += value;
            }
            else {
                result.push({
                    nodeType: ContentNodeValueNodeType.TEXT,
                    value
                });
            }
        }
    }
    _readBinding() {
        let at = this.at;
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
            if (this.chr == '}') {
                this._next();
                return {
                    nodeType: ContentNodeValueNodeType.BINDING,
                    prefix,
                    keypath,
                    value: value || null,
                    formatters: formatters || null,
                    raw: this.contentNodeValue.slice(at, this.at)
                };
            }
        }
        this.at = at;
        this.chr = this.contentNodeValue.charAt(at);
        return null;
    }
    _readPrefix() {
        let chr = this.chr;
        if (chr == '=') {
            this._next();
            return '=';
        }
        if (chr == '<') {
            let at = this.at;
            if (this.contentNodeValue.charAt(at + 1) == '-') {
                if (this.contentNodeValue.charAt(at + 2) == '>') {
                    this.chr = this.contentNodeValue.charAt((this.at = at + 3));
                    return '<->';
                }
                this.chr = this.contentNodeValue.charAt((this.at = at + 2));
                return '<-';
            }
        }
        else if (chr == '-' && this.contentNodeValue.charAt(this.at + 1) == '>') {
            this.chr = this.contentNodeValue.charAt((this.at += 2));
            return '->';
        }
        return null;
    }
    _readFormatter() {
        let at = this.at;
        this._next('|');
        this._skipWhitespaces();
        let name = this._readName();
        if (name) {
            let args = this.chr == '(' ? this._readFormatterArguments() : null;
            return {
                nodeType: ContentNodeValueNodeType.BINDING_FORMATTER,
                name,
                arguments: args
            };
        }
        this.at = at;
        this.chr = this.contentNodeValue.charAt(at);
        return null;
    }
    _readFormatterArguments() {
        let at = this.at;
        this._next('(');
        let args = [];
        if (this._skipWhitespaces() != ')') {
            for (;;) {
                let arg = this._readValue() || this._readKeypath(true);
                if (arg) {
                    if (this._skipWhitespaces() == ',' || this.chr == ')') {
                        args.push(arg);
                        if (this.chr == ',') {
                            this._next();
                            this._skipWhitespaces();
                            continue;
                        }
                        break;
                    }
                }
                this.at = at;
                this.chr = this.contentNodeValue.charAt(at);
                return null;
            }
        }
        this._next();
        return {
            nodeType: ContentNodeValueNodeType.BINDING_FORMATTER_ARGUMENTS,
            value: args
        };
    }
    _readValue() {
        switch (this.chr) {
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
        let at = this.at;
        this._next('{');
        let obj = '{';
        while (this._skipWhitespaces() != '}') {
            let key = this.chr == "'" || this.chr == '"' ? this._readString() : this._readObjectKey();
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
                    else if (this.chr == '}') {
                        obj += key + ':' + valueOrKeypath + '}';
                        break;
                    }
                }
            }
            this.at = at;
            this.chr = this.contentNodeValue.charAt(at);
            return null;
        }
        this._next();
        return obj;
    }
    _readObjectKey() {
        return this._readName();
    }
    _readArray() {
        let at = this.at;
        this._next('[');
        let arr = '[';
        while (this._skipWhitespaces() != ']') {
            if (this.chr == ',') {
                arr += ',';
                this._next();
            }
            else {
                let valueOrKeypath = this._readValue() || this._readKeypath(true);
                if (valueOrKeypath) {
                    arr += valueOrKeypath;
                }
                else {
                    this.at = at;
                    this.chr = this.contentNodeValue.charAt(at);
                    return null;
                }
            }
        }
        this._next();
        return arr + ']';
    }
    _readBoolean() {
        reBooleanOrNothing.lastIndex = this.at;
        let bool = reBooleanOrNothing.exec(this.contentNodeValue)[0];
        if (bool) {
            this.chr = this.contentNodeValue.charAt((this.at = reBooleanOrNothing.lastIndex));
            return bool;
        }
        return null;
    }
    _readNumber() {
        reNumberOrNothing.lastIndex = this.at;
        let num = reNumberOrNothing.exec(this.contentNodeValue)[0];
        if (num) {
            this.chr = this.contentNodeValue.charAt((this.at = reNumberOrNothing.lastIndex));
            return num;
        }
        return null;
    }
    _readString() {
        let quoteChar = this.chr;
        if (quoteChar != "'" && quoteChar != '"') {
            throw {
                name: 'SyntaxError',
                message: `Expected "'" instead of "${this.chr}"`,
                at: this.at,
                contentNodeValue: this.contentNodeValue
            };
        }
        let at = this.at;
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
                if (next == '\r' || next == '\n') {
                    break;
                }
                str += next;
            }
        }
        this.at = at;
        this.chr = this.contentNodeValue.charAt(at);
        return null;
    }
    _readVacuum() {
        reVacuumOrNothing.lastIndex = this.at;
        let vacuum = reVacuumOrNothing.exec(this.contentNodeValue)[0];
        if (vacuum) {
            this.chr = this.contentNodeValue.charAt((this.at = reVacuumOrNothing.lastIndex));
            return vacuum;
        }
        return null;
    }
    _readKeypath(toJSExpression) {
        reKeypathOrNothing.lastIndex = this.at;
        let keypath = reKeypathOrNothing.exec(this.contentNodeValue)[0];
        if (keypath) {
            this.chr = this.contentNodeValue.charAt((this.at = reKeypathOrNothing.lastIndex));
            return toJSExpression ? keypathToJSExpression_1.keypathToJSExpression(keypath) : keypath;
        }
        return null;
    }
    _readName() {
        reNameOrNothing.lastIndex = this.at;
        let name = reNameOrNothing.exec(this.contentNodeValue)[0];
        if (name) {
            this.chr = this.contentNodeValue.charAt((this.at = reNameOrNothing.lastIndex));
            return name;
        }
        return null;
    }
    _skipWhitespaces() {
        let chr = this.chr;
        while (chr && reWhitespace.test(chr)) {
            chr = this._next();
        }
        return chr;
    }
    _next(current) {
        if (current && current != this.chr) {
            throw {
                name: 'SyntaxError',
                message: `Expected "${current}" instead of "${this.chr}"`,
                at: this.at,
                contentNodeValue: this.contentNodeValue
            };
        }
        return (this.chr = this.contentNodeValue.charAt(++this.at));
    }
}
exports.ContentNodeValueParser = ContentNodeValueParser;


/***/ }),
/* 37 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const namePattern_1 = __webpack_require__(38);
exports.keypathPattern = `(?:${namePattern_1.namePattern}|\\d+)(?:\\.(?:${namePattern_1.namePattern}|\\d+))*`;


/***/ }),
/* 38 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
exports.namePattern = '[$_a-zA-Z][$\\w]*';


/***/ }),
/* 39 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const cache = Object.create(null);
function keypathToJSExpression(keypath, cacheKey = keypath) {
    if (cache[cacheKey]) {
        return cache[cacheKey];
    }
    let keys = typeof keypath == 'string' ? keypath.split('.') : keypath;
    let keyCount = keys.length;
    if (keyCount == 1) {
        return (cache[cacheKey] = `this['${keypath}']`);
    }
    let index = keyCount - 2;
    let jsExpr = Array(index);
    while (index) {
        jsExpr[--index] = ` && (temp = temp['${keys[index + 1]}'])`;
    }
    return (cache[cacheKey] = `(temp = this['${keys[0]}'])${jsExpr.join('')} && temp['${keys[keyCount - 1]}']`);
}
exports.keypathToJSExpression = keypathToJSExpression;


/***/ }),
/* 40 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const keypathToJSExpression_1 = __webpack_require__(39);
const cache = Object.create(null);
function compileKeypath(keypath, cacheKey = keypath) {
    return (cache[cacheKey] ||
        (cache[cacheKey] = Function(`var temp; return ${keypathToJSExpression_1.keypathToJSExpression(keypath, cacheKey)};`)));
}
exports.compileKeypath = compileKeypath;


/***/ }),
/* 41 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const cellx_1 = __webpack_require__(14);
function freezeBinding(binding) {
    let changeEvent = binding._events.get('change');
    binding._events.delete('change');
    binding._frozenState = {
        changeEventListener: changeEvent.listener,
        changeEventContext: changeEvent.context,
        value: binding._value
    };
}
function unfreezeBinding(binding) {
    let frozenState = binding._frozenState;
    binding._frozenState = null;
    binding.on('change', frozenState.changeEventListener, frozenState.changeEventContext);
    if (frozenState.value !== binding._value) {
        binding._changeEvent = {
            target: binding,
            type: 'change',
            data: {
                prevEvent: null,
                prevValue: frozenState.value,
                value: binding._value
            }
        };
        binding._canCancelChange = true;
        binding._addToRelease();
    }
}
function freezeBindings(bindings) {
    cellx_1.Cell.forceRelease();
    for (let binding of bindings) {
        freezeBinding(binding);
    }
}
exports.freezeBindings = freezeBindings;
function unfreezeBindings(bindings) {
    for (let binding of bindings) {
        unfreezeBinding(binding);
    }
    cellx_1.Cell.forceRelease();
}
exports.unfreezeBindings = unfreezeBindings;


/***/ }),
/* 42 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const map_set_polyfill_1 = __webpack_require__(10);
exports.componentConstructorMap = new map_set_polyfill_1.Map();


/***/ }),
/* 43 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const map_set_polyfill_1 = __webpack_require__(10);
exports.elementConstructorMap = new map_set_polyfill_1.Map([
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
    ['element', Element],
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
/* 44 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const defer_1 = __webpack_require__(45);
const di_1 = __webpack_require__(1);
const symbol_polyfill_1 = __webpack_require__(26);
const BaseComponent_1 = __webpack_require__(23);
const ComponentParams_1 = __webpack_require__(29);
const Features_1 = __webpack_require__(46);
exports.KEY_ELEMENT_CONNECTED = symbol_polyfill_1.Symbol('Rionite/ElementProtoMixin[elementConnected]');
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
    $component: null,
    get rioniteComponent() {
        return (this.$component || di_1.Container.get(this.constructor._rioniteComponentConstructor, [this]));
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
            let $paramConfig = component.constructor[BaseComponent_1.KEY_PARAMS_CONFIG][name];
            if ($paramConfig.readonly) {
                if (Features_1.nativeCustomElements) {
                    throw new TypeError(`Cannot write to readonly parameter "${$paramConfig.name}"`);
                }
            }
            else {
                let valueCell = component[$paramConfig.property + 'Cell'];
                let value = $paramConfig.typeSerializer.read(rawValue, $paramConfig.default, this);
                if (valueCell) {
                    valueCell.set(value);
                }
                else {
                    component[BaseComponent_1.KEY_PARAMS].set($paramConfig.name, value);
                }
            }
        }
    }
};


/***/ }),
/* 45 */
/***/ (function(module, exports) {

module.exports = __WEBPACK_EXTERNAL_MODULE__45__;

/***/ }),
/* 46 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
exports.reflectConstruct = Reflect &&
    typeof Reflect == 'object' &&
    Reflect.construct &&
    Reflect.construct.toString().indexOf('[native code]') != -1;
const templateTagContainer = document.createElement('div');
templateTagContainer.innerHTML = '<template>1</template>';
exports.templateTag = !templateTagContainer.firstChild.firstChild;
let nativeCustomElementsFeature = false;
const TestNativeCustomElementsFeature = exports.reflectConstruct
    ? function TestNativeCustomElementsFeature(self) {
        return Reflect.construct(HTMLElement, [self], TestNativeCustomElementsFeature);
    }
    : function TestNativeCustomElementsFeature(self) {
        return HTMLElement.call(this, self);
    };
Object.defineProperty(TestNativeCustomElementsFeature, 'observedAttributes', {
    get() {
        return ['test'];
    }
});
TestNativeCustomElementsFeature.prototype = Object.create(HTMLElement.prototype);
TestNativeCustomElementsFeature.prototype.constructor = TestNativeCustomElementsFeature;
TestNativeCustomElementsFeature.prototype.attributeChangedCallback = () => {
    nativeCustomElementsFeature = true;
};
window.customElements.define('test-native-custom-elements-feature', TestNativeCustomElementsFeature);
document.createElement('test-native-custom-elements-feature').setAttribute('test', '');
exports.nativeCustomElements = nativeCustomElementsFeature;


/***/ }),
/* 47 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
exports.handledEvents = [
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


/***/ }),
/* 48 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const bindContent_1 = __webpack_require__(32);
function handleDOMEvent(evt) {
    let attrName = 'on-' + evt.type;
    let el = evt.target;
    let parentEl = el.parentElement;
    let receivers;
    while (parentEl) {
        if (el.hasAttribute(attrName)) {
            (receivers || (receivers = [])).push(el);
        }
        let component = parentEl.$component;
        if (component && receivers && receivers.length) {
            for (let i = 0;;) {
                let receiver = receivers[i];
                let handlerName = receiver.getAttribute(attrName);
                let handler;
                if (handlerName.charAt(0) == ':') {
                    let events = component.constructor.domEvents;
                    if (events) {
                        events = events[handlerName.slice(1)];
                        if (events) {
                            handler = events[evt.type];
                        }
                    }
                }
                else {
                    handler = component[handlerName];
                }
                if (handler) {
                    if (handler.call(component, evt, receiver[bindContent_1.KEY_CONTEXT], receiver) === false) {
                        return;
                    }
                    receivers.splice(i, 1);
                }
                else {
                    i++;
                }
                if (i == receivers.length) {
                    break;
                }
            }
        }
        if (parentEl == document.body) {
            break;
        }
        el = parentEl;
        parentEl = el.parentElement;
    }
}
exports.handleDOMEvent = handleDOMEvent;


/***/ }),
/* 49 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const bindContent_1 = __webpack_require__(32);
const stack = [];
function handleEvent(evt) {
    let target = evt.target;
    let ownerComponent = target.ownerComponent;
    if (target == ownerComponent) {
        return;
    }
    let targetEl = target.element;
    let el = targetEl;
    let parentEl = el.parentElement;
    if (!parentEl) {
        return;
    }
    stack.length = 0;
    let attrName = 'oncomponent-' + evt.type;
    let ownerComponentEl = ownerComponent.element;
    let receivers;
    for (let component;;) {
        if (el.hasAttribute(attrName)) {
            (receivers || (receivers = [])).push(el);
        }
        if (parentEl == ownerComponentEl) {
            if (receivers) {
                for (let i = 0, l = receivers.length; i < l; i++) {
                    let receiver = receivers[i];
                    let handlerName = receiver.getAttribute(attrName);
                    let handler;
                    if (handlerName.charAt(0) == ':') {
                        let events = ownerComponent.constructor.events;
                        if (receiver == targetEl) {
                            handler = events[handlerName.slice(1)][evt.type];
                        }
                        else {
                            let elementBlockNames = target.constructor
                                ._elementBlockNames;
                            for (let j = 0, m = elementBlockNames.length; j < m; j++) {
                                let typedHandler = events[handlerName.slice(1)][`<${elementBlockNames[j]}>` + evt.type];
                                if (typedHandler &&
                                    typedHandler.call(ownerComponent, evt, receiver[bindContent_1.KEY_CONTEXT], receiver) === false) {
                                    return;
                                }
                            }
                            handler = events[handlerName.slice(1)]['<*>' + evt.type];
                        }
                    }
                    else {
                        handler = ownerComponent[handlerName];
                    }
                    if (handler &&
                        handler.call(ownerComponent, evt, receiver[bindContent_1.KEY_CONTEXT], receiver) === false) {
                        return;
                    }
                }
            }
            if (!stack.length) {
                break;
            }
            el = parentEl;
            parentEl = el.parentElement;
            if (!parentEl) {
                break;
            }
            [ownerComponent, receivers] = stack.pop();
            ownerComponentEl = ownerComponent.element;
        }
        else {
            el = parentEl;
            parentEl = el.parentElement;
            if (!parentEl) {
                break;
            }
            component = el.$component;
            if (component && component.ownerComponent != ownerComponent) {
                stack.push([ownerComponent, receivers]);
                ownerComponent = component.ownerComponent;
                ownerComponentEl = ownerComponent.element;
                receivers = undefined;
            }
        }
    }
}
exports.handleEvent = handleEvent;


/***/ }),
/* 50 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const lower_case_first_word_1 = __webpack_require__(51);
const map_set_polyfill_1 = __webpack_require__(10);
const types = new map_set_polyfill_1.Set([Boolean, Number, String, Object]);
const prefix = 'param';
const prefixLength = prefix.length;
function Param(target, propertyName, propertyDesc, name, config) {
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
    ((constr.hasOwnProperty('params') && constr.params) || (constr.params = {}))[(name ||
        (propertyName.length <= prefixLength || propertyName.lastIndexOf(prefix, 0)
            ? propertyName
            : lower_case_first_word_1.lowerCaseFirstWord(propertyName.slice(5))))] = config;
}
exports.Param = Param;


/***/ }),
/* 51 */
/***/ (function(module, exports) {

module.exports = __WEBPACK_EXTERNAL_MODULE__51__;

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
Object.defineProperty(exports, "__esModule", { value: true });
var RnIfThen_1;
const next_tick_1 = __webpack_require__(53);
const cellx_1 = __webpack_require__(14);
const move_content_1 = __webpack_require__(54);
const attachChildComponentElements_1 = __webpack_require__(28);
const BaseComponent_1 = __webpack_require__(23);
const bindContent_1 = __webpack_require__(32);
const Component_1 = __webpack_require__(17);
const ElementProtoMixin_1 = __webpack_require__(44);
const compileKeypath_1 = __webpack_require__(40);
const Features_1 = __webpack_require__(46);
const keypathPattern_1 = __webpack_require__(37);
const removeNodes_1 = __webpack_require__(55);
const RnRepeat_1 = __webpack_require__(56);
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
            if (!reKeypath.test(if_)) {
                throw new SyntaxError(`Invalid value of attribute "if" (${if_})`);
            }
            let getIfValue = compileKeypath_1.compileKeypath(if_);
            this._if = new cellx_1.Cell(function () {
                return !!getIfValue.call(this);
            }, { context: this.$context });
            this.initialized = true;
        }
        this._if.on('change', this._onIfChange, this);
        this._render(false);
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
        if (this._elseMode ? !this._if.get() : this._if.get()) {
            let content = document.importNode(this.element.content, true);
            if (!Features_1.templateTag) {
                let templates = content.querySelectorAll('template');
                for (let i = 0, l = templates.length; i < l;) {
                    i += templates[i].content.querySelectorAll('template').length + 1;
                }
            }
            let contentBindingResult = [null, null, null];
            bindContent_1.bindComponentContent2(this.ownerComponent.constructor.template, this.element.getAttribute('pid'), content, this.ownerComponent, this.$context, contentBindingResult);
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
            cellx_1.Cell.forceRelease();
            this.emit('change');
        }
    }
    _deactivate() {
        if (!this._active) {
            return;
        }
        this._active = false;
        this._if.off('change', this._onIfChange, this);
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
RnIfThen = RnIfThen_1 = __decorate([
    Component_1.Component({
        elementIs: 'RnIfThen',
        elementExtends: 'template',
        params: {
            if: { property: 'paramIf', type: String, required: true, readonly: true }
        }
    })
], RnIfThen);
exports.RnIfThen = RnIfThen;


/***/ }),
/* 53 */
/***/ (function(module, exports) {

module.exports = __WEBPACK_EXTERNAL_MODULE__53__;

/***/ }),
/* 54 */
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
/* 55 */
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
/* 56 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
const map_set_polyfill_1 = __webpack_require__(10);
const next_tick_1 = __webpack_require__(53);
const cellx_1 = __webpack_require__(14);
const move_content_1 = __webpack_require__(54);
const attachChildComponentElements_1 = __webpack_require__(28);
const BaseComponent_1 = __webpack_require__(23);
const bindContent_1 = __webpack_require__(32);
const Component_1 = __webpack_require__(17);
const ElementProtoMixin_1 = __webpack_require__(44);
const compileKeypath_1 = __webpack_require__(40);
const Features_1 = __webpack_require__(46);
const keypathPattern_1 = __webpack_require__(37);
const namePattern_1 = __webpack_require__(38);
const removeNodes_1 = __webpack_require__(55);
const RnIfThen_1 = __webpack_require__(52);
const slice = Array.prototype.slice;
const reForAttrValue = RegExp(`^\\s*(${namePattern_1.namePattern})\\s+(?:in|of)\\s+(${keypathPattern_1.keypathPattern})\\s*$`);
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
let RnRepeat = class RnRepeat extends BaseComponent_1.BaseComponent {
    constructor() {
        super(...arguments);
        this._active = false;
    }
    elementConnected() {
        if (this._active) {
            return;
        }
        this._active = true;
        if (!this.initialized) {
            let for_ = this.paramFor.match(reForAttrValue);
            if (!for_) {
                throw new SyntaxError(`Invalid value of parameter "for" (${this.paramFor})`);
            }
            this._itemName = for_[1];
            this._prevList = [];
            this._list = new cellx_1.Cell(compileKeypath_1.compileKeypath(for_[2]), {
                context: this.$context
            });
            this._$itemMap = new map_set_polyfill_1.Map();
            this._trackBy = this.paramTrackBy;
            this._rawItemContent = document.importNode(this.element.content, true);
            this.initialized = true;
        }
        this._list.on('change', this._onListChange, this);
        this._render(false);
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
        let $itemMap = this._$itemMap;
        let trackBy = this._trackBy;
        let startIndex = 0;
        let changed = false;
        if (list) {
            let el = this.element;
            let lastNode = el;
            let removedValues = new map_set_polyfill_1.Set();
            for (let i = 0, l = list.length; i < l;) {
                let item = getItem(list, i);
                let value = trackBy ? item[trackBy] : item;
                let $item = $itemMap.get(value);
                if ($item) {
                    if (removedValues.delete(value)) {
                        $item.item.set(item);
                        $item.index.set(i);
                        lastNode = insertBefore($item.nodes, lastNode == el ? lastNode : lastNode.nextSibling);
                        i++;
                    }
                    else {
                        let foundIndex;
                        for (let j = startIndex;; j++) {
                            if (foundIndex === undefined) {
                                if (value === (trackBy ? prevList[j][trackBy] : prevList[j])) {
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
                                    if (j < prevListLength && trackBy
                                        ? getItem(list, ii)[trackBy] === prevList[j][trackBy]
                                        : getItem(list, ii) === prevList[j]) {
                                        continue;
                                    }
                                    if (foundCount < foundIndex - startIndex) {
                                        for (let k = foundIndex; k < j; k++) {
                                            let k$Item = $itemMap.get(trackBy ? prevList[k][trackBy] : prevList[k]);
                                            k$Item.item.set(item);
                                            k$Item.index.set(i);
                                            lastNode = insertBefore(k$Item.nodes, lastNode == el ? lastNode : lastNode.nextSibling);
                                        }
                                        prevList.splice(foundIndex, foundCount);
                                        prevListLength -= foundCount;
                                        changed = true;
                                        i = ii;
                                        break;
                                    }
                                }
                                for (let k = startIndex; k < foundIndex; k++) {
                                    let value = trackBy ? prevList[k][trackBy] : prevList[k];
                                    removeNodes_1.removeNodes($itemMap.get(value).nodes);
                                    removedValues.add(value);
                                }
                                let nodes = $itemMap.get(trackBy ? prevList[j - 1][trackBy] : prevList[j - 1]).nodes;
                                lastNode = nodes[nodes.length - 1];
                                changed = true;
                                startIndex = j;
                                i = ii;
                                break;
                            }
                        }
                    }
                }
                else {
                    let itemCell = new cellx_1.Cell(item);
                    let indexCell = new cellx_1.Cell(i);
                    let content = this._rawItemContent.cloneNode(true);
                    if (!Features_1.templateTag) {
                        let templates = content.querySelectorAll('template');
                        for (let i = 0, l = templates.length; i < l;) {
                            i += templates[i].content.querySelectorAll('template').length + 1;
                        }
                    }
                    let context = this.$context;
                    let contentBindingResult = [null, null, null];
                    bindContent_1.bindComponentContent2(this.ownerComponent.constructor
                        .template, this.element.getAttribute('pid'), content, this.ownerComponent, Object.create(context, {
                        '$/': {
                            configurable: false,
                            enumerable: false,
                            writable: false,
                            value: context['$/'] || context
                        },
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
                    $itemMap.set(value, {
                        item: itemCell,
                        index: indexCell,
                        nodes: slice.call(content.childNodes),
                        bindings: contentBindingResult[1],
                        childComponents
                    });
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
                    lastNode.parentNode.insertBefore(content, lastNode == el ? lastNode : lastNode.nextSibling);
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
                ($itemMap => {
                    removedValues.forEach(value => {
                        let bindings = $itemMap.get(value).bindings;
                        if (bindings) {
                            for (let i = bindings.length; i;) {
                                bindings[--i].off();
                            }
                        }
                        $itemMap.delete(value);
                    });
                })($itemMap);
            }
        }
        if (startIndex < prevListLength) {
            for (let i = startIndex; i < prevListLength; i++) {
                let value = trackBy ? prevList[i][trackBy] : prevList[i];
                let $item = $itemMap.get(value);
                removeNodes_1.removeNodes($item.nodes);
                offBindings($item.bindings);
                $itemMap.delete(value);
                deactivateChildComponents($item.childComponents);
            }
        }
        else if (!changed) {
            return;
        }
        this._prevList = Array.isArray(list) ? list.slice() : list.toArray();
        if (fromChangeEvent) {
            cellx_1.Cell.forceRelease();
            this.emit('change');
        }
    }
    _deactivate() {
        if (!this._active) {
            return;
        }
        this._active = false;
        this._list.off('change', this._onListChange, this);
        let prevList = this._prevList;
        let $itemMap = this._$itemMap;
        let trackBy = this._trackBy;
        for (let i = 0, l = prevList.length; i < l; i++) {
            let value = trackBy ? prevList[i][trackBy] : prevList[i];
            let $item = $itemMap.get(value);
            removeNodes_1.removeNodes($item.nodes);
            offBindings($item.bindings);
            $itemMap.delete(value);
            deactivateChildComponents($item.childComponents);
        }
    }
};
RnRepeat = __decorate([
    Component_1.Component({
        elementIs: 'RnRepeat',
        elementExtends: 'template',
        params: {
            for: { property: 'paramFor', type: String, required: true, readonly: true },
            trackBy: { property: 'paramTrackBy', type: String, readonly: true }
        }
    })
], RnRepeat);
exports.RnRepeat = RnRepeat;


/***/ }),
/* 57 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
const Component_1 = __webpack_require__(17);
const RnIfThen_1 = __webpack_require__(52);
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
/* 58 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
const get_uid_1 = __webpack_require__(24);
const map_set_polyfill_1 = __webpack_require__(10);
const move_content_1 = __webpack_require__(25);
const symbol_polyfill_1 = __webpack_require__(26);
const attachChildComponentElements_1 = __webpack_require__(28);
const BaseComponent_1 = __webpack_require__(23);
const bindContent_1 = __webpack_require__(32);
const Component_1 = __webpack_require__(17);
const ElementProtoMixin_1 = __webpack_require__(44);
const KEY_SLOT_CONTENT_MAP = symbol_polyfill_1.Symbol('Rionite/RnSlot[slotContentMap]');
let RnSlot = class RnSlot extends BaseComponent_1.BaseComponent {
    static get bindsInputContent() {
        return true;
    }
    _attach() {
        this._attached = true;
        if (this.isReady) {
            this._unfreezeBindings();
            return;
        }
        let ownerComponent = this.ownerComponent;
        let contentOwnerComponent = ownerComponent.ownerComponent;
        let ownerComponentInputContent = ownerComponent.$inputContent;
        let el = this.element;
        let cloneContent = this.paramCloneContent;
        let content;
        let childComponents;
        let bindings;
        let backBindings;
        if (ownerComponentInputContent || !cloneContent) {
            let slotName = this.paramName;
            let forTag;
            let for$;
            if (!slotName) {
                forTag = this.paramForTag;
                if (forTag) {
                    forTag = forTag.toUpperCase();
                }
                else {
                    for$ = this.paramFor;
                }
            }
            let key = get_uid_1.getUID(ownerComponent) +
                '/' +
                (slotName ? 's:' + slotName : forTag ? 't:' + forTag : for$ || '');
            if (slotName || forTag || for$) {
                let contentMap;
                if (!cloneContent &&
                    (contentMap = contentOwnerComponent[KEY_SLOT_CONTENT_MAP]) &&
                    contentMap.has(key)) {
                    let container = contentMap.get(key);
                    if (container.firstChild) {
                        content = move_content_1.moveContent(document.createDocumentFragment(), container);
                        contentMap.set(key, el);
                        childComponents = container.$component._childComponents;
                        bindings = container.$component._bindings;
                    }
                }
                else if (ownerComponentInputContent) {
                    if (for$ && for$.indexOf('__') == -1) {
                        let elementBlockNames = ownerComponent.constructor
                            ._elementBlockNames;
                        for$ = elementBlockNames[elementBlockNames.length - 1] + '__' + for$;
                    }
                    let selectedElements = ownerComponentInputContent.querySelectorAll(slotName ? `[slot=${slotName}]` : forTag || '.' + for$);
                    let selectedElementCount = selectedElements.length;
                    if (selectedElementCount) {
                        content = document.createDocumentFragment();
                        for (let i = 0; i < selectedElementCount; i++) {
                            content.appendChild(cloneContent
                                ? selectedElements[i].cloneNode(true)
                                : selectedElements[i]);
                        }
                    }
                    if (!cloneContent) {
                        (contentMap ||
                            contentOwnerComponent[KEY_SLOT_CONTENT_MAP] ||
                            (contentOwnerComponent[KEY_SLOT_CONTENT_MAP] = new map_set_polyfill_1.Map())).set(key, el);
                    }
                }
            }
            else if (cloneContent) {
                content = ownerComponentInputContent.cloneNode(true);
            }
            else {
                let contentMap = contentOwnerComponent[KEY_SLOT_CONTENT_MAP];
                if (contentMap && contentMap.has(key)) {
                    let container = contentMap.get(key);
                    content = move_content_1.moveContent(document.createDocumentFragment(), container);
                    contentMap.set(key, el);
                    childComponents = container.$component._childComponents;
                    bindings = container.$component._bindings;
                }
                else if (ownerComponentInputContent) {
                    content = ownerComponentInputContent;
                    (contentMap || (contentOwnerComponent[KEY_SLOT_CONTENT_MAP] = new map_set_polyfill_1.Map())).set(key, el);
                }
            }
        }
        if (bindings === undefined) {
            if (content || this.$inputContent) {
                let contentBindingResult = [null, null, null];
                if (content) {
                    bindContent_1.bindContent(content, -1, contentOwnerComponent, this.paramGetContext
                        ? this.paramGetContext.call(ownerComponent, ownerComponent.$context, this)
                        : ownerComponent.$context, contentBindingResult);
                }
                else {
                    let template = this.$inputContent.firstElementChild;
                    bindContent_1.bindComponentContent2(this.ownerComponent.constructor
                        .template, template.getAttribute('pid'), (content = document.importNode(template.content, true)), ownerComponent, this.paramGetContext
                        ? this.paramGetContext.call(ownerComponent, this.$context, this)
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
            name: { property: 'paramName', type: String, readonly: true },
            forTag: { property: 'paramForTag', type: String, readonly: true },
            for: { property: 'paramFor', type: String, readonly: true },
            cloneContent: { property: 'paramCloneContent', default: false, readonly: true },
            getContext: { property: 'paramGetContext', type: Object, readonly: true }
        }
    })
], RnSlot);
exports.RnSlot = RnSlot;


/***/ })
/******/ ]);
});