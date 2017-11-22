export declare type TComponentParamConfig = Function | {
    type?: Function | string;
    required?: boolean;
    readonly?: boolean;
};
export declare function ComponentParamDecorator(name?: string | null, type?: TComponentParamConfig): (target: Object, propertyName: string, propertyDesc?: PropertyDescriptor) => void;
export declare function ComponentParamDecorator(type?: TComponentParamConfig): (target: Object, propertyName: string, propertyDesc?: PropertyDescriptor) => void;
