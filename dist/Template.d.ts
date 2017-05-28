import { INode, TContent, IBlock, IElement as INelmElement } from 'nelm-parser';
export interface IElement {
    name: string | null;
    superCall: boolean;
    source: Array<string> | null;
    innerSource: Array<string>;
}
export interface IRenderer {
    (this: IElementRendererMap): string;
}
export interface IElementRenderer {
    (this: IElementRendererMap, $super?: IElementRendererMap): string;
}
export interface IElementRendererMap {
    [elName: string]: IElementRenderer;
}
export default class Template {
    static helpers: {
        [name: string]: (el: INelmElement) => TContent | null;
    };
    parent: Template | null;
    nelm: IBlock;
    _elementClassesTemplate: Array<string>;
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
    _renderer: IRenderer;
    _elementRendererMap: IElementRendererMap;
    constructor(nelm: string | IBlock, opts?: {
        parent?: Template;
        blockName?: string;
    });
    extend(nelm: string | IBlock, opts?: {
        blockName?: string;
    }): Template;
    setBlockName(blockName: string | null): Template;
    render(): string;
    _compileRenderers(): IRenderer;
    _compileNode(node: INode, parentElementName?: string): void;
    _renderElementClasses(elNames: Array<string | null>): string;
}
