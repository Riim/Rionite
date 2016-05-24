let { Cell, utils: { createClass } } = require('cellx');

let createObject = Object.create;

let Properties = createClass({
	constructor: function Properties(component) {
		let contentSourceElement = new Cell(component.element.childNodes, {
			merge(el) {
				if (typeof el == 'string') {
					let html = el;

					el = document.createElement('div');
					el.innerHTML = html;

					return el;
				}

				return el;
			}
		});

		return createObject(component.elementAttributes, {
			contentSourceElement: {
				configurable: true,
				enumerable: true,

				get() {
					return contentSourceElement.get();
				},

				set(el) {
					contentSourceElement.set(el);
				}
			}
		});
	}
});

module.exports = Properties;
