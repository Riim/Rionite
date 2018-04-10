import { nextTick } from '@riim/next-tick';
import { Cell } from 'cellx';
import { attachChildComponentElements } from '../attachChildComponentElements';
import { BaseComponent } from '../BaseComponent';
import { bindContent } from '../bindContent';
import { Component } from '../decorators/Component';
import { resumeConnectionStatusCallbacks, suppressConnectionStatusCallbacks } from '../ElementProtoMixin';
import { KEY_IS_ELEMENT_CONNECTED } from '../ElementProtoMixin';
import { compileKeypath } from '../lib/compileKeypath';
import { templateTag as templateTagFeature } from '../lib/Features';
import { keypathPattern } from '../lib/keypathPattern';
import { removeNodes } from '../lib/removeNodes';
import { RtRepeat } from './RtRepeat2';

const slice = Array.prototype.slice;

export type TIfCell = Cell<boolean>;

const reKeypath = RegExp(`^${keypathPattern}$`);

@Component({
	elementExtends: 'template',

	params: {
		if: { property: 'paramIf', type: String, required: true, readonly: true }
	}
})
export class RtIfThen extends BaseComponent {
	paramIf: string;

	_elseMode = false;

	_if: TIfCell;

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

			if (!reKeypath.test(if_)) {
				throw new SyntaxError(`Invalid value of attribute "if" (${if_})`);
			}

			let getIfValue = compileKeypath(if_);
			this._if = new Cell<boolean>(
				function() {
					return !!getIfValue.call(this);
				},
				{ context: this.$context }
			);

			this.initialized = true;
		}

		this._if.on('change', this._onIfChange, this);

		this._render(false);
	}

	elementDisconnected() {
		nextTick(() => {
			if (!this.element[KEY_IS_ELEMENT_CONNECTED]) {
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
		if (this._elseMode ? !this._if.get() : this._if.get()) {
			let content = document.importNode(
				((this.element as any) as HTMLTemplateElement).content,
				true
			);
			if (!templateTagFeature) {
				let templates = content.querySelectorAll('template');

				for (let i = 0, l = templates.length; i < l; ) {
					i += templates[i].content.querySelectorAll('template').length + 1;
				}
			}
			let [bindings, backBindings, childComponents] = bindContent(
				content,
				this.ownerComponent,
				this.$context!,
				{ 0: null, 1: null, 2: null } as any
			);

			this._nodes = slice.call(content.childNodes);
			this._bindings = bindings;
			this._childComponents = childComponents;

			suppressConnectionStatusCallbacks();
			this.element.parentNode!.insertBefore(content, this.element);
			resumeConnectionStatusCallbacks();

			if (childComponents) {
				attachChildComponentElements(childComponents);
			}

			if (backBindings) {
				for (let i = backBindings.length; i; ) {
					let backBinding = backBindings[--i];
					backBinding[0].on('change:' + backBinding[1], backBinding[2]);
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
			Cell.forceRelease();
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

				if (childComponent instanceof RtIfThen || childComponent instanceof RtRepeat) {
					childComponent._deactivate();
				}
			}
		}

		this._childComponents = null;
	}
}
