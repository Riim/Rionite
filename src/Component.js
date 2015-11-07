let { EventEmitter, cellx, utils: { logError, mixin, createClass } } = require('cellx');
let morphdom = require('morphdom');
let settings = require('./settings');
let nextUID = require('./nextUID');
let hasClass = require('./hasClass');

let KEY_COMPONENT = '__rista_Component_component__';
if (window.Symbol && typeof Symbol.iterator == 'symbol') {
	KEY_COMPONENT = Symbol(KEY_COMPONENT);
}

/**
 * @typesign (str: string): string;
 */
function toCamelCase(str) {
	return str.replace(/[^$0-9a-zA-Z]([$0-9a-zA-Z])/g, function(match, chr) {
		return chr.toUpperCase();
	});
}

let componentSubclasses = Object.create(null);

/**
 * @typesign (id: string): Function|undefined;
 */
function getComponentSubclass(id) {
	return componentSubclasses[id];
}

/**
 * @typesign (id: string, componentSubclass: Function): Function;
 */
function registerComponentSubclass(id, componentSubclass) {
	if (componentSubclasses[id]) {
		throw new TypeError('Component "' + id + '" is already registered');
	}

	componentSubclasses[id] = componentSubclass;

	return componentSubclass;
}

/**
 * @typesign (id: string, description: {
 *     preinit?: (),
 *     render?: (): string,
 *     init?: (),
 *     dispose?: ()
 * }): Function;
 */
function defineComponentSubclass(id, description) {
	let constr = Function(
		'Component',
		`return function ${toCamelCase('#' + id)}(block) { Component.call(this, block); };`
	)(Component);

	let proto = constr.prototype = Object.create(Component.prototype);

	mixin(proto, description);
	proto.constructor = constr;

	if (!proto.blockName) {
		proto.blockName = toCamelCase(id);
	}

	return registerComponentSubclass(id, constr);
}

/**
 * @class rista.Component
 * @extends {cellx.EventEmitter}
 *
 * @typesign new (block: HTMLElement): rista.Component;
 */
let Component = createClass({
	Extends: EventEmitter,

	Static: {
		KEY_COMPONENT,

		getSubclass: getComponentSubclass,
		registerSubclass: registerComponentSubclass,

		defineSubclass: defineComponentSubclass
	},

	/**
	 * @type {Array<{ dispose: () }>}
	 */
	_disposables: null,

	/**
	 * For override.
	 * @type {string}
	 */
	blockName: undefined,

	/**
	 * Корневой элемент компонента.
	 * @type {HTMLElement}
	 */
	block: null,

	/**
	 * @final
	 * @type {cellx<string>}
	 */
	_content: cellx(function() {
		return this.render();
	}),

	destroyed: false,

	constructor(block) {
		if (block[KEY_COMPONENT]) {
			throw new TypeError('Element is already used as a block of component');
		}

		this._disposables = {};

		this.block = block;
		block[KEY_COMPONENT] = this;

		if (!hasClass(block, this.blockName)) {
			block.className = `${this.blockName} ${block.className}`;
		}

		if (this.preinit) {
			this.preinit();
		}

		if (this.render) {
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
			if (!parent.destroyed) {
				parent._handleEvent(evt);
			}
		}
	},

	/**
	 * For override.
	 */
	preinit: null,

	/**
	 * For override.
	 */
	render: null,

	/**
	 * For override.
	 */
	init: null,

	/**
	 * For override.
	 */
	dispose: null,

	_onContentChange() {
		let el = document.createElement('div');
		el.innerHTML = this._content();

		morphdom(this.block, el, {
			childrenOnly: true,

			getNodeKey(node) {
				if (node.id) {
					return node.id;
				}

				if (node.nodeType == 1) {
					if (node.hasAttribute('key')) {
						return node.getAttribute('key');
					}

					if (node.hasAttribute('rt-is')) {
						return node.getAttribute('rt-is') + JSON.stringify(node.dataset);
					}
				}
			},

			onBeforeMorphEl(fromEl, toEl) {
				if (fromEl[KEY_COMPONENT]) {
					return false;
				}
			},

			onNodeDiscarded(node) {
				if (node[KEY_COMPONENT]) {
					node[KEY_COMPONENT].destroy();
				}
			}
		});
	},

	/**
	 * @typesign (): HTMLElement|null;
	 */
	getParent() {
		let node = this.block;

		while (node = node.parentNode) {
			if (node[KEY_COMPONENT]) {
				return node[KEY_COMPONENT];
			}
		}

		return null;
	},

	/**
	 * @typesign (): Array<HTMLElement>;
	 */
	getDescendants() {
		return Array.prototype.map.call(this.block.querySelectorAll('[rt-is]'), block => block[KEY_COMPONENT])
			.filter(component => component);
	},

	/**
	 * @typesign (selector: string): $|NodeList;
	 */
	$(selector) {
		selector = selector.split('&');

		selector = selector.length == 1 ?
			selector[0] :
			selector.join(`.${this.blockName}${settings.blockElementDelimiter}`);

		if (typeof $ == 'function' && $.fn) {
			return $(this.block).find(selector);
		}

		return this.block.querySelectorAll(selector);
	},

	/**
	 * @typesign (method: string, ...args?: Array): Array;
	 */
	broadcast(method) {
		let args = Array.prototype.slice.call(arguments, 1);

		return this.getDescendants().map(descendant => {
			if (!descendant.destroyed && typeof descendant[method] == 'function') {
				return descendant[method].apply(descendant, args);
			}
		});
	},

	listenTo(target, type, listener, context) {
		let listenings;

		if (Array.isArray(target) || (target.addClass && target.append)) {
			listenings = [];

			for (let i = 0, l = target.length; i < l; i++) {
				listenings.push(this.listenTo(target[i], type, listener, context));
			}
		} else if (typeof type == 'object') {
			listenings = [];

			if (Array.isArray(type)) {
				let types = type;

				for (let i = 0, l = types.length; i < l; i++) {
					listenings.push(this.listenTo(target, types[i], listener, context));
				}
			} else {
				let listeners = type;

				context = listener;

				for (let type in listeners) {
					listenings.push(this.listenTo(target, type, listeners[type], context));
				}
			}
		} else if (Array.isArray(listener)) {
			listenings = [];

			let listeners = listener;

			for (let i = 0, l = listeners.length; i < l; i++) {
				listenings.push(this.listenTo(target, type, listeners[i], context));
			}
		} else if (typeof listener == 'object') {
			listenings = [];

			let listeners = listener;

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
	 * ): { stop: (), dispose: () };
	 */
	_listenTo(target, type, listener, context) {
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
	 * @typesign (cb: Function, delay: uint): { clear: (), dispose: () };
	 */
	setTimeout(cb, delay) {
		let id = nextUID();

		let timeoutId = setTimeout(() => {
			delete this._disposables[id];
			cb.call(this);
		}, delay);

		let _clearTimeout = () => {
			if (this._disposables[id]) {
				clearTimeout(timeoutId);
				delete this._disposables[id];
			}
		};

		let timeout = this._disposables[id] = {
			clear: _clearTimeout,
			dispose: _clearTimeout
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

		let _clearInterval = () => {
			if (this._disposables[id]) {
				clearInterval(intervalId);
				delete this._disposables[id];
			}
		};

		let interval = this._disposables[id] = {
			clear: _clearInterval,
			dispose: _clearInterval
		};

		return interval;
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
	 * @typesign ();
	 */
	destroy() {
		if (this.destroyed) {
			return;
		}

		this._content('dispose', 0);

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

		this.block[KEY_COMPONENT] = null;

		this.destroyed = true;
	}
});

module.exports = Component;
