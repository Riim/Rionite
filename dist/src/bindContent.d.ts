import { TListener } from 'cellx';
import { BaseComponent } from './BaseComponent';
import { IFreezableCell } from './componentBinding';
export interface INodeBindingSchema {
    index: number;
    specifiedParams: Set<string> | null;
    childComponents: Array<number> | null;
    attributes: Array<string> | null;
    textChildren: Array<number> | null;
    context: Array<number> | null;
    childSchemas: Array<INodeBindingSchema> | null;
}
export declare const KEY_NODE_BINDING_SCHEMA: unique symbol;
export declare const KEY_CHILD_COMPONENTS: unique symbol;
export declare const KEY_CONTEXT: unique symbol;
export interface IAttributeBindingCellMeta {
    element: Element;
    attributeName: string;
}
export declare function prepareContent<T extends Node = DocumentFragment | Element>(node: T): T;
export declare function bindContent(component: BaseComponent | null, node: Element | DocumentFragment, ownerComponent: BaseComponent, context: object, result: [Array<BaseComponent> | null, Array<IFreezableCell> | null, Array<BaseComponent | string | TListener> | null], parentComponent?: BaseComponent): INodeBindingSchema | null;
