import { Cell, Utils } from 'cellx';
import Component from '../Component';
import compileKeypath from '../compileKeypath';
import bind from '../bind';
import attachChildComponentElements from '../attachChildComponentElements';
import keypathPattern from '../keypathPattern';
import { nativeCustomElements as nativeCustomElementsFeature } from '../Features';

let nextTick = Utils.nextTick;

let slice = Array.prototype.slice;

let reKeypath = RegExp(`^${ keypathPattern }$`);

export default Component.extend('rt-if-then', {
	Static: {
		elementExtends: 'template',

		props: {
			if: { type: String, required: true, readonly: true }
		}
	},

	_if: null,

	_elseMode: false,

	_nodes: null,

	_attachElement() {
		if (!this.initialized) {
			let props = this.props;

			props.content = document.importNode(this.element.content, true);

			let if_ = (props.if || '').trim();

			if (!reKeypath.test(if_)) {
				throw new SyntaxError(`Invalid value of attribute "if" (${ if_ })`);
			}

			let getIfValue = compileKeypath(if_);

			this._if = new Cell(function() {
				return !!getIfValue.call(this);
			}, { owner: props.context });

			this.initialized = true;
		}

		this._if.on('change', this._onIfChange, this);

		this._render(false);
	},

	_detachElement() {
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
	},

	_onIfChange() {
		if (this.element.parentNode) {
			this._render(true);
		}
	},

	_render(changed) {
		if (this._elseMode ? !this._if.get() : this._if.get()) {
			let content = this.props.content.cloneNode(true);

			let { bindings, childComponents } = bind(content, this.ownerComponent, this.props.context);

			this._nodes = slice.call(content.childNodes);
			this._bindings = bindings;

			this.element.parentNode.insertBefore(content, this.element.nextSibling);

			if (!nativeCustomElementsFeature && childComponents) {
				attachChildComponentElements(childComponents);
			}
		} else {
			this._destroyBindings();

			let nodes = this._nodes;

			if (nodes) {
				for (let i = nodes.length; i;) {
					let node = nodes[--i];
					node.parentNode.removeChild(node);
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
});
