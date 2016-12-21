import { JS } from 'cellx';
import Component from '../Component';
import d from '../d';
import bindContent from '../bindContent';
import attachChildComponentElements from '../attachChildComponentElements';
import { templateTag as templateTagFeature, nativeCustomElements as nativeCustomElementsFeature } from '../Features';

let KEY_TEMPLATES_FIXED = JS.Symbol('Rionite.RtContent#templatesFixed');

@d.Component({
	elementIs: 'rt-content',

	props: {
		select: { type: String, readonly: true },
		getContext: { type: String, readonly: true }
	},

	template: ''
})
export default class RtContent extends Component {
	_rawContent: DocumentFragment;

	_attachElement() {
		let ownerComponent = this.ownerComponent as Component;
		let el = this.element;
		let props = this.props;

		if (this.isReady) {
			for (let child: Node | null; (child = el.firstChild);) {
				el.removeChild(child);
			}
		} else {
			let inputContent = props.content = document.createDocumentFragment();

			for (let child: Node | null; (child = el.firstChild);) {
				inputContent.appendChild(child);
			}

			let ownerComponentInputContent = ownerComponent.props.content as DocumentFragment;
			let selector = this.elementAttributes['select'];

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

					for (let i = 0; i < selectedElCount; i++) {
						rawContent.appendChild(selectedEls[i].cloneNode(true));
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
	}

	_detachElement() {
		this._destroyBindings();
	}
}
