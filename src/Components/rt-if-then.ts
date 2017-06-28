import { Cell, Utils } from 'cellx';
import Component from '../Component';
import KEY_ELEMENT_CONNECTED from '../KEY_ELEMENT_CONNECTED';
import { suppressConnectionStatusCallbacks, resumeConnectionStatusCallbacks } from '../ElementProtoMixin';
import compileKeypath from '../compileKeypath';
import bindContent from '../bindContent';
import attachChildComponentElements from '../attachChildComponentElements';
import keypathPattern from '../keypathPattern';
import { templateTag as templateTagFeature } from '../Features';
import d from '../d';

let nextTick = Utils.nextTick;

let slice = Array.prototype.slice;

export type TIfCell = Cell<boolean>;

let reKeypath = RegExp(`^${ keypathPattern }$`);

@d.Component({
	elementIs: 'rt-if-then',
	elementExtends: 'template',

	input: {
		if: { type: String, required: true, readonly: true }
	}
})
export default class RtIfThen extends Component {
	ownerComponent: Component;

	_elseMode = false;

	_if: TIfCell;

	_nodes: Array<Node> | null;

	_active = false;

	elementConnected() {
		if (this._active) {
			return;
		}

		this._active = true;

		if (!this.initialized) {
			let if_ = (this.input['if'] || '').trim();

			if (!reKeypath.test(if_)) {
				throw new SyntaxError(`Invalid value of attribute "if" (${ if_ })`);
			}

			let getIfValue = compileKeypath(if_);
			this._if = new Cell<boolean>(function() {
				return !!getIfValue.call(this);
			}, { owner: this.input.$context as Object });

			this.initialized = true;
		}

		this._if.on('change', this._onIfChange, this);

		this._render(false);
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
		if (this._elseMode ? !this._if.get() : this._if.get()) {
			let content = document.importNode((this.element as any as HTMLTemplateElement).content, true);
			if (!templateTagFeature) {
				let templates = content.querySelectorAll('template');

				for (let i = 0, l = templates.length; i < l;) {
					i += templates[i].content.querySelectorAll('template').length + 1;
				}
			}
			let [bindings, childComponents] = bindContent(
				content,
				this.ownerComponent,
				this.input.$context as Object,
				{ 0: null, 1: null } as any
			);

			this._nodes = slice.call(content.childNodes);
			this._bindings = bindings;

			suppressConnectionStatusCallbacks();
			(this.element.parentNode as Node).insertBefore(content, this.element.nextSibling);
			resumeConnectionStatusCallbacks();

			if (childComponents) {
				attachChildComponentElements(childComponents);
			}
		} else {
			let nodes = this._nodes;

			if (nodes) {
				this._destroyBindings();

				for (let i = nodes.length; i;) {
					let node = nodes[--i];
					let parentNode = node.parentNode;

					if (parentNode) {
						parentNode.removeChild(node);
					}
				}

				this._nodes = null;
			}
		}

		if (changed) {
			Cell.afterRelease(() => {
				this.emit('change');
			});
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
			this._destroyBindings();

			for (let i = nodes.length; i;) {
				let node = nodes[--i];
				let parentNode = node.parentNode;

				if (parentNode) {
					parentNode.removeChild(node);
				}
			}
		}
	}
}
