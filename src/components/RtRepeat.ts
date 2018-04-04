import { Map } from '@riim/map-set-polyfill';
import { nextTick } from '@riim/next-tick';
import { Cell, ObservableList } from 'cellx';
import { attachChildComponentElements } from '../attachChildComponentElements';
import { BaseComponent } from '../BaseComponent';
import { bindContent } from '../bindContent';
import { Component } from '../decorators/Component';
import { resumeConnectionStatusCallbacks, suppressConnectionStatusCallbacks } from '../ElementProtoMixin';
import { KEY_IS_ELEMENT_CONNECTED } from '../ElementProtoMixin';
import { compileKeypath } from '../lib/compileKeypath';
import { templateTag as templateTagFeature } from '../lib/Features';
import { keypathPattern } from '../lib/keypathPattern';
import { namePattern } from '../lib/namePattern';

const slice = Array.prototype.slice;

export type TListCell = Cell<ObservableList<any>>;
export interface I$Item {
	item: Cell<any>;
	index: Cell<number>;
	nodes: Array<Node>;
	bindings: Array<Cell> | null;
}
export type T$ItemList = Array<I$Item>;
export type T$ItemMap = Map<any, T$ItemList>;

const reForAttrValue = RegExp(`^\\s*(${namePattern})\\s+(?:in|of)\\s+(${keypathPattern})\\s*$`);

@Component({
	elementExtends: 'template',

	params: {
		for: { property: 'paramFor', type: String, required: true, readonly: true },
		trackBy: { property: 'paramTrackBy', type: String, readonly: true },
		strip: { property: 'paramStrip', default: false, readonly: true }
	}
})
export class RtRepeat extends BaseComponent {
	paramFor: string;
	paramTrackBy: string;
	paramStrip: boolean;

	_itemName: string;
	_list: TListCell;
	_trackBy: string | null;

	_rawItemContent: DocumentFragment;

	_$itemMap: T$ItemMap;
	_prev$ItemMap: T$ItemMap;

	_lastNode: Node;

	_active = false;

	elementConnected() {
		if (this._active) {
			return;
		}

		this._active = true;

		if (!this.initialized) {
			let for_ = this.paramFor.match(reForAttrValue);

			if (!for_) {
				throw new SyntaxError(`Invalid value of parameter "for" (${this.paramFor})`);
			}

			this._itemName = for_[1];
			this._list = new Cell<any>(compileKeypath(for_[2]), {
				context: this.$context
			});
			this._trackBy = this.paramTrackBy;

			let rawItemContent = (this._rawItemContent = document.importNode(
				((this.element as any) as HTMLTemplateElement).content,
				true
			));

			if (this.paramStrip) {
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

			this._$itemMap = new Map<any, T$ItemList>();

			this.initialized = true;
		}

		this._list.on('change', this._onListChange, this);

		this._render(false);
	}

	elementDisconnected() {
		nextTick(() => {
			if (!this.element[KEY_IS_ELEMENT_CONNECTED]) {
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
		let prevItemMap = (this._prev$ItemMap = this._$itemMap);
		this._$itemMap = new Map<any, T$ItemList>();

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
		let prev$Items = this._prev$ItemMap.get(value);
		let $items = this._$itemMap.get(value);

		if (prev$Items) {
			let $item: I$Item;

			if (prev$Items.length == 1) {
				$item = prev$Items[0];
				this._prev$ItemMap.delete(value);
			} else {
				$item = prev$Items.shift()!;
			}

			if ($items) {
				$items.push($item);
			} else {
				this._$itemMap.set(value, [$item]);
			}

			$item.item.set(item);

			let nodes = $item.nodes;

			if (index == $item.index.get()) {
				this._lastNode = nodes[nodes.length - 1];
				return false;
			}

			$item.index.set(index);

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
		let context = this.$context!;
		let [bindings, backBindings, childComponents] = bindContent(
			content,
			this.ownerComponent,
			Object.create(context, {
				'$/': {
					configurable: false,
					enumerable: false,
					writable: false,
					value: context['$/'] || context
				},

				[this._itemName]: {
					configurable: true,
					enumerable: true,

					get() {
						return itemCell.get();
					}
				},

				$index: {
					configurable: true,
					enumerable: true,

					get() {
						return indexCell.get();
					}
				}
			}),
			{ 0: null, 1: null, 2: null } as any
		);

		let new$Item = {
			item: itemCell,
			index: indexCell,
			nodes: slice.call(content.childNodes),
			bindings
		};

		if ($items) {
			$items.push(new$Item);
		} else {
			this._$itemMap.set(value, [new$Item]);
		}

		let newLastNode = content.lastChild!;
		suppressConnectionStatusCallbacks();
		this._lastNode.parentNode!.insertBefore(content, this._lastNode.nextSibling);
		resumeConnectionStatusCallbacks();
		this._lastNode = newLastNode;

		if (childComponents) {
			attachChildComponentElements(childComponents);
		}

		if (backBindings) {
			for (let i = backBindings.length; i; ) {
				let backBinding = backBindings[--i];
				backBinding[0].on('change:' + backBinding[1], backBinding[2]);
			}
		}

		return true;
	}

	_clearByItemMap($itemMap: T$ItemMap) {
		$itemMap.forEach(this._clearByItems, this);
		$itemMap.clear();
	}

	_clearByItems($items: T$ItemList) {
		for (let i = $items.length; i; ) {
			let $item = $items[--i];
			let bindings = $item.bindings;

			if (bindings) {
				for (let i = bindings.length; i; ) {
					bindings[--i].off();
				}
			}

			let nodes = $item.nodes;

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

		this._clearByItemMap(this._$itemMap);
	}
}
