let { utils: { mixin } } = require('cellx');
let ElementProtoMixin = require('./ElementProtoMixin');

let createObject = Object.create;
let getPrototypeOf = Object.getPrototypeOf;
let hasOwn = Object.prototype.hasOwnProperty;

let inheritedStaticProperties = ['template', 'elementAttributes', 'assets'];

function registerComponent(componentClass) {
	let elementTagName = componentClass.elementTagName;

	if (!elementTagName) {
		throw new TypeError('"elementTagName" is required');
	}

	let parent;

	// Babel, в отличии от typescript-а и Component.extend-а, не копирует статические свойства при наследовании,
	// а так как парочка нам очень нужны, копируем их сами.
	inheritedStaticProperties.forEach(name => {
		if (
			!hasOwn.call(componentClass, name) &&
				hasOwn.call(parent || (parent = getPrototypeOf(componentClass.prototype).constructor), name)
		) {
			componentClass[name] = parent[name];
		}
	});

	let elementProto = createObject(HTMLElement.prototype);

	mixin(elementProto, ElementProtoMixin);
	elementProto._ristaComponentConstr = componentClass;

	document.registerElement(elementTagName, { prototype: elementProto });

	return componentClass;
}

module.exports = registerComponent;
