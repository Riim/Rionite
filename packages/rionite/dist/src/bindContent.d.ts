import { TListener } from 'cellx';
import { BaseComponent } from './BaseComponent';
import { IFreezableCell } from './componentBinding';
export declare type TResult = [Array<BaseComponent> | null, Array<IFreezableCell> | null, Array<BaseComponent | string | TListener> | null];
export declare const KEY_CONTEXT: unique symbol;
export interface IAttributeBindingCellMeta {
    element: Element;
    attributeName: string;
}
export declare function bindContent(node: Element | DocumentFragment, ownerComponent: BaseComponent, context: object, result: TResult, parentComponent?: BaseComponent): TResult;
