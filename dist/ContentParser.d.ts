export interface IContentText {
    type: number;
    at: number;
    raw: string;
    value: string;
}
export interface IContentBindingKeypath {
    type: number;
    at: number;
    raw: string;
    value: string;
}
export interface IContentBindingFormatterArguments {
    type: number;
    at: number;
    raw: string;
    value: Array<string>;
}
export interface IContentBindingFormatter {
    type: number;
    at: number;
    raw: string;
    name: string;
    arguments: IContentBindingFormatterArguments | null;
}
export interface IContentBinding {
    type: number;
    at: number;
    raw: string;
    keypath: IContentBindingKeypath;
    formatters: Array<IContentBindingFormatter>;
}
export declare type Content = Array<IContentText | IContentBinding>;
export default class ContentParser {
    static ContentNodeType: {
        TEXT: number;
        BINDING: number;
        BINDING_KEYPATH: number;
        BINDING_FORMATTER: number;
        BINDING_FORMATTER_ARGUMENTS: number;
    };
    content: string;
    at: number;
    chr: string;
    result: Content;
    constructor(content: string);
    parse(): Content;
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
