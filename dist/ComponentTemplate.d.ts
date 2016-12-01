export interface IComponentTemplateBlock {
    (this: IComponentTemplateBlockMap, data: Object): string;
}
export interface IComponentTemplateRenderer {
    (this: IComponentTemplateBlockMap, data: Object, escape: (value: string) => string): string;
}
export interface IComponentTemplateBlockMap {
    [name: string]: IComponentTemplateBlock;
}
export default class ComponentTemplate {
    parent: ComponentTemplate | null;
    _renderer: IComponentTemplateRenderer;
    _blockMap: IComponentTemplateBlockMap;
    constructor(tmpl: string, parent?: ComponentTemplate);
    extend(tmpl: string): ComponentTemplate;
    render(data?: Object): string;
}
