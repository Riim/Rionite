import { Component } from '../Component';
export declare class RtSlot extends Component {
    paramForTag: string;
    paramFor: string;
    paramCloneContent: boolean;
    paramGetContext: (this: Component, context: {
        [name: string]: any;
    }, slot: RtSlot) => {
        [name: string]: any;
    };
    _childComponents: Array<Component> | null;
    _attach(): void;
    _detach(): void;
}
