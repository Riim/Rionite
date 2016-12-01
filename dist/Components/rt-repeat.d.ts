import cellx = require('cellx');
import Component from '../Component';
export declare type ListCell = cellx.Cell<cellx.ObservableList<Object>>;
export declare type Item = {
    item: cellx.Cell<Object>;
    index: cellx.Cell<number>;
    nodes: Array<Node>;
    bindings: cellx.Cell<any>[] | null;
};
export declare type ItemList = Array<Item>;
export declare type ItemMap = Map<any, ItemList>;
export default class RtRepeat extends Component {
    _itemName: string;
    _list: ListCell;
    _itemMap: ItemMap;
    _oldItemMap: ItemMap;
    _trackBy: string;
    _rawItemContent: DocumentFragment;
    _context: Object;
    _lastNode: Node;
    _attachElement(): void;
    _detachElement(): void;
    _onListChange(): void;
    _render(c: boolean): void;
    _renderItem(item: Object, index: number): boolean;
    _clearWithItemMap(itemMap: ItemMap): void;
    _clearWithItems(items: ItemList): void;
}
