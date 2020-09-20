import { SVG_NAMESPACE_URI } from './SVG_NAMESPACE_URI';

export function setAttribute(el: Element, name: string, value: any): Element {
	if (el.namespaceURI == SVG_NAMESPACE_URI) {
		if (name == 'xlink:href' || name == 'href' || name == 'xmlns') {
			let ns =
				name == 'xmlns' ? 'http://www.w3.org/2000/xmlns/' : 'http://www.w3.org/1999/xlink';

			if (value == null || value === false) {
				el.removeAttributeNS(ns, name);
			} else {
				el.setAttributeNS(ns, name, value === true ? '' : value);
			}

			return el;
		}
	} else if (name == 'class') {
		el.className = value;
		return el;
	}

	if (value == null || value === false) {
		el.removeAttribute(name);
	} else {
		el.setAttribute(name, value === true ? '' : value);
	}

	return el;
}
