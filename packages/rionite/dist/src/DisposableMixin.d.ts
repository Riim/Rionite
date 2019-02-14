import { EventEmitter, IEvent } from 'cellx';
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
export declare type TListener = (evt: IEvent | Event) => any;
export declare class DisposableMixin implements IDisposable {
    _disposables: {
        [id: string]: IDisposable;
    };
    listenTo(target: TListeningTarget | Array<TListeningTarget>, type: string | Array<string>, listener: TListener | Array<TListener>, context?: any, useCapture?: boolean): IDisposableListening;
    listenTo(target: TListeningTarget | Array<TListeningTarget>, listeners: {
        [type: string]: TListener | Array<TListener>;
    }, context?: any, useCapture?: boolean): IDisposableListening;
    _listenTo(target: EventEmitter | EventTarget, type: string, listener: TListener, context: any, useCapture: boolean): IDisposableListening;
    setTimeout(callback: Function, delay: number): IDisposableTimeout;
    setInterval(callback: Function, delay: number): IDisposableInterval;
    registerCallback(callback: Function): IDisposableCallback;
    dispose(): DisposableMixin;
}
