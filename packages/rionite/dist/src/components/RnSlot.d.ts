import { BaseComponent } from '../BaseComponent';
export declare class RnSlot extends BaseComponent {
    static readonly bindsInputContent: boolean;
    $context: Record<string, any>;
    paramName: string;
    paramForTag: string;
    paramFor: string;
    paramCloneContent: boolean;
    paramGetContext: (this: BaseComponent, context: Record<string, any>, slot: RnSlot) => Record<string, any>;
    _childComponents: Array<BaseComponent> | null;
    _attach(): void;
    _detach(): void;
}
