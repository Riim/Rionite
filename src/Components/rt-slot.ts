import { JS } from 'cellx';
import Component from '../Component';
import { ElementsController } from '../ElementProtoMixin';
import bindContent from '../bindContent';
import attachChildComponentElements from '../attachChildComponentElements';
import clearNode from '../Utils/clearNode';
import { templateTag as templateTagFeature, nativeCustomElements as nativeCustomElementsFeature } from '../Features';
import d from '../d';

let KEY_TEMPLATES_FIXED = JS.Symbol('Rionite.RtContent#templatesFixed');

@d.Component({
	elementIs: 'rt-slot',

	props: {
		name: { type: String, readonly: true },
		cloneContent: { default: false, readonly: true },
		getContext: { type: String, readonly: true }
	},

	template: ''
})
export default class RtSlot extends Component {
	ownerComponent: Component;

	_attach() {
		this._attached = true;

		if (this.isReady) {
			this._unfreezeBindings();
		} else {
			let props = this.props;
			let ownerComponent = this.ownerComponent;
			let ownerComponentInputContent = ownerComponent.props.content as DocumentFragment;
			let content: DocumentFragment | undefined;

			if (ownerComponentInputContent.firstChild) {
				let name = props.name;
				let cloneContent = props.cloneContent;

				if (name) {
					if (!templateTagFeature && !ownerComponentInputContent[KEY_TEMPLATES_FIXED]) {
						let templates = ownerComponentInputContent.querySelectorAll('template');

						for (let i = templates.length; i;) {
							templates[--i].content;
						}

						ownerComponentInputContent[KEY_TEMPLATES_FIXED] = true;
					}

					let selectedEls = ownerComponentInputContent.querySelectorAll(`[rt-slot=${ name }]`);
					let selectedElCount = selectedEls.length;

					if (selectedElCount) {
						content = document.createDocumentFragment();

						for (let i = 0; i < selectedElCount; i++) {
							content.appendChild(cloneContent ? selectedEls[i].cloneNode(true) : selectedEls[i]);
						}
					}
				} else if (cloneContent) {
					content = ownerComponentInputContent.cloneNode(true) as DocumentFragment;
				} else {
					content = ownerComponentInputContent;
				}
			}

			let el = this.element;
			let getContext = props.getContext;

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
				if (el.firstChild) {
					ElementsController.skipConnectionStatusCallbacks = true;
					clearNode(el);
					ElementsController.skipConnectionStatusCallbacks = false;
				}

				el.appendChild(content);
			}

			if ((!content || !nativeCustomElementsFeature) && childComponents) {
				attachChildComponentElements(childComponents);
			}

			this.isReady = true;
		}
	}

	_detach() {
		this._attached = false;
		this._freezeBindings();
	}
}
