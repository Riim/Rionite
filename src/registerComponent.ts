import cellx = require('cellx');
import Component from './Component';
import elementConstructorMap from './elementConstructorMap';
import ElementProtoMixin from './ElementProtoMixin';
import hyphenize from './Utils/hyphenize';

let mixin = cellx.Utils.mixin;

let hasOwn = Object.prototype.hasOwnProperty;
let push = Array.prototype.push;

export default function registerComponent(componentConstr: typeof Component) {
	let elIs = componentConstr.elementIs;

	if (!elIs) {
		throw new TypeError('Static property "elementIs" is required');
	}

	if (hasOwn.call(componentConstr, 'props')) {
		let props = componentConstr.props;

		if (props && (props['content'] || props['context'])) {
			throw new TypeError(`No need to declare property "${ props['content'] ? 'content' : 'context' }"`);
		}

		componentConstr.elementAttributes = props;
	}

	let parentComponentConstr = Object.getPrototypeOf(componentConstr.prototype).constructor;

	if (componentConstr.template !== parentComponentConstr.template && componentConstr.template) {
		push.apply(
			(componentConstr._markupBlockNames = [elIs]),
			parentComponentConstr._markupBlockNames || []
		);
	}

	componentConstr._assetClassNames = Object.create(parentComponentConstr._assetClassNames || null);

	let elExtends = componentConstr.elementExtends;

	let parentElConstr = elExtends ?
		elementConstructorMap[elExtends] ||
			window[`HTML${ elExtends.charAt(0).toUpperCase() + elExtends.slice(1) }Element`] :
		HTMLElement;

	let elConstr = function(self: any) {
		return parentElConstr.call(this, self);
	};
	let elProto = elConstr.prototype = Object.create(parentElConstr.prototype);

	Object.defineProperty(elConstr, 'observedAttributes', {
		configurable: true,
		enumerable: true,

		get() {
			let elementAttributes = componentConstr.elementAttributes;
			return elementAttributes ? Object.keys(elementAttributes).map(name => hyphenize(name)) : [];
		}
	});

	mixin(elProto, ElementProtoMixin);

	Object.defineProperty(elProto, 'constructor', {
		configurable: true,
		writable: true,
		value: elConstr
	});

	elProto._rioniteComponentConstructor = componentConstr;

	elementConstructorMap[elIs] = (window as any).customElements.define(
		elIs,
		elConstr,
		elExtends ? { extends: elExtends } : null
	);

	return (componentConstr._registeredComponent = componentConstr);
}
