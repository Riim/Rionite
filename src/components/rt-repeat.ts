import { Map } from '@riim/map-set-polyfill';
import { nextTick } from '@riim/next-tick';
import { Cell, ObservableList } from 'cellx';
import { attachChildComponentElements } from '../attachChildComponentElements';
import { bindContent } from '../bindContent';
import { compileKeypath } from '../compileKeypath';
import { Component } from '../Component';
import { ComponentDecorator } from '../ComponentDecorator';
import { resumeConnectionStatusCallbacks, suppressConnectionStatusCallbacks } from '../ElementProtoMixin';
import { templateTag as templateTagFeature } from '../Features';
import { KEY_ELEMENT_CONNECTED } from '../KEY_ELEMENT_CONNECTED';
import { keypathPattern } from '../keypathPattern';
import { namePattern } from '../namePattern';

let slice = Array.prototype.slice;

export type TListCell = Cell<ObservableList<any>>;
export interface IItem {
	item: Cell<any>;
	index: Cell<number>;
	nodes: Array<Node>;
	bindings: Array<Cell> | null;
}
export type TItemList = Array<IItem>;
export type TItemMap = Map<any, TItemList>;

let reForAttrValue = RegExp(`^\\s*(${namePattern})\\s+of\\s+(${keypathPattern})\\s*$`);

@ComponentDecorator({
	elementIs: 'rt-repeat',
	elementExtends: 'template',

	input: {
		for: { type: String, required: true, readonly: true },
		trackBy: { type: String, readonly: true },
		strip: { default: false, readonly: true }
	}
})
export class RtRepeat extends Component {
	ownerComponent: Component;

	_itemName: string;
	_list: TListCell;
	_trackBy: string;

	_rawItemContent: DocumentFragment;

	_itemMap: TItemMap;
	_prevItemMap: TItemMap;

	_lastNode: Node;

	_active = false;

	elementConnected() {
		if (this._active) {
			return;
		}

		this._active = true;

		if (!this.initialized) {
			let input = this.input;
			let forAttrValue = input['for'].match(reForAttrValue);

			if (!forAttrValue) {
				throw new SyntaxError(`Invalid value of attribute "for" (${input['for']})`);
			}

			this._itemName = forAttrValue[1];
			this._list = new Cell<any>(compileKeypath(forAttrValue[2]), {
				context: input.$context
			});
			this._trackBy = input.trackBy;

			let rawItemContent = (this._rawItemContent = document.importNode(
				((this.element as any) as HTMLTemplateElement).content,
				true
			));

			if (input.strip) {
				let firstChild = rawItemContent.firstChild!;
				let lastChild = rawItemContent.lastChild!;

				if (firstChild == lastChild) {
					if (firstChild.nodeType == Node.TEXT_NODE) {
						firstChild.nodeValue = firstChild.nodeValue!.trim();
					}
				} else {
					if (firstChild.nodeType == Node.TEXT_NODE) {
						if (!(firstChild.nodeValue = firstChild.nodeValue!.replace(/^\s+/, ''))) {
							rawItemContent.removeChild(firstChild);
						}
					}
					if (lastChild.nodeType == Node.TEXT_NODE) {
						if (!(lastChild.nodeValue = lastChild.nodeValue!.replace(/\s+$/, ''))) {
							rawItemContent.removeChild(lastChild);
						}
					}
				}
			}

			this._itemMap = new Map<any, TItemList>();

			this.initialized = true;
		}

		this._list.on('change', this._onListChange, this);

		this._render(false);
	}

	elementDisconnected() {
		nextTick(() => {
			if (!(this.element as any)[KEY_ELEMENT_CONNECTED]) {
				this._deactivate();
			}
		});
	}

	_onListChange() {
		if (this.element.parentNode) {
			this._render(true);
		}
	}

	_attach() {
		this._attached = true;
	}
	_detach() {
		this._attached = false;
	}

	_render(changed: boolean) {
		let prevItemMap = (this._prevItemMap = this._itemMap);
		this._itemMap = new Map<any, TItemList>();

		let list = this._list.get();
		let c: boolean;

		if (list) {
			this._lastNode = this.element;

			c = list.reduce(
				(changed: boolean, item, index) => this._renderItem(item, index) || changed,
				false
			);
		} else {
			c = false;
		}

		if (prevItemMap.size) {
			this._clearByItemMap(prevItemMap);
		} else if (!c) {
			return;
		}

		if (changed) {
			Cell.forceRelease();
			this.emit('change');
		}
	}

	_renderItem(item: any, index: number): boolean {
		let trackBy = this._trackBy;
		let value = trackBy ? (trackBy == '$index' ? index : item[trackBy]) : item;
		let prevItems = this._prevItemMap.get(value);
		let items = this._itemMap.get(value);

		if (prevItems) {
			let prevItem: IItem;

			if (prevItems.length == 1) {
				prevItem = prevItems[0];
				this._prevItemMap.delete(value);
			} else {
				prevItem = prevItems.shift()!;
			}

			if (items) {
				items.push(prevItem);
			} else {
				this._itemMap.set(value, [prevItem]);
			}

			prevItem.item.set(item);

			let nodes = prevItem.nodes;

			if (index == prevItem.index.get()) {
				this._lastNode = nodes[nodes.length - 1];
				return false;
			}

			prevItem.index.set(index);

			let nodeCount = nodes.length;

			if (nodeCount == 1) {
				let node = nodes[0];
				let nextNode = this._lastNode.nextSibling;

				if (node !== nextNode) {
					this._lastNode.parentNode!.insertBefore(node, nextNode);
				}

				this._lastNode = node;
			} else {
				if (nodes[0] !== this._lastNode.nextSibling) {
					let df = document.createDocumentFragment();

					for (let i = 0; i < nodeCount; i++) {
						df.appendChild(nodes[i]);
					}

					this._lastNode.parentNode!.insertBefore(df, this._lastNode.nextSibling);
				}

				this._lastNode = nodes[nodeCount - 1];
			}

			return true;
		}

		let itemCell = new Cell(item);
		let indexCell = new Cell(index);

		let content = this._rawItemContent.cloneNode(true) as DocumentFragment;
		if (!templateTagFeature) {
			let templates = content.querySelectorAll('template');

			for (let i = 0, l = templates.length; i < l; ) {
				i += templates[i].content.querySelectorAll('template').length + 1;
			}
		}
		let context = this.input.$context;
		let [bindings, childComponents] = bindContent(
			content,
			this.ownerComponent,
			Object.create(context, {
				$component: {
					configurable: false,
					enumerable: false,
					writable: false,
					value: context.$component || context
				},

				[this._itemName + 'Cell']: {
					configurable: true,
					enumerable: false,
					writable: true,
					value: itemCell
				},
				[this._itemName]: {
					configurable: true,
					enumerable: true,

					get() {
						return itemCell.get();
					}
				},

				$indexCell: {
					configurable: true,
					enumerable: false,
					writable: true,
					value: indexCell
				},
				$index: {
					configurable: true,
					enumerable: true,

					get() {
						return indexCell.get();
					}
				}
			}),
			{ 0: null, 1: null } as any
		);

		let newItem = {
			item: itemCell,
			index: indexCell,
			nodes: slice.call(content.childNodes),
			bindings
		};

		if (items) {
			items.push(newItem);
		} else {
			this._itemMap.set(value, [newItem]);
		}

		let newLastNode = content.lastChild!;
		suppressConnectionStatusCallbacks();
		this._lastNode.parentNode!.insertBefore(content, this._lastNode.nextSibling);
		resumeConnectionStatusCallbacks();
		this._lastNode = newLastNode;

		if (childComponents) {
			attachChildComponentElements(childComponents);
		}

		return true;
	}

	_clearByItemMap(itemMap: TItemMap) {
		itemMap.forEach(this._clearByItems, this);
		itemMap.clear();
	}

	_clearByItems(items: TItemList) {
		for (let i = items.length; i; ) {
			let item = items[--i];
			let bindings = item.bindings;

			if (bindings) {
				for (let i = bindings.length; i; ) {
					bindings[--i].off();
				}
			}

			let nodes = item.nodes;

			for (let i = nodes.length; i; ) {
				let node = nodes[--i];
				let parentNode = node.parentNode;

				if (parentNode) {
					parentNode.removeChild(node);
				}
			}
		}
	}

	_deactivate() {
		if (!this._active) {
			return;
		}

		this._active = false;

		this._list.off('change', this._onListChange, this);

		this._clearByItemMap(this._itemMap);
	}
}
