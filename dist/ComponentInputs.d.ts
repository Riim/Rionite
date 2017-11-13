import { Component } from './Component';
export interface IComponentInputs extends Object {
    $content: DocumentFragment | null;
    $context: {
        [name: string]: any;
    };
    $specified: Set<string>;
    [name: string]: any;
}
export declare let ComponentInputs: {
    init(component: Component): IComponentInputs;
};
