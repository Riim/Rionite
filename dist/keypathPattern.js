"use strict";
var namePattern_1 = require("./namePattern");
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = "(?:" + namePattern_1.default + "|\\d+)(?:\\." + namePattern_1.default + "|\\d+)*";
