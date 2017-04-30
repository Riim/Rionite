import { default as Component } from './Component';
export interface IComponentProperties extends Object {
    content: any;
    context: any;
    [name: string]: any;
}
declare let ComponentProperties: {
    init(component: Component): IComponentProperties;
};
export default ComponentProperties;
