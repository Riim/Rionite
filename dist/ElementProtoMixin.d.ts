import { BaseComponent, IComponentElement } from './BaseComponent';
export declare let KEY_IS_ELEMENT_CONNECTED: symbol;
export declare function suppressConnectionStatusCallbacks(): void;
export declare function resumeConnectionStatusCallbacks(): void;
export declare let ElementProtoMixin: {
    [x: string]: boolean | BaseComponent | ((this: IComponentElement<BaseComponent>, name: string, prev: string | null, value: string | null) => void) | null;
    rioniteComponent: null;
    readonly $component: BaseComponent;
    connectedCallback(this: IComponentElement<BaseComponent>): void;
    disconnectedCallback(this: IComponentElement<BaseComponent>): void;
    attributeChangedCallback(this: IComponentElement<BaseComponent>, name: string, prev: string | null, value: string | null): void;
};
