import { Cell } from 'cellx';
import { default as Component } from './Component';
export default function bindContent(content: Node, ownerComponent: Component, context?: Object): {
    bindings: Array<Cell<any>> | null;
    childComponents: Array<Component> | null;
};
