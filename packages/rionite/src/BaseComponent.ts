import { kebabCase } from '@riim/kebab-case';
import { moveContent } from '@riim/move-content';
import { TContent } from '@riim/rionite-template-parser-2';
import { EventEmitter, IEvent, TListener as TEventEmitterListener } from 'cellx';
import { bindContent } from './bindContent';
import { freezeBindings, IBinding, unfreezeBindings } from './componentBinding';
import { ComponentParams } from './ComponentParams';
import { IComponentParamValueСonverters } from './componentParamValueConverters';
import { config } from './config';
import { connectChildComponentElements } from './connectChildComponentElements';
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
import { InterruptError } from './lib/InterruptError';
import { IBlock, KEY_CONTENT_TEMPLATE, Template } from './Template2';

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

	type: Function;
	valueСonverters: IComponentParamValueСonverters;

	default: any;

	required: boolean;
	readonly: boolean;

	paramConfig: IComponentParamConfig | Function;
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

export type TComponentLifecycleHook = (this: BaseComponent, component?: BaseComponent) => any;

export type TComponentListeningTarget<T = BaseComponent> =
	| TListeningTarget
	| string
	| Array<TListeningTarget>
	| ((this: T, self: T) => TListeningTarget | string | Array<TListeningTarget>);

export type TComponentListeningEventType<T = BaseComponent> =
	| string
	| symbol
	| Array<string | symbol>
	| ((this: T, ctor: typeof BaseComponent) => string | symbol | Array<string | symbol>);

export type TEventHandler<T extends BaseComponent = BaseComponent, U = IEvent | Event> = (
	this: T,
	evt: U,
	context: Record<string, any>,
	receiver: Element
) => any;

export interface IComponentEvents<T extends BaseComponent = BaseComponent, U = IEvent | Event> {
	[elementName: string]: Record<string, TEventHandler<T, U>>;
}

export function callLifecycle(lifecycle: Array<Function>, context: object) {
	let promises: Array<Promise<any>> | undefined;

	for (let lifecycleFn of lifecycle) {
		let result;

		try {
			result = lifecycleFn.length
				? lifecycleFn.call(context, context)
				: lifecycleFn.call(context);
		} catch (err) {
			config.logError(err);
			return null;
		}

		if (result instanceof Promise) {
			(promises || (promises = [])).push(
				result.catch((err) => {
					if (!(err instanceof InterruptError)) {
						config.logError(err);
					}
				})
			);
		}
	}

	return promises || null;
}

let currentComponent: BaseComponent;

export function onElementConnected(lifecycleHook: TComponentLifecycleHook) {
	(
		(currentComponent._lifecycleHooks || (currentComponent._lifecycleHooks = {}))
			.elementConnected || (currentComponent._lifecycleHooks!.elementConnected = [])
	).push(lifecycleHook);
}
export function onElementDisconnected(lifecycleHook: TComponentLifecycleHook) {
	(
		(currentComponent._lifecycleHooks || (currentComponent._lifecycleHooks = {}))
			.elementDisconnected || (currentComponent._lifecycleHooks!.elementDisconnected = [])
	).push(lifecycleHook);
}
export function onReady(lifecycleHook: TComponentLifecycleHook) {
	(
		(currentComponent._lifecycleHooks || (currentComponent._lifecycleHooks = {})).ready ||
		(currentComponent._lifecycleHooks.ready = [])
	).push(lifecycleHook);
}
export function onConnected(lifecycleHook: TComponentLifecycleHook) {
	(
		(currentComponent._lifecycleHooks || (currentComponent._lifecycleHooks = {})).connected ||
		(currentComponent._lifecycleHooks!.connected = [])
	).push(lifecycleHook);
}
export function onDisconnected(lifecycleHook: TComponentLifecycleHook) {
	(
		(currentComponent._lifecycleHooks || (currentComponent._lifecycleHooks = {}))
			.disconnected || (currentComponent._lifecycleHooks!.disconnected = [])
	).push(lifecycleHook);
}
export function onElementMoved(lifecycleHook: TComponentLifecycleHook) {
	(
		(currentComponent._lifecycleHooks || (currentComponent._lifecycleHooks = {}))
			.elementMoved || (currentComponent._lifecycleHooks!.elementMoved = [])
	).push(lifecycleHook);
}

export class BaseComponent extends EventEmitter implements IDisposable {
	static EVENT_CHANGE: string | symbol = 'change';

	static elementIs: string;
	static elementExtends: string | null = null;

	static params: Record<string, any> | null = null;
	static [KEY_PARAMS_CONFIG]: Map<string, I$ComponentParamConfig> | null;

	static i18n: Record<string, any> | null = null;

	static _blockNamesString: string;
	static _elementBlockNames: Array<string>;

	static template: string | TContent | IBlock | Template | null = null;

	static get bindsInputContent() {
		return this.template !== null;
	}

	static _lifecycleHooks = {
		elementConnected: [] as Array<TComponentLifecycleHook>,
		elementDisconnected: [] as Array<TComponentLifecycleHook>,
		ready: [] as Array<TComponentLifecycleHook>,
		connected: [] as Array<TComponentLifecycleHook>,
		disconnected: [] as Array<TComponentLifecycleHook>,
		elementMoved: [] as Array<TComponentLifecycleHook>
	};

	static events: IComponentEvents<BaseComponent, IEvent<BaseComponent>> | null = null;
	static domEvents: IComponentEvents<BaseComponent, Event> | null = null;

	[KEY_COMPONENT_SELF]: this;

	_disposables = new Set<IDisposable>();

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

	$context: Record<string, any> | undefined;

	$specifiedParams: ReadonlySet<string>;
	[KEY_PARAM_VALUES]: Map<string, any>;

	$inputContent: DocumentFragment | null = null;

	_bindings: Array<IBinding> | null;

	[KEY_CHILD_COMPONENTS]: Array<BaseComponent>;

	initializationPromise: Promise<any> | null = null;
	readyPromise: Promise<any> | null = null;

	_initialized = false;
	get initialized() {
		return this._initialized;
	}

	_isReady = false;
	get isReady() {
		return this._isReady;
	}

	_isConnected = false;
	get isConnected() {
		return this._isConnected;
	}

	_lifecycleHooks: {
		elementConnected?: Array<TComponentLifecycleHook>;
		elementDisconnected?: Array<TComponentLifecycleHook>;
		ready?: Array<TComponentLifecycleHook>;
		connected?: Array<TComponentLifecycleHook>;
		disconnected?: Array<TComponentLifecycleHook>;
		elementMoved?: Array<TComponentLifecycleHook>;
	} | null = null;

	constructor(el?: HTMLElement) {
		super();

		currentComponent = this;

		this[KEY_COMPONENT_SELF] = this;

		let ctor = this.constructor as typeof BaseComponent;

		if (!elementConstructors.has(ctor.elementIs)) {
			throw TypeError('Component must be registered');
		}

		if (!el) {
			el = document.createElement(kebabCase(ctor.elementIs, true));
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
		evtType: string | symbol | Array<string | symbol>,
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
		evtType:
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

		if (typeof evtType == 'object') {
			listenings = [];

			if (Array.isArray(evtType)) {
				for (let i = 0, l = evtType.length; i < l; i++) {
					listenings.push(
						this.listenTo(target, evtType[i], listener, context, useCapture)
					);
				}
			} else {
				for (let evtType_ in evtType) {
					if (Object.prototype.hasOwnProperty.call(evtType, evtType_)) {
						listenings.push(
							this.listenTo(target, evtType_, evtType[evtType_], listener, context)
						);
					}
				}

				for (let evtType_ of Object.getOwnPropertySymbols(evtType)) {
					listenings.push(
						this.listenTo(target, evtType_, evtType[evtType_ as any], listener, context)
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
					listenings.push(
						this.listenTo(target[i], evtType, listener, context, useCapture)
					);
				}
			} else {
				if (Array.isArray(listener)) {
					listenings = [];

					for (let i = 0, l = listener.length; i < l; i++) {
						listenings.push(
							this.listenTo(target, evtType, listener[i], context, useCapture)
						);
					}
				} else {
					return this._listenTo(
						target as EventEmitter | EventTarget,
						evtType,
						listener,
						context !== undefined ? context : this,
						useCapture || false
					);
				}
			}
		}

		let listening: IDisposableListening;
		let stop = () => {
			for (let i = listenings.length; i; ) {
				listenings[--i].stop();
			}

			this._disposables.delete(listening);
		};

		listening = {
			stop,
			dispose: stop
		};
		this._disposables.add(listening);

		return listening;
	}

	_listenTo(
		target: EventEmitter | EventTarget,
		evtType: string | symbol,
		listener: TListener,
		context: any,
		useCapture: boolean
	): IDisposableListening {
		if (!target) {
			throw TypeError('"target" is required');
		}

		if (target instanceof EventEmitter) {
			target.on(evtType, listener, context);
		} else {
			if (target !== context) {
				listener = listener.bind(context);
			}

			target.addEventListener(evtType as string, listener, useCapture);
		}

		let listening: IDisposableListening;
		let stop = () => {
			if (this._disposables.has(listening)) {
				if (target instanceof EventEmitter) {
					target.off(evtType, listener, context);
				} else {
					target.removeEventListener(evtType as string, listener, useCapture);
				}

				this._disposables.delete(listening);
			}
		};

		listening = {
			stop,
			dispose: stop
		};
		this._disposables.add(listening);

		return listening;
	}

	setTimeout(cb: Function, delay: number): IDisposableTimeout {
		let timeout: IDisposableTimeout;
		let timeoutId = setTimeout(() => {
			this._disposables.delete(timeout);
			cb.call(this);
		}, delay);
		let clear = () => {
			if (this._disposables.has(timeout)) {
				clearTimeout(timeoutId);
				this._disposables.delete(timeout);
			}
		};

		timeout = {
			clear,
			dispose: clear
		};
		this._disposables.add(timeout);

		return timeout;
	}

	setInterval(cb: Function, delay: number): IDisposableInterval {
		let interval: IDisposableInterval;
		let intervalId = setInterval(() => {
			cb.call(this);
		}, delay);
		let clear = () => {
			if (this._disposables.has(interval)) {
				clearInterval(intervalId);
				this._disposables.delete(interval);
			}
		};

		interval = {
			clear,
			dispose: clear
		};
		this._disposables.add(interval);

		return interval;
	}

	registerCallback(cb: Function): IDisposableCallback {
		let registeredCallback: IDisposableCallback;
		let cancel = () => {
			this._disposables.delete(registeredCallback);
		};

		registeredCallback = ((...args) => {
			if (this._disposables.has(registeredCallback)) {
				this._disposables.delete(registeredCallback);
				return cb.apply(this, args);
			}
		}) as IDisposableCallback;
		registeredCallback.cancel = cancel;
		registeredCallback.dispose = cancel;
		this._disposables.add(registeredCallback);

		return registeredCallback;
	}

	$interruptIfNotConnected<V>(value: V): V {
		if (!this._isConnected) {
			throw InterruptError();
		}

		return value;
	}

	_beforeInitializationWait() {}
	_afterInitializationWait() {}

	connect(ownerComponent?: BaseComponent): Promise<any> | null {
		if (ownerComponent) {
			this._ownerComponent = ownerComponent;
		}

		if (this._isConnected) {
			return this.initializationPromise;
		}

		this._parentComponent = undefined;

		ComponentParams.init(this);

		callLifecycle(
			[
				...(this.constructor as typeof BaseComponent)._lifecycleHooks.elementConnected,
				...((this._lifecycleHooks && this._lifecycleHooks.elementConnected) || []),
				this.elementConnected
			],
			this
		);

		return this._connect();
	}

	_connect(): Promise<any> | null {
		this._isConnected = true;

		if (this._initialized) {
			if (!this._isReady) {
				this._afterInitializationWait();
			}
		} else {
			currentComponent = this;

			let initializationPromise: Promise<any> | void;

			try {
				initializationPromise = this.initialize();
			} catch (err) {
				config.logError(err);
				return null;
			}

			if (initializationPromise) {
				this._beforeInitializationWait();

				return (this.initializationPromise = initializationPromise.then(
					() => {
						this._initialized = true;

						if (this._isConnected) {
							this._connect();
						}
					},
					(err) => {
						if (!(err instanceof InterruptError)) {
							config.logError(err);
						}
					}
				));
			}

			this._initialized = true;
		}

		let ctor = this.constructor as typeof BaseComponent;
		let readyPromises: ReturnType<typeof callLifecycle> | undefined;

		if (this._isReady) {
			this._unfreezeBindings();

			let childComponents = findChildComponents(this.element);

			if (childComponents) {
				connectChildComponentElements(childComponents);
			}
		} else {
			let el = this.element;

			if (el.className.lastIndexOf(ctor._blockNamesString, 0)) {
				el.className = ctor._blockNamesString + el.className;
			}

			if (ctor.template === null) {
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
						connectChildComponentElements(childComponents);
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
						connectChildComponentElements(this[KEY_CHILD_COMPONENTS]);
					}
				}
			} else {
				if (el.firstChild) {
					suppressConnectionStatusCallbacks();
					moveContent(
						this.$inputContent ||
							(this.$inputContent = document.createDocumentFragment()),
						el
					);
					resumeConnectionStatusCallbacks();
				}

				let contentBindingResult: [
					Array<BaseComponent> | null,
					Array<IBinding> | null,
					Array<BaseComponent | string | TEventEmitterListener> | null
				] = [null, null, null];
				let content = (ctor.template as Template).render(
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
					connectChildComponentElements(childComponents);
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

			readyPromises = callLifecycle(
				[
					...(this.constructor as typeof BaseComponent)._lifecycleHooks.ready,
					...((this._lifecycleHooks && this._lifecycleHooks.ready) || []),
					this.ready
				],
				this
			);

			if (readyPromises) {
				this.readyPromise = Promise.all(readyPromises).finally(() => {
					this.readyPromise = null;
				});
			}

			this._isReady = true;
		}

		// readyPromises, this.readyPromise - 2
		// !readyPromises, this.readyPromise - 0
		// !readyPromises, !this.readyPromise - 1
		if (readyPromises || !this.readyPromise) {
			if (readyPromises) {
				this.readyPromise!.finally(() => {
					if (this._isConnected) {
						callLifecycle(
							[
								...(this.constructor as typeof BaseComponent)._lifecycleHooks
									.connected,
								...((this._lifecycleHooks && this._lifecycleHooks.connected) || []),
								this.connected
							],
							this
						);
					}
				});
			} else {
				callLifecycle(
					[
						...(this.constructor as typeof BaseComponent)._lifecycleHooks.connected,
						...((this._lifecycleHooks && this._lifecycleHooks.connected) || []),
						this.connected
					],
					this
				);
			}
		}

		return this.initializationPromise;
	}

	_disconnect() {
		this._isConnected = false;

		callLifecycle(
			[
				...(this.constructor as typeof BaseComponent)._lifecycleHooks.disconnected,
				...((this._lifecycleHooks && this._lifecycleHooks.disconnected) || []),
				this.disconnected
			],
			this
		);

		this.dispose();
	}

	dispose(): BaseComponent {
		this._freezeBindings();

		for (let disposable of this._disposables) {
			disposable.dispose();
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
	connected() {}
	disconnected() {}
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
			? Array.prototype.map.call(
					elList,
					(el: IPossiblyComponentElement) => el.$component || el
			  )
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

const handledEventTypes = [
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

	for (let type of handledEventTypes) {
		document.body.addEventListener(type, handleDOMEvent);
	}
});
