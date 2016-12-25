import Component from './Component';
import camelize from './Utils/camelize';

export default function initElementAttributes(component: Component, constr: typeof Component) {
	let elAttrsConfig = constr.elementAttributes;

	if (elAttrsConfig) {
		let attrs = component.elementAttributes;

		for (let name in elAttrsConfig) {
			if (typeof elAttrsConfig[name] != 'function') {
				let camelizedName = camelize(name);
				attrs[camelizedName] = attrs[camelizedName];
			}
		}
	}
}
