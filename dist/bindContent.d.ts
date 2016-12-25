import { default as Component } from './Component';
import { IFreezableCell } from './componentBinding';
export default function bindContent(content: Node, ownerComponent: Component, context?: Object): {
    bindings: Array<IFreezableCell> | null;
    childComponents: Array<Component> | null;
};
