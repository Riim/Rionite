import { BaseComponent, TComponentListeningTarget, TComponentListeningType } from '../BaseComponent';
export declare function Listen<T = BaseComponent>(evtType: TComponentListeningType<T>, options?: {
    target?: TComponentListeningTarget<T>;
    useCapture?: boolean;
}): any;
export declare function Listen<T = BaseComponent>(evtType: TComponentListeningType<T>, target: TComponentListeningTarget<T>, useCapture?: boolean): any;
