import { default as Component } from './Component';
export interface IComponentInput extends Object {
    $content: DocumentFragment | null;
    $context: Object | null;
    [name: string]: any;
}
declare let ComponentInput: {
    init(component: Component): IComponentInput;
};
export default ComponentInput;
