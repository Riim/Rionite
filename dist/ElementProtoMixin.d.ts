import { Component, IComponentElement } from './Component';
export declare let KEY_IS_ELEMENT_CONNECTED: symbol;
export declare function suppressConnectionStatusCallbacks(): void;
export declare function resumeConnectionStatusCallbacks(): void;
export declare let ElementProtoMixin: {
    [x: string]: boolean | Component | ((this: IComponentElement<Component>, name: string, prev: string | null, value: string | null) => void) | null;
    rioniteComponent: null;
    readonly $component: Component;
    connectedCallback(this: IComponentElement<Component>): void;
    disconnectedCallback(this: IComponentElement<Component>): void;
    attributeChangedCallback(this: IComponentElement<Component>, name: string, prev: string | null, value: string | null): void;
};
