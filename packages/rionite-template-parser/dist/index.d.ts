export declare enum NodeType {
    BLOCK = 1,
    SUPER_CALL = 2,
    DEBUGGER_CALL = 3,
    ELEMENT = 4,
    ELEMENT_ATTRIBUTE = 5,
    TEXT = 6,
    COMMENT = 7
}
export interface INode {
    nodeType: NodeType;
    pos: number;
    line: number;
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
    isHelper: boolean;
    tagName: string | null;
    names: Array<string | null> | null;
    attributes: IElementAttributes | null;
    content: TContent | null;
}
export interface ITextNode extends INode {
    nodeType: NodeType.TEXT;
    value: string;
}
export interface IComment extends INode {
    nodeType: NodeType.COMMENT;
    value: string;
    multiline: boolean;
}
export interface IBlock extends INode {
    nodeType: NodeType.BLOCK;
    content: TContent;
}
export declare class TemplateParser {
    template: string;
    _pos: number;
    _line: number;
    _chr: string;
    constructor(template: string);
    parse(): IBlock;
    _readContent(brackets: boolean): TContent;
    _readElement(targetContent: TContent): void;
    _readAttributes(targetContent: TContent): IElementAttributes;
    _readSuperCall(): ISuperCall | null;
    _readName(reNameOrNothing: RegExp): string | null;
    _readString(): string;
    _readComment(targetContent: TContent): void;
    _skipWhitespaces(): string;
    _skipWhitespacesAndReadComments(targetContent: TContent): string;
    _next(current?: string): string;
    _throwError(msg: string, pos?: number): void;
}
