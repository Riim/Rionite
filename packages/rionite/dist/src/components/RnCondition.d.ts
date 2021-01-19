import { Cell } from 'cellx';
import { BaseComponent } from '../BaseComponent';
export declare class RnCondition extends BaseComponent {
    static EVENT_CHANGE: symbol;
    static get bindsInputContent(): boolean;
    $context: Record<string, any>;
    paramIf: string;
    paramUnless: string;
    trueWhenPending: boolean;
    _unless: boolean;
    _conditionCell: Cell<boolean | undefined>;
    _nodes: Array<Node> | null;
    _childComponents: Array<BaseComponent> | null;
    _active: boolean;
    elementConnected(): void;
    elementDisconnected(): void;
    _onConditionChange(): void;
    _connect(): null;
    _disconnect(): void;
    _render(changed: boolean): void;
    _deactivate(): void;
    _deactivateChildComponents(): void;
}
