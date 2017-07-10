export function moveContent<T extends Node>(target: T, source: Node): T {
	for (let child: Node | null; (child = source.firstChild); ) {
		target.appendChild(child);
	}

	return target;
}
