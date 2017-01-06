import { Utils } from 'cellx';
import { Template as BemlTemplate } from '@riim/beml';
import Component from './Component';
import elementConstructorMap from './elementConstructorMap';
import ElementProtoMixin from './ElementProtoMixin';
import hyphenize from './Utils/hyphenize';

let mixin = Utils.mixin;

let push = Array.prototype.push;

function initBlockNames(componentConstr: typeof Component, parentComponentConstr: typeof Component, elIs: string) {
	componentConstr._blockNames = [elIs];

	if (parentComponentConstr._blockNames) {
		push.apply(componentConstr._blockNames, parentComponentConstr._blockNames);
	}
}

export default function registerComponent(componentConstr: typeof Component) {
	if (componentConstr._registeredComponent === componentConstr) {
		throw new TypeError('Component already registered');
	}

	let elIs = componentConstr.elementIs;

	if (!elIs) {
		throw new TypeError('Static property "elementIs" is required');
	}

	let props = componentConstr.props;

	if (props !== undefined) {
		if (props && (props['_content'] || props['context'])) {
			throw new TypeError(`No need to declare property "${ props['_content'] ? '_content' : 'context' }"`);
		}

		componentConstr.elementAttributes = props;
	}

	let parentComponentConstr = Object.getPrototypeOf(componentConstr.prototype).constructor as typeof Component;

	let bemlTemplate = componentConstr.bemlTemplate;

	if (bemlTemplate !== undefined) {
		if (bemlTemplate !== null) {
			if (parentComponentConstr.template instanceof BemlTemplate) {
				if (bemlTemplate === parentComponentConstr.bemlTemplate) {
					componentConstr.template = parentComponentConstr.template.extend(undefined, { blockName: elIs });
				} else {
					componentConstr.template = parentComponentConstr.template.extend(bemlTemplate, { blockName: elIs });
					initBlockNames(componentConstr, parentComponentConstr, elIs);
				}
			} else {
				componentConstr.template = new BemlTemplate(bemlTemplate, { blockName: elIs });
				initBlockNames(componentConstr, parentComponentConstr, elIs);
			}
		} else {
			componentConstr.template = null;
		}
	} else {
		let template = componentConstr.template;

		if (template && template !== parentComponentConstr.template) {
			initBlockNames(componentConstr, parentComponentConstr, elIs);
		}
	}

	componentConstr._rawContent = undefined;

	componentConstr._elementClassNameMap = Object.create(parentComponentConstr._elementClassNameMap || null);

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
			let elAttrsConfig = componentConstr.elementAttributes;

			if (!elAttrsConfig) {
				return [];
			}

			let observedAttrs: Array<string> = [];

			for (let name in elAttrsConfig) {
				observedAttrs.push(hyphenize(name));
			}

			return observedAttrs;
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
