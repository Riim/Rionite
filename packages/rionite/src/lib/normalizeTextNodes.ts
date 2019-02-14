export function normalizeTextNodes<T extends Node>(node: T): T {
	for (let child: Node | null = node.firstChild; child; ) {
		switch (child.nodeType) {
			case Node.ELEMENT_NODE: {
				normalizeTextNodes(child);
				child = child.nextSibling;
				break;
			}
			case Node.TEXT_NODE: {
				let nextChild = child.nextSibling;

				if (nextChild && nextChild.nodeType == Node.TEXT_NODE) {
					do {
						child.nodeValue += nextChild.nodeValue!;
						node.removeChild(nextChild);
						nextChild = child.nextSibling;
					} while (nextChild && nextChild.nodeType == Node.TEXT_NODE);
				}

				child = nextChild;
				break;
			}
		}
	}

	return node;
}
