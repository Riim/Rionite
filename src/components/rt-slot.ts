import { clearNode } from '@riim/clear-node';
import { getUID } from '@riim/get-uid';
import { Map } from '@riim/map-set-polyfill';
import { moveContent } from '@riim/move-content';
import { Symbol } from '@riim/symbol-polyfill';
import { attachChildComponentElements } from '../attachChildComponentElements';
import { bindContent } from '../bindContent';
import { Component, IComponentElement } from '../Component';
import { IFreezableCell } from '../componentBinding';
import { ComponentDecorator } from '../ComponentDecorator';
import { resumeConnectionStatusCallbacks, suppressConnectionStatusCallbacks } from '../ElementProtoMixin';

let KEY_SLOT_CONTENT_MAP = Symbol('slotContentMap');

@ComponentDecorator({
	elementIs: 'rt-slot',

	input: {
		name: { type: String, readonly: true },
		extendChildren: { type: String, readonly: true },
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
			let input = this.input;
			let contentOwnerComponent = ownerComponent.ownerComponent;
			let ownerComponentContent = ownerComponent.input.$content!;
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
					} else if (ownerComponentContent.firstChild) {
						let selectedElements = ownerComponentContent.querySelectorAll(
							`[rt-slot=${name}]`
						);
						let selectedElementCount = selectedElements.length;

						if (selectedElementCount) {
							content = document.createDocumentFragment();

							let extendChildren = input.extendChildren;

							for (let i = 0; i < selectedElementCount; i++) {
								let selectedElement = (cloneContent
									? selectedElements[i].cloneNode(true)
									: selectedElements[i]) as Element;

								if (extendChildren) {
									let classNames =
										(ownerComponent.constructor as typeof Component)._contentBlockNames.join(
											'__' + extendChildren + ' '
										) +
										'__' +
										extendChildren;

									if (selectedElement instanceof HTMLElement) {
										selectedElement.className += ' ' + classNames;
									} else {
										selectedElement.setAttribute(
											'class',
											(selectedElement.getAttribute('class') || '') +
												' ' +
												classNames
										);
									}
								}

								content.appendChild(selectedElement);
							}
						}

						if (!cloneContent) {
							(contentMap ||
								(contentOwnerComponent as any)[KEY_SLOT_CONTENT_MAP] ||
								((contentOwnerComponent as any)[KEY_SLOT_CONTENT_MAP] = new Map())
							).set(key, el);
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
								input.getContext
									? input.getContext.call(
											ownerComponent,
											ownerComponent.input.$context,
											this
										)
									: ownerComponent.input.$context,
								{ 0: null, 1: null } as any
							)
						: bindContent(
								el,
								ownerComponent,
								input.getContext
									? input.getContext.call(ownerComponent, input.$context, this)
									: input.$context,
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
