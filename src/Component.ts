import { IEvent, EventEmitter, JS, Utils } from 'cellx';
import { Template as BemlTemplate } from '@riim/beml';
import htmlToFragment from 'html-to-fragment';
import DisposableMixin from './DisposableMixin';
import registerComponent from './registerComponent';
import { ElementsController } from './ElementProtoMixin';
import { IComponentProperties, default as ComponentProperties } from './ComponentProperties';
import initElementClasses from './initElementClasses';
import initElementAttributes from './initElementAttributes';
import bindContent from './bindContent';
import { IFreezableCell, freezeBindings, unfreezeBindings } from './componentBinding';
import attachChildComponentElements from './attachChildComponentElements';
import bindEvents from './bindEvents';
import eventTypes from './eventTypes';
import onEvent from './onEvent';
import camelize from './Utils/camelize';
import getUID from './Utils/getUID';
import { nativeCustomElements as nativeCustomElementsFeature } from './Features';

let Map = JS.Map;
let createClass = (Utils as any).createClass;

let map = Array.prototype.map;

export interface IComponentElement extends HTMLElement {
	rioniteComponent: Component | null;
	$c: Component;
}

export interface IComponentTemplate {
	render: (data: Object) => string;
}

export interface IComponentElementClassNameMap {
	[elName: string]: string;
}

export interface IComponentEvents<T> {
	[elName: string]: {
		[eventName: string]: (this: T, evt: IEvent | Event, target: HTMLElement) => boolean | void;
	};
}

function findChildComponentElements(
	node: Node,
	ownerComponent: Component,
	context: Object,
	_childComponents?: Array<Component> | undefined
): Array<Component> | null {
	for (let child = node.firstChild; child; child = child.nextSibling) {
		if (child.nodeType == 1) {
			let childComponent = (child as IComponentElement).$c;

			if (childComponent) {
				childComponent.ownerComponent = ownerComponent;
				childComponent.props.context = context as Object;

				(_childComponents || (_childComponents = [])).push(childComponent);
			}

			if (
				child.firstChild &&
					(!childComponent || (childComponent.constructor as typeof Component).template == null)
			) {
				findChildComponentElements(child, ownerComponent, context, _childComponents);
			}
		}
	}

	return _childComponents || null;
}

let created: any;
let initialize: any;
let ready: any;
let elementAttached: any;
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

	static props: { [name: string]: any } | null;

	static i18n: { [key: string]: any };

	static template: string | IComponentTemplate | null;
	static bemlTemplate: string | BemlTemplate | null;

	static _rawContent: DocumentFragment | undefined;

	static _blockNames: Array<string>;
	static _elementClassNameMap: IComponentElementClassNameMap;

	static events: IComponentEvents<Component> | null;

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

	get props(): IComponentProperties {
		let props = ComponentProperties.create(this.element);

		Object.defineProperty(this, 'props', {
			configurable: true,
			enumerable: true,
			writable: true,
			value: props
		});

		return props;
	}

	_bindings: Array<IFreezableCell> | null;

	_elementListMap: Map<string, NodeListOf<HTMLElement>>;

	isElementAttached = false;

	initialized = false;
	isReady = false;

	_isComponentSilent: boolean;

	constructor(el?: HTMLElement | string, props?: { [name: string]: any }) {
		super();
		DisposableMixin.call(this);

		let constr = this.constructor as typeof Component;

		if (constr._registeredComponent !== constr) {
			throw new TypeError('Component must be registered');
		}

		if (el === undefined) {
			el = document.createElement(constr.elementIs);
		} else if (typeof el == 'string') {
			let elIs = constr.elementIs;
			let html = el;

			el = document.createElement(elIs);
			el.innerHTML = html;

			let firstChild = el.firstChild;

			if (
				firstChild && firstChild == el.lastChild && firstChild.nodeType == 1 && (
					(firstChild as HTMLElement).tagName.toLowerCase() == elIs ||
						(firstChild as HTMLElement).getAttribute('is') == elIs
				)
			) {
				el = firstChild as HTMLElement;
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

	_handleEvent(evt: IEvent) {
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

		if (this.isReady) {
			this._unfreezeBindings();

			if (constr.events) {
				bindEvents(this, constr.events);
			}
		} else {
			let el = this.element;

			initElementClasses(el, constr);
			initElementAttributes(this, constr);

			let template = constr.template;

			if (template == null) {
				let childComponents = findChildComponentElements(
					el,
					this.ownerComponent as Component,
					this.ownerComponent as Component
				);

				if (childComponents) {
					attachChildComponentElements(childComponents);
				}

				if (constr.events) {
					bindEvents(this, constr.events);
				}
			} else {
				let inputContent = this.props.content = document.createDocumentFragment();

				ElementsController.skipConnectionStatusCallbacks = true;
				for (let child: Node | null; (child = el.firstChild);) {
					inputContent.appendChild(child);
				}
				ElementsController.skipConnectionStatusCallbacks = false;

				let rawContent = constr._rawContent;

				if (!rawContent) {
					rawContent = constr._rawContent = htmlToFragment(
						typeof template == 'string' ? template : template.render(constr)
					);
				}

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

			this.ready();
			this.isReady = true;
		}

		this.elementAttached();
	}

	_detachElement() {
		this.elementDetached();
		this.dispose();
	}

	dispose(): Component {
		this._freezeBindings();
		return DisposableMixin.prototype.dispose.call(this);
	}

	_freezeBindings() {
		if (this._bindings) {
			freezeBindings(this._bindings);
		}
	}

	_unfreezeBindings() {
		if (this._bindings) {
			unfreezeBindings(this._bindings);
		}
	}

	_destroyBindings() {
		let bindings = this._bindings;

		if (bindings) {
			for (let i = bindings.length; i;) {
				bindings[--i].off();
			}

			this._bindings = null;
		}
	}

	// Callbacks

	created() {}
	initialize() {}
	ready() {}
	elementAttached() {}
	elementDetached() {}
	elementMoved() {}
	elementAttributeChanged(name: string, oldValue: any, value: any) {}

	// Utils

	$(name: string, container?: Component | HTMLElement): Component | HTMLElement | null {
		let elList = this._getElementList(name, container);
		return elList && elList.length ? (elList[0] as IComponentElement).$c || elList[0] : null;
	}

	$$(name: string, container?: Component | HTMLElement): Array<Component | HTMLElement> {
		let elList = this._getElementList(name, container);
		return elList ? map.call(elList, (el: IComponentElement) => el.$c || el) : [];
	}

	_getElementList(name: string, container?: Component | HTMLElement): NodeListOf<HTMLElement> | undefined {
		let elListMap = this._elementListMap || (this._elementListMap = new Map<string, NodeListOf<HTMLElement>>());
		let containerEl: HTMLElement = container ?
			(container instanceof Component ? container.element : container) :
			this.element;
		let key = container ? getUID(containerEl) + '/' + name : name;
		let elList = elListMap.get(key);

		if (!elList) {
			let constr = this.constructor as typeof Component;
			let className = constr._elementClassNameMap[name];

			if (className) {
				elList = containerEl.getElementsByClassName(className) as NodeListOf<HTMLElement>;
				elListMap.set(key, elList);
			} else {
				let blockNames = constr._blockNames;

				if (!blockNames) {
					throw new TypeError('Component must have a template');
				}

				for (let i = blockNames.length; i;) {
					className = blockNames[--i] + '__' + name;

					elList = containerEl.getElementsByClassName(className) as NodeListOf<HTMLElement>;

					if (elList.length) {
						constr._elementClassNameMap[name] = className;
						elListMap.set(key, elList);
						break;
					}
				}

				if (!elList.length) {
					return;
				}
			}
		}

		return elList;
	}
}

let DisposableMixinProto = DisposableMixin.prototype;
let ComponentProto = Component.prototype;

Object.getOwnPropertyNames(DisposableMixinProto).forEach(name => {
	if (!(name in ComponentProto)) {
		Object.defineProperty(ComponentProto, name, Object.getOwnPropertyDescriptor(DisposableMixinProto, name));
	}
});

created = ComponentProto.created;
initialize = ComponentProto.initialize;
ready = ComponentProto.ready;
elementAttached = ComponentProto.elementAttached;
elementDetached = ComponentProto.elementDetached;
elementMoved = ComponentProto.elementMoved;
elementAttributeChanged = ComponentProto.elementAttributeChanged;

document.addEventListener('DOMContentLoaded', function onDOMContentLoaded() {
	document.removeEventListener('DOMContentLoaded', onDOMContentLoaded);

	eventTypes.forEach(type => {
		document.addEventListener(type, onEvent);
	});
});
