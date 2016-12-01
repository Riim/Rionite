export default function setAttribute(el: HTMLElement, name: string, value: any): void {
	if (value === false || value == null) {
		el.removeAttribute(name);
	} else {
		el.setAttribute(name, value === true ? '' : value);
	}
}
