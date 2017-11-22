import { Component } from './Component';
export declare type TComponentParamConfig = Function | {
    property?: string;
    type?: Function;
    default?: any;
    required?: boolean;
    readonly?: boolean;
};
export declare let KEY_IS_COMPONENT_PARAMS_INITED: symbol;
export declare let ComponentParams: {
    init(component: Component): void;
};
