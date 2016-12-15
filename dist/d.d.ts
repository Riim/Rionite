import { IComponentTemplate, IComponentEvents, default as Component } from './Component';
declare let d: {
    Component: <T extends Component>(config: {
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
        events?: IComponentEvents<T> | null | undefined;
    }) => (componentConstr: typeof Component) => void;
};
export default d;
