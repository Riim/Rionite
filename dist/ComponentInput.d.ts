import { Component } from './Component';
export interface IComponentInput extends Object {
    $content: DocumentFragment | null;
    $context: Object | null;
    [name: string]: any;
}
export declare let ComponentInput: {
    init(component: Component): IComponentInput;
};
