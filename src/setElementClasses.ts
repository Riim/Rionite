import Component from './Component';

export default function setElementClasses(el: Element, constr: typeof Component): void {
	let c = constr;

	do {
		el.classList.add(c.elementIs as string);
		c = Object.getPrototypeOf(c.prototype).constructor;
	} while (c != Component);
}
