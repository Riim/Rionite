let { EventEmitter, Cell, js: { Symbol }, utils: { createClass } } = require('cellx');
let DisposableMixin = require('./DisposableMixin');
let ElementAttributes = require('./ElementAttributes');
let registerComponent = require('./registerComponent');
let bind = require('./bind');
let defineAssets = require('./defineAssets');
let listenAssets = require('./listenAssets');
let eventTypes = require('./eventTypes');
let onEvent = require('./onEvent');
let camelize = require('./utils/camelize');
let defer = require('./utils/defer');
let htmlToFragment = require('./utils/htmlToFragment');

let createObject = Object.create;
let getPrototypeOf = Object.getPrototypeOf;
let defineProperty = Object.defineProperty;
let map = Array.prototype.map;

let KEY_RAW_CONTENT = Symbol('rawContent');

let reClosedCustomElementTag = /<(\w+(?:\-\w+)+)([^>]*)\/>/g;

function created() {}
function initialize() {}
function ready() {}
function elementAttached() {}
function elementDetached() {}
function elementMoved() {}
function elementAttributeChanged() {}

let Component = EventEmitter.extend({
	Implements: [DisposableMixin],

	Static: {
		extend(elementIs, description) {
			description.Extends = this;

			let Static = description.Static || (description.Static = {});

			Static.elementIs = elementIs;

			let elementAttributes = Static.elementAttributes;
			let props = Static.props;

			if (props) {
				if (props.content) {
					throw new TypeError('It is not necessary to declare property "content"');
				}
				if (props.context) {
					throw new TypeError('It is not necessary to declare property "context"');
				}

				if (!elementAttributes) {
					Static.elementAttributes = props;
				}
			} else if (elementAttributes) {
				Static.props = elementAttributes;
			}

			return registerComponent(createClass(description));
		},

		template: null,

		elementIs: void 0,
		elementExtends: void 0,

		elementAttributes: null,
		props: null,

		assets: null
	},

	/**
	 * @type {?Rionite.Component}
	 */
	ownerComponent: null,

	_parentComponent: null,

	/**
	 * @type {?Rionite.Component}
	 */
	get parentComponent() {
		if (this._parentComponent !== void 0) {
			return this._parentComponent;
		}

		for (let node; (node = (node || this.element).parentNode);) {
			if (node.$c) {
				return (this._parentComponent = node.$c);
			}
		}

		return (this._parentComponent = null);
	},

	/**
	 * @type {HTMLElement}
	 */
	element: null,

	/**
	 * @type {Rionite.ElementAttributes}
	 */
	get elementAttributes() {
		let attrs = new ElementAttributes(this.element);

		defineProperty(this, 'elementAttributes', {
			configurable: true,
			enumerable: true,
			writable: true,
			value: attrs
		});

		return attrs;
	},

	/**
	 * @type {Rionite.Properties}
	 */
	get props() {
		let props = createObject(this.elementAttributes);

		props.content = null;
		props.context = null;

		defineProperty(this, 'props', {
			configurable: true,
			enumerable: true,
			writable: true,
			value: props
		});

		return props;
	},

	_elementAttached: null,

	_bindings: null,

	initialized: false,
	isReady: false,

	_blockNameInMarkup: void 0,

	constructor: function Component(el, props) {
		EventEmitter.call(this);
		DisposableMixin.call(this);

		if (el == null) {
			el = document.createElement(this.constructor.elementIs);
		} else if (typeof el == 'string') {
			let elementIs = this.constructor.elementIs;
			let html = el;

			el = document.createElement(elementIs);
			el.innerHTML = html;

			let firstChild = el.firstChild;

			if (
				firstChild == el.lastChild && firstChild.nodeType == 1 &&
					firstChild.tagName.toLowerCase() == elementIs
			) {
				el = firstChild;
			}
		}

		this.element = el;

		defineProperty(el, '$c', { value: this });

		if (props) {
			let properties = this.props;

			for (let name in props) {
				properties[camelize(name)] = props[name];
			}
		}

		this._elementAttached = new Cell(false, {
			owner: this,
			onChange: this._onElementAttachedChange
		});

		this.created();
	},

	/**
	 * @override
	 */
	_handleEvent(evt) {
		EventEmitter.prototype._handleEvent.call(this, evt);

		if (evt.bubbles !== false && !evt.isPropagationStopped) {
			let parentComponent = this.parentComponent;

			if (parentComponent) {
				parentComponent._handleEvent(evt);
			} else {
				onEvent(evt);
			}
		}
	},

	_onElementAttachedChange(evt) {
		if (evt.value) {
			if (!this.initialized) {
				this.initialize();
				this.initialized = true;
			}

			let constr = this.constructor;
			let rawContent = constr[KEY_RAW_CONTENT];
			let el = this.element;

			if (this.isReady) {
				for (let child; (child = el.firstChild);) {
					el.removeChild(child);
				}
			} else {
				for (let c = constr; ;) {
					el.classList.add(c.elementIs);
					c = getPrototypeOf(c.prototype).constructor;

					if (c == Component) {
						break;
					}
				}

				let attrs = this.elementAttributes;
				let attributesConfig = constr.elementAttributes;

				for (let name in attributesConfig) {
					if (typeof attributesConfig[name] != 'function') {
						let camelizedName = camelize(name);
						attrs[camelizedName] = attrs[camelizedName];
					}
				}

				if (constr.template != null) {
					if (!rawContent) {
						let template = constr.template;

						if (typeof template != 'string') {
							template = template.render ? template.render(this) : template.call(this, this);
						}

						rawContent = constr[KEY_RAW_CONTENT] = htmlToFragment(
							template.replace(reClosedCustomElementTag, '<$1$2></$1>')
						);
					}

					let inputContent = this.props.content = document.createDocumentFragment();

					for (let child; (child = el.firstChild);) {
						inputContent.appendChild(child);
					}
				}
			}

			let content = rawContent && rawContent.cloneNode(true);

			if (content) {
				this._bindings = bind(content, this);
				this.element.appendChild(content);
			}

			if (!this.isReady || this.elementAttached !== elementAttached) {
				defer(() => {
					let assetsConfig = this.constructor.assets;

					if (!this.isReady) {
						if (assetsConfig) {
							defineAssets(this, assetsConfig);
						}

						this.ready();

						this.isReady = true;
					}

					if (assetsConfig) {
						listenAssets(this, assetsConfig);
					}

					this.elementAttached();
				});
			}
		} else {
			this.dispose();
			this._destroyBindings();
			this.elementDetached();
		}
	},

	_destroyBindings() {
		let bindings = this._bindings;

		if (bindings) {
			for (let i = bindings.length; i;) {
				bindings[--i].off();
			}

			this._bindings = null;
		}
	},

	created,
	initialize,
	ready,
	elementAttached,
	elementDetached,
	elementMoved,
	elementAttributeChanged,

	/**
	 * @typesign (selector: string) -> ?Rionite.Component|HTMLElement;
	 */
	$(selector) {
		let el = this.element.querySelector(this._prepareSelector(selector));
		return el && (el.$c || el);
	},

	/**
	 * @typesign (selector: string) -> Array<Rionite.Component|HTMLElement>;
	 */
	$$(selector) {
		return map.call(this.element.querySelectorAll(this._prepareSelector(selector)), el => el.$c || el);
	},

	_prepareSelector(selector) {
		selector = selector.split('&');

		if (selector.length == 1) {
			return selector[0];
		}

		let blockName = this._blockNameInMarkup;

		if (!blockName) {
			for (let constr = this.constructor; ;) {
				let parentConstr = getPrototypeOf(constr.prototype).constructor;

				if (constr.template !== parentConstr.template) {
					blockName = constr.elementIs;
					break;
				}

				if (parentConstr == Component) {
					blockName = this.constructor.elementIs;
					break;
				}

				constr = parentConstr;
			}

			this._blockNameInMarkup = blockName;
		}

		return selector.join('.' + blockName);
	}
});

module.exports = Component;

document.addEventListener('DOMContentLoaded', function onDOMContentLoaded() {
	document.removeEventListener('DOMContentLoaded', onDOMContentLoaded);

	eventTypes.forEach(type => {
		document.addEventListener(type, onEvent);
	});
});
