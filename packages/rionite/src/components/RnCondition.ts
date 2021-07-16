import { moveContent } from '@riim/move-content';
import { nextTick } from '@riim/next-tick';
import { Cell, TListener } from 'cellx';
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

const reKeypath = RegExp(`^${keypathPattern}$`);

@Component({
	elementIs: 'RnCondition',
	elementExtends: 'template',

	params: {
		if: { property: 'paramIf', type: String, readonly: true },
		unless: { property: 'paramUnless', type: String, readonly: true },
		trueWhenPending: { type: Boolean, readonly: true }
	}
})
export class RnCondition extends BaseComponent {
	static override EVENT_CHANGE = Symbol('change');

	static override get bindsInputContent() {
		return true;
	}

	override $context: Record<string, any>;

	paramIf: string;
	paramUnless: string;
	trueWhenPending: boolean;

	_unless: boolean;

	_conditionCell: Cell<boolean | undefined>;

	_nodes: Array<Node> | null = null;
	_childComponents: Array<BaseComponent> | null = null;

	_active = false;

	override elementConnected() {
		if (this._active) {
			return;
		}

		this._active = true;

		if (!this._initialized) {
			let condition = this.paramIf;

			if (condition) {
				condition = condition.trim();
				this._unless = false;
			} else {
				condition = this.paramUnless;

				if (condition) {
					condition = condition.trim();
					this._unless = true;
				} else {
					throw TypeError('Parameter "if" is required');
				}
			}

			let getConditionResult: (this: object) => any;

			if (reKeypath.test(condition)) {
				getConditionResult = compileKeypath(condition);
			} else {
				let conditionAST = parseTemplateNodeValue(`{${condition}}`);

				if (!conditionAST || conditionAST.length != 1) {
					throw SyntaxError(
						`Invalid value in parameter "${
							(this.paramIf || '').trim() ? 'if' : 'unless'
						}" (${condition})`
					);
				}

				getConditionResult = compileBinding(conditionAST, condition);
			}

			this._conditionCell = new Cell<boolean>(() => !!getConditionResult.call(this.$context));

			this._initialized = true;
		}

		if (this.element[KEY_CONTENT_TEMPLATE]) {
			this._conditionCell.onChange(this._onConditionChange, this);
			this._render(false);
		}
	}

	override elementDisconnected() {
		nextTick(() => {
			if (!this.element[KEY_ELEMENT_CONNECTED]) {
				this._deactivate();
			}
		});
	}

	_onConditionChange() {
		if (this.element.parentNode) {
			this._render(true);
		}
	}

	override _connect() {
		this._isConnected = true;
		return null;
	}
	override _disconnect() {
		this._isConnected = false;
	}

	_render(changed: boolean) {
		let conditionResult = this._conditionCell.get();

		if (
			this._unless
				? !conditionResult && (conditionResult !== undefined || this.trueWhenPending)
				: conditionResult
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

			this._nodes = Array.prototype.slice.call(content.childNodes);
			this._childComponents = childComponents;
			this._bindings = contentBindingResult[1];

			if (childComponents) {
				for (let i = childComponents.length; i != 0; ) {
					let childComponent = childComponents[--i];

					if (
						childComponent.element.firstChild &&
						childComponent.constructor.bindsInputContent
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
				for (let i = backBindings.length; i != 0; i -= 3) {
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
			this.emit(RnCondition.EVENT_CHANGE);
		}
	}

	_deactivate() {
		if (!this._active) {
			return;
		}

		this._active = false;

		this._conditionCell.offChange(this._onConditionChange, this);

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
			for (let i = childComponents.length; i != 0; ) {
				let childComponent = childComponents[--i];

				if (childComponent instanceof RnCondition || childComponent instanceof RnRepeat) {
					childComponent._deactivate();
				}
			}
		}

		this._childComponents = null;
	}
}
