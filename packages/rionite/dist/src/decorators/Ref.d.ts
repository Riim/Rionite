import { BaseComponent } from '../BaseComponent';
export declare function Ref(target: BaseComponent, propName: string, propDesc?: PropertyDescriptor): void;
export declare function Ref(name?: string): (target: BaseComponent, propName: string, propDesc?: PropertyDescriptor) => void;
