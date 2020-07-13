import { BaseComponent, IComponentElement } from './BaseComponent';
export declare const KEY_RIONITE_COMPONENT_CONSTRUCTOR: unique symbol;
export declare const KEY_ELEMENT_CONNECTED: unique symbol;
export declare function suppressConnectionStatusCallbacks(): void;
export declare function resumeConnectionStatusCallbacks(): void;
export declare const ElementProtoMixin: {
    $component: null;
    readonly rioniteComponent: BaseComponent;
    [KEY_ELEMENT_CONNECTED]: boolean;
    connectedCallback(this: IComponentElement): void;
    disconnectedCallback(this: IComponentElement): void;
    attributeChangedCallback(this: IComponentElement, name: string, _prevRawValue: string | null, rawValue: string | null): void;
};
