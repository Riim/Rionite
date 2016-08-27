import { Utils } from 'cellx';
import elementConstructorMap from './elementConstructorMap';
import ElementProtoMixin from './ElementProtoMixin';
import { hasOwn } from './JS/Object';

let mixin = Utils.mixin;

let inheritedStaticProperties = [	
	'elementExtends',
	'elementAttributes',
	'props',
	'i18n',
	'template',
	'assets'
];

export default function registerComponent(componentConstr) {
	let elementIs = componentConstr.elementIs;

	if (!elementIs) {
		throw new TypeError('Static property "elementIs" is required');
	}

	let parentComponentConstr;

	inheritedStaticProperties.forEach(name => {
		if (!hasOwn.call(componentConstr, name)) {
			Object.defineProperty(componentConstr, name, Object.getOwnPropertyDescriptor(
				parentComponentConstr ||
					(parentComponentConstr = Object.getPrototypeOf(componentConstr.prototype).constructor),
				name
			));
		}
	});

	let elementExtends = componentConstr.elementExtends;

	let parentElementConstr = elementExtends ?
		elementConstructorMap[elementExtends] ||
			window[`HTML${ elementExtends.charAt(0).toUpperCase() + elementExtends.slice(1) }Element`] :
		HTMLElement;

	let elementConstr = function(self) {
		parentElementConstr.call(this, self);
		return self;
	};
	let elementProto = elementConstr.prototype = Object.create(parentElementConstr.prototype);

	Object.defineProperty(elementConstr, 'observedAttributes', {
		configurable: true,
		enumerable: true,
		get() {
			return Object.keys(componentConstr.elementAttributes || {});
		}
	});

	mixin(elementProto, ElementProtoMixin);

	Object.defineProperty(elementProto, 'constructor', {
		configurable: true,
		writable: true,
		value: elementConstr
	});

	elementProto._rioniteComponentConstructor = componentConstr;

	elementConstructorMap[elementIs] = customElements.define(
		elementIs,
		elementConstr,
		elementExtends ? { extends: elementExtends } : null
	);

	return componentConstr;
}
