import { Component } from './Component';
export interface IComponentInput extends Object {
    $content: DocumentFragment | null;
    $context: object | null;
    [name: string]: any;
}
export declare let ComponentInput: {
    init(component: Component): IComponentInput;
};
