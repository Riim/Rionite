import { BaseComponent } from './BaseComponent';
export interface IComponentParamConfig {
    property?: string;
    type?: Function;
    default?: any;
    required?: boolean;
    readonly?: boolean;
}
export declare let ComponentParams: {
    init(component: BaseComponent): void;
};
