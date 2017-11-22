import { Component } from '../Component';
export declare class RtContent extends Component {
    paramSelect: string;
    paramClone: boolean;
    paramGetContext: (this: Component, context: {
        [name: string]: any;
    }, content: RtContent) => {
        [name: string]: any;
    };
    _childComponents: Array<Component> | null;
    _attach(): void;
    _detach(): void;
}
