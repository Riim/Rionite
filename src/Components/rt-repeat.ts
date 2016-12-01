import cellx = require('cellx');
import Component from '../Component';
import d from '../d';
import compileKeypath from '../compileKeypath';
import bindContent from '../bindContent';
import attachChildComponentElements from '../attachChildComponentElements';
import namePattern from '../namePattern';
import keypathPattern from '../keypathPattern';
import { nativeCustomElements as nativeCustomElementsFeature } from '../Features';

let Cell = cellx.Cell;
let Map = cellx.JS.Map;
let nextTick = cellx.Utils.nextTick;

let slice = Array.prototype.slice;

type ListCell = cellx.Cell<cellx.ObservableList<Object>>;
type Item = {
	item: cellx.Cell<Object>,
	index: cellx.Cell<number>,
	nodes: Array<Node>,
	bindings: cellx.Cell<any>[] | null
};
type ItemList = Array<Item>;
type ItemMap = Map<any, ItemList>;

let reForAttributeValue = RegExp(`^\\s*(${ namePattern })\\s+of\\s+(${ keypathPattern })\\s*$`);

@d.Component({
	elementIs: 'rt-repeat',
	elementExtends: 'template',
	props: {
		for: { type: String, required: true, readonly: true },
		trackBy: { type: String, readonly: true },
		strip: { default: false, readonly: true }
	}
})
export default class RtRepeat extends Component {
	_itemName: string;

	_list: ListCell;

	_itemMap: ItemMap;
	_oldItemMap: ItemMap;

	_trackBy: string;

	_rawItemContent: DocumentFragment;

	_context: Object;

	_lastNode: Node;

	_attachElement(): void {
		if (!this.initialized) {
			let props = this.props;
			let forAttrValue = props['for'].match(reForAttributeValue);

			if (!forAttrValue) {
				throw new SyntaxError(`Invalid value of attribute "for" (${ props['for'] })`);
			}

			this._itemName = forAttrValue[1];

			this._list = new Cell<any>(compileKeypath(forAttrValue[2]), { owner: props.context as Object });

			this._itemMap = new Map<any, ItemList>();

			this._trackBy = props['trackBy'];

			let rawItemContent = this._rawItemContent =
				document.importNode((this.element as any).content, true) as DocumentFragment;

			if (props['strip']) {
				let firstChild = rawItemContent.firstChild;
				let lastChild = rawItemContent.lastChild;

				if (firstChild == lastChild) {
					if (firstChild.nodeType == 3) {
						firstChild.textContent = (firstChild.textContent as string).trim();
					}
				} else {
					if (firstChild.nodeType == 3) {
						if (!(firstChild.textContent = (firstChild.textContent as string).replace(/^\s+/, ''))) {
							rawItemContent.removeChild(firstChild);
						}
					}
					if (lastChild.nodeType == 3) {
						if (!(lastChild.textContent = (lastChild.textContent as string).replace(/\s+$/, ''))) {
							rawItemContent.removeChild(lastChild);
						}
					}
				}
			}

			this._context = props.context as Object;

			this.initialized = true;
		}

		this._list.on('change', this._onListChange, this);

		this._render(false);
	}

	_detachElement(): void {
		this._clearWithItemMap(this._itemMap);
		this._list.off('change', this._onListChange, this);
	}

	_onListChange(): void {
		if (this.element.parentNode) {
			this._render(true);
		}
	}

	_render(c: boolean): void {
		let oldItemMap = this._oldItemMap = this._itemMap;
		this._itemMap = new Map<any, ItemList>();

		let list = this._list.get();
		let changed = false;

		if (list) {
			this._lastNode = this.element;
			changed = list.reduce((changed, item, index) => this._renderItem(item, index) || changed, changed);
		}

		if (oldItemMap.size) {
			this._clearWithItemMap(oldItemMap);
		} else if (!changed) {
			return;
		}

		if (c) {
			nextTick(() => {
				this.emit('change');
			});
		}
	}

	_renderItem(item: Object, index: number): boolean {
		let trackBy = this._trackBy;
		let trackingValue = trackBy ? (trackBy == '$index' ? index : item[trackBy]) : item;
		let prevItems = this._oldItemMap.get(trackingValue);
		let currentItems = this._itemMap.get(trackingValue);

		if (prevItems) {
			let prevItem: Item;

			if (prevItems.length == 1) {
				prevItem = prevItems[0];
				this._oldItemMap.delete(trackingValue);
			} else {
				prevItem = prevItems.shift() as Item;
			}

			if (currentItems) {
				currentItems.push(prevItem);
			} else {
				this._itemMap.set(trackingValue, [prevItem]);
			}

			prevItem.item.set(item);

			let nodes = prevItem.nodes;

			if (index == prevItem.index.get()) {
				this._lastNode = nodes[nodes.length - 1];
				return false;
			}

			prevItem.index.set(index);

			if (nodes.length == 1) {
				let node = nodes[0];
				this._lastNode.parentNode.insertBefore(node, this._lastNode.nextSibling);
				this._lastNode = node;
			} else {
				let df = document.createDocumentFragment();

				for (let node of nodes) {
					df.appendChild(node);
				}

				let newLastNode = df.lastChild;
				this._lastNode.parentNode.insertBefore(df, this._lastNode.nextSibling);
				this._lastNode = newLastNode;
			}

			return true;
		}

		let itemCell = new Cell(item);
		let indexCell = new Cell(index);

		let content = this._rawItemContent.cloneNode(true);
		let context = Object.create(this._context, {
			[this._itemName]: {
				get() {
					return itemCell.get();
				}
			},

			$index: {
				get() {
					return indexCell.get();
				}
			}
		});

		let { bindings, childComponents } = bindContent(content, this.ownerComponent as Component, context);

		let newItem = {
			item: itemCell,
			index: indexCell,
			nodes: slice.call(content.childNodes),
			bindings
		};

		if (currentItems) {
			currentItems.push(newItem);
		} else {
			this._itemMap.set(trackingValue, [newItem]);
		}

		let newLastNode = content.lastChild;
		this._lastNode.parentNode.insertBefore(content, this._lastNode.nextSibling);
		this._lastNode = newLastNode;

		if (!nativeCustomElementsFeature && childComponents) {
			attachChildComponentElements(childComponents);
		}

		return true;
	}

	_clearWithItemMap(itemMap: ItemMap): void {
		itemMap.forEach(this._clearWithItems, this);
		itemMap.clear();
	}

	_clearWithItems(items: ItemList): void {
		for (let i = items.length; i;) {
			let item = items[--i];
			let bindings = item.bindings;

			if (bindings) {
				for (let i = bindings.length; i;) {
					bindings[--i].off();
				}
			}

			let nodes = item.nodes;

			for (let i = nodes.length; i;) {
				let node = nodes[--i];
				let parentNode = node.parentNode;

				if (parentNode) {
					parentNode.removeChild(node);
				}
			}
		}
	}
}
