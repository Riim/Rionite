import { Cell, Utils } from 'cellx';
import ContentNodeType from '../ContentNodeType';
import ContentParser from '../ContentParser';
import compileBinding from '../compileBinding';
import bind from '../bind';
import attachChildComponentElements from '../attachChildComponentElements';
import Component from '../Component';
import { slice } from '../JS/Array';

let nextTick = Utils.nextTick;

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

			let parsedIf = (new ContentParser(`{${ props.if }}`)).parse();

			if (parsedIf.length > 1 || parsedIf[0].type != ContentNodeType.BINDING) {
				throw new SyntaxError(`Invalid value of attribute "if" (${ props.if })`);
			}

			let getIfValue = compileBinding(parsedIf[0]);

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

			if (childComponents) {
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
