import { EventEmitter, IEvent, IEventEmitterListener } from 'cellx';
import { IBlock, Template } from 'nelm';
import { IFreezableCell } from './componentBinding';
import { IComponentInput } from './ComponentInput';
import { DisposableMixin, IDisposableListening, TListener, TListeningTarget } from './DisposableMixin';
import { registerComponent } from './registerComponent';
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
export declare type TOEventHandler<T extends Component> = (this: T, evt: IEvent | Event) => boolean | void;
export interface IComponentOEvents<T extends Component> {
    [name: string]: {
        [eventName: string]: TOEventHandler<T>;
    };
}
export declare type TEventHandler<T extends Component> = (this: T, evt: IEvent | Event, receiver: Element) => boolean | void;
export interface IComponentEvents<T extends Component> {
    [name: string]: {
        [eventName: string]: TEventHandler<T>;
    };
}
export declare class Component extends EventEmitter implements DisposableMixin {
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
    static oevents: IComponentOEvents<Component> | null;
    static events: IComponentEvents<Component> | null;
    static domEvents: IComponentEvents<Component> | null;
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
    _handleEvent(evt: IEvent<Component>): void;
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
    dispose(): Component;
    _freezeBindings(): void;
    _unfreezeBindings(): void;
    _destroyBindings(): void;
    created(): void;
    initialize(): Promise<any> | void;
    ready(): void;
    elementConnected(): void;
    elementDisconnected(): void;
    elementAttached(): void;
    elementDetached(): void;
    elementMoved(): void;
    $<R = Component | Element>(name: string, container?: Component | Element): R | null;
    $$<R = Component | Element>(name: string, container?: Component | Element): Array<R>;
    _getElementList(name: string, container?: Component | Element): NodeListOf<Element> | undefined;
}
