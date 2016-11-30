import Component from './Component';
import camelize from './Utils/camelize';

export default function initAttributes(component: Component, constr: typeof Component): void {
	let attributesConfig = constr.elementAttributes;

	if (attributesConfig) {
		let attrs = component.elementAttributes;

		for (let name in attributesConfig) {
			if (typeof attributesConfig[name] != 'function') {
				let camelizedName = camelize(name);
				attrs[camelizedName] = attrs[camelizedName];
			}
		}
	}
}
