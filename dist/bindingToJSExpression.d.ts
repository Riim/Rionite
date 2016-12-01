import { IContentBinding } from './ContentParser';
export default function bindingToJSExpression(binding: IContentBinding): {
    value: string;
    usesFormatters: boolean;
};
