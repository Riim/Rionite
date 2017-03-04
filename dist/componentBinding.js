"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var cellx_1 = require("cellx");
function freezeBinding(binding) {
    binding._frozenState = {
        changeEvents: binding.getEvents('change'),
        value: binding._value
    };
    binding.off();
}
function unfreezeBinding(binding) {
    var frozenState = binding._frozenState;
    var changeEvents = frozenState.changeEvents;
    binding._frozenState = null;
    for (var _i = 0, changeEvents_1 = changeEvents; _i < changeEvents_1.length; _i++) {
        var evt = changeEvents_1[_i];
        binding.on('change', evt.listener, evt.context);
    }
    if (frozenState.value !== binding._value) {
        binding._changeEvent = {
            target: binding,
            type: 'change',
            oldValue: frozenState.value,
            value: binding._value,
            prev: null
        };
        binding._canCancelChange = true;
        binding._addToRelease();
    }
}
function freezeBindings(bindings) {
    cellx_1.Cell.forceRelease();
    for (var _i = 0, bindings_1 = bindings; _i < bindings_1.length; _i++) {
        var binding = bindings_1[_i];
        freezeBinding(binding);
    }
}
exports.freezeBindings = freezeBindings;
function unfreezeBindings(bindings) {
    cellx_1.Cell.forceRelease();
    for (var _i = 0, bindings_2 = bindings; _i < bindings_2.length; _i++) {
        var binding = bindings_2[_i];
        unfreezeBinding(binding);
    }
    cellx_1.Cell.forceRelease();
}
exports.unfreezeBindings = unfreezeBindings;
