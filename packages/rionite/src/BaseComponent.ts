import { getUID } from '@riim/get-uid';
import { kebabCase } from '@riim/kebab-case';
import { Logger } from '@riim/logger';
import { Map } from '@riim/map-set-polyfill';
import { moveContent } from '@riim/move-content';
import { EventEmitter, IEvent, TListener as TEventEmitterListener } from 'cellx';
import { attachChildComponentElements } from './attachChildComponentElements';
import { bindContent } from './bindContent';
import { freezeBindings, IFreezableCell, unfreezeBindings } from './componentBinding';
import { IComponentParamTypeSerializer } from './componentParamTypeSerializerMap';
import { KEY_CHILD_COMPONENTS, KEY_PARAMS } from './Constants';
import { Inject } from './DI';
import { elementConstructorMap } from './elementConstructorMap';
import { resumeConnectionStatusCallbacks, suppressConnectionStatusCallbacks } from './ElementProtoMixin';
import { handledEvents } from './handledEvents';
import { handleDOMEvent } from './handleDOMEvent';
import { handleEvent } from './handleEvent';
import { normalizeTextNodes } from './lib/normalizeTextNodes';
import { IBlock, Template } from './Template2';

const map = Array.prototype.map;

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
	typeSerializer: IComponentParamTypeSerializer | undefined;

	default: any;

	required: boolean;
	readonly: boolean;

	paramConfig: IComponentParamConfig | Function;
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

export interface IComponentElementClassNameMap {
	[elName: string]: string;
}

export type TEventHandler<T extends BaseComponent = BaseComponent, U = IEvent | Event> = (
	this: T,
	evt: U,
	context: { [name: string]: any },
	receiver: Element
) => any;

export interface IComponentEvents<T extends BaseComponent = BaseComponent, U = IEvent | Event> {
	[name: string]: {
		[eventName: string]: TEventHandler<T, U>;
	};
}

export class BaseComponent extends EventEmitter {
	static elementIs: string;
	static elementExtends: string | null = null;

	static params: { [name: string]: any } | null = null;
	static i18n: { [key: string]: any } | null = null;

	static _blockNamesString: string;
	static _elementBlockNames: Array<string>;

	static template: string | IBlock | Template | null = null;

	static get bindsInputContent() {
		return this.template !== null;
	}

	static events: IComponentEvents<BaseComponent, IEvent<BaseComponent>> | null = null;
	static domEvents: IComponentEvents<BaseComponent, Event> | null = null;

	@Inject
	logger: Logger;

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
	$context: { [name: string]: any } | undefined;
	$specifiedParams: Set<string> | undefined;

	_bindings: Array<IFreezableCell> | null;

	_elementListMap: Map<string, HTMLCollectionOf<Element>> | undefined;

	_attached = false;

	initialized = false;
	isReady = false;

	constructor(el?: HTMLElement) {
		super();

		let constr = this.constructor as typeof BaseComponent;

		if (!elementConstructorMap.has(constr.elementIs)) {
			throw new TypeError('Component must be registered');
		}

		if (!el) {
			el = document.createElement(kebabCase(constr.elementIs, true));
		}

		this.element = el as IComponentElement;
		(el as IComponentElement).$component = this;

		this[KEY_PARAMS] = new Map();
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

			el.className = constr._blockNamesString + el.className;

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

				let content = (constr.template as Template).render(this);
				let contentBindingResult: [
					Array<BaseComponent> | null,
					Array<IFreezableCell> | null,
					Array<BaseComponent | string | TEventEmitterListener> | null
				] = [null, null, null];

				bindContent(content, this, this, contentBindingResult);

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
		let elListMap =
			this._elementListMap ||
			(this._elementListMap = new Map<string, HTMLCollectionOf<Element>>());
		let containerEl: Element;

		if (container) {
			if (typeof container == 'string') {
				container = this.$(container)!;
			}

			containerEl = container instanceof BaseComponent ? container.element : container;
		} else {
			containerEl = this.element;
		}

		let key = container ? getUID(containerEl) + '/' + name : name;
		let elList = elListMap.get(key);

		if (!elList) {
			let elementBlockNames = (this.constructor as typeof BaseComponent)._elementBlockNames;

			elList = containerEl.getElementsByClassName(
				elementBlockNames[elementBlockNames.length - 1] + '__' + name
			);
			elListMap.set(key, elList);
		}

		return elList;
	}
}

document.addEventListener('DOMContentLoaded', function onDOMContentLoaded() {
	document.removeEventListener('DOMContentLoaded', onDOMContentLoaded);

	handledEvents.forEach(type => {
		document.body.addEventListener(type, evt => {
			if (evt.target != document.body) {
				handleDOMEvent(evt);
			}
		});
	});
});
