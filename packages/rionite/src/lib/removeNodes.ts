export function removeNodes(nodes: Array<Node>) {
	let nodeCount = nodes.length;

	if (nodeCount == 1) {
		let node = nodes[0];

		if (node.parentNode) {
			node.parentNode.removeChild(node);
		}
	} else {
		for (let i = 0; i < nodeCount; i++) {
			let node = nodes[i];

			if (node.parentNode) {
				node.parentNode.removeChild(node);
			}
		}
	}
}
