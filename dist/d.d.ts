import { IEvent } from 'cellx';
import { IComponentTemplate, default as Component } from './Component';
declare let d: {
    Component: (config: {
        elementIs?: string | undefined;
        elementExtends?: string | undefined;
        elementAttributes?: {
            [name: string]: any;
        } | null | undefined;
        props?: {
            [name: string]: any;
        } | null | undefined;
        i18n?: {
            [key: string]: any;
        } | undefined;
        template?: string | IComponentTemplate | null | undefined;
        events?: {
            [assetName: string]: {
                [eventName: string]: (this: Component, evt: Event | IEvent) => boolean | void;
            };
        } | null | undefined;
    }) => (componentConstr: typeof Component) => void;
};
export default d;
