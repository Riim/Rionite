import camelize from './Utils/camelize';

export default function initAttributes(component, constr) {
	let attrs = component.elementAttributes;
	let attributesConfig = constr.elementAttributes;

	for (let name in attributesConfig) {
		if (typeof attributesConfig[name] != 'function') {
			let camelizedName = camelize(name);
			attrs[camelizedName] = attrs[camelizedName];
		}
	}
}
