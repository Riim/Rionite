import { IEvent, EventEmitter } from 'cellx';
import { Template as BemlTemplate } from '@riim/beml';
import { IDisposableListening, IListener, default as DisposableMixin } from './DisposableMixin';
import registerComponent from './registerComponent';
import { IComponentProperties } from './ComponentProperties';
import { IFreezableCell } from './componentBinding';
export interface IComponentElement extends HTMLElement {
    rioniteComponent: Component | null;
    $c: Component;
}
export interface IComponentTemplate {
    render: (data: Object) => string;
}
export interface IComponentElementClassNameMap {
    [elName: string]: string;
}
export interface IComponentEvents<T> {
    [elName: string]: {
        [eventName: string]: (this: T, evt: IEvent | Event) => boolean | void;
    };
}
export default class Component extends EventEmitter implements DisposableMixin {
    static extend(elIs: string, description: any): typeof Component;
    static _registeredComponent: typeof Component;
    static register: typeof registerComponent;
    static elementIs: string;
    static elementExtends: string;
    static props: {
        [name: string]: any;
    } | null;
    static i18n: {
        [key: string]: any;
    };
    static template: string | IComponentTemplate | null;
    static bemlTemplate: string | BemlTemplate | null;
    static _blockNamesString: string;
    static _rawContent: DocumentFragment | undefined;
    static _blockNames: Array<string>;
    static _elementClassNameMap: IComponentElementClassNameMap;
    static events: IComponentEvents<Component> | null;
    _disposables: typeof DisposableMixin.prototype._disposables;
    ownerComponent: Component | null;
    _parentComponent: Component | null | undefined;
    readonly parentComponent: Component | null;
    element: IComponentElement;
    readonly props: IComponentProperties;
    _bindings: Array<IFreezableCell> | null;
    _elementListMap: Map<string, NodeListOf<HTMLElement>>;
    _attached: boolean;
    initialized: boolean;
    isReady: boolean;
    _silent: boolean;
    constructor(el?: HTMLElement | string, props?: {
        [name: string]: any;
    });
    _handleEvent(evt: IEvent): void;
    listenTo: typeof DisposableMixin.prototype.listenTo;
    _listenTo(target: EventEmitter | EventTarget, type: string, listener: IListener, context: any): IDisposableListening;
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
    propertyChanged(name: string, oldValue: any, value: any): void;
    $(name: string, container?: Component | HTMLElement): Component | HTMLElement | null;
    $$(name: string, container?: Component | HTMLElement): Array<Component | HTMLElement>;
    _getElementList(name: string, container?: Component | HTMLElement): NodeListOf<HTMLElement> | undefined;
}
