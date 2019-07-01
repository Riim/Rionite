import { EventEmitter, IEvent } from 'cellx';
import { IFreezableCell } from './componentBinding';
import { IComponentParamTypeSerializer } from './componentParamTypeSerializers';
import { KEY_PARAM_VALUES, KEY_PARAMS_CONFIG } from './Constants';
import { IBlock, Template } from './Template';
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
    typeSerializer: IComponentParamTypeSerializer | undefined;
    default: any;
    required: boolean;
    readonly: boolean;
    paramConfig: any;
}
export interface IPossiblyComponentElement<T extends BaseComponent = BaseComponent> extends HTMLElement {
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
export declare type TEventHandler<T extends BaseComponent = BaseComponent, U = IEvent | Event> = (this: T, evt: U, context: Record<string, any>, receiver: Element) => any;
export interface IComponentEvents<T extends BaseComponent = BaseComponent, U = IEvent | Event> {
    [name: string]: {
        [eventName: string]: TEventHandler<T, U>;
    };
}
export declare class BaseComponent extends EventEmitter implements IDisposable {
    static elementIs: string;
    static elementExtends: string | null;
    static params: Record<string, any> | null;
    static i18n: Record<string, any> | null;
    static _blockNamesString: string;
    static _elementBlockNames: Array<string>;
    static template: string | IBlock | Template | null;
    static readonly bindsInputContent: boolean;
    static events: IComponentEvents<BaseComponent, IEvent<BaseComponent>> | null;
    static domEvents: IComponentEvents<BaseComponent, Event> | null;
    static [KEY_PARAMS_CONFIG]: Map<string, I$ComponentParamConfig> | null;
    _disposables: Map<string, IDisposable>;
    _ownerComponent: BaseComponent | undefined;
    ownerComponent: BaseComponent;
    _parentComponent: BaseComponent | null | undefined;
    readonly parentComponent: BaseComponent | null;
    element: IComponentElement;
    $inputContent: DocumentFragment | null;
    $context: Record<string, any> | undefined;
    $specifiedParams: ReadonlyMap<string, string>;
    _bindings: Array<IFreezableCell> | null;
    _elementListMap: Map<string, HTMLCollectionOf<Element>> | undefined;
    _attached: boolean;
    initialized: boolean;
    isReady: boolean;
    [KEY_PARAM_VALUES]: Map<string, any>;
    constructor(el?: HTMLElement);
    handleEvent(evt: IEvent<BaseComponent>): void;
    listenTo(target: TListeningTarget | string | Array<TListeningTarget>, type: string | Array<string>, listener: TListener | Array<TListener>, context?: any, useCapture?: boolean): IDisposableListening;
    listenTo(target: TListeningTarget | string | Array<TListeningTarget>, listeners: Record<string, TListener | Array<TListener>>, context?: any, useCapture?: boolean): IDisposableListening;
    _listenTo(target: EventEmitter | EventTarget, type: string, listener: TListener, context: any, useCapture: boolean): IDisposableListening;
    setTimeout(callback: Function, delay: number): IDisposableTimeout;
    setInterval(callback: Function, delay: number): IDisposableInterval;
    registerCallback(callback: Function): IDisposableCallback;
    _attach(): void;
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
