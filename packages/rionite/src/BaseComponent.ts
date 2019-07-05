import { kebabCase } from '@riim/kebab-case';
import { moveContent } from '@riim/move-content';
import { nextUID } from '@riim/next-uid';
import { EventEmitter, IEvent, TListener as TEventEmitterListener } from 'cellx';
import { attachChildComponentElements } from './attachChildComponentElements';
import { bindContent } from './bindContent';
import { freezeBindings, IFreezableCell, unfreezeBindings } from './componentBinding';
import { componentConstructors } from './componentConstructors';
import { IComponentParamValueСonverters } from './componentParamValueConverters';
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
import { normalizeTextNodes } from './lib/normalizeTextNodes';
import { IBlock, Template } from './Template';

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
	contentTemplate?: Template;
}

export interface IComponentElement<T extends BaseComponent = BaseComponent> extends HTMLElement {
	$component: T | null;
	rioniteComponent: T;
	contentTemplate?: Template;
}

export type TEventHandler<T extends BaseComponent = BaseComponent, U = IEvent | Event> = (
	this: T,
	evt: U,
	context: Record<string, any>,
	receiver: Element
) => any;

export interface IComponentEvents<T extends BaseComponent = BaseComponent, U = IEvent | Event> {
	[name: string]: {
		[eventName: string]: TEventHandler<T, U>;
	};
}

export class BaseComponent extends EventEmitter implements IDisposable {
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
	$specifiedParams: ReadonlyMap<string, string>;

	_bindings: Array<IFreezableCell> | null;

	_attached = false;

	initialized = false;
	isReady = false;

	[KEY_PARAM_VALUES]: Map<string, any>;
	[KEY_CHILD_COMPONENTS]: Array<BaseComponent>;

	constructor(el?: HTMLElement) {
		super();

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
				for (let name in type) {
					if (hasOwn.call(type, name)) {
						listenings.push(this.listenTo(target, name, type[name], listener, context));
					}
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
		if (target instanceof BaseComponent && typeof type == 'string') {
			if (type.charAt(0) == '<') {
				let index = type.indexOf('>', 2);
				let targetType = type.slice(1, index);

				if (targetType != '*') {
					let targetConstr =
						elementConstructors.has(targetType) &&
						componentConstructors.get(targetType);

					if (!targetConstr) {
						throw new TypeError(`Component "${targetType}" is not defined`);
					}

					let inner = listener;

					listener = function(evt) {
						if (evt.target instanceof (targetConstr as any)) {
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

		if (target instanceof EventEmitter) {
			target.on(type, listener, context);
		} else if (target.addEventListener) {
			if (target !== context) {
				listener = listener.bind(context);
			}

			target.addEventListener(type as string, listener, useCapture);
		} else {
			throw new TypeError('Unable to add a listener');
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

	setTimeout(callback: Function, delay: number): IDisposableTimeout {
		let id = nextUID();

		let timeoutId = setTimeout(() => {
			this._disposables.delete(id);
			callback.call(this);
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

	setInterval(callback: Function, delay: number): IDisposableInterval {
		let id = nextUID();

		let intervalId = setInterval(() => {
			callback.call(this);
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

	registerCallback(callback: Function): IDisposableCallback {
		let id = nextUID();
		let disposable = this;

		let cancelCallback = () => {
			this._disposables.delete(id);
		};

		let registeredCallback = function registeredCallback() {
			if (disposable._disposables.has(id)) {
				disposable._disposables.delete(id);
				return callback.apply(disposable, arguments);
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
			let initializationResult = this.initialize();

			if (initializationResult) {
				initializationResult.then(() => {
					this.initialized = true;
					this._attach();
				});

				return;
			}

			this.initialized = true;
		}

		let constr = this.constructor as typeof BaseComponent;

		if (this.isReady) {
			this._unfreezeBindings();
		} else {
			let el = this.element;

			if (el.className.lastIndexOf(constr._blockNamesString, 0)) {
				el.className = constr._blockNamesString + el.className;
			}

			if (constr.template === null) {
				if (this.ownerComponent == this) {
					let contentBindingResult: [
						Array<BaseComponent> | null,
						Array<IFreezableCell> | null,
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
					Array<IFreezableCell> | null,
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
