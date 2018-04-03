import { IBlock, IElement as INelmElement, INode, TContent } from 'nelm-parser';
export interface IElement {
    name: string | null;
    superCall: boolean;
    source: Array<string> | null;
    innerSource: Array<string>;
}
export declare type TRenderer = (this: IElementRendererMap) => string;
export declare type TElementRenderer = (this: IElementRendererMap, $super?: IElementRendererMap) => string;
export interface IElementRendererMap {
    [elName: string]: TElementRenderer;
}
export declare let ELEMENT_NAME_DELIMITER: string;
export declare class Template {
    static helpers: {
        [name: string]: (el: INelmElement) => TContent | null;
    };
    parent: Template | null;
    nelm: IBlock;
    _elementBlockNamesTemplate: Array<string>;
    _tagNameMap: {
        [elName: string]: string;
    };
    _attributeListMap: {
        [elName: string]: Object;
    };
    _attributeCountMap: {
        [elName: string]: number;
    };
    _currentElement: IElement;
    _elements: Array<IElement>;
    _elementMap: {
        [elName: string]: IElement;
    };
    _renderer: TRenderer;
    _elementRendererMap: IElementRendererMap;
    constructor(nelm: string | IBlock, opts?: {
        parent?: Template;
        blockName?: string | Array<string>;
    });
    extend(nelm: string | IBlock, opts?: {
        blockName?: string;
    }): Template;
    setBlockName(blockName: string | Array<string>): Template;
    render(): string;
    _compileRenderers(): TRenderer;
    _compileNode(node: INode, parentElName?: string): void;
    _renderElementClasses(elNames: Array<string | null>): string;
}
