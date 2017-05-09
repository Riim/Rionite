import { Cell } from 'cellx';
import Component from '../Component';
export declare type TRtIfThenIfCell = Cell<boolean>;
export default class RtIfThen extends Component {
    ownerComponent: Component;
    _elseMode: boolean;
    _if: TRtIfThenIfCell;
    _nodes: Array<Node> | null;
    _destroyed: boolean;
    elementConnected(): void;
    elementDisconnected(): void;
    _onIfChange(): void;
    _attach(): void;
    _detach(): void;
    _render(changed: boolean): void;
    _destroy(): void;
}
