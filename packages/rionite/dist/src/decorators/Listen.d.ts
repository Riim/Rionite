import { TListeningTarget } from '../BaseComponent';
export declare function Listen(evtType: string | symbol, options?: {
    target?: TListeningTarget | string | Array<TListeningTarget>;
    useCapture?: boolean;
}): any;
export declare function Listen(evtType: string | symbol, target: TListeningTarget | string | Array<TListeningTarget>, useCapture?: boolean): any;
