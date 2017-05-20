import Component from './Component';
declare let componentInputTypeSerializerMap: Map<any, {
    read: (value: string | null, defaultValue: any, component: Component) => any;
    write: (value: any, defaultValue?: any) => string | null;
}>;
export default componentInputTypeSerializerMap;
