export function clearNode(node: Node): Node {
	for (let child: Node | null; (child = node.firstChild); ) {
		node.removeChild(child);
	}

	return node;
}
