import Component from './Component';
import camelize from './Utils/camelize';

export default function initElementAttributes(component: Component, constr: typeof Component) {
	let propsConfig = constr.props;

	if (propsConfig) {
		let props = component.props;

		for (let name in propsConfig) {
			if (typeof propsConfig[name] != 'function') {
				let camelizedName = camelize(name);
				props[camelizedName] = props[camelizedName];
			}
		}
	}
}
