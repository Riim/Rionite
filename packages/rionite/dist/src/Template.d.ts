import { BaseComponent, I$ComponentParamConfig } from './BaseComponent';
import { TContentBindingResult } from './bindContent';
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
    isTransformer: boolean;
    name: string;
    value: string;
    pos: number;
}
export interface IElementAttributeList {
    [attrIndex: number]: IElementAttribute;
    'length=': number;
}
export interface IElementAttributes {
    attributeIsValue: string | null;
    list: IElementAttributeList | null;
}
export interface IElement extends INode {
    nodeType: NodeType.ELEMENT;
    isTransformer: boolean;
    tagName: string;
    is: string | null;
    names: Array<string | null> | null;
    attributes: IElementAttributes | null;
    $specifiedParams: Map<string, string> | null;
    events: Map<string | symbol, string> | null;
    domEvents: Map<string, string> | null;
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
    elements: Record<string, IElement>;
}
export declare const KEY_CONTENT_TEMPLATE: unique symbol;
export declare const ELEMENT_NAME_DELIMITER = "__";
export declare class Template {
    static elementTransformers: Record<string, (el: IElement) => TContent | null>;
    static attributeTransformers: Record<string, (el: IElement, attr: IElementAttribute) => IElement>;
    _embedded: boolean;
    parent: Template | null;
    template: string;
    _elementNamesTemplate: Array<string>;
    initialized: boolean;
    _elements: Record<string, IElement>;
    _pos: number;
    _chr: string;
    block: IBlock | null;
    _embeddedTemplates: Array<Template> | null;
    constructor(template: string | IBlock, options?: {
        _embedded?: boolean;
        parent?: Template;
        blockName?: string | Array<string>;
    });
    initialize(component?: BaseComponent | null): void;
    parse(component?: BaseComponent | null): IBlock;
    _readContent(content: TContent | null, superElName: string | null, brackets: boolean, componentConstr?: typeof BaseComponent | null): TContent | null;
    _readElement(targetContent: TContent | null, superElName: string | null, componentConstr?: typeof BaseComponent | null): TContent | null;
    _readAttributes(superElName: string | null, $paramsConfig?: Map<string, I$ComponentParamConfig> | null, $specifiedParams?: Map<string, string>): IElementAttributes | null;
    _readSuperCall(defaultElName: string | null): ISuperCall | null;
    _readName(reName: RegExp): string | null;
    _readString(): string;
    _skipWhitespaces(): string;
    _skipWhitespacesAndComments(): string;
    _next(current?: string): string;
    _throwError(msg: string, pos?: number): void;
    extend(template: string | IBlock, options?: {
        blockName?: string;
        _embedded?: boolean;
    }): Template;
    setBlockName(blockName: string | Array<string>): Template;
    render(component?: BaseComponent | null, ownerComponent?: BaseComponent, context?: object, result?: TContentBindingResult, parentComponent?: BaseComponent): DocumentFragment;
}
