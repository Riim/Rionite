"use strict";
var cellx = require('cellx');
var ErrorLogger = cellx.ErrorLogger;
var queue;
function run() {
    var track = queue;
    queue = null;
    for (var _i = 0, track_1 = track; _i < track_1.length; _i++) {
        var item = track_1[_i];
        try {
            item.callback.call(item.context);
        }
        catch (err) {
            ErrorLogger.log(err);
        }
    }
}
function defer(cb, context) {
    if (queue) {
        queue.push({ callback: cb, context: context });
    }
    else {
        queue = [{ callback: cb, context: context }];
        setTimeout(run, 1);
    }
}
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = defer;
