let bind = require('../bind');
let Component = require('../Component');

module.exports = Component.extend('rt-content', {
	Static: {
		elementAttributes: {
			select: String
		}
	},

	_rawContent: void 0,

	_onElementAttachedChange({ value: attached }) {
		if (attached) {
			let ownerComponent = this.ownerComponent;
			let el = this.element;
			let props = this.props;

			if (this.isReady) {
				for (let child; (child = el.firstChild);) {
					el.removeChild(child);
				}
			} else {
				let inputContent = props.content = document.createDocumentFragment();

				for (let child; (child = el.firstChild);) {
					inputContent.appendChild(child);
				}

				let ownerComponentContent = ownerComponent.props.content;
				let selectors = this.elementAttributes.select;

				if (selectors) {
					selectors = selectors.split('|');

					for (var i = 0, l = selectors.length; i < l; i++) {
						let selectedElements = ownerComponentContent.querySelectorAll(selectors[i]);
						let selectedElementCount = selectedElements.length;

						if (selectedElementCount) {
							let rawContent = this._rawContent = document.createDocumentFragment();

							for (let i = 0; i < selectedElementCount; i++) {
								rawContent.appendChild(selectedElements[i].cloneNode(true));
							}

							break;
						}
					}

					if (!this._rawContent) {
						this._rawContent = inputContent;
					}
				} else {
					this._rawContent = ownerComponentContent.firstChild ? ownerComponentContent : inputContent;
				}

				this.isReady = true;
			}

			let content = this._rawContent.cloneNode(true);

			this._bindings = this._rawContent == props.content ?
				bind(content, ownerComponent, props.context) :
				bind(content, ownerComponent.ownerComponent, ownerComponent.props.context);

			el.appendChild(content);
		} else {
			this._destroyBindings();
		}
	}
});
