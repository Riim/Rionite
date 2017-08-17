import { Component } from './Component';
export interface IComponentInput extends Object {
    $content: DocumentFragment | null;
    $context: {
        [name: string]: any;
    } | null;
    $specified: Map<string, true>;
    [name: string]: any;
}
export declare let ComponentInput: {
    init(component: Component): IComponentInput;
};
