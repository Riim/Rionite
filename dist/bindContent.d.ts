import { default as Component } from './Component';
import { IFreezableCell } from './componentBinding';
export default function bindContent(content: Node, ownerComponent: Component, context?: Object | null): [Array<IFreezableCell> | null, Array<Component> | null];
