import { default as Component } from './Component';
export interface IComponentProperties extends Object {
    content: DocumentFragment | null;
    context: Object | null;
    [name: string]: any;
}
declare let ComponentProperties: {
    init(component: Component): IComponentProperties;
};
export default ComponentProperties;
