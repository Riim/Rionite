import { BaseComponent, IPossiblyComponentElement } from '../BaseComponent';

export function findChildComponents(
	node: Node,
	childComponents?: Array<BaseComponent> | null | undefined
): Array<BaseComponent> | null {
	for (let child = node.firstChild; child; child = child.nextSibling) {
		if (child.nodeType == Node.ELEMENT_NODE) {
			let childComponent = (child as IPossiblyComponentElement).$component;

			if (childComponent) {
				(childComponents || (childComponents = [])).push(childComponent);
			}

			if (
				child.firstChild &&
				!(
					childComponent &&
					(childComponent.constructor as typeof BaseComponent).bindsInputContent
				)
			) {
				childComponents = findChildComponents(child, childComponents);
			}
		}
	}

	return childComponents || null;
}
