"use strict";
var cellx = require('cellx');
var nextUID = cellx.Utils.nextUID;
var hasOwn = Object.prototype.hasOwnProperty;
var KEY_UID = cellx.JS.Symbol('uid');
var getUID;
if (typeof KEY_UID == 'symbol') {
    getUID = function getUID(obj) {
        return hasOwn.call(obj, KEY_UID) ? obj[KEY_UID] : (obj[KEY_UID] = nextUID());
    };
}
else {
    getUID = function getUID(obj) {
        return hasOwn.call(obj, KEY_UID) ? obj[KEY_UID] : Object.defineProperty(obj, KEY_UID, {});
    };
}
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = getUID;
