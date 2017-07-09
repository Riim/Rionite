import { getText, IGetText, IGetTextConfig, ILocaleSettings, ILocalizationTexts } from '@riim/gettext';
import { IBlock as INelmBlock, NodeType as NelmNodeType, Parser as NelmParser, Template } from 'nelm';
import { Component, IComponentElement, IComponentElementClassNameMap, IComponentEvents, IComponentOEvents, IPossiblyComponentElement, TEventHandler, TOEventHandler } from './Component';
import { ComponentInput, IComponentInput } from './ComponentInput';
import { componentInputValueMap } from './componentInputValueMap';
import { RtContent } from './Components/rt-content';
import { RtIfElse } from './Components/rt-if-else';
import { RtIfThen, TIfCell as TRtIfThenIfCell } from './Components/rt-if-then';
import { IItem as IRtRepeatItem, RtRepeat, TItemList as TRtRepeatItemList, TItemMap as TRtRepeatItemMap, TListCell as TRtRepeatListCell } from './Components/rt-repeat';
import { RtSlot } from './Components/rt-slot';
import { DisposableMixin, IDisposable, IDisposableCallback, IDisposableInterval, IDisposableListening, IDisposableTimeout, IListener, TListeningTarget } from './DisposableMixin';
import { formatters } from './formatters';
import { KEY_ELEMENT_CONNECTED } from './KEY_ELEMENT_CONNECTED';
import './nelmTemplateHelpers';
declare let Components: {
    RtContent: typeof RtContent;
    RtSlot: typeof RtSlot;
    RtIfThen: typeof RtIfThen;
    RtIfElse: typeof RtIfElse;
    RtRepeat: typeof RtRepeat;
};
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
        template?: string | Template | INelmBlock | null | undefined;
        oevents?: IComponentOEvents<T> | null | undefined;
        events?: IComponentEvents<T> | null | undefined;
        domEvents?: IComponentEvents<T> | null | undefined;
    }) => (componentConstr: typeof Component) => void;
};
declare let Utils: {
    camelize: (str: string) => string;
    hyphenize: (str: string) => string;
    escapeString: (str: string) => string;
    escapeHTML: (str: string) => string;
    unescapeHTML: (str: string) => string;
    isRegExp: (value: any) => boolean;
    defer: (cb: () => void, context?: any) => void;
    htmlToFragment: (html: string) => DocumentFragment;
};
export { NelmNodeType, INelmBlock, NelmParser, Template, IDisposable, IDisposableListening, IDisposableTimeout, IDisposableInterval, IDisposableCallback, TListeningTarget, IListener, DisposableMixin, formatters, ILocaleSettings, ILocalizationTexts, IGetTextConfig, IGetText, getText, IPossiblyComponentElement, IComponentElement, IComponentElementClassNameMap, TOEventHandler, TEventHandler, IComponentOEvents, IComponentEvents, Component, KEY_ELEMENT_CONNECTED, IComponentInput, ComponentInput, componentInputValueMap, TRtIfThenIfCell, TRtRepeatListCell, IRtRepeatItem, TRtRepeatItemList, TRtRepeatItemMap, Components, d, Utils };
