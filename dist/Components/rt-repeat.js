"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var cellx_1 = require("cellx");
var Component_1 = require("../Component");
var KEY_ELEMENT_CONNECTED_1 = require("../KEY_ELEMENT_CONNECTED");
var compileKeypath_1 = require("../compileKeypath");
var bindContent_1 = require("../bindContent");
var attachChildComponentElements_1 = require("../attachChildComponentElements");
var namePattern_1 = require("../namePattern");
var keypathPattern_1 = require("../keypathPattern");
var Features_1 = require("../Features");
var d_1 = require("../d");
var Map = cellx_1.JS.Map;
var nextTick = cellx_1.Utils.nextTick;
var slice = Array.prototype.slice;
var reForAttributeValue = RegExp("^\\s*(" + namePattern_1.default + ")\\s+of\\s+(" + keypathPattern_1.default + ")\\s*$");
var RtRepeat = (function (_super) {
    __extends(RtRepeat, _super);
    function RtRepeat() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this._destroyed = false;
        return _this;
    }
    RtRepeat.prototype.elementConnected = function () {
        if (this._destroyed) {
            throw new TypeError('Instance of RtRepeat was destroyed and can no longer be used');
        }
        if (!this.initialized) {
            var props = this.props;
            var forAttrValue = props['for'].match(reForAttributeValue);
            if (!forAttrValue) {
                throw new SyntaxError("Invalid value of attribute \"for\" (" + props['for'] + ")");
            }
            this._itemName = forAttrValue[1];
            this._list = new cellx_1.Cell(compileKeypath_1.default(forAttrValue[2]), { owner: props.context });
            this._itemMap = new Map();
            this._trackBy = props.trackBy;
            var rawItemContent = this._rawItemContent =
                document.importNode(this.element.content, true);
            if (props.strip) {
                var firstChild = rawItemContent.firstChild;
                var lastChild = rawItemContent.lastChild;
                if (firstChild == lastChild) {
                    if (firstChild.nodeType == Node.TEXT_NODE) {
                        firstChild.textContent = firstChild.textContent.trim();
                    }
                }
                else {
                    if (firstChild.nodeType == Node.TEXT_NODE) {
                        if (!(firstChild.textContent = firstChild.textContent.replace(/^\s+/, ''))) {
                            rawItemContent.removeChild(firstChild);
                        }
                    }
                    if (lastChild.nodeType == Node.TEXT_NODE) {
                        if (!(lastChild.textContent = lastChild.textContent.replace(/\s+$/, ''))) {
                            rawItemContent.removeChild(lastChild);
                        }
                    }
                }
            }
            this._context = props.context;
            this._list.on('change', this._onListChange, this);
            this._render(false);
            this.initialized = true;
        }
    };
    RtRepeat.prototype.elementDisconnected = function () {
        var _this = this;
        nextTick(function () {
            if (!_this.element[KEY_ELEMENT_CONNECTED_1.default]) {
                _this._destroy();
            }
        });
    };
    RtRepeat.prototype._onListChange = function () {
        if (this.element.parentNode) {
            this._render(true);
        }
    };
    RtRepeat.prototype._attach = function () {
        this._attached = true;
    };
    RtRepeat.prototype._detach = function () {
        this._attached = false;
    };
    RtRepeat.prototype._render = function (c) {
        var _this = this;
        var oldItemMap = this._oldItemMap = this._itemMap;
        this._itemMap = new Map();
        var list = this._list.get();
        var changed = false;
        if (list) {
            this._lastNode = this.element;
            changed = list.reduce(function (changed, item, index) { return _this._renderItem(item, index) || changed; }, changed);
        }
        if (oldItemMap.size) {
            this._clearByItemMap(oldItemMap);
        }
        else if (!changed) {
            return;
        }
        if (c) {
            nextTick(function () {
                _this.emit('change');
            });
        }
    };
    RtRepeat.prototype._renderItem = function (item, index) {
        var trackBy = this._trackBy;
        var value = trackBy ? (trackBy == '$index' ? index : item[trackBy]) : item;
        var prevItems = this._oldItemMap.get(value);
        var currentItems = this._itemMap.get(value);
        if (prevItems) {
            var prevItem = void 0;
            if (prevItems.length == 1) {
                prevItem = prevItems[0];
                this._oldItemMap.delete(value);
            }
            else {
                prevItem = prevItems.shift();
            }
            if (currentItems) {
                currentItems.push(prevItem);
            }
            else {
                this._itemMap.set(value, [prevItem]);
            }
            prevItem.item.set(item);
            var nodes = prevItem.nodes;
            if (index == prevItem.index.get()) {
                this._lastNode = nodes[nodes.length - 1];
                return false;
            }
            prevItem.index.set(index);
            if (nodes.length == 1) {
                var node = nodes[0];
                this._lastNode.parentNode.insertBefore(node, this._lastNode.nextSibling);
                this._lastNode = node;
            }
            else {
                var df = document.createDocumentFragment();
                for (var _i = 0, nodes_1 = nodes; _i < nodes_1.length; _i++) {
                    var node = nodes_1[_i];
                    df.appendChild(node);
                }
                var newLastNode_1 = df.lastChild;
                this._lastNode.parentNode.insertBefore(df, this._lastNode.nextSibling);
                this._lastNode = newLastNode_1;
            }
            return true;
        }
        var itemCell = new cellx_1.Cell(item);
        var indexCell = new cellx_1.Cell(index);
        var content = this._rawItemContent.cloneNode(true);
        var _a = bindContent_1.default(content, this.ownerComponent, Object.create(this._context, (_b = {},
            _b[this._itemName] = {
                get: function () {
                    return itemCell.get();
                }
            },
            _b.$index = {
                get: function () {
                    return indexCell.get();
                }
            },
            _b))), bindings = _a[0], childComponents = _a[1];
        var newItem = {
            item: itemCell,
            index: indexCell,
            nodes: slice.call(content.childNodes),
            bindings: bindings
        };
        if (currentItems) {
            currentItems.push(newItem);
        }
        else {
            this._itemMap.set(value, [newItem]);
        }
        var newLastNode = content.lastChild;
        this._lastNode.parentNode.insertBefore(content, this._lastNode.nextSibling);
        this._lastNode = newLastNode;
        if (!Features_1.nativeCustomElements && childComponents) {
            attachChildComponentElements_1.default(childComponents);
        }
        return true;
        var _b;
    };
    RtRepeat.prototype._clearByItemMap = function (itemMap) {
        itemMap.forEach(this._clearByItems, this);
        itemMap.clear();
    };
    RtRepeat.prototype._clearByItems = function (items) {
        for (var i = items.length; i;) {
            var item = items[--i];
            var bindings = item.bindings;
            if (bindings) {
                for (var i_1 = bindings.length; i_1;) {
                    bindings[--i_1].off();
                }
            }
            var nodes = item.nodes;
            for (var i_2 = nodes.length; i_2;) {
                var node = nodes[--i_2];
                var parentNode = node.parentNode;
                if (parentNode) {
                    parentNode.removeChild(node);
                }
            }
        }
    };
    RtRepeat.prototype._destroy = function () {
        if (this._destroyed) {
            return;
        }
        this._destroyed = true;
        this._clearByItemMap(this._itemMap);
        this._list.off('change', this._onListChange, this);
    };
    return RtRepeat;
}(Component_1.default));
RtRepeat = __decorate([
    d_1.default.Component({
        elementIs: 'rt-repeat',
        elementExtends: 'template',
        props: {
            for: { type: String, required: true, readonly: true },
            trackBy: { type: String, readonly: true },
            strip: { default: false, readonly: true }
        }
    })
], RtRepeat);
exports.default = RtRepeat;
