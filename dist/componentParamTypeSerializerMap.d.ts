export interface IComponentParamTypeSerializer {
    read: (value: string | null, defaultValue: any) => any;
    write: (value: any, defaultValue?: any) => string | null;
}
export declare let componentParamTypeSerializerMap: Map<any, IComponentParamTypeSerializer>;
