import { Cell } from 'cellx';
import { Component } from '../Component';
export declare type TIfCell = Cell<boolean>;
export declare class RtIfThen extends Component {
    _elseMode: boolean;
    _if: TIfCell;
    _nodes: Array<Node> | null;
    _active: boolean;
    elementConnected(): void;
    elementDisconnected(): void;
    _onIfChange(): void;
    _attach(): void;
    _detach(): void;
    _render(changed: boolean): void;
    _deactivate(): void;
}
