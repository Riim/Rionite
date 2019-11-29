import { BaseComponent } from '../BaseComponent';
export declare class RnSlot extends BaseComponent {
    static get bindsInputContent(): boolean;
    $context: Record<string, any>;
    name: string | null;
    forTag: string | null;
    paramFor: string | null;
    cloneContent: boolean;
    getContext: ((this: BaseComponent, context: Record<string, any>, slot: RnSlot) => Record<string, any>) | null;
    _childComponents: Array<BaseComponent> | null;
    _attach(): null;
    _detach(): void;
}
