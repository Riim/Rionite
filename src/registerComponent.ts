import { hyphenize } from '@riim/hyphenize';
import { mixin } from '@riim/mixin';
import { Template } from 'nelm';
import { Component, IComponentElement } from './Component';
import { componentConstructorMap } from './componentConstructorMap';
import { elementConstructorMap } from './elementConstructorMap';
import { ElementProtoMixin } from './ElementProtoMixin';

let push = Array.prototype.push;

function inheritProperty(
	target: { [name: string]: any },
	source: { [name: string]: any },
	name: string,
	depth: number
) {
	let obj = target[name] as { [name: string]: any } | null | undefined;
	let parentObj = source[name] as { [name: string]: any } | null | undefined;

	if (obj && parentObj && obj != parentObj) {
		let o = (target[name] = { __proto__: parentObj } as { [name: string]: any });

		for (let key in obj) {
			o[key] = obj[key];

			if (depth) {
				inheritProperty(o, parentObj, key, depth - 1);
			}
		}
	}
}

export function registerComponent(componentConstr: typeof Component) {
	let elIs = componentConstr.elementIs;

	if (!elIs) {
		throw new TypeError('Static property "elementIs" is required');
	}

	if (componentConstructorMap.has(elIs)) {
		throw new TypeError(`Component "${elIs}" already registered`);
	}

	let parentComponentConstr = Object.getPrototypeOf(componentConstr.prototype)
		.constructor as typeof Component;

	inheritProperty(componentConstr, parentComponentConstr, 'inputs', 0);
	inheritProperty(componentConstr, parentComponentConstr, 'i18n', 0);

	componentConstr._blockNamesString =
		elIs + ' ' + (parentComponentConstr._blockNamesString || '');

	componentConstr._elementBlockNames = [elIs];

	if (parentComponentConstr._elementBlockNames) {
		push.apply(componentConstr._elementBlockNames, parentComponentConstr._elementBlockNames);
	}

	let template = componentConstr.template;

	if (template !== null) {
		if (template === parentComponentConstr.template) {
			componentConstr.template = (template as Template).extend('', { blockName: elIs });
		} else {
			if (template instanceof Template) {
				template.setBlockName(componentConstr._elementBlockNames);
			} else {
				componentConstr.template = parentComponentConstr.template
					? (parentComponentConstr.template as Template).extend(template, {
							blockName: elIs
						})
					: new Template(template, { blockName: componentConstr._elementBlockNames });
			}
		}
	}

	componentConstr._rawContent = undefined;

	inheritProperty(componentConstr, parentComponentConstr, 'oevents', 1);
	inheritProperty(componentConstr, parentComponentConstr, 'events', 1);
	inheritProperty(componentConstr, parentComponentConstr, 'domEvents', 1);

	let elExtends = componentConstr.elementExtends;

	let parentElConstr = elExtends
		? elementConstructorMap.get(elExtends) ||
			(window as any)[`HTML${elExtends.charAt(0).toUpperCase() + elExtends.slice(1)}Element`]
		: HTMLElement;

	let elConstr = function(self: HTMLElement | undefined): IComponentElement {
		return parentElConstr.call(this, self);
	};

	(elConstr as any)._rioniteComponentConstructor = componentConstr;

	Object.defineProperty(elConstr, 'observedAttributes', {
		configurable: true,
		enumerable: true,

		get() {
			let inputsConfig = componentConstr.inputs;

			if (!inputsConfig) {
				return [];
			}

			let observedAttrs: Array<string> = [];

			for (let name in inputsConfig) {
				observedAttrs.push(hyphenize(name, true));
			}

			return observedAttrs;
		}
	});

	let elProto = (elConstr.prototype = Object.create(parentElConstr.prototype));

	elProto.constructor = elConstr;
	mixin(elProto, ElementProtoMixin);

	(window as any).customElements.define(
		elIs,
		elConstr,
		elExtends ? { extends: elExtends } : null
	);

	componentConstructorMap.set(elIs, componentConstr);
	componentConstructorMap.set(elIs.toUpperCase(), componentConstr);
	elementConstructorMap.set(elIs, elConstr);

	return componentConstr;
}
