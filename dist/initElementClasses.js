"use strict";
var Component_1 = require("./Component");
function initElementClasses(el, constr) {
    var c = constr;
    do {
        el.classList.add(c.elementIs);
        c = Object.getPrototypeOf(c.prototype).constructor;
    } while (c != Component_1.default);
}
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = initElementClasses;
