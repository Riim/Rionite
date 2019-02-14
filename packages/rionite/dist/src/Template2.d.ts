import { BaseComponent } from './BaseComponent';
export declare enum NodeType {
    BLOCK = 1,
    ELEMENT_CALL = 2,
    SUPER_CALL = 3,
    DEBUGGER_CALL = 4,
    ELEMENT = 5,
    TEXT = 6
}
export interface INode {
    nodeType: NodeType;
}
export declare type TContent = Array<INode>;
export interface IElementCall extends INode {
    nodeType: NodeType.ELEMENT_CALL;
    name: string;
}
export interface ISuperCall extends INode {
    nodeType: NodeType.SUPER_CALL;
    elementName: string;
    element: IElement;
}
export interface IDebuggerCall extends INode {
    nodeType: NodeType.DEBUGGER_CALL;
}
export interface IElementAttribute {
    name: string;
    value: string;
}
export interface IElementAttributeList {
    [attrIndex: number]: IElementAttribute;
    'length=': number;
}
export interface IElementAttributes {
    isAttributeValue: string | null;
    list: IElementAttributeList | null;
}
export interface IElement extends INode {
    nodeType: NodeType.ELEMENT;
    isHelper: boolean;
    tagName: string;
    is: string | null;
    names: Array<string | null> | null;
    attributes: IElementAttributes | null;
    content: TContent | null;
    contentTemplateIndex: number | null;
}
export interface ITextNode extends INode {
    nodeType: NodeType.TEXT;
    value: string;
}
export interface IBlock extends INode {
    nodeType: NodeType.BLOCK;
    content: TContent | null;
    elements: {
        [name: string]: IElement;
    };
}
export declare const ELEMENT_NAME_DELIMITER = "__";
export declare class Template {
    static helpers: {
        [name: string]: (el: IElement) => TContent | null;
    };
    _isEmbedded: boolean;
    parent: Template | null;
    template: string;
    _elementNamesTemplate: Array<string>;
    initialized: boolean;
    _elements: {
        [name: string]: IElement;
    };
    _pos: number;
    _chr: string;
    block: IBlock | null;
    _embeddedTemplates: Array<Template> | null;
    constructor(template: string | IBlock, options?: {
        _isEmbedded?: boolean;
        parent?: Template;
        blockName?: string | Array<string>;
    });
    initialize(component?: BaseComponent): void;
    parse(component?: BaseComponent): IBlock;
    _readContent(content: TContent | null, superElName: string | null, brackets: boolean, componentConstr?: typeof BaseComponent): TContent | null;
    _readElement(targetContent: TContent | null, superElName: string | null, componentConstr?: typeof BaseComponent): TContent | null;
    _readAttributes(superElName: string | null, isElementHelper: boolean): IElementAttributes | null;
    _readSuperCall(defaultElName: string | null): ISuperCall | null;
    _readName(reNameOrNothing: RegExp): string | null;
    _readString(): string;
    _skipWhitespaces(): string;
    _skipWhitespacesAndComments(): string;
    _next(current?: string): string;
    _throwError(msg: string, pos?: number): void;
    extend(template: string | IBlock, options?: {
        blockName?: string;
        _isEmbedded?: boolean;
    }): Template;
    setBlockName(blockName: string | Array<string>): Template;
    render(component?: BaseComponent): DocumentFragment;
}
