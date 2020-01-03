import { IComponentParamConfig } from '../BaseComponent';
export declare function Param(target: any, propertyName: string, propertyDesc?: PropertyDescriptor): void;
export declare function Param(name?: string, config?: IComponentParamConfig | Function): (target: Object, propertyName: string, propertyDesc?: PropertyDescriptor) => void;
export declare function Param(config?: IComponentParamConfig | Function): (target: Object, propertyName: string, propertyDesc?: PropertyDescriptor) => void;
