import { Cell, JS, Utils } from 'cellx';
import namePattern from '../namePattern';
import ContentNodeType from '../ContentNodeType';
import parseContent from '../parseContent';
import compileBinding from '../compileBinding';
import bind from '../bind';
import attachChildComponentElements from '../attachChildComponentElements';
import Component from '../Component';
import { slice } from '../JS/Array';

let Map = JS.Map;
let nextTick = Utils.nextTick;

let reForAttributeValue = RegExp(`^\\s*(${ namePattern })\\s+of\\s+(\\S.*)$`);
let invalidForAttributeMessage = 'Invalid value of attribute "for"';

export default Component.extend('rt-repeat', {
	Static: {
		elementExtends: 'template',

		props: {
			for: { type: String, required: true, readonly: true },
			trackBy: { type: String, readonly: true },
			strip: { default: false, readonly: true }
		}
	},

	_itemName: void 0,

	_list: null,

	_itemMap: null,
	_oldItemMap: null,

	_trackBy: void 0,

	_rawItemContent: null,

	_context: null,

	_lastNode: null,

	_attachElement() {
		if (!this.initialized) {
			let props = this.props;
			let forAttrValue = props.for.match(reForAttributeValue);

			if (!forAttrValue) {
				throw new SyntaxError(invalidForAttributeMessage);
			}

			let parsedOf = parseContent(`{${ forAttrValue[2] }}`);

			if (parsedOf.length > 1 || parsedOf[0].type != ContentNodeType.BINDING) {
				throw new SyntaxError(invalidForAttributeMessage);
			}

			this._itemName = forAttrValue[1];

			this._list = new Cell(compileBinding(parsedOf[0]), { owner: props.context });

			this._itemMap = new Map();

			this._trackBy = props.trackBy;

			let rawItemContent = this._rawItemContent = document.importNode(this.element.content, true);

			if (props.strip) {
				let firstChild = rawItemContent.firstChild;
				let lastChild = rawItemContent.lastChild;

				if (firstChild == lastChild) {
					if (firstChild.nodeType == 3) {
						firstChild.textContent = firstChild.textContent.trim();
					}
				} else {
					if (firstChild.nodeType == 3) {
						if (!(firstChild.textContent = firstChild.textContent.replace(/^\s+/, ''))) {
							rawItemContent.removeChild(firstChild);
						}
					}
					if (lastChild.nodeType == 3) {
						if (!(lastChild.textContent = lastChild.textContent.replace(/\s+$/, ''))) {
							rawItemContent.removeChild(lastChild);
						}
					}
				}
			}

			this._context = props.context;

			this.initialized = true;
		}

		this._render(false);

		this._list.on('change', this._onListChange, this);
	},

	_detachElement() {
		this._clearWithItemMap(this._itemMap);
		this._list.off('change', this._onListChange, this);
	},

	_onListChange() {
		this._render(true);
	},

	_render(c) {
		let oldItemMap = this._oldItemMap = this._itemMap;
		this._itemMap = new Map();

		let list = this._list.get();
		let changed = false;

		if (list) {
			this._lastNode = this.element;
			changed = list.reduce((changed, item, index) => this._renderListItem(item, index) || changed, changed);
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
	},

	_renderListItem(item, index) {
		let trackBy = this._trackBy;
		let trackingValue = trackBy ? (trackBy == '$index' ? index : item[trackBy]) : item;
		let prevItems = this._oldItemMap.get(trackingValue);
		let currentItems = this._itemMap.get(trackingValue);

		if (prevItems) {
			let prevItem;

			if (prevItems.length == 1) {
				prevItem = prevItems[0];
				this._oldItemMap.delete(trackingValue);
			} else {
				prevItem = prevItems.shift();
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

				for (let i = 0, l = nodes.length; i < l; i++) {
					df.appendChild(nodes[i]);
				}

				let newLastNode = df.lastChild;
				this._lastNode.parentNode.insertBefore(df, this._lastNode.nextSibling);
				this._lastNode = newLastNode;
			}

			return true;
		}

		item = new Cell(item);
		index = new Cell(index);

		let content = this._rawItemContent.cloneNode(true);
		let context = Object.create(this._context, {
			[this._itemName]: {
				get() {
					return item.get();
				}
			},

			$index: {
				get() {
					return index.get();
				}
			}
		});

		let { bindings, childComponents } = bind(content, this.ownerComponent, context);

		let newItem = {
			item,
			index,
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

		if (childComponents) {
			attachChildComponentElements(childComponents);
		}

		return true;
	},

	_clearWithItemMap(itemMap) {
		itemMap.forEach(this._clearWithItems, this);
		itemMap.clear();
	},

	_clearWithItems(items) {
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
});
