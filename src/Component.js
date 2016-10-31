import { EventEmitter, JS, Utils } from 'cellx';
import DisposableMixin from './DisposableMixin';
import ElementAttributes from './ElementAttributes';
import registerComponent from './registerComponent';
import setElementClasses from './setElementClasses';
import initAttributes from './initAttributes';
import bind from './bind';
import attachChildComponentElements from './attachChildComponentElements';
import bindEvents from './bindEvents';
import eventTypes from './eventTypes';
import onEvent from './onEvent';
import { map } from './JS/Array';
import camelize from './Utils/camelize';
import htmlToFragment from './Utils/htmlToFragment';

let Map = JS.Map;
let createClass = Utils.createClass;

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
		register: registerComponent,

		extend: function extend(elIs, description) {
			description.Extends = this;
			(description.Static || (description.Static = {})).elementIs = elIs;
			return registerComponent(createClass(description));
		},

		elementIs: void 0,
		elementExtends: void 0,

		elementAttributes: null,
		props: null,

		i18n: null,

		template: null,

		_rawContent: null,

		_markupBlockNames: null,
		_assetClassNames: null,

		events: null
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

		Object.defineProperty(this, 'elementAttributes', {
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
		let props = Object.create(this.elementAttributes);

		props.content = null;
		props.context = null;

		Object.defineProperty(this, 'props', {
			configurable: true,
			enumerable: true,
			writable: true,
			value: props
		});

		return props;
	},

	_bindings: null,

	_assets: null,

	isElementAttached: false,

	initialized: false,
	isReady: false,

	_isComponentSilent: void 0,

	constructor: function Component(el, props) {
		EventEmitter.call(this);
		DisposableMixin.call(this);

		if (el == null) {
			el = document.createElement(this.constructor.elementIs);
		} else if (typeof el == 'string') {
			let elIs = this.constructor.elementIs;
			let html = el;

			el = document.createElement(elIs);
			el.innerHTML = html;

			let firstChild = el.firstChild;

			if (
				firstChild == el.lastChild && firstChild.nodeType == 1 &&
					firstChild.tagName.toLowerCase() == elIs
			) {
				el = firstChild;
			}
		}

		this.element = el;

		el.rioniteComponent = this;
		Object.defineProperty(el, '$c', { value: this });

		if (props) {
			let properties = this.props;

			for (let name in props) {
				properties[camelize(name)] = props[name];
			}
		}

		this.created();
	},

	/**
	 * @override
	 */
	_handleEvent(evt) {
		EventEmitter.prototype._handleEvent.call(this, evt);

		let silent = this._isComponentSilent;

		if (silent === void 0) {
			silent = this._isComponentSilent = this.element.hasAttribute('rt-silent');
		}

		if (!silent && evt.bubbles !== false && !evt.isPropagationStopped) {
			let parentComponent = this.parentComponent;

			if (parentComponent) {
				parentComponent._handleEvent(evt);
			} else {
				onEvent(evt);
			}
		}
	},

	_attachElement() {
		if (!this.initialized) {
			this.initialize();
			this.initialized = true;
		}

		let constr = this.constructor;
		let rawContent = constr._rawContent;
		let el = this.element;

		if (this.isReady) {
			if (rawContent) {
				for (let child; (child = el.firstChild);) {
					el.removeChild(child);
				}
			}
		} else {
			setElementClasses(el, constr);
			initAttributes(this, constr);

			let template = constr.template;

			if (template != null) {
				if (!rawContent) {
					rawContent = constr._rawContent = htmlToFragment(
						typeof template == 'string' ? template : template.render(constr)
					);
				}

				let inputContent = this.props.content = document.createDocumentFragment();

				for (let child; (child = el.firstChild);) {
					inputContent.appendChild(child);
				}
			}
		}

		if (rawContent) {
			let content = rawContent.cloneNode(true);
			let { bindings, childComponents } = bind(content, this);

			this._bindings = bindings;

			this.element.appendChild(content);

			if (childComponents) {
				attachChildComponentElements(childComponents);
			}

			bindEvents(this, constr.events);
		}

		if (!this.isReady) {
			if (!rawContent) {
				bindEvents(this, constr.events);
			}

			this.ready();
			this.isReady = true;
		}

		this.elementAttached();
	},

	_detachElement() {
		this.dispose();
		this.elementDetached();
	},

	/**
	 * @override
	 */
	dispose() {
		this._destroyBindings();
		DisposableMixin.prototype.dispose.call(this);
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

	// Callbacks

	created,
	initialize,
	ready,
	elementAttached,
	elementDetached,
	elementMoved,
	elementAttributeChanged,

	// Utils

	/**
	 * @typesign (name: string, opts?: {
	 *     container?: Rionite.Component|HTMLElement,
	 *     useCache?: boolean,
	 *     all?: boolean
	 * }) -> ?Rionite.Component|HTMLElement;
	 *
	 * @typesign (name: string, useCache?: boolean) -> ?Rionite.Component|HTMLElement;
	 */
	$(name, opts) {
		if (typeof opts == 'boolean') {
			opts = { useCache: opts };
		}

		let useCache = !opts || opts.useCache !== false;
		let all = opts && opts.all;

		let assets = this._assets || (this._assets = new Map());
		let asset = useCache && assets.get(all ? name + '*' : name);

		if (!asset) {
			let container = opts && opts.container;

			let constr = this.constructor;
			let className = constr._assetClassNames[name];
			let containerEl = container ?
				(container instanceof Component ? container.element : container) :
				this.element;
			let els;

			if (className) {
				els = containerEl.getElementsByClassName(className);
			} else {
				let markupBlockNames = constr._markupBlockNames;

				for (let i = markupBlockNames.length; i;) {
					className = markupBlockNames[--i] + '__' + name;

					els = containerEl.getElementsByClassName(className);

					if (els.length) {
						constr._assetClassNames[name] = className;
						break;
					}
				}
			}

			if (all) {
				assets.set(name + '*', els);
				return els;
			}

			let assetEl = els[0];

			asset = assetEl ? assetEl.$c || assetEl : null;
			assets.set(name, asset);
		}

		return asset;
	},

	/**
	 * @typesign (name: string, opts?: {
	 *     container?: Rionite.Component|HTMLElement,
	 *     useCache?: boolean
	 * }) -> Array<Rionite.Component|HTMLElement>;
	 *
	 * @typesign (name: string, useCache?: boolean) -> Array<Rionite.Component|HTMLElement>;
	 */
	$$(name, opts) {
		if (typeof opts == 'boolean') {
			opts = { useCache: opts };
		}

		return map.call(this.$(name, { __proto__: opts, all: true }), el => el.$c || el);
	}
});

document.addEventListener('DOMContentLoaded', function onDOMContentLoaded() {
	document.removeEventListener('DOMContentLoaded', onDOMContentLoaded);

	eventTypes.forEach(type => {
		document.addEventListener(type, onEvent);
	});
});

export default Component;
