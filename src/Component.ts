import { camelize } from '@riim/camelize';
import { Inject } from '@riim/di';
import { getUID } from '@riim/get-uid';
import { hyphenize } from '@riim/hyphenize';
import { Logger } from '@riim/logger';
import { Map } from '@riim/map-set-polyfill';
import { moveContent } from '@riim/move-content';
import { EventEmitter, IEvent, TListener as TEventEmitterListener } from 'cellx';
import { htmlToFragment } from 'html-to-fragment';
import { IBlock, Template } from 'nelm';
import { attachChildComponentElements } from './attachChildComponentElements';
import { bindContent } from './bindContent';
import { bindEvents } from './bindEvents';
import { freezeBindings, IFreezableCell, unfreezeBindings } from './componentBinding';
import { ComponentConfigDecorator } from './ComponentConfigDecorator';
import { componentConstructorMap } from './componentConstructorMap';
import { ComponentParams, IComponentParams } from './ComponentParams';
import {
	DisposableMixin,
	IDisposableListening,
	TListener,
	TListeningTarget
	} from './DisposableMixin';
import { resumeConnectionStatusCallbacks, suppressConnectionStatusCallbacks } from './ElementProtoMixin';
import { handledEvents } from './handledEvents';
import { handleDOMEvent } from './handleDOMEvent';
import { handleEvent } from './handleEvent';
import { templateTag as templateTagFeature } from './lib/Features';
import { registerComponent } from './registerComponent';

let map = Array.prototype.map;

export interface IPossiblyComponentElement<T extends Component = Component> extends HTMLElement {
	rioniteComponent?: T | null;
	$component?: T;
}

export interface IComponentElement<T extends Component = Component> extends HTMLElement {
	rioniteComponent: T | null;
	$component: T;
}

export interface IComponentElementClassNameMap {
	[elName: string]: string;
}

export type TOEventHandler<T extends Component> = (this: T, evt: IEvent | Event) => boolean | void;

export interface IComponentOEvents<T extends Component> {
	[name: string]: {
		[eventName: string]: TOEventHandler<T>;
	};
}

export type TEventHandler<T extends Component = Component, U = IEvent | Event> = (
	this: T,
	evt: U,
	receiver: Element
) => boolean | void;

export interface IComponentEvents<T extends Component = Component, U = IEvent | Event> {
	[name: string]: {
		[eventName: string]: TEventHandler<T, U>;
	};
}

let reClassBlockElement = / class="([a-zA-Z][\-\w]*)__([a-zA-Z][\-\w]*)/g;
let reParamChangeEventName = /param\-([\-0-9a-z]*)\-change/;

function createClassBlockElementReplacer(
	blockName: string,
	events: IComponentEvents,
	evtAttrPrefix: string
): (match: string, elBlockName: string, elName: string) => string {
	return (match: string, elBlockName: string, elName: string): string => {
		let elEvents: { [eventName: string]: TEventHandler };

		if (elBlockName == blockName && (elEvents = events[elName])) {
			let evtAttrs = [];

			for (let type in elEvents) {
				evtAttrs.push(
					` ${evtAttrPrefix}${type.charAt(0) == '<'
						? type.slice(type.indexOf('>', 2) + 1)
						: type}="/${elName}"`
				);
			}

			return evtAttrs.join('') + match;
		}

		return match;
	};
}

function findChildComponents(
	node: Node,
	ownerComponent: Component,
	context: object,
	childComponents?: Array<Component> | null | undefined
): Array<Component> | null {
	for (let child = node.firstChild; child; child = child.nextSibling) {
		if (child.nodeType == Node.ELEMENT_NODE) {
			let childComponent = (child as IPossiblyComponentElement).$component;

			if (childComponent) {
				childComponent._ownerComponent = ownerComponent;
				childComponent.params.$context = context;

				(childComponents || (childComponents = [])).push(childComponent);
			}

			if (
				child.firstChild &&
				(!childComponent ||
					(childComponent.constructor as typeof Component).template == null)
			) {
				childComponents = findChildComponents(
					child,
					ownerComponent,
					context,
					childComponents
				);
			}
		}
	}

	return childComponents || null;
}

export class Component extends EventEmitter implements DisposableMixin {
	static Config = ComponentConfigDecorator;

	static register = registerComponent;

	static elementIs: string;
	static elementExtends: string | null = null;

	static params: { [name: string]: any } | null = null;

	static i18n: { [key: string]: any } | null = null;

	static _blockNamesString: string;

	static _elementBlockNames: Array<string>;
	static template: string | IBlock | Template | null = null;

	static _rawContent: DocumentFragment | undefined;

	static oevents: IComponentOEvents<Component> | null = null;
	static events: IComponentEvents<Component, IEvent<Component>> | null = null;
	static domEvents: IComponentEvents<Component, Event> | null = null;

	@Inject('logger') logger: Logger;

	_disposables: typeof DisposableMixin.prototype._disposables;

	_ownerComponent: Component | undefined;

	get ownerComponent(): Component {
		if (this._ownerComponent) {
			return this._ownerComponent;
		}

		let component = this.parentComponent;

		if (!component) {
			return (this._ownerComponent = this);
		}

		for (let parentComponent; (parentComponent = component.parentComponent); ) {
			component = parentComponent;
		}

		return (this._ownerComponent = component);
	}
	set ownerComponent(ownerComponent: Component) {
		this._ownerComponent = ownerComponent;
	}

	_parentComponent: Component | null | undefined = null;

	get parentComponent(): Component | null {
		if (this._parentComponent !== undefined) {
			return this._parentComponent;
		}

		for (let node: any; (node = (node || this.element).parentNode); ) {
			if (node.$component) {
				return (this._parentComponent = node.$component);
			}
		}

		return (this._parentComponent = null);
	}

	element: IComponentElement;

	get params(): IComponentParams {
		let params = ComponentParams.init(this);

		Object.defineProperty(this, 'params', {
			configurable: true,
			enumerable: true,
			writable: true,
			value: params
		});

		return params;
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
			el = document.createElement(hyphenize(constr.elementIs, true));
		}

		this.element = el as IComponentElement;

		(el as IComponentElement).rioniteComponent = this;
		Object.defineProperty(el, '$component', { value: this });

		this.created();
	}

	_on(type: string, listener: TEventEmitterListener, context: any) {
		if (!type.lastIndexOf('param-', 0) && reParamChangeEventName.test(type)) {
			EventEmitter.currentlySubscribing = true;
			this.params[camelize(RegExp.$1, true)];
			EventEmitter.currentlySubscribing = false;
		}

		super._on(type, listener, context);
	}

	handleEvent(evt: IEvent<Component>) {
		super.handleEvent(evt);

		if (evt.bubbles !== false && !evt.isPropagationStopped) {
			let parentComponent = this.parentComponent;

			if (parentComponent) {
				parentComponent.handleEvent(evt);
				return;
			}
		}

		handleEvent(evt);
	}

	listenTo(
		target: TListeningTarget | string | Array<TListeningTarget>,
		type: string | Array<string>,
		listener: TListener | Array<TListener>,
		context?: any,
		useCapture?: boolean
	): IDisposableListening;
	listenTo(
		target: TListeningTarget | string | Array<TListeningTarget>,
		listeners: { [type: string]: TListener | Array<TListener> },
		context?: any,
		useCapture?: boolean
	): IDisposableListening;
	listenTo(
		target: TListeningTarget | string | Array<TListeningTarget>,
		type: string | Array<string> | { [type: string]: TListener | Array<TListener> },
		listener?: TListener | Array<TListener> | any,
		context?: any,
		useCapture?: boolean
	): IDisposableListening {
		return DisposableMixin.prototype.listenTo.call(
			this,
			typeof target == 'string' ? this.$<any>(target) : target,
			type,
			listener,
			context,
			useCapture
		);
	}

	_listenTo(
		target: EventEmitter | EventTarget,
		type: string,
		listener: TListener,
		context: any,
		useCapture: boolean
	): IDisposableListening {
		if (target instanceof Component) {
			if (type.charAt(0) == '<') {
				let index = type.indexOf('>', 2);
				let targetType = type.slice(1, index);

				if (targetType != '*') {
					let targetConstr = componentConstructorMap.get(targetType);

					if (!targetConstr) {
						throw new TypeError(`Component "${targetType}" is not defined`);
					}

					let inner = listener;

					listener = function(evt) {
						if (evt.target instanceof targetConstr!) {
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

		return DisposableMixin.prototype._listenTo.call(
			this,
			target,
			type,
			listener,
			context,
			useCapture
		);
	}

	setTimeout: typeof DisposableMixin.prototype.setTimeout;
	setInterval: typeof DisposableMixin.prototype.setInterval;
	registerCallback: typeof DisposableMixin.prototype.registerCallback;

	_attach() {
		this._attached = true;

		if (!this.initialized) {
			let result = this.initialize();

			if (result) {
				result.then(() => {
					this.initialized = true;
					this._attach();
				});

				return;
			}

			this.initialized = true;
		}

		let constr = this.constructor as typeof Component;

		if (this.isReady) {
			this._unfreezeBindings();

			if (constr.oevents) {
				bindEvents(this, constr.oevents);
			}
		} else {
			let el = this.element;

			el.className = constr._blockNamesString + el.className;

			if (constr.template == null) {
				this.params;

				this._bindings = null;

				let childComponents = findChildComponents(
					el,
					this.ownerComponent,
					this.params.$context
				);

				if (childComponents) {
					attachChildComponentElements(childComponents);
				}

				if (constr.oevents) {
					bindEvents(this, constr.oevents);
				}
			} else {
				if (el.firstChild) {
					suppressConnectionStatusCallbacks();
					this.params.$content = moveContent(document.createDocumentFragment(), el);
					resumeConnectionStatusCallbacks();
				} else {
					this.params.$content = document.createDocumentFragment();
				}

				let rawContent = constr._rawContent;

				if (!rawContent) {
					let contentHTML = (constr.template as Template).render();

					if (constr.events) {
						contentHTML = contentHTML.replace(
							reClassBlockElement,
							createClassBlockElementReplacer(
								constr.elementIs,
								constr.events,
								'oncomponent-'
							)
						);
					}

					if (constr.domEvents) {
						contentHTML = contentHTML.replace(
							reClassBlockElement,
							createClassBlockElementReplacer(
								constr.elementIs,
								constr.domEvents,
								'on-'
							)
						);
					}

					rawContent = constr._rawContent = htmlToFragment(contentHTML);
				}

				let content = rawContent.cloneNode(true) as DocumentFragment;
				if (!templateTagFeature) {
					let templates = content.querySelectorAll('template');

					for (let i = 0, l = templates.length; i < l; ) {
						i += templates[i].content.querySelectorAll('template').length + 1;
					}
				}
				let [bindings, childComponents] = bindContent(content, this, this, {
					0: null,
					1: null
				} as any);

				this._bindings = bindings;

				suppressConnectionStatusCallbacks();
				this.element.appendChild(content);
				resumeConnectionStatusCallbacks();

				if (childComponents) {
					attachChildComponentElements(childComponents);
				}

				if (constr.oevents) {
					bindEvents(this, constr.oevents);
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
			for (let i = bindings.length; i; ) {
				bindings[--i].off();
			}

			this._bindings = null;
		}
	}

	// Callbacks

	created() {}
	initialize(): Promise<any> | void {}
	ready() {}
	elementConnected() {}
	elementDisconnected() {}
	elementAttached() {}
	elementDetached() {}
	elementMoved() {}

	// Utils

	$<R = Component | Element>(name: string, container?: Element | Component | string): R | null {
		let elList = this._getElementList(name, container);
		return (elList && elList.length
			? (elList[0] as IPossiblyComponentElement).$component || elList[0]
			: null) as any;
	}

	$$<R = Component | Element>(name: string, container?: Element | Component | string): Array<R> {
		let elList = this._getElementList(name, container);
		return elList
			? map.call(elList, (el: IPossiblyComponentElement) => el.$component || el)
			: [];
	}

	_getElementList(
		name: string,
		container?: Element | Component | string
	): NodeListOf<Element> | undefined {
		let elListMap =
			this._elementListMap || (this._elementListMap = new Map<string, NodeListOf<Element>>());
		let containerEl: Element;

		if (container) {
			if (typeof container == 'string') {
				container = this.$(container)!;
			}

			containerEl = container instanceof Component ? container.element : container;
		} else {
			containerEl = this.element;
		}

		let key = container ? getUID(containerEl) + '/' + name : name;
		let elList = elListMap.get(key);

		if (!elList) {
			let elementBlockNames = (this.constructor as typeof Component)._elementBlockNames;

			elList = containerEl.getElementsByClassName(
				elementBlockNames[elementBlockNames.length - 1] + '__' + name
			);
			elListMap.set(key, elList);
		}

		return elList;
	}
}

let disposableMixinProto = DisposableMixin.prototype;
let componentProto = Component.prototype;

Object.getOwnPropertyNames(disposableMixinProto).forEach(name => {
	if (!(name in componentProto)) {
		Object.defineProperty(
			componentProto,
			name,
			Object.getOwnPropertyDescriptor(disposableMixinProto, name)!
		);
	}
});

document.addEventListener('DOMContentLoaded', function onDOMContentLoaded() {
	document.removeEventListener('DOMContentLoaded', onDOMContentLoaded);

	handledEvents.forEach(type => {
		document.documentElement.addEventListener(type, evt => {
			if (evt.target != document.documentElement) {
				handleDOMEvent(evt);
			}
		});
	});
});
