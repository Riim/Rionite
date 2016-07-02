let { Cell, utils: { nextTick } } = require('cellx');
let Component = require('../Component');
let morphComponentElement = require('../morphComponentElement');

module.exports = Component.extend('rt-content', {
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
		let contentSource = this._contentSource.get();

		morphComponentElement(
			this,
			contentSource,

			contentSource == this.props.contentSourceElement ?
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
		let ownerComponentProperties = this.ownerComponent.props;
		let elementAttributes = this.elementAttributes;

		this._contentSource = new Cell(function() {
			let ownerComponentContentSourceElement = ownerComponentProperties.contentSourceElement;
			let selector = elementAttributes.select;

			if (selector) {
				let selectedElements = ownerComponentContentSourceElement.querySelectorAll(selector);
				return selectedElements.length ? selectedElements : this.props.contentSourceElement;
			}

			return ownerComponentContentSourceElement.firstChild ?
				ownerComponentContentSourceElement :
				this.props.contentSourceElement;
		}, {
			owner: this,
			onChange: this._onContentSourceChange
		});

		this._contentSourceListening = true;
	},

	elementAttached() {
		if (!this._contentSourceListening) {
			this._contentSource.on('change', this._onContentSourceChange);
		}
	},

	elementDetached() {
		this._contentSource.off('change', this._onContentSourceChange);
		this._contentSourceListening = false;
	},

	_onContentSourceChange() {
		this.updateElement();
	}
});
