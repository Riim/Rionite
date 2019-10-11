import { moveContent } from '@riim/move-content';
import { getUID } from '@riim/uid';
import { TListener } from 'cellx';
import { attachChildComponentElements } from '../attachChildComponentElements';
import { BaseComponent, IComponentElement } from '../BaseComponent';
import { bindContent } from '../bindContent';
import { IBinding } from '../componentBinding';
import { Component } from '../decorators/Component';
import { resumeConnectionStatusCallbacks, suppressConnectionStatusCallbacks } from '../ElementProtoMixin';
import { cloneNode } from '../lib/cloneNode';
import { KEY_CONTENT_TEMPLATE } from '../Template';

const KEY_SLOTS_CONTENT = Symbol('slotsContent');

@Component({
	elementIs: 'RnSlot',

	params: {
		name: {
			type: String,
			readonly: true
		},
		forTag: {
			type: String,
			readonly: true
		},
		for: {
			property: 'paramFor',
			type: String,
			readonly: true
		},
		cloneContent: {
			default: false,
			readonly: true
		},
		getContext: {
			type: Object,
			readonly: true
		}
	}
})
export class RnSlot extends BaseComponent {
	static get bindsInputContent() {
		return true;
	}

	$context: Record<string, any>;

	name: string;
	forTag: string;
	paramFor: string;
	cloneContent: boolean;
	getContext: (
		this: BaseComponent,
		context: Record<string, any>,
		slot: RnSlot
	) => Record<string, any>;

	_childComponents: Array<BaseComponent> | null;

	_attach() {
		this._attached = true;

		if (this.isReady) {
			this._unfreezeBindings();

			if (this._childComponents) {
				attachChildComponentElements(this._childComponents);
			}

			return;
		}

		let ownerComponent = this.ownerComponent;
		let contentOwnerComponent = ownerComponent.ownerComponent;
		let ownerComponentInputContent = ownerComponent.$inputContent;
		let el = this.element;
		let cloneContent = this.cloneContent;
		let content: DocumentFragment | undefined;
		let childComponents: Array<BaseComponent> | null | undefined;
		let bindings: Array<IBinding> | null | undefined;
		let backBindings: Array<BaseComponent | string | TListener> | null | undefined;

		if (ownerComponentInputContent || !cloneContent) {
			let name: string | null = this.name;
			let forTag: string | null | undefined;
			let for_: string | null | undefined;

			if (!name) {
				forTag = this.forTag;

				if (forTag) {
					forTag = forTag.toUpperCase();
				} else {
					for_ = this.paramFor;
				}
			}

			let key =
				getUID(ownerComponent) +
				'/' +
				(name ? 'slot:' + name : forTag ? 'tag:' + forTag : for_ || '');

			if (name || forTag || for_) {
				let slotsContent: Map<string, IComponentElement> | undefined;

				if (
					!cloneContent &&
					(slotsContent = contentOwnerComponent[KEY_SLOTS_CONTENT]) &&
					slotsContent.has(key)
				) {
					let container = slotsContent.get(key)!;

					if (container.firstChild) {
						content = moveContent(document.createDocumentFragment(), container);
						slotsContent.set(key, el);

						childComponents = (container.$component as RnSlot)._childComponents;
						bindings = container.$component!._bindings;
					}
				} else if (ownerComponentInputContent) {
					if (for_ && for_.indexOf('__') == -1) {
						let elementBlockNames = (ownerComponent.constructor as typeof BaseComponent)
							._elementBlockNames;
						for_ = elementBlockNames[elementBlockNames.length - 1] + '__' + for_;
					}

					let selectedElements = ownerComponentInputContent.querySelectorAll(
						for_ ? '.' + for_ : forTag || `[slot=${name}]`
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
							slotsContent ||
							contentOwnerComponent[KEY_SLOTS_CONTENT] ||
							(contentOwnerComponent[KEY_SLOTS_CONTENT] = new Map())
						).set(key, el);
					}
				}
			} else if (cloneContent) {
				content = cloneNode(ownerComponentInputContent!);
			} else {
				let slotsContent: Map<string, IComponentElement> | undefined =
					contentOwnerComponent[KEY_SLOTS_CONTENT];

				if (slotsContent && slotsContent.has(key)) {
					let container = slotsContent.get(key)!;

					content = moveContent(document.createDocumentFragment(), container);
					slotsContent.set(key, el);

					childComponents = (container.$component as RnSlot)._childComponents;
					bindings = container.$component!._bindings;
				} else if (ownerComponentInputContent) {
					content = ownerComponentInputContent;
					(slotsContent || (contentOwnerComponent[KEY_SLOTS_CONTENT] = new Map())).set(
						key,
						el
					);
				}
			}
		}

		if (bindings === undefined) {
			if (content || this.element[KEY_CONTENT_TEMPLATE]) {
				let contentBindingResult: [
					Array<BaseComponent> | null,
					Array<IBinding> | null,
					Array<BaseComponent | string | TListener> | null
				] = [null, null, null];

				if (content) {
					bindContent(
						content,
						contentOwnerComponent,
						this.getContext
							? this.getContext.call(ownerComponent, ownerComponent.$context, this)
							: ownerComponent.$context,
						contentBindingResult
					);
				} else {
					content = this.element[KEY_CONTENT_TEMPLATE]!.render(
						null,
						ownerComponent,
						this.getContext
							? this.getContext.call(ownerComponent, this.$context, this)
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
