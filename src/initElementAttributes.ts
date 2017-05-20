import Component from './Component';

let hasOwn = Object.prototype.hasOwnProperty;

export default function initElementAttributes(component: Component) {
	let constr = component.constructor as typeof Component;
	let inputConfig = constr.input;

	if (inputConfig) {
		let input = component.input;

		for (let name in inputConfig) {
			if (hasOwn.call(input, '_initialize_' + name)) {
				input['_initialize_' + name]();
			}
		}
	}
}
