import { Cell, TListener } from 'cellx';
export interface IFrozenState {
    changeEventListener: TListener;
    changeEventContext: any;
    value: any;
}
declare const KEY_FROZEN_STATE: unique symbol;
export interface IBinding extends Cell {
    [KEY_FROZEN_STATE]: IFrozenState | null;
}
export declare function freezeBindings(bindings: Array<IBinding>): void;
export declare function unfreezeBindings(bindings: Array<IBinding>): void;
export {};
