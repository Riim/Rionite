import { BaseComponent } from '../BaseComponent';
export declare class RnSlot2 extends BaseComponent {
    static readonly bindsInputContent: boolean;
    $context: {
        [name: string]: any;
    };
    paramName: string;
    paramForTag: string;
    paramFor: string;
    paramCloneContent: boolean;
    paramGetContext: (this: BaseComponent, context: {
        [name: string]: any;
    }, slot: RnSlot2) => {
        [name: string]: any;
    };
    _childComponents: Array<BaseComponent> | null;
    _attach(): void;
    _detach(): void;
}
