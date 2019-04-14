import { Cell, IEvent, TListener } from 'cellx';
import { BaseComponent } from './BaseComponent';
import { IFreezableCell } from './componentBinding';
import { TTemplateNodeValue } from './TemplateNodeValueParser';
export declare type TContentBindingResult = [Array<BaseComponent> | null, Array<IFreezableCell> | null, Array<BaseComponent | string | TListener> | null];
export declare const KEY_CONTEXT: unique symbol;
export declare const templateNodeValueASTCache: Record<string, TTemplateNodeValue | null>;
export interface IAttributeBindingCellMeta {
    element: Element;
    attributeName: string;
}
export declare function onAttributeBindingCellChange(evt: IEvent<Cell<any, IAttributeBindingCellMeta>>): void;
export declare function onTextNodeBindingCellChange(evt: IEvent<Cell<string, {
    textNode: Text;
}>>): void;
export declare function bindContent(node: Element | DocumentFragment, ownerComponent: BaseComponent, context: object, result: TContentBindingResult, parentComponent?: BaseComponent): TContentBindingResult;
