import { Cell, ObservableList } from 'cellx';
import { Component } from '../Component';
export declare type TListCell = Cell<ObservableList<any>>;
export interface IItem {
    item: Cell<any>;
    index: Cell<number>;
    nodes: Array<Node>;
    bindings: Array<Cell> | null;
}
export declare type TItemList = Array<IItem>;
export declare type TItemMap = Map<any, TItemList>;
export declare class RtRepeat extends Component {
    _itemName: string;
    _list: TListCell;
    _trackBy: string;
    _rawItemContent: DocumentFragment;
    _itemMap: TItemMap;
    _prevItemMap: TItemMap;
    _lastNode: Node;
    _active: boolean;
    elementConnected(): void;
    elementDisconnected(): void;
    _onListChange(): void;
    _attach(): void;
    _detach(): void;
    _render(changed: boolean): void;
    _renderItem(item: any, index: number): boolean;
    _clearByItemMap(itemMap: TItemMap): void;
    _clearByItems(items: TItemList): void;
    _deactivate(): void;
}
