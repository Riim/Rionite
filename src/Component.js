let { EventEmitter, cellx, utils: { logError, mixin, createClass } } = require('cellx');
let settings = require('./settings');
let nextUID = require('./nextUID');
let hasClass = require('./hasClass');
let morphElement = require('./morphElement');

let KEY_COMPONENT = '__rista_component__';
let KEY_INITIAL_KEY = '__rista_initialKey__';

/**
 * @typesign (name: string);
 */
function checkName(name) {
	if (!/^[a-z](?:\-?[0-9a-z])*$/i.test(name)) {
		throw new TypeError(`Component name "${name}" is not valid`);
	}
}

/**
 * @typesign (name: string): string;
 */
function hyphenize(name) {
	return name[0].toLowerCase() + name.slice(1).replace(/([A-Z])/g, '-$1').replace('--', '-').toLowerCase();
}

/**
 * @typesign (name: string): string;
 */
function pascalize(name) {
	return name[0].toUpperCase() + name.slice(1).replace(/\-([0-9a-z])/gi, function(match, chr) {
		return chr.toUpperCase();
	});
}

let componentSubclasses = Object.create(null);
let selector = '[rt-is]';

/**
 * @typesign (name: string): Function|undefined;
 */
function getComponentSubclass(name) {
	return componentSubclasses[hyphenize(name)];
}

function _registerComponentSubclass(name, componentSubclass) {
	if (componentSubclasses[name]) {
		throw new TypeError(`Component "${name}" is already registered`);
	}

	componentSubclasses[name] = componentSubclass;
	selector += ', ' + name;

	return componentSubclass;
}

/**
 * @typesign (name: string, componentSubclass: Function): Function;
 */
function registerComponentSubclass(name, componentSubclass) {
	checkName(name);
	return _registerComponentSubclass(hyphenize(name), componentSubclass);
}

/**
 * @typesign (name: string, description: {
 *     blockName?: string,
 *     preinit?: (),
 *     render?: (): string,
 *     init?: (),
 *     dispose?: ()
 * }): Function;
 */
function defineComponentSubclass(name, description) {
	checkName(name);

	let pName = pascalize(name);
	let hName = hyphenize(name);

	let constr = Function(
		'Component',
		`return function ${pName}(block) { Component.call(this, block); };`
	)(Component);

	let proto = constr.prototype = Object.create(Component.prototype);

	mixin(proto, description);
	proto.constructor = constr;

	if (!proto.blockName) {
		switch (settings.blockNameCase) {
			case 'camel': {
				proto.blockName = pName[0].toLowerCase() + pName.slice(1);
				break;
			}
			case 'pascal': {
				proto.blockName = pName;
				break;
			}
			case 'hyphen': {
				proto.blockName = hName;
				break;
			}
		}
	}

	return _registerComponentSubclass(hName, constr);
}

/**
 * @typesign (block: HTMLElement): string;
 */
function getBlockKey(block) {
	let attrs = block.attributes;
	let key = [];

	for (let i = attrs.length; i;) {
		let attr = attrs[--i];
		key.push(attr.name + '=' + attr.value);
	}

	return JSON.stringify(key.sort());
}

/**
 * @typesign (component: rista.Component);
 */
function morphComponentContent(component) {
	let el = document.createElement('div');
	el.innerHTML = component._componentContent();

	morphElement(component.block, el, {
		contentOnly: true,

		getElementKey(el) {
			if (el.hasAttribute('key')) {
				return el.getAttribute('key');
			}

			if (el.hasAttribute('rt-is') || getComponentSubclass(el.tagName.toLowerCase())) {
				let key = el[KEY_INITIAL_KEY];

				if (key) {
					return key;
				}

				key = el[KEY_INITIAL_KEY] = getBlockKey(el);

				return key;
			}
		},

		onBeforeMorphElement(el) {
			if (el[KEY_COMPONENT]) {
				return false;
			}
		},

		onBeforeMorphElementContent(el) {
			if (!el[KEY_INITIAL_KEY] && (el.hasAttribute('rt-is') || getComponentSubclass(el.tagName.toLowerCase()))) {
				el[KEY_INITIAL_KEY] = getBlockKey(el);
			}
		},

		onNodeDiscarded(node) {
			if (node[KEY_COMPONENT]) {
				node[KEY_COMPONENT].destroy();
			}
		}
	});
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

		defineSubclass: defineComponentSubclass,

		getSelector() {
			return selector;
		}
	},

	/**
	 * For override.
	 * @type {string}
	 */
	blockName: undefined,

	/**
	 * @final
	 * @type {cellx<string>}
	 */
	_componentContent: cellx(function() {
		let content = this.render();
		return Array.isArray(content) ? content.join('') : content;
	}),

	constructor(block) {
		if (block[KEY_COMPONENT]) {
			throw new TypeError('Element is already used as a block of component');
		}

		/**
		 * @type {Array<{ dispose: () }>}
		 */
		this._disposables = {};

		/**
		 * Корневой элемент компонента.
		 * @type {HTMLElement}
		 */
		this.block = block;
		block[KEY_COMPONENT] = this;

		this.destroyed = false;

		if (!hasClass(block, this.blockName)) {
			block.className = `${this.blockName} ${block.className}`;
		}

		if (this.preinit) {
			this.preinit();
		}

		if (this.render) {
			morphComponentContent(this);
			this._componentContent('on', 'change', this._onComponentContentChange);
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

	_onComponentContentChange() {
		morphComponentContent(this);
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
		return Array.prototype.map.call(this.block.querySelectorAll(selector), block => block[KEY_COMPONENT])
			.filter(component => component);
	},

	/**
	 * @typesign (selector: string): $|NodeList;
	 */
	$(selector) {
		selector = selector.split('&');

		selector = selector.length == 1 ?
			selector[0] :
			selector.join('.' + this.blockName);

		if (typeof $ == 'function' && $.fn) {
			return $(this.block).find(selector);
		}

		return this.block.querySelectorAll(selector);
	},

	/**
	 * @typesign (name: string): rista.Component;
	 */
	$$(name) {
		let els = this.block.querySelectorAll(`[name=${name}]`);
		let components = [];

		for (let i = 0, l = els.length; i < l; i++) {
			let component = els[i][KEY_COMPONENT];

			if (component) {
				components.push(component);
			}
		}

		return components;
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
		let _this = this;

		let callback = function() {
			if (_this._disposables[id]) {
				delete _this._disposables[id];
				return cb.apply(_this, arguments);
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

		this._componentContent('dispose', 0);

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
