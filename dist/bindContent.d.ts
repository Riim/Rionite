import { default as Component } from './Component';
import { IFreezableCell } from './componentBinding';
export default function bindContent(node: Element | DocumentFragment, ownerComponent: Component, context: Object, result: [Array<IFreezableCell> | null, Array<Component> | null]): [Array<IFreezableCell> | null, Array<Component> | null];
