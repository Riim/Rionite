import { IEvent, IEventEmitterListener, EventEmitter, JS, Utils } from 'cellx';
import { IBlock, Template } from 'nelm';
import htmlToFragment from 'html-to-fragment';
import { IDisposableListening, IListener, default as DisposableMixin } from './DisposableMixin';
import componentConstructorMap from './componentConstructorMap';
import registerComponent from './registerComponent';
import { suppressConnectionStatusCallbacks, resumeConnectionStatusCallbacks } from './ElementProtoMixin';
import { IComponentInput, default as ComponentInput } from './ComponentInput';
import bindContent from './bindContent';
import { IFreezableCell, freezeBindings, unfreezeBindings } from './componentBinding';
import attachChildComponentElements from './attachChildComponentElements';
import bindEvents from './bindEvents';
import eventTypes from './eventTypes';
import onEvent from './onEvent';
import camelize from './Utils/camelize';
import getUID from './Utils/getUID';
import moveContent from './Utils/moveContent';
import { templateTag as templateTagFeature } from './Features';

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

export type TEventHandler<T> = (this: T, evt: IEvent | Event) => boolean | void;

export interface IComponentEvents<T> {
	[elName: string]: {
		[eventName: string]: TEventHandler<T>;
	};
}

export type TEventHandler2<T> = (this: T, evt: IEvent | Event, receiver: Element) => boolean | void;

export interface IComponentEvents2<T> {
	[elName: string]: {
		[eventName: string]: TEventHandler2<T>;
	};
}

let reClassBlockElement = / class="([a-zA-Z][\-\w]*)__([a-zA-Z][\-\w]*)(?:\s[^"]*)?"/g;
let reInputChangeEventName = /input\-([\-0-9a-z]*)\-change/;

function createClassBlockElementReplacer(contentBlockName: string, events: IComponentEvents2<Component>, evtPrefix: string):
		(match: string, blockName: string, elName: string) => string {
	return function(match: string, blockName: string, elName: string): string {
		let elEvents: { [eventName: string]: TEventHandler2<Component> };

		if (
			blockName == contentBlockName &&
				(elEvents = (events as IComponentEvents2<Component>)[elName])
		) {
			let eventAttrs = [];

			for (let type in elEvents) {
				eventAttrs.push(` ${ evtPrefix }${ type }=":${ elName }"`);
			}

			return match + eventAttrs.join('');
		}

		return match;
	};
}

function findChildComponents(
	node: Node,
	ownerComponent: Component | null,
	context: Object | null,
	childComponents?: Array<Component> | null | undefined
): Array<Component> | null {
	for (let child = node.firstChild; child; child = child.nextSibling) {
		if (child.nodeType == Node.ELEMENT_NODE) {
			let childComponent = (child as IPossiblyComponentElement).$component;

			if (childComponent) {
				childComponent.ownerComponent = ownerComponent;
				childComponent.input.$context = context;

				(childComponents || (childComponents = [])).push(childComponent);
			}

			if (
				child.firstChild &&
					(!childComponent || (childComponent.constructor as typeof Component).template == null)
			) {
				childComponents = findChildComponents(child, ownerComponent, context, childComponents);
			}
		}
	}

	return childComponents || null;
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

	static register = registerComponent;

	static elementIs: string;
	static elementExtends: string | null = null;

	static input: { [name: string]: any } | null = null;

	static i18n: { [key: string]: any } | null = null;

	static _blockNamesString: string;

	static template: string | IBlock | Template | null = null;
	static _contentBlockNames: Array<string>;

	static _rawContent: DocumentFragment | undefined;

	static _elementClassNameMap: IComponentElementClassNameMap;

	static events: IComponentEvents<Component> | null = null;
	static events2: IComponentEvents2<Component> | null = null;
	static domEvents: IComponentEvents2<Component> | null = null;

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

	get input(): IComponentInput {
		let input = ComponentInput.init(this);

		Object.defineProperty(this, 'input', {
			configurable: true,
			enumerable: true,
			writable: true,
			value: input
		});

		return input;
	}

	_bindings: Array<IFreezableCell> | null;

	_elementListMap: Map<string, NodeListOf<Element>> | undefined;

	_attached = false;

	initialized = false;
	isReady = false;

	constructor(el?: HTMLElement) {
		super();
		DisposableMixin.call(this);

		let constr = this.constructor as typeof Component;

		if (!componentConstructorMap.has(constr.elementIs)) {
			throw new TypeError('Component must be registered');
		}

		if (!el) {
			el = document.createElement(constr.elementIs);
		}

		this.element = el as IComponentElement;

		(el as IComponentElement).rioniteComponent = this;
		Object.defineProperty(el, '$component', { value: this });

		this.created();
	}

	_on(type: string, listener: IEventEmitterListener, context: any) {
		if (!type.lastIndexOf('input-', 0) && reInputChangeEventName.test(type)) {
			EventEmitter.currentlySubscribing = true;
			this.input[camelize(RegExp.$1)];
			EventEmitter.currentlySubscribing = false;
		}

		super._on(type, listener, context);
	}

	_handleEvent(evt: IEvent) {
		super._handleEvent(evt);

		if (evt.bubbles !== false && !evt.isPropagationStopped) {
			let parentComponent = this.parentComponent;

			if (parentComponent) {
				parentComponent._handleEvent(evt);
			} else {
				let targetOwnerComponent = (evt.target as Component).ownerComponent;

				onEvent(
					evt,
					targetOwnerComponent ? targetOwnerComponent.element : this.element.parentNode as Element
				);
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
					let targetConstr = componentConstructorMap.get(targetName);

					if (!targetConstr) {
						throw new TypeError(`Component "${ targetName }" is not defined`);
					}

					let inner = listener;

					listener = function(evt) {
						if (evt.target instanceof (targetConstr as typeof Component)) {
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

			if (constr.template == null) {
				this.input;

				this._bindings = null;

				let childComponents = findChildComponents(el, this.ownerComponent, this.input.$context);

				if (childComponents) {
					attachChildComponentElements(childComponents);
				}

				if (constr.events) {
					bindEvents(this, constr.events);
				}
			} else {
				if (el.firstChild) {
					suppressConnectionStatusCallbacks();
					this.input.$content = moveContent(document.createDocumentFragment(), el);
					resumeConnectionStatusCallbacks();
				} else {
					this.input.$content = document.createDocumentFragment();
				}

				let rawContent = constr._rawContent;

				if (!rawContent) {
					let contentHTML = (constr.template as Template).render();

					if (constr.events2) {
						contentHTML = contentHTML.replace(
							reClassBlockElement,
							createClassBlockElementReplacer(
								constr._contentBlockNames[0],
								constr.events2,
								'oncomponent-'
							)
						);
					}

					if (constr.domEvents) {
						contentHTML = contentHTML.replace(
							reClassBlockElement,
							createClassBlockElementReplacer(constr._contentBlockNames[0], constr.domEvents, 'on-')
						);
					}

					rawContent = constr._rawContent = htmlToFragment(contentHTML);
				}

				let content = rawContent.cloneNode(true) as DocumentFragment;
				if (!templateTagFeature) {
					let templates = content.querySelectorAll('template');

					for (let i = 0, l = templates.length; i < l;) {
						i += templates[i].content.querySelectorAll('template').length + 1;
					}
				}
				let [bindings, childComponents] = bindContent(content, this, this, { 0: null, 1: null } as any);

				this._bindings = bindings;

				suppressConnectionStatusCallbacks();
				this.element.appendChild(content);
				resumeConnectionStatusCallbacks();

				if (childComponents) {
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

	$(name: string, container?: Component | Element): Component | Element | null {
		let elList = this._getElementList(name, container);
		return elList && elList.length ? (elList[0] as IPossiblyComponentElement).$component || elList[0] : null;
	}

	$$(name: string, container?: Component | Element): Array<Component | Element> {
		let elList = this._getElementList(name, container);
		return elList ? map.call(elList, (el: IPossiblyComponentElement) => el.$component || el) : [];
	}

	_getElementList(name: string, container?: Component | Element): NodeListOf<Element> | undefined {
		let elListMap = this._elementListMap || (this._elementListMap = new Map<string, NodeListOf<Element>>());
		let containerEl: Element = container ?
			(container instanceof Component ? container.element : container) :
			this.element;
		let key = container ? getUID(containerEl) + '/' + name : name;
		let elList = elListMap.get(key);

		if (!elList) {
			let constr = this.constructor as typeof Component;
			let className = constr._elementClassNameMap[name];

			if (className) {
				elList = containerEl.getElementsByClassName(className);
				elListMap.set(key, elList);
			} else {
				let contentBlockNames = constr._contentBlockNames;

				for (let i = contentBlockNames.length - 1; ; i--) {
					className = contentBlockNames[i] + '__' + name;

					elList = containerEl.getElementsByClassName(className);

					if (elList.length) {
						constr._elementClassNameMap[name] = className;
						elListMap.set(key, elList);
						break;
					}

					if (!i) {
						break;
					}
				}

				if (!(elList as NodeListOf<Element>).length) {
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
		document.documentElement.addEventListener(type, function(evt) {
			if (evt.target != document.documentElement) {
				onEvent(evt, document.documentElement);
			}
		});
	});
});
