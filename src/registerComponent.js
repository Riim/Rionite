import { Utils } from 'cellx';
import elementConstructorMap from './elementConstructorMap';
import ElementProtoMixin from './ElementProtoMixin';
import { KEY_MARKUP_BLOCK_NAMES } from './keys';
import { hasOwn } from './JS/Object';
import { push } from './JS/Array';
import hyphenize from './Utils/hyphenize';

let mixin = Utils.mixin;

export default function registerComponent(componentConstr) {
	let elIs = componentConstr.elementIs;

	if (!elIs) {
		throw new TypeError('Static property "elementIs" is required');
	}

	if (hasOwn.call(componentConstr, 'props')) {
		let props = componentConstr.props;

		if (props && (props.content || props.context)) {
			throw new TypeError(`No need to declare property "${ props.content ? 'content' : 'context' }"`);
		}

		componentConstr.elementAttributes = props;
	}

	let parentComponentConstr = Object.getPrototypeOf(componentConstr.prototype).constructor;

	if (componentConstr.template !== parentComponentConstr.template && componentConstr.template) {
		push.apply((componentConstr[KEY_MARKUP_BLOCK_NAMES] = [elIs]), parentComponentConstr[KEY_MARKUP_BLOCK_NAMES]);
	}

	let elExtends = componentConstr.elementExtends;

	let parentElConstr = elExtends ?
		elementConstructorMap[elExtends] ||
			window[`HTML${ elExtends.charAt(0).toUpperCase() + elExtends.slice(1) }Element`] :
		HTMLElement;

	let elConstr = function(self) {
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

	elementConstructorMap[elIs] = customElements.define(elIs, elConstr, elExtends ? { extends: elExtends } : null);

	return componentConstr;
}
