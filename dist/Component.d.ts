import { IEvent, EventEmitter } from 'cellx';
import DisposableMixin from './DisposableMixin';
import registerComponent from './registerComponent';
import ElementAttributes from './ElementAttributes';
import { IFreezableCell } from './componentBinding';
export interface IComponentElement extends HTMLElement {
    rioniteComponent: Component | null;
    $c: Component;
}
export interface IComponentProperties extends ElementAttributes {
    _content: DocumentFragment | null;
    context: Object | null;
}
export interface IComponentTemplate {
    render: (data: Object) => string;
}
export interface IComponentAssetClassNames {
    [assetName: string]: string;
}
export interface IComponentEvents<T> {
    [assetName: string]: {
        [eventName: string]: (this: T, evt: IEvent | Event, target: HTMLElement) => boolean | void;
    };
}
export default class Component extends EventEmitter implements DisposableMixin {
    static extend(elIs: string, description: any): typeof Component;
    static _registeredComponent: typeof Component;
    static register: typeof registerComponent;
    static elementIs: string;
    static elementExtends: string;
    static elementAttributes: {
        [name: string]: any;
    } | null;
    static props: {
        [name: string]: any;
    } | null;
    static i18n: {
        [key: string]: any;
    };
    static template: string | IComponentTemplate | null;
    static bemlTemplate: string | null;
    static _rawContent: DocumentFragment | undefined;
    static _markupBlockNames: Array<string>;
    static _assetClassNames: IComponentAssetClassNames;
    static events: IComponentEvents<Component> | null;
    _disposables: any;
    listenTo: any;
    _listenTo: any;
    setTimeout: any;
    setInterval: any;
    registerCallback: any;
    ownerComponent: Component | null;
    _parentComponent: Component | null | undefined;
    readonly parentComponent: Component | null;
    element: IComponentElement;
    readonly elementAttributes: ElementAttributes;
    readonly props: IComponentProperties;
    _bindings: Array<IFreezableCell> | null;
    _assets: Map<string, NodeListOf<HTMLElement>>;
    isElementAttached: boolean;
    initialized: boolean;
    isReady: boolean;
    _isComponentSilent: boolean;
    constructor(el?: HTMLElement | string, props?: {
        [name: string]: any;
    });
    _handleEvent(evt: IEvent): void;
    _attachElement(): void;
    _detachElement(): void;
    dispose(): Component;
    _freezeBindings(): void;
    _unfreezeBindings(): void;
    _destroyBindings(): void;
    created(): void;
    initialize(): void;
    ready(): void;
    elementAttached(): void;
    elementDetached(): void;
    elementMoved(): void;
    elementAttributeChanged(name: string, oldValue: any, value: any): void;
    $(name: string, container?: Component | HTMLElement): Component | HTMLElement | null;
    $$(name: string, container?: Component | HTMLElement): Array<Component | HTMLElement>;
    _getAssetList(name: string, container?: Component | HTMLElement): NodeListOf<HTMLElement> | undefined;
}
