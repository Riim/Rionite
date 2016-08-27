import { EventEmitter, Utils } from 'cellx';

let nextUID = Utils.nextUID;

let DisposableMixin = EventEmitter.extend({
	constructor: function DisposableMixin() {
		/**
		 * @type {Object<{ dispose: () }>}
		 */
		this._disposables = {};
	},

	listenTo(target, type, listener, context) {
		let listenings;

		if (
			Array.isArray(target) || target instanceof NodeList || target instanceof HTMLCollection ||
				(target.addClass && target.each)
		) {
			if (typeof type == 'object' && !Array.isArray(type)) {
				if (arguments.length < 3) {
					listener = this;
				}
			} else if (arguments.length < 4) {
				context = this;
			}

			listenings = [];

			for (let i = 0, l = target.length; i < l; i++) {
				listenings.push(this.listenTo(target[i], type, listener, context));
			}
		} else if (typeof type == 'object') {
			listenings = [];

			if (Array.isArray(type)) {
				if (arguments.length < 4) {
					context = this;
				}

				let types = type;

				for (let i = 0, l = types.length; i < l; i++) {
					listenings.push(this.listenTo(target, types[i], listener, context));
				}
			} else {
				context = arguments.length < 3 ? this : listener;

				let listeners = type;

				for (let type in listeners) {
					listenings.push(this.listenTo(target, type, listeners[type], context));
				}
			}
		} else {
			if (arguments.length < 4) {
				context = this;
			}

			if (typeof listener == 'object') {
				let listeners = listener;

				listenings = [];

				if (Array.isArray(listeners)) {
					for (let i = 0, l = listeners.length; i < l; i++) {
						listenings.push(this.listenTo(target, type, listeners[i], context));
					}
				} else {
					for (let name in listeners) {
						listenings.push(this.listenTo(target[name]('unwrap', 0), type, listeners[name], context));
					}
				}
			} else {
				return this._listenTo(target, type, listener, context);
			}
		}

		let id = nextUID();

		let stopListening = () => {
			for (let i = listenings.length; i;) {
				listenings[--i].stop();
			}

			delete this._disposables[id];
		};

		let listening = this._disposables[id] = {
			stop: stopListening,
			dispose: stopListening
		};

		return listening;
	},

	/**
	 * @typesign (
	 *     target: cellx.EventEmitter|EventTarget,
	 *     type: string,
	 *     listener: (evt: cellx~Event|Event) -> ?boolean,
	 *     context
	 * ) -> { stop: (), dispose: () };
	 */
	_listenTo(target, type, listener, context) {
		if (target instanceof EventEmitter) {
			target.on(type, listener, context);
		} else if (target.addEventListener) {
			if (target !== context) {
				listener = listener.bind(context);
			}

			target.addEventListener(type, listener);
		} else {
			throw new TypeError('Unable to add a listener');
		}

		let id = nextUID();

		let stopListening = () => {
			if (this._disposables[id]) {
				if (target instanceof EventEmitter) {
					target.off(type, listener, context);
				} else {
					target.removeEventListener(type, listener);
				}

				delete this._disposables[id];
			}
		};

		let listening = this._disposables[id] = {
			stop: stopListening,
			dispose: stopListening
		};

		return listening;
	},

	/**
	 * @typesign (cb: Function, delay: uint) -> { clear: (), dispose: () };
	 */
	setTimeout(cb, delay) {
		let id = nextUID();

		let timeoutId = setTimeout(() => {
			delete this._disposables[id];
			cb.call(this);
		}, delay);

		let clearTimeout_ = () => {
			if (this._disposables[id]) {
				clearTimeout(timeoutId);
				delete this._disposables[id];
			}
		};

		let timeout = this._disposables[id] = {
			clear: clearTimeout_,
			dispose: clearTimeout_
		};

		return timeout;
	},

	/**
	 * @typesign (cb: Function, delay: uint) -> { clear: (), dispose: () };
	 */
	setInterval(cb, delay) {
		let id = nextUID();

		let intervalId = setInterval(() => {
			cb.call(this);
		}, delay);

		let clearInterval_ = () => {
			if (this._disposables[id]) {
				clearInterval(intervalId);
				delete this._disposables[id];
			}
		};

		let interval = this._disposables[id] = {
			clear: clearInterval_,
			dispose: clearInterval_
		};

		return interval;
	},

	/**
	 * @typesign (cb: Function) -> { (), cancel: (), dispose: () };
	 */
	registerCallback(cb) {
		let id = nextUID();
		let component = this;

		let cancelCallback = () => {
			delete this._disposables[id];
		};

		function wrapper() {
			if (component._disposables[id]) {
				delete component._disposables[id];
				return cb.apply(component, arguments);
			}
		}
		wrapper.cancel = cancelCallback;
		wrapper.dispose = cancelCallback;

		this._disposables[id] = wrapper;

		return wrapper;
	},

	/**
	 * @typesign () -> Rionite.DisposableMixin;
	 */
	dispose() {
		let disposables = this._disposables;

		for (let id in disposables) {
			disposables[id].dispose();
		}

		return this;
	}
});

export default DisposableMixin;
