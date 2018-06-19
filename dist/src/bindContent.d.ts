import { TListener } from 'cellx';
import { BaseComponent } from './BaseComponent';
import { IFreezableCell } from './componentBinding';
import { Template } from './Template';
export interface INodeBindingSchema {
    index: number;
    specifiedParams: Set<string> | null;
    childComponents: Array<number> | null;
    attributes: Array<string> | null;
    textChildren: Array<number> | null;
    context: Array<number> | null;
    childSchemas: Array<INodeBindingSchema> | null;
}
export declare type TResult = [Array<BaseComponent> | null, Array<IFreezableCell> | null, Array<BaseComponent | string | TListener> | null];
export declare const KEY_NODE_BINDING_SCHEMA: unique symbol;
export declare const KEY_NODE_BINDING_SCHEMAS: unique symbol;
export declare const KEY_CHILD_COMPONENTS: unique symbol;
export declare const KEY_CONTEXT: unique symbol;
export interface IAttributeBindingCellMeta {
    element: Element;
    attributeName: string;
}
export declare function prepareContent<T extends Node = DocumentFragment | Element>(node: T): T;
export declare function bindComponentContent(component: BaseComponent, node: Element | DocumentFragment, ownerComponent: BaseComponent, context: object, result: TResult): TResult;
export declare function bindComponentContent2(ownerComponentTemplate: Template, pid: string | null, node: Element | DocumentFragment, ownerComponent: BaseComponent, context: object, result: TResult): TResult;
export declare function bindContent(node: Element | DocumentFragment, index: number, ownerComponent: BaseComponent, context: object, result: TResult, schema?: INodeBindingSchema | null, parentComponent?: BaseComponent): INodeBindingSchema | null;
