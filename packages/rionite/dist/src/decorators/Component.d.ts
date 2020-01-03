import { TContent } from '@riim/rionite-template-parser-2';
import { IEvent } from 'cellx';
import { BaseComponent, IComponentEvents, IComponentParamConfig } from '../BaseComponent';
import { IBlock, Template } from '../Template2';
export declare function Component<T extends BaseComponent>(config?: {
    elementIs?: string;
    elementExtends?: string | null;
    params?: Record<string, IComponentParamConfig | Function> | null;
    i18n?: Record<string, any> | null;
    template?: string | TContent | IBlock | Template | null;
    events?: IComponentEvents<T, IEvent<BaseComponent>> | null;
    domEvents?: IComponentEvents<T, Event> | null;
}): (componentCtor: typeof BaseComponent) => void;
