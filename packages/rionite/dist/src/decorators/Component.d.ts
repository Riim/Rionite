import { IEvent } from 'cellx';
import { BaseComponent, IComponentEvents } from '../BaseComponent';
import { IBlock, Template } from '../Template';
export declare function Component<T extends BaseComponent>(config?: {
    elementIs?: string;
    elementExtends?: string | null;
    params?: {
        [name: string]: any;
    } | null;
    i18n?: {
        [key: string]: any;
    } | null;
    template?: string | IBlock | Template | null;
    events?: IComponentEvents<T, IEvent<BaseComponent>> | null;
    domEvents?: IComponentEvents<T, Event> | null;
}): (componentConstr: Function) => void;
