let { Cell, js: { Symbol }, utils: { nextTick } } = require('cellx');
let Component = require('../Component');
let morphComponentElement = require('../morphComponentElement');

let KEY_CONTENT_SOURCE_ELEMENT = Symbol('contentSourceElement');

module.exports = Component.extend('rt-content', {
	shouldElementUpdate() {
		return true;
	},

	/**
	 * @override
	 */
	updateElement() {
		let contentSourceElement = this._contentSourceElement.get();

		morphComponentElement(
			this,
			contentSourceElement,

			contentSourceElement == this.props.contentSourceElement ?
				this.ownerComponent :
				this.ownerComponent.ownerComponent
		);

		if (this.isReady) {
			nextTick(() => {
				this.emit('element-update');
			});
		}

		return this;
	},

	initialize() {
		let ownerComponent = this.ownerComponent;
		let ownerComponentProperties = ownerComponent.props;
		let selector = this.element.getAttribute('select');

		let ownerComponentContentSourceElement = ownerComponent[KEY_CONTENT_SOURCE_ELEMENT] || (
			ownerComponent[KEY_CONTENT_SOURCE_ELEMENT] = new Cell(function() {
				return ownerComponentProperties.contentSourceElement.cloneNode(true);
			})
		);

		this._contentSourceElement = new Cell(
			selector ?
				function() {
					let selectedElements = ownerComponentContentSourceElement.get().querySelectorAll(selector);

					if (!selectedElements.length) {
						return this.props.contentSourceElement;
					}

					let el = document.createElement('div');

					for (let i = 0, l = selectedElements.length; i < l; i++) {
						el.appendChild(selectedElements[i]);
					}

					return el;
				} :
				function() {
					let contentSourceElement = ownerComponentContentSourceElement.get();

					if (!contentSourceElement.firstChild) {
						return this.props.contentSourceElement;
					}

					let el = document.createElement('div');

					for (let child; child = contentSourceElement.firstChild;) {
						el.appendChild(child);
					}

					return el;
				},
			{
				owner: this,
				onChange: this._onContentSourceElementChange
			}
		);

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
