import { JS } from 'cellx';
import { attachChildComponentElements } from '../attachChildComponentElements';
import { bindContent } from '../bindContent';
import { Component, IComponentElement } from '../Component';
import { IFreezableCell } from '../componentBinding';
import { ComponentDecorator } from '../ComponentDecorator';
import { resumeConnectionStatusCallbacks, suppressConnectionStatusCallbacks } from '../ElementProtoMixin';
import { clearNode } from '../Utils/clearNode';
import { getUID } from '../Utils/getUID';
import { moveContent } from '../Utils/moveContent';

let Map = JS.Map;

let KEY_CONTENT_MAP = JS.Symbol('contentMap');

@ComponentDecorator({
	elementIs: 'rt-content',

	input: {
		select: { type: String, readonly: true },
		clone: { default: false, readonly: true },
		getContext: { type: String, readonly: true }
	},

	template: ''
})
export class RtContent extends Component {
	ownerComponent: Component;

	_childComponents: Array<Component> | null;

	_attach() {
		this._attached = true;

		if (this.isReady) {
			this._unfreezeBindings();
		} else {
			let ownerComponent = this.ownerComponent;
			let el = this.element;
			let input = this.input;
			let contentOwnerComponent = ownerComponent.ownerComponent;
			let ownerComponentContent = ownerComponent.input.$content!;
			let clone = input.clone;
			let content: DocumentFragment | undefined;
			let bindings: Array<IFreezableCell> | null | undefined;
			let childComponents: Array<Component> | null | undefined;

			if (!clone || ownerComponentContent.firstChild) {
				let selector = input.select;
				let key = getUID(ownerComponent) + '/' + (selector || '');

				if (selector) {
					let contentMap: Map<string, IComponentElement> | undefined;

					if (
						!clone &&
							contentOwnerComponent &&
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
					} else if (ownerComponentContent.firstChild) {
						let selectedElements = ownerComponentContent.querySelectorAll(selector);
						let selectedElementCount = selectedElements.length;

						if (selectedElementCount) {
							content = document.createDocumentFragment();

							for (let i = 0; i < selectedElementCount; i++) {
								content.appendChild(clone ? selectedElements[i].cloneNode(true) : selectedElements[i]);
							}
						}

						if (!clone && contentOwnerComponent) {
							(
								contentMap ||
									(contentOwnerComponent as any)[KEY_CONTENT_MAP] ||
									((contentOwnerComponent as any)[KEY_CONTENT_MAP] = new Map())
							).set(key, el);
						}
					}
				} else if (!clone && contentOwnerComponent) {
					let contentMap: Map<string, IComponentElement> | undefined =
						(contentOwnerComponent as any)[KEY_CONTENT_MAP];

					if (contentMap && contentMap.has(key)) {
						let container = contentMap.get(key)!;

						content = moveContent(document.createDocumentFragment(), container);
						contentMap.set(key, el);

						bindings = container.$component._bindings;
						childComponents = (container.$component as RtContent)._childComponents;
					} else if (ownerComponentContent.firstChild) {
						content = ownerComponentContent;
						(contentMap || ((contentOwnerComponent as any)[KEY_CONTENT_MAP] = new Map())).set(key, el);
					}
				} else if (ownerComponentContent.firstChild) {
					content = clone ? ownerComponentContent.cloneNode(true) as DocumentFragment : ownerComponentContent;
				}
			}

			if (bindings === undefined) {
				if (content || el.firstChild) {
					[this._bindings, childComponents] = content ?
						bindContent(
							content,
							contentOwnerComponent!,
							input.getContext ?
								(ownerComponent as any)[input.getContext](ownerComponent.input.$context, this) :
								ownerComponent.input.$context,
							{ 0: null, 1: null } as any
						) :
						bindContent(el, ownerComponent, input.$context!, { 0: null, 1: null } as any);

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
