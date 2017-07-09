import { IBlock, Template } from 'nelm';
import { Component, IComponentEvents, IComponentOEvents } from './Component';
export declare function ComponentDecorator<T extends Component>(config: {
    elementIs: string;
    elementExtends?: string | null;
    input?: {
        [name: string]: any;
    } | null;
    i18n?: {
        [key: string]: any;
    } | null;
    template?: string | IBlock | Template | null;
    oevents?: IComponentOEvents<T> | null;
    events?: IComponentEvents<T> | null;
    domEvents?: IComponentEvents<T> | null;
}): (componentConstr: typeof Component) => void;
