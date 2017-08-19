export declare enum ContentTextFragmentNodeType {
    TEXT = 1,
    BINDING = 2,
    BINDING_KEYPATH = 3,
    BINDING_FORMATTER = 4,
    BINDING_FORMATTER_ARGUMENTS = 5,
}
export interface IContentTextFragmentNode {
    nodeType: ContentTextFragmentNodeType;
}
export interface IContentTextFragmentTextNode extends IContentTextFragmentNode {
    nodeType: ContentTextFragmentNodeType.TEXT;
    value: string;
}
export interface IContentTextFragmentBindingFormatterArguments extends IContentTextFragmentNode {
    nodeType: ContentTextFragmentNodeType.BINDING_FORMATTER_ARGUMENTS;
    value: Array<string>;
}
export interface IContentTextFragmentBindingFormatter extends IContentTextFragmentNode {
    nodeType: ContentTextFragmentNodeType.BINDING_FORMATTER;
    name: string;
    arguments: IContentTextFragmentBindingFormatterArguments | null;
}
export interface IContentTextFragmentBinding extends IContentTextFragmentNode {
    nodeType: ContentTextFragmentNodeType.BINDING;
    argument: string;
    isArgumentKeypath: boolean;
    formatters: Array<IContentTextFragmentBindingFormatter> | null;
    raw: string;
}
export declare type TContentTextFragment = Array<IContentTextFragmentTextNode | IContentTextFragmentBinding>;
export declare type TNotValueAndNotKeypath = Object;
export declare class ContentTextFragmentParser {
    static ContentTextFragmentNodeType: typeof ContentTextFragmentNodeType;
    contentTextFragment: string;
    at: number;
    chr: string;
    result: TContentTextFragment;
    constructor(contentTextFragment: string);
    parse(): TContentTextFragment;
    _pushText(value: string): void;
    _readBinding(): IContentTextFragmentBinding | null;
    _readFormatter(): IContentTextFragmentBindingFormatter | null;
    _readFormatterArguments(): IContentTextFragmentBindingFormatterArguments | null;
    _readValue(): string | null;
    _readObject(): string | null;
    _readObjectKey(): string | null;
    _readArray(): string | null;
    _readBoolean(): string | null;
    _readNumber(): string | null;
    _readString(): string | null;
    _readVacuum(): string | null;
    _readKeypath(toJSExpression?: boolean): string | null;
    _readName(): string | null;
    _skipWhitespaces(): string;
    _next(current?: string): string;
}
