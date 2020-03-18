import { IComponentParamConfig } from '../BaseComponent';
export declare function Param(target: any, propName: string, propDesc?: PropertyDescriptor): void;
export declare function Param(name?: string, config?: IComponentParamConfig | Function): (target: Object, propName: string, propDesc?: PropertyDescriptor) => void;
export declare function Param(config?: IComponentParamConfig | Function): (target: Object, propName: string, propDesc?: PropertyDescriptor) => void;
