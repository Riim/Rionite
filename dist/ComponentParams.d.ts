import { Component } from './Component';
export interface IComponentParams extends Object {
    $content: DocumentFragment | null;
    $context: {
        [name: string]: any;
    };
    $specified: Set<string>;
    [name: string]: any;
}
export declare let ComponentParams: {
    init(component: Component): IComponentParams;
};
