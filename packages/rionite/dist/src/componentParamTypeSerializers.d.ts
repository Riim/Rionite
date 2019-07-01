export interface IComponentParamTypeSerializer {
    read: (value: string | null, defaultValue: any, el?: Element) => any;
    write: (value: any, defaultValue?: any) => string | null;
}
export declare const KEY_COMPONENT_PARAM_VALUES: unique symbol;
export declare const componentParamTypeSerializers: Map<any, IComponentParamTypeSerializer>;
