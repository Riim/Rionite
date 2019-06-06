import { getUID } from '@riim/get-uid';
import { moveContent } from '@riim/move-content';
import { TListener } from 'cellx';
import { attachChildComponentElements } from '../attachChildComponentElements';
import { BaseComponent, IComponentElement } from '../BaseComponent';
import { bindContent } from '../bindContent';
import { IFreezableCell } from '../componentBinding';
import { Component } from '../decorators/Component';
import { resumeConnectionStatusCallbacks, suppressConnectionStatusCallbacks } from '../ElementProtoMixin';
import { cloneNode } from '../lib/cloneNode';
import { Template } from '../Template';

const KEY_SLOT_CONTENT_MAP = Symbol('Rionite/RnSlot[slotContentMap]');

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

	$context: Record<string, any>;

	paramName: string;
	paramForTag: string;
	paramFor: string;
	paramCloneContent: boolean;
	paramGetContext: (
		this: BaseComponent,
		context: Record<string, any>,
		slot: RnSlot
	) => Record<string, any>;

	_childComponents: Array<BaseComponent> | null;

	_attach() {
		this._attached = true;

		if (this.isReady) {
			this._unfreezeBindings();
			return;
		}

		let ownerComponent = this.ownerComponent;
		let contentOwnerComponent = ownerComponent.ownerComponent;
		let ownerComponentInputContent = ownerComponent.$inputContent;
		let el = this.element;
		let cloneContent = this.paramCloneContent;
		let content: DocumentFragment | undefined;
		let childComponents: Array<BaseComponent> | null | undefined;
		let bindings: Array<IFreezableCell> | null | undefined;
		let backBindings: Array<BaseComponent | string | TListener> | null | undefined;

		if (ownerComponentInputContent || !cloneContent) {
			let slotName: string | null = this.paramName;
			let forTag: string | null | undefined;
			let for$: string | null | undefined;

			if (!slotName) {
				forTag = this.paramForTag;

				if (forTag) {
					forTag = forTag.toUpperCase();
				} else {
					for$ = this.paramFor;
				}
			}

			let key =
				getUID(ownerComponent) +
				'/' +
				(slotName ? 'slot:' + slotName : forTag ? 'tag:' + forTag : for$ || '');

			if (slotName || forTag || for$) {
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

						childComponents = (container.$component as RnSlot)._childComponents;
						bindings = container.$component!._bindings;
					}
				} else if (ownerComponentInputContent) {
					if (for$ && for$.indexOf('__') == -1) {
						let elementBlockNames = (ownerComponent.constructor as typeof BaseComponent)
							._elementBlockNames;
						for$ = elementBlockNames[elementBlockNames.length - 1] + '__' + for$;
					}

					let selectedElements = ownerComponentInputContent.querySelectorAll(
						for$ ? '.' + for$ : forTag || `[slot=${slotName}]`
					);
					let selectedElementCount = selectedElements.length;

					if (selectedElementCount) {
						content = document.createDocumentFragment();

						for (let i = 0; i < selectedElementCount; i++) {
							content.appendChild(
								cloneContent ? cloneNode(selectedElements[i]) : selectedElements[i]
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
			} else if (cloneContent) {
				content = cloneNode(ownerComponentInputContent!);
			} else {
				let contentMap: Map<string, IComponentElement> | undefined =
					contentOwnerComponent[KEY_SLOT_CONTENT_MAP];

				if (contentMap && contentMap.has(key)) {
					let container = contentMap.get(key)!;

					content = moveContent(document.createDocumentFragment(), container);
					contentMap.set(key, el);

					childComponents = (container.$component as RnSlot)._childComponents;
					bindings = container.$component!._bindings;
				} else if (ownerComponentInputContent) {
					content = ownerComponentInputContent;
					(contentMap || (contentOwnerComponent[KEY_SLOT_CONTENT_MAP] = new Map())).set(
						key,
						el
					);
				}
			}
		}

		if (bindings === undefined) {
			if (content || this.element.contentTemplate) {
				let contentBindingResult: [
					Array<BaseComponent> | null,
					Array<IFreezableCell> | null,
					Array<BaseComponent | string | TListener> | null
				] = [null, null, null];

				if (content) {
					bindContent(
						content,
						contentOwnerComponent,
						this.paramGetContext
							? this.paramGetContext.call(
									ownerComponent,
									ownerComponent.$context,
									this
							  )
							: ownerComponent.$context,
						contentBindingResult
					);
				} else {
					content = (this.element.contentTemplate as Template).render(
						null,
						ownerComponent,
						this.paramGetContext
							? this.paramGetContext.call(ownerComponent, this.$context, this)
							: this.$context,
						contentBindingResult
					);
				}

				childComponents = this._childComponents = contentBindingResult[0];
				this._bindings = contentBindingResult[1];
				backBindings = contentBindingResult[2];

				if (childComponents) {
					for (let i = childComponents.length; i; ) {
						let childComponent = childComponents[--i];

						if (
							childComponent.element.firstChild &&
							(childComponent.constructor as typeof BaseComponent).bindsInputContent
						) {
							childComponent.$inputContent = moveContent(
								document.createDocumentFragment(),
								childComponent.element
							);
						}
					}
				}
			} else {
				this._childComponents = null;
				this._bindings = null;
			}
		} else {
			this._childComponents = childComponents as any;
			this._bindings = bindings;
			this._unfreezeBindings();
		}

		if (content) {
			suppressConnectionStatusCallbacks();
			el.appendChild(content);
			resumeConnectionStatusCallbacks();
		}

		if (childComponents) {
			attachChildComponentElements(childComponents);
		}

		if (backBindings) {
			for (let i = backBindings.length; i; i -= 3) {
				(backBindings[i - 3] as BaseComponent).on(
					'change:' + backBindings[i - 2],
					backBindings[i - 1] as TListener
				);
			}
		}

		this.isReady = true;
	}

	_detach() {
		this._attached = false;
		this._freezeBindings();
	}
}
