import { Cell } from 'cellx';
import Component from '../Component';
export declare type TRtIfThenIfCell = Cell<boolean>;
export default class RtIfThen extends Component {
    _elseMode: boolean;
    _if: TRtIfThenIfCell;
    _nodes: Array<Node> | null;
    _destroyed: boolean;
    _attachElement(): void;
    _detachElement(): void;
    _onIfChange(): void;
    _render(changed: boolean): void;
    _destroy(): void;
}
