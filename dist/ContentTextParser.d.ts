export declare enum ContentTextNodeType {
    TEXT = 1,
    BINDING = 2,
    BINDING_KEYPATH = 3,
    BINDING_FORMATTER = 4,
    BINDING_FORMATTER_ARGUMENTS = 5,
}
export interface IContentTextNode {
    nodeType: ContentTextNodeType;
}
export interface IContentTextTextNode extends IContentTextNode {
    nodeType: ContentTextNodeType.TEXT;
    value: string;
}
export interface IContentTextBindingFormatterArguments extends IContentTextNode {
    nodeType: ContentTextNodeType.BINDING_FORMATTER_ARGUMENTS;
    value: Array<string>;
}
export interface IContentTextBindingFormatter extends IContentTextNode {
    nodeType: ContentTextNodeType.BINDING_FORMATTER;
    name: string;
    arguments: IContentTextBindingFormatterArguments | null;
}
export interface IContentTextBinding extends IContentTextNode {
    nodeType: ContentTextNodeType.BINDING;
    keypath: string;
    formatters: Array<IContentTextBindingFormatter> | null;
    raw: string;
}
export declare type TContentText = Array<IContentTextTextNode | IContentTextBinding>;
export declare type TNotValueAndNotKeypath = Object;
export declare class ContentTextParser {
    static ContentTextNodeType: typeof ContentTextNodeType;
    contentText: string;
    at: number;
    chr: string;
    result: TContentText;
    constructor(contentText: string);
    parse(): TContentText;
    _pushText(value: string): void;
    _readBinding(): IContentTextBinding | null;
    _readBindingKeypath(): string | null;
    _readFormatter(): IContentTextBindingFormatter | null;
    _readFormatterArguments(): IContentTextBindingFormatterArguments | null;
    _readValueOrKeypath(): string | TNotValueAndNotKeypath;
    _readValue(): string | TNotValueAndNotKeypath;
    _readObject(): string | TNotValueAndNotKeypath;
    _readObjectKey(): string | null;
    _readArray(): string | TNotValueAndNotKeypath;
    _readBoolean(): string | TNotValueAndNotKeypath;
    _readNumber(): string | TNotValueAndNotKeypath;
    _readString(): string | TNotValueAndNotKeypath;
    _readVacuum(): string | TNotValueAndNotKeypath;
    _readKeypath(): string | TNotValueAndNotKeypath;
    _readName(): string | null;
    _skipWhitespaces(): string;
    _next(current?: string): string;
}
