import { default as Component } from '../Component';
export default class RtSlot extends Component {
    ownerComponent: Component;
    _childComponents: Array<Component> | null;
    _attach(): void;
    _detach(): void;
}