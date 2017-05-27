import { Utils } from 'cellx';
import { Template } from 'nelm';
import { IComponentElement, default as Component } from './Component';
import elementConstructorMap from './elementConstructorMap';
import ElementProtoMixin from './ElementProtoMixin';
import hyphenize from './Utils/hyphenize';

let mixin = Utils.mixin;

let push = Array.prototype.push;

function inheritProperty(target: Object, source: Object, name: string, depth: number) {
	let obj = target[name] as Object | null | undefined;
	let parentObj = source[name] as Object | null | undefined;

	if (obj && parentObj && obj != parentObj) {
		let o = target[name] = { __proto__: parentObj };

		for (let key in obj) {
			o[key] = obj[key];

			if (depth) {
				inheritProperty(o, parentObj, key, depth - 1);
			}
		}
	}
}

export default function registerComponent(componentConstr: typeof Component) {
	let elIs = componentConstr.elementIs;

	if (!elIs) {
		throw new TypeError('Static property "elementIs" is required');
	}

	if (elementConstructorMap[elIs]) {
		throw new TypeError(`Component "${ elIs }" already registered`);
	}

	let parentComponentConstr = (Object.getPrototypeOf(componentConstr.prototype).constructor as typeof Component);

	inheritProperty(componentConstr, parentComponentConstr, 'input', 0);
	inheritProperty(componentConstr, parentComponentConstr, 'i18n', 0);

	componentConstr._blockNamesString = elIs + ' ' + (parentComponentConstr._blockNamesString || '');

	let template = componentConstr.template;

	if (template !== null && template !== parentComponentConstr.template) {
		if (template instanceof Template) {
			template.setBlockName(elIs);
		} else {
			componentConstr.template = new Template(template, { blockName: elIs });
		}
	}

	componentConstr._contentBlockNames = [elIs];

	if (parentComponentConstr._contentBlockNames) {
		push.apply(componentConstr._contentBlockNames, parentComponentConstr._contentBlockNames);
	}

	componentConstr._rawContent = undefined;

	componentConstr._elementClassNameMap = Object.create(parentComponentConstr._elementClassNameMap || null);

	inheritProperty(componentConstr, parentComponentConstr, 'events', 1);

	let elExtends = componentConstr.elementExtends;

	let parentElConstr = elExtends ?
		elementConstructorMap[elExtends] ||
			window[`HTML${ elExtends.charAt(0).toUpperCase() + elExtends.slice(1) }Element`] :
		HTMLElement;

	let elConstr = function(self: HTMLElement | undefined): IComponentElement {
		return parentElConstr.call(this, self);
	};

	elConstr['_rioniteComponentConstructor'] = componentConstr;

	Object.defineProperty(elConstr, 'observedAttributes', {
		configurable: true,
		enumerable: true,

		get() {
			let inputConfig = componentConstr.input;

			if (!inputConfig) {
				return [];
			}

			let observedAttrs: Array<string> = [];

			for (let name in inputConfig) {
				observedAttrs.push(hyphenize(name));
			}

			return observedAttrs;
		}
	});

	let elProto = elConstr.prototype = Object.create(parentElConstr.prototype);

	elProto.constructor = elConstr;
	mixin(elProto, ElementProtoMixin);

	(window as any).customElements.define(elIs, elConstr, elExtends ? { extends: elExtends } : null);

	elementConstructorMap[elIs] = elConstr;

	return componentConstr;
}
