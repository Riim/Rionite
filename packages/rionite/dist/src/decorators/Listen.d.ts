import { BaseComponent, TComponentListeningEventType, TComponentListeningTarget } from '../BaseComponent';
export declare function Listen<T = BaseComponent>(evtType: TComponentListeningEventType<T>, options?: {
    target?: TComponentListeningTarget<T>;
    useCapture?: boolean;
}): any;
export declare function Listen<T = BaseComponent>(evtType: TComponentListeningEventType<T>, target: TComponentListeningTarget<T>, useCapture?: boolean): any;
