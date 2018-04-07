import { Map, Set } from '@riim/map-set-polyfill';
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

export type TList = Array<any> | ObservableList<any>;
export type TListCell = Cell<TList>;
export interface I$Item {
	item: Cell<any>;
	index: Cell<number>;
	nodes: Array<Node>;
	bindings: Array<Cell> | null;
}
export type T$ItemMap = Map<any, I$Item>;

const reForAttrValue = RegExp(`^\\s*(${namePattern})\\s+(?:in|of)\\s+(${keypathPattern})\\s*$`);

function getItem(list: TList, index: number): any {
	return list instanceof ObservableList ? list.get(index) : list[index];
}

function insertNodes(nodes: Array<Node>, lastNode: Node): Node {
	let nodeCount = nodes.length;

	if (nodeCount == 1) {
		lastNode.parentNode!.insertBefore(nodes[0], lastNode.nextSibling);
		return nodes[0];
	}

	let df = document.createDocumentFragment();

	for (let i = 0; i < nodeCount; i++) {
		df.appendChild(nodes[i]);
	}

	lastNode.parentNode!.insertBefore(df, lastNode.nextSibling);
	return nodes[nodeCount - 1];
}

function removeNodes(nodes: Array<Node>) {
	let nodeCount = nodes.length;

	if (nodeCount == 1) {
		let node = nodes[0];

		if (node.parentNode) {
			node.parentNode.removeChild(node);
		}
	} else {
		for (let i = 0; i < nodeCount; i++) {
			let node = nodes[i];

			if (node.parentNode) {
				node.parentNode.removeChild(node);
			}
		}
	}
}

@Component({
	elementExtends: 'template',

	params: {
		for: { property: 'paramFor', type: String, required: true, readonly: true },
		trackBy: { property: 'paramTrackBy', type: String, readonly: true }
	}
})
export class RtRepeat extends BaseComponent {
	paramFor: string;
	paramTrackBy: string;

	_itemName: string;

	_prevList: Array<any>;
	_list: TListCell;

	_$itemMap: T$ItemMap;

	_trackBy: string | null;

	_rawItemContent: DocumentFragment;

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

			this._prevList = [];
			this._list = new Cell<any>(compileKeypath(for_[2]), {
				context: this.$context
			});

			this._$itemMap = new Map();

			this._trackBy = this.paramTrackBy;

			this._rawItemContent = document.importNode(
				((this.element as any) as HTMLTemplateElement).content,
				true
			);

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

	_render(fromChangeEvent: boolean) {
		let prevList = this._prevList;
		let prevListLength = prevList.length;
		let list = this._list.get();
		let $itemMap = this._$itemMap;
		let trackBy = this._trackBy;

		let startIndex = 0;

		let changed = false;

		if (list) {
			let lastNode: Node = this.element;
			let removedValues = new Set<any>();

			for (let i = 0, l = list.length; i < l; ) {
				let item = getItem(list, i);
				let value = trackBy ? item[trackBy] : item;
				let $item = $itemMap.get(value);

				if ($item) {
					if (removedValues.delete(value)) {
						$item.item.set(item);
						$item.index.set(i);

						lastNode = insertNodes($item.nodes, lastNode);

						startIndex++;
						i++;
					} else {
						let foundIndex: number | undefined;

						for (let j = startIndex, m = prevList.length; ; j++) {
							if (foundIndex === undefined) {
								if (value === (trackBy ? prevList[j][trackBy] : prevList[j])) {
									if (j == startIndex) {
										lastNode = $item.nodes[$item.nodes.length - 1];
										startIndex++;
										i++;
										break;
									}

									foundIndex = j;
								}
							} else {
								let foundCount = j - foundIndex;
								let ii = i + foundCount;

								if (ii < l) {
									if (
										j < m && trackBy
											? getItem(list, ii)[trackBy] === prevList[j][trackBy]
											: getItem(list, ii) === prevList[j]
									) {
										continue;
									}

									if (foundCount < foundIndex - startIndex) {
										for (let k = foundIndex; k < j; k++) {
											let k$Item = $itemMap.get(
												trackBy ? prevList[k][trackBy] : prevList[k]
											)!;

											k$Item.item.set(item);
											k$Item.index.set(i);

											lastNode = insertNodes(k$Item.nodes, lastNode);
										}

										prevList.splice(foundIndex, foundCount);
										m -= foundCount;

										changed = true;

										startIndex += foundCount;
										i = ii;

										break;
									}
								}

								for (let k = startIndex; k < foundIndex; k++) {
									let value = trackBy ? prevList[k][trackBy] : prevList[k];
									removeNodes($itemMap.get(value)!.nodes);
									removedValues.add(value);
								}

								changed = true;

								startIndex = j;
								i = ii;

								break;
							}
						}
					}
				} else {
					let itemCell = new Cell(item);
					let indexCell = new Cell(i);

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

								get: (itemCell => () => {
									return itemCell.get();
								})(itemCell)
							},

							$index: {
								configurable: true,
								enumerable: true,

								get: (indexCell => () => {
									return indexCell.get();
								})(indexCell)
							}
						}),
						{ 0: null, 1: null, 2: null } as any
					);

					$itemMap.set(value, {
						item: itemCell,
						index: indexCell,
						nodes: slice.call(content.childNodes),
						bindings
					});

					let newLastNode = content.lastChild!;
					suppressConnectionStatusCallbacks();
					lastNode.parentNode!.insertBefore(content, lastNode.nextSibling);
					resumeConnectionStatusCallbacks();
					lastNode = newLastNode;

					if (childComponents) {
						attachChildComponentElements(childComponents);
					}

					if (backBindings) {
						for (let i = backBindings.length; i; ) {
							let backBinding = backBindings[--i];
							backBinding[0].on('change:' + backBinding[1], backBinding[2]);
						}
					}

					changed = true;

					i++;
				}
			}

			if (removedValues.size) {
				($itemMap => {
					removedValues.forEach(value => {
						let bindings = $itemMap.get(value)!.bindings;

						if (bindings) {
							for (let i = bindings.length; i; ) {
								bindings[--i].off();
							}
						}

						$itemMap.delete(value);
					});
				})($itemMap);
			}
		}

		if (startIndex < prevListLength) {
			for (let i = startIndex; i < prevListLength; i++) {
				let value = trackBy ? prevList[i][trackBy] : prevList[i];
				let $item = $itemMap.get(value)!;

				removeNodes($item.nodes);

				let bindings = $item.bindings;

				if (bindings) {
					for (let i = bindings.length; i; ) {
						bindings[--i].off();
					}
				}

				$itemMap.delete(value);
			}
		} else if (!changed) {
			return;
		}

		this._prevList = list instanceof ObservableList ? list.toArray() : list.slice();

		if (fromChangeEvent) {
			Cell.forceRelease();
			this.emit('change');
		}
	}

	_deactivate() {
		if (!this._active) {
			return;
		}

		this._active = false;

		this._list.off('change', this._onListChange, this);

		let prevList = this._prevList;
		let $itemMap = this._$itemMap;
		let trackBy = this._trackBy;

		for (let i = 0, l = prevList.length; i < l; i++) {
			let value = trackBy ? prevList[i][trackBy] : prevList[i];
			let $item = $itemMap.get(value)!;

			removeNodes($item.nodes);

			let bindings = $item.bindings;

			if (bindings) {
				for (let i = bindings.length; i; ) {
					bindings[--i].off();
				}
			}

			$itemMap.delete(value);
		}
	}
}
