import { IBlock } from 'nelm-parser';
import Template from './Template';
import { IComponentEvents, default as Component } from './Component';
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
    }) => (componentConstr: typeof Component) => void;
};
export default d;
