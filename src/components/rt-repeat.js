let { Cell, js: { Map } } = require('cellx');
let bind = require('../bind');
let Component = require('../Component');
let namePattern = require('../namePattern');
let pathPattern = require('../pathPattern');
let compilePath = require('../utils/compilePath');

let createObject = Object.create;
let slice = Array.prototype.slice;

let reForAttributeValue = RegExp(`^\\s*(${ namePattern })\\s+of\\s+(${ pathPattern })\\s*$`);

module.exports = Component.extend('rt-repeat', {
	Static: {
		elementExtends: 'template',

		elementAttributes: {
			for: String,
			trackBy: String,
			strip: false
		}
	},

	_itemName: void 0,

	_list: null,

	_itemMap: null,
	_oldItemMap: null,

	_trackBy: void 0,

	_rawContent: null,

	_context: null,

	_lastNode: null,

	_onElementAttachedChange(evt) {
		if (evt.value) {
			if (!this.initialized) {
				let props = this.props;
				let rawContent = props.content = document.importNode(this.element.content, true);

				if (props.strip) {
					let firstChild = rawContent.firstChild;
					let lastChild = rawContent.lastChild;

					if (firstChild == lastChild) {
						if (firstChild.nodeType == 3) {
							firstChild.textContent = firstChild.textContent.trim();
						}
					} else {
						if (firstChild.nodeType == 3) {
							if (!(firstChild.textContent = firstChild.textContent.replace(/^\s+/, ''))) {
								rawContent.removeChild(firstChild);
							}
						}
						if (lastChild.nodeType == 3) {
							if (!(lastChild.textContent = lastChild.textContent.replace(/\s+$/, ''))) {
								rawContent.removeChild(lastChild);
							}
						}
					}
				}

				let forAttrValue = props.for.match(reForAttributeValue);

				if (!forAttrValue) {
					throw new SyntaxError('Invalid value of attribute "for"');
				}

				this._itemName = forAttrValue[1];

				this._list = new Cell(compilePath(forAttrValue[2]), { owner: props.context });

				this._itemMap = new Map();

				this._trackBy = props.trackBy;

				this._rawContent = rawContent;

				this._context = props.context;

				this.initialized = true;
			}

			this._renderElement();

			this._list.on('change', this._onListChange, this);
		} else {
			this._clearItemMap(this._itemMap);
			this._list.off('change', this._onListChange, this);
		}
	},

	_onListChange() {
		this._renderElement();
	},

	_renderElement() {
		let oldItemMap = this._oldItemMap = this._itemMap;
		this._itemMap = new Map();

		let list = this._list.get();
		let changed;

		if (list) {
			this._lastNode = this.element;
			changed = list.reduce((changed, item, index) => this._renderListItem(item, index) || changed, false);
		}

		if (oldItemMap.size) {
			this._clearItemMap(oldItemMap);
		} else if (!changed) {
			return;
		}

		this.emit('change');
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

				let lastNode = df.lastChild;
				this._lastNode.parentNode.insertBefore(df, this._lastNode.nextSibling);
				this._lastNode = lastNode;
			}

			return true;
		}

		item = new Cell(item);
		index = new Cell(index);

		let content = this._rawContent.cloneNode(true);
		let context = createObject(this._context, {
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

		let newItem = {
			item,
			index,
			nodes: slice.call(content.childNodes),
			bindings: bind(content, this.ownerComponent, context)
		};

		if (currentItems) {
			currentItems.push(newItem);
		} else {
			this._itemMap.set(trackingValue, [newItem]);
		}

		let lastNode = content.lastChild;
		this._lastNode.parentNode.insertBefore(content, this._lastNode.nextSibling);
		this._lastNode = lastNode;

		return true;
	},

	_clearItemMap(itemMap) {
		itemMap.forEach(this._clearItems, this);
		itemMap.clear();
	},

	_clearItems(items) {
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
