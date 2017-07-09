export interface IComponentInputTypeSerializer {
    read: (value: string | null, defaultValue: any) => any;
    write: (value: any, defaultValue?: any) => string | null;
}
export declare let componentInputTypeSerializerMap: Map<any, IComponentInputTypeSerializer>;
