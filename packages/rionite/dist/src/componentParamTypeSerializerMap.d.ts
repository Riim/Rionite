export interface IComponentParamTypeSerializer {
    read: (value: string | null, defaultValue: any, el?: Element) => any;
    write: (value: any, defaultValue?: any) => string | null;
}
export declare const KEY_COMPONENT_PARAM_VALUE_MAP: symbol;
export declare const componentParamTypeSerializerMap: Map<any, IComponentParamTypeSerializer>;
