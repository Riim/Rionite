export declare enum NodeType {
    ELEMENT = 1,
    ELEMENT_ATTRIBUTE = 2,
    TEXT = 3,
    SUPER_CALL = 4,
    DEBUGGER_CALL = 5
}
export declare type TNode = Array<any>;
export declare type TContent = Array<TNode>;
export declare type TElementAttribute = [1 | undefined, string, string];
export declare type TElementAttributeList = Array<TElementAttribute>;
export declare type TElementAttributes = [1 | string | undefined, TElementAttributeList | undefined];
export declare type TElement = [NodeType.ELEMENT, 1 | undefined, string | undefined, Array<string | undefined> | undefined, TElementAttributes | undefined, TContent | undefined];
export declare type TTextNode = [/* nodeType */ NodeType.TEXT, /* value */ string];
export declare type TSuperCall = [/* nodeType */ NodeType.SUPER_CALL, /* elementName */ /* elementName */ string | undefined];
export declare type TDebuggerCall = [/* nodeType */ NodeType.DEBUGGER_CALL];
export declare class TemplateParser {
    template: string;
    _pos: number;
    _chr: string;
    constructor(template: string);
    parse(): TContent;
    _readContent(brackets: boolean): TContent;
    _readElement(targetContent: TContent): void;
    _readAttributes(): TElementAttributes;
    _readSuperCall(): TSuperCall | null;
    _readName(reName: RegExp): string | null;
    _readString(): string;
    _skipWhitespaces(): string;
    _skipWhitespacesAndComments(): string;
    _next(): string;
    _throwError(msg: string, pos?: number): void;
}
