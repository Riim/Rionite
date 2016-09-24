import Component from './Component';

export default function setElementClasses(el, constr) {
	for (let c = constr; ;) {
		el.classList.add(c.elementIs);
		c = Object.getPrototypeOf(c.prototype).constructor;

		if (c == Component) {
			break;
		}
	}
}
