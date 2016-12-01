"use strict";
var namePattern_1 = require("./namePattern");
var escapeString_1 = require("./Utils/escapeString");
var escapeHTML_1 = require("./Utils/escapeHTML");
var keypathPattern = '(?:' + namePattern_1.default + '|\\[\\d+\\])(?:\\.' + namePattern_1.default + '|\\[\\d+\\])*';
var re = RegExp('\\{\\{' +
    '(?:' +
    '\\s*(?:' +
    'block\\s+(' + namePattern_1.default + ')|(\\/)block|(s)uper\\(\\)|(' + keypathPattern + ')' +
    ')\\s*|\\{\\s*(' + keypathPattern + ')\\s*\\}' +
    ')' +
    '\\}\\}');
var ComponentTemplate = (function () {
    function ComponentTemplate(tmpl, parent) {
        this.parent = parent || null;
        var currentBlock = { name: null, source: [] };
        var blocks = [currentBlock];
        var blockMap = {};
        var splittedTemplate = tmpl.split(re);
        for (var i = 0, l = splittedTemplate.length; i < l;) {
            if (i % 6) {
                var blockName = splittedTemplate[i];
                if (blockName) {
                    currentBlock.source.push("this." + blockName + ".call(this, data)");
                    currentBlock = { name: blockName, source: [] };
                    blocks.push((blockMap[blockName] = currentBlock));
                }
                else if (splittedTemplate[i + 1]) {
                    if (blocks.length > 1) {
                        blocks.pop();
                        currentBlock = blocks[blocks.length - 1];
                    }
                }
                else if (splittedTemplate[i + 2]) {
                    if (parent && blocks.length > 1 && parent._blockMap[currentBlock.name]) {
                        currentBlock.source.push('$super.call(this, data)');
                    }
                }
                else {
                    var keypath = splittedTemplate[i + 3];
                    currentBlock.source.push(keypath ? "escape(data." + keypath + ")" : 'data.' + splittedTemplate[i + 4]);
                }
                i += 5;
            }
            else {
                var text = splittedTemplate[i];
                if (text) {
                    currentBlock.source.push("'" + escapeString_1.default(text) + "'");
                }
                i++;
            }
        }
        this._renderer = parent ? parent._renderer : Function('data', 'escape', "return [" + blocks[0].source.join(', ') + "].join('');");
        Object.keys(blockMap).forEach(function (name) {
            var parentBlock = parent && parent._blockMap[name];
            var inner = Function('$super', 'data', 'escape', "return [" + blockMap[name].source.join(', ') + "].join('');");
            this[name] = function (data) {
                return inner.call(this, parentBlock, data, escapeHTML_1.default);
            };
        }, (this._blockMap = Object.create(parent ? parent._blockMap : null)));
    }
    ComponentTemplate.prototype.extend = function (tmpl) {
        return new ComponentTemplate(tmpl, this);
    };
    ComponentTemplate.prototype.render = function (data) {
        return this._renderer.call(this._blockMap, data || {}, escapeHTML_1.default);
    };
    return ComponentTemplate;
}());
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = ComponentTemplate;
