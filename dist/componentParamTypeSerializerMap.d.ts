export interface IComponentParamTypeSerializer {
    read: (value: string | null, defaultValue: any) => any;
    write: (value: any, defaultValue?: any) => string | null;
}
export declare const componentParamTypeSerializerMap: Map<any, IComponentParamTypeSerializer>;
