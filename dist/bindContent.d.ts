import { Cell, ICellOptions, TCellPull } from 'cellx';
import { BaseComponent } from './BaseComponent';
import { IFreezableCell } from './componentBinding';
export declare class AttributeBindingCell extends Cell {
    prevValue: any;
    element: Element;
    attributeName: string;
    constructor(pull: TCellPull<any>, el: Element, attrName: string, opts?: ICellOptions<any>);
}
export declare class TextNodeBindingCell extends Cell {
    textNode: Text;
    constructor(pull: TCellPull<string>, textNode: Text, opts?: ICellOptions<string>);
}
export declare function bindContent(node: Element | DocumentFragment, ownerComponent: BaseComponent, context: object, result: [Array<IFreezableCell> | null, Array<[BaseComponent, string, (evt: any) => void]> | null, Array<BaseComponent> | null]): [IFreezableCell[] | null, [BaseComponent, string, (evt: any) => void][] | null, BaseComponent[] | null];
