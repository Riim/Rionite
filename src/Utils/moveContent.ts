export default function moveContent(target: Node, source: Node): Node {
	for (let child: Node | null; (child = source.firstChild);) {
		target.appendChild(child);
	}

	return target;
}
