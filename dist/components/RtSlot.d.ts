import { BaseComponent } from '../BaseComponent';
export declare class RtSlot extends BaseComponent {
    $context: {
        [name: string]: any;
    };
    paramForTag: string;
    paramFor: string;
    paramCloneContent: boolean;
    paramGetContext: (this: BaseComponent, context: {
        [name: string]: any;
    }, slot: RtSlot) => {
        [name: string]: any;
    };
    _childComponents: Array<BaseComponent> | null;
    _attach(): void;
    _detach(): void;
}
