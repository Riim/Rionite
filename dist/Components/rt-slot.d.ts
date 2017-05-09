import Component from '../Component';
export default class RtSlot extends Component {
    ownerComponent: Component;
    _templateContent: DocumentFragment;
    _attach(): void;
    _detach(): void;
}
