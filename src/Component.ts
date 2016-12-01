import cellx = require('cellx');
import DisposableMixin from './DisposableMixin';
import registerComponent from './registerComponent';
import ElementAttributes from './ElementAttributes';
import setElementClasses from './setElementClasses';
import initAttributes from './initAttributes';
import bindContent from './bindContent';
import attachChildComponentElements from './attachChildComponentElements';
import bindEvents from './bindEvents';
import eventTypes from './eventTypes';
import onEvent from './onEvent';
import camelize from './Utils/camelize';
import getUID from './Utils/getUID';
import htmlToFragment from './Utils/htmlToFragment';
import { nativeCustomElements as nativeCustomElementsFeature } from './Features';

let EventEmitter = cellx.EventEmitter;
let Map = cellx.JS.Map;
let createClass = (cellx.Utils as any).createClass;

let map = Array.prototype.map;

interface IComponentElement extends Element {
	rioniteComponent: Component | null;
	$c: Component;
}

interface IComponentProperties extends ElementAttributes {
	content: DocumentFragment | null;
	context: Object | null;
}

interface IComponentAssetClassNames {
	[assetName: string]: string;
}

let created: any;
let initialize: any;
let ready: any;
let elementAttached: any;
let beforeElementDetach: any;
let elementDetached: any;
let elementMoved: any;
let elementAttributeChanged: any;

export default class Component extends EventEmitter implements DisposableMixin {
	static extend(elIs: string, description: any): typeof Component {
		description.Extends = this;
		(description.Static || (description.Static = {})).elementIs = elIs;
		return (registerComponent as any)(createClass(description));
	}

	static _registeredComponent: typeof Component;
	static register = registerComponent;

	static elementIs: string;
	static elementExtends: string;

	static elementAttributes: { [name: string]: any; } | null;
	static props: { [name: string]: any; } | null;

	static i18n: { [key: string]: any; };

	static template: string | IComponentTemplate | null;

	static _rawContent: DocumentFragment;

	static _markupBlockNames: Array<string>;
	static _assetClassNames: IComponentAssetClassNames;

	static events: { [assetName: string]: { [eventName: string]: Function }; } | null;

	_disposables: any;
	listenTo: any;
	_listenTo: any;
	setTimeout: any;
	setInterval: any;
	registerCallback: any;

	ownerComponent: Component | null = null;

	_parentComponent: Component | null | undefined = null;

	get parentComponent(): Component | null {
		if (this._parentComponent !== undefined) {
			return this._parentComponent;
		}

		for (let node: any; (node = (node || this.element).parentNode);) {
			if (node.$c) {
				return (this._parentComponent = node.$c);
			}
		}

		return (this._parentComponent = null);
	}

	element: IComponentElement;

	get elementAttributes(): ElementAttributes {
		let attrs = new ElementAttributes(this.element);

		Object.defineProperty(this, 'elementAttributes', {
			configurable: true,
			enumerable: true,
			writable: true,
			value: attrs
		});

		return attrs;
	}

	get props(): IComponentProperties {
		let props = Object.create(this.elementAttributes) as IComponentProperties;

		props.content = null;
		props.context = null;

		Object.defineProperty(this, 'props', {
			configurable: true,
			enumerable: true,
			writable: true,
			value: props
		});

		return props;
	}

	_bindings: Array<cellx.Cell<any>> | null;

	_assets: Map<string, NodeListOf<Element>>;

	isElementAttached = false;

	initialized = false;
	isReady = false;

	_isComponentSilent: boolean;

	constructor(el: Element | string | null | undefined, props: { [name: string]: any; }) {
		super();
		DisposableMixin.call(this);

		let constr = this.constructor as typeof Component;

		if (constr._registeredComponent !== constr) {
			throw new TypeError('Component must be registered');
		}

		if (el == null) {
			el = document.createElement(constr.elementIs);
		} else if (typeof el == 'string') {
			let elIs = constr.elementIs;
			let html = el;

			el = document.createElement(elIs);
			el.innerHTML = html;

			let firstChild = el.firstChild;

			if (
				firstChild == el.lastChild && firstChild.nodeType == 1 && (
					(firstChild as Element).tagName.toLowerCase() == elIs ||
						(firstChild as Element).getAttribute('is') == elIs
				)
			) {
				el = firstChild as Element;
			}
		}

		this.element = el as IComponentElement;

		(el as IComponentElement).rioniteComponent = this;
		Object.defineProperty(el, '$c', { value: this });

		if (props) {
			let properties = this.props;

			for (let name in props) {
				properties[camelize(name)] = props[name];
			}
		}

		this.created();
	}

	_handleEvent(evt: cellx.IEvent): void {
		super._handleEvent(evt);

		let silent = this._isComponentSilent;

		if (silent === undefined) {
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
	}

	_attachElement() {
		if (!this.initialized) {
			this.initialize();
			this.initialized = true;
		}

		let constr = this.constructor as typeof Component;
		let rawContent = constr._rawContent;
		let el = this.element;

		if (this.isReady) {
			if (rawContent) {
				for (let child: Node; (child = el.firstChild);) {
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

				for (let child: Node; (child = el.firstChild);) {
					inputContent.appendChild(child);
				}
			}
		}

		if (rawContent) {
			let content = rawContent.cloneNode(true);
			let { bindings, childComponents } = bindContent(content, this);

			this._bindings = bindings;

			this.element.appendChild(content);

			if (!nativeCustomElementsFeature && childComponents) {
				attachChildComponentElements(childComponents);
			}

			if (constr.events) {
				bindEvents(this, constr.events);
			}
		}

		if (!this.isReady) {
			if (!rawContent && constr.events) {
				bindEvents(this, constr.events);
			}

			this.ready();
			this.isReady = true;
		}

		this.elementAttached();
	}

	_detachElement() {
		this.beforeElementDetach();
		this.dispose();
		this.elementDetached();
	}

	dispose(): Component {
		this._destroyBindings();
		return DisposableMixin.prototype.dispose.call(this);
	}

	_destroyBindings(): void {
		let bindings = this._bindings;

		if (bindings) {
			for (let i = bindings.length; i;) {
				bindings[--i].off();
			}

			this._bindings = null;
		}
	}

	// Callbacks

	created(): void {}
	initialize(): void {}
	ready(): void {}
	elementAttached(): void {}
	beforeElementDetach(): void {}
	elementDetached(): void {}
	elementMoved(): void {}
	elementAttributeChanged(name: string, oldValue: any, value: any): void {}

	// Utils

	$(name: string, container?: Component | Element): Component | Element | null {
		let assetList = this._getAssetList(name, container);
		return assetList && assetList.length ? (assetList[0] as IComponentElement).$c || assetList[0] : null;
	}

	$$(name: string, container?: Component | Element): Array<Component | Element> {
		let assetList = this._getAssetList(name, container);
		return assetList ? map.call(assetList, (el: any) => el.$c || el) : [];
	}

	_getAssetList(name: string, container?: Component | Element): NodeListOf<Element> | undefined {
		let assets = this._assets || (this._assets = new Map<string, NodeListOf<Element>>());
		let containerEl: Element = container ?
			(container instanceof Component ? container.element : container) :
			this.element;
		let key = container ? getUID(containerEl) + '/' + name : name;
		let assetList = assets.get(key);

		if (!assetList) {
			let constr = this.constructor as typeof Component;
			let className = constr._assetClassNames[name];

			if (className) {
				assetList = containerEl.getElementsByClassName(className);
				assets.set(key, assetList);
			} else {
				let markupBlockNames = constr._markupBlockNames;

				if (!markupBlockNames) {
					throw new TypeError('Component must have a template');
				}

				for (let i = markupBlockNames.length; i;) {
					className = markupBlockNames[--i] + '__' + name;

					assetList = containerEl.getElementsByClassName(className);

					if (assetList.length) {
						constr._assetClassNames[name] = className;
						assets.set(key, assetList);
						break;
					}
				}

				if (!assetList.length) {
					return;
				}
			}
		}

		return assetList;
	}
}

let DisposableMixinProto = DisposableMixin.prototype;
let ComponentProto = Component.prototype;

Object.getOwnPropertyNames(DisposableMixinProto).forEach(name => {
	if (name != 'constructor') {
		Object.defineProperty(ComponentProto, name, Object.getOwnPropertyDescriptor(DisposableMixinProto, name));
	}
});

created = ComponentProto.created;
initialize = ComponentProto.initialize;
ready = ComponentProto.ready;
elementAttached = ComponentProto.elementAttached;
beforeElementDetach = ComponentProto.beforeElementDetach;
elementDetached = ComponentProto.elementDetached;
elementMoved = ComponentProto.elementMoved;
elementAttributeChanged = ComponentProto.elementAttributeChanged;

document.addEventListener('DOMContentLoaded', function onDOMContentLoaded() {
	document.removeEventListener('DOMContentLoaded', onDOMContentLoaded);

	eventTypes.forEach(type => {
		document.addEventListener(type, onEvent);
	});
});
