import { IComponentElement, default as Component } from './Component';
export declare let ElementsController: {
    skipConnectionStatusCallbacks: boolean;
};
declare let ElementProtoMixin: {
    [x: string]: boolean | ((this: IComponentElement, name: string, oldValue: string | null, value: string | null) => void) | Component | null;
    rioniteComponent: null;
    readonly $component: Component;
    connectedCallback(this: IComponentElement): void;
    disconnectedCallback(this: IComponentElement): void;
    attributeChangedCallback(this: IComponentElement, name: string, oldValue: string | null, value: string | null): void;
};
export default ElementProtoMixin;
