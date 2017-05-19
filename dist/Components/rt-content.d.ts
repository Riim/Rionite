import { default as Component } from '../Component';
export default class RtContent extends Component {
    ownerComponent: Component;
    _childComponents: Array<Component> | null;
    _attach(): void;
    _detach(): void;
}
