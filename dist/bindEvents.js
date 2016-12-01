"use strict";
function bindEvents(component, events) {
    for (var assetName in events) {
        var asset = void 0;
        if (assetName == ':component') {
            asset = component;
        }
        else if (assetName == ':element') {
            asset = component.element;
        }
        else {
            asset = component.$(assetName);
            if (!asset) {
                continue;
            }
        }
        var assetEvents = events[assetName];
        for (var evtName in assetEvents) {
            component.listenTo(asset, evtName, assetEvents[evtName]);
        }
    }
}
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = bindEvents;
