import { ObservableList, Cell } from 'cellx';
import Component from '../Component';
export declare type TRtRepeatListCell = Cell<ObservableList<Object>>;
export declare type TRtRepeatItem = {
    item: Cell<Object>;
    index: Cell<number>;
    nodes: Array<Node>;
    bindings: Cell<any>[] | null;
};
export declare type TRtRepeatItemList = Array<TRtRepeatItem>;
export declare type TRtRepeatItemMap = Map<any, TRtRepeatItemList>;
export default class RtRepeat extends Component {
    ownerComponent: Component;
    _itemName: string;
    _list: TRtRepeatListCell;
    _itemMap: TRtRepeatItemMap;
    _oldItemMap: TRtRepeatItemMap;
    _trackBy: string;
    _rawItemContent: DocumentFragment;
    _context: Object;
    _lastNode: Node;
    _destroyed: boolean;
    elementConnected(): void;
    elementDisconnected(): void;
    _onListChange(): void;
    _attach(): void;
    _detach(): void;
    _render(c: boolean): void;
    _renderItem(item: Object, index: number): boolean;
    _clearByItemMap(itemMap: TRtRepeatItemMap): void;
    _clearByItems(items: TRtRepeatItemList): void;
    _destroy(): void;
}
