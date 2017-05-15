import { IEvent, IEventEmitterListener, Cell } from 'cellx';
export interface IFrozenState {
    changeEventListener: IEventEmitterListener;
    changeEventContext: any;
    value: any;
}
export interface IFreezableCell extends Cell<any> {
    _value: any;
    _changeEvent: IEvent | null;
    _canCancelChange: boolean;
    _frozenState: IFrozenState | null;
    _addToRelease(): void;
}
export declare function freezeBindings(bindings: Array<IFreezableCell>): void;
export declare function unfreezeBindings(bindings: Array<IFreezableCell>): void;
