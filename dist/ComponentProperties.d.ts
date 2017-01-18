export interface IComponentProperties {
    content: any;
    context: any;
    [name: string]: any;
}
declare let ComponentProperties: {
    create(el: HTMLElement): IComponentProperties;
};
export default ComponentProperties;
