import { IBlock, Template } from 'nelm';
import { IComponentEvents, IComponentEvents2, default as Component } from './Component';
declare let d: {
    Component: <T extends Component>(config: {
        elementIs: string;
        elementExtends?: string | null | undefined;
        input?: {
            [name: string]: any;
        } | null | undefined;
        i18n?: {
            [key: string]: any;
        } | null | undefined;
        template?: string | Template | IBlock | null | undefined;
        events?: IComponentEvents<T> | null | undefined;
        events2?: IComponentEvents2<T> | null | undefined;
        domEvents?: IComponentEvents2<T> | null | undefined;
    }) => (componentConstr: typeof Component) => void;
};
export default d;
