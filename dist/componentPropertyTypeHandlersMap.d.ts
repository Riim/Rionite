import Component from './Component';
declare let componentPropertyTypeHandlersMap: Map<any, [(value: string | null, defaultValue: any, component: Component) => any, (value: any, defaultValue?: any) => string | null]>;
export default componentPropertyTypeHandlersMap;
