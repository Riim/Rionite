import { BaseComponent, TComponentListeningTarget } from '../BaseComponent';
export declare function Listen<T = BaseComponent>(evtType: string | symbol, options?: {
    target?: TComponentListeningTarget<T>;
    useCapture?: boolean;
}): any;
export declare function Listen<T = BaseComponent>(evtType: string | symbol, target: TComponentListeningTarget<T>, useCapture?: boolean): any;
