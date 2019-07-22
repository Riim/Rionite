import { IEvent } from 'cellx';
import { BaseComponent } from './BaseComponent';
export declare const KEY_EVENTS: unique symbol;
export declare function handleEvent(evt: IEvent<BaseComponent>): void;
