import { JS } from 'cellx';
import Component from '../Component';
import { ElementsController } from '../ElementProtoMixin';
import bindContent from '../bindContent';
import attachChildComponentElements from '../attachChildComponentElements';
import { templateTag as templateTagFeature, nativeCustomElements as nativeCustomElementsFeature } from '../Features';
import d from '../d';

let KEY_TEMPLATES_FIXED = JS.Symbol('Rionite.RtContent#templatesFixed');

@d.Component({
	elementIs: 'rt-content',

	props: {
		select: { type: String, readonly: true },
		cloning: { default: true, readonly: true },
		getContext: { type: String, readonly: true }
	},

	template: ''
})
export default class RtContent extends Component {
	_rawContent: DocumentFragment;

	_attach() {
		this._attached = true;

		let props = this.props;

		if (props['cloning']) {
			let ownerComponent = this.ownerComponent as Component;
			let el = this.element;

			if (this.isReady) {
				for (let child: Node | null; (child = el.firstChild);) {
					el.removeChild(child);
				}
			} else {
				let content = props.content = document.createDocumentFragment();

				ElementsController.skipConnectionStatusCallbacks = true;
				for (let child: Node | null; (child = el.firstChild);) {
					content.appendChild(child);
				}
				ElementsController.skipConnectionStatusCallbacks = false;

				let ownerComponentInputContent = ownerComponent.props.content as DocumentFragment;
				let selector = this.props['select'];

				if (selector) {
					if (!templateTagFeature && !ownerComponentInputContent[KEY_TEMPLATES_FIXED]) {
						let templates = ownerComponentInputContent.querySelectorAll('template');

						for (let i = templates.length; i;) {
							templates[--i].content;
						}

						ownerComponentInputContent[KEY_TEMPLATES_FIXED] = true;
					}

					let selectedEls = ownerComponentInputContent.querySelectorAll(selector);
					let selectedElCount = selectedEls.length;

					if (selectedElCount) {
						let rawContent = this._rawContent = document.createDocumentFragment();

						ElementsController.skipConnectionStatusCallbacks = true;
						for (let i = 0; i < selectedElCount; i++) {
							rawContent.appendChild(selectedEls[i].cloneNode(true));
						}
						ElementsController.skipConnectionStatusCallbacks = false;
					} else {
						this._rawContent = content;
					}
				} else {
					this._rawContent = ownerComponentInputContent.firstChild ? ownerComponentInputContent : content;
				}

				this.isReady = true;
			}

			let content = this._rawContent.cloneNode(true);
			let getContext = props['getContext'];

			let { bindings, childComponents } = this._rawContent == props.content ?
				bindContent(
					content,
					ownerComponent,
					getContext ? ownerComponent[getContext](this, props.context) : props.context
				) :
				bindContent(
					content,
					ownerComponent.ownerComponent as Component,
					getContext ?
						ownerComponent[getContext](this, ownerComponent.props.context) :
						ownerComponent.props.context
				);

			this._bindings = bindings;

			el.appendChild(content);

			if (!nativeCustomElementsFeature && childComponents) {
				attachChildComponentElements(childComponents);
			}
		} else {
			if (this.isReady) {
				this._unfreezeBindings();
			} else {
				let ownerComponent = this.ownerComponent as Component;
				let ownerComponentInputContent = ownerComponent.props.content as DocumentFragment;
				let content: DocumentFragment | undefined;

				if (ownerComponentInputContent.firstChild) {
					let selector = this.props['select'];

					if (selector) {
						if (!templateTagFeature && !ownerComponentInputContent[KEY_TEMPLATES_FIXED]) {
							let templates = ownerComponentInputContent.querySelectorAll('template');

							for (let i = templates.length; i;) {
								templates[--i].content;
							}

							ownerComponentInputContent[KEY_TEMPLATES_FIXED] = true;
						}

						let selectedEls = ownerComponentInputContent.querySelectorAll(selector);
						let selectedElCount = selectedEls.length;

						if (selectedElCount) {
							content = document.createDocumentFragment();

							ElementsController.skipConnectionStatusCallbacks = true;
							for (let i = 0; i < selectedElCount; i++) {
								content.appendChild(selectedEls[i]);
							}
							ElementsController.skipConnectionStatusCallbacks = false;
						}
					} else {
						content = ownerComponentInputContent;
					}
				}

				let el = this.element;
				let getContext = props['getContext'];

				let { bindings, childComponents } = content ?
					bindContent(
						content,
						ownerComponent.ownerComponent as Component,
						getContext ?
							ownerComponent[getContext](this, ownerComponent.props.context) :
							ownerComponent.props.context
					) :
					bindContent(
						el,
						ownerComponent,
						getContext ? ownerComponent[getContext](this, props.context) : props.context
					);

				this._bindings = bindings;

				if (content) {
					for (let child: Node | null; (child = el.firstChild);) {
						el.removeChild(child);
					}

					el.appendChild(content);
				}

				if ((!content || !nativeCustomElementsFeature) && childComponents) {
					attachChildComponentElements(childComponents);
				}

				this.isReady = true;
			}
		}
	}

	_detach() {
		this._attached = false;

		if (this.props['cloning']) {
			this._destroyBindings();
		} else {
			this._freezeBindings();
		}
	}
}
