import { KEY_DOM_EVENTS } from '../handleDOMEvent';
import { KEY_EVENTS } from '../handleEvent';
import { KEY_CONTENT_TEMPLATE } from '../Template2';

const IE = !!(document as any).documentMode || navigator.userAgent.indexOf('Edge/') != -1;

export function cloneNode<T extends Node>(node: T): T {
	let copy!: Node;

	switch (node.nodeType) {
		case Node.DOCUMENT_FRAGMENT_NODE: {
			copy = document.createDocumentFragment();

			for (let child: Node | null = node.firstChild; child; child = child.nextSibling) {
				copy.appendChild(cloneNode(child));
			}

			break;
		}
		case Node.ELEMENT_NODE: {
			let tagName = ((node as any) as Element).tagName.toLowerCase();
			let is = ((node as any) as Element).getAttribute('is');

			if (is) {
				copy = (window as any).innerHTML(
					document.createElement('div'),
					`<${tagName} is="${is}">`
				).firstChild;
			} else if (IE) {
				copy = (window as any).innerHTML(document.createElement('div'), `<${tagName}>`)
					.firstChild;
			} else {
				copy = document.createElementNS(node.namespaceURI, tagName);
			}

			if ((tagName == 'template' || tagName == 'rn-slot') && node[KEY_CONTENT_TEMPLATE]) {
				copy[KEY_CONTENT_TEMPLATE] = node[KEY_CONTENT_TEMPLATE];
			}
			if (node[KEY_EVENTS]) {
				copy[KEY_EVENTS] = node[KEY_EVENTS];
			}
			if (node[KEY_DOM_EVENTS]) {
				copy[KEY_DOM_EVENTS] = node[KEY_DOM_EVENTS];
			}

			let attrs = ((node as any) as Element).attributes;

			for (let i = 0, l = attrs.length; i < l; i++) {
				let attr = attrs.item(i)!;

				if (!is || attr.name != 'is') {
					(copy as Element).setAttributeNS(attr.namespaceURI!, attr.name, attr.value);
				}
			}

			for (let child: Node | null = node.firstChild; child; child = child.nextSibling) {
				copy.appendChild(cloneNode(child));
			}

			break;
		}
		case Node.TEXT_NODE: {
			copy = document.createTextNode(node.nodeValue!);
			break;
		}
	}

	return copy as any;
}
