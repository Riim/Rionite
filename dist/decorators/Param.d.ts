import { TComponentParamConfig } from '../ComponentParams';
export declare function Param(target: Object, propertyName: string, propertyDesc?: PropertyDescriptor): void;
export declare function Param(name?: string, config?: TComponentParamConfig): (target: Object, propertyName: string, propertyDesc?: PropertyDescriptor) => void;
export declare function Param(config?: TComponentParamConfig): (target: Object, propertyName: string, propertyDesc?: PropertyDescriptor) => void;
