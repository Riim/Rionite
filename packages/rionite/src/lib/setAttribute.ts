import { svgNamespaceURI } from './svgNamespaceURI';

export function setAttribute(el: Element, name: string, value: any): Element {
	if (value === true) {
		value = '';
	}

	if (el.namespaceURI == svgNamespaceURI) {
		if (name == 'xlink:href' || name == 'href' || name == 'xmlns') {
			let ns =
				name == 'xmlns' ? 'http://www.w3.org/2000/xmlns/' : 'http://www.w3.org/1999/xlink';

			if (value === false || value == null) {
				el.removeAttributeNS(ns, name);
			} else {
				el.setAttributeNS(ns, name, value);
			}

			return el;
		}
	} else if (name == 'class') {
		el.className = value;
		return el;
	}

	if (value === false || value == null) {
		el.removeAttribute(name);
	} else {
		el.setAttribute(name, value);
	}

	return el;
}
