export interface IElementAttributes {
    [name: string]: any;
}
declare let ElementAttributes: {
    create(el: HTMLElement): IElementAttributes;
};
export default ElementAttributes;
