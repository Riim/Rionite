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

let KEY_SLOT_CONTENT_MAP = Symbol('slotContentMap');

@Component.Config({
	elementIs: 'rt-slot',

	params: {
		forTag: { type: String, readonly: true },
		for: { type: String, readonly: true },
		cloneContent: { default: false, readonly: true },
		getContext: { type: Object, readonly: true }
	},

	template: ''
})
export class RtSlot extends Component {
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
			let cloneContent = params.cloneContent;
			let content: DocumentFragment | undefined;
			let bindings: Array<IFreezableCell> | null | undefined;
			let childComponents: Array<Component> | null | undefined;

			if (!cloneContent || ownerComponentContent.firstChild) {
				let tagName = params.forTag;
				let for_ = params['for'];
				let key = getUID(ownerComponent) + '/' + (tagName ? ':' + tagName : for_ || '');

				if (tagName || for_) {
					let contentMap: Map<string, IComponentElement> | undefined;

					if (
						!cloneContent &&
						(contentMap = (contentOwnerComponent as any)[KEY_SLOT_CONTENT_MAP]) &&
						contentMap.has(key)
					) {
						let container = contentMap.get(key)!;

						if (container.firstChild) {
							content = moveContent(document.createDocumentFragment(), container);
							contentMap.set(key, el);

							bindings = container.$component._bindings;
							childComponents = (container.$component as RtSlot)._childComponents;
						}
					} else {
						let contentEl = ownerComponentContent.firstElementChild;

						if (contentEl) {
							if (tagName) {
								tagName = tagName.toUpperCase();
							} else if (for_.indexOf('__') == -1) {
								let elementBlockNames = (ownerComponent.constructor as typeof Component)
									._elementBlockNames;
								for_ =
									elementBlockNames[elementBlockNames.length - 1] + '__' + for_;
							}

							do {
								if (
									tagName
										? contentEl.tagName == tagName
										: contentEl.classList.contains(for_)
								) {
									let selectedEl = (cloneContent
										? contentEl.cloneNode(true)
										: contentEl) as Element;

									contentEl = contentEl.nextElementSibling;

									(content || (content = document.createDocumentFragment())
									).appendChild(selectedEl);
								} else {
									contentEl = contentEl.nextElementSibling;
								}
							} while (contentEl);

							if (!cloneContent) {
								(contentMap ||
									(contentOwnerComponent as any)[KEY_SLOT_CONTENT_MAP] ||
									((contentOwnerComponent as any)[
										KEY_SLOT_CONTENT_MAP
									] = new Map())
								).set(key, el);
							}
						}
					}
				} else if (!cloneContent) {
					let contentMap:
						| Map<string, IComponentElement>
						| undefined = (contentOwnerComponent as any)[KEY_SLOT_CONTENT_MAP];

					if (contentMap && contentMap.has(key)) {
						let container = contentMap.get(key)!;

						content = moveContent(document.createDocumentFragment(), container);
						contentMap.set(key, el);

						bindings = container.$component._bindings;
						childComponents = (container.$component as RtSlot)._childComponents;
					} else if (ownerComponentContent.firstChild) {
						content = ownerComponentContent;
						(contentMap ||
							((contentOwnerComponent as any)[KEY_SLOT_CONTENT_MAP] = new Map())
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
