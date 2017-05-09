import { IEvent, IEventEmitterListener, EventEmitter, JS, Utils } from 'cellx';
import { IBlock, Template as BemlTemplate } from '@riim/beml';
import htmlToFragment from 'html-to-fragment';
import { IDisposableListening, IListener, default as DisposableMixin } from './DisposableMixin';
import elementConstructorMap from './elementConstructorMap';
import registerComponent from './registerComponent';
import { ElementsController } from './ElementProtoMixin';
import { IComponentProperties, default as ComponentProperties } from './ComponentProperties';
import initElementAttributes from './initElementAttributes';
import bindContent from './bindContent';
import { IFreezableCell, freezeBindings, unfreezeBindings } from './componentBinding';
import attachChildComponentElements from './attachChildComponentElements';
import bindEvents from './bindEvents';
import eventTypes from './eventTypes';
import onEvent from './onEvent';
import camelize from './Utils/camelize';
import getUID from './Utils/getUID';
import moveContent from './Utils/moveContent';
import { nativeCustomElements as nativeCustomElementsFeature } from './Features';

let Map = JS.Map;
let createClass = (Utils as any).createClass;

let map = Array.prototype.map;

export interface IPossiblyComponentElement extends HTMLElement {
	rioniteComponent?: Component | null;
	$component?: Component;
}

export interface IComponentElement extends HTMLElement {
	rioniteComponent: Component | null;
	$component: Component;
}

export interface IComponentElementClassNameMap {
	[elName: string]: string;
}

export interface IComponentEvents<T> {
	[elName: string]: {
		[eventName: string]: (this: T, evt: IEvent | Event) => boolean | void;
	};
}

let rePropertyChangeEventName = /property\-([\-0-9a-z]*)\-change/;

function findChildComponentElements(
	node: Node,
	ownerComponent: Component | null,
	context: Object | null,
	_childComponents?: Array<Component> | undefined
): Array<Component> | null {
	for (let child = node.firstChild; child; child = child.nextSibling) {
		if (child.nodeType == Node.ELEMENT_NODE) {
			let childComponent = (child as IPossiblyComponentElement).$component;

			if (childComponent) {
				childComponent.ownerComponent = ownerComponent;
				childComponent.props.context = context;

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
let elementConnected: any;
let elementDisconnected: any;
let elementAttached: any;
let elementDetached: any;
let elementMoved: any;

export default class Component extends EventEmitter implements DisposableMixin {
	static extend(elIs: string, description: any): typeof Component {
		description.Extends = this;
		(description.Static || (description.Static = {})).elementIs = elIs;
		return registerComponent(createClass(description));
	}

	static _registeredComponent: typeof Component;
	static register = registerComponent;

	static elementIs: string;
	static elementExtends: string | null = null;

	static props: { [name: string]: any } | null = null;

	static i18n: { [key: string]: any };

	static template: string | IBlock | BemlTemplate | null = null;

	static _blockNamesString: string = '';

	static _templateContent: DocumentFragment | undefined;

	static _blockNames: Array<string>;
	static _elementClassNameMap: IComponentElementClassNameMap;

	static events: IComponentEvents<Component> | null = null;

	_disposables: typeof DisposableMixin.prototype._disposables;

	ownerComponent: Component | null = null;

	_parentComponent: Component | null | undefined = null;

	get parentComponent(): Component | null {
		if (this._parentComponent !== undefined) {
			return this._parentComponent;
		}

		for (let node: any; (node = (node || this.element).parentNode);) {
			if (node.$component) {
				return (this._parentComponent = node.$component);
			}
		}

		return (this._parentComponent = null);
	}

	element: IComponentElement;

	get props(): IComponentProperties {
		let props = ComponentProperties.init(this);

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

	_attached = false;

	initialized = false;
	isReady = false;

	_silent: boolean;

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
				firstChild && firstChild == el.lastChild && firstChild.nodeType == Node.ELEMENT_NODE && (
					(firstChild as HTMLElement).tagName.toLowerCase() == elIs ||
						(firstChild as HTMLElement).getAttribute('is') == elIs
				)
			) {
				el = firstChild as HTMLElement;
			}
		}

		this.element = el as IComponentElement;

		(el as IComponentElement).rioniteComponent = this;
		Object.defineProperty(el, '$component', { value: this });

		if (props) {
			let properties = this.props;

			for (let name in props) {
				properties[camelize(name)] = props[name];
			}
		}

		this.created();
	}

	_on(type: string, listener: IEventEmitterListener, context: any) {
		if (!type.lastIndexOf('property-', 0) && rePropertyChangeEventName.test(type)) {
			EventEmitter.currentlySubscribing = true;
			this.props[camelize(RegExp.$1)];
			EventEmitter.currentlySubscribing = false;
		}

		super._on(type, listener, context);
	}

	_handleEvent(evt: IEvent) {
		super._handleEvent(evt);

		let silent = this._silent;

		if (silent === undefined) {
			silent = this._silent = this.element.hasAttribute('rt-silent');
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

	listenTo: typeof DisposableMixin.prototype.listenTo;

	_listenTo(
		target: EventEmitter | EventTarget,
		type: string,
		listener: IListener,
		context: any,
		useCapture: boolean
	): IDisposableListening {
		if (target instanceof Component) {
			let index: number;

			if (type.charAt(0) == '<' && (index = type.indexOf('>', 1)) > 1) {
				let targetName = type.slice(1, index);

				if (targetName != '*') {
					let targetElConstr = elementConstructorMap[targetName];

					if (!targetElConstr) {
						throw new TypeError(`Component "${ targetName }" is not defined`);
					}

					let targetConstr = targetElConstr._rioniteComponentConstructor;
					let inner = listener;

					listener = function(evt) {
						if (evt.target instanceof targetConstr) {
							return inner.call(this, evt);
						}
					};
				}

				type = type.slice(index + 1);
			} else if (type.indexOf(':') == -1) {
				let inner = listener;

				listener = function(evt) {
					if (evt.target == target) {
						return inner.call(this, evt);
					}
				};
			}
		}

		return DisposableMixin.prototype._listenTo.call(this, target, type, listener, context, useCapture);
	}

	setTimeout: typeof DisposableMixin.prototype.setTimeout;
	setInterval: typeof DisposableMixin.prototype.setInterval;
	registerCallback: typeof DisposableMixin.prototype.registerCallback;

	_attach() {
		this._attached = true;

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

			el.className = constr._blockNamesString + el.className;

			initElementAttributes(this);

			if (constr.template == null) {
				let childComponents = findChildComponentElements(el, this.ownerComponent, this.props.context);

				if (childComponents) {
					attachChildComponentElements(childComponents);
				}

				if (constr.events) {
					bindEvents(this, constr.events);
				}
			} else {
				ElementsController.skipConnectionStatusCallbacks = true;
				moveContent((this.props.content = document.createDocumentFragment()), el);
				ElementsController.skipConnectionStatusCallbacks = false;

				let templateContent = constr._templateContent;

				if (!templateContent) {
					templateContent = constr._templateContent =
						htmlToFragment((constr.template as BemlTemplate).render());
				}

				let content = templateContent.cloneNode(true);
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

	_detach() {
		this._attached = false;

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
	elementConnected() {}
	elementDisconnected() {}
	elementAttached() {}
	elementDetached() {}
	elementMoved() {}

	// Utils

	$(name: string, container?: Component | HTMLElement): Component | HTMLElement | null {
		let elList = this._getElementList(name, container);
		return elList && elList.length ? (elList[0] as IPossiblyComponentElement).$component || elList[0] : null;
	}

	$$(name: string, container?: Component | HTMLElement): Array<Component | HTMLElement> {
		let elList = this._getElementList(name, container);
		return elList ? map.call(elList, (el: IComponentElement) => el.$component || el) : [];
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
elementConnected = ComponentProto.elementConnected;
elementDisconnected = ComponentProto.elementDisconnected;
elementAttached = ComponentProto.elementAttached;
elementDetached = ComponentProto.elementDetached;
elementMoved = ComponentProto.elementMoved;

document.addEventListener('DOMContentLoaded', function onDOMContentLoaded() {
	document.removeEventListener('DOMContentLoaded', onDOMContentLoaded);

	eventTypes.forEach(type => {
		document.addEventListener(type, onEvent);
	});
});
