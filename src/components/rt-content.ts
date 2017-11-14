import { clearNode } from '@riim/clear-node';
import { getUID } from '@riim/get-uid';
import { Map } from '@riim/map-set-polyfill';
import { moveContent } from '@riim/move-content';
import { Symbol } from '@riim/symbol-polyfill';
import { attachChildComponentElements } from '../attachChildComponentElements';
import { bindContent } from '../bindContent';
import { Component, IComponentElement } from '../Component';
import { IFreezableCell } from '../componentBinding';
import { resumeConnectionStatusCallbacks, suppressConnectionStatusCallbacks } from '../ElementProtoMixin';

let KEY_CONTENT_MAP = Symbol('contentMap');

@Component.Config({
	elementIs: 'rt-content',

	params: {
		select: { type: String, readonly: true },
		clone: { default: false, readonly: true },
		getContext: { type: Object, readonly: true }
	},

	template: ''
})
export class RtContent extends Component {
	_childComponents: Array<Component> | null;

	_attach() {
		this._attached = true;

		if (this.isReady) {
			this._unfreezeBindings();
		} else {
			let ownerComponent = this.ownerComponent;
			let el = this.element;
			let params = this.params;
			let contentOwnerComponent = ownerComponent.ownerComponent;
			let ownerComponentContent = ownerComponent.params.$content!;
			let clone = params.clone;
			let content: DocumentFragment | undefined;
			let bindings: Array<IFreezableCell> | null | undefined;
			let childComponents: Array<Component> | null | undefined;

			if (!clone || ownerComponentContent.firstChild) {
				let selector = params.select;
				let key = getUID(ownerComponent) + '/' + (selector || '');

				if (selector) {
					let contentMap: Map<string, IComponentElement> | undefined;

					if (
						!clone &&
						(contentMap = (contentOwnerComponent as any)[KEY_CONTENT_MAP]) &&
						contentMap.has(key)
					) {
						let container = contentMap.get(key)!;

						if (container.firstChild) {
							content = moveContent(document.createDocumentFragment(), container);
							contentMap.set(key, el);

							bindings = container.$component._bindings;
							childComponents = (container.$component as RtContent)._childComponents;
						}
					} else if (ownerComponentContent.firstElementChild) {
						let selectedElements = ownerComponentContent.querySelectorAll(selector);
						let selectedElementCount = selectedElements.length;

						if (selectedElementCount) {
							content = document.createDocumentFragment();

							for (let i = 0; i < selectedElementCount; i++) {
								content.appendChild(
									clone
										? selectedElements[i].cloneNode(true)
										: selectedElements[i]
								);
							}
						}

						if (!clone) {
							(contentMap ||
								(contentOwnerComponent as any)[KEY_CONTENT_MAP] ||
								((contentOwnerComponent as any)[KEY_CONTENT_MAP] = new Map())
							).set(key, el);
						}
					}
				} else if (!clone) {
					let contentMap:
						| Map<string, IComponentElement>
						| undefined = (contentOwnerComponent as any)[KEY_CONTENT_MAP];

					if (contentMap && contentMap.has(key)) {
						let container = contentMap.get(key)!;

						content = moveContent(document.createDocumentFragment(), container);
						contentMap.set(key, el);

						bindings = container.$component._bindings;
						childComponents = (container.$component as RtContent)._childComponents;
					} else if (ownerComponentContent.firstChild) {
						content = ownerComponentContent;
						(contentMap || ((contentOwnerComponent as any)[KEY_CONTENT_MAP] = new Map())
						).set(key, el);
					}
				} else {
					content = ownerComponentContent.cloneNode(true) as DocumentFragment;
				}
			}

			if (bindings === undefined) {
				if (content || el.firstChild) {
					[this._bindings, childComponents] = content
						? bindContent(
								content,
								contentOwnerComponent,
								params.getContext
									? params.getContext.call(
											ownerComponent,
											ownerComponent.params.$context,
											this
										)
									: ownerComponent.params.$context,
								{ 0: null, 1: null } as any
							)
						: bindContent(
								el,
								ownerComponent,
								params.getContext
									? params.getContext.call(ownerComponent, params.$context, this)
									: params.$context,
								{ 0: null, 1: null } as any
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
				suppressConnectionStatusCallbacks();

				if (el.firstChild) {
					clearNode(el);
				}

				el.appendChild(content);

				resumeConnectionStatusCallbacks();
			}

			if (childComponents) {
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
