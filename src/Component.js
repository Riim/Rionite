let { EventEmitter, Cell, js: { Symbol }, utils: { mixin, createClass } } = require('cellx');
let morphElement = require('morph-element');
let camelize = require('./utils/camelize');
let Disposable = require('./Disposable');
let Attributes = require('./Attributes');
let Properties = require('./Properties');
// let eventTypes = require('./eventTypes');

let getPrototypeOf = Object.getPrototypeOf;
let hasOwn = Object.prototype.hasOwnProperty;
let isArray = Array.isArray;

let lastAppliedAttributes = Symbol('lastAppliedAttributes');

/**
 * @typesign (evt: Event|cellx~Event);
 */
function onEvent(evt) {
	let node = evt instanceof Event ? evt.target : evt.target.element;
	let attrName = 'rt-' + evt.type;
	let targets = [];

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
let currentComponent = null;

let elementProtoMixin = {
	ristaComponent: null,

	createdCallback() {
		if (currentComponent) {
			this.ristaComponent = currentComponent;
		} else {
			currentElement = this;
			this.ristaComponent = new this._ristaComponentConstr();
			currentElement = null;
		}
	},

	attachedCallback() {
		this.ristaComponent._elementAttached.set(true);
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
};

/**
 * @typesign () -> string;
 */
function renderInner() {
	let template = this.template;

	if (template) {
		return template.render ? template.render(this) : template.call(this, this);
	}

	return '';
}

let Component = EventEmitter.extend({
	Implements: [Disposable],

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
			let elementProto = Object.create(HTMLElement.prototype);

			mixin(elementProto, elementProtoMixin);
			elementProto._ristaComponentConstr = cl;

			document.registerElement(elementTagName, { prototype: elementProto });

			return cl;
		},

		elementAttributes: {}
	},

	element: null,

	elementTagName: void 0,

	_elementAttributes: null,

	get elementAttributes() {
		return this._elementAttributes || (this._elementAttributes = new Attributes(this));
	},

	_props: null,

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
		Disposable.call(this);

		let componentProto = Component.prototype;
		let proto = this.constructor.prototype;

		if (proto == componentProto) {
			throw new TypeError('Component is abstract class');
		}

		let el;

		if (currentElement) {
			el = this.element = currentElement;
		} else {
			currentComponent = this;
			el = this.element = document.createElement(this.elementTagName);
			currentComponent = null;
		}

		if (this.template || this.renderInner !== renderInner) {
			this._elementInnerHTML = new Cell(function() {
				let html = this.renderInner();
				return isArray(html) ? html.join('') : html;
			}, {
				owner: this
			});
		}

		this._elementAttached = new Cell(false, {
			owner: this,
			onChange: this._onElementAttachedChange
		});

		for (let p = proto; ;) {
			el.className += ' ' + p.elementTagName;
			p = getPrototypeOf(p);

			if (p == componentProto) {
				break;
			}
		}

		if (props) {
			let attrs = this.elementAttributes;

			for (let name in props) {
				attrs[camelize(name)] = props[name];
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
	 * @typesign () -> string;
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

		let el = document.createElement('div');
		el.innerHTML = html;

		morphElement(this.element, el, {
			contentOnly: true,

			getElementAttributes(el) {
				return el[lastAppliedAttributes] || el.attributes;
			},

			getElementKey(el) {
				return el.getAttribute('key');
			},

			onBeforeMorphElementContent(el, toEl) {
				let component = el.ristaComponent;

				if (component) {
					el[lastAppliedAttributes] = toEl.attributes;

					if (component.template || component.renderInner !== renderInner) {
						component.props.contentSourceElement = toEl;
						return false;
					}
				}
			}
		});

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

// document.addEventListener('DOMContentLoaded', function onDOMContentLoaded() {
// 	document.removeEventListener('DOMContentLoaded', onDOMContentLoaded);

// 	eventTypes.forEach(type => {
// 		document.addEventListener(type, onEvent);
// 	});
// });
