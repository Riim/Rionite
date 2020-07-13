import { nextTick } from '@riim/next-tick';
import { Cell, TListener } from 'cellx';
import { moveContent } from '../../node_modules/@riim/move-content';
import { BaseComponent } from '../BaseComponent';
import { compileBinding } from '../compileBinding';
import { IBinding } from '../componentBinding';
import { connectChildComponentElements } from '../connectChildComponentElements';
import { Component } from '../decorators/Component';
import { KEY_ELEMENT_CONNECTED, resumeConnectionStatusCallbacks, suppressConnectionStatusCallbacks } from '../ElementProtoMixin';
import { compileKeypath } from '../lib/compileKeypath';
import { keypathPattern } from '../lib/keypathPattern';
import { removeNodes } from '../lib/removeNodes';
import { parseTemplateNodeValue } from '../parseTemplateNodeValue';
import { KEY_CONTENT_TEMPLATE } from '../Template2';
import { RnRepeat } from './RnRepeat';

const slice = Array.prototype.slice;

const reKeypath = RegExp(`^${keypathPattern}$`);

@Component({
	elementIs: 'RnIfThen',
	elementExtends: 'template',

	params: {
		if: { property: 'paramIf', type: String, required: true, readonly: true },
		withUndefined: { type: Boolean, readonly: true }
	}
})
export class RnIfThen extends BaseComponent {
	static EVENT_CHANGE = Symbol('change');

	static get bindsInputContent() {
		return true;
	}

	$context: Record<string, any>;

	paramIf: string;
	withUndefined: boolean;

	_elseMode = false;

	_if: Cell<boolean | undefined>;

	_nodes: Array<Node> | null = null;
	_childComponents: Array<BaseComponent> | null = null;

	_active = false;

	elementConnected() {
		if (this._active) {
			return;
		}

		this._active = true;

		if (!this._initialized) {
			let if_ = this.paramIf.trim();
			let getIfValue: (this: object) => any;

			if (reKeypath.test(if_)) {
				getIfValue = compileKeypath(if_);
			} else {
				let ifAST = parseTemplateNodeValue(`{${if_}}`);

				if (!ifAST || ifAST.length != 1) {
					throw SyntaxError(`Invalid value in parameter "if" (${if_})`);
				}

				getIfValue = compileBinding(ifAST, if_);
			}

			this._if = new Cell<boolean>(
				function () {
					return !!getIfValue.call(this);
				},
				{ context: this.$context }
			);

			this._initialized = true;
		}

		if (this.element[KEY_CONTENT_TEMPLATE]) {
			this._if.onChange(this._onIfChange, this);
			this._render(false);
		}
	}

	elementDisconnected() {
		nextTick(() => {
			if (!this.element[KEY_ELEMENT_CONNECTED]) {
				this._deactivate();
			}
		});
	}

	_onIfChange() {
		if (this.element.parentNode) {
			this._render(true);
		}
	}

	_connect() {
		this._isConnected = true;
		return null;
	}
	_disconnect() {
		this._isConnected = false;
	}

	_render(changed: boolean) {
		if (
			this._elseMode
				? !this._if.get() && (this._if.get() !== undefined || this.withUndefined)
				: this._if.get()
		) {
			let contentBindingResult: [
				Array<BaseComponent> | null,
				Array<IBinding> | null,
				Array<BaseComponent | string | TListener> | null
			] = [null, null, null];
			let content = this.element[KEY_CONTENT_TEMPLATE]!.render(
				null,
				this.ownerComponent,
				this.$context,
				contentBindingResult
			);
			let childComponents = contentBindingResult[0];
			let backBindings = contentBindingResult[2];

			this._nodes = slice.call(content.childNodes);
			this._childComponents = childComponents;
			this._bindings = contentBindingResult[1];

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

			suppressConnectionStatusCallbacks();
			this.element.parentNode!.insertBefore(content, this.element);
			resumeConnectionStatusCallbacks();

			if (childComponents) {
				connectChildComponentElements(childComponents);
			}

			if (backBindings) {
				for (let i = backBindings.length; i; i -= 3) {
					(backBindings[i - 3] as BaseComponent).on(
						'change:' + backBindings[i - 2],
						backBindings[i - 1] as TListener
					);
				}
			}
		} else {
			let nodes = this._nodes;

			if (nodes) {
				removeNodes(nodes);
				this._destroyBindings();
				this._nodes = null;

				this._deactivateChildComponents();
			}
		}

		if (changed) {
			Cell.release();
			this.emit(RnIfThen.EVENT_CHANGE);
		}
	}

	_deactivate() {
		if (!this._active) {
			return;
		}

		this._active = false;

		this._if.offChange(this._onIfChange, this);

		let nodes = this._nodes;

		if (nodes) {
			removeNodes(nodes);
			this._destroyBindings();
			this._nodes = null;

			this._deactivateChildComponents();
		}
	}

	_deactivateChildComponents() {
		let childComponents = this._childComponents;

		if (childComponents) {
			for (let i = childComponents.length; i; ) {
				let childComponent = childComponents[--i];

				if (childComponent instanceof RnIfThen || childComponent instanceof RnRepeat) {
					childComponent._deactivate();
				}
			}
		}

		this._childComponents = null;
	}
}
