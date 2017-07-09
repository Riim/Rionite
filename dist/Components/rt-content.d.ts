import { Component } from '../Component';
export declare class RtContent extends Component {
    ownerComponent: Component;
    _childComponents: Array<Component> | null;
    _attach(): void;
    _detach(): void;
}
