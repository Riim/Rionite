let { Cell, js: { Symbol }, utils: { nextTick } } = require('cellx');
let Component = require('../Component');
let morphComponentElement = require('../morphComponentElement');

let KEY_CONTENT_SOURCE_ELEMENT = Symbol('contentSourceElement');

let RtContent = module.exports = Component.extend('rt-content', {
	Static: {
		elementAttributes: {
			select: String
		}
	},

	shouldElementUpdate() {
		return true;
	},

	/**
	 * @override
	 */
	updateElement() {
		morphComponentElement(this, this._contentSourceElement.get());

		if (this.isReady) {
			nextTick(() => {
				this.emit('element-update');
			});
		}

		return this;
	},

	initialize() {
		let parent = this.parent;

		for (let counter = 1; ; parent = parent.parent) {
			counter += parent instanceof RtContent ? 1 : -1;

			if (!counter) {
				break;
			}
		}

		let parentContentSourceElement = parent[KEY_CONTENT_SOURCE_ELEMENT] || (
			parent[KEY_CONTENT_SOURCE_ELEMENT] = new Cell(function() {
				return parent.props.contentSourceElement.cloneNode(true);
			})
		);

		this._contentSourceElement = new Cell(function() {
			let sourceElement = parentContentSourceElement.get();
			let selector = this.elementAttributes.select;

			if (selector) {
				let selectedElements = sourceElement.querySelectorAll(selector);

				if (!selectedElements.length) {
					return this.props.contentSourceElement;
				}

				let el = document.createElement('div');

				for (let i = 0, l = selectedElements.length; i < l; i++) {
					el.appendChild(selectedElements[i]);
				}

				return el;
			}

			if (!sourceElement.firstChild) {
				return this.props.contentSourceElement;
			}

			let el = document.createElement('div');

			for (let child; child = sourceElement.firstChild;) {
				el.appendChild(child);
			}

			return el;
		}, {
			owner: this,
			onChange: this._onContentSourceElementChange
		});

		this._contentSourceElementListening = true;
	},

	elementAttached() {
		if (!this._contentSourceElementListening) {
			this._contentSourceElement.on('change', this._onContentSourceElementChange);
		}
	},

	elementDetached() {
		this._contentSourceElement.off('change', this._onContentSourceElementChange);
		this._contentSourceElementListening = false;
	},

	_onContentSourceElementChange() {
		this.updateElement();
	}
});
