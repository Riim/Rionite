import { IComponentElement } from './Component';
export interface IComponentProperties {
    content: any;
    context: any;
    [name: string]: any;
}
declare let ComponentProperties: {
    create(el: IComponentElement): IComponentProperties;
};
export default ComponentProperties;
