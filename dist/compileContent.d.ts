import { TContent } from './ContentParser';
import Component from './Component';
export default function compileContent(parsedContent: TContent, content: string, ownerComponent?: Component): () => any;
