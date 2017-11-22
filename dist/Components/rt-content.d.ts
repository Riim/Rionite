import { Component } from '../Component';
export declare class RtContent extends Component {
    readonly paramSelect: string | null;
    readonly paramClone: boolean;
    readonly paramGetContext: ((this: Component, context: {
        [name: string]: any;
    }, content: Component) => {
        [name: string]: any;
    }) | null;
    _childComponents: Array<Component> | null;
    _attach(): void;
    _detach(): void;
}
