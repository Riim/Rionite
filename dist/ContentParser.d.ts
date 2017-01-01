export declare enum ContentNodeType {
    TEXT = 1,
    BINDING = 2,
    BINDING_KEYPATH = 3,
    BINDING_FORMATTER = 4,
    BINDING_FORMATTER_ARGUMENTS = 5,
}
export interface IContentNode {
    nodeType: ContentNodeType;
    at: number;
    raw: string;
}
export interface IContentTextNode extends IContentNode {
    nodeType: ContentNodeType.TEXT;
    value: string;
}
export interface IContentBindingKeypath extends IContentNode {
    nodeType: ContentNodeType.BINDING_KEYPATH;
    value: string;
}
export interface IContentBindingFormatterArguments extends IContentNode {
    nodeType: ContentNodeType.BINDING_FORMATTER_ARGUMENTS;
    value: Array<string>;
}
export interface IContentBindingFormatter extends IContentNode {
    nodeType: ContentNodeType.BINDING_FORMATTER;
    name: string;
    arguments: IContentBindingFormatterArguments | null;
}
export interface IContentBinding extends IContentNode {
    nodeType: ContentNodeType.BINDING;
    keypath: IContentBindingKeypath;
    formatters: Array<IContentBindingFormatter>;
}
export declare type TContent = Array<IContentTextNode | IContentBinding>;
export default class ContentParser {
    static ContentNodeType: typeof ContentNodeType;
    content: string;
    at: number;
    chr: string;
    result: TContent;
    constructor(content: string);
    parse(): TContent;
    _pushText(value: string): void;
    _readBinding(): IContentBinding | null;
    _readBindingKeypath(): IContentBindingKeypath | null;
    _readFormatter(): IContentBindingFormatter | null;
    _readFormatterArguments(): IContentBindingFormatterArguments | null;
    _readValueOrValueKeypath(): string | Object;
    _readValue(): string | Object;
    _readObject(): string | Object;
    _readObjectKey(): string | null;
    _readArray(): string | Object;
    _readBoolean(): string | Object;
    _readNumber(): string | Object;
    _readString(): string | Object;
    _readVacuum(): string | Object;
    _readValueKeypath(): string | Object;
    _readName(): string | null;
    _skipWhitespaces(): string;
    _next(current?: string): string;
}
