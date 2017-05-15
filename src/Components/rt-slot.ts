import { JS } from 'cellx';
import { IComponentElement, default as Component } from '../Component';
import { ElementsController } from '../ElementProtoMixin';
import bindContent from '../bindContent';
import { IFreezableCell } from '../componentBinding';
import attachChildComponentElements from '../attachChildComponentElements';
import moveContent from '../Utils/moveContent';
import clearNode from '../Utils/clearNode';
import { templateTag as templateTagFeature, nativeCustomElements as nativeCustomElementsFeature } from '../Features';
import d from '../d';

let Map = JS.Map;

let KEY_SLOT_CONTENT_MAP = JS.Symbol('slotContentMap');
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

	_childComponents: Array<Component> | null;

	_attach() {
		this._attached = true;

		if (this.isReady) {
			this._unfreezeBindings();
		} else {
			let ownerComponent = this.ownerComponent;
			let el = this.element;
			let props = this.props;
			let ownerComponentContent = ownerComponent.props.content as DocumentFragment;
			let content: DocumentFragment | undefined;
			let bindings: Array<IFreezableCell> | null | undefined;
			let childComponents: Array<Component> | null | undefined;

			if (ownerComponentContent.firstChild) {
				let name = props.name;
				let cloneContent = props.cloneContent;

				if (name) {
					let contentMap: Map<string, IComponentElement> | undefined;

					if (
						!cloneContent &&
							(contentMap = (ownerComponent.ownerComponent as Component)[KEY_SLOT_CONTENT_MAP]) &&
							contentMap.has(name)
					) {
						let c: IComponentElement = contentMap.get(name);

						content = moveContent(document.createDocumentFragment(), c);
						contentMap.set(name, el);

						bindings = c.$component._bindings;
						childComponents = (c.$component as RtSlot)._childComponents;
					} else {
						if (!templateTagFeature && !ownerComponentContent[KEY_TEMPLATES_FIXED]) {
							let templates = ownerComponentContent.querySelectorAll('template');

							for (let i = templates.length; i;) {
								templates[--i].content;
							}

							ownerComponentContent[KEY_TEMPLATES_FIXED] = true;
						}

						let selectedEls = ownerComponentContent.querySelectorAll(`[rt-slot=${ name }]`);
						let selectedElCount = selectedEls.length;

						if (selectedElCount) {
							content = document.createDocumentFragment();

							for (let i = 0; i < selectedElCount; i++) {
								content.appendChild(cloneContent ? selectedEls[i].cloneNode(true) : selectedEls[i]);
							}
						}

						if (!cloneContent) {
							(
								contentMap ||
									(ownerComponent.ownerComponent as Component)[KEY_SLOT_CONTENT_MAP] ||
									((ownerComponent.ownerComponent as Component)[KEY_SLOT_CONTENT_MAP] = new Map())
							).set(name, el);
						}
					}
				} else if (cloneContent) {
					content = ownerComponentContent.cloneNode(true) as DocumentFragment;
				} else {
					let contentMap: Map<string, IComponentElement> | undefined =
						(ownerComponent.ownerComponent as Component)[KEY_SLOT_CONTENT_MAP];

					if (contentMap && contentMap.has('')) {
						let c = contentMap.get('');

						content = moveContent(document.createDocumentFragment(), c);
						contentMap.set('', el);

						bindings = c.$component._bindings;
						childComponents = (c.$component as RtSlot)._childComponents;
					} else {
						content = ownerComponentContent;
						(contentMap || ((ownerComponent.ownerComponent as Component)[KEY_SLOT_CONTENT_MAP] = new Map()))
							.set('', el);
					}
				}
			}

			if (bindings === undefined) {
				if (content || el.firstChild) {
					let getContext = props.getContext;

					[this._bindings, this._childComponents] = content ?
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
				} else {
					this._bindings = null;
					this._childComponents = null;
				}
			} else {
				this._bindings = bindings;
				this._childComponents = childComponents as Array<Component> | null;

				this._unfreezeBindings();
			}

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
