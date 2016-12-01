import { ObservableList, Cell } from 'cellx';
import Component from '../Component';
export declare type ListCell = Cell<ObservableList<Object>>;
export declare type Item = {
    item: Cell<Object>;
    index: Cell<number>;
    nodes: Array<Node>;
    bindings: Cell<any>[] | null;
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
