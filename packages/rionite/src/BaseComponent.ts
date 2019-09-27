import { kebabCase } from '@riim/kebab-case';
import { moveContent } from '@riim/move-content';
import { nextUID } from '@riim/next-uid';
import { EventEmitter, IEvent, TListener as TEventEmitterListener } from 'cellx';
import { attachChildComponentElements } from './attachChildComponentElements';
import { bindContent } from './bindContent';
import { freezeBindings, IBinding, unfreezeBindings } from './componentBinding';
import { IComponentParamValueСonverters } from './componentParamValueConverters';
import { config } from './config';
import {
	KEY_CHILD_COMPONENTS,
	KEY_COMPONENT_SELF,
	KEY_PARAM_VALUES,
	KEY_PARAMS_CONFIG
	} from './Constants';
import { elementConstructors } from './elementConstructors';
import { resumeConnectionStatusCallbacks, suppressConnectionStatusCallbacks } from './ElementProtoMixin';
import { handleDOMEvent } from './handleDOMEvent';
import { handleEvent } from './handleEvent';
import { findChildComponents } from './lib/findChildComponents';
import { normalizeTextNodes } from './lib/normalizeTextNodes';
import { IBlock, KEY_CONTENT_TEMPLATE, Template } from './Template';

const hasOwn = Object.prototype.hasOwnProperty;
const map = Array.prototype.map;

export interface IDisposable {
	dispose(): any;
	[key: string]: any;
}

export interface IDisposableListening extends IDisposable {
	stop(): void;
}

export interface IDisposableTimeout extends IDisposable {
	clear(): void;
}

export interface IDisposableInterval extends IDisposable {
	clear(): void;
}

export interface IDisposableCallback extends IDisposable {
	(): void;
	cancel(): void;
}

export type TListeningTarget =
	| EventEmitter
	| EventTarget
	| Array<EventEmitter | EventTarget>
	| NodeList
	| HTMLCollection;

export type TListener = (evt: IEvent | Event) => any;

export interface IComponentParamConfig {
	property?: string;
	type?: Function;
	default?: any;
	required?: boolean;
	readonly?: boolean;
}

export interface I$ComponentParamConfig {
	name: string;
	property: string;

	type: Function | undefined;
	valueСonverters: IComponentParamValueСonverters | undefined;

	default: any;

	required: boolean;
	readonly: boolean;

	paramConfig: any;
}

export interface IPossiblyComponentElement<T extends BaseComponent = BaseComponent>
	extends HTMLElement {
	$component?: T | null;
	rioniteComponent?: T;
	[KEY_CONTENT_TEMPLATE]?: Template;
}

export interface IComponentElement<T extends BaseComponent = BaseComponent> extends HTMLElement {
	$component: T | null;
	rioniteComponent: T;
	[KEY_CONTENT_TEMPLATE]?: Template;
}

export type TComponentListeningTarget<T = BaseComponent> =
	| TListeningTarget
	| string
	| Array<TListeningTarget>
	| ((this: T, self: T) => TListeningTarget | string | Array<TListeningTarget>);

export interface IComponentListening<T = BaseComponent> {
	target?: TComponentListeningTarget<T>;
	type: string | symbol;
	listener: TListener | string;
	useCapture?: boolean;
}

export type TEventHandler<T extends BaseComponent = BaseComponent, U = IEvent | Event> = (
	this: T,
	evt: U,
	context: Record<string, any>,
	receiver: Element
) => any;

export interface IComponentEvents<T extends BaseComponent = BaseComponent, U = IEvent | Event> {
	[elementName: string]: Record<string, TEventHandler<T, U>>;
}

export type THookCallback = (this: BaseComponent) => void;

let currentComponent: BaseComponent | null = null;

export function onReady(cb: THookCallback) {
	(currentComponent!._onReadyHooks || (currentComponent!._onReadyHooks = [])).push(cb);
}
export function onElementAttached(cb: THookCallback) {
	(
		currentComponent!._onElementAttachedHooks ||
		(currentComponent!._onElementAttachedHooks = [])
	).push(cb);
}
export function onElementDetached(cb: THookCallback) {
	(
		currentComponent!._onElementDetachedHooks ||
		(currentComponent!._onElementDetachedHooks = [])
	).push(cb);
}
export function onElementMoved(cb: THookCallback) {
	(currentComponent!._onElementMovedHooks || (currentComponent!._onElementMovedHooks = [])).push(
		cb
	);
}

export class BaseComponent extends EventEmitter implements IDisposable {
	static EVENT_CHANGE: string | symbol = 'change';

	static elementIs: string;
	static elementExtends: string | null = null;

	static params: Record<string, any> | null = null;
	static i18n: Record<string, any> | null = null;

	static _blockNamesString: string;
	static _elementBlockNames: Array<string>;

	static template: string | IBlock | Template | null = null;

	static get bindsInputContent() {
		return this.template !== null;
	}

	static listenings: Array<IComponentListening> | null = null;

	static events: IComponentEvents<BaseComponent, IEvent<BaseComponent>> | null = null;
	static domEvents: IComponentEvents<BaseComponent, Event> | null = null;

	static [KEY_PARAMS_CONFIG]: Map<string, I$ComponentParamConfig> | null;

	[KEY_COMPONENT_SELF]: this;

	_disposables = new Map<string, IDisposable>();

	_ownerComponent: BaseComponent | undefined;

	get ownerComponent(): BaseComponent {
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
	set ownerComponent(ownerComponent: BaseComponent) {
		this._ownerComponent = ownerComponent;
	}

	_parentComponent: BaseComponent | null | undefined = null;

	get parentComponent(): BaseComponent | null {
		if (this._parentComponent !== undefined) {
			return this._parentComponent;
		}

		for (let node: any; (node = (node || this.element).parentNode); ) {
			if (node.$component !== undefined) {
				return (this._parentComponent = node.$component || node.rioniteComponent);
			}
		}

		return (this._parentComponent = null);
	}

	element: IComponentElement;

	$inputContent: DocumentFragment | null = null;
	$context: Record<string, any> | undefined;
	$specifiedParams: ReadonlySet<string>;

	_bindings: Array<IBinding> | null;

	_attached = false;

	initialized = false;
	isReady = false;

	_onReadyHooks: Array<THookCallback> | undefined;
	_onElementAttachedHooks: Array<THookCallback> | undefined;
	_onElementDetachedHooks: Array<THookCallback> | undefined;
	_onElementMovedHooks: Array<THookCallback> | undefined;

	[KEY_PARAM_VALUES]: Map<string, any>;
	[KEY_CHILD_COMPONENTS]: Array<BaseComponent>;

	constructor(el?: HTMLElement) {
		super();

		currentComponent = this;

		this[KEY_COMPONENT_SELF] = this;

		let constr = this.constructor as typeof BaseComponent;

		if (!elementConstructors.has(constr.elementIs)) {
			throw new TypeError('Component must be registered');
		}

		if (!el) {
			el = document.createElement(kebabCase(constr.elementIs, true));
		}

		this.element = el as IComponentElement;
		(el as IComponentElement).$component = this;

		this[KEY_PARAM_VALUES] = new Map();
	}

	onChange(listener: TListener, context?: any): this {
		return this.on((this.constructor as typeof BaseComponent).EVENT_CHANGE, listener, context);
	}

	offChange(listener: TListener, context?: any): this {
		return this.off((this.constructor as typeof BaseComponent).EVENT_CHANGE, listener, context);
	}

	handleEvent(evt: IEvent<BaseComponent>) {
		super.handleEvent(evt);

		if (evt.bubbles !== false && !evt.propagationStopped) {
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
		type: string | symbol | Array<string | symbol>,
		listener: TListener | Array<TListener>,
		context?: any,
		useCapture?: boolean
	): IDisposableListening;
	listenTo(
		target: TListeningTarget | string | Array<TListeningTarget>,
		listeners: Record<string | symbol, TListener | Array<TListener>>,
		context?: any,
		useCapture?: boolean
	): IDisposableListening;
	listenTo(
		target: TListeningTarget | string | Array<TListeningTarget>,
		type:
			| string
			| symbol
			| Array<string | symbol>
			| Record<string | symbol, TListener | Array<TListener>>,
		listener?: TListener | Array<TListener> | any,
		context?: any,
		useCapture?: boolean
	): IDisposableListening {
		if (typeof target == 'string') {
			target = this.$<TListeningTarget>(target)!;
		}

		let listenings: Array<IDisposableListening>;

		if (typeof type == 'object') {
			listenings = [];

			if (Array.isArray(type)) {
				for (let i = 0, l = type.length; i < l; i++) {
					listenings.push(this.listenTo(target, type[i], listener, context, useCapture));
				}
			} else {
				for (let type_ in type) {
					if (hasOwn.call(type, type_)) {
						listenings.push(
							this.listenTo(target, type_, type[type_], listener, context)
						);
					}
				}

				for (let type_ of Object.getOwnPropertySymbols(type)) {
					listenings.push(
						this.listenTo(target, type_, type[type_ as any], listener, context)
					);
				}
			}
		} else {
			if (
				Array.isArray(target) ||
				target instanceof NodeList ||
				target instanceof HTMLCollection
			) {
				listenings = [];

				for (let i = 0, l = target.length; i < l; i++) {
					listenings.push(this.listenTo(target[i], type, listener, context, useCapture));
				}
			} else if (Array.isArray(listener)) {
				listenings = [];

				for (let i = 0, l = listener.length; i < l; i++) {
					listenings.push(this.listenTo(target, type, listener[i], context, useCapture));
				}
			} else {
				return this._listenTo(
					target as EventEmitter | EventTarget,
					type,
					listener,
					context !== undefined ? context : this,
					useCapture || false
				);
			}
		}

		let id = nextUID();

		let stopListening = () => {
			for (let i = listenings.length; i; ) {
				listenings[--i].stop();
			}

			this._disposables.delete(id);
		};

		let listening = {
			stop: stopListening,
			dispose: stopListening
		};
		this._disposables.set(id, listening);

		return listening;
	}

	_listenTo(
		target: EventEmitter | EventTarget,
		type: string | symbol,
		listener: TListener,
		context: any,
		useCapture: boolean
	): IDisposableListening {
		if (!target) {
			throw TypeError('"target" is required');
		}

		if (target instanceof EventEmitter) {
			target.on(type, listener, context);
		} else {
			if (target !== context) {
				listener = listener.bind(context);
			}

			target.addEventListener(type as string, listener, useCapture);
		}

		let id = nextUID();

		let stopListening = () => {
			if (this._disposables.has(id)) {
				if (target instanceof EventEmitter) {
					target.off(type, listener, context);
				} else {
					target.removeEventListener(type as string, listener, useCapture);
				}

				this._disposables.delete(id);
			}
		};

		let listening = {
			stop: stopListening,
			dispose: stopListening
		};
		this._disposables.set(id, listening);

		return listening;
	}

	setTimeout(cb: Function, delay: number): IDisposableTimeout {
		let id = nextUID();

		let timeoutId = setTimeout(() => {
			this._disposables.delete(id);
			cb.call(this);
		}, delay);

		let clearTimeout_ = () => {
			if (this._disposables.has(id)) {
				clearTimeout(timeoutId);
				this._disposables.delete(id);
			}
		};

		let timeout = {
			clear: clearTimeout_,
			dispose: clearTimeout_
		};
		this._disposables.set(id, timeout);

		return timeout;
	}

	setInterval(cb: Function, delay: number): IDisposableInterval {
		let id = nextUID();

		let intervalId = setInterval(() => {
			cb.call(this);
		}, delay);

		let clearInterval_ = () => {
			if (this._disposables.has(id)) {
				clearInterval(intervalId);
				this._disposables.delete(id);
			}
		};

		let interval = {
			clear: clearInterval_,
			dispose: clearInterval_
		};
		this._disposables.set(id, interval);

		return interval;
	}

	registerCallback(cb: Function): IDisposableCallback {
		let id = nextUID();
		let disposable = this;

		let cancelCallback = () => {
			this._disposables.delete(id);
		};

		let registeredCallback = function registeredCallback() {
			if (disposable._disposables.has(id)) {
				disposable._disposables.delete(id);
				return cb.apply(disposable, arguments);
			}
		} as IDisposableCallback;
		registeredCallback.cancel = cancelCallback;
		registeredCallback.dispose = cancelCallback;

		this._disposables.set(id, registeredCallback);

		return registeredCallback;
	}

	_attach() {
		this._attached = true;

		if (!this.initialized) {
			currentComponent = this;

			let initializationResult: Promise<any> | void;

			try {
				initializationResult = this.initialize();
			} catch (err) {
				config.logError(err);
				return;
			}

			if (initializationResult) {
				initializationResult.then(
					() => {
						this.initialized = true;
						this._attach();
					},
					err => {
						config.logError(err);
					}
				);

				return;
			}

			this.initialized = true;
		}

		let constr = this.constructor as typeof BaseComponent;

		if (this.isReady) {
			this._unfreezeBindings();

			let childComponents = findChildComponents(this.element);

			if (childComponents) {
				attachChildComponentElements(childComponents);
			}
		} else {
			let el = this.element;

			if (el.className.lastIndexOf(constr._blockNamesString, 0)) {
				el.className = constr._blockNamesString + el.className;
			}

			if (constr.template === null) {
				if (this.ownerComponent == this) {
					let contentBindingResult: [
						Array<BaseComponent> | null,
						Array<IBinding> | null,
						Array<BaseComponent | string | TEventEmitterListener> | null
					] = [null, null, null];

					bindContent(el, this, this, contentBindingResult);

					let childComponents = contentBindingResult[0];
					let backBindings = contentBindingResult[2];

					this._bindings = contentBindingResult[1];

					if (childComponents) {
						attachChildComponentElements(childComponents);
					}

					if (backBindings) {
						for (let i = backBindings.length; i; i -= 3) {
							(backBindings[i - 3] as BaseComponent).on(
								'change:' + backBindings[i - 2],
								backBindings[i - 1] as TEventEmitterListener
							);
						}
					}
				} else {
					this._bindings = null;

					if (this[KEY_CHILD_COMPONENTS]) {
						attachChildComponentElements(this[KEY_CHILD_COMPONENTS]);
					}
				}
			} else {
				if (el.firstChild) {
					suppressConnectionStatusCallbacks();
					moveContent(
						this.$inputContent ||
							(this.$inputContent = document.createDocumentFragment()),
						normalizeTextNodes(el)
					);
					resumeConnectionStatusCallbacks();
				}

				let contentBindingResult: [
					Array<BaseComponent> | null,
					Array<IBinding> | null,
					Array<BaseComponent | string | TEventEmitterListener> | null
				] = [null, null, null];
				let content = (constr.template as Template).render(
					this,
					this,
					this,
					contentBindingResult
				);
				let childComponents = contentBindingResult[0];
				let backBindings = contentBindingResult[2];

				this._bindings = contentBindingResult[1];

				if (childComponents) {
					for (let i = childComponents.length; i; ) {
						let childComponent = childComponents[--i];

						if (
							childComponent.element.firstChild &&
							(childComponent.constructor as typeof BaseComponent).bindsInputContent
						) {
							childComponent.$inputContent = moveContent(
								document.createDocumentFragment(),
								childComponent.element
							);
						}
					}
				}

				suppressConnectionStatusCallbacks();
				this.element.appendChild(content);
				resumeConnectionStatusCallbacks();

				if (childComponents) {
					attachChildComponentElements(childComponents);
				}

				if (backBindings) {
					for (let i = backBindings.length; i; i -= 3) {
						(backBindings[i - 3] as BaseComponent).on(
							'change:' + backBindings[i - 2],
							backBindings[i - 1] as TEventEmitterListener
						);
					}
				}
			}

			try {
				this.ready();
			} catch (err) {
				config.logError(err);
			}

			if (this._onReadyHooks) {
				for (let onReadyHook of this._onReadyHooks) {
					try {
						onReadyHook.call(this);
					} catch (err) {
						config.logError(err);
					}
				}
			}

			this.isReady = true;
		}

		try {
			this.elementAttached();
		} catch (err) {
			config.logError(err);
		}

		if (this._onElementAttachedHooks) {
			for (let onElementAttachedHook of this._onElementAttachedHooks) {
				try {
					onElementAttachedHook.call(this);
				} catch (err) {
					config.logError(err);
				}
			}
		}

		let listenings = (this.constructor as typeof BaseComponent).listenings;

		if (listenings) {
			for (let listening of listenings) {
				let target = listening.target;

				if (target) {
					if (typeof target == 'function') {
						target = target.call(this, this);
					}

					if (typeof target == 'string' && target.charAt(0) == '@') {
						target = Function(`return this.${target.slice(1)};`).call(this);
					}
				} else {
					target = this;
				}

				try {
					this.listenTo(
						target as TListeningTarget,
						listening.type,
						typeof listening.listener == 'string'
							? this[listening.listener]
							: listening.listener,
						this,
						listening.useCapture
					);
				} catch (err) {
					config.logError(err);
				}
			}
		}
	}

	_detach() {
		this._attached = false;

		try {
			this.elementDetached();
		} catch (err) {
			config.logError(err);
		}

		if (this._onElementDetachedHooks) {
			for (let onElementDetachedHook of this._onElementDetachedHooks) {
				try {
					onElementDetachedHook.call(this);
				} catch (err) {
					config.logError(err);
				}
			}
		}

		this.dispose();
	}

	dispose(): BaseComponent {
		this._freezeBindings();

		for (let disposable of this._disposables) {
			disposable[1].dispose();
		}

		return this;
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

	elementConnected() {}
	elementDisconnected() {}
	initialize(): Promise<any> | void {}
	ready() {}
	elementAttached() {}
	elementDetached() {}
	elementMoved() {}

	// Utils

	$<R = BaseComponent | Element>(
		name: string,
		container?: Element | BaseComponent | string
	): R | null {
		let elList = this._getElementList(name, container);
		return (elList && elList.length
			? (elList[0] as IPossiblyComponentElement).$component || elList[0]
			: null) as any;
	}

	$$<R = BaseComponent | Element>(
		name: string,
		container?: Element | BaseComponent | string
	): Array<R> {
		let elList = this._getElementList(name, container);

		return elList
			? map.call(elList, (el: IPossiblyComponentElement) => el.$component || el)
			: [];
	}

	_getElementList(
		name: string,
		container?: Element | BaseComponent | string
	): HTMLCollectionOf<Element> | undefined {
		if (container) {
			if (typeof container == 'string') {
				container = this.$(container)!;
			}

			if (container instanceof BaseComponent) {
				container = container.element;
			}
		} else {
			container = this.element;
		}

		let elementBlockNames = (this.constructor as typeof BaseComponent)._elementBlockNames;

		return container.getElementsByClassName(
			elementBlockNames[elementBlockNames.length - 1] + '__' + name
		);
	}
}

const handledEvents = [
	'change',
	'click',
	'dblclick',
	'focusin',
	'focusout',
	'input',
	'mousedown',
	'mouseup',
	'submit'
];

document.addEventListener('DOMContentLoaded', function onDOMContentLoaded() {
	document.removeEventListener('DOMContentLoaded', onDOMContentLoaded);

	for (let type of handledEvents) {
		document.body.addEventListener(type, handleDOMEvent);
	}
});
