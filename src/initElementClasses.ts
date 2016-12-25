import Component from './Component';

export default function initElementClasses(el: HTMLElement, constr: typeof Component) {
	let c = constr;

	do {
		el.classList.add(c.elementIs);
		c = Object.getPrototypeOf(c.prototype).constructor;
	} while (c != Component);
}
