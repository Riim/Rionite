import { IBlock, IElement, IElementAttributes, INode, TContent } from '@riim/rionite-template-parser';
export declare function walk(node: IBlock | IElement | TContent, callbacks: {
    [nodeType: number]: (node: INode) => void;
}): void;
export declare function walkContent(content: TContent, callbacks: {
    [nodeType: number]: (node: INode) => void;
}): void;
export declare function walkAttributes(attrs: IElementAttributes, callbacks: {
    [nodeType: number]: (node: INode) => void;
}): void;
