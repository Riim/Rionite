import { IBlock, IElement, IElementAttributes, INode, TContent } from '@riim/rionite-template-parser';
export declare function walk(node: IBlock | IElement | TContent, callbacks: Record<number, (node: INode) => void>): void;
export declare function walkContent(content: TContent, callbacks: Record<number, (node: INode) => void>): void;
export declare function walkAttributes(attrs: IElementAttributes, callbacks: Record<number, (node: INode) => void>): void;
