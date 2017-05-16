import { JS } from 'cellx';
import { IComponentElement, default as Component } from '../Component';
import { ElementsController } from '../ElementProtoMixin';
import bindContent from '../bindContent';
import { IFreezableCell } from '../componentBinding';
import attachChildComponentElements from '../attachChildComponentElements';
import getUID from '../Utils/getUID';
import moveContent from '../Utils/moveContent';
import clearNode from '../Utils/clearNode';
import { templateTag as templateTagFeature, nativeCustomElements as nativeCustomElementsFeature } from '../Features';
import d from '../d';

let Map = JS.Map;

let KEY_CONTENT_MAP = JS.Symbol('contentMap');
let KEY_TEMPLATES_FIXED = JS.Symbol('Rionite.RtContent#templatesFixed');

@d.Component({
	elementIs: 'rt-content',

	props: {
		select: { type: String, readonly: true },
		clone: { default: false, readonly: true },
		getContext: { type: String, readonly: true }
	},

	template: ''
})
export default class RtContent extends Component {
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
			let contentOwnerComponent = ownerComponent.ownerComponent;
			let ownerComponentContent = ownerComponent.props.content as DocumentFragment;
			let clone = props.clone;
			let content: DocumentFragment | undefined;
			let bindings: Array<IFreezableCell> | null | undefined;
			let childComponents: Array<Component> | null | undefined;

			if (!clone || ownerComponentContent.firstChild) {
				let selector = props.select;
				let key = getUID(ownerComponent) + '/' + (selector || '');

				if (selector) {
					let contentMap: Map<string, IComponentElement> | undefined;

					if (
						!clone &&
							contentOwnerComponent &&
							(contentMap = contentOwnerComponent[KEY_CONTENT_MAP]) &&
							contentMap.has(key)
					) {
						let c: IComponentElement = contentMap.get(key);

						if (c.firstChild) {
							content = moveContent(document.createDocumentFragment(), c);
							contentMap.set(key, el);

							bindings = c.$component._bindings;
							childComponents = (c.$component as RtContent)._childComponents;
						}
					} else if (ownerComponentContent.firstChild) {
						if (!templateTagFeature && !ownerComponentContent[KEY_TEMPLATES_FIXED]) {
							let templates = ownerComponentContent.querySelectorAll('template');

							for (let i = templates.length; i;) {
								templates[--i].content;
							}

							ownerComponentContent[KEY_TEMPLATES_FIXED] = true;
						}

						let selectedEls = ownerComponentContent.querySelectorAll(selector);
						let selectedElCount = selectedEls.length;

						if (selectedElCount) {
							content = document.createDocumentFragment();

							for (let i = 0; i < selectedElCount; i++) {
								content.appendChild(clone ? selectedEls[i].cloneNode(true) : selectedEls[i]);
							}
						}

						if (!clone && contentOwnerComponent) {
							(
								contentMap ||
									contentOwnerComponent[KEY_CONTENT_MAP] ||
									(contentOwnerComponent[KEY_CONTENT_MAP] = new Map())
							).set(key, el);
						}
					}
				} else if (!clone && contentOwnerComponent) {
					let contentMap: Map<string, IComponentElement> | undefined = contentOwnerComponent[KEY_CONTENT_MAP];

					if (contentMap && contentMap.has(key)) {
						let c = contentMap.get(key);

						content = moveContent(document.createDocumentFragment(), c);
						contentMap.set(key, el);

						bindings = c.$component._bindings;
						childComponents = (c.$component as RtContent)._childComponents;
					} else if (ownerComponentContent.firstChild) {
						content = ownerComponentContent;
						(contentMap || (contentOwnerComponent[KEY_CONTENT_MAP] = new Map())).set(key, el);
					}
				} else if (ownerComponentContent.firstChild) {
					content = clone ? ownerComponentContent.cloneNode(true) as DocumentFragment : ownerComponentContent;
				}
			}

			if (bindings === undefined) {
				if (content || el.firstChild) {
					let getContext = props.getContext;

					[this._bindings, childComponents] = content ?
						bindContent(
							content,
							contentOwnerComponent as Component,
							getContext ?
								ownerComponent[getContext](this, ownerComponent.props.context) :
								ownerComponent.props.context
						) :
						bindContent(
							el,
							ownerComponent,
							getContext ? ownerComponent[getContext](this, props.context) : props.context
						);

					this._childComponents = childComponents;
				} else {
					this._bindings = null;
					childComponents = this._childComponents = null;
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

			if (!(content && nativeCustomElementsFeature) && childComponents) {
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
