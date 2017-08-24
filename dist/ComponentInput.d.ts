import { Component } from './Component';
export interface IComponentInput extends Object {
    $content: DocumentFragment | null;
    $context: {
        [name: string]: any;
    };
    $specified: Set<string>;
    [name: string]: any;
}
export declare let ComponentInput: {
    init(component: Component): IComponentInput;
};
