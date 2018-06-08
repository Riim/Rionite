export function prepareContent<T extends Node = DocumentFragment | Element>(node: T): T {
	// for (let child = node.firstChild; child; ) {
	// 	switch (child.nodeType) {
	// 		case Node.ELEMENT_NODE: {
	// 			if (child.firstChild) {
	// 				prepareContent(child);
	// 			} else if (child instanceof HTMLTemplateElement) {
	// 				prepareContent(child.content);
	// 			}

	// 			child = child.nextSibling;

	// 			break;
	// 		}
	// 		case Node.TEXT_NODE: {
	// 			let nextChild = child.nextSibling;

	// 			if (nextChild && nextChild.nodeType == Node.TEXT_NODE) {
	// 				do {
	// 					child.nodeValue += nextChild.nodeValue!;
	// 					node.removeChild(nextChild);
	// 					nextChild = child.nextSibling;
	// 				} while (nextChild && nextChild.nodeType == Node.TEXT_NODE);
	// 			}

	// 			child = nextChild;

	// 			break;
	// 		}
	// 	}
	// }

	return node;
}
