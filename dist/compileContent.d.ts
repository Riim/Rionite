import { TContent } from './ContentParser';
import Component from './Component';
export declare function nextComponentPropertyValueKey(): string;
export default function compileContent(content: TContent, contentString: string, ownerComponent?: Component): () => any;
