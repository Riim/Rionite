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
    pushText(value: string): void;
    readBinding(): IContentBinding | null;
    readBindingKeypath(): IContentBindingKeypath | null;
    readFormatter(): IContentBindingFormatter | null;
    readFormatterArguments(): IContentBindingFormatterArguments | null;
    readValueOrValueKeypath(): string | Object;
    readValue(): string | Object;
    readObject(): string | Object;
    readObjectKey(): string | null;
    readArray(): string | Object;
    readBoolean(): string | Object;
    readNumber(): string | Object;
    readString(): string | Object;
    readVacuum(): string | Object;
    readValueKeypath(): string | Object;
    next(c?: string): string;
    skipWhitespaces(): string;
}
