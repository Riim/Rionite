export declare enum TemplateNodeValueNodeType {
    TEXT = 1,
    BINDING = 2,
    BINDING_KEYPATH = 3,
    BINDING_FORMATTER = 4
}
export interface ITemplateNodeValueNode {
    nodeType: TemplateNodeValueNodeType;
}
export interface ITemplateNodeValueText extends ITemplateNodeValueNode {
    nodeType: TemplateNodeValueNodeType.TEXT;
    value: string;
}
export interface ITemplateNodeValueBindingFormatter extends ITemplateNodeValueNode {
    nodeType: TemplateNodeValueNodeType.BINDING_FORMATTER;
    name: string;
    arguments: Array<string> | null;
}
export interface ITemplateNodeValueBinding extends ITemplateNodeValueNode {
    nodeType: TemplateNodeValueNodeType.BINDING;
    prefix: string | null;
    keypath: string | null;
    value: string | null;
    formatters: Array<ITemplateNodeValueBindingFormatter> | null;
    raw: string;
}
export declare type TTemplateNodeValueAST = Array<ITemplateNodeValueText | ITemplateNodeValueBinding>;
export declare class TemplateNodeValueParser {
    templateNodeValue: string;
    _pos: number;
    _chr: string;
    result: TTemplateNodeValueAST;
    constructor(templateNodeValue: string);
    parse(index: number): TTemplateNodeValueAST;
    _pushText(value: string): void;
    _readBinding(): ITemplateNodeValueBinding | null;
    _readPrefix(): string | null;
    _readFormatter(): ITemplateNodeValueBindingFormatter | null;
    _readFormatterArguments(): Array<string> | null;
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
