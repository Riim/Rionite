export declare class Container {
    static _services: Map<Function, Function>;
    static registerService(key: Function, service: Function): typeof Container;
    static get<T>(key: Function, args?: Array<any>): T;
    static reset(): typeof Container;
}
export declare function Inject(target: Object, propertyName: string, propertyDesc?: PropertyDescriptor): any;
