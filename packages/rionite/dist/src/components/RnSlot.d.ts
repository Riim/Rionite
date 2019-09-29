import { BaseComponent } from '../BaseComponent';
export declare class RnSlot extends BaseComponent {
    static readonly bindsInputContent: boolean;
    $context: Record<string, any>;
    name: string;
    forTag: string;
    paramFor: string;
    cloneContent: boolean;
    getContext: (this: BaseComponent, context: Record<string, any>, slot: RnSlot) => Record<string, any>;
    _childComponents: Array<BaseComponent> | null;
    _attach(): void;
    _detach(): void;
}
