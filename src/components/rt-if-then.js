let { Cell } = require('cellx');
let ContentNodeType = require('../ContentNodeType');
let parseContent = require('../parseContent');
let compileBinding = require('../compileBinding');
let bind = require('../bind');
let Component = require('../Component');

let slice = Array.prototype.slice;

module.exports = Component.extend('rt-if-then', {
	Static: {
		elementExtends: 'template',

		elementAttributes: {
			if: String
		}
	},

	_if: null,

	_elseMode: false,

	_nodes: null,

	_onElementAttachedChange(evt) {
		if (evt.value) {
			if (!this.initialized) {
				let props = this.props;

				props.content = document.importNode(this.element.content, true);

				let parsedIf = parseContent(`{${ props.if }}`);

				if (parsedIf.length > 1 || parsedIf[0].type != ContentNodeType.BINDING) {
					throw new SyntaxError('Invalid value of attribute "if"');
				}

				let getState = compileBinding(parsedIf[0]);

				this._if = new Cell(
					this._elseMode ?
						function() { return !getState.call(this); } :
						function() { return !!getState.call(this); },
					{ owner: props.context }
				);

				this.initialized = true;
			}

			this._render();

			this._if.on('change', this._onIfChange, this);
		} else {
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
	},

	_onIfChange() {
		this._render();
	},

	_render() {
		if (this._if.get()) {
			let content = this.props.content.cloneNode(true);

			this._nodes = slice.call(content.childNodes);

			this._bindings = bind(content, this.ownerComponent, this.props.context);
			this.element.parentNode.insertBefore(content, this.element.nextSibling);
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

		this.emit('change');
	}
});
