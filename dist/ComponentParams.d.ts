import { BaseComponent } from './BaseComponent';
export declare type TComponentParamConfig = Function | {
    property?: string;
    type?: Function;
    default?: any;
    required?: boolean;
    readonly?: boolean;
};
export declare let ComponentParams: {
    init(component: BaseComponent): void;
};
