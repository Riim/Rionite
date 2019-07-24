import { nextTick } from '@riim/next-tick';
import { Cell, TListener } from 'cellx';
import { moveContent } from '../../node_modules/@riim/move-content';
import { attachChildComponentElements } from '../attachChildComponentElements';
import { BaseComponent } from '../BaseComponent';
import { compileBinding } from '../compileBinding';
import { IBinding } from '../componentBinding';
import { Component } from '../decorators/Component';
import { KEY_ELEMENT_CONNECTED, resumeConnectionStatusCallbacks, suppressConnectionStatusCallbacks } from '../ElementProtoMixin';
import { getTemplateNodeValueAST } from '../getTemplateNodeValueAST';
import { compileKeypath } from '../lib/compileKeypath';
import { keypathPattern } from '../lib/keypathPattern';
import { removeNodes } from '../lib/removeNodes';
import { KEY_CONTENT_TEMPLATE } from '../Template';
import { RnRepeat } from './RnRepeat';

const slice = Array.prototype.slice;

const reKeypath = RegExp(`^${keypathPattern}$`);

@Component({
	elementIs: 'RnIfThen',
	elementExtends: 'template',

	params: {
		if: {
			property: 'paramIf',
			type: String,
			required: true,
			readonly: true
		},
		withUndefined: {
			type: Boolean,
			readonly: true
		}
	}
})
export class RnIfThen extends BaseComponent {
	static get bindsInputContent() {
		return true;
	}

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

		if (!this.initialized) {
			let if_ = this.paramIf.trim();
			let getIfValue: (this: object) => any;

			if (reKeypath.test(if_)) {
				getIfValue = compileKeypath(if_);
			} else {
				let ifAST = getTemplateNodeValueAST(`{${if_}}`);

				if (!ifAST || ifAST.length != 1) {
					throw new SyntaxError(`Invalid value in parameter "if" (${if_})`);
				}

				getIfValue = compileBinding(ifAST, if_);
			}

			this._if = new Cell<boolean>(
				function() {
					return !!getIfValue.call(this);
				},
				{ context: this.$context }
			);

			this.initialized = true;
		}

		if (this.element[KEY_CONTENT_TEMPLATE]) {
			this._if.on('change', this._onIfChange, this);
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

	_attach() {
		this._attached = true;
	}
	_detach() {
		this._attached = false;
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
				this.$context!,
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
			this.emit('change');
		}
	}

	_deactivate() {
		if (!this._active) {
			return;
		}

		this._active = false;

		this._if.off('change', this._onIfChange, this);

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
