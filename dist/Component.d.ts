import { IEvent, IEventEmitterListener, EventEmitter } from 'cellx';
import { IBlock, Template } from 'nelm';
import { IDisposableListening, IListener, default as DisposableMixin } from './DisposableMixin';
import registerComponent from './registerComponent';
import { IComponentInput } from './ComponentInput';
import { IFreezableCell } from './componentBinding';
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
export declare type TEventHandler<T> = (this: T, evt: IEvent | Event) => boolean | void;
export interface IComponentEvents<T> {
    [elName: string]: {
        [eventName: string]: TEventHandler<T>;
    };
}
export declare type TEventHandler2<T> = (this: T, evt: IEvent | Event, receiver: Element) => boolean | void;
export interface IComponentEvents2<T> {
    [elName: string]: {
        [eventName: string]: TEventHandler2<T>;
    };
}
export default class Component extends EventEmitter implements DisposableMixin {
    static extend(elIs: string, description: any): typeof Component;
    static register: typeof registerComponent;
    static elementIs: string;
    static elementExtends: string | null;
    static input: {
        [name: string]: any;
    } | null;
    static i18n: {
        [key: string]: any;
    } | null;
    static _blockNamesString: string;
    static template: string | IBlock | Template | null;
    static _contentBlockNames: Array<string>;
    static _rawContent: DocumentFragment | undefined;
    static _elementClassNameMap: IComponentElementClassNameMap;
    static events: IComponentEvents<Component> | null;
    static events2: IComponentEvents2<Component> | null;
    static domEvents: IComponentEvents2<Component> | null;
    _disposables: typeof DisposableMixin.prototype._disposables;
    ownerComponent: Component | null;
    _parentComponent: Component | null | undefined;
    readonly parentComponent: Component | null;
    element: IComponentElement;
    readonly input: IComponentInput;
    _bindings: Array<IFreezableCell> | null;
    _elementListMap: Map<string, NodeListOf<Element>> | undefined;
    _attached: boolean;
    initialized: boolean;
    isReady: boolean;
    constructor(el?: HTMLElement);
    _on(type: string, listener: IEventEmitterListener, context: any): void;
    _handleEvent(evt: IEvent): void;
    listenTo: typeof DisposableMixin.prototype.listenTo;
    _listenTo(target: EventEmitter | EventTarget, type: string, listener: IListener, context: any, useCapture: boolean): IDisposableListening;
    setTimeout: typeof DisposableMixin.prototype.setTimeout;
    setInterval: typeof DisposableMixin.prototype.setInterval;
    registerCallback: typeof DisposableMixin.prototype.registerCallback;
    _attach(): void;
    _detach(): void;
    dispose(): Component;
    _freezeBindings(): void;
    _unfreezeBindings(): void;
    _destroyBindings(): void;
    created(): void;
    initialize(): void;
    ready(): void;
    elementConnected(): void;
    elementDisconnected(): void;
    elementAttached(): void;
    elementDetached(): void;
    elementMoved(): void;
    $(name: string, container?: Component | Element): Component | Element | null;
    $$(name: string, container?: Component | Element): Array<Component | Element>;
    _getElementList(name: string, container?: Component | Element): NodeListOf<Element> | undefined;
}
