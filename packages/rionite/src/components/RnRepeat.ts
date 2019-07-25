import { nextTick } from '@riim/next-tick';
import { Cell, ObservableList, TListener } from 'cellx';
import { moveContent } from '../../node_modules/@riim/move-content';
import { attachChildComponentElements } from '../attachChildComponentElements';
import { BaseComponent } from '../BaseComponent';
import { compileBinding } from '../compileBinding';
import { IBinding } from '../componentBinding';
import { Component } from '../decorators/Component';
import { KEY_ELEMENT_CONNECTED, resumeConnectionStatusCallbacks, suppressConnectionStatusCallbacks } from '../ElementProtoMixin';
import { getTemplateNodeValueAST } from '../getTemplateNodeValueAST';
import { compileKeypath } from '../lib/compileKeypath';
import { keypathPattern } from '../lib/keypathPattern';
import { namePattern } from '../lib/namePattern';
import { removeNodes } from '../lib/removeNodes';
import { KEY_CONTENT_TEMPLATE } from '../Template';
import { RnIfThen } from './RnIfThen';

const slice = Array.prototype.slice;

export type TList = Array<any> | ObservableList<any>;

export interface I$Item {
	item: Cell<any>;
	index: Cell<number>;
	nodes: Array<Node>;
	bindings: Array<Cell> | null;
	childComponents: Array<BaseComponent> | null;
}

export type T$ItemsMap = Map<any, Array<I$Item>>;

const reForAttrValue = RegExp(
	`^\\s*(${namePattern})\\s+(?:in|of)\\s+(${keypathPattern}(?:\\s*(.*\\S))?)\\s*$`
);

function getItem(list: TList, index: number): any {
	return Array.isArray(list) ? list[index] : list.get(index);
}

function insertBefore(nodes: Array<Node>, beforeNode: Node): Node {
	let nodeCount = nodes.length;

	if (nodeCount == 1) {
		beforeNode.parentNode!.insertBefore(nodes[0], beforeNode);
		return nodes[0];
	}

	let parent = beforeNode.parentNode!;

	for (let i = 0; i < nodeCount; i++) {
		parent.insertBefore(nodes[i], beforeNode);
	}

	return nodes[nodeCount - 1];
}

function offBindings(bindings: Array<Cell> | null) {
	if (bindings) {
		for (let i = bindings.length; i; ) {
			bindings[--i].off();
		}
	}
}

function deactivateChildComponents(childComponents: Array<BaseComponent> | null) {
	if (childComponents) {
		for (let i = childComponents.length; i; ) {
			let childComponent = childComponents[--i];

			if (childComponent instanceof RnIfThen || childComponent instanceof RnRepeat) {
				childComponent._deactivate();
			}
		}
	}
}

@Component({
	elementIs: 'RnRepeat',
	elementExtends: 'template',

	params: {
		for: {
			property: 'paramFor',
			type: String,
			required: true,
			readonly: true
		},
		trackBy: {
			type: String,
			readonly: true
		},
		beforeTemplate: {
			type: Boolean,
			readonly: true
		}
	}
})
export class RnRepeat extends BaseComponent {
	static EVENT_CHANGE = Symbol('change');

	static get bindsInputContent() {
		return true;
	}

	paramFor: string;
	trackBy: string;

	beforeTemplate: boolean;

	_itemName: string;

	_prevList: Array<any>;
	_list: Cell<TList | undefined>;

	_$itemsMap: T$ItemsMap;

	_active = false;

	elementConnected() {
		if (this._active) {
			return;
		}

		this._active = true;

		if (!this.initialized) {
			let for_ = this.paramFor.match(reForAttrValue);

			if (!for_) {
				throw new SyntaxError(`Invalid value in parameter "for" (${this.paramFor})`);
			}

			let getList: (this: object) => any;

			if (for_[3]) {
				let inListAST = getTemplateNodeValueAST(`{${for_[2]}}`);

				if (!inListAST || inListAST.length != 1) {
					throw new SyntaxError(`Invalid value in parameter "for" (${this.paramFor})`);
				}

				getList = compileBinding(inListAST, for_[2]);
			} else {
				getList = compileKeypath(for_[2]);
			}

			this._itemName = for_[1];

			this._prevList = [];
			this._list = new Cell<any>(getList, { context: this.$context });

			this._$itemsMap = new Map();

			this.initialized = true;
		}

		if (this.element[KEY_CONTENT_TEMPLATE]) {
			this._list.onChange(this._onListChange, this);
			this._render(false);
		}
	}

	elementDisconnected() {
		nextTick(() => {
			if (!this.element[KEY_ELEMENT_CONNECTED]) {
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
		let $itemsMap = this._$itemsMap;
		let trackBy = this.trackBy;

		let startIndex = 0;

		let changed = false;

		if (list) {
			let new$ItemsMap: T$ItemsMap = new Map();
			let removedValues = new Map<any, number>();
			let el = this.element;
			let lastNode: Node = el;

			for (let i = 0, l = list.length; i < l; ) {
				let item = getItem(list, i);
				let value = trackBy ? item[trackBy] : item;
				let $items = $itemsMap.get(value);

				if ($items) {
					if (removedValues.has(value)) {
						let $item = $items.shift()!;

						if (new$ItemsMap.has(value)) {
							new$ItemsMap.get(value)!.push($item);
						} else {
							new$ItemsMap.set(value, [$item]);
						}
						if (!$items.length) {
							$itemsMap.delete(value);
						}

						let removedCount = removedValues.get(value)!;

						if (removedCount == 1) {
							removedValues.delete(value);
						} else {
							removedValues.set(value, removedCount - 1);
						}

						$item.item.set(item);
						$item.index.set(i);

						lastNode = insertBefore(
							$item.nodes,
							lastNode == el && this.beforeTemplate ? el : lastNode.nextSibling!
						);

						i++;
					} else {
						let foundIndex: number | undefined;

						for (let j = startIndex; ; j++) {
							if (foundIndex === undefined) {
								if (value === (trackBy ? prevList[j][trackBy] : prevList[j])) {
									let $item = $items.shift()!;

									if (new$ItemsMap.has(value)) {
										new$ItemsMap.get(value)!.push($item);
									} else {
										new$ItemsMap.set(value, [$item]);
									}
									if (!$items.length) {
										$itemsMap.delete(value);
									}

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
									let iiValue;

									if (
										j < prevListLength &&
										(trackBy
											? (iiValue = getItem(list, ii)[trackBy]) ===
											  prevList[j][trackBy]
											: (iiValue = getItem(list, ii)) === prevList[j])
									) {
										let ii$Items = $itemsMap.get(iiValue)!;

										if (new$ItemsMap.has(iiValue)) {
											new$ItemsMap.get(iiValue)!.push(ii$Items.shift()!);
										} else {
											new$ItemsMap.set(iiValue, [ii$Items.shift()!]);
										}
										if (!ii$Items.length) {
											$itemsMap.delete(iiValue);
										}

										continue;
									}

									if (foundCount < foundIndex - startIndex) {
										for (let k = foundIndex; k < j; k++) {
											let kValue = trackBy
												? prevList[k][trackBy]
												: prevList[k];
											let k$Item = new$ItemsMap.get(kValue)!;

											k$Item[0].item.set(item);
											k$Item[0].index.set(i);

											lastNode = insertBefore(
												k$Item[0].nodes,
												lastNode == el && this.beforeTemplate
													? el
													: lastNode.nextSibling!
											);
										}

										prevList.splice(foundIndex, foundCount);
										prevListLength -= foundCount;

										i = ii;

										changed = true;

										break;
									}
								}

								for (let k = startIndex; k < foundIndex; k++) {
									let kValue = trackBy ? prevList[k][trackBy] : prevList[k];
									let index = removedValues.get(kValue) || 0;

									removeNodes($itemsMap.get(kValue)![index].nodes);
									removedValues.set(kValue, index + 1);
								}

								let lastFoundValue = trackBy
									? prevList[j - 1][trackBy]
									: prevList[j - 1];
								let nodes = new$ItemsMap.get(lastFoundValue)![
									removedValues.get(lastFoundValue) || 0
								].nodes;
								lastNode = nodes[nodes.length - 1];

								startIndex = j;
								i = ii;

								changed = true;

								break;
							}
						}
					}
				} else {
					let itemCell = new Cell(null, { value: item });
					let indexCell = new Cell(i);

					let context = this.$context!;
					let contentBindingResult: [
						Array<BaseComponent> | null,
						Array<IBinding> | null,
						Array<BaseComponent | string | TListener> | null
					] = [null, null, null];
					let content = this.element[KEY_CONTENT_TEMPLATE]!.render(
						null,
						this.ownerComponent,
						Object.create(context, {
							[this._itemName]: {
								configurable: true,
								enumerable: true,
								get: (itemCell => () => itemCell.get())(itemCell)
							},

							$index: {
								configurable: true,
								enumerable: true,
								get: (indexCell => () => indexCell.get())(indexCell)
							}
						}),
						contentBindingResult
					);
					let childComponents = contentBindingResult[0];
					let backBindings = contentBindingResult[2];
					let new$Item = {
						item: itemCell,
						index: indexCell,
						nodes: slice.call(content.childNodes),
						bindings: contentBindingResult[1],
						childComponents
					};

					if (new$ItemsMap.has(value)) {
						new$ItemsMap.get(value)!.push(new$Item);
					} else {
						new$ItemsMap.set(value, [new$Item]);
					}

					if (childComponents) {
						for (let i = childComponents.length; i; ) {
							let childComponent = childComponents[--i];

							if (
								childComponent.element.firstChild &&
								(childComponent.constructor as typeof BaseComponent)
									.bindsInputContent
							) {
								childComponent.$inputContent = moveContent(
									document.createDocumentFragment(),
									childComponent.element
								);
							}
						}
					}

					let newLastNode = content.lastChild!;
					suppressConnectionStatusCallbacks();
					lastNode.parentNode!.insertBefore(
						content,
						lastNode == el && this.beforeTemplate ? el : lastNode.nextSibling
					);
					resumeConnectionStatusCallbacks();
					lastNode = newLastNode;

					if (childComponents) {
						attachChildComponentElements(childComponents);
					}

					if (backBindings) {
						for (let i = backBindings.length; i; i -= 3) {
							(backBindings[i - 3] as BaseComponent).on(
								'change:' + backBindings[i - 2],
								backBindings[i - 1] as TListener
							);
						}
					}

					changed = true;

					i++;
				}
			}

			if (removedValues.size) {
				($itemsMap => {
					removedValues.forEach((_removedCount, value) => {
						for (let $item of $itemsMap.get(value)!) {
							offBindings($item.bindings);
							deactivateChildComponents($item.childComponents);
						}
					});
				})($itemsMap);
			}

			this._$itemsMap = new$ItemsMap;
		} else {
			this._$itemsMap = new Map();
		}

		if (startIndex < prevListLength) {
			for (let i = startIndex; i < prevListLength; i++) {
				let value = trackBy ? prevList[i][trackBy] : prevList[i];

				for (let $item of $itemsMap.get(value)!) {
					removeNodes($item.nodes);
					offBindings($item.bindings);
					deactivateChildComponents($item.childComponents);
				}
			}
		} else if (!changed) {
			return;
		}

		this._prevList = Array.isArray(list) ? list.slice() : list!.toArray();

		if (fromChangeEvent) {
			Cell.release();
			this.emit(RnRepeat.EVENT_CHANGE);
		}
	}

	_deactivate() {
		if (!this._active) {
			return;
		}

		this._active = false;

		this._list.offChange(this._onListChange, this);

		let prevList = this._prevList;
		let $itemsMap = this._$itemsMap;
		let trackBy = this.trackBy;

		for (let i = 0, l = prevList.length; i < l; i++) {
			let value = trackBy ? prevList[i][trackBy] : prevList[i];

			for (let $item of $itemsMap.get(value)!) {
				removeNodes($item.nodes);
				offBindings($item.bindings);
				deactivateChildComponents($item.childComponents);
			}
		}

		$itemsMap.clear();
	}
}
