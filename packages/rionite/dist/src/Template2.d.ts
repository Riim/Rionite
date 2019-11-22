import { TContent as TParserContent, TElement as TParserElement, TElementAttributes as TParserElementAttributes, TNode as TParserNode, TSuperCall as TParserSuperCall } from '@riim/rionite-template-parser-2';
import { BaseComponent, I$ComponentParamConfig } from './BaseComponent';
import { TContentBindingResult } from './bindContent';
export declare enum NodeType {
    BLOCK = 1,
    ELEMENT = 2,
    TEXT = 3,
    ELEMENT_CALL = 4,
    SUPER_CALL = 5,
    DEBUGGER_CALL = 6
}
export interface INode {
    nodeType: NodeType;
}
export declare type TContent = Array<INode>;
export interface IElementAttribute {
    isTransformer: boolean;
    name: string;
    value: string;
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
    namespaceSVG: boolean;
    tagName: string;
    is: string | null;
    names: Array<string | null> | null;
    attributes: IElementAttributes | null;
    $specifiedParams: Set<string> | null;
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
export declare const KEY_CONTENT_TEMPLATE: unique symbol;
export declare const ELEMENT_NAME_DELIMITER = "__";
export declare class Template {
    static elementTransformers: Record<string, (el: IElement) => TContent | null>;
    static attributeTransformers: Record<string, (el: IElement, attr: IElementAttribute) => IElement>;
    _embedded: boolean;
    parent: Template | null;
    template: TParserContent;
    initialized: boolean;
    block: IBlock | null;
    _elements: Record<string, IElement>;
    _elementNamesTemplate: Array<string>;
    _embeddedTemplates: Array<Template> | null;
    constructor(template: string | TParserContent | IBlock, options?: {
        _embedded?: boolean;
        parent?: Template;
        blockName?: string | Array<string>;
    });
    initialize(component?: BaseComponent | null): void;
    parse(component?: BaseComponent | null): IBlock;
    _readContent(targetContent: TContent | null, content: TParserContent, namespaceSVG: boolean, superElName: string | null, componentCtor?: typeof BaseComponent | null): TContent | null;
    _readElement(targetContent: TContent | null, elNode: TParserElement, namespaceSVG: boolean, superElName: string | null, componentCtor?: typeof BaseComponent | null): TContent | null;
    _readAttributes(elAttrs: TParserElementAttributes, namespaceSVG: boolean, superElName: string | null, $paramsConfig?: Map<string, I$ComponentParamConfig> | null, $specifiedParams?: Set<string>): IElementAttributes | null;
    _readSuperCall(superCallNode: TParserSuperCall, defaultElName: string | null): ISuperCall;
    _throwError(msg: string, node: TParserNode): void;
    extend(template: string | TParserContent | IBlock, options?: {
        blockName?: string;
        _embedded?: boolean;
    }): Template;
    setBlockName(blockName: string | Array<string>): Template;
    render(component?: BaseComponent | null, ownerComponent?: BaseComponent, context?: object, result?: TContentBindingResult, parentComponent?: BaseComponent): DocumentFragment;
}
