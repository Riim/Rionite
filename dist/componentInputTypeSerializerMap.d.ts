export interface IComponentInputTypeSerializer {
    read: (value: string | null, defaultValue: any) => any;
    write: (value: any, defaultValue?: any) => string | null;
}
declare let componentInputTypeSerializerMap: Map<any, IComponentInputTypeSerializer>;
export default componentInputTypeSerializerMap;
