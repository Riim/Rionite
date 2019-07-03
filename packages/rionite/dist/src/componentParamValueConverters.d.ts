export interface IComponentParamValueСonverters {
    toData: (value: string | null, defaultValue: any, el?: Element) => any;
    toString: ((value: any, defaultValue?: any) => string | null) | null;
}
export declare const KEY_COMPONENT_PARAM_VALUES: unique symbol;
export declare const componentParamValueСonverters: Map<any, IComponentParamValueСonverters>;
