import { Cell } from 'cellx';
import { ObservableList } from 'cellx-collections';
import { BaseComponent } from '../BaseComponent';
export declare type TList = Array<any> | ObservableList<any>;
export interface I$Item {
    item: Cell<any>;
    index: Cell<number>;
    nodes: Array<Node>;
    bindings: Array<Cell> | null;
    childComponents: Array<BaseComponent> | null;
}
export declare type T$ItemsMap = Map<any, Array<I$Item>>;
export declare class RnRepeat extends BaseComponent {
    static EVENT_CHANGE: symbol;
    static get bindsInputContent(): boolean;
    $context: Record<string, any>;
    paramFor: string;
    paramIn: TList | null;
    paramInKeypath: string | null;
    trackBy: string | null;
    beforeTemplate: boolean;
    _itemName: string;
    _prevList: Array<any>;
    _list: TList | Cell<TList | null | undefined> | null;
    _$itemsMap: T$ItemsMap;
    _active: boolean;
    elementConnected(): void;
    elementDisconnected(): void;
    _onListChange(): void;
    _connect(): null;
    _disconnect(): void;
    _render(fromChangeEvent: boolean): void;
    _deactivate(): void;
}
