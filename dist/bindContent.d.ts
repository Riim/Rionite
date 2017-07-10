import { Component } from './Component';
import { IFreezableCell } from './componentBinding';
export declare function bindContent(node: Element | DocumentFragment, ownerComponent: Component, context: object, result: [Array<IFreezableCell> | null, Array<Component> | null]): [Array<IFreezableCell> | null, Array<Component> | null];
