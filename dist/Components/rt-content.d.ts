import { BaseComponent } from '../BaseComponent';
export declare class RtContent extends BaseComponent {
    paramSelect: string;
    paramClone: boolean;
    paramGetContext: (this: BaseComponent, context: {
        [name: string]: any;
    }, content: RtContent) => {
        [name: string]: any;
    };
    _childComponents: Array<BaseComponent> | null;
    _attach(): void;
    _detach(): void;
}
