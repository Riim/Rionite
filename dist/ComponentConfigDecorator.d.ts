import { IEvent } from 'cellx';
import { IBlock, Template } from 'nelm';
import { Component, IComponentEvents } from './Component';
export declare function ComponentConfigDecorator<T extends Component>(config: {
    elementIs: string;
    elementExtends?: string | null;
    params?: {
        [name: string]: any;
    } | null;
    i18n?: {
        [key: string]: any;
    } | null;
    template?: string | IBlock | Template | null;
    events?: IComponentEvents<T, IEvent<Component>> | null;
    domEvents?: IComponentEvents<T, Event> | null;
}): (componentConstr: Function) => void;
