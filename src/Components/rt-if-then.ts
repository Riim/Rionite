import { Cell, Utils } from 'cellx';
import Component from '../Component';
import KEY_ELEMENT_CONNECTED from '../KEY_ELEMENT_CONNECTED';
import compileKeypath from '../compileKeypath';
import bindContent from '../bindContent';
import attachChildComponentElements from '../attachChildComponentElements';
import keypathPattern from '../keypathPattern';
import { nativeCustomElements as nativeCustomElementsFeature } from '../Features';
import d from '../d';

let nextTick = Utils.nextTick;

let slice = Array.prototype.slice;

export type TRtIfThenIfCell = Cell<boolean>;

let reKeypath = RegExp(`^${ keypathPattern }$`);

@d.Component({
	elementIs: 'rt-if-then',
	elementExtends: 'template',

	props: {
		if: { type: String, required: true, readonly: true }
	}
})
export default class RtIfThen extends Component {
	_elseMode = false;

	_if: TRtIfThenIfCell;

	_nodes: Array<Node> | null;

	_destroyed = false;

	elementConnected() {
		if (this._destroyed) {
			throw new TypeError('Instance of RtIfThen was destroyed and can no longer be used');
		}

		if (!this.initialized) {
			let props = this.props;

			props.content = document.importNode((this.element as any).content, true) as DocumentFragment;

			let if_ = (props['if'] || '').trim();

			if (!reKeypath.test(if_)) {
				throw new SyntaxError(`Invalid value of attribute "if" (${ if_ })`);
			}

			let getIfValue = compileKeypath(if_);

			this._if = new Cell<boolean>(function() {
				return !!getIfValue.call(this);
			}, { owner: props.context as Object });

			this._if.on('change', this._onIfChange, this);

			this._render(false);

			this.initialized = true;
		}
	}

	elementDisconnected() {
		nextTick(() => {
			if (!this.element[KEY_ELEMENT_CONNECTED]) {
				this._destroy();
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
			let content = (this.props.content as DocumentFragment).cloneNode(true);

			let { bindings, childComponents } = bindContent(
				content,
				(this.ownerComponent as Component),
				this.props.context as Object
			);

			this._nodes = slice.call(content.childNodes);
			this._bindings = bindings;

			(this.element.parentNode as Node).insertBefore(content, this.element.nextSibling);

			if (!nativeCustomElementsFeature && childComponents) {
				attachChildComponentElements(childComponents);
			}
		} else {
			this._destroyBindings();

			let nodes = this._nodes;

			if (nodes) {
				for (let i = nodes.length; i;) {
					let node = nodes[--i];
					(node.parentNode as Node).removeChild(node);
				}

				this._nodes = null;
			}
		}

		if (changed) {
			nextTick(() => {
				this.emit('change');
			});
		}
	}

	_destroy() {
		if (this._destroyed) {
			return;
		}

		this._destroyed = true;

		this._destroyBindings();
		this._if.off('change', this._onIfChange, this);

		let nodes = this._nodes;

		if (nodes) {
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
