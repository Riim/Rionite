import { Cell, IEvent, TListener } from 'cellx';
export interface IFrozenState {
    changeEventListener: TListener;
    changeEventContext: any;
    value: any;
}
export interface IFreezableCell extends Cell {
    _value: any;
    _changeEvent: IEvent | null;
    _canCancelChange: boolean;
    _frozenState: IFrozenState | null;
    _addToRelease(): void;
}
export declare function freezeBindings(bindings: Array<IFreezableCell>): void;
export declare function unfreezeBindings(bindings: Array<IFreezableCell>): void;
