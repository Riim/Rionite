import { ObservableList, Cell, JS, Utils } from 'cellx';
import Component from '../Component';
import compileKeypath from '../compileKeypath';
import bindContent from '../bindContent';
import attachChildComponentElements from '../attachChildComponentElements';
import namePattern from '../namePattern';
import keypathPattern from '../keypathPattern';
import { nativeCustomElements as nativeCustomElementsFeature } from '../Features';
import d from '../d';

let Map = JS.Map;
let nextTick = Utils.nextTick;

let slice = Array.prototype.slice;

export type TRtRepeatListCell = Cell<ObservableList<Object>>;
export type TRtRepeatItem = {
	item: Cell<Object>,
	index: Cell<number>,
	nodes: Array<Node>,
	bindings: Cell<any>[] | null
};
export type TRtRepeatItemList = Array<TRtRepeatItem>;
export type TRtRepeatItemMap = Map<any, TRtRepeatItemList>;

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

	_list: TRtRepeatListCell;

	_itemMap: TRtRepeatItemMap;
	_oldItemMap: TRtRepeatItemMap;

	_trackBy: string;

	_rawItemContent: DocumentFragment;

	_context: Object;

	_lastNode: Node;

	_attachElement() {
		if (!this.initialized) {
			let props = this.props;
			let forAttrValue = props['for'].match(reForAttributeValue);

			if (!forAttrValue) {
				throw new SyntaxError(`Invalid value of attribute "for" (${ props['for'] })`);
			}

			this._itemName = forAttrValue[1];

			this._list = new Cell<any>(compileKeypath(forAttrValue[2]), { owner: props.context as Object });

			this._itemMap = new Map<any, TRtRepeatItemList>();

			this._trackBy = props['trackBy'];

			let rawItemContent = this._rawItemContent =
				document.importNode((this.element as any).content, true) as DocumentFragment;

			if (props['strip']) {
				let firstChild = rawItemContent.firstChild as Node;
				let lastChild = rawItemContent.lastChild as Node;

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

	_detachElement() {
		this._clearByItemMap(this._itemMap);
		this._list.off('change', this._onListChange, this);
	}

	_onListChange() {
		if (this.element.parentNode) {
			this._render(true);
		}
	}

	_render(c: boolean) {
		let oldItemMap = this._oldItemMap = this._itemMap;
		this._itemMap = new Map<any, TRtRepeatItemList>();

		let list = this._list.get();
		let changed = false;

		if (list) {
			this._lastNode = this.element;
			changed = list.reduce((changed, item, index) => this._renderItem(item, index) || changed, changed);
		}

		if (oldItemMap.size) {
			this._clearByItemMap(oldItemMap);
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
			let prevItem: TRtRepeatItem;

			if (prevItems.length == 1) {
				prevItem = prevItems[0];
				this._oldItemMap.delete(trackingValue);
			} else {
				prevItem = prevItems.shift() as TRtRepeatItem;
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
				(this._lastNode.parentNode as Node).insertBefore(node, this._lastNode.nextSibling);
				this._lastNode = node;
			} else {
				let df = document.createDocumentFragment();

				for (let node of nodes) {
					df.appendChild(node);
				}

				let newLastNode = df.lastChild as Node;
				(this._lastNode.parentNode as Node).insertBefore(df, this._lastNode.nextSibling);
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

		let newLastNode = content.lastChild as Node;
		(this._lastNode.parentNode as Node).insertBefore(content, this._lastNode.nextSibling);
		this._lastNode = newLastNode;

		if (!nativeCustomElementsFeature && childComponents) {
			attachChildComponentElements(childComponents);
		}

		return true;
	}

	_clearByItemMap(itemMap: TRtRepeatItemMap) {
		itemMap.forEach(this._clearByItems, this);
		itemMap.clear();
	}

	_clearByItems(items: TRtRepeatItemList) {
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
