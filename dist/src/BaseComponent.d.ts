import { Logger } from '@riim/logger';
import { EventEmitter, IEvent } from 'cellx';
import { IBlock } from 'nelm-parser';
import { IFreezableCell } from './componentBinding';
import { IComponentParamTypeSerializer } from './componentParamTypeSerializerMap';
import { DisposableMixin, IDisposableListening, TListener, TListeningTarget } from './DisposableMixin';
import { Template } from './Template';
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
export interface IPossiblyComponentElement<T extends BaseComponent = BaseComponent> extends HTMLElement {
    rioniteComponent?: T | null;
    $component?: T;
}
export interface IComponentElement<T extends BaseComponent = BaseComponent> extends HTMLElement {
    rioniteComponent: T | null;
    $component: T;
}
export interface IComponentElementClassNameMap {
    [elName: string]: string;
}
export declare type TEventHandler<T extends BaseComponent = BaseComponent, U = IEvent | Event> = (this: T, evt: U, context: {
    [name: string]: any;
}, receiver: Element) => any;
export interface IComponentEvents<T extends BaseComponent = BaseComponent, U = IEvent | Event> {
    [name: string]: {
        [eventName: string]: TEventHandler<T, U>;
    };
}
export declare const KEY_PARAMS_CONFIG: symbol;
export declare const KEY_PARAMS: symbol;
export declare const KEY_IS_SLOT: symbol;
export declare class BaseComponent extends EventEmitter implements DisposableMixin {
    static elementIs: string;
    static elementExtends: string | null;
    static params: {
        [name: string]: any;
    } | null;
    static i18n: {
        [key: string]: any;
    } | null;
    static _blockNamesString: string;
    static _elementBlockNames: Array<string>;
    static template: string | IBlock | Template | null;
    static _rawContent: DocumentFragment | undefined;
    static readonly bindsInputContent: boolean;
    static events: IComponentEvents<BaseComponent, IEvent<BaseComponent>> | null;
    static domEvents: IComponentEvents<BaseComponent, Event> | null;
    logger: Logger;
    _disposables: typeof DisposableMixin.prototype._disposables;
    _ownerComponent: BaseComponent | undefined;
    ownerComponent: BaseComponent;
    _parentComponent: BaseComponent | null | undefined;
    readonly parentComponent: BaseComponent | null;
    element: IComponentElement;
    $inputContent: DocumentFragment | undefined;
    $context: {
        [name: string]: any;
    } | undefined;
    $specifiedParams: Set<string> | undefined;
    _bindings: Array<IFreezableCell> | null;
    _elementListMap: Map<string, NodeListOf<Element>> | undefined;
    _attached: boolean;
    initialized: boolean;
    isReady: boolean;
    constructor(el?: HTMLElement);
    handleEvent(evt: IEvent<BaseComponent>): void;
    listenTo(target: TListeningTarget | string | Array<TListeningTarget>, type: string | Array<string>, listener: TListener | Array<TListener>, context?: any, useCapture?: boolean): IDisposableListening;
    listenTo(target: TListeningTarget | string | Array<TListeningTarget>, listeners: {
        [type: string]: TListener | Array<TListener>;
    }, context?: any, useCapture?: boolean): IDisposableListening;
    _listenTo(target: EventEmitter | EventTarget, type: string, listener: TListener, context: any, useCapture: boolean): IDisposableListening;
    setTimeout: typeof DisposableMixin.prototype.setTimeout;
    setInterval: typeof DisposableMixin.prototype.setInterval;
    registerCallback: typeof DisposableMixin.prototype.registerCallback;
    _attach(): void;
    _detach(): void;
    dispose(): BaseComponent;
    _freezeBindings(): void;
    _unfreezeBindings(): void;
    _destroyBindings(): void;
    created(): void;
    elementConnected(): void;
    elementDisconnected(): void;
    initialize(): Promise<any> | void;
    ready(): void;
    elementAttached(): void;
    elementDetached(): void;
    elementMoved(): void;
    $<R = BaseComponent | Element>(name: string, container?: Element | BaseComponent | string): R | null;
    $$<R = BaseComponent | Element>(name: string, container?: Element | BaseComponent | string): Array<R>;
    _getElementList(name: string, container?: Element | BaseComponent | string): NodeListOf<Element> | undefined;
}
