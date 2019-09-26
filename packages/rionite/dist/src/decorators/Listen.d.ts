import { BaseComponent, TListeningTarget } from '../BaseComponent';
export declare function Listen(evtType: string | symbol, options?: {
    target?: TListeningTarget | string | Array<TListeningTarget>;
    useCapture?: boolean;
}): (target: BaseComponent, propertyName: string, propertyDesc?: PropertyDescriptor | undefined) => void;
