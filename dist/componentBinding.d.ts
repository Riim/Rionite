import { IEventData, IEvent, Cell } from 'cellx';
export declare type TFrozenStateChangeEvents = Array<{
    listener: (evt: IEvent) => boolean | void;
    context: any;
}>;
export interface IFrozenState {
    changeEvents: TFrozenStateChangeEvents;
    value: any;
}
export interface IFreezableCell extends Cell<any> {
    _value: any;
    _changeEvent: IEvent | null;
    _canCancelChange: boolean;
    _frozenState: IFrozenState | null;
    _addToRelease(): void;
    _handleErrorEvent(evt: IEventData): void;
}
export declare function freezeBindings(bindings: Array<IFreezableCell>): void;
export declare function unfreezeBindings(bindings: Array<IFreezableCell>): void;
