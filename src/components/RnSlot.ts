import { clearNode } from '@riim/clear-node';
import { getUID } from '@riim/get-uid';
import { Map } from '@riim/map-set-polyfill';
import { moveContent } from '@riim/move-content';
import { Symbol } from '@riim/symbol-polyfill';
import { attachChildComponentElements } from '../attachChildComponentElements';
import { BaseComponent, IComponentElement, KEY_IS_SLOT } from '../BaseComponent';
import { bindContent } from '../bindContent';
import { IFreezableCell } from '../componentBinding';
import { Component } from '../decorators/Component';
import { resumeConnectionStatusCallbacks, suppressConnectionStatusCallbacks } from '../ElementProtoMixin';

const KEY_SLOT_CONTENT_MAP = Symbol('Rionite/RnSlot/slotContentMap');

@Component({
	elementIs: 'RnSlot',

	params: {
		name: { property: 'paramName', type: String, readonly: true },
		forTag: { property: 'paramForTag', type: String, readonly: true },
		for: { property: 'paramFor', type: String, readonly: true },
		cloneContent: { property: 'paramCloneContent', default: false, readonly: true },
		getContext: { property: 'paramGetContext', type: Object, readonly: true }
	}
})
export class RnSlot extends BaseComponent {
	static get bindsInputContent() {
		return true;
	}

	$context: { [name: string]: any };

	paramName: string;
	paramForTag: string;
	paramFor: string;
	paramCloneContent: boolean;
	paramGetContext: (
		this: BaseComponent,
		context: { [name: string]: any },
		slot: RnSlot
	) => { [name: string]: any };

	_childComponents: Array<BaseComponent> | null;

	_attach() {
		this._attached = true;

		if (this.isReady) {
			this._unfreezeBindings();
		} else {
			let ownerComponent = this.ownerComponent;
			let el = this.element;
			let contentOwnerComponent = ownerComponent.ownerComponent;
			let ownerComponentContent = ownerComponent.$inputContent!;
			let cloneContent = this.paramCloneContent;
			let content: DocumentFragment | undefined;
			let bindings: Array<IFreezableCell> | null | undefined;
			let backBindings: Array<[BaseComponent, string, (evt: any) => void]> | null | undefined;
			let childComponents: Array<BaseComponent> | null | undefined;

			if (!cloneContent || ownerComponentContent.firstChild) {
				let slotName: string | null = this.paramName;
				let forTag: string | null | undefined;
				let for_: string | null | undefined;

				if (!slotName) {
					forTag = this.paramForTag;

					if (forTag) {
						forTag = forTag.toUpperCase();
					} else {
						for_ = this.paramFor;
					}
				}

				let key =
					getUID(ownerComponent) +
					'/' +
					(slotName ? '@' + slotName : forTag ? ':' + forTag : for_ || '');

				if (slotName || forTag || for_) {
					let contentMap: Map<string, IComponentElement> | undefined;

					if (
						!cloneContent &&
						(contentMap = contentOwnerComponent[KEY_SLOT_CONTENT_MAP]) &&
						contentMap.has(key)
					) {
						let container = contentMap.get(key)!;

						if (container.firstChild) {
							content = moveContent(document.createDocumentFragment(), container);
							contentMap.set(key, el);

							bindings = container.$component._bindings;
							childComponents = (container.$component as RnSlot)._childComponents;
						}
					} else if (ownerComponentContent.firstElementChild) {
						if (for_ && for_.indexOf('__') == -1) {
							let elementBlockNames = (ownerComponent.constructor as typeof BaseComponent)
								._elementBlockNames;
							for_ = elementBlockNames[elementBlockNames.length - 1] + '__' + for_;
						}

						let selectedElements = ownerComponentContent.querySelectorAll(
							slotName ? `[slot=${slotName}]` : forTag || '.' + for_
						);
						let selectedElementCount = selectedElements.length;

						if (selectedElementCount) {
							content = document.createDocumentFragment();

							for (let i = 0; i < selectedElementCount; i++) {
								content.appendChild(
									cloneContent
										? selectedElements[i].cloneNode(true)
										: selectedElements[i]
								);
							}
						}

						if (!cloneContent) {
							(
								contentMap ||
								contentOwnerComponent[KEY_SLOT_CONTENT_MAP] ||
								(contentOwnerComponent[KEY_SLOT_CONTENT_MAP] = new Map())
							).set(key, el);
						}
					}
				} else if (!cloneContent) {
					let contentMap: Map<string, IComponentElement> | undefined =
						contentOwnerComponent[KEY_SLOT_CONTENT_MAP];

					if (contentMap && contentMap.has(key)) {
						let container = contentMap.get(key)!;

						content = moveContent(document.createDocumentFragment(), container);
						contentMap.set(key, el);

						bindings = container.$component._bindings;
						childComponents = (container.$component as RnSlot)._childComponents;
					} else if (ownerComponentContent.firstChild) {
						content = ownerComponentContent;
						(
							contentMap || (contentOwnerComponent[KEY_SLOT_CONTENT_MAP] = new Map())
						).set(key, el);
					}
				} else {
					content = ownerComponentContent.cloneNode(true) as any;
				}
			}

			if (bindings === undefined) {
				if (content || el.firstChild) {
					[this._bindings, backBindings, childComponents] = content
						? bindContent(
								content,
								contentOwnerComponent,
								this.paramGetContext
									? this.paramGetContext.call(
											ownerComponent,
											ownerComponent.$context,
											this
									  )
									: ownerComponent.$context,
								{ 0: null, 1: null, 2: null } as any
						  )
						: bindContent(
								el,
								ownerComponent,
								this.paramGetContext
									? this.paramGetContext.call(ownerComponent, this.$context, this)
									: this.$context,
								{ 0: null, 1: null, 2: null } as any
						  );

					this._childComponents = childComponents;
				} else {
					this._bindings = null;
					childComponents = this._childComponents = null;
				}
			} else {
				this._bindings = bindings;
				this._childComponents = childComponents!;

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

			if (backBindings) {
				for (let i = backBindings.length; i; ) {
					let backBinding = backBindings[--i];
					backBinding[0].on('change:' + backBinding[1], backBinding[2]);
				}
			}

			this.isReady = true;
		}
	}

	_detach() {
		this._attached = false;
		this._freezeBindings();
	}
}

RnSlot[KEY_IS_SLOT] = true;
