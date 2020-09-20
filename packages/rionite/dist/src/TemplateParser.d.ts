export declare enum NodeType {
    ELEMENT = 1,
    ELEMENT_ATTRIBUTE = 2,
    TEXT = 3,
    SUPER_CALL = 4,
    DEBUGGER_CALL = 5
}
export interface INode {
    nodeType: NodeType;
}
export declare type TContent = Array<INode>;
export interface ISuperCall extends INode {
    nodeType: NodeType.SUPER_CALL;
    elementName: string | null;
}
export interface IDebuggerCall extends INode {
    nodeType: NodeType.DEBUGGER_CALL;
}
export interface IElementAttribute extends INode {
    nodeType: NodeType.ELEMENT_ATTRIBUTE;
    isTransformer: boolean;
    name: string;
    value: string;
}
export declare type TElementAttributeList = Array<IElementAttribute>;
export interface IElementAttributes {
    superCall: ISuperCall | null;
    list: TElementAttributeList;
}
export interface IElement extends INode {
    nodeType: NodeType.ELEMENT;
    names: Array<string | null> | null;
    isTransformer: boolean;
    tagName: string | null;
    attributes: IElementAttributes | null;
    content: TContent | null;
}
export interface ITextNode extends INode {
    nodeType: NodeType.TEXT;
    value: string;
}
export declare class TemplateParser {
    template: string;
    _pos: number;
    _chr: string;
    constructor(template: string);
    parse(): TContent;
    _readContent(brackets: boolean): TContent;
    _readElement(targetContent: TContent): void;
    _readAttributes(): IElementAttributes;
    _readSuperCall(): ISuperCall | null;
    _readName(reName: RegExp): string | null;
    _readString(): string;
    _skipWhitespaces(): string;
    _skipWhitespacesAndComments(): string;
    _next(): string;
    _throwError(msg: string, pos?: number): void;
}
