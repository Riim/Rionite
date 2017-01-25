import { IEvent, EventEmitter } from 'cellx';
export interface IDisposable {
    dispose(): any;
    [key: string]: any;
}
export interface IDisposableListening extends IDisposable {
    stop(): void;
}
export interface IDisposableTimeout extends IDisposable {
    clear(): void;
}
export interface IDisposableInterval extends IDisposable {
    clear(): void;
}
export interface IDisposableCallback extends IDisposable {
    (): void;
    cancel(): void;
}
export declare type TListeningTarget = EventEmitter | EventTarget | Array<EventEmitter | EventTarget> | NodeList | HTMLCollection;
export interface IListener {
    (evt: IEvent | Event): boolean | void;
}
export default class DisposableMixin implements IDisposable {
    _disposables: {
        [id: string]: IDisposable;
    };
    listenTo(target: TListeningTarget | Array<TListeningTarget>, type: string | Array<string>, listener: IListener | Array<IListener>, context?: any): IDisposableListening;
    listenTo(target: TListeningTarget | Array<TListeningTarget>, listeners: {
        [type: string]: IListener | Array<IListener>;
    }, context?: any): IDisposableListening;
    _listenTo(target: EventEmitter | EventTarget, type: string, listener: IListener, context: any): IDisposableListening;
    setTimeout(cb: Function, delay: number): IDisposableTimeout;
    setInterval(cb: Function, delay: number): IDisposableInterval;
    registerCallback(cb: Function): IDisposableCallback;
    dispose(): DisposableMixin;
}
