let { js: { Symbol } } = require('cellx');
let bind = require('../bind');
let attachChildComponentElements = require('../attachChildComponentElements');
let Component = require('../Component');
let templateTagSupport = require('../templateTagSupport').templateTagSupport;

let KEY_TEMPLATES_FIXED = Symbol('templatesFixed');

module.exports = Component.extend('rt-content', {
	Static: {
		elementAttributes: {
			select: String,
			getContext: String
		},

		template: ''
	},

	_rawContent: void 0,

	_attachElement() {
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

			let ownerComponentInputContent = ownerComponent.props.content;
			let selector = this.elementAttributes.select;

			if (selector) {
				if (!templateTagSupport && !ownerComponentInputContent[KEY_TEMPLATES_FIXED]) {
					let templates = ownerComponentInputContent.querySelectorAll('template');

					for (let i = templates.length; i;) {
						templates[--i].content;
					}

					ownerComponentInputContent[KEY_TEMPLATES_FIXED] = true;
				}

				let selectedElements = ownerComponentInputContent.querySelectorAll(selector);
				let selectedElementCount = selectedElements.length;

				if (selectedElementCount) {
					let rawContent = this._rawContent = document.createDocumentFragment();

					for (let i = 0; i < selectedElementCount; i++) {
						rawContent.appendChild(selectedElements[i].cloneNode(true));
					}
				} else {
					this._rawContent = inputContent;
				}
			} else {
				this._rawContent = ownerComponentInputContent.firstChild ? ownerComponentInputContent : inputContent;
			}

			this.isReady = true;
		}

		let content = this._rawContent.cloneNode(true);
		let getContext = props.getContext;

		let { bindings, childComponents } = this._rawContent == props.content ?
			bind(
				content,
				ownerComponent,
				getContext ? ownerComponent[getContext](this, props.context) : props.context
			) :
			bind(
				content,
				ownerComponent.ownerComponent,
				getContext ?
					ownerComponent[getContext](this, ownerComponent.props.context) :
					ownerComponent.props.context
			);

		this._bindings = bindings;

		el.appendChild(content);

		if (childComponents) {
			attachChildComponentElements(childComponents);
		}
	},

	_detachElement() {
		this._destroyBindings();
	}
});
