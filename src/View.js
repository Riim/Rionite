let { EventEmitter, cellx, utils: { logError, mixin, createClass } } = require('cellx');
let morphdom = require('morphdom');
let { next: nextUID } = require('./uid');

let KEY_VIEW = '__rista_View_view__';
if (window.Symbol && typeof Symbol.iterator == 'symbol') {
	KEY_VIEW = Symbol(KEY_VIEW);
}

let viewClasses = Object.create(null);

/**
 * @typesign (name: string): Function|undefined;
 */
function getViewClass(name) {
	return viewClasses[name];
}

/**
 * @typesign (name: string, viewClass: Function): Function;
 */
function registerViewClass(name, viewClass) {
	if (viewClasses[name]) {
		throw new TypeError('ViewClass "' + name + '" is already registered');
	}

	Object.defineProperty(viewClass, '$viewClass', {
		value: name
	});

	viewClasses[name] = viewClass;

	return viewClass;
}

/**
 * @typesign (name: string, description: {
 *     render?: (): string,
 *     init?: (),
 *     dispose?: ()
 * });
 */
function defineView(name, description) {
	function CustomView(block) {
		View.call(this, block);
	}

	let proto = CustomView.prototype = Object.create(View.prototype);

	mixin(proto, description);
	proto.constructor = CustomView;

	if (description.render) {
		proto._content = cellx(function() {
			return this.render();
		});
	}

	viewClasses[name] = CustomView;
}

/**
 * @typesign new (block: HTMLElement): rista.View;
 */
let View = createClass({
	Extends: EventEmitter,

	Static: {
		KEY_VIEW,

		get: getViewClass,
		register: registerViewClass,

		define: defineView
	},

	/**
	 * @type {Array<{ dispose: () }>}
	 */
	_disposables: null,

	/**
	 * Корневой элемент вьюшки.
	 * @type {HTMLElement}
	 */
	block: null,

	/**
	 * @type {cellx<string>}
	 */
	_content: undefined,

	destroyed: false,

	constructor(block) {
		if (block[KEY_VIEW]) {
			throw new TypeError('Element is already used as a block of view');
		}

		this._disposables = Object.create(null);

		this.block = block;
		block[KEY_VIEW] = this;

		if (this._content) {
			block.innerHTML = this._content();
			this._content('on', 'change', this._onContentChange);
		}

		if (this.init) {
			this.init();
		}
	},

	/**
	 * @override
	 */
	_handleEvent(evt) {
		EventEmitter.prototype._handleEvent.call(this, evt);

		let parent = this.getParent();

		if (parent && evt.bubbles !== false && !evt.isPropagationStopped) {
			parent._handleEvent(evt);
		}
	},

	_onContentChange() {
		let el = document.createElement('div');
		el.innerHTML = this._content();
		morphdom(this.block, el, { childrenOnly: true });
	},

	/**
	 * @typesign (method: string, ...args?: Array): Array;
	 */
	broadcast(method) {
		let args = Array.prototype.slice.call(arguments, 1);

		return this.getDescendants().map(descendant => {
			if (typeof descendant[method] == 'function' && !descendant.destroyed) {
				return descendant[method].apply(descendant, args);
			}
		});
	},

	/**
	 * @typesign (): HTMLElement|null;
	 */
	getParent() {
		let node = this.block;

		while (node = node.parentNode) {
			if (node[KEY_VIEW]) {
				return node[KEY_VIEW];
			}
		}

		return null;
	},

	/**
	 * @typesign (): Array<HTMLElement>;
	 */
	getDescendants() {
		return Array.prototype.filter.call(this.block.querySelectorAll('[rt-view]'), block => block[KEY_VIEW]);
	},

	listenTo(target, type, listener, context) {
		let listenings;

		if (Array.isArray(target) || (target.addClass && target.append)) {
			listenings = [];

			for (let i = 0, l = target.length; i < l; i++) {
				listenings.push(this.listenTo(target[i], type, listener, context));
			}
		} else if (typeof type == 'object') {
			if (Array.isArray(type)) {
				let types = type;

				listenings = [];

				for (let i = 0, l = types.length; i < l; i++) {
					listenings.push(this.listenTo(target, types[i], listener, context));
				}
			} else {
				let listeners = type;

				context = listener;
				listenings = [];

				for (let type in listeners) {
					listenings.push(this.listenTo(target, type, listeners[type], context));
				}
			}
		} else if (Array.isArray(listener)) {
			let listeners = listener;

			listenings = [];

			for (let i = 0, l = listeners.length; i < l; i++) {
				listenings.push(this.listenTo(target, type, listeners[i], context));
			}
		} else if (typeof listener == 'object') {
			let listeners = listener;

			listenings = [];

			for (let name in listeners) {
				listenings.push(this.listenTo(target[name]('unwrap', 0), type, listeners[name], context));
			}
		} else {
			return this._listenTo(target, type, listener, context);
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
	 *     listener: (evt: cellx~Event): boolean|undefined,
	 *     context?: Object
	 * );
	 */
	_listenTo: function(target, type, listener, context) {
		if (!context) {
			context = this;
		}

		if (target instanceof EventEmitter) {
			target.on(type, listener, context);
		} else if (typeof target.addEventListener == 'function') {
			if (target != context) {
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
	 * @typesign (cb: Function): Function{ cancel: (), dispose: () };
	 */
	registerCallback(cb) {
		let id = nextUID();

		let callback = () => {
			if (this._disposables[id]) {
				delete this._disposables[id];
				return cb.apply(this, arguments);
			}
		};

		let cancelCallback = () => {
			delete this._disposables[id];
		};

		callback.cancel = cancelCallback;
		callback.dispose = cancelCallback;

		this._disposables[id] = callback;

		return callback;
	},

	/**
	 * @typesign (cb: Function, delay: uint): { clear: (), dispose: () };
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
	 * @typesign (cb: Function, delay: uint): { clear: (), dispose: () };
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
	 * @typesign ();
	 */
	destroy() {
		this.block[KEY_VIEW] = null;

		if (this._content) {
			this._content('off', 'change', this._onContentChange);
		}

		let disposables = this._disposables;

		for (let id in disposables) {
			disposables[id].dispose();
		}

		if (this.dispose) {
			try {
				this.dispose();
			} catch (err) {
				logError(err);
			}
		}

		this.destroyed = true;
	}
});

module.exports = View;
