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

let KEY_SLOT_CONTENT_MAP = JS.Symbol('slotContentMap');

@ComponentDecorator({
	elementIs: 'rt-slot',

	input: {
		name: { type: String, readonly: true },
		cloneContent: { default: false, readonly: true },
		getContext: { type: String, readonly: true }
	},

	template: ''
})
export class RtSlot extends Component {
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
			let ownerComponentContent = ownerComponent.input.$content as DocumentFragment;
			let cloneContent = input.cloneContent;
			let content: DocumentFragment | undefined;
			let bindings: Array<IFreezableCell> | null | undefined;
			let childComponents: Array<Component> | null | undefined;

			if (!cloneContent || ownerComponentContent.firstChild) {
				let name = input.name;
				let key = getUID(ownerComponent) + '/' + (name || '');

				if (name) {
					let contentMap: Map<string, IComponentElement> | undefined;

					if (
						!cloneContent &&
						contentOwnerComponent &&
						(contentMap = (contentOwnerComponent as any)[KEY_SLOT_CONTENT_MAP]) &&
						contentMap.has(key)
					) {
						let c = contentMap.get(key) as IComponentElement;

						if (c.firstChild) {
							content = moveContent(document.createDocumentFragment(), c);
							contentMap.set(key, el);

							bindings = c.$component._bindings;
							childComponents = (c.$component as RtSlot)._childComponents;
						}
					} else if (ownerComponentContent.firstChild) {
						let selectedEls = ownerComponentContent.querySelectorAll(`[rt-slot=${ name }]`);
						let selectedElCount = selectedEls.length;

						if (selectedElCount) {
							content = document.createDocumentFragment();

							for (let i = 0; i < selectedElCount; i++) {
								content.appendChild(cloneContent ? selectedEls[i].cloneNode(true) : selectedEls[i]);
							}
						}

						if (!cloneContent && contentOwnerComponent) {
							(
								contentMap ||
									(contentOwnerComponent as any)[KEY_SLOT_CONTENT_MAP] ||
									((contentOwnerComponent as any)[KEY_SLOT_CONTENT_MAP] = new Map())
							).set(key, el);
						}
					}
				} else if (!cloneContent && contentOwnerComponent) {
					let contentMap: Map<string, IComponentElement> | undefined =
						(contentOwnerComponent as any)[KEY_SLOT_CONTENT_MAP];

					if (contentMap && contentMap.has(key)) {
						let c = contentMap.get(key) as IComponentElement;

						content = moveContent(document.createDocumentFragment(), c);
						contentMap.set(key, el);

						bindings = c.$component._bindings;
						childComponents = (c.$component as RtSlot)._childComponents;
					} else if (ownerComponentContent.firstChild) {
						content = ownerComponentContent;
						(contentMap || ((contentOwnerComponent as any)[KEY_SLOT_CONTENT_MAP] = new Map())).set(key, el);
					}
				} else if (ownerComponentContent.firstChild) {
					content = cloneContent ?
						ownerComponentContent.cloneNode(true) as DocumentFragment :
						ownerComponentContent;
				}
			}

			if (bindings === undefined) {
				if (content || el.firstChild) {
					let getContext = input.getContext;

					[this._bindings, childComponents] = content ?
						bindContent(
							content,
							contentOwnerComponent as Component,
							getContext ?
								(contentOwnerComponent as any)[getContext](ownerComponent.input.$context, this) :
								ownerComponent.input.$context,
							{ 0: null, 1: null } as any
						) :
						bindContent(el, ownerComponent, input.$context as Object, { 0: null, 1: null } as any);

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
