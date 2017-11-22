import { Component } from '../Component';
export declare class RtSlot extends Component {
    readonly paramForTag: string | null;
    readonly paramFor: string | null;
    readonly paramCloneContent: boolean;
    readonly paramGetContext: ((this: Component, context: {
        [name: string]: any;
    }, slot: RtSlot) => {
        [name: string]: any;
    }) | null;
    _childComponents: Array<Component> | null;
    _attach(): void;
    _detach(): void;
}
