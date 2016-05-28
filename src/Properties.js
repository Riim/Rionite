let { utils: { createClass, defineObservableProperty } } = require('cellx');

let createObject = Object.create;

/**
 * @typesign new Properties(component: Rista.Component) -> Rista.Properties;
 */
let Properties = createClass({
	constructor: function Properties(component) {
		return defineObservableProperty(
			createObject(component.elementAttributes),
			'contentSourceElement',
			component.element.childNodes
		);
	}
});

module.exports = Properties;
