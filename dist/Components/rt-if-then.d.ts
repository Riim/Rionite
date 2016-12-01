import { Cell } from 'cellx';
import Component from '../Component';
export declare type IfCell = Cell<boolean>;
export default class RtIfThen extends Component {
    _elseMode: boolean;
    _if: IfCell;
    _nodes: Array<Node> | null;
    _attachElement(): void;
    _detachElement(): void;
    _onIfChange(): void;
    _render(changed: boolean): void;
}
