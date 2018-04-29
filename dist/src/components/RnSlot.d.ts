import { BaseComponent } from '../BaseComponent';
export declare class RnSlot extends BaseComponent {
    $context: {
        [name: string]: any;
    };
    paramName: string;
    paramForTag: string;
    paramFor: string;
    paramCloneContent: boolean;
    paramGetContext: (this: BaseComponent, context: {
        [name: string]: any;
    }, slot: RnSlot) => {
        [name: string]: any;
    };
    _childComponents: Array<BaseComponent> | null;
    _attach(): void;
    _detach(): void;
}
