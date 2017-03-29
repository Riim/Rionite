"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var cellx_1 = require("cellx");
var nextUID = cellx_1.Utils.nextUID;
var DisposableMixin = (function () {
    function DisposableMixin() {
        this._disposables = {};
    }
    DisposableMixin.prototype.listenTo = function (target, typeOrListeners, listenerOrContext, contextOrUseCapture, useCapture) {
        var _this = this;
        var listenings;
        if (typeof typeOrListeners == 'object') {
            listenings = [];
            if (Array.isArray(typeOrListeners)) {
                if (arguments.length < 4) {
                    contextOrUseCapture = this;
                }
                for (var i = 0, l = typeOrListeners.length; i < l; i++) {
                    listenings.push(this.listenTo(target, typeOrListeners[i], listenerOrContext, contextOrUseCapture, useCapture || false));
                }
            }
            else {
                if (arguments.length < 3) {
                    listenerOrContext = this;
                }
                for (var type in typeOrListeners) {
                    listenings.push(this.listenTo(target, type, typeOrListeners[type], listenerOrContext, contextOrUseCapture || false));
                }
            }
        }
        else {
            if (arguments.length < 4) {
                contextOrUseCapture = this;
            }
            if (Array.isArray(target) || target instanceof NodeList || target instanceof HTMLCollection) {
                listenings = [];
                for (var i = 0, l = target.length; i < l; i++) {
                    listenings.push(this.listenTo(target[i], typeOrListeners, listenerOrContext, contextOrUseCapture, useCapture || false));
                }
            }
            else if (Array.isArray(listenerOrContext)) {
                listenings = [];
                for (var i = 0, l = listenerOrContext.length; i < l; i++) {
                    listenings.push(this.listenTo(target, typeOrListeners, listenerOrContext[i], contextOrUseCapture, useCapture || false));
                }
            }
            else {
                return this._listenTo(target, typeOrListeners, listenerOrContext, contextOrUseCapture, useCapture || false);
            }
        }
        var id = nextUID();
        var stopListening = function () {
            for (var i = listenings.length; i;) {
                listenings[--i].stop();
            }
            delete _this._disposables[id];
        };
        var listening = this._disposables[id] = {
            stop: stopListening,
            dispose: stopListening
        };
        return listening;
    };
    DisposableMixin.prototype._listenTo = function (target, type, listener, context, useCapture) {
        var _this = this;
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
        var id = nextUID();
        var stopListening = function () {
            if (_this._disposables[id]) {
                if (target instanceof cellx_1.EventEmitter) {
                    target.off(type, listener, context);
                }
                else {
                    target.removeEventListener(type, listener, useCapture);
                }
                delete _this._disposables[id];
            }
        };
        var listening = this._disposables[id] = {
            stop: stopListening,
            dispose: stopListening
        };
        return listening;
    };
    DisposableMixin.prototype.setTimeout = function (cb, delay) {
        var _this = this;
        var id = nextUID();
        var timeoutId = setTimeout(function () {
            delete _this._disposables[id];
            cb.call(_this);
        }, delay);
        var clearTimeout_ = function () {
            if (_this._disposables[id]) {
                clearTimeout(timeoutId);
                delete _this._disposables[id];
            }
        };
        var timeout = this._disposables[id] = {
            clear: clearTimeout_,
            dispose: clearTimeout_
        };
        return timeout;
    };
    DisposableMixin.prototype.setInterval = function (cb, delay) {
        var _this = this;
        var id = nextUID();
        var intervalId = setInterval(function () {
            cb.call(_this);
        }, delay);
        var clearInterval_ = function () {
            if (_this._disposables[id]) {
                clearInterval(intervalId);
                delete _this._disposables[id];
            }
        };
        var interval = this._disposables[id] = {
            clear: clearInterval_,
            dispose: clearInterval_
        };
        return interval;
    };
    DisposableMixin.prototype.registerCallback = function (cb) {
        var _this = this;
        var id = nextUID();
        var disposable = this;
        var cancelCallback = function () {
            delete _this._disposables[id];
        };
        var callback = function callback() {
            if (disposable._disposables[id]) {
                delete disposable._disposables[id];
                return cb.apply(disposable, arguments);
            }
        };
        callback.cancel = cancelCallback;
        callback.dispose = cancelCallback;
        this._disposables[id] = callback;
        return callback;
    };
    DisposableMixin.prototype.dispose = function () {
        var disposables = this._disposables;
        for (var id in disposables) {
            disposables[id].dispose();
        }
        return this;
    };
    return DisposableMixin;
}());
exports.default = DisposableMixin;
