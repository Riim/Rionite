import { EventEmitter, JS, Utils } from 'cellx';
import DisposableMixin from './DisposableMixin';
import ElementAttributes from './ElementAttributes';
import registerComponent from './registerComponent';
import setElementClasses from './setElementClasses';
import initAttributes from './initAttributes';
import bind from './bind';
import attachChildComponentElements from './attachChildComponentElements';
import defineAssets from './defineAssets';
import listenAssets from './listenAssets';
import eventTypes from './eventTypes';
import onEvent from './onEvent';
import { KEY_MARKUP_BLOCK_NAMES } from './keys';
import { map } from './JS/Array';
import camelize from './Utils/camelize';
import htmlToFragment from './Utils/htmlToFragment';

let Symbol = JS.Symbol;
let createClass = Utils.createClass;

let KEY_RAW_CONTENT = Symbol('Rionite.Component.rawContent');
let KEY_SILENT = Symbol('Rionite.Component#silent');

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

		[KEY_MARKUP_BLOCK_NAMES]: [],

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

	assets: null,

	isElementAttached: false,

	initialized: false,
	isReady: false,

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

		let silent = this[KEY_SILENT];

		if (silent === void 0) {
			silent = this[KEY_SILENT] = this.element.hasAttribute('rt-silent');
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
		let rawContent = constr[KEY_RAW_CONTENT];
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
					rawContent = constr[KEY_RAW_CONTENT] = htmlToFragment(
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

			this._initAssets();
		}

		if (!this.isReady) {
			if (!rawContent) {
				this._initAssets();
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

	_initAssets() {
		this.assets = Object.create(null);

		let assetsConfig = this.constructor.assets;

		if (assetsConfig) {
			defineAssets(this, assetsConfig);
			listenAssets(this, assetsConfig);
		}
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
		return selector.length == 1 ? selector[0] : selector.join('.' + this.constructor[KEY_MARKUP_BLOCK_NAMES][0]);
	}
});

document.addEventListener('DOMContentLoaded', function onDOMContentLoaded() {
	document.removeEventListener('DOMContentLoaded', onDOMContentLoaded);

	eventTypes.forEach(type => {
		document.addEventListener(type, onEvent);
	});
});

export default Component;
