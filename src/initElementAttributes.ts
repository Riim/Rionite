import Component from './Component';

export default function initElementAttributes(component: Component) {
	let constr = component.constructor as typeof Component;
	let propsConfig = constr.props;

	if (propsConfig) {
		let props = component.props;

		for (let name in propsConfig) {
			if (props.hasOwnProperty('_initialize_' + name)) {
				props['_initialize_' + name]();
			}
		}
	}
}
