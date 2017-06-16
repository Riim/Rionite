import { default as Component } from './Component';
import { IFreezableCell } from './componentBinding';
export default function bindContent(content: HTMLElement | DocumentFragment, ownerComponent: Component, context?: Object | null): [Array<IFreezableCell> | null, Array<Component> | null];
