let { Cell } = require('cellx');
let Component = require('../Component');
let morphComponentElement = require('../morphComponentElement');

let RtContent = module.exports = Component.extend('rt-content', {
	Static: {
		elementAttributes: {
			select: String
		}
	},

	renderInner() {
		return '';
	},

	initialize() {
		let component = this;

		for (let contentComponentCounter = 1; ;) {
			component = component.parent;
			contentComponentCounter += component instanceof RtContent ? 1 : -1;

			if (!contentComponentCounter) {
				break;
			}
		}

		let parentContentSourceElement = component.props.contentSourceElement;

		this._contentSourceElement = new Cell(function() {
			let parentContentSourceElementCopy = parentContentSourceElement.cloneNode(true);
			let selector = this.elementAttributes.select;
			let el = document.createElement('div');

			if (selector) {
				let selectedEls = parentContentSourceElementCopy.querySelectorAll(selector);

				for (let i = 0, l = selectedEls.length; i < l; i++) {
					el.appendChild(selectedEls[i]);
				}
			} else {
				for (let child; child = parentContentSourceElementCopy.firstChild;) {
					el.appendChild(child);
				}
			}

			return el;
		}, {
			owner: this
		});
	},

	elementAttached() {
		this.listenTo(this._contentSourceElement, 'change', this.update);
		this.update();
	},

	/**
	 * @override
	 */
	update() {
		morphComponentElement(this, this._contentSourceElement.get());
	}
});
