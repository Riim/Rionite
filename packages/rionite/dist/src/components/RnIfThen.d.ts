import { Cell } from 'cellx';
import { BaseComponent } from '../BaseComponent';
export declare class RnIfThen extends BaseComponent {
    static EVENT_CHANGE: symbol;
    static get bindsInputContent(): boolean;
    $context: Record<string, any>;
    paramIf: string;
    withUndefined: boolean;
    _elseMode: boolean;
    _if: Cell<boolean | undefined>;
    _nodes: Array<Node> | null;
    _childComponents: Array<BaseComponent> | null;
    _active: boolean;
    elementConnected(): void;
    elementDisconnected(): void;
    _onIfChange(): void;
    _attach(): null;
    _detach(): void;
    _render(changed: boolean): void;
    _deactivate(): void;
    _deactivateChildComponents(): void;
}
