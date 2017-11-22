import { TComponentParamConfig } from './ComponentParams';
export declare function ComponentParamDecorator(name?: string, config?: TComponentParamConfig): (target: Object, propertyName: string, propertyDesc?: PropertyDescriptor) => void;
export declare function ComponentParamDecorator(config?: TComponentParamConfig): (target: Object, propertyName: string, propertyDesc?: PropertyDescriptor) => void;
