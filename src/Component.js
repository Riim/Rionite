let { EventEmitter, Cell, js: { is }, utils: { mixin, createClass } } = require('cellx');
let DisposableMixin = require('./DisposableMixin');
let Attributes = require('./Attributes');
let Properties = require('./Properties');
let renderInner = require('./renderInner');
let morphComponentElement = require('./morphComponentElement');
let eventTypes = require('./eventTypes');
let camelize = require('./utils/camelize');

let createObject = Object.create;
let getPrototypeOf = Object.getPrototypeOf;
let defineProperty = Object.defineProperty;
let hasOwn = Object.prototype.hasOwnProperty;
let isArray = Array.isArray;

let reClosedCustomElementTag = /<(\w+(?:\-\w+)+)([^>]*)\/>/g;

/**
 * @typesign (evt: Event|cellx~Event);
 */
function onEvent(evt) {
	let node;
	let attrName;
	let targets = [];

	if (evt instanceof Event) {
		node = evt.target;
		attrName = 'rt-' + evt.type;
	} else {
		node = evt.target.element;
		attrName = 'rt-component-' + evt.type;
	}

	for (;;) {
		if (node.nodeType == 1 && node.hasAttribute(attrName)) {
			targets.unshift(node);
		}

		node = node.parentNode;

		if (!node) {
			break;
		}

		let component = node.ristaComponent;

		if (!component) {
			continue;
		}

		for (let i = targets.length; i;) {
			let target = targets[--i];
			let handler = component[target.getAttribute(attrName)];

			if (typeof handler == 'function') {
				handler.call(component, evt, target);
				targets.splice(i, 1);
			}
		}
	}
}

let currentElement = null;

let elementProtoMixin = {
	get ristaComponent() {
		currentElement = this;
		let component = new this._ristaComponentConstr();
		currentElement = null;
		return component;
	},

	attachedCallback() {
		this.ristaComponent._elementAttached.set(true);
		Cell.forceRelease();
	},

	detachedCallback() {
		this.ristaComponent._elementAttached.set(false);
	},

	attributeChangedCallback(name, oldValue, value) {
		let component = this.ristaComponent;
		let attrs = component.elementAttributes;
		let privateName = '_' + name;

		if (hasOwn.call(attrs, privateName)) {
			let attrValue = attrs[privateName];
			let handledOldValue = attrValue.get();

			attrValue.set(value);

			if (component.isReady) {
				let handledValue = attrValue.get();

				if (!is(handledValue, handledOldValue)) {
					component.emit({
						type: `element-attribute-${ name }-change`,
						oldValue: handledOldValue,
						value: handledValue
					});
					component.emit({
						type: 'element-attribute-change',
						name: name,
						oldValue: handledOldValue,
						value: handledValue
					});

					if (component.elementAttributeChanged) {
						component.elementAttributeChanged(name, handledOldValue, handledValue);
					}
				}
			}
		}
	}
};

let Component = EventEmitter.extend({
	Implements: [DisposableMixin],

	Static: {
		/**
		 * @this {Function}
		 *
		 * @typesign (elementTagName: string, description: {
		 *     Implements?: Array<Object|Function>,
		 *     Static?: {
		 *         elementAttributes?: Object,
		 *         [key: string]
		 *     },
		 *     constructor?: Function,
		 *     [key: string]
		 * }) -> Function;
		 */
		extend(elementTagName, description) {
			description.Extends = this;
			description.elementTagName = elementTagName;

			let cl = createClass(description);
			let elementProto = createObject(HTMLElement.prototype);

			mixin(elementProto, elementProtoMixin);
			elementProto._ristaComponentConstr = cl;

			document.registerElement(elementTagName, { prototype: elementProto });

			return cl;
		},

		elementAttributes: {},

		morphComponentElement
	},

	/**
	 * @type {HTMLElement}
	 */
	element: null,

	/**
	 * @type {string}
	 */
	elementTagName: void 0,

	_elementAttributes: null,

	/**
	 * @type {Rista.Attributes}
	 */
	get elementAttributes() {
		return this._elementAttributes || (this._elementAttributes = new Attributes(this));
	},

	_props: null,

	/**
	 * @type {Rista.Properties}
	 */
	get props() {
		return this._props || (this._props = new Properties(this));
	},

	_elementInnerHTML: null,
	_lastAppliedElementInnerHTML: void 0,

	_elementAttached: null,

	initialized: false,
	isReady: false,

	template: null,

	constructor: function Component(props) {
		EventEmitter.call(this);
		DisposableMixin.call(this);

		if (this.constructor.prototype == Component.prototype) {
			throw new TypeError('Component is abstract class');
		}

		let el = this.element = currentElement || document.createElement(this.elementTagName);

		defineProperty(el, 'ristaComponent', {
			value: this
		});

		if (this.template || this.renderInner !== renderInner) {
			this._elementInnerHTML = new Cell(function() {
				let html = this.renderInner();
				return (isArray(html) ? html.join('') : html).replace(reClosedCustomElementTag, '<$1$2></$1>');
			}, {
				owner: this
			});
		}

		this._elementAttached = new Cell(false, {
			owner: this,
			onChange: this._onElementAttachedChange
		});

		if (props) {
			let properties = this.props;

			for (let name in props) {
				properties[camelize(name)] = props[name];
			}
		}

		if (this.created) {
			this.created();
		}
	},

	/**
	 * @override
	 */
	_handleEvent(evt) {
		EventEmitter.prototype._handleEvent.call(this, evt);

		if (evt.bubbles !== false && !evt.isPropagationStopped) {
			let parent = this.getParent();

			if (parent) {
				parent._handleEvent(evt);
			} else {
				onEvent(evt);
			}
		}
	},

	/**
	 * @typesign () -> ?Rista.Component;
	 */
	getParent() {
		for (let node; node = (node || this.element).parentNode;) {
			if (node.ristaComponent) {
				return node.ristaComponent;
			}
		}

		return null;
	},

	_onElementInnerHTMLChange() {
		this.update();
	},

	_onElementAttachedChange({ value: attached }) {
		if (attached && !this.initialized) {
			this.initialized = true;

			if (this.initialize) {
				this.initialize();
			}
		}

		if (this._elementInnerHTML) {
			this._elementInnerHTML[attached ? 'on' : 'off']('change', this._onElementInnerHTMLChange);
		}

		if (attached) {
			this.update();

			if (!this.isReady) {
				this.isReady = true;

				for (let proto = this.constructor.prototype; ;) {
					this.element.className += ' ' + proto.elementTagName;
					proto = getPrototypeOf(proto);

					if (proto == Component.prototype) {
						break;
					}
				}

				let attributesSchema = this.constructor.elementAttributes;
				let attrs = this.elementAttributes;

				for (let name in attributesSchema) {
					if (typeof attributesSchema[name] != 'function') {
						let camelizedName = camelize(name);
						attrs[camelizedName] = attrs[camelizedName];
					}
				}

				if (this.ready) {
					this.ready();
				}
			}

			if (this.elementAttached) {
				this.elementAttached();
			}
		} else {
			this.dispose();

			if (this.elementDetached) {
				this.elementDetached();
			}
		}
	},

	/**
	 * @typesign () -> string|Array<string>;
	 */
	renderInner,

	/**
	 * @typesign () -> Rista.Component;
	 */
	update() {
		if (!this._elementInnerHTML) {
			return this;
		}

		let html = this._elementInnerHTML.get();

		if (html == (this._lastAppliedElementInnerHTML || '')) {
			return this;
		}

		let toEl = document.createElement('div');
		toEl.innerHTML = html;

		morphComponentElement(this, toEl);

		this._lastAppliedElementInnerHTML = html;

		return this;
	},

	/**
	 * @typesign (selector: string) -> $|NodeList;
	 */
	$(selector) {
		selector = selector.split('&').join('.' + this.elementTagName);

		return typeof $ == 'function' && $.fn ?
			$(this.element).find(selector) :
			this.element.querySelectorAll(selector);
	}
});

module.exports = Component;

document.addEventListener('DOMContentLoaded', function onDOMContentLoaded() {
	document.removeEventListener('DOMContentLoaded', onDOMContentLoaded);

	eventTypes.forEach(type => {
		document.addEventListener(type, onEvent);
	});
});
