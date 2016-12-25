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
	_attachElement() {
		if (this.isReady) {
			this._unfreezeBindings();
		} else {
			let ownerComponent = this.ownerComponent as Component;
			let ownerComponentInputContent = ownerComponent.props._content as DocumentFragment;
			let content: DocumentFragment | undefined;

			if (ownerComponentInputContent.firstChild) {
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
						content = document.createDocumentFragment();

						for (let i = 0; i < selectedElCount; i++) {
							content.appendChild(selectedEls[i].cloneNode(true));
						}
					}
				} else {
					content = ownerComponentInputContent;
				}
			}

			let el = this.element;
			let props = this.props;
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

			if (!nativeCustomElementsFeature && childComponents) {
				attachChildComponentElements(childComponents);
			}

			this.isReady = true;
		}
	}

	_detachElement() {
		this._freezeBindings();
	}
}
