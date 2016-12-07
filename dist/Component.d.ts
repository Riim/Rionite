import { IEvent, EventEmitter, Cell } from 'cellx';
import DisposableMixin from './DisposableMixin';
import registerComponent from './registerComponent';
import ElementAttributes from './ElementAttributes';
export interface IComponentElement extends HTMLElement {
    rioniteComponent: Component | null;
    $c: Component;
}
export interface IComponentProperties extends ElementAttributes {
    content: DocumentFragment | null;
    context: Object | null;
}
export interface IComponentTemplate {
    render: (data: Object) => string;
}
export interface IComponentAssetClassNames {
    [assetName: string]: string;
}
export interface IComponentEvents {
    [assetName: string]: {
        [eventName: string]: (this: Component, evt: IEvent | Event) => boolean | void;
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
    static _rawContent: DocumentFragment;
    static _markupBlockNames: Array<string>;
    static _assetClassNames: IComponentAssetClassNames;
    static events: IComponentEvents | null;
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
    _bindings: Array<Cell<any>> | null;
    _assets: Map<string, NodeListOf<HTMLElement>>;
    isElementAttached: boolean;
    initialized: boolean;
    isReady: boolean;
    _isComponentSilent: boolean;
    constructor(el: HTMLElement | string | null | undefined, props: {
        [name: string]: any;
    });
    _handleEvent(evt: IEvent): void;
    _attachElement(): void;
    _detachElement(): void;
    dispose(): Component;
    _destroyBindings(): void;
    created(): void;
    initialize(): void;
    ready(): void;
    elementAttached(): void;
    beforeElementDetach(): void;
    elementDetached(): void;
    elementMoved(): void;
    elementAttributeChanged(name: string, oldValue: any, value: any): void;
    $(name: string, container?: Component | HTMLElement): Component | HTMLElement | null;
    $$(name: string, container?: Component | HTMLElement): Array<Component | HTMLElement>;
    _getAssetList(name: string, container?: Component | HTMLElement): NodeListOf<HTMLElement> | undefined;
}
