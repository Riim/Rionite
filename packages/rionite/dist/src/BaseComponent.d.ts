import { EventEmitter, IEvent } from 'cellx';
import { IBinding } from './componentBinding';
import { IComponentParamValueСonverters } from './componentParamValueConverters';
import { KEY_CHILD_COMPONENTS, KEY_COMPONENT_SELF, KEY_PARAM_VALUES, KEY_PARAMS_CONFIG } from './Constants';
import { IBlock, KEY_CONTENT_TEMPLATE, Template } from './Template';
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
export declare type TListeningTarget = EventEmitter | EventTarget | Array<EventEmitter | EventTarget> | NodeList | HTMLCollection;
export declare type TListener = (evt: IEvent | Event) => any;
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
export interface IPossiblyComponentElement<T extends BaseComponent = BaseComponent> extends HTMLElement {
    $component?: T | null;
    rioniteComponent?: T;
    [KEY_CONTENT_TEMPLATE]?: Template;
}
export interface IComponentElement<T extends BaseComponent = BaseComponent> extends HTMLElement {
    $component: T | null;
    rioniteComponent: T;
    [KEY_CONTENT_TEMPLATE]?: Template;
}
export declare type TComponentListeningTarget<T = BaseComponent> = TListeningTarget | string | Array<TListeningTarget> | ((this: T, self: T) => TListeningTarget | string | Array<TListeningTarget>);
export declare type TComponentListeningType<T = BaseComponent> = string | symbol | Array<string | symbol> | ((this: T, ctor: typeof BaseComponent) => string | symbol | Array<string | symbol>);
export interface IComponentListening<T = BaseComponent> {
    target?: TComponentListeningTarget<T>;
    type: TComponentListeningType<T>;
    listener: TListener | string;
    useCapture?: boolean;
}
export declare type TEventHandler<T extends BaseComponent = BaseComponent, U = IEvent | Event> = (this: T, evt: U, context: Record<string, any>, receiver: Element) => any;
export interface IComponentEvents<T extends BaseComponent = BaseComponent, U = IEvent | Event> {
    [elementName: string]: Record<string, TEventHandler<T, U>>;
}
export declare type THook = (this: BaseComponent) => void;
export declare function onReady(hook: THook): void;
export declare function onElementAttached(hook: THook): void;
export declare function onElementDetached(hook: THook): void;
export declare function onElementMoved(hook: THook): void;
export declare class BaseComponent extends EventEmitter implements IDisposable {
    static EVENT_CHANGE: string | symbol;
    static elementIs: string;
    static elementExtends: string | null;
    static params: Record<string, any> | null;
    static i18n: Record<string, any> | null;
    static _blockNamesString: string;
    static _elementBlockNames: Array<string>;
    static template: string | IBlock | Template | null;
    static get bindsInputContent(): boolean;
    static listenings: Array<IComponentListening> | null;
    static events: IComponentEvents<BaseComponent, IEvent<BaseComponent>> | null;
    static domEvents: IComponentEvents<BaseComponent, Event> | null;
    static [KEY_PARAMS_CONFIG]: Map<string, I$ComponentParamConfig> | null;
    [KEY_COMPONENT_SELF]: this;
    _disposables: Map<string, IDisposable>;
    _ownerComponent: BaseComponent | undefined;
    get ownerComponent(): BaseComponent;
    set ownerComponent(ownerComponent: BaseComponent);
    _parentComponent: BaseComponent | null | undefined;
    get parentComponent(): BaseComponent | null;
    element: IComponentElement;
    $context: Record<string, any> | undefined;
    $specifiedParams: ReadonlySet<string>;
    [KEY_PARAM_VALUES]: Map<string, any>;
    $inputContent: DocumentFragment | null;
    _bindings: Array<IBinding> | null;
    [KEY_CHILD_COMPONENTS]: Array<BaseComponent>;
    initializationWait: Promise<any> | null;
    _attached: boolean;
    get attached(): boolean;
    _initialized: boolean;
    get initialized(): boolean;
    _isReady: boolean;
    get isReady(): boolean;
    _readyHooks: Array<THook> | undefined;
    _elementAttachedHooks: Array<THook> | undefined;
    _elementDetachedHooks: Array<THook> | undefined;
    _elementMovedHooks: Array<THook> | undefined;
    constructor(el?: HTMLElement);
    onChange(listener: TListener, context?: any): this;
    offChange(listener: TListener, context?: any): this;
    handleEvent(evt: IEvent<BaseComponent>): void;
    listenTo(target: TListeningTarget | string | Array<TListeningTarget>, type: string | symbol | Array<string | symbol>, listener: TListener | Array<TListener>, context?: any, useCapture?: boolean): IDisposableListening;
    listenTo(target: TListeningTarget | string | Array<TListeningTarget>, listeners: Record<string | symbol, TListener | Array<TListener>>, context?: any, useCapture?: boolean): IDisposableListening;
    _listenTo(target: EventEmitter | EventTarget, type: string | symbol, listener: TListener, context: any, useCapture: boolean): IDisposableListening;
    setTimeout(cb: Function, delay: number): IDisposableTimeout;
    setInterval(cb: Function, delay: number): IDisposableInterval;
    registerCallback(cb: Function): IDisposableCallback;
    $interruptIfNotAttached<V>(value: V): V;
    _beforeInitializationWait(): void;
    _afterInitializationWait(): void;
    attach(ownerComponent?: BaseComponent): Promise<any> | null;
    _attach(): Promise<any> | null;
    _detach(): void;
    dispose(): BaseComponent;
    _freezeBindings(): void;
    _unfreezeBindings(): void;
    _destroyBindings(): void;
    elementConnected(): void;
    elementDisconnected(): void;
    initialize(): Promise<any> | void;
    ready(): void;
    elementAttached(): void;
    elementDetached(): void;
    elementMoved(): void;
    $<R = BaseComponent | Element>(name: string, container?: Element | BaseComponent | string): R | null;
    $$<R = BaseComponent | Element>(name: string, container?: Element | BaseComponent | string): Array<R>;
    _getElementList(name: string, container?: Element | BaseComponent | string): HTMLCollectionOf<Element> | undefined;
}
