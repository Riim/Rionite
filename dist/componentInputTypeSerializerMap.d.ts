import Component from './Component';
export interface IComponentInputTypeSerializer {
    read: (value: string | null, defaultValue: any, component: Component) => any;
    write: (value: any, defaultValue?: any) => string | null;
}
declare let componentInputTypeSerializerMap: Map<any, IComponentInputTypeSerializer>;
export default componentInputTypeSerializerMap;
