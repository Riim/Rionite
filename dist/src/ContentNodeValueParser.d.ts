export declare enum ContentNodeValueNodeType {
    TEXT = 1,
    BINDING = 2,
    BINDING_KEYPATH = 3,
    BINDING_FORMATTER = 4,
    BINDING_FORMATTER_ARGUMENTS = 5
}
export interface IContentNodeValueNode {
    nodeType: ContentNodeValueNodeType;
}
export interface IContentNodeValueText extends IContentNodeValueNode {
    nodeType: ContentNodeValueNodeType.TEXT;
    value: string;
}
export interface IContentNodeValueBindingFormatterArguments extends IContentNodeValueNode {
    nodeType: ContentNodeValueNodeType.BINDING_FORMATTER_ARGUMENTS;
    value: Array<string>;
}
export interface IContentNodeValueBindingFormatter extends IContentNodeValueNode {
    nodeType: ContentNodeValueNodeType.BINDING_FORMATTER;
    name: string;
    arguments: IContentNodeValueBindingFormatterArguments | null;
}
export interface IContentNodeValueBinding extends IContentNodeValueNode {
    nodeType: ContentNodeValueNodeType.BINDING;
    prefix: string | null;
    keypath: string | null;
    value: string | null;
    formatters: Array<IContentNodeValueBindingFormatter> | null;
    raw: string;
}
export declare type TContentNodeValue = Array<IContentNodeValueText | IContentNodeValueBinding>;
export declare class ContentNodeValueParser {
    contentNodeValue: string;
    at: number;
    chr: string;
    result: TContentNodeValue;
    constructor(contentNodeValue: string);
    parse(index: number): TContentNodeValue;
    _pushText(value: string): void;
    _readBinding(): IContentNodeValueBinding | null;
    _readPrefix(): string | null;
    _readFormatter(): IContentNodeValueBindingFormatter | null;
    _readFormatterArguments(): IContentNodeValueBindingFormatterArguments | null;
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
