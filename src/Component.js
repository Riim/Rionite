let { EventEmitter, Cell, utils: { createClass, defineObservableProperty } } = require('cellx');
let DisposableMixin = require('./DisposableMixin');
let Attributes = require('./Attributes');
let registerComponent = require('./registerComponent');
let renderInner = require('./renderInner');
let morphComponentElement = require('./morphComponentElement');
let defineAssets = require('./defineAssets');
let listenAssets = require('./listenAssets');
let eventTypes = require('./eventTypes');
let camelize = require('./utils/camelize');
let defer = require('./utils/defer');

let createObject = Object.create;
let getPrototypeOf = Object.getPrototypeOf;
let defineProperties = Object.defineProperties;
let hasOwn = Object.prototype.hasOwnProperty;
let isArray = Array.isArray;
let map = Array.prototype.map;

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
			(description.Static || (description.Static = {})).elementTagName = elementTagName;
			return registerComponent(createClass(description));
		},

		elementTagName: void 0,
		elementAttributes: {},

		template: null
	},

	_parentComponent: null,

	/**
	 * @type {?Rista.Component}
	 */
	get parentComponent() {
		if (this._parentComponent !== void 0) {
			return this._parentComponent;
		}

		for (let node; node = (node || this.element).parentNode;) {
			if (node.ristaComponent) {
				return (this._parentComponent = node.ristaComponent);
			}
		}

		return (this._parentComponent = null);
	},

	ownerComponent: null,

	/**
	 * @type {HTMLElement}
	 */
	element: null,

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
		return this._props || (
			this._props = defineObservableProperty(createObject(this.elementAttributes), 'contentSourceElement', null)
		);
	},

	_elementInnerHTML: null,
	_prevAppliedElementInnerHTML: void 0,

	_elementAttached: null,

	initialized: false,
	isReady: false,

	_blockNameInMarkup: void 0,

	constructor: function Component(el) {
		EventEmitter.call(this);
		DisposableMixin.call(this);

		let constr = this.constructor;

		if (constr.prototype == Component.prototype) {
			throw new TypeError('Component is abstract class');
		}

		if (el == null) {
			el = document.createElement(constr.elementTagName);
		} else if (typeof el == 'string') {
			let elementTagName = constr.elementTagName;
			let html = el;

			el = document.createElement(elementTagName);
			el.innerHTML = html;

			let firstChild = el.firstChild;

			if (
				firstChild == el.lastChild && firstChild.nodeType == 1 &&
					firstChild.tagName.toLowerCase() == elementTagName
			) {
				el = firstChild;
			}
		}

		this.element = el;

		defineProperties(el, {
			ristaComponent: { value: this },
			$c: { value: this }
		});

		if (constr.template || this.renderInner !== renderInner) {
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
			let parentComponent = this.parentComponent;

			if (parentComponent) {
				parentComponent._handleEvent(evt);
			} else {
				onEvent(evt);
			}
		}
	},

	_onElementInnerHTMLChange() {
		this.updateElement();
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
			if (!this.ownerComponent && !this.props.contentSourceElement) {
				this.props.contentSourceElement = this.element.cloneNode(true);
			}

			this.updateElement();

			if (!this.isReady) {
				let el = this.element;

				for (let constr = this.constructor; ;) {
					el.className += ' ' + constr.elementTagName;
					constr = getPrototypeOf(constr.prototype).constructor;

					if (constr == Component) {
						break;
					}
				}

				let attrs = this.elementAttributes;
				let attributesSchema = this.constructor.elementAttributes;

				for (let name in attributesSchema) {
					if (typeof attributesSchema[name] != 'function') {
						let camelizedName = camelize(name);
						attrs[camelizedName] = attrs[camelizedName];
					}
				}

				el.className += ' _component-ready';
			}

			if (!this.isReady || this.elementAttached) {
				defer(() => {
					let assets = this.constructor.assets;

					if (!this.isReady) {
						this.isReady = true;

						if (assets) {
							defineAssets(this, assets);
						}

						if (this.ready) {
							this.ready();
						}
					}

					if (assets) {
						listenAssets(this, assets);
					}

					if (this.elementAttached) {
						this.elementAttached();
					}
				});
			}
		} else {
			this.dispose();

			if (this.elementDetached) {
				this.elementDetached();
			}
		}
	},

	/**
	 * @typesign () -> boolean;
	 */
	shouldElementUpdate() {
		return !!this._elementInnerHTML;
	},

	/**
	 * @typesign () -> string|Array<string>;
	 */
	renderInner,

	/**
	 * @typesign () -> Rista.Component;
	 */
	updateElement() {
		if (!this._elementInnerHTML) {
			return this;
		}

		let html = this._elementInnerHTML.get();

		if (html == (this._prevAppliedElementInnerHTML || '')) {
			return this;
		}

		let toEl = document.createElement('div');
		toEl.innerHTML = html;

		morphComponentElement(this, toEl);

		this._prevAppliedElementInnerHTML = html;

		if (this.isReady) {
			defer(() => {
				if (this.elementUpdated) {
					this.elementUpdated();
				}

				this.emit('element-update');
			});
		}

		return this;
	},

	/**
	 * @typesign (selector: string) -> ?Rista.Component|HTMLElement;
	 */
	$(selector) {
		let el = this.element.querySelector(this._prepareSelector(selector));
		return el && (el.$c || el);
	},

	/**
	 * @typesign (selector: string) -> Array<Rista.Component|HTMLElement>;
	 */
	$$(selector) {
		return map.call(this.element.querySelectorAll(this._prepareSelector(selector)), el => el.$c || el);
	},

	/**
	 * @typesign (selector: string) -> string;
	 */
	_prepareSelector(selector) {
		selector = selector.split('&');

		if (selector.length == 1) {
			return selector[0];
		}

		let blockName = this._blockNameInMarkup;

		if (!blockName) {
			for (let constr = this.constructor; ;) {
				if (hasOwn.call(constr.prototype, 'renderInner')) {
					blockName = constr.elementTagName;
					break;
				}

				let parentConstr = getPrototypeOf(constr.prototype).constructor;

				if (constr.template && constr.template !== parentConstr.template) {
					blockName = constr.elementTagName;
					break;
				}

				if (parentConstr == Component) {
					blockName = this.constructor.elementTagName;
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
