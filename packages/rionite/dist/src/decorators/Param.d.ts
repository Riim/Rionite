import { BaseComponent, IComponentParamConfig } from '../BaseComponent';
export declare function Param(target: BaseComponent, propName: string, propDesc?: PropertyDescriptor): void;
export declare function Param(name?: string, config?: IComponentParamConfig | Function): (target: BaseComponent, propName: string, propDesc?: PropertyDescriptor) => void;
export declare function Param(config?: IComponentParamConfig | Function): (target: BaseComponent, propName: string, propDesc?: PropertyDescriptor) => void;
