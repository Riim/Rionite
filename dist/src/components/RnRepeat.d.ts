import { Cell, ObservableList } from 'cellx';
import { BaseComponent } from '../BaseComponent';
export declare type TList = Array<any> | ObservableList<any>;
export interface I$Item {
    item: Cell<any>;
    index: Cell<number>;
    nodes: Array<Node>;
    bindings: Array<Cell> | null;
    childComponents: Array<BaseComponent> | null;
}
export declare type T$ItemMap = Map<any, Array<I$Item>>;
export declare class RnRepeat extends BaseComponent {
    paramFor: string;
    paramTrackBy: string;
    _itemName: string;
    _prevList: Array<any>;
    _list: Cell<TList | undefined>;
    _$itemMap: T$ItemMap;
    _trackBy: string | null;
    _rawItemContent: DocumentFragment;
    _active: boolean;
    elementConnected(): void;
    elementDisconnected(): void;
    _onListChange(): void;
    _attach(): void;
    _detach(): void;
    _render(fromChangeEvent: boolean): void;
    _deactivate(): void;
}
