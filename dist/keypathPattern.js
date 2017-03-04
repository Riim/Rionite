"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var namePattern_1 = require("./namePattern");
exports.default = "(?:" + namePattern_1.default + "|\\d+)(?:\\.(?:" + namePattern_1.default + "|\\d+))*";
