import Component from './Component';
export declare let ElementsController: {
    skipConnectionStatusCallbacks: boolean;
};
declare let ElementProtoMixin: {
    [x: string]: boolean | Component | ((name: string, oldValue: string | null, value: string | null) => void) | null;
    rioniteComponent: null;
    readonly $c: Component;
    connectedCallback(): void;
    disconnectedCallback(): void;
    attributeChangedCallback(name: string, oldValue: string | null, value: string | null): void;
};
export default ElementProtoMixin;
